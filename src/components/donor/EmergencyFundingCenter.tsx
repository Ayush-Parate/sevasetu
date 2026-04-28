import React from "react";
import { motion } from "motion/react";
import { 
  AlertTriangle, 
  Zap, 
  Flame, 
  Activity, 
  Users, 
  Clock, 
  ArrowRight,
  ShieldAlert,
  Droplets
} from "lucide-react";

const emergencies = [
  {
    id: 1,
    title: "Flash Flood Displacement",
    location: "North Bengal Clusters",
    need: "$15,000",
    raised: "$8,500",
    urgency: "CRITICAL",
    deadline: "12 Hours",
    description: "Immediate need for 500 mobile sanitation units and drinking water for displaced families.",
    icon: Droplets,
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    id: 2,
    title: "Acute Oxygen Shortage",
    location: "Rural Sunderbans Health Center",
    need: "$5,000",
    raised: "$1,200",
    urgency: "CRITICAL",
    deadline: "4 Hours",
    description: "Emergency replenishment of medical oxygen cylinders for 20 critical care beds.",
    icon: Activity,
    color: "text-red-600",
    bg: "bg-red-50"
  },
  {
    id: 3,
    title: "Community Fire Relief",
    location: "Siliguri Slum Area",
    need: "$3,200",
    raised: "$0",
    urgency: "HIGH",
    deadline: "24 Hours",
    description: "Temporary shelter kits and food supplies for 45 families affected by the fire incident.",
    icon: Flame,
    color: "text-orange-600",
    bg: "bg-orange-50"
  }
];

export default function EmergencyFundingCenter() {
  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      {/* Alert Banner */}
      <div className="bg-red-600 rounded-[32px] p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="absolute top-0 right-0 p-8 opacity-10">
            <AlertTriangle size={160} />
         </div>
         <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
               <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
                  <ShieldAlert size={20} />
               </div>
               <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Live Crisis Monitor</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">3 Active High-Urgency Cases</h2>
            <p className="text-white/70 font-medium max-w-md">The SevaSetu field intelligence reports critical gaps that require immediate capital injection to prevent loss of life.</p>
         </div>
         <div className="relative z-10 flex flex-col items-center bg-white/10 backdrop-blur-xl p-6 rounded-[24px] border border-white/20">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1">Response Time Avg</p>
            <p className="text-4xl font-black">2.4<span className="text-lg">hrs</span></p>
            <p className="text-[9px] font-bold text-brand-orange mt-2 uppercase">Platform Gold Standard</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {emergencies.map((item, i) => (
           <motion.div
             key={item.id}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="bg-white border border-slate-100 rounded-[32px] shadow-sm overflow-hidden flex flex-col group hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
           >
              <div className="p-8 border-b border-slate-50 relative">
                 <div className="flex justify-between items-start mb-6">
                    <div className={`p-4 rounded-2xl ${item.bg} ${item.color}`}>
                       <item.icon size={28} />
                    </div>
                    <div className="flex flex-col items-end">
                       <span className="px-2 py-1 bg-red-600 text-white text-[9px] font-black rounded uppercase tracking-widest animate-pulse">
                          {item.urgency}
                       </span>
                       <div className="flex items-center gap-1.5 mt-2 text-slate-400">
                          <Clock size={12} />
                          <span className="text-[10px] font-bold uppercase tracking-widest">{item.deadline} LEFT</span>
                       </div>
                    </div>
                 </div>
                 
                 <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2">{item.title}</h3>
                 <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{item.location}</span>
                 </div>
              </div>
              
              <div className="p-8 space-y-6 flex-1 flex flex-col">
                 <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    {item.description}
                 </p>
                 
                 <div className="mt-auto space-y-4">
                    <div className="space-y-1.5">
                       <div className="flex justify-between text-[11px] font-bold">
                          <span className="text-slate-400 uppercase tracking-widest">Progress</span>
                          <span className="text-slate-900">{(parseInt(item.raised.replace('$','').replace(',','')) / parseInt(item.need.replace('$','').replace(',','')) * 100).toFixed(0)}% Funded</span>
                       </div>
                       <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                             className="h-full bg-red-600 rounded-full" 
                             style={{ width: `${(parseInt(item.raised.replace('$','').replace(',','')) / parseInt(item.need.replace('$','').replace(',','')) * 100)}%` }}
                          ></div>
                       </div>
                    </div>
                    
                    <div className="flex items-end justify-between pt-4">
                       <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Immediate Gaps</p>
                          <p className="text-2xl font-black text-slate-900 mt-1">{item.need}</p>
                       </div>
                       <button className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-2">
                          Approve <Zap size={14} fill="currentColor" />
                       </button>
                    </div>
                 </div>
              </div>
           </motion.div>
         ))}
      </div>

      {/* Community Defense Info */}
      <div className="p-12 bg-white rounded-[40px] border border-slate-100 flex flex-col md:flex-row items-center gap-12">
         <div className="shrink-0 flex -space-x-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-16 h-16 rounded-full border-4 border-white overflow-hidden bg-slate-200 shadow-lg">
                 <img src={`https://i.pravatar.cc/200?u=emergency${i}`} alt="Donor" />
              </div>
            ))}
            <div className="w-16 h-16 rounded-full border-4 border-white bg-slate-900 text-white flex items-center justify-center text-sm font-bold shadow-lg">
               +12
            </div>
         </div>
         <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Join the Emergency Response Pool</h3>
            <p className="text-slate-500 font-medium leading-relaxed max-w-xl">
               Connect with 18+ corporate partners who automatically co-fund emergency requests. By joining, you allow the platform to auto-allocate micro-funds from your reserve for instant crisis mitigation.
            </p>
            <div className="mt-6 flex gap-4">
               <button className="text-xs font-bold text-brand-green uppercase tracking-widest hover:underline flex items-center gap-2">Set Autopay Rules <ArrowRight size={14} /></button>
               <div className="w-px h-4 bg-slate-200"></div>
               <button className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">View Response Protocols</button>
            </div>
         </div>
      </div>
    </div>
  );
}
