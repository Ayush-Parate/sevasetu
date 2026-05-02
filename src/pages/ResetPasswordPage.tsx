import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import { resetPassword } from "../lib/api";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const prefilledEmail = (location.state as { email?: string } | null)?.email ?? "";

  const [email, setEmail] = useState(prefilledEmail);
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const qEmail = q.get("email");
    const qToken = q.get("token");
    if (qEmail) setEmail(qEmail);
    if (qToken) setToken(qToken);
  }, [location.search]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await resetPassword({ email: email.trim(), token: token.trim(), password });
      navigate("/login", { replace: true, state: { authMode: "login" } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to reset password");
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
        <h1 className="text-2xl font-bold text-slate-900 mb-2">New password</h1>
        <p className="text-sm text-slate-500 mb-6">
          Paste the reset token from your email or development logs, then choose a new password (min 8
          characters).
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 block mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/20"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 block mb-1">
              Reset token
            </label>
            <input
              type="text"
              required
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              placeholder="Paste token"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 block mb-1">
              New password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              />
            </div>
          </div>
          {error ? <p className="text-sm text-rose-600 font-medium">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold text-sm disabled:opacity-60"
          >
            {loading ? "Updating…" : "Update password"}
          </button>
        </form>
        <p className="text-center text-xs text-slate-400 mt-6">
          <Link to="/forgot-password" className="text-brand-green font-semibold hover:underline">
            Request a new token
          </Link>
        </p>
      </div>
    </div>
  );
}
