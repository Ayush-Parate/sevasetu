import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Layers, 
  MapPin, 
  AlertTriangle, 
  Zap, 
  ShieldCheck, 
  History, 
  Split, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  Search,
  Filter,
  Activity,
  User,
  Clock
} from "lucide-react";
import { useToast } from "../Toast";

type DuplicateCase = {
  id: string;
  location: string;
  count: number;
  pattern: string;
  confidence: number;
  details: { id: string; time: string; reporter: string }[];
};

const DUPLICATE_CASES: DuplicateCase[] = [
  { 
    id: "DUP-X101", 
    location: "Ward 4 Market Entrance", 
    count: 3, 
    pattern: "Infrastructure / Water Leak", 
    confidence: 94,
    details: [
      { id: "REP-401", time: "10m ago", reporter: "Unit-04" },
      { id: "REP-402", time: "14m ago", reporter: "Civic Node" },
      { id: "REP-405", time: "2h ago", reporter: "Volunteer X" },
    ]
  },
  { 
    id: "DUP-X102", 
    location: "Sector 9 School Grounds", 
    count: 2, 
    pattern: "Medical Node / Supply Void", 
    confidence: 82,
    details: [
      { id: "REP-410", time: "1h ago", reporter: "Scout Beta" },
      { id: "REP-412", time: "3h ago", reporter: "Principal S." },
    ]
  }
];

