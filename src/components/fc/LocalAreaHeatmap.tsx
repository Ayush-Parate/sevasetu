import React, { useState } from "react";
import { motion } from "motion/react";
import { Map, Filter, Layers, AlertTriangle, Users, MapPin } from "lucide-react";

export default function LocalAreaHeatmap() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-120px)] animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Local Area Heatmap</h2>
          <p className="text-slate-500 text-sm mt-1 opacity-75">Live visualization of ward-level hotspots, volunteer density, and unresolved needs.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-100 text-slate-600 rounded-2xl hover:bg-slate-50 transition-all text-sm font-bold shadow-sm">
             <Filter size={18} /> Filters
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-rose-50 border border-rose-100 text-rose-500 rounded-2xl hover:bg-rose-100 transition-all text-sm font-bold shadow-sm">
             <AlertTriangle size={18} /> Emergency Dashboard
          </button>
        </div>
      </div>

      <div className="flex-1 bg-slate-50 rounded-[3rem] border border-slate-100 relative overflow-hidden flex flex-col md:flex-row shadow-inner">
         {/* Map Interface Simulation */}
         <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cartographer.png")' }}></div>
         
         {/* Overlays / Hotspots */}
         <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl animate-pulse"></div>
         <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-brand-orange/10 rounded-full blur-3xl"></div>
         <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-rose-500/20 rounded-full blur-2xl animate-pulse"></div>

         <div className="absolute top-1/4 left-1/4 translate-x-4 translate-y-4">
             <div className="bg-rose-500 text-white p-3 rounded-2xl cursor-pointer shadow-xl shadow-rose-500/30 hover:scale-110 active:scale-90 transition-all group">
                <Flame size={24} className="group-hover:animate-bounce" />
                <div className="absolute top-0 left-full ml-2 bg-white px-3 py-1.5 rounded-xl border border-slate-100 shadow-xl hidden group-hover:block whitespace-nowrap text-[10px] font-black uppercase text-rose-500">
                    Active Fire Incident
                </div>
             </div>
         </div>
         <div className="absolute top-1/2 right-1/3 translate-x-8 translate-y-8">
             <div className="bg-brand-orange text-white p-3 rounded-2xl cursor-pointer shadow-xl shadow-brand-orange/30 hover:scale-110 active:scale-90 transition-all group">
                <MapPin size={24} />
                <div className="absolute top-0 left-full ml-2 bg-white px-3 py-1.5 rounded-xl border border-slate-100 shadow-xl hidden group-hover:block whitespace-nowrap text-[10px] font-black uppercase text-brand-orange">
                    Relief Camp Alpha
                </div>
             </div>
         </div>

         {/* Left Panel - Key / Filters */}
         <div className="w-full md:w-80 bg-white/90 backdrop-blur-xl border-r border-slate-100 p-8 flex flex-col z-10 shadow-2xl shadow-slate-200/50">
            <h3 className="text-slate-900 font-bold text-xl mb-8 flex items-center gap-3">
              <div className="p-2 bg-brand-peach rounded-xl text-brand-orange">
                <Layers size={20}/>
              </div>
              Map Layers
            </h3>
            <div className="space-y-6">
               <label className="flex items-center gap-4 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input type="checkbox" defaultChecked className="peer sr-only" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green"></div>
                  </div>
                  <span className="text-sm font-bold text-slate-600 group-hover:text-brand-green transition-colors">Incident Heat</span>
               </label>
               <label className="flex items-center gap-4 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input type="checkbox" defaultChecked className="peer sr-only" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green"></div>
                  </div>
                  <span className="text-sm font-bold text-slate-600 group-hover:text-brand-green transition-colors">Active Volunteers</span>
               </label>
               <label className="flex items-center gap-4 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green"></div>
                  </div>
                  <span className="text-sm font-bold text-slate-600 group-hover:text-brand-green transition-colors">Verified Routes</span>
               </label>
               
               <div className="pt-8 border-t border-slate-50">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Live Tactical Stats</div>
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex justify-between items-center group hover:bg-rose-50 transition-colors">
                       <span className="text-xs text-slate-500 font-bold">Critical Zones</span>
                       <span className="px-2.5 py-1 bg-rose-500 text-white rounded-lg text-[10px] font-black shadow-lg shadow-rose-500/20">2 ACTIVE</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex justify-between items-center group hover:bg-emerald-50 transition-colors">
                       <span className="text-xs text-slate-500 font-bold">Volunteers in Field</span>
                       <span className="px-2.5 py-1 bg-brand-green text-white rounded-lg text-[10px] font-black shadow-lg shadow-brand-green/20">14 LIVE</span>
                    </div>
                  </div>
               </div>
            </div>
         </div>
         
         <div className="absolute bottom-10 right-10 flex gap-4 z-10">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xl flex items-center gap-4">
               <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-8 h-8 rounded-xl border-2 border-white shadow-sm" alt="" />
                  ))}
                  <div className="w-8 h-8 rounded-xl bg-slate-100 border-2 border-white flex items-center justify-center text-[8px] font-black text-slate-400 shadow-sm">+11</div>
               </div>
               <div className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Team Dispatch Ready</div>
            </div>
         </div>
      </div>
    </div>
  );
}

function Flame(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}
