import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Activity, Clock, AlertTriangle, CheckCircle, Search, Filter, ShieldAlert, ArrowRight } from "lucide-react";
import { useToast } from "../Toast";
import { useAsync } from "../../lib/useAsync";
import { listTasks } from "../../lib/api";

export default function TaskMonitoringCenter() {
  const [activeTab, setActiveTab] = useState<"live" | "delayed" | "critical">("live");
  const { showToast } = useToast();
  const { data: rawTasks = [], loading } = useAsync(listTasks);

  const mappedTasks = rawTasks.map(task => ({
    id: "T-" + task.id.substring(task.id.length - 4).toUpperCase(),
    title: task.aiSuggestedAction || "Field Operation",
    assignee: task.assignedTo ? "Assigned Vol" : "Pending", // Would lookup name if we aggregated
    status: task.status,
    duration: "15m",
    priority: task.priorityScore > 8 ? "High" : task.priorityScore > 5 ? "Medium" : "Low",
    raw: task
  }));

  const activeTasks = mappedTasks.filter(t => t.status === "OPEN" || t.status === "IN_PROGRESS");
  const delayedTasks = mappedTasks.filter(t => t.priority === "High" && t.status !== "COMPLETED"); // Simple mock for delayed
  const criticalTasks = mappedTasks.filter(t => t.priority === "High");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Task Monitoring Center</h2>
          <p className="text-slate-500 text-sm mt-1 opacity-75">Live tracking of execution, delayed tasks, and high-priority field operations.</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
          {[
            { id: "live", label: "Live Tracker" },
            { id: "delayed", label: "Delayed Tasks" },
            { id: "critical", label: "High Priority" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id ? "bg-brand-green text-white shadow-xl shadow-brand-green/20" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "live" && (
          <motion.div key="live" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
            <div className="flex flex-wrap gap-4 items-center mb-6">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" placeholder="Search tasks..." className="w-full bg-white border border-slate-100 text-slate-900 pl-12 pr-4 py-3 rounded-2xl focus:ring-2 focus:ring-brand-green/20 outline-none shadow-sm" />
              </div>
              <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-100 text-slate-600 rounded-2xl hover:bg-slate-50 transition-all font-bold text-sm shadow-sm">
                <Filter size={18} /> Filters
              </button>
            </div>
            
            <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest font-black border-b border-slate-100">
                       <tr>
                         <th className="p-6">Task ID</th>
                         <th className="p-6">Objective</th>
                         <th className="p-6">Assignee</th>
                         <th className="p-6">Live Status</th>
                         <th className="p-6">Time Elapsed</th>
                         <th className="p-6 text-right">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {loading && activeTasks.length === 0 ? (
                         <tr><td colSpan={6} className="p-6 text-center text-slate-400">Loading tasks...</td></tr>
                       ) : activeTasks.map((task, i) => (
                          <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                             <td className="p-6">
                               <span className="bg-slate-50 px-3 py-1.5 rounded-xl text-[10px] font-black font-mono text-slate-400 border border-slate-100 uppercase tracking-widest">{task.id}</span>
                             </td>
                             <td className="p-6">
                               <div className="text-sm font-bold text-slate-900 group-hover:text-brand-green transition-colors">{task.title}</div>
                               <div className="text-[9px] text-slate-400 uppercase tracking-widest font-black mt-1 flex items-center gap-1.5">
                                 <div className={`w-1 h-1 rounded-full ${task.priority === 'High' ? 'bg-rose-500' : task.priority === 'Medium' ? 'bg-brand-orange' : 'bg-brand-green'}`}></div>
                                 {task.priority} Priority
                               </div>
                             </td>
                             <td className="p-6">
                               <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-xl bg-brand-peach overflow-hidden shadow-sm flex items-center justify-center text-brand-orange font-bold text-xs">
                                    {task.assignee.charAt(0)}
                                  </div>
                                  <span className="text-sm text-slate-500 font-bold">{task.assignee}</span>
                               </div>
                             </td>
                             <td className="p-6">
                               <div className="flex items-center gap-3">
                                  <div className={`w-2 h-2 rounded-full ${task.status === 'IN_PROGRESS' ? 'bg-brand-orange animate-pulse shadow-[0_0_8px_rgba(255,179,123,0.5)]' : 'bg-brand-green'}`}></div>
                                  <span className="text-xs font-bold text-slate-500">{task.status}</span>
                               </div>
                             </td>
                             <td className="p-6">
                               <span className="text-xs font-mono font-bold text-slate-400">{task.duration}</span>
                             </td>
                             <td className="p-6 text-right">
                               <button className="p-2.5 bg-white border border-slate-100 text-slate-400 hover:text-brand-green hover:border-brand-green/20 rounded-xl transition-all shadow-sm group/btn">
                                  <ArrowRight size={18} className="group-hover/btn:translate-x-0.5 transition-transform" />
                               </button>
                             </td>
                          </tr>
                       ))}
                       {!loading && activeTasks.length === 0 && (
                         <tr><td colSpan={6} className="p-6 text-center text-slate-400">No active tasks found.</td></tr>
                       )}
                    </tbody>
                 </table>
               </div>
            </div>
          </motion.div>
        )}

        {activeTab === "delayed" && (
          <motion.div key="delayed" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
             <div className="bg-brand-peach border border-brand-orange/20 rounded-[3rem] p-16 text-center flex flex-col items-center justify-center min-h-[500px] shadow-sm relative group overflow-hidden">
                <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl"></div>
                <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mb-8 shadow-sm">
                   <Clock size={40} className="text-brand-orange animate-pulse" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Delayed Tasks Pipeline</h3>
                <p className="text-slate-500 text-sm max-w-sm mb-12 leading-relaxed opacity-75 font-medium">Tasks extending beyond SLA are highlighted here. Use coordinator intervention or trigger emergency reassignment.</p>
                <div className="w-full max-w-xl mx-auto bg-white p-8 rounded-[2rem] border border-brand-orange/10 flex items-center justify-between shadow-xl shadow-brand-orange/5 hover:shadow-orange-100 transition-all group/card">
                   <div className="text-left">
                      <div className="text-xl font-bold text-slate-900 mb-1 font-serif">Vaccination Drive Delivery</div>
                      <div className="text-[10px] text-rose-500 font-black uppercase tracking-widest mt-1 flex items-center gap-1.5 font-sans"><AlertTriangle size={12}/> Overdue by 45 mins</div>
                   </div>
                   <button onClick={() => showToast("Task Reassigned", "success")} className="px-6 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all shadow-lg shadow-rose-600/20 active:scale-95 transform">
                     Force Reassign
                   </button>
                </div>
             </div>
          </motion.div>
        )}

        {activeTab === "critical" && (
          <motion.div key="critical" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
             <div className="bg-rose-50 border-2 border-rose-100 border-dashed rounded-[3rem] p-16 mb-6 shadow-sm relative group overflow-hidden text-center">
                <div className="flex items-center gap-4 text-rose-500 mb-6 justify-center">
                  <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                    <ShieldAlert size={32} />
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tight">Critical Field Ops</h3>
                </div>
                <p className="text-slate-500 text-sm md:text-center max-w-2xl mx-auto mb-10 leading-relaxed font-medium opacity-75 italic">High priority tasks are actively monitored by the main NGO command. Any delays here escalate immediately to supervisors. System is on high-alert state for these zones.</p>
                
                <div className="flex justify-center">
                  <button className="px-10 py-5 bg-rose-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-rose-600/20 hover:bg-rose-700 transition-all transform hover:-translate-y-1">
                    View 2 Active Critical Operations
                  </button>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
