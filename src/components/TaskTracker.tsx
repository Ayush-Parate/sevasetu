import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Truck, 
  User, 
  Activity, 
  ChevronRight, 
  BarChart3, 
  TrendingUp, 
  Award,
  Users,
  Target,
  ArrowRight,
  ClipboardList,
  AlertCircle
} from "lucide-react";
import { useToast } from "./Toast";

type TaskStatus = "ASSIGNED" | "ACCEPTED" | "ON_THE_WAY" | "IN_PROGRESS" | "COMPLETED" | "VERIFIED" | "CLOSED";

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  volunteer: string;
  location: string;
  startTime: string;
  impactScore?: number;
  peopleImpacted: number;
}

const TASKS: Task[] = [
  { id: "TSK-001", title: "Emergency Water Tankers", status: "IN_PROGRESS", volunteer: "Rahul S.", location: "Sector 4 slums", startTime: "08:15 AM", peopleImpacted: 450 },
  { id: "TSK-002", title: "Medical Node Setup", status: "COMPLETED", volunteer: "Priya V.", location: "Railway Colony", startTime: "06:30 AM", impactScore: 94, peopleImpacted: 120 },
  { id: "TSK-003", title: "Ration Pack Distribution", status: "VERIFIED", volunteer: "Amit P.", location: "Market Zone", startTime: "09:00 AM", impactScore: 98, peopleImpacted: 85 },
  { id: "TSK-004", title: "Sanitation Survey", status: "ON_THE_WAY", volunteer: "John D.", location: "Industrial G", startTime: "10:00 AM", peopleImpacted: 0 },
];

const STATUS_FLOW: TaskStatus[] = ["ASSIGNED", "ACCEPTED", "ON_THE_WAY", "IN_PROGRESS", "COMPLETED", "VERIFIED", "CLOSED"];