export default function DuplicateDetection() {
  const { showToast } = useToast();
  const [selectedCase, setSelectedCase] = useState<DuplicateCase | null>(null);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-left-10 duration-1000">
      {/* AI Consensus Header */}
      <div className="bg-slate-950 p-16 rounded-[4.5rem] text-white shadow-2xl relative overflow-hidden group border-4 border-slate-900">
         <div className="absolute right-0 top-0 p-20 opacity-5 rotate-12 -translate-y-6 group-hover:scale-125 transition-transform duration-[10s] pointer-events-none">
            <Layers size={300} className="text-brand-green" />
         </div>
         <div className="relative z-10 flex flex-col xl:flex-row justify-between items-center gap-12 text-center xl:text-left">
            <div className="space-y-6 max-w-2xl">
               <div className="flex items-center gap-4 justify-center xl:justify-start">
                  <div className="w-14 h-14 bg-brand-green/20 rounded-3xl flex items-center justify-center text-brand-green shadow-xl border border-brand-green/20">
                     <Zap size={28} />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-[0.3em] font-mono opacity-60">AI Clustering Engine v2.0 Active</span>
               </div>
               <h2 className="text-5xl font-black tracking-tighter uppercase italic leading-none">Duplicate Mitigation Center</h2>
               <p className="text-slate-400 text-lg font-medium italic opacity-80 leading-relaxed font-serif italic">
                  "Systemic detection of overlapping reports. We synthesize multiple signals into single actionable events to optimize NGO resource allocation."
               </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 bg-white/5 p-12 rounded-[3.5rem] border border-white/10 shadow-inner">
               <div className="text-center">
                  <div className="text-6xl font-black tracking-tighter text-brand-green italic">85%</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-2">AI Capture Rate</div>
               </div>
               <div className="text-center">
                  <div className="text-6xl font-black tracking-tighter text-blue-400 italic">1.2k</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-2">Synthesized Signals</div>
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
         {/* Cluster List */}
         <div className="xl:col-span-2 space-y-8">
            <div className="flex justify-between items-center px-6">
               <h3 className="text-2xl font-black text-slate-900 tracking-tight italic flex items-center gap-3">Cluster Intelligence Feed</h3>
               <div className="flex gap-4">
                  <Search size={20} className="text-slate-400" />
                  <Filter size={20} className="text-slate-400" />
               </div>
            </div>

            <div className="space-y-6">
               {DUPLICATE_CASES.map((cluster) => (
                 <div key={cluster.id} onClick={() => setSelectedCase(cluster)} className={`bg-white p-10 rounded-[4rem] border-2 transition-all cursor-pointer group flex flex-col md:flex-row justify-between items-center gap-10 ${selectedCase?.id === cluster.id ? 'border-brand-green shadow-2xl scale-[1.02]' : 'border-slate-100 shadow-sm hover:shadow-xl'}`}>
                    <div className="flex items-center gap-10">
                       <div className="relative">
                          <div className="w-20 h-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-400 group-hover:text-brand-green transition-all shadow-inner">
                             <Layers size={32} />
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-950 text-white rounded-full flex items-center justify-center text-xs font-black italic border-4 border-white shadow-lg">{cluster.count}</div>
                       </div>
                       <div className="space-y-2">
                          <div className="flex items-center gap-4">
                             <span className="text-[10px] font-black text-brand-green uppercase tracking-widest italic">AI Confidence: {cluster.confidence}%</span>
                             <div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cluster.id}</span>
                          </div>
                          <h4 className="text-2xl font-black text-slate-900 tracking-tight leading-none italic">{cluster.pattern}</h4>
                          <div className="flex items-center gap-2 text-[11px] font-bold italic text-slate-400"><MapPin size={14} className="text-brand-green" /> {cluster.location}</div>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                       <button onClick={() => showToast("Cross-referencing telemetry points...", "info")} className="flex-1 md:flex-none px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-brand-green transition-all transform active:scale-95">Analyze Cluster</button>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Multi-Signal synthesis Panel */}
         <div className="xl:col-span-1">
            <AnimatePresence mode="wait">
               {selectedCase ? (
                 <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white border-4 border-slate-900/10 p-12 rounded-[5rem] shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[750px]">
                    <div className="absolute right-0 top-0 p-20 opacity-[0.03] text-brand-green -translate-y-4 pointer-events-none">
                       <Split size={200} />
                    </div>
                    <div className="relative z-10 space-y-10">
                       <div className="flex items-center gap-6 pb-10 border-b border-slate-100">
                          <div className="w-16 h-16 bg-slate-50 rounded-[1.8rem] flex items-center justify-center text-slate-900 shadow-inner">
                             <Activity size={32} />
                          </div>
                          <div>
                             <h5 className="text-2xl font-black italic tracking-tighter uppercase text-slate-900">Synthesis Engine</h5>
                             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Cluster ID: {selectedCase.id} Monitoring</span>
                          </div>
                       </div>

                       <div className="space-y-8">
                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Repeated Signal Detail</div>
                          <div className="space-y-4 max-h-[300px] overflow-y-auto no-scrollbar py-4 px-2">
                             {selectedCase.details.map((rep, i) => (
                               <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-50 hover:bg-white hover:shadow-xl transition-all group/item">
                                  <div className="flex items-center gap-5">
                                     <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover/item:bg-brand-green group-hover/item:text-white transition-all shadow-inner">
                                        <User size={18} />
                                     </div>
                                     <div>
                                        <div className="text-sm font-bold text-slate-900 italic leading-none">{rep.reporter}</div>
                                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">ID: {rep.id}</div>
                                     </div>
                                  </div>
                                  <div className="text-[9px] font-black text-slate-400 italic">{rep.time}</div>
                               </div>
                             ))}
                          </div>
                          
                          <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100 space-y-4">
                             <div className="flex items-center gap-3 text-amber-500">
                                <AlertTriangle size={18} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Repeated Issue Pattern</span>
                             </div>
                             <p className="text-slate-500 text-xs font-medium italic opacity-75 font-serif leading-relaxed italic">
                                "The AI indicates a 94% overlap between these signals. Reports mention exact geolocation within 50m and similar infrastructure damage signatures."
                             </p>
                          </div>
                       </div>
                    </div>

                    <div className="relative z-10 pt-10 border-t border-slate-100 space-y-6">
                       <button onClick={() => { showToast("Signals merged into a single event node.", "success"); setSelectedCase(null); }} className="w-full py-6 bg-slate-950 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:bg-brand-green transition-all active:scale-95 flex items-center justify-center gap-3">
                          <CheckCircle2 size={18} /> Merge Reports
                       </button>
                       <div className="flex gap-4">
                          <button onClick={() => { showToast("Cluster split. Reporting as separate events.", "info"); setSelectedCase(null); }} className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-[1.2rem] font-black uppercase tracking-widest text-[9px] hover:bg-slate-100 transition-all">Keep Separate</button>
                          <button onClick={() => { showToast("Trust penalty assigned to reporters. Cluster marked suspicious.", "error"); setSelectedCase(null); }} className="flex-1 py-4 bg-rose-50 text-rose-500 rounded-[1.2rem] font-black uppercase tracking-widest text-[9px] hover:bg-rose-500 hover:text-white transition-all">Mark Suspicious</button>
                       </div>
                    </div>
                 </motion.div>
               ) : (
                 <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[5rem] p-20 text-center flex flex-col items-center justify-center h-full min-h-[750px] space-y-12 group">
                    <div className="w-28 h-28 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center text-slate-200 group-hover:rotate-45 transition-transform duration-700">
                       <Layers size={60} />
                    </div>
                    <div className="space-y-4 max-w-sm">
                       <h4 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase underline decoration-slate-200 underline-offset-8">Observation Mode</h4>
                       <p className="text-slate-400 text-sm font-medium italic leading-relaxed font-serif opacity-80">
                          "Select an AI-suggested duplicate cluster to initiate the signal synthesis protocol and cross-reporter audit."
                       </p>
                    </div>
                 </div>
               )}
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
}
