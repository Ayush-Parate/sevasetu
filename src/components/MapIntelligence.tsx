import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Map as MapIcon, 
  MapPin, 
  Target, 
  Activity, 
  Layers, 
  Search, 
  Zap, 
  AlertTriangle,
  Users,
  Compass,
  ArrowUpRight,
  Maximize2
} from "lucide-react";
import { useToast } from "./Toast";

export default function MapIntelligence() {
  const { showToast } = useToast();
  const [activeLayer, setActiveLayer] = useState("needs");

  const hotspots = [
    { id: 1, name: "Market Sector 4", level: "High", x: "25%", y: "40%", type: "Food" },
    { id: 2, name: "Railway Colony", level: "Critical", x: "65%", y: "30%", type: "Water" },
    { id: 3, name: "West Slums B", level: "Medium", x: "45%", y: "70%", type: "Health" },
    { id: 4, name: "Industrial G", level: "Low", x: "15%", y: "80%", type: "Sanitation" },
    { id: 5, name: "Education Hub", level: "High", x: "80%", y: "60%", type: "Education" },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 px-4">
         <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">Geo Intelligence Nexus</h2>
            <p className="text-slate-500 font-medium italic mt-1 opacity-75 leading-relaxed font-serif max-w-xl">Spatial visualization of community distress signals, volunteer coverage, and resolution gaps.</p>
         </div>
         <div className="flex flex-wrap gap-4">
            <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
               <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="Scout" />
                    </div>
                  ))}
               </div>
               <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">14 Active Scouts in View</div>
            </div>
            <button className="px-8 py-4 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-brand-green transition-all transform active:scale-95 flex items-center gap-3">
               <Maximize2 size={18} /> Fullscreen Map
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
         {/* Map Interface */}
         <div className="xl:col-span-3">
            <div className="bg-slate-100 rounded-[5rem] aspect-[16/9] relative overflow-hidden shadow-inner border-[12px] border-white shadow-2xl group">
               {/* Grid Pattern */}
               <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
               
               {/* Fictional Map Texture */}
               <div className="absolute inset-0 grayscale opacity-20 pointer-events-none mix-blend-multiply">
                  <img src="https://images.unsplash.com/photo-1548345666-a5772829e225?q=80&w=2000&auto=format&fit=crop" alt="Map Texture" className="w-full h-full object-cover" />
               </div>

               {/* Map Indicators (Pins) */}
               {hotspots.map((point) => (
                 <motion.div
                   key={point.id}
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   transition={{ delay: point.id * 0.1, type: "spring" }}
                   className="absolute group/pin cursor-pointer z-20"
                   style={{ left: point.x, top: point.y }}
                   onClick={() => showToast(`Region Trace: ${point.name} - ${point.type} Need Detected.`, "info")}
                 >
                    <div className="relative">
                       {/* Pulse Effect */}
                       <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${point.level === 'Critical' ? 'bg-rose-500' : point.level === 'High' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                       
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-2xl transition-all group-hover/pin:scale-125 group-hover/pin:-translate-y-4 ${
                         point.level === 'Critical' ? 'bg-rose-500 rotate-45' : 
                         point.level === 'High' ? 'bg-amber-500 rotate-12' : 
                         'bg-brand-green -rotate-12'
                       }`}>
                          <div className={point.level === 'Critical' ? '-rotate-45' : point.level === 'High' ? '-rotate-12' : 'rotate-12'}>
                             <AlertTriangle size={20} />
                          </div>
                       </div>

                       {/* Tooltip */}
                       <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white p-5 rounded-3xl whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-all shadow-2xl pointer-events-none scale-50 group-hover/pin:scale-100 min-w-[200px]">
                          <div className="flex items-center justify-between mb-2">
                             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{point.type} Need</span>
                             <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${point.level === 'Critical' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'}`}>{point.level}</span>
                          </div>
                          <h5 className="text-sm font-bold tracking-tight mb-1">{point.name}</h5>
                          <div className="text-[9px] text-slate-500 italic flex items-center gap-2">
                             <Users size={12} /> 12 Reports in last 2h
                          </div>
                       </div>
                    </div>
                 </motion.div>
               ))}

               {/* Map Controls */}
               <div className="absolute top-10 right-10 flex flex-col gap-3">
                  <button className="w-14 h-14 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 shadow-xl transition-all"><Compass size={24} /></button>
                  <button className="w-14 h-14 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 shadow-xl transition-all font-black text-xl">+</button>
                  <button className="w-14 h-14 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 shadow-xl transition-all font-black text-xl">-</button>
               </div>

               {/* Overlay Legend */}
               <div className="absolute bottom-10 left-10 p-8 bg-slate-900/95 backdrop-blur-md rounded-3xl text-white shadow-2xl border border-white/10 space-y-6">
                  <h4 className="text-xs font-black uppercase tracking-widest italic flex items-center gap-2">
                     Intelligence Layers <Layers size={14} className="text-brand-green" />
                  </h4>
                  <div className="space-y-4">
                     {[
                       { id: "needs", label: "Critical Needs", color: "bg-rose-500" },
                       { id: "vols", label: "Volunteer Presence", color: "bg-brand-green" },
                       { id: "gaps", label: "Coverage Gaps", color: "bg-amber-500" },
                       { id: "risk", label: "Climate Risk Index", color: "bg-blue-500" },
                     ].map(l => (
                        <button 
                          key={l.id}
                          onClick={() => setActiveLayer(l.id)}
                          className={`flex items-center gap-4 w-full p-2 rounded-xl transition-all ${activeLayer === l.id ? 'bg-white/10' : 'opacity-40 hover:opacity-100'}`}
                        >
                           <div className={`w-3 h-3 rounded-full ${l.color}`}></div>
                           <span className="text-[10px] font-bold uppercase tracking-tight">{l.label}</span>
                        </button>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         {/* Sidebar Stats */}
         <div className="xl:col-span-1 space-y-10">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight italic px-4 uppercase">Region Vitals</h3>
            
            <div className="space-y-6 px-2">
               <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-8">
                  <div className="space-y-2">
                     <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Hotspot Intensity</span>
                     <div className="flex items-end justify-between gap-1 h-20">
                        {[40, 70, 45, 90, 65, 30, 85, 55, 95].map((h, i) => (
                          <div key={i} className="flex-1 bg-slate-100 rounded-full relative overflow-hidden group/bar">
                             <div className="absolute bottom-0 w-full bg-brand-green transition-all" style={{ height: `${h}%` }}></div>
                             <div className="absolute inset-0 bg-rose-500 opacity-0 group-hover/bar:opacity-100 transition-opacity" style={{ height: `${h > 80 ? h : 0}%` }}></div>
                          </div>
                        ))}
                     </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-slate-50">
                     {[
                       { label: "Crisis Hotspots", val: 8, trend: "+2" },
                       { label: "Unresolved Gaps", val: 14, trend: "-5" },
                       { label: "Density Load", val: "Critical", trend: "Alert" },
                     ].map((s, i) => (
                        <div key={i} className="flex justify-between items-center">
                           <span className="text-[10px] font-bold text-slate-500 uppercase">{s.label}</span>
                           <div className="flex items-center gap-3">
                              <span className="text-lg font-black text-slate-900 tracking-tighter">{s.val}</span>
                              <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${i === 1 ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'}`}>{s.trend}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="bg-slate-900 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-[0.05] -rotate-12">
                     <Target size={120} />
                  </div>
                  <div className="relative z-10 space-y-6">
                     <h4 className="text-xl font-black italic tracking-tighter uppercase leading-none">Gap Intelligence</h4>
                     <p className="text-slate-400 text-xs font-medium italic opacity-80 leading-relaxed font-serif">
                        Detected a <span className="text-white font-bold underline decoration-brand-orange underline-offset-4">Sector 4 Coverage Gap</span>. No volunteers within 3km of active Health alerts.
                     </p>
                     <button onClick={() => showToast("Broadcasting recruitment alert to nearby nodes...", "success")} className="w-full py-5 bg-white text-slate-900 rounded-[1.5rem] font-black uppercase tracking-widest text-[9px] hover:bg-brand-green hover:text-white transition-all shadow-xl shadow-brand-green/20">
                        Initiate Recruitment
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
