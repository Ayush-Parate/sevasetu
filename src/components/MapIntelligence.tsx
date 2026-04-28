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
import RoleLiveMap from "./RoleLiveMap";

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
            <RoleLiveMap height={520} title="Geo Intelligence Live Map" />
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