export default function TaskTracker() {
  const { showToast } = useToast();
  const [activeSegment, setActiveSegment] = useState("live");

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
      {/* Module 7: Impact Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: "Total People Supported", val: "12,480", icon: Users, color: "text-brand-green" },
           { label: "Resolution Efficiency", val: "89.2%", icon: Activity, color: "text-blue-500" },
           { label: "Avg Time to Resolve", val: "4.2h", icon: Clock, color: "text-amber-500" },
           { label: "Impact Score Index", val: "94.5", icon: Award, color: "text-rose-500" },
         ].map((stat, i) => (
           <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-4 hover:shadow-xl transition-all">
              <div className={`w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center ${stat.color}`}>
                 <stat.icon size={22} />
              </div>
              <div className="space-y-1">
                 <div className="text-3xl font-black text-slate-900 tracking-tighter">{stat.val}</div>
                 <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">{stat.label}</div>
              </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
         {/* Task Execution Tracker (Module 6) */}
         <div className="xl:col-span-2 space-y-10">
            <div className="flex justify-between items-center px-4">
               <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase flex items-center gap-3">
                  Execution Pipeline <ClipboardList size={22} className="text-brand-green" />
               </h3>
               <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100 shadow-inner">
                  {["live", "archived"].map(t => (
                    <button
                      key={t}
                      onClick={() => setActiveSegment(t)}
                      className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSegment === t ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400'}`}
                    >
                      {t} Tasks
                    </button>
                  ))}
               </div>
            </div>

            <div className="space-y-6">
               {TASKS.map((task, i) => (
                 <motion.div
                   key={task.id}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className="bg-white p-10 rounded-[4rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden"
                 >
                    {/* Status Progress Bar (Mini) */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-50">
                       <div 
                         className="h-full bg-brand-green transition-all duration-1000" 
                         style={{ width: `${(STATUS_FLOW.indexOf(task.status) + 1) * (100 / STATUS_FLOW.length)}%` }}
                       ></div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
                       <div className="flex items-center gap-8">
                          <div className={`w-20 h-20 rounded-[2.5rem] flex items-center justify-center shrink-0 shadow-inner group-hover:rotate-12 transition-transform ${
                            task.status === 'VERIFIED' ? 'bg-brand-green/10 text-brand-green' : 
                            task.status === 'IN_PROGRESS' ? 'bg-blue-50 text-blue-500' : 'bg-slate-50 text-slate-400'
                          }`}>
                            {task.status === 'COMPLETED' || task.status === 'VERIFIED' ? <CheckCircle2 size={32} /> : <Truck size={32} />}
                          </div>
                          <div>
                             <div className="flex items-center gap-3 mb-2">
                                <span className="text-[10px] font-black text-brand-green uppercase tracking-[0.2em]">{task.status.replace(/_/g, ' ')}</span>
                                <div className="w-1.5 h-1.5 bg-slate-100 rounded-full"></div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{task.id}</span>
                             </div>
                             <h4 className="text-2xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">{task.title}</h4>
                          </div>
                       </div>
                       
                       <div className="flex gap-10">
                          <div className="text-center">
                             <div className="text-2xl font-black text-slate-900 tracking-tighter">{task.peopleImpacted}</div>
                             <div className="text-[8px] font-black uppercase tracking-widest text-slate-400">Impact Units</div>
                          </div>
                          <div className="text-center">
                             <div className="text-2xl font-black text-slate-900 tracking-tighter">{task.impactScore || '--'}</div>
                             <div className="text-[8px] font-black uppercase tracking-widest text-slate-400">Impact Score</div>
                          </div>
                       </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-slate-50">
                       <div className="flex items-center gap-8">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><User size={14} /></div>
                             <span className="text-[11px] font-bold text-slate-700 italic">{task.volunteer}</span>
                          </div>
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><MapPin size={14} /></div>
                             <span className="text-[11px] font-bold text-slate-700 italic">{task.location}</span>
                          </div>
                       </div>
                       <div className="flex gap-3">
                          <button onClick={() => showToast("Deep auditing task timeline...", "info")} className="px-6 py-3 bg-slate-50 text-slate-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">Audit Trail</button>
                          {task.status === "COMPLETED" && (
                             <button onClick={() => showToast("Task has been verified and reputation tokens awarded.", "success")} className="px-6 py-3 bg-brand-green text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">Verify Impact</button>
                          )}
                          {task.status === "IN_PROGRESS" && (
                             <button onClick={() => showToast("Requesting field check from coordinator.", "warning")} className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest">Request Sync</button>
                          )}
                       </div>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>

         {/* Module 7: Deep Analytics Sidebar */}
         <div className="space-y-10">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight italic px-4 uppercase">Impact Graph</h3>
            
            <div className="bg-slate-900 p-12 rounded-[5rem] text-white shadow-2xl relative overflow-hidden group min-h-[600px]">
               <div className="absolute top-0 right-0 p-16 opacity-10 rotate-12 -translate-y-10 group-hover:scale-125 transition-transform duration-[5s]">
                  <BarChart3 size={150} />
               </div>

               <div className="relative z-10 space-y-12">
                  <div className="flex items-center gap-4 border-b border-white/10 pb-8">
                     <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-brand-green">
                        <TrendingUp size={28} />
                     </div>
                     <div>
                        <h4 className="text-2xl font-black italic tracking-tighter uppercase">Pattern Analytics</h4>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Impact Signal</span>
                     </div>
                  </div>

                  <div className="space-y-10">
                     <div className="space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                           <span>Area Improvement</span>
                           <span className="text-brand-green">+14.2%</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-brand-green w-3/4 rounded-full"></div>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                           <span>Response Velocity</span>
                           <span className="text-blue-400">92/100</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-400 w-[92%] rounded-full"></div>
                        </div>
                     </div>

                     <div className="space-y-6 pt-6">
                        <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Efficiency Metrics</h5>
                        <div className="grid grid-cols-1 gap-4">
                           {[
                             { label: "Volunteer Load", val: "Optimal" },
                             { label: "Resource Waste", val: "2.1% (Low)" },
                             { label: "Relief Overlap", val: "Minimal" },
                           ].map((m, i) => (
                              <div key={i} className="flex justify-between items-center p-5 bg-white/5 border border-white/10 rounded-[1.5rem] hover:bg-white/10 transition-all cursor-pointer">
                                 <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{m.label}</span>
                                 <span className="text-[9px] font-black text-white italic">{m.val}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className="p-8 bg-brand-green/10 border border-brand-green/20 rounded-[3rem] space-y-4">
                     <div className="flex items-center gap-3 text-brand-green">
                        <Target size={20} />
                        <span className="text-[9px] font-black uppercase tracking-widest italic">Strategic Suggestion</span>
                     </div>
                     <p className="text-slate-400 text-[11px] font-medium italic leading-relaxed font-serif opacity-80">
                        "Deploy additional <span className="text-white font-bold underline">Water Purification Kits</span> to Sector 4. Data suggests a repeat pattern of waterborne risk alerts."
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
