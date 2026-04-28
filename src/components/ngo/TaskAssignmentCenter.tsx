import React, { useState } from "react";
import {
  ClipboardList,
  Plus,
  Brain,
  Clock,
  MapPin,
  Search,
  CheckCircle2,
  AlertTriangle,
  Save,
  Wand2,
  Star,
  UserCheck,
  Navigation2,
  Repeat,
  ShieldAlert,
  FileText,
  Camera,
  FileSignature,
  ChevronRight,
  Activity,
  Calendar,
  Zap,
  ListTodo,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useToast } from "../Toast";

type SubView = "tracker" | "create" | "assign";

export default function TaskAssignmentCenter() {
  const [activeView, setActiveView] = useState<SubView>("tracker");
  const { showToast } = useToast();

  const handleAction = (action: string, details?: string) => {
    showToast(`${action} ${details ? `- ${details}` : ""} processed successfully.`, "success");
    if (activeView === "create" || activeView === "assign") {
      setActiveView("tracker");
    }
  };

  const renderCreate = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">
            New Task Details
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                Task Title
              </label>
              <input
                type="text"
                placeholder="e.g. Deliver 50 Blankets to Sector 4"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-green/20 outline-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                  Need Category
                </label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-green/20 outline-none hover:bg-slate-100 cursor-pointer">
                  <option>Relief Supplies</option>
                  <option>Medical Assistance</option>
                  <option>Rescue / Evacuation</option>
                  <option>Food Distribution</option>
                  <option>Shelter Setup</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                  Urgency Level
                </label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-green/20 outline-none hover:bg-slate-100 cursor-pointer">
                  <option>Routine (Within 48h)</option>
                  <option>High (Within 12h)</option>
                  <option>Critical (Immediate)</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-1">
                  <MapPin size={14} /> Location
                </label>
                <input
                  type="text"
                  placeholder="Enter coordinates or address"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-green/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-1">
                  <Calendar size={14} /> Deadline
                </label>
                <input
                  type="datetime-local"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-green/20 outline-none text-slate-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">
            Requirements
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                Required Skills
              </label>
              <input
                type="text"
                placeholder="e.g. Medical, Driving, Language..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-green/20 outline-none mb-2"
              />
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-bold rounded-lg flex items-center gap-1">
                  First Aid{" "}
                  <button className="hover:text-rose-500 transition-colors">
                    &times;
                  </button>
                </span>
                <span className="px-2 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-bold rounded-lg flex items-center gap-1">
                  Heavy Lifting{" "}
                  <button className="hover:text-rose-500 transition-colors">
                    &times;
                  </button>
                </span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-1">
                <UserCheck size={14} /> Volunteer Requirement
              </label>
              <input
                type="number"
                min="1"
                placeholder="Number of volunteers"
                defaultValue="2"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-green/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 font-mono tracking-widest text-[#5D8D70]">
                Proof Required
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors shadow-sm">
                  <input
                    type="checkbox"
                    className="accent-brand-green w-4 h-4 cursor-pointer"
                    defaultChecked
                  />
                  <Camera size={16} className="text-slate-400" /> Photo
                  Verification
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors shadow-sm">
                  <input
                    type="checkbox"
                    className="accent-brand-green w-4 h-4 cursor-pointer"
                    defaultChecked
                  />
                  <MapPin size={16} className="text-slate-400" /> GPS Location
                  Ping
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors shadow-sm">
                  <input
                    type="checkbox"
                    className="accent-brand-green w-4 h-4 cursor-pointer"
                  />
                  <FileSignature size={16} className="text-slate-400" />{" "}
                  Recipient Signature
                </label>
              </div>
            </div>
          </div>
        </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleAction("AI Matching Optimized")}
              className="w-full py-3.5 bg-gradient-to-r from-brand-green to-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-brand-green/20 hover:shadow-xl hover:from-emerald-500 hover:to-brand-green transition-all flex items-center justify-center gap-2"
            >
              <Wand2 size={18} /> Auto Match Volunteers
            </button>
            <button
              onClick={() => handleAction("New Task Created")}
              className="w-full py-3.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={18} /> Create Task
            </button>
            <button
              onClick={() => handleAction("Task Draft Saved")}
              className="w-full py-3.5 bg-white text-slate-700 border border-slate-200 text-sm font-bold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              <Save size={18} /> Save Draft
            </button>
          </div>
      </div>
    </div>
  );

  const renderAssign = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 bg-white border border-slate-100 rounded-3xl p-4 space-y-4 max-h-[800px] overflow-y-auto custom-scrollbar shadow-sm">
        <div className="mb-4">
          <h3 className="font-bold text-slate-900 text-lg mb-1 flex items-center gap-2">
            <ListTodo size={18} className="text-indigo-500" /> Pending
            Assignments
          </h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest pl-6">
            12 Tasks awaiting deployment
          </p>
        </div>
        {[
          {
            id: "T-1029",
            title: "Deliver Blankets",
            loc: "Sector 4",
            urgent: true,
          },
          {
            id: "T-1030",
            title: "Medical Drop-off",
            loc: "Camp Alpha",
            urgent: true,
          },
          {
            id: "T-1031",
            title: "Site Assessment",
            loc: "North Dist",
            urgent: false,
          },
          {
            id: "T-1032",
            title: "Water Supply Load",
            loc: "Sector B",
            urgent: false,
          },
        ].map((task, i) => (
          <div
            key={i}
            className={`p-4 rounded-2xl border ${i === 0 ? "border-indigo-500 bg-indigo-50/50 shadow-md shadow-indigo-500/10" : "border-slate-100 bg-white hover:border-slate-300"} cursor-pointer transition-colors relative overflow-hidden group`}
          >
            {i === 0 && (
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
            )}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-slate-400">
                {task.id}
              </span>
              {task.urgent && (
                <span className="px-2 py-0.5 bg-rose-100 text-rose-700 text-[10px] font-bold rounded uppercase">
                  Urgent
                </span>
              )}
            </div>
            <h4
              className={`font-bold ${i === 0 ? "text-indigo-900" : "text-slate-800"} text-sm mb-1 group-hover:text-indigo-600 transition-colors`}
            >
              {task.title}
            </h4>
            <div className="text-xs text-slate-500 flex items-center gap-1 font-semibold">
              <MapPin size={10} /> {task.loc}
            </div>
          </div>
        ))}
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-slate-800 shadow-xl shadow-slate-900/10">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-green/20 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3"></div>
          <div className="relative z-10 w-full">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="text-brand-green" size={20} />
              <h3 className="font-bold text-slate-100 text-lg">
                Smart Assignment Engine for T-1029
              </h3>
            </div>
            <p className="text-sm text-slate-400">
              AI has ranked available volunteers based on proximity, skills, and
              historical trust metric vectors.
            </p>
          </div>
          <button className="shrink-0 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-bold transition-colors w-full md:w-auto relative z-10 shadow-lg shadow-black/20">
            Open Volunteer Pool
          </button>
        </div>

        <div className="space-y-4">
          {[
            {
              name: "Vikram Singh",
              dist: "1.2 km away",
              match: 98,
              trust: 4.9,
              lang: "Match",
              status: "Available Now",
            },
            {
              name: "Priya Patel",
              dist: "3.5 km away",
              match: 85,
              trust: 4.8,
              lang: "Match",
              status: "Finishing Task",
            },
            {
              name: "Arjun Reddy",
              dist: "0.8 km away",
              match: 72,
              trust: 4.2,
              lang: "Partial",
              status: "Available Now",
            },
          ].map((vol, j) => (
            <div
              key={j}
              className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 group hover:border-slate-300 transition-all hover:shadow-md"
            >
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg border ${j === 0 ? "bg-brand-green text-white border-brand-green shadow-lg shadow-brand-green/20" : "bg-slate-50 text-slate-600 border-slate-200"}`}
                >
                  {vol.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg leading-tight">
                    {vol.name}
                  </h4>
                  <div className="text-[10px] uppercase font-bold tracking-widest flex items-center gap-2 mt-1.5">
                    <span className="text-emerald-600 flex items-center gap-1">
                      <Activity size={10} /> {vol.status}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500 flex items-center gap-1">
                      <MapPin size={10} /> {vol.dist}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 lg:flex gap-4 lg:gap-8 w-full md:w-auto mt-4 md:mt-0 px-4 md:px-0 bg-slate-50/50 p-3 rounded-2xl border border-slate-100/50">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Match
                  </div>
                  <div
                    className={`text-xl font-black ${vol.match > 90 ? "text-brand-green" : vol.match > 80 ? "text-indigo-600" : "text-amber-500"}`}
                  >
                    {vol.match}%
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Trust
                  </div>
                  <div className="text-sm font-bold text-slate-700 mt-1.5 flex items-center gap-1">
                    <Star size={14} className="text-amber-400 fill-amber-400" />{" "}
                    {vol.trust}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Lang
                  </div>
                  <div className="text-sm font-bold text-slate-700 mt-1.5">
                    {vol.lang}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full md:w-40 shrink-0 mt-4 md:mt-0">
                <button
                  onClick={() => handleAction("One-Click Assign", vol.name)}
                  className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
                >
                  One-Click Assign
                </button>
                <button
                  onClick={() => handleAction("Force Assign Overridden", vol.name)}
                  className="w-full py-2 bg-slate-50 text-slate-600 border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors"
                >
                  Force Assign
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTracker = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto min-h-[500px]">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-slate-50/80 backdrop-blur-sm text-[10px] text-slate-500 font-bold tracking-widest uppercase border-b border-slate-100 sticky top-0 z-20">
              <tr>
                <th className="px-6 py-4">Task Information</th>
                <th className="px-6 py-4">Assigned Resource</th>
                <th className="px-6 py-4 w-[45%]">Live Status Trail</th>
                <th className="px-6 py-4 text-right">
                  Mission Control actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                {
                  id: "T-1025",
                  title: "Medical Camp Setup",
                  vol: "Sneha Reddy",
                  statusPath: ["assigned", "accepted", "on_way", "in_progress"],
                  currentStatus: "in_progress",
                  stall: false,
                },
                {
                  id: "T-1026",
                  title: "Food Distribution",
                  vol: "Priya Patel",
                  statusPath: ["assigned", "accepted"],
                  currentStatus: "accepted",
                  stall: true,
                },
                {
                  id: "T-1027",
                  title: "Water Supply Drop",
                  vol: "Amit Kumar",
                  statusPath: [
                    "assigned",
                    "accepted",
                    "on_way",
                    "in_progress",
                    "completed",
                    "verified",
                  ],
                  currentStatus: "verified",
                  stall: false,
                },
                {
                  id: "T-1028",
                  title: "Damage Assessment",
                  vol: "Vikram Singh",
                  statusPath: ["assigned", "accepted", "on_way"],
                  currentStatus: "on_way",
                  stall: false,
                },
              ].map((task, i) => {
                const allStatuses = [
                  { key: "assigned", label: "Assigned" },
                  { key: "accepted", label: "Accepted" },
                  { key: "on_way", label: "On Way" },
                  { key: "in_progress", label: "In Progress" },
                  { key: "completed", label: "Completed" },
                  { key: "verified", label: "Verified" },
                ];

                const currentIndex = allStatuses.findIndex(
                  (s) => s.key === task.currentStatus,
                );

                return (
                  <tr
                    key={i}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                        {task.id}
                      </div>
                      <div className="font-bold text-slate-900 group-hover:text-brand-green transition-colors">
                        {task.title}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                          {task.vol.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-slate-700">
                          {task.vol}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-between relative max-w-md w-full mx-auto">
                        {/* Track Line */}
                        <div className="absolute top-[5px] left-0 w-full h-1 bg-slate-100 -translate-y-1/2 rounded-full z-0"></div>
                        <div
                          className={`absolute top-[5px] left-0 h-1 -translate-y-1/2 rounded-full z-0 transition-all duration-1000 ${task.stall ? "bg-rose-500" : "bg-brand-green"}`}
                          style={{ width: `${(currentIndex / 5) * 100}%` }}
                        ></div>

                        {/* Nodes */}
                        <div className="relative z-10 w-full flex justify-between">
                          {allStatuses.map((step, idx) => {
                            const isComplete = idx <= currentIndex;
                            const isCurrent = idx === currentIndex;
                            return (
                              <div
                                key={idx}
                                className="flex flex-col justify-center items-center group/tooltip cursor-help relative -mt-[1px]"
                              >
                                <div
                                  className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-500 ${
                                    isComplete
                                      ? task.stall && isCurrent
                                        ? "bg-rose-500 border-rose-500 animate-pulse ring-4 ring-rose-500/20"
                                        : "bg-brand-green border-brand-green shadow-md shadow-brand-green/40"
                                      : "bg-white border-slate-300"
                                  }`}
                                >
                                  {isComplete && !isCurrent && !task.stall && (
                                    <div className="w-[3px] h-[3px] bg-white rounded-full mx-auto mt-[2px]"></div>
                                  )}
                                </div>
                                {/* Custom Tooltip */}
                                <div className="absolute top-5 opacity-0 group-hover/tooltip:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap z-30 pointer-events-none before:content-[''] before:absolute before:-top-1 before:left-1/2 before:-translate-x-1/2 before:border-l-4 before:border-r-4 before:border-b-4 before:border-l-transparent before:border-r-transparent before:border-b-slate-900">
                                  {step.label}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between max-w-md mx-auto items-center">
                        {task.stall ? (
                          <span className="text-[10px] font-bold uppercase tracking-widest text-rose-500 flex items-center gap-1 bg-rose-50 px-2 py-0.5 rounded-md">
                            <AlertTriangle size={10} /> Blocked at{" "}
                            {allStatuses[currentIndex].label}
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            On Track
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-bold uppercase tracking-widest ${task.currentStatus === "verified" ? "text-brand-green" : "text-slate-600"}`}
                        >
                          {allStatuses[currentIndex].label}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex flex-col lg:flex-row items-center justify-end gap-2">
                        <button
                          onClick={() => handleAction("Live Tracking Ping Sent", task.id)}
                          className="px-3 py-1.5 bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 w-full lg:w-auto"
                        >
                          <Navigation2 size={12} /> Track
                        </button>
                        {task.stall && (
                          <>
                            <button
                              onClick={() => handleAction("Reassignment Engine Triggered", task.id)}
                              className="px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 w-full lg:w-auto shadow-sm shadow-amber-700/10"
                            >
                              <Repeat size={12} /> Reassign
                            </button>
                            <button
                              onClick={() => handleAction("Priority Escalation Processed", task.id)}
                              className="px-3 py-1.5 bg-rose-500 text-white rounded-lg text-[10px] font-bold hover:bg-rose-600 transition-colors flex items-center justify-center gap-1.5 w-full lg:w-auto shadow-sm shadow-rose-500/20"
                            >
                              <ShieldAlert size={12} /> Escalate
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ClipboardList className="text-indigo-600" size={20} />
            <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase">
              Operational Execution
            </h2>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
            Task Assignment Center
          </h1>
          <p className="text-slate-500 max-w-2xl text-sm leading-relaxed">
            Create exact directives, use AI to match the perfect volunteers, and
            track hyper-local execution live across the field.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 shrink-0">
        {[
          {
            id: "tracker",
            label: "Live Task Tracker",
            count: 42,
            icon: Activity,
          },
          {
            id: "assign",
            label: "Smart Assignment Engine",
            count: 12,
            icon: Brain,
          },
          { id: "create", label: "New Task Creation", count: 0, icon: Plus },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id as SubView)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeView === tab.id
                ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:shadow-sm"
            }`}
          >
            <tab.icon
              size={16}
              className={
                activeView === tab.id ? "text-brand-green" : "text-slate-400"
              }
            />
            {tab.label}
            {tab.count > 0 && (
              <span
                className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                  activeView === tab.id
                    ? "bg-white/20"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {activeView === "create" && renderCreate()}
            {activeView === "assign" && renderAssign()}
            {activeView === "tracker" && renderTracker()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
