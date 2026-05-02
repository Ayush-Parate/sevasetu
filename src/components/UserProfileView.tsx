import React from "react";
import {
  ShieldAlert,
  Key,
  ArrowUpCircle,
  Flag,
  Award,
  ArrowLeft,
  ShieldCheck,
  Mail,
  PhoneCall,
  AlertTriangle,
} from "lucide-react";
import { motion } from "motion/react";
import type { ListedUser } from "../lib/api";

function avatarIndex(id: string) {
  let n = 0;
  for (let i = 0; i < id.length; i++) n += id.charCodeAt(i);
  return (n % 70) + 1;
}

export default function UserProfileView({
  user,
  onBack,
}: {
  user: ListedUser;
  onBack: () => void;
}) {
  const score = user.trustScore ?? 0;
  const active = user.isActive !== false;
  const verified = user.emailVerified !== false;
  const joined =
    user.createdAt != null
      ? new Date(user.createdAt).toLocaleDateString(undefined, { month: "short", year: "numeric" })
      : "—";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-indigo-50 to-transparent" />
        <div className="flex items-center gap-6 relative z-10">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors shrink-0"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 overflow-hidden shrink-0">
            <img
              src={`https://i.pravatar.cc/150?img=${avatarIndex(user.id)}`}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">{user.fullName}</h1>
              <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                {user.role}
              </span>
              {verified ? (
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200 uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck size={12} /> Verified
                </span>
              ) : (
                <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full uppercase tracking-wider">
                  Email pending
                </span>
              )}
              <span
                className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                  active ? "bg-emerald-50 text-emerald-700" : "bg-rose-100 text-rose-700"
                }`}
              >
                {active ? "Active" : "Inactive"}
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Joined {joined} • ID <span className="font-mono text-xs">{user.id}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold tracking-tight text-slate-900 text-lg mb-4">User information</h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Trust score
                </span>
                <span className="text-sm font-bold text-emerald-600">
                  {score.toFixed(1)} / 10
                </span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Availability
                </span>
                <span className="text-sm font-medium text-slate-700">{user.availabilityStatus || "—"}</span>
              </div>
              <div className="col-span-2">
                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Email
                </span>
                <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Mail size={16} className="text-slate-400" />
                  {user.email}
                </span>
              </div>
              <div className="col-span-2">
                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Phone
                </span>
                <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <PhoneCall size={16} className="text-slate-400" />
                  {user.phone || "—"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl text-sm text-slate-600">
            Task completion and audit timelines will populate here once those APIs are wired to this profile.
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold tracking-tight text-slate-900 mb-4">Administrative actions</h3>
            <div className="space-y-3">
              <button
                type="button"
                className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-medium rounded-xl transition-colors flex items-center gap-3 border border-slate-100"
              >
                <Key size={18} className="text-slate-500" />
                Reset access credentials
              </button>
              <button
                type="button"
                className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-medium rounded-xl transition-colors flex items-center gap-3 border border-slate-100"
              >
                <ArrowUpCircle size={18} className="text-indigo-500" />
                Adjust role (use admin APIs)
              </button>
              <button
                type="button"
                className="w-full py-3 px-4 bg-amber-50 hover:bg-amber-100 text-amber-700 text-sm font-medium rounded-xl transition-colors flex items-center gap-3 border border-amber-100"
              >
                <Flag size={18} />
                Flag for investigation
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-3xl shadow-sm text-white">
            <h3 className="font-bold tracking-tight mb-2 text-lg flex items-center gap-2">
              <Award size={20} className="text-amber-400" /> Impact
            </h3>
            <p className="text-sm text-slate-300 mb-4 leading-relaxed">
              Performance badges and rewards will connect to verified task data from the backend.
            </p>
            <button
              type="button"
              className="w-full py-3 bg-brand-green text-white text-sm font-bold rounded-xl hover:brightness-110 transition-all shadow-lg flex justify-center shadow-brand-green/20"
            >
              Assign recognition (soon)
            </button>
          </div>

          <div className="bg-rose-50 border border-rose-100 p-6 rounded-3xl shadow-sm">
            <h3 className="font-bold tracking-tight mb-2 text-lg text-rose-900 flex items-center gap-2">
              <AlertTriangle size={20} /> Danger zone
            </h3>
            <button
              type="button"
              className="w-full py-3 bg-white text-rose-600 text-sm font-bold rounded-xl border border-rose-200 hover:bg-rose-500 hover:text-white transition-all"
            >
              Suspend account (wire PATCH /users when available)
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
