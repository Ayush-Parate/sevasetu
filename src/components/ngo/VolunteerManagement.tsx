import React, { useState } from "react";
import {
  Users,
  Search,
  UserCheck,
  Star,
  Activity,
  MapPin,
  Zap,
  PhoneCall,
  Award,
  MessageSquare,
  Clock,
  Send,
  ShieldCheck,
  ChevronRight,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useToast } from "../Toast";
import { useAsync } from "../../lib/useAsync";
import { listNGOVolunteers, type EnrichedVolunteer } from "../../lib/api";

type SubView = "all" | "high_impact" | "inactive";

export default function VolunteerManagement() {
  const [activeView, setActiveView] = useState<SubView>("all");
  const [selectedVolunteer, setSelectedVolunteer] = useState<EnrichedVolunteer | null>(null);
  const { showToast } = useToast();

  const { data: volunteers = [], loading } = useAsync(() => listNGOVolunteers());

  const handleAction = (action: string, name: string) => {
    showToast(`${action} for ${name} completed.`, "success");
  };

  const highImpactVolunteers = volunteers.filter(v => v.trustScore >= 8);
  const inactiveVolunteers = volunteers.filter(v => v.taskCount === 0 || v.availabilityStatus === "unavailable");

  // Helper to get UI friendly status
  const getStatusText = (status: string) => {
    if (status === "available") return "Available";
    if (status === "on_task") return "On-Task";
    return "Offline";
  };

  const renderVolunteerDetails = (vol: any) => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sticky top-0"
    >
      <div className="flex justify-between items-start mb-6">
        <button
          onClick={() => setSelectedVolunteer(null)}
          className="text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2 text-xs font-bold"
        >
          <User className="rotate-180" size={16} /> Close Profile
        </button>
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
            vol.status === "Available"
              ? "bg-emerald-100 text-emerald-700"
              : vol.status === "On-Task"
                ? "bg-indigo-100 text-indigo-700"
                : "bg-rose-100 text-rose-700"
          }`}
        >
          {vol.status}
        </span>
      </div>

      <div className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 bg-slate-900 text-white rounded-3xl flex items-center justify-center text-3xl font-black shadow-lg shadow-slate-900/10 uppercase">
          {vol.fullName.charAt(0)}
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 leading-tight">
            {vol.fullName}
          </h2>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-sm font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
              {vol.role}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
              <Star size={14} className="fill-amber-500" /> {vol.trustScore}/10
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            Total Missions
          </div>
          <div className="text-xl font-black text-slate-900">{vol.taskCount}</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            Success Rate
          </div>
          <div className="text-xl font-black text-emerald-600">{vol.successRate}%</div>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div>
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
            Core Expertise
          </h4>
          <div className="flex flex-wrap gap-2">
            {(vol.skills && vol.skills.length > 0 ? vol.skills : ["General Relief"]).map((skill: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-100"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
            Current Location
          </h4>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MapPin size={16} className="text-slate-400" /> Field Sector
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <button
          onClick={() => handleAction("Task Assignment", vol.name)}
          className="w-full py-3.5 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
        >
          <Zap size={18} className="text-brand-green" /> Assign Priority Task
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleAction("Promotion", vol.name)}
            className="py-3 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-xl font-bold text-xs hover:bg-indigo-100 transition-colors"
          >
            Promote
          </button>
          <button
            onClick={() => handleAction("Emergency SOS", vol.name)}
            className="py-3 bg-rose-50 text-rose-700 border border-rose-100 rounded-xl font-bold text-xs hover:bg-rose-100 transition-colors flex items-center justify-center gap-1.5"
          >
            <PhoneCall size={14} /> SOS
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderAllVolunteers = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden h-fit">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                <th className="p-4 pl-6">Profile</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right pr-6">Metrics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-slate-500 text-sm">Loading volunteers...</td>
                </tr>
              ) : volunteers.map((vol) => (
                <tr
                  key={vol.id}
                  onClick={() => setSelectedVolunteer(vol)}
                  className={`group cursor-pointer transition-colors ${
                    selectedVolunteer?.id === vol.id
                      ? "bg-slate-900 text-white"
                      : "hover:bg-slate-50/50"
                  }`}
                >
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-sm ${
                          selectedVolunteer?.id === vol.id
                            ? "bg-white text-slate-900"
                            : "bg-slate-900 text-white"
                        }`}
                      >
                        {vol.fullName.charAt(0)}
                      </div>
                      <div>
                        <div
                          className={`font-bold leading-tight ${
                            selectedVolunteer?.id === vol.id
                              ? "text-white"
                              : "text-slate-900"
                          }`}
                        >
                          {vol.fullName}
                        </div>
                        <div
                          className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${
                            selectedVolunteer?.id === vol.id
                              ? "text-slate-400"
                              : "text-slate-500"
                          }`}
                        >
                          {vol.role}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          vol.availabilityStatus === "available"
                            ? "bg-emerald-500"
                            : vol.availabilityStatus === "on_task"
                              ? "bg-indigo-500"
                              : "bg-rose-500"
                        }`}
                      ></span>
                      <span className="text-xs font-bold uppercase tracking-tight">
                        {getStatusText(vol.availabilityStatus)}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-amber-500">
                        <Star size={10} className="fill-amber-500" />{" "}
                        {vol.trustScore}/10
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        {vol.taskCount} Tasks
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        {selectedVolunteer ? (
          renderVolunteerDetails(selectedVolunteer)
        ) : (
          <div className="bg-slate-50 border border-dashed border-slate-200 rounded-3xl p-12 text-center h-[500px] flex flex-col items-center justify-center">
            <UserCheck size={64} className="text-slate-100 mb-4" />
            <h3 className="text-slate-900 font-bold mb-2">
              Select Profile to Manage
            </h3>
            <p className="text-slate-400 text-sm max-w-xs mx-auto">
              Real-time locations, efficiency metrics, and deployment controls
              will be accessible here.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderHighImpact = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {highImpactVolunteers.length === 0 ? (
        <div className="col-span-3 text-center text-slate-500 text-sm py-8">
          No high impact volunteers found yet.
        </div>
      ) : highImpactVolunteers.map((vol) => (
        <div
          key={vol.id}
          className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"></div>

          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-xl font-black text-white shadow-lg shadow-slate-900/20">
              {vol.fullName.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg leading-tight">
                {vol.fullName}
              </h3>
              <div className="text-xs font-bold text-slate-500">
                {vol.role} •{" "}
                <span className="text-amber-500 font-black">{vol.trustScore}/10 ★</span>
              </div>
            </div>
          </div>

          <div className="mb-6 relative z-10">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              Impact & Accolades
            </div>
            <div className="text-2xl font-black text-brand-green tracking-tight mb-2">
              {vol.taskCount} Missions
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold rounded-lg flex items-center gap-1">
                <Award size={10} className="text-amber-500" /> Crisis Elite
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 relative z-10">
            <button onClick={() => handleAction("Reward", vol.fullName)} className="w-full py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
              <Star size={14} className="fill-white" /> Reward Recognition
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderInactive = () => (
    <div className="space-y-4">
      {inactiveVolunteers.length === 0 ? (
        <div className="text-center text-slate-500 text-sm py-8">
          No inactive volunteers.
        </div>
      ) : inactiveVolunteers.map((vol) => (
        <div
          key={vol.id}
          className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 font-bold">
              {vol.fullName.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-slate-900">{vol.fullName}</h3>
              <div className="text-xs font-semibold text-slate-500 mb-1">
                {vol.role}
              </div>
              <div className="flex gap-3 text-[10px] font-bold text-slate-500">
                <span className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                  <Clock size={10} /> Status: {getStatusText(vol.availabilityStatus)}
                </span>
                <span className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md">
                  <Activity size={10} /> Joined: {vol.createdAt ? new Date(vol.createdAt).toLocaleDateString() : "—"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap md:flex-nowrap gap-2 w-full md:w-auto mt-2 md:mt-0">
            <button onClick={() => handleAction("Re-engage", vol.fullName)} className="flex-1 md:flex-none px-4 py-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold rounded-xl hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2">
              <UserCheck size={14} /> Re-engage Volunteer
            </button>
            <button onClick={() => handleAction("SMS Sent", vol.fullName)} className="flex-1 md:flex-none px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
              <Send size={14} /> Send Activation SMS
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-indigo-600" size={20} />
            <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase">
              Ecosystem Management
            </h2>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
            Volunteer Management
          </h1>
          <p className="text-slate-500 max-w-2xl text-sm leading-relaxed">
            Manage the NGO’s volunteer ecosystem. Deploy field workforce, track
            availability, assign tasks, and engage top performers to optimize
            rapid response.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search volunteers by name, skill..."
              className="w-full md:w-64 bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-green/20 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: "all", label: "All Volunteers", count: volunteers.length },
          { id: "high_impact", label: "High Impact", count: highImpactVolunteers.length },
          { id: "inactive", label: "Inactive", count: inactiveVolunteers.length },
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

      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeView === "all" && renderAllVolunteers()}
          {activeView === "high_impact" && renderHighImpact()}
          {activeView === "inactive" && renderInactive()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
