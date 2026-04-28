import React from "react";
import {
  Building2,
  CheckCircle2,
  MapPin,
  Users,
  Heart,
  Target,
  ShieldAlert,
  Activity,
  FileWarning,
  ArrowLeft,
  Settings,
  Award,
  AlertTriangle,
  MessageSquare,
  TrendingUp,
  Download,
} from "lucide-react";
import { motion } from "motion/react";

export default function NGOProfileView({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-brand-green/5 to-transparent"></div>
        <div className="flex items-center gap-6 relative z-10">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors shrink-0"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
            <Building2 size={32} />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Global Reach Initiative
              </h1>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                Active
              </span>
              <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-full border border-indigo-100 uppercase tracking-wider">
                Trusted Partner
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              ID: GRI-001 • Joined March 2023 • North & West Districts
            </p>
          </div>
        </div>
        <div className="flex gap-2 relative z-10">
          <button className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Stats & Info */}
        <div className="lg:col-span-3 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                  <Target size={18} />
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Impact Score
                </span>
              </div>
              <div className="text-3xl font-bold text-slate-900">
                9.4
                <span className="text-sm text-slate-400 font-medium">/10</span>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                  <Users size={18} />
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Volunteers
                </span>
              </div>
              <div className="text-3xl font-bold text-slate-900">124</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-brand-green/10 text-brand-green">
                  <Heart size={18} />
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Needs Solved
                </span>
              </div>
              <div className="text-3xl font-bold text-slate-900">1,492</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                  <Activity size={18} />
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Response Rate
                </span>
              </div>
              <div className="text-3xl font-bold text-slate-900">98%</div>
            </div>
          </div>

          {/* Performance Chart Placeholder */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-80 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold tracking-tight text-slate-900 text-lg">
                Performance Tracker
              </h3>
              <select className="bg-slate-50 border border-slate-100 rounded-lg text-sm px-3 py-1.5 focus:outline-none">
                <option>Last 6 Months</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="flex-1 border-2 border-dashed border-slate-100 rounded-2xl flex items-center justify-center bg-slate-50">
              <div className="text-center">
                <TrendingUp size={32} className="mx-auto text-slate-300 mb-2" />
                <p className="text-sm font-medium text-slate-500">
                  Analytics visualization goes here
                </p>
              </div>
            </div>
          </div>

          {/* Recent Operations */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold tracking-tight text-slate-900 text-lg mb-6">
              Recent Operations
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">
                        Food Distribution - Sector {i}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Completed 4 hours ago • Impacted 240 individuals
                      </p>
                    </div>
                  </div>
                  <button className="text-xs font-bold text-brand-green hover:underline">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Admin Actions */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold tracking-tight text-slate-900 mb-4">
              Management Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-medium rounded-xl transition-colors flex items-center gap-3 border border-slate-100">
                <Award size={18} className="text-indigo-500" />
                Performance Report
              </button>
              <button className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-medium rounded-xl transition-colors flex items-center gap-3 border border-slate-100">
                <Settings size={18} className="text-slate-500" />
                Edit Permissions
              </button>
              <button className="w-full py-3 px-4 bg-amber-50 hover:bg-amber-100 text-amber-700 text-sm font-medium rounded-xl transition-colors flex items-center gap-3 border border-amber-100">
                <FileWarning size={18} />
                Issue Warning Notice
              </button>
              <button className="w-full py-3 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-medium rounded-xl transition-colors flex items-center gap-3 border border-indigo-100">
                <ShieldAlert size={18} />
                Assign Field Audit
              </button>
            </div>
          </div>

          <div className="bg-rose-50 border border-rose-100 p-6 rounded-3xl shadow-sm text-rose-900">
            <h3 className="font-bold tracking-tight mb-2 text-lg flex items-center gap-2">
              <AlertTriangle size={20} className="text-rose-500" /> Danger Zone
            </h3>
            <p className="text-sm text-rose-700 mb-6 leading-relaxed">
              Suspending this NGO will immediately revoke their access to the
              platform and freeze all active operations.
            </p>
            <button className="w-full py-3 bg-rose-500 text-white text-sm font-bold rounded-xl hover:bg-rose-600 transition-colors flex items-center justify-center shadow-lg shadow-rose-500/20">
              Suspend NGO
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
