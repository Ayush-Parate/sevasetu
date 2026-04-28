import React from "react";
import {
  AlertTriangle,
  XCircle,
  ArrowLeft,
  FileText,
  Search,
  History,
  Gavel,
  RotateCcw,
  ShieldBan,
  FileSearch,
} from "lucide-react";
import { motion } from "motion/react";

export default function SuspendedNGOView({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-rose-50 to-transparent"></div>
        <div className="flex items-center gap-6 relative z-10">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors shrink-0"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
            <AlertTriangle size={32} />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                CareConnect
              </h1>
              <span className="px-2.5 py-1 bg-rose-100 text-rose-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                Suspended
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              ID: CC-0082 • Suspended on Oct 12, 2023
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-50">
              <Gavel className="text-rose-500" size={24} />
              <div>
                <h3 className="font-bold tracking-tight text-slate-900 text-lg">
                  Suspension Details
                </h3>
                <p className="text-sm text-slate-500">
                  Primary Reason: Compliance Violation
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-slate-800 mb-3">
                  Flagged Issues
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 bg-rose-50/50 rounded-xl border border-rose-100/50">
                    <XCircle size={18} className="text-rose-500 shrink-0" />
                    <div>
                      <span className="text-sm font-medium text-slate-800 block">
                        Fraudulent Impact Reports detected
                      </span>
                      <span className="text-xs text-slate-500">
                        System flagged irregularities in beneficiary count in
                        District 2.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-rose-50/50 rounded-xl border border-rose-100/50">
                    <XCircle size={18} className="text-rose-500 shrink-0" />
                    <div>
                      <span className="text-sm font-medium text-slate-800 block">
                        Expired Operating License
                      </span>
                      <span className="text-xs text-slate-500">
                        NGO failed to upload renewed government certification
                        within grace period.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-800 mb-3">
                  Administrator Notes
                </h4>
                <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600 leading-relaxed border border-slate-100">
                  "Pending an internal review of the submitted impact metrics
                  for Q3. We have requested additional field verification from
                  their volunteers. Currently awaiting renewed license
                  documentation."
                  <div className="mt-3 text-xs text-slate-400 font-medium">
                    — Logged by Sarah Jenkins (Super Admin) • 3 days ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold tracking-tight text-slate-900 mb-4">
              Resolution Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full py-3 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-sm font-medium rounded-xl transition-colors flex items-center gap-3 border border-emerald-100">
                <RotateCcw size={18} />
                Reinstate NGO
              </button>
              <button className="w-full py-3 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-medium rounded-xl transition-colors flex items-center gap-3 border border-indigo-100">
                <FileSearch size={18} />
                Generate Investigation Report
              </button>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-sm text-white">
            <h3 className="font-bold tracking-tight mb-2 text-lg flex items-center gap-2">
              Permanent Action
            </h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Applying a permanent ban will delete all accounts associated with
              this NGO and blacklist their registration IDs.
            </p>
            <button className="w-full py-3 bg-rose-500 text-white text-sm font-bold rounded-xl hover:bg-rose-600 transition-colors flex items-center justify-center shadow-lg shadow-rose-500/20 gap-2">
              <ShieldBan size={18} /> Permanent Ban
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
