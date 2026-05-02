import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import { forgotPassword } from "../lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [devToken, setDevToken] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await forgotPassword(email.trim());
      setDone(true);
      setDevToken(typeof data?.devResetToken === "string" ? data.devResetToken : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-6"
        >
          <ArrowLeft size={16} /> Back to login
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Reset password</h1>
        <p className="text-sm text-slate-500 mb-6">
          If an account exists, a one-time token is generated. In development it appears below and in API
          logs; in production configure email delivery.
        </p>
        {!done ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 block mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                  placeholder="you@organization.org"
                />
              </div>
            </div>
            {error ? <p className="text-sm text-rose-600 font-medium">{error}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold text-sm disabled:opacity-60"
            >
              {loading ? "Sending…" : "Request token"}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Request received. Use the token with the reset form to set a new password.
            </p>
            {devToken ? (
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-xs font-mono break-all text-amber-950">
                Dev token: {devToken}
              </div>
            ) : (
              <p className="text-xs text-slate-500">
                No dev token returned (production mode or unknown email). Check secure mail or server logs if
                configured.
              </p>
            )}
            <Link
              to="/reset-password"
              state={{ email }}
              className="block text-center w-full py-3.5 bg-brand-green text-white rounded-xl font-bold text-sm"
            >
              Continue to set new password
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
