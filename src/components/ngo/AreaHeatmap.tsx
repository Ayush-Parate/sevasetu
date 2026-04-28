import React, { useState } from "react";
import {
  Map as MapIcon,
  Layers,
  Filter,
  Maximize2,
  AlertTriangle,
  Users,
  Navigation,
  Zap,
  Radio,
  Clock,
  ShieldCheck,
  ChevronRight,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useToast } from "../Toast";

export default function AreaHeatmap() {
  const [activeLayer, setActiveLayer] = useState<"severity" | "volunteers" | "ngo">("severity");
  const [emergencyMode, setEmergencyMode] = useState(false);
  const { showToast } = useToast();

  const handleAction = (action: string) => {
    showToast(`${action} activated.`, "info");
  };

  const hotspots = [
    { ward: "Ward 4", status: "Critical", gap: "High", count: 12 },
    { ward: "Ward 12", status: "Moderate", gap: "Medium", count: 5 },
    { ward: "Ward 8", status: "High", gap: "Critical", count: 24 },
  ];

  return (
    <div className="animate-in fade-in duration-500 h-[calc(100vh-140px)] flex flex-col pb-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapIcon className="text-rose-500" size={20} />
            <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase">
              Geospatial Intelligence
            </h2>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-1">
            NGO Area Heatmap
          </h1>
          <p className="text-slate-500 max-w-2xl text-sm leading-relaxed">
            Monitor ward-level hotspots, volunteer density, and unresolved
            clusters in real-time. Toggle Emergency Mode for rapid dispatch.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              placeholder="Filter by Area..." 
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-brand-green/20 shadow-sm"
            />
          </div>
          <button 
            onClick={() => handleAction("Category Filter")}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors"
          >
            <Filter size={14} /> Category
          </button>
          <button 
            onClick={() => setEmergencyMode(!emergencyMode)}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg ${
              emergencyMode 
                ? "bg-rose-500 text-white shadow-rose-500/30 animate-pulse" 
                : "bg-slate-900 text-white shadow-slate-900/10"
            }`}
          >
            <Zap size={14} className={emergencyMode ? "text-white" : "text-brand-green"} /> 
            {emergencyMode ? "Emergency Active" : "Emergency Mode"}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Map Engine View */}
        <div className="flex-1 bg-slate-900 rounded-[2.5rem] border border-slate-800 relative overflow-hidden flex flex-col shadow-2xl">
          {/* Map Top Bar */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20 pointer-events-none">
            <div className="flex gap-2 pointer-events-auto">
               {["severity", "volunteers", "ngo"].map((layer) => (
                 <button
                   key={layer}
                   onClick={() => setActiveLayer(layer as any)}
                   className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all backdrop-blur-md border ${
                     activeLayer === layer
                       ? "bg-brand-green text-white border-brand-green"
                       : "bg-white/10 text-white/60 border-white/10 hover:bg-white/20"
                   }`}
                 >
                   {layer} layer
                 </button>
               ))}
            </div>
            <div className="pointer-events-auto">
               <button className="p-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl text-white hover:bg-white/20 transition-all">
                 <Maximize2 size={18} />
               </button>
            </div>
          </div>

          <div className="absolute inset-0 z-0">
            <div
              className={`absolute inset-0 transition-opacity duration-1000 ${emergencyMode ? "opacity-30" : "opacity-10"}`}
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, #10b981 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            ></div>
            
            {/* Dynamic Heatmap Blobs */}
            <motion.div 
               animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
               transition={{ duration: 4, repeat: Infinity }}
               className={`absolute top-[25%] left-[30%] w-64 h-64 ${emergencyMode ? "bg-rose-500/40" : "bg-rose-500/20"} rounded-full blur-[100px]`} 
            />
            <motion.div 
               animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
               transition={{ duration: 5, repeat: Infinity, delay: 1 }}
               className="absolute bottom-[20%] right-[30%] w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]" 
            />
          </div>

          {/* Interactive Pointers */}
          <div className="relative z-10 m-auto flex flex-col items-center">
             <div className="relative group cursor-pointer">
                <div className={`absolute inset-0 ${emergencyMode ? "bg-rose-500" : "bg-brand-green"} rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                <div className={`relative p-4 rounded-3xl ${emergencyMode ? "bg-rose-500 text-white" : "bg-white text-slate-900"} border border-white/20 shadow-2xl transition-all scale-100 hover:scale-110`}>
                   <MapIcon size={32} />
                   {emergencyMode && <div className="absolute -top-2 -right-2 w-6 h-6 bg-white text-rose-500 rounded-full flex items-center justify-center text-[10px] font-black border-4 border-rose-500">!</div>}
                </div>
                <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-48 p-4 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-2xl text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                   <div className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1">Critical Hotspot</div>
                   <div className="text-sm font-bold text-white mb-2">Ward 4 - Sector C</div>
                   <div className="text-[10px] text-slate-400 leading-tight">12 unresolved health reports requiring immediate dispatch.</div>
                </div>
             </div>
          </div>

          {/* Map Legend Overlay */}
          <div className="absolute bottom-6 left-6 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl z-20">
             <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-4 text-center">Coverage Legend</h4>
             <div className="space-y-3">
                <div className="flex items-center gap-3">
                   <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_10px_2px_rgba(244,63,94,0.4)]"></div>
                   <span className="text-[10px] font-bold text-white/80">Critical Cluster</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_10px_2px_rgba(99,102,241,0.4)]"></div>
                   <span className="text-[10px] font-bold text-white/80">Volunteer Density</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-3 h-3 rounded-full bg-brand-green shadow-[0_0_10px_2px_rgba(16,185,129,0.4)]"></div>
                   <span className="text-[10px] font-bold text-white/80">NGO Presence</span>
                </div>
             </div>
          </div>
        </div>

        {/* Sidebar Info & Controls */}
        <div className="w-full lg:w-80 space-y-4 flex flex-col shrink-0">
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
             <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertTriangle size={18} className="text-rose-500" /> Hotspot Analysis
             </h3>
             <div className="space-y-3">
                {hotspots.map((h, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:border-brand-green transition-all group cursor-pointer">
                    <div>
                       <div className="text-xs font-black text-slate-900">{h.ward}</div>
                       <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{h.status} Need</div>
                    </div>
                    <div className="text-right">
                       <div className="text-xs font-black text-rose-500">{h.count} Reports</div>
                       <div className="text-[8px] font-bold text-slate-400">GAP: {h.gap}</div>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="p-6 bg-indigo-600 rounded-3xl shadow-xl shadow-indigo-600/20 text-white relative overflow-hidden group">
             <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
             <h3 className="font-bold mb-4 flex items-center gap-2">
                <Users size={18} /> Volunteer Density
             </h3>
             <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-black tracking-tighter">420</span>
                <span className="text-xs font-bold text-indigo-200">Active Responders</span>
             </div>
             <p className="text-[10px] text-indigo-100 font-medium mb-6 leading-relaxed">
               Concentrated primarily in Central Ward. Dispatch recommended to West District (Coverage Gap: 85%).
             </p>
             <button 
                onClick={() => handleAction("Volunteer Redistribution")}
                className="w-full py-2.5 bg-white text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-105 transition-all shadow-lg"
             >
                Dispatch Volunteers
             </button>
          </div>

          <div className="flex-1 p-6 bg-white border border-slate-100 rounded-3xl shadow-sm flex flex-col justify-between overflow-hidden">
             <div>
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                   <Clock size={18} className="text-brand-green" /> Live Feed
                </h3>
                <div className="space-y-4">
                   {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-3">
                         <div className="w-1 h-8 bg-slate-100 rounded-full shrink-0"></div>
                         <div>
                            <div className="text-[10px] font-black text-slate-900 leading-none mb-1">Task Assigned: Ward 4</div>
                            <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none">Coordinator Priya • 2m ago</div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
             <button className="w-full mt-6 flex items-center justify-between text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors">
                View Full Logs <ChevronRight size={14} />
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}
