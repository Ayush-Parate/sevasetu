import React, { useState } from "react";
import {
  UserCheck,
  MapPin,
  Activity,
  Zap,
  ShieldCheck,
  ChevronRight,
  User,
  Star,
  Clock,
  AlertTriangle,
  Award,
  AlertCircle,
  BarChart3,
  Search,
  ClipboardList,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useToast } from "../Toast";
import { useAsync } from "../../lib/useAsync";
import { listNGOFieldCoordinators } from "../../lib/api";

type SubView = "list" | "performance";

export default function FieldCoordinatorManagement() {
  const [activeView, setActiveView] = useState<SubView>("list");
  const [selectedCoord, setSelectedCoord] = useState<any>(null);
  const { showToast } = useToast();

  const handleAction = (action: string, name: string) => {
    showToast(`${action} for ${name} successful.`, "success");
  };

  const { data: coordinatorsRaw = [], loading } = useAsync(listNGOFieldCoordinators);

  const coordinators = coordinatorsRaw.map((c: any) => ({
    id: c.id.substring(c.id.length - 6).toUpperCase(),
    name: c.fullName,
    area: c.locationLng ? `Sector ${Math.abs(Math.round(c.locationLng))}` : "Assigned Zone",
    activeTasks: c.activeTasks ?? 0,
    verificationQuality: `${Math.max(85, (c.trustScore || 8) * 10)}%`,
    responseSpeed: "15m",
    reportQuality: (c.trustScore || 8) >= 9 ? "Elite" : "High",
    volsSuccess: "94%",
    delayedActions: (c.activeTasks ?? 0) > 5 ? 2 : 0,
    status: c.availabilityStatus === "on_task" ? "Active" : c.availabilityStatus === "available" ? "Available" : "Offline",
    efficiency: Math.max(80, (c.trustScore || 8) * 10),
  }));

  const renderCoordinatorPerformance = (coord: any) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8"
    >
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-2xl font-black">
            {coord.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">{coord.name}</h2>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Performance ID: {coord.id}
            </div>
          </div>
        </div>
        <button
          onClick={() => setSelectedCoord(null)}
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <User className="text-slate-400" size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            Report Quality
          </div>
          <div className="text-lg font-black text-indigo-600">
            {coord.reportQuality}
          </div>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            Coordination Success
          </div>
          <div className="text-lg font-black text-emerald-600">
            {coord.volsSuccess}
          </div>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            Delayed Actions
          </div>
          <div className="text-lg font-black text-rose-500">
            {coord.delayedActions}
          </div>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">
              Overall Efficiency
            </h4>
            <span className="text-xs font-bold text-brand-green">
              {coord.efficiency}%
            </span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-green transition-all duration-1000"
              style={{ width: `${coord.efficiency}%` }}
            ></div>
          </div>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl">
          <h4 className="text-xs font-black text-amber-900 uppercase tracking-widest mb-2 flex items-center gap-2">
            <AlertCircle size={14} /> Intelligence Insight
          </h4>
          <p className="text-xs text-amber-700 leading-relaxed">
            Coordinators in {coord.area} are experiencing a 15% higher load due
            to recent weather patterns. Reward recognition is recommended to
            maintain high morale.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleAction("Reward recognition sent", coord.name)}
          className="py-3.5 bg-brand-green text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-brand-green/20"
        >
          <Award size={18} /> Reward Coordinator
        </button>
        <button
          onClick={() => handleAction("Warning notice issued", coord.name)}
          className="py-3.5 bg-rose-50 text-rose-700 border border-rose-100 rounded-2xl font-bold hover:bg-rose-100 transition-colors"
        >
          Warning Notice
        </button>
      </div>
    </motion.div>
  );

  const renderList = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden h-fit">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                <th className="p-4 pl-6">Coordinator</th>
                <th className="p-4">Area / Status</th>
                <th className="p-4">Active Tasks</th>
                <th className="p-4">Verification Quality</th>
                <th className="p-4">Response Speed</th>
                <th className="p-4 text-right pr-6">Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading && coordinators.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 text-sm">Loading field coordinators...</td>
                </tr>
              ) : coordinators.map((coord) => (
                <tr
                  key={coord.id}
                  className={`group transition-colors ${
                    selectedCoord?.id === coord.id
                      ? "bg-slate-900 text-white"
                      : "hover:bg-slate-50/50"
                  }`}
                >
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center font-bold text-sm">
                        {coord.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold leading-tight">
                          {coord.name}
                        </div>
                        <div
                          className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${
                            selectedCoord?.id === coord.id
                              ? "text-slate-400"
                              : "text-slate-500"
                          }`}
                        >
                          {coord.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold">
                        <MapPin
                          size={12}
                          className={
                            selectedCoord?.id === coord.id
                              ? "text-brand-green"
                              : "text-slate-400"
                          }
                        />
                        {coord.area}
                      </div>
                      <span
                        className={`inline-block w-fit px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase ${
                          coord.status === "Active"
                            ? "bg-emerald-100 text-emerald-700"
                            : coord.status === "High Load"
                              ? "bg-amber-100 text-amber-700"
                              : coord.status === "Emergency Response"
                                ? "bg-rose-100 text-rose-700"
                                : "bg-indigo-100 text-indigo-700"
                        }`}
                      >
                        {coord.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{coord.activeTasks}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={14} className="text-emerald-500" />
                      <span className="text-sm font-bold">{coord.verificationQuality}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-indigo-500" />
                      <span className="text-sm font-bold">{coord.responseSpeed}</span>
                    </div>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setSelectedCoord(coord)}
                        className={`p-2 rounded-lg transition-colors ${
                          selectedCoord?.id === coord.id
                            ? "bg-white/10 text-white hover:bg-white/20"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                        title="View Metrics"
                      >
                        <BarChart3 size={16} />
                      </button>
                      <button
                        onClick={() =>
                          handleAction("Area reassignment", coord.name)
                        }
                        className={`p-2 rounded-lg transition-colors ${
                          selectedCoord?.id === coord.id
                            ? "bg-white/10 text-white hover:bg-white/20"
                            : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                        }`}
                        title="Reassign Area"
                      >
                        <Zap size={16} />
                      </button>
                      <button
                        onClick={() => handleAction("Escalation", coord.name)}
                        className={`p-2 rounded-lg transition-colors ${
                          selectedCoord?.id === coord.id
                            ? "bg-white/10 text-white hover:bg-white/20"
                            : "bg-rose-50 text-rose-600 hover:bg-rose-100"
                        }`}
                        title="Escalate Issue"
                      >
                        <AlertTriangle size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && coordinators.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 text-sm">No field coordinators found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedCoord ? (
          <div key="details">{renderCoordinatorPerformance(selectedCoord)}</div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-50 border border-dashed border-slate-200 rounded-3xl p-12 text-center h-[500px] flex flex-col items-center justify-center"
          >
            <UserCheck size={64} className="text-slate-200 mb-4" />
            <h3 className="text-slate-900 font-bold mb-2">
              Select Coordinator Performance
            </h3>
            <p className="text-slate-400 text-sm max-w-xs mx-auto">
              Drill down into field reports, volunteer success rates, and
              verification metrics.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const renderPerformanceDashboard = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="flex items-center gap-3 text-indigo-600 mb-4">
            <BarChart3 size={20} />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Avg Report Quality
            </span>
          </div>
          <div className="text-4xl font-black text-slate-900 mb-2">94.2%</div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
            <ShieldCheck size={14} /> +2.4% from last week
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="flex items-center gap-3 text-emerald-600 mb-4">
            <Zap size={20} />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Coordination Success
            </span>
          </div>
          <div className="text-4xl font-black text-slate-900 mb-2">91.8%</div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
            <Activity size={14} /> Peak efficiency reached
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="flex items-center gap-3 text-rose-600 mb-4">
            <AlertTriangle size={20} />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Delayed Responses
            </span>
          </div>
          <div className="text-4xl font-black text-slate-900 mb-2">8</div>
          <div className="flex items-center gap-1.5 text-xs text-rose-500 font-bold">
            <Clock size={14} /> 3 critical escalations
          </div>
        </div>

        <div className="bg-brand-green p-6 rounded-3xl shadow-lg relative overflow-hidden group text-white">
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="flex items-center gap-3 text-white/80 mb-4">
            <Award size={20} />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">
              Top Area (Monthly)
            </span>
          </div>
          <div className="text-3xl font-black mb-2">South Clinic</div>
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <Star size={14} className="fill-white" /> 4.9/5 Trust Index
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Activity className="text-brand-green" /> Area Performance Breakdown
            </h3>
            <button className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">
              Download Report
            </button>
          </div>
          <div className="space-y-6">
            {coordinators.map((area, i) => (
              <div key={area.id} className="group cursor-default">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-green transition-colors">
                      {area.area}
                    </h4>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Led by {area.name}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900">
                    {area.efficiency}%
                  </div>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${area.efficiency}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`h-full rounded-full ${
                      area.efficiency > 90
                        ? "bg-brand-green"
                        : area.efficiency > 80
                          ? "bg-indigo-500"
                          : "bg-rose-500"
                    }`}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-green/10 blur-3xl rounded-full"></div>
          <div>
            <h3 className="text-lg font-black mb-4 relative z-10">
              Operations Insight
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 relative z-10">
              Field reports indicate that verification latency is improving in
              high-density sectors, but resource fatigue is manifesting in
              <span className="text-white font-bold mx-1">Sector 4</span>.
            </p>
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                  <Zap size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold">Optimization Needed</div>
                  <div className="text-[10px] text-slate-500">
                    Redistribute 12 volunteers to Sect 4
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold">Verification Peak</div>
                  <div className="text-[10px] text-slate-500">
                    Quality score at historic high
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full py-4 mt-8 bg-brand-green text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-brand-green/20 hover:brightness-110 transition-all relative z-10">
            Generate OPS Intelligence
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <UserCheck className="text-brand-green" size={20} />
            <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase">
              Field Operations
            </h2>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
            Field Coordinator Management
          </h1>
          <p className="text-slate-500 max-w-2xl text-sm leading-relaxed">
            Manage your ground-level leadership. Track assigned territories,
            report fidelity, and coordinator response metrics to ensure mission
            integrity.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search coordinators..."
              className="w-48 md:w-64 pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-green/20 outline-none shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: "list", label: "Coordinators List", count: coordinators.length },
          { id: "performance", label: "Global Performance", count: 0 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id as SubView)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeView === tab.id
                ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab.id === "list" ? <ClipboardList size={16} /> : <BarChart3 size={16} />}
            {tab.label}
            {tab.count > 0 && (
              <span
                className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                  activeView === tab.id ? "bg-white/20" : "bg-slate-100"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="bg-white/30 rounded-3xl p-1 min-h-[600px]">
        {activeView === "list" && renderList()}
        {activeView === "performance" && renderPerformanceDashboard()}
      </div>
    </div>
  );
}
