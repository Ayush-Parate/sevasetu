import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Camera, 
  Upload, 
  AlertTriangle,
  FileText,
  User,
  ArrowRight,
  ChevronDown,
  Navigation,
  MessageCircle,
  Phone
} from "lucide-react";
import { useToast } from "../Toast";

export default function MyTaskTracker() {
  const [activeSubTab, setActiveSubTab] = useState<"active" | "completed" | "delayed">("active");
  const [expandedId, setExpandedId] = useState<string | null>("T-990");
  const { showToast } = useToast();

  const activeTasks = [
    {
      id: "T-990",
      title: "Essential Grocery Delivery",
      status: "In Progress",
      assignedTo: "Family #44 in Block A",
      timeLeft: "45 mins",
      progress: 65,
      urgency: "High",
      location: "Sector 4, Rohini",
      details: "Request includes milk, bread, and basic hygiene kit. Beneficiary is elderly and housebound."
    }
  ];

  const completedTasks = [
    {
      id: "T-845",
      title: "Wheelchair Escort",
      status: "Verified",
      assignedTo: "Mr. Khanna",
      completedDate: "April 25, 2026",
      impact: "+40 pts",
      location: "Metro Station",
      details: "Assisted elderly citizen from metro gate to nearby clinic."
    }
  ];

  const delayedTasks = [
    {
      id: "T-912",
      title: "Water Tank Survey",
      status: "Overdue",
      assignedTo: "MCD Water Office",
      delayReason: "High local traffic/protest",
      delayTime: "4h late",
      location: "Civic Center",
      details: "Visual audit of public water tanks for contamination."
    }
  ];

  const renderActive = () => (
    <div className="space-y-6">
      {activeTasks.map((task) => (
        <div 
          key={task.id}
          className={`bg-white border rounded-[3rem] transition-all overflow-hidden ${expandedId === task.id ? 'border-brand-green ring-4 ring-brand-green/5 shadow-2xl shadow-brand-green/10' : 'border-slate-100 shadow-sm'}`}
        >
          <div className="p-8 cursor-pointer flex items-center justify-between" onClick={() => setExpandedId(expandedId === task.id ? null : task.id)}>
            <div className="flex items-center gap-8">
               <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform active:scale-95">
                  <Clock size={28} className="animate-spin-slow" />
               </div>
               <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1 tracking-tight">{task.title}</h3>
                  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                     <span className="flex items-center gap-1.5 font-bold"><MapPin size={12} className="text-brand-green" /> {task.location}</span>
                  </div>
               </div>
            </div>
            <div className="flex items-center gap-8">
               <div className="text-right hidden sm:block">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Impact Potential</div>
                  <div className="text-sm font-bold text-brand-green italic tracking-tight">+80 pts</div>
               </div>
               <ChevronDown size={20} className={`text-slate-300 transition-all ${expandedId === task.id ? 'rotate-180' : ''}`} />
            </div>
          </div>
          {expandedId === task.id && (
            <div className="p-10 border-t border-slate-50 space-y-12">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                     <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-inner italic text-slate-500 text-sm font-serif opacity-80 leading-relaxed font-medium capitalize">
                        "{task.details}"
                     </div>
                     <div className="flex gap-4">
                        <button className="flex-1 py-5 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 shadow-sm flex items-center justify-center gap-3">
                           <Navigation size={18} /> GPS Route
                        </button>
                        <button className="flex-[1.5] py-5 bg-rose-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-rose-600/20 flex items-center justify-center gap-3">
                           <AlertTriangle size={18} /> Emergency Escalate
                        </button>
                     </div>
                  </div>
                  <div className="bg-slate-50 rounded-[3rem] p-10 border border-slate-100 flex flex-col items-center justify-center text-center space-y-8 shadow-inner relative overflow-hidden group">
                     <div className="w-20 h-20 bg-white border border-slate-200 rounded-[2rem] flex items-center justify-center text-slate-300 group-hover:scale-110 transition-transform">
                        <Camera size={40} className="group-hover:text-brand-green transition-colors" />
                     </div>
                     <div className="space-y-2">
                        <h4 className="text-xl font-black text-slate-900 tracking-tight">Proof Evidence Required</h4>
                        <p className="text-xs text-slate-400 font-medium italic">Photos must be captured within 100m of target site.</p>
                     </div>
                     <button onClick={() => showToast("Submitting evidence...", "success")} className="w-full py-5 bg-brand-green text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs shadow-[0_20px_50px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                        <CheckCircle2 size={24} /> Log Mission Success
                     </button>
                  </div>
               </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderCompleted = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {completedTasks.map(task => (
        <div key={task.id} className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
           <div className="absolute right-[-20px] top-[-20px] w-24 h-24 bg-emerald-50 rounded-full blur-3xl group-hover:bg-brand-green/20"></div>
           <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="p-3 bg-emerald-50 text-emerald-500 rounded-xl shadow-inner">
                 <CheckCircle2 size={24} />
              </div>
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100">Impact: {task.impact}</span>
           </div>
           <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">{task.title}</h3>
           <p className="text-slate-500 text-xs italic font-medium mb-8 opacity-75 leading-relaxed">"{task.details}"</p>
           <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Date: {task.completedDate}</span>
              <button className="p-2 border border-slate-100 rounded-xl text-slate-400 hover:text-brand-green transition-all shadow-sm">
                 <FileText size={18} />
              </button>
           </div>
        </div>
      ))}
    </div>
  );

  const renderDelayed = () => (
    <div className="space-y-6">
      {delayedTasks.map(task => (
        <div key={task.id} className="bg-white border-2 border-rose-50 p-10 rounded-[3rem] shadow-sm flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-[0.03] scale-150 rotate-12 pointer-events-none group-hover:text-rose-500 transition-all">
              <Clock size={100} />
           </div>
           <div className="flex items-center gap-8 flex-1">
              <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                 <AlertTriangle size={32} />
              </div>
              <div>
                 <h3 className="text-xl font-bold text-slate-900 mb-1 tracking-tight">{task.title}</h3>
                 <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-rose-500">
                    <span className="flex items-center gap-1.5 font-bold">Delay: {task.delayTime}</span>
                    <span className="w-1 h-1 bg-rose-200 rounded-full"></span>
                    <span className="italic opacity-80">Reason: {task.delayReason}</span>
                 </div>
              </div>
           </div>
           <div className="flex gap-4">
              <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-900/20 active:scale-95">Reassign Mission</button>
              <button className="px-8 py-4 bg-white border border-slate-100 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm active:scale-95">Log Delay Note</button>
           </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm gap-8 transition-all hover:shadow-xl">
         <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Action Tracker Command</h2>
            <p className="text-slate-500 text-sm mt-1 font-medium italic opacity-75">Unified mission management for verified field contributors.</p>
         </div>
         <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100 shadow-inner">
           {[
             { id: 'active', label: 'Active', count: activeTasks.length },
             { id: 'completed', label: 'Completed', count: completedTasks.length },
             { id: 'delayed', label: 'Delayed', count: delayedTasks.length }
           ].map(tab => (
             <button
               key={tab.id}
               onClick={() => setActiveSubTab(tab.id as any)}
               className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${activeSubTab === tab.id ? 'bg-white text-brand-green shadow-xl border border-brand-green/10' : 'text-slate-400'}`}
             >
               {tab.label} <span className={`px-2 py-0.5 rounded-lg text-[8px] ${activeSubTab === tab.id ? 'bg-brand-green text-white' : 'bg-slate-200 text-slate-500'}`}>{tab.count}</span>
             </button>
           ))}
         </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeSubTab} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
          {activeSubTab === 'active' && renderActive()}
          {activeSubTab === 'completed' && renderCompleted()}
          {activeSubTab === 'delayed' && renderDelayed()}
        </motion.div>
      </AnimatePresence>

      {/* Manual Quick Action Button */}
      <div className="fixed bottom-12 right-12 z-50">
        <button onClick={() => showToast("Emergency Comms Triggered", "info")} className="w-20 h-20 bg-rose-600 text-white rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(225,29,72,0.4)] hover:scale-110 active:scale-95 transition-all group">
           <MessageCircle size={32} className="group-hover:rotate-12 transition-transform" />
           <span className="absolute -top-4 -right-4 bg-white text-rose-600 text-[8px] font-black px-2 py-1 rounded-full border border-rose-100 uppercase tracking-widest shadow-md">SOS Unit</span>
        </button>
      </div>
    </div>
  );
}
