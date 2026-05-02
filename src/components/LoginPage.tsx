import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  Building2,
  MapPin,
  HandHeart,
  CheckCircle,
  ArrowRight,
  Lock,
  Mail,
  ArrowLeft,
} from "lucide-react";
import { login, signup, verifyEmail, type AuthUser } from "../lib/api";

export type Role =
  | "SUPER_ADMIN"
  | "NGO_ADMIN"
  | "FIELD_COORDINATOR"
  | "VOLUNTEER"
  | "VERIFIER"
  | "DONOR";

const SELF_SERVE_SIGNUP_ROLES = new Set<Role>(["VOLUNTEER", "DONOR"]);

interface RoleConfig {
  id: Role;
  title: string;
  backendRole: AuthUser["role"];
  description: string;
  icon: any;
  color: string;
  lightColor: string;
  image: string;
}

const ROLES: RoleConfig[] = [
  {
    id: "SUPER_ADMIN",
    title: "Super Admin",
    backendRole: "Super Admin",
    description: "Full system governance and global analytics access.",
    icon: ShieldCheck,
    color: "#1e293b",
    lightColor: "#f1f5f9",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "NGO_ADMIN",
    title: "NGO Admin",
    backendRole: "NGO Admin",
    description: "Manage your organization, staff, and impact campaigns.",
    icon: Building2,
    color: "#5D8D70",
    lightColor: "#ecf3ef",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "FIELD_COORDINATOR",
    title: "Field Coordinator",
    backendRole: "Field Coordinator",
    description: "On-ground operation management and task assignment.",
    icon: MapPin,
    color: "#FFB37B",
    lightColor: "#fff7f1",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "VOLUNTEER",
    title: "Volunteer",
    backendRole: "Volunteer",
    description: "Access your dashboard to help children in need.",
    icon: HandHeart,
    color: "#4f46e5",
    lightColor: "#f5f3ff",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "VERIFIER",
    title: "Verifier",
    backendRole: "Verifier",
    description: "Audit activities and verify impact documentation.",
    icon: CheckCircle,
    color: "#0891b2",
    lightColor: "#ecfeff",
    image:
      "https://images.unsplash.com/photo-1454165833762-01d67846471c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "DONOR",
    title: "CSR Partner",
    backendRole: "Donor",
    description: "Track impact, funding transparency, and verified field execution.",
    icon: Building2,
    color: "#5D8D70",
    lightColor: "#ecf3ef",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function LoginPage({
  onBack,
  onLoginSuccess,
  onSignupAccount,
  initialAuthMode,
  initialRole,
}: {
  onBack: () => void;
  onLoginSuccess: (user: AuthUser) => void;
  onSignupAccount: (role: Role | null) => void;
  initialAuthMode?: "login" | "signup";
  initialRole?: Role | null;
}) {
  const [selectedRole, setSelectedRole] = useState<Role | null>(initialRole || null);
  const [authMode, setAuthMode] = useState<"login" | "signup">(initialAuthMode || "login");
  useEffect(() => {
    setAuthMode(initialAuthMode || "login");
  }, [initialAuthMode]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [verifyGate, setVerifyGate] = useState<{ email: string } | null>(null);
  const [verifyTokenInput, setVerifyTokenInput] = useState("");
  const navigate = useNavigate();

  const currentRole = ROLES.find((r) => r.id === selectedRole);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole || !currentRole) return;

    setIsSubmitting(true);
    setError("");

    try {
      const user = await login({ email, password });
      if (user.role !== currentRole.backendRole) {
        setError(`This account is for ${user.role}, not ${currentRole.title}.`);
        return;
      }
      setVerifyGate(null);
      onLoginSuccess(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to authenticate");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole || !currentRole) return;

    if (selectedRole === "SUPER_ADMIN") {
      setError("Super Admin uses fixed login credentials and cannot sign up.");
      return;
    }

    if (!SELF_SERVE_SIGNUP_ROLES.has(selectedRole)) {
      setError(
        "Public signup is only for Volunteers and CSR Partners (Donors). Request NGO Admin, Field Coordinator, or Verifier access from the home page instead."
      );
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const created = await signup({
        fullName,
        email,
        password,
        role: currentRole.backendRole === "Volunteer" || currentRole.backendRole === "Donor" ? currentRole.backendRole : "Volunteer",
      });

      if (created.requiresVerification) {
        setVerifyGate({ email: created.email.trim().toLowerCase() });
        setVerifyTokenInput("");
        return;
      }

      const user = await login({ email, password });
      if (user.role !== currentRole.backendRole) {
        setError(`This account is for ${user.role}, not ${currentRole.title}.`);
        return;
      }
      setVerifyGate(null);
      onLoginSuccess(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign up");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyEmailThenLogin = async () => {
    if (!verifyGate || !verifyTokenInput.trim()) return;
    setIsSubmitting(true);
    setError("");
    try {
      await verifyEmail({ email: verifyGate.email, token: verifyTokenInput.trim() });
      const user = await login({ email: verifyGate.email, password });
      setVerifyGate(null);
      setVerifyTokenInput("");
      onLoginSuccess(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side: Dynamic Content */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRole || "default"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img
              src={
                currentRole?.image ||
                "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop"
              }
              className="w-full h-full object-cover opacity-60 scale-105"
              alt="Login Background"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/40 to-transparent"></div>
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 w-full p-16 flex flex-col justify-between">
          <div
            className="flex items-center gap-2"
            onClick={onBack}
            role="button"
          >
            <span className="text-3xl font-bold tracking-tight text-white">
              Sevasetu
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedRole || "default"}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="max-w-md"
            >
              <h2 className="text-4xl font-bold tracking-tight text-white mb-4">
                {currentRole
                  ? `Portal for ${currentRole.title}`
                  : "Join the Movement"}
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                {currentRole?.description ||
                  "Together, we can ensure every child has a smile that lasts a lifetime. Secure access for staff and volunteers."}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-12 text-white/50 text-sm">
            <div>
              <p className="font-bold text-white mb-2">10k+</p>
              <p>Children Supported</p>
            </div>
            <div>
              <p className="font-bold text-white mb-2">500+</p>
              <p>Verified NGOs</p>
            </div>
            <div>
              <p className="font-bold text-white mb-2">12</p>
              <p>Active Regions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Interface */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50/30">
        <div className="max-w-md w-full">
          <button
            onClick={onBack}
            className="mb-8 flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors text-sm font-medium group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to home
          </button>

          {!selectedRole ? (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
                  Welcome Back
                </h1>
                <p className="text-slate-500">
                  Please select your access role to continue.
                </p>
              </div>

              <div className="grid gap-3">
                {ROLES.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl hover:border-brand-green hover:shadow-lg hover:shadow-brand-green/5 transition-all text-left group"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: role.lightColor,
                        color: role.color,
                      }}
                    >
                      <role.icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-800">{role.title}</h3>
                      <p className="text-xs text-slate-500">
                        {role.id.replaceAll("_", " ")}
                      </p>
                    </div>
                    <ArrowRight
                      size={18}
                      className="text-slate-300 group-hover:text-brand-green group-hover:translate-x-1 transition-all"
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div>
                <button
                  onClick={() => setSelectedRole(null)}
                  className="text-brand-green font-bold text-xs tracking-widest uppercase mb-4 hover:underline"
                >
                  Change Role
                </button>
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      backgroundColor: currentRole?.lightColor,
                      color: currentRole?.color,
                    }}
                  >
                    <currentRole.icon size={20} />
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    {currentRole?.title} {authMode === "login" ? "Login" : "Signup"}
                  </h1>
                </div>
              </div>

              <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("login");
                    setError("");
                    setVerifyGate(null);
                  }}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
                    authMode === "login" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("signup");
                    onSignupAccount(selectedRole);
                    setError("");
                    setVerifyGate(null);
                  }}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
                    authMode === "signup" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Signup
                </button>
              </div>

              <form onSubmit={authMode === "login" ? handleLogin : handleSignup} className="space-y-4">
                {authMode === "signup" ? (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                ) : null}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-3.5 text-slate-400"
                      size={18}
                    />
                    <input
                      type="email"
                      required
                      placeholder="admin@smilecharity.org"
                      className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-3.5 text-slate-400"
                      size={18}
                    />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-brand-green rounded border-slate-300"
                    />
                    <span className="text-sm text-slate-500 group-hover:text-slate-900 transition-colors">
                      Remember me
                    </span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-brand-green font-bold hover:underline"
                    onClick={() => navigate("/forgot-password")}
                  >
                    Forgot Password?
                  </button>
                </div>

                {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}

                {verifyGate ? (
                  <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 space-y-3">
                    <p className="text-xs font-semibold text-amber-900">
                      Email verification required for <span className="font-mono">{verifyGate.email}</span>. Paste the
                      token from server logs (when REQUIRE_EMAIL_VERIFICATION=true), then continue.
                    </p>
                    <input
                      type="text"
                      value={verifyTokenInput}
                      onChange={(e) => setVerifyTokenInput(e.target.value)}
                      placeholder="Verification token"
                      className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                    />
                    <button
                      type="button"
                      disabled={isSubmitting || !verifyTokenInput.trim()}
                      onClick={() => void handleVerifyEmailThenLogin()}
                      className="w-full py-3 bg-amber-900 text-white rounded-xl font-bold text-sm disabled:opacity-50"
                    >
                      {isSubmitting ? "Verifying…" : "Verify email & sign in"}
                    </button>
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 hover:-translate-y-0.5 shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  <ShieldCheck size={20} />
                  {isSubmitting
                    ? authMode === "login"
                      ? "Authenticating..."
                      : "Creating account..."
                    : authMode === "login"
                    ? "Authenticate to Dashboard"
                    : "Signup and Continue"}
                </button>
              </form>

              <div className="pt-8 text-center">
                <p className="text-slate-400 text-sm">
                  {authMode === "login" ? "Don't have access?" : "Already have an account?"}{" "}
                  <button
                    onClick={() => {
                      if (authMode === "login") {
                        setAuthMode("signup");
                        onSignupAccount(selectedRole);
                      } else {
                        setAuthMode("login");
                      }
                      setError("");
                      setVerifyGate(null);
                    }}
                    className="text-slate-900 font-bold hover:underline"
                  >
                    {authMode === "login" ? "Signup Account" : "Login"}
                  </button>
                </p>
              </div>
            </motion.div>
          )}

          <div className="pt-10 mt-10 border-t border-slate-200 text-center space-y-2">
            <p className="text-xs font-semibold text-slate-500 tracking-wide">
              SevaSetu • Need se Seva Tak
            </p>
            <p className="text-[11px] text-slate-400">
              Privacy Policy • Terms & Governance • Support Center
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
