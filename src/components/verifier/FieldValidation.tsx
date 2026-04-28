import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Users, 
  MapPin, 
  Radio, 
  Smartphone, 
  CheckCircle2, 
  XSquare, 
  History, 
  ClipboardList, 
  AlertTriangle,
  Zap,
  Clock,
  ArrowRight,
  ShieldCheck,
  Eye,
  Camera,
  Layers
} from "lucide-react";
import { useToast } from "../Toast";

export default function FieldValidation() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("incoming");

  const requests = [
    { id: "FLD-101", region: "Sector 4 Market", task: "Duplicate Fire Check", priority: "Critical", status: "In-Field" },
    { id: "FLD-102", region: "Railway Slums", task: "Ration Scarcity Audit", priority: "High", status: "Awaiting Dispatch" },
    { id: "FLD-103", region: "Gate 2 Transit", task: "Medical Node Verification", priority: "Medium", status: "Awaiting Dispatch" },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-top-20 duration-1000">
      <div className="bg-slate-950 p-16 rounded-[4.5rem] text-white shadow-2xl relative overflow-hidden group">
         <div className="absolute right-0 top-0 p-20 opacity-[0.05] pointer-events-none group-hover:scale-125 transition-transform duration-[5s]">
            <Radio size={250} />
         </div>
         <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12 text-center lg:text-left">
            <div className="space-y-6 max-w-2xl">
               <div className="flex items-center gap-4 justify-center lg:justify-start">
                  <div className="w-14 h-14 bg-brand-green/20 rounded-3xl flex items-center justify-center text-brand-green shadow-xl shadow-brand-green/10 border border-brand-green/20">
                     <Eye size={28} />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-[0.3em] font-mono opacity-60">Physical Field Validation Protocol active</span>
               </div>
               <h2 className="text-5xl font-black tracking-tighter italic uppercase leading-none">Deploy Real-World Eyes</h2>
               <p className="text-slate-400 text-lg font-medium italic opacity-80 leading-relaxed font-serif">
                  "When AI consensus fails or high-risk anomalies are detected, we dispatch specialized field vanguards to verify the physical reality of a report."
               </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 bg-white/5 p-10 rounded-[3rem] border border-white/10 shadow-inner">
               <div className="text-center">
                  <div className="text-5xl font-black tracking-tighter text-brand-green">14</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">Active Scouts</div>
               </div>
               <div className="text-center">
                  <div className="text-5xl font-black tracking-tighter text-blue-400">08</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">Open Requests</div>
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
         {/* Request Queue */}
         <div className="xl:col-span-2 space-y-10">
            <div className="flex justify-between items-center px-4">
               <h3 className="text-2xl font-black text-slate-900 tracking-tight italic flex items-center gap-3">
                  Validation Queue <ClipboardList size={22} className="text-slate-400" />
               </h3>
               <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-2 overflow-x-auto no-scrollbar">
                  {["incoming", "active_dispatch", "completed"].map(t => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === t ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {t.replace('_', ' ')}
                    </button>
                  ))}
               </div>
            </div>

            <div className="space-y-6">
               {requests.map((req, i) => (
                 <motion.div
                   key={req.id}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className="bg-white p-10 rounded-[4rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer group flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
                 >
                    <div className="absolute left-0 top-0 w-2 h-full bg-slate-900"></div>
                    <div className="flex items-center gap-8">
                       <div className={`w-20 h-20 rounded-[2.5rem] flex items-center justify-center shrink-0 shadow-inner group-hover:rotate-12 transition-transform ${req.priority === 'Critical' ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-900'}`}>
                          <Layers size={32} />
                       </div>
                       <div>
                          <div className="flex items-center gap-3 mb-1">
                             <span className={`text-[10px] font-black uppercase tracking-widest ${req.priority === 'Critical' ? 'text-rose-500' : 'text-slate-400'}`}>{req.priority} Validation</span>
                             <div className="w-1.5 h-1.5 bg-slate-100 rounded-full"></div>
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{req.id}</span>
                          </div>
                          <h4 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-4">{req.task}</h4>
                          <div className="flex items-center gap-6">
                             <div className="flex items-center gap-2 text-[10px] font-bold italic text-slate-500"><MapPin size={14} className="text-brand-green" /> {req.region}</div>
                             <div className="flex items-center gap-2 text-[10px] font-bold italic text-slate-500"><Clock size={14} className="text-slate-300" /> Time Slotted: 2h Window</div>
                          </div>
                       </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                       <button 
                         onClick={() => showToast("Specialist assigned to " + req.region, "success")}
                         className="px-6 py-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-[9px] shadow-lg hover:bg-brand-green transition-all"
                       >
                         Assign Field Visit
                       </button>
                       <button 
                         onClick={() => showToast("Field verification marked as completed.", "success")}
                         className="px-6 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-slate-50 transition-all font-bold"
                       >
                         Visit Completed
                       </button>
                       <button 
                         onClick={() => showToast("Reopening field investigation.", "warning")}
                         className="p-4 bg-rose-50 text-rose-500 rounded-xl border border-rose-100 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center"
                       >
                         <AlertTriangle size={18} />
                       </button>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>

         {/* Dispatch Coordination */}
         <div className="xl:col-span-1 space-y-10">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight ml-4">Unit Deployment Hub</h3>
            <div className="bg-white border border-slate-100 p-12 rounded-[4.5rem] shadow-sm relative overflow-hidden group min-h-[500px]">
               <div className="absolute bottom-0 right-0 p-20 opacity-[0.03] group-hover:rotate-45 transition-transform duration-[5s] text-brand-green">
                  <Smartphone size={200} />
               </div>
               
               <div className="relative z-10 space-y-10">
                  <div className="space-y-4">
                     <h4 className="text-xl font-black italic uppercase tracking-tight text-slate-900">Lead Field Specialist Pool</h4>
                     <p className="text-slate-400 text-xs font-medium italic opacity-75 font-serif leading-relaxed">
                        "Selecting the highest-trust scouts with expert regional knowledge for critical validation deployment."
                     </p>
                  </div>

                  <div className="space-y-4">
                     {[
                       { name: "Scout Vector-4", distance: "450m", trust: 980, active: true },
                       { name: "Unit 01-Shield", distance: "1.2km", trust: 920, active: false },
                       { name: "Scout X-Ray", distance: "3.4km", trust: 995, active: true },
                     ].map((unit, i) => (
                        <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all group/unit pointer-events-none">
                           <div className="flex items-center gap-6">
                              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-inner relative">
                                 <Users size={22} className="text-slate-400 group-hover/unit:text-brand-green" />
                                 {unit.active && <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-green border-2 border-white rounded-full animate-pulse"></div>}
                              </div>
                              <div>
                                 <div className="text-sm font-bold text-slate-900 leading-none">{unit.name}</div>
                                 <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{unit.distance} from site</div>
                              </div>
                           </div>
                           <div className="text-right">
                              <div className="text-xl font-black text-slate-900 tracking-tighter">{unit.trust}</div>
                              <div className="text-[8px] font-black uppercase tracking-widest text-slate-400">Score</div>
                           </div>
                        </div>
                     ))}
                  </div>

                  <div className="pt-8 space-y-4">
                     <button onClick={() => showToast("Broadcasting high-priority field request...", "loading")} className="w-full py-5 border-2 border-slate-900 text-slate-900 rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 hover:text-white transition-all shadow-xl shadow-slate-200/20 transform active:scale-95">Open Global Dispatch Channel</button>
                     <div className="text-center text-[9px] font-black text-slate-400 uppercase tracking-widest italic opacity-60">System Auto-Auth Enabled for Scouts with 950+ pts</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
