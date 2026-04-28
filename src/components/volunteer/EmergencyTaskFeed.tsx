import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, AlertCircle, Phone, ArrowRight, MapPin, Clock, ShieldAlert, Zap, Radio, Users, Flame, Navigation, MessageCircle, CheckCircle2, ChevronDown, Camera, FileText } from "lucide-react";
import { useToast } from "../Toast";

export default function EmergencyTaskFeed() {
  const { showToast } = useToast();
  const [activeEmergency, setActiveEmergency] = useState<string | null>("EMG-102");

  const emergencies = [
    {
      id: "EMG-102",
      title: "Medical Transport Needed",
      level: "Critical • Red Alert",
      location: "Old Delhi Gate, Market Area",
      desc: "An elderly citizen has collapsed near the clock tower. Ambulances are stuck in local congestion. Need first-responder to reach site, assess vitals, and coordinate with the approaching paramedic team.",
      deadline: "Immediate (7 mins)",
      instructions: [
        "Reach location via alleyways to avoid traffic.",
        "Check for pulse and breathing immediately.",
        "Clear 10ft radius for paramedic stretcher.",
        "Report BP/Heart Rate via app interface."
      ],
      backupTeams: ["Sector 4 Responders", "Red Cross Unit 2"]
    },
    {
      id: "EMG-104",
      title: "Flash Flood Alert",
      level: "Severe • Orange Warning",
      location: "Narela Industrial Area",
      desc: "Water levels rising near basement housing units. Need evacuation check for 4 identified non-mobile residents.",
      deadline: "Within 40 mins",
      instructions: [
        "Knock on doors 12A-18C.",
        "Distribute high-calorie biscuits.",
        "Mark verified evacuated units with red tape."
      ],
      backupTeams: ["NDRF Liaison", "Local Youth Club"]
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="bg-rose-600 p-16 rounded-[4rem] text-white shadow-2xl shadow-rose-600/30 relative overflow-hidden group">
         <div className="absolute right-[-100px] top-[-100px] w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] animate-pulse"></div>
         <div className="relative z-10 space-y-6 max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
               <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <AlertTriangle size={24} className="animate-bounce" />
               </div>
               <span className="text-[12px] font-black uppercase tracking-[0.3em]">Extreme Priority Protocol Enforced</span>
            </div>
            <h2 className="text-5xl font-black tracking-tighter leading-none mb-4">Emergency Field Command</h2>
            <p className="text-rose-100 text-lg font-medium italic opacity-90 leading-relaxed max-w-2xl">
               Only verified 'Emergency Responders' can accept these tasks. Your real-time location will be shared with the District Central Control for safety synchronization.
            </p>
         </div>
         <div className="absolute top-12 right-12 hidden xl:block">
            <div className="p-8 bg-white/10 rounded-[3rem] border border-white/20 backdrop-blur-md flex flex-col items-center">
               <span className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">My Status</span>
               <div className="text-xl font-black tracking-tighter">Combat Ready</div>
               <div className="w-2 h-2 bg-emerald-400 rounded-full mt-3 shadow-[0_0_10px_#10b981]"></div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
         {emergencies.map(emg => (
           <motion.div 
             key={emg.id}
             onClick={() => setActiveEmergency(emg.id)}
             className={`bg-white border rounded-[3.5rem] p-12 transition-all cursor-pointer relative overflow-hidden ${activeEmergency === emg.id ? 'border-rose-200 ring-4 ring-rose-50 shadow-2xl' : 'border-slate-100 shadow-sm opacity-80'}`}
           >
              <div className="flex justify-between items-start mb-10">
                 <div className="space-y-2">
                    <span className="text-[10px] font-black text-rose-500 bg-rose-50 border border-rose-100 px-4 py-1.5 rounded-full uppercase tracking-widest">{emg.level}</span>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">{emg.title}</h3>
                 </div>
                 <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Time to Response</span>
                    <span className="text-lg font-black text-rose-600 animate-pulse">{emg.deadline}</span>
                 </div>
              </div>

              <p className="text-slate-500 text-sm font-medium leading-relaxed italic border-l-4 border-rose-500 pl-6 mb-12">
                 "{emg.desc}"
              </p>

              <div className="space-y-8 mb-12">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Strict Instructions (Step-by-Step)</h4>
                 <div className="space-y-4">
                    {emg.instructions.map((inst, idx) => (
                       <div key={idx} className="flex gap-4 items-start group">
                          <div className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px] font-black shrink-0 group-hover:bg-rose-600 transition-colors">{idx + 1}</div>
                          <span className="text-slate-600 text-sm font-medium">{inst}</span>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                 <button 
                   onClick={(e) => { e.stopPropagation(); showToast("ACCEPTING PROTOCOL...", "loading"); }}
                   className="flex-[2] py-6 bg-rose-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-rose-600/30 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all"
                 >
                   Accept Immediate Response <ArrowRight size={18} />
                 </button>
                 <button className="flex-1 py-6 bg-white border border-slate-100 text-slate-400 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 flex items-center justify-center gap-3">
                   <Phone size={16} /> Call Hub
                 </button>
              </div>

              <div className="mt-10 pt-10 border-t border-slate-50 flex items-center gap-4">
                  <div className="flex -space-x-2">
                     {[1, 2].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=emg${emg.id}${i}`} className="w-8 h-8 rounded-full border-2 border-white" alt="team" />)}
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Backup Sync: {emg.backupTeams.join(", ")}</span>
              </div>
           </motion.div>
         ))}
      </div>
    </div>
  );
}
