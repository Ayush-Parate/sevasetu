import { useMemo, useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { createPublicRequest, signup, type BackendRole, type PublicRequestPayload } from "../lib/api";

type RequestType = PublicRequestPayload["requestType"];

const REQUEST_COPY: Record<
  RequestType,
  { title: string; subtitle: string; submitLabel: string; organizationLabel: string }
> = {
  DEMO_REQUEST: {
    title: "Request a Demo",
    subtitle: "Share your details and the team can follow up with a guided platform walkthrough.",
    submitLabel: "Request Demo",
    organizationLabel: "Organization"
  },
  NGO_REGISTRATION: {
    title: "Register an NGO",
    subtitle: "Capture your NGO details so onboarding and verification can begin from the website.",
    submitLabel: "Submit NGO Registration",
    organizationLabel: "NGO Name"
  },
  VOLUNTEER_INTEREST: {
    title: "Join as Volunteer",
    subtitle: "Register your interest so the operations team can activate your volunteer onboarding.",
    submitLabel: "Submit Volunteer Interest",
    organizationLabel: "Organization / Local Group"
  },
  DONOR_INTEREST: {
    title: "Donate / Partner",
    subtitle: "Leave your details so the donor engagement team can follow up on funding opportunities.",
    submitLabel: "Submit Donor Interest",
    organizationLabel: "Company / Foundation"
  },
  ACCOUNT_REQUEST: {
    title: "Sign up",
    subtitle: "Create your dashboard account now. You can log in immediately after signup.",
    submitLabel: "Create Account",
    organizationLabel: "Organization"
  }
};

const SIGNUP_ROLE_OPTIONS: Array<Exclude<BackendRole, "Super Admin">> = [
  "Volunteer",
  "Field Coordinator",
  "NGO Admin",
  "Verifier",
  "Donor"
];

interface Props {
  requestType: RequestType;
  defaultRoleRequested?: string;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export default function PublicRequestModal({
  requestType,
  defaultRoleRequested,
  onClose,
  onSuccess
}: Props) {
  const copy = useMemo(() => REQUEST_COPY[requestType], [requestType]);
  const isSignup = requestType === "ACCOUNT_REQUEST";
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    organizationName: "",
    roleRequested: defaultRoleRequested || (isSignup ? "Volunteer" : ""),
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (isSignup) {
        const requestedRole = (SIGNUP_ROLE_OPTIONS.includes(form.roleRequested as any)
          ? (form.roleRequested as Exclude<BackendRole, "Super Admin">)
          : "Volunteer");

        await signup({
          fullName: form.fullName,
          email: form.email,
          password: form.password,
          role: requestedRole,
          phone: form.phone || undefined
        });

        onSuccess("Signup successful. Please log in with your new credentials.");
      } else {
        await createPublicRequest({
          requestType,
          fullName: form.fullName,
          email: form.email,
          phone: form.phone || undefined,
          organizationName: form.organizationName || undefined,
          roleRequested: form.roleRequested || undefined,
          message: form.message || undefined,
          source: "frontend-modal"
        });
        onSuccess(`${copy.title} submitted successfully.`);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit request");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[120] bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden">
        <div className="flex items-start justify-between gap-4 p-8 border-b border-slate-100">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">{copy.title}</h2>
            <p className="text-sm text-slate-500 mt-2 max-w-xl">{copy.subtitle}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-50 text-slate-500 hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              required
              value={form.fullName}
              onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
              placeholder="Full name"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-green/20"
            />
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="Email address"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-green/20"
            />
            {isSignup ? (
              <input
                required
                type="password"
                value={form.password}
                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                placeholder="Password (min 8 chars)"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-green/20"
              />
            ) : null}
            <input
              value={form.phone}
              onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
              placeholder="Phone number"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-green/20"
            />
            {isSignup ? (
              <select
                value={form.roleRequested}
                onChange={(e) => setForm((prev) => ({ ...prev, roleRequested: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-green/20"
              >
                {SIGNUP_ROLE_OPTIONS.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            ) : (
              <input
                value={form.organizationName}
                onChange={(e) => setForm((prev) => ({ ...prev, organizationName: e.target.value }))}
                placeholder={copy.organizationLabel}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-green/20"
              />
            )}
          </div>

          {!isSignup ? (
            <input
              value={form.roleRequested}
              onChange={(e) => setForm((prev) => ({ ...prev, roleRequested: e.target.value }))}
              placeholder="Requested role"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-green/20"
            />
          ) : null}

          {!isSignup ? (
            <textarea
              value={form.message}
              onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
              placeholder="Tell us what you need"
              className="w-full min-h-[140px] bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-green/20"
            />
          ) : null}

          {error ? <p className="text-sm text-rose-600 font-medium">{error}</p> : null}

          <div className="flex items-center justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-brand-green transition-colors disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : copy.submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
