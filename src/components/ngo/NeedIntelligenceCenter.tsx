import React, { useState } from "react";
import {
  Brain,
  MapPin,
  AlertTriangle,
  ShieldCheck,
  Filter,
  Users,
  XCircle,
  Search,
  Edit3,
  Merge,
  ArrowRight,
  CornerDownRight,
  Download,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useToast } from "../Toast";

type SubView = "queue" | "critical" | "history";

export default function NeedIntelligenceCenter() {
  const [activeView, setActiveView] = useState<SubView>("queue");
  const [selectedNeed, setSelectedNeed] = useState<any>(null);
  const { showToast } = useToast();

  const handleAction = (action: string) => {
    showToast(`${action} has been triggered successfully.`, "success");
  };

  const renderNeedDetails = (need: any) => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sticky top-0"
    >
      <div className="flex justify-between items-start mb-6">
        <button
          onClick={() => setSelectedNeed(null)}
          className="text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2 text-xs font-bold"
        >
          <ArrowRight className="rotate-180" size={16} /> Back to Queue
        </button>
        <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-[10px] font-black uppercase">
          {need.priority} Priority
        </span>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 mb-2">{need.title}</h2>
        <div className="flex items-center gap-4 text-slate-500 text-sm">
          <span className="flex items-center gap-1">
            <MapPin size={14} /> {need.location}
          </span>
          <span>ID: {need.id}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            Affected Population
          </div>
          <div className="text-lg font-bold text-slate-900">{need.pop}</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            Reported Time
          </div>
          <div className="text-lg font-bold text-slate-900">{need.time}</div>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div>
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
            Description & Context
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            Local informants report a critical shortage of basic supplies after
            the infrastructure damage in {need.location}. The population is
            currently without stable support, and escalation is likely if
            intervention doesn't occur in the next 24 hours.
          </p>
        </div>

        <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
          <h4 className="text-xs font-black text-indigo-900 uppercase tracking-widest mb-2">
            Intelligence Signal
          </h4>
          <p className="text-xs text-indigo-700 leading-relaxed">
            Platform AI detected a 45% increase in similar reports from this
            grid. This is classified as a Cluster-Initiated Resource Need.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <button
          onClick={() => handleAction(`Assigning volunteer to ${need.id}`)}
          className="w-full py-3 bg-brand-green text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all"
        >
          <Users size={18} /> Assign Field Volunteer
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleAction(`Escalating ${need.id}`)}
            className="py-3 bg-rose-50 text-rose-700 border border-rose-100 rounded-xl font-bold text-xs hover:bg-rose-100 transition-colors"
          >
            Escalate Priority
          </button>
          <button
            onClick={() => handleAction(`Merging duplicate ${need.id}`)}
            className="py-3 bg-slate-50 text-slate-600 border border-slate-200 rounded-xl font-bold text-xs hover:bg-slate-100 transition-colors"
          >
            Merge Duplicate
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderQueue = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="space-y-4">
        {[
          {
            id: "ND-8942",
            title: "Urgent Medical Supply Required",
            location: "Sector 4 Clinic",
            pop: "50+ people",
            priority: "Critical",
            status: "Unassigned",
            vol: "None",
            coord: "Priya M.",
            time: "10 mins ago",
          },
          {
            id: "ND-8943",
            title: "Food Rations Shortage",
            location: "Camp Alpha",
            pop: "200 families",
            priority: "High",
            status: "Pending Verification",
            vol: "None",
            coord: "Rahul S.",
            time: "1 hr ago",
          },
          {
            id: "ND-8944",
            title: "Post-Storm Shelter Request",
            location: "North District",
            pop: "15 families",
            priority: "Medium",
            status: "Under Review",
            vol: "Amit K.",
            coord: "Amit K.",
            time: "3 hrs ago",
          },
        ].map((need, i) => (
          <div
            key={i}
            onClick={() => setSelectedNeed(need)}
            className={`cursor-pointer bg-white p-5 rounded-2xl border transition-all shadow-sm ${
              selectedNeed?.id === need.id
                ? "border-brand-green ring-2 ring-brand-green/10"
                : "border-slate-100 hover:border-brand-green/30"
            } flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}
          >
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full ${
                    need.priority === "Critical"
                      ? "bg-rose-100 text-rose-700"
                      : need.priority === "High"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-indigo-100 text-indigo-700"
                  }`}
                >
                  {need.priority}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {need.id}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{need.title}</h3>
              <div className="text-xs text-slate-500 mt-2">
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <MapPin size={12} /> {need.location}
                </span>
              </div>
            </div>
            <div className="p-2 text-slate-400">
              <ChevronRight size={20} />
            </div>
          </div>
        ))}
      </div>
      <div>
        {selectedNeed ? (
          renderNeedDetails(selectedNeed)
        ) : (
          <div className="bg-slate-50 border border-dashed border-slate-200 rounded-3xl p-12 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
            <Brain size={48} className="text-slate-200 mb-4" />
            <h3 className="text-slate-900 font-bold mb-2">
              Select a Need to View Intelligence
            </h3>
            <p className="text-slate-400 text-sm max-w-xs mx-auto">
              Allocation controls, pattern analysis, and demographic breakdowns
              will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderCritical = () => (
    <div className="space-y-4">
      <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 mb-6 flex items-center gap-3">
        <div className="p-2 bg-rose-500 text-white rounded-xl">
          <AlertTriangle size={20} />
        </div>
        <div>
          <h3 className="font-bold text-rose-900 text-sm">
            Critical Need Isolation Mode Active
          </h3>
          <p className="text-rose-700/80 text-xs mt-0.5">
            Showing only urgent high-risk needs (Medical, Flood, Safety, Food).
          </p>
        </div>
      </div>
      {[
        {
          id: "CR-102",
          title: "Medical Emergency - Outbreak",
          category: "Medical",
          location: "Sector 2 Slums",
          risk: "Extremely High",
          time: "5 mins ago",
        },
        {
          id: "CR-103",
          title: "Flood Relief Rescue",
          category: "Flood",
          location: "Riverbank Colony",
          risk: "High",
          time: "15 mins ago",
        },
        {
          id: "CR-104",
          title: "Women Safety Escort Request",
          category: "Safety",
          location: "Industrial Zone C",
          risk: "High",
          time: "30 mins ago",
        },
      ].map((need, i) => (
        <div
          key={i}
          className="bg-white p-5 rounded-2xl border border-rose-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between hover:border-rose-300 transition-colors gap-4"
        >
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span
                className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full bg-rose-500 text-white animate-pulse`}
              >
                {need.category}
              </span>
              <span className="text-xs font-bold text-slate-400">
                {need.id}
              </span>
              <span className="text-xs text-rose-500 font-semibold flex items-center gap-1">
                <AlertTriangle size={12} /> {need.risk} Risk
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">{need.title}</h3>
            <div className="text-xs text-slate-500 mt-2 flex flex-wrap gap-x-4 gap-y-2">
              <span className="flex items-center gap-1 text-slate-700 font-semibold">
                <MapPin size={12} /> {need.location}
              </span>
              <span>Reported: {need.time}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full justify-end">
            <button className="py-2.5 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition-colors text-center w-full shadow-lg shadow-rose-600/20">
              Emergency Dispatch
            </button>
            <button className="py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors text-center w-full">
              Priority Override
            </button>
            <button className="py-2.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold hover:bg-rose-100 transition-colors w-full">
              Open Crisis Response
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900 text-white p-5 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2 relative z-10">
            Area Pattern Analysis
          </h3>
          <div className="text-3xl font-bold mb-2 relative z-10">
            4 Recurring Clusters
          </div>
          <p className="text-xs text-slate-400 relative z-10 mb-4">
            Water shortage spikes consistently on weekends in Sector 4.
          </p>
          <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold rounded-lg transition-colors relative z-10 flex items-center gap-2">
            <BarChart3 size={14} /> View Deep Analysis
          </button>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-3xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
              Export Integrity
            </h3>
            <div className="text-3xl font-bold mb-2 text-slate-900">
              1,240 Issues Resolved
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Export full issue history for compliance and donor transparency.
            </p>
          </div>
          <button className="px-4 py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg transition-colors flex w-fit items-center gap-2">
            <Download size={14} /> Export Need Report
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50 font-bold text-slate-900">
          Recently Resolved Needs
        </div>
        <div className="divide-y divide-slate-50">
          {[
            {
              id: "ND-8801",
              title: "Temporary Shelter Allocation",
              cluster: "North Zone",
              status: "Resolved",
              date: "Oct 24, 2023",
            },
            {
              id: "ND-8802",
              title: "Medical Supply Run",
              cluster: "Sector 2 Series",
              status: "Resolved",
              date: "Oct 24, 2023",
            },
            {
              id: "ND-8803",
              title: "Water Distribution",
              cluster: "Weekend Shortage Group",
              status: "Resolved",
              date: "Oct 23, 2023",
            },
          ].map((need, i) => (
            <div
              key={i}
              className="p-4 flex items-center justify-between hover:bg-slate-50/50"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-400">
                    {need.id}
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded uppercase">
                    {need.status}
                  </span>
                </div>
                <div className="font-bold text-sm text-slate-900">
                  {need.title}
                </div>
                <div className="text-[10px] font-semibold text-slate-500 mt-1 flex items-center gap-1">
                  <CornerDownRight size={10} /> Part of pattern: {need.cluster}
                </div>
              </div>
              <div className="text-xs font-semibold text-slate-500">
                {need.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Brain className="text-brand-green" size={20} />
            <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase">
              Operational Brain
            </h2>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
            Need Intelligence Center
          </h1>
          <p className="text-slate-500 max-w-2xl text-sm leading-relaxed">
            Manage all community needs and prioritize urgent actions. AI-sorted
            queue prioritizing by urgency, density, and vulnerability.
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
              placeholder="Search ID or Keyword..."
              className="w-48 md:w-64 pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-green/20 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: "queue", label: "Need Queue", count: 142 },
          { id: "critical", label: "Critical Needs", count: 24 },
          { id: "history", label: "Need History", count: 0 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id as SubView)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeView === tab.id
                ? tab.id === "critical"
                  ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                  : "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                : tab.id === "critical"
                  ? "bg-rose-50 text-rose-600 hover:bg-rose-100"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span
                className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                  activeView === tab.id
                    ? "bg-white/20"
                    : tab.id === "critical"
                      ? "bg-rose-200"
                      : "bg-slate-100"
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
          {activeView === "queue" && renderQueue()}
          {activeView === "critical" && renderCritical()}
          {activeView === "history" && renderHistory()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
