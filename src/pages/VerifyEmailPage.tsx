import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { verifyEmail } from "../lib/api";

export default function VerifyEmailPage() {
  const [params] = useSearchParams();
  const email = params.get("email")?.trim() ?? "";
  const token = params.get("token")?.trim() ?? "";

  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    email && token ? "loading" : "idle"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!email || !token) {
      setStatus("idle");
      setMessage("Open the verification link from your email, or paste token on the login page.");
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const result = await verifyEmail({ email, token });
        if (!cancelled) {
          setStatus("ok");
          setMessage(
            result.alreadyVerified
              ? "This email was already verified. You can sign in."
              : "Email verified. You can sign in."
          );
        }
      } catch (e) {
        if (!cancelled) {
          setStatus("err");
          setMessage(e instanceof Error ? e.message : "Verification failed");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [email, token]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-6"
        >
          <ArrowLeft size={16} /> Back to login
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-brand-green">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Email verification</h1>
        </div>
        {status === "loading" ? (
          <p className="text-sm text-slate-600">Confirming your token…</p>
        ) : (
          <p
            className={`text-sm font-medium ${status === "err" ? "text-rose-600" : "text-slate-700"}`}
          >
            {message}
          </p>
        )}
        <Link
          to="/login"
          className="mt-8 inline-flex w-full justify-center py-3.5 bg-slate-900 text-white rounded-xl font-bold text-sm"
        >
          Go to login
        </Link>
      </div>
    </div>
  );
}
