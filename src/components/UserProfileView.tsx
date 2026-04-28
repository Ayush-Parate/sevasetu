import React from "react";
import {
  User,
  ShieldAlert,
  Key,
  ArrowUpCircle,
  Activity,
  Flag,
  Award,
  ArrowLeft,
  ShieldCheck,
  Mail,
  MapPin,
  PhoneCall,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { motion } from "motion/react";

export default function UserProfileView({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-indigo-50 to-transparent"></div>
        <div className="flex items-center gap-6 relative z-10">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors shrink-0"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
            <img
              src={`https://i.pravatar.cc/150?img=33`}
              alt="User avatar"
              className="w-full h-full rounded-2xl object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Marcus Chen
              </h1>
              <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                Field Coordinator
              </span>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200 uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck size={12} /> Verified
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Associated NGO: Global Reach Initiative • Joined Jan 2024
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold tracking-tight text-slate-900 text-lg mb-4">
              User Information
            </h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Location
                </span>
                <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <MapPin size={16} className="text-slate-400" /> North
                  District, City Center
                </span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Trust Score
                </span>
                <span className="flex items-center gap-2 text-sm font-bold text-emerald-600">
                  9.8 / 10{" "}
                  <span className="text-xs font-medium text-slate-500">
                    (Outstanding)
                  </span>
                </span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Contact Email
                </span>
                <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Mail size={16} className="text-slate-400" />{" "}
                  marcus.chen@example.com
                </span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Phone Number
                </span>
                <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <PhoneCall size={16} className="text-slate-400" /> +1 987 654
                  321
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold tracking-tight text-slate-900 text-lg">
                Recent Activity & Logs
              </h3>
              <button className="text-sm font-medium text-brand-green hover:underline">
                View All Logs
              </button>
            </div>
            <div className="space-y-4">
              {[
                {
                  action: "Task Completed",
                  desc: "Successfully resolved 'Medical Supply Shortage'",
                  time: "2 hours ago",
                  icon: CheckCircle2,
                  color: "text-emerald-500",
                  bg: "bg-emerald-50",
                },
                {
                  action: "Report Filed",
                  desc: "Submitted site evaluation for 'West End Clinic'",
                  time: "Yesterday",
                  icon: Activity,
                  color: "text-indigo-500",
                  bg: "bg-indigo-50",
                },
                {
                  action: "Login Authorized",
                  desc: "Mobile Application authentication",
                  time: "2 days ago",
                  icon: Key,
                  color: "text-slate-500",
                  bg: "bg-slate-100",
                },
              ].map((log, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${log.bg} ${log.color}`}
                  >
                    <log.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-slate-800">
                      {log.action}
                    </h4>
                    <p className="text-xs text-slate-500">{log.desc}</p>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    {log.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Actions */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold tracking-tight text-slate-900 mb-4">
              Administrative Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-medium rounded-xl transition-colors flex items-center gap-3 border border-slate-100">
                <Key size={18} className="text-slate-500" />
                Reset Access Credentials
              </button>
              <button className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-medium rounded-xl transition-colors flex items-center gap-3 border border-slate-100">
                <ArrowUpCircle size={18} className="text-indigo-500" />
                Promote Role Status
              </button>
              <button className="w-full py-3 px-4 bg-amber-50 hover:bg-amber-100 text-amber-700 text-sm font-medium rounded-xl transition-colors flex items-center gap-3 border border-amber-100">
                <Flag size={18} />
                Flag for Investigation
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-3xl shadow-sm text-white">
            <h3 className="font-bold tracking-tight mb-2 text-lg flex items-center gap-2">
              <Award size={20} className="text-amber-400" /> High Impact
              Features
            </h3>
            <p className="text-sm text-slate-300 mb-4 leading-relaxed">
              This user is in the top 5% of performers. Acknowledge their effort
              to boost community morale.
            </p>
            <button className="w-full py-3 bg-brand-green text-white text-sm font-bold rounded-xl hover:brightness-110 transition-all shadow-lg flex justify-center shadow-brand-green/20">
              Assign Leadership Badge
            </button>
          </div>

          <div className="bg-rose-50 border border-rose-100 p-6 rounded-3xl shadow-sm">
            <h3 className="font-bold tracking-tight mb-2 text-lg text-rose-900 flex items-center gap-2">
              <AlertTriangle size={20} /> Danger Zone
            </h3>
            <button className="w-full py-3 bg-white text-rose-600 text-sm font-bold rounded-xl border border-rose-200 hover:bg-rose-500 hover:text-white transition-all">
              Suspend User Account
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
