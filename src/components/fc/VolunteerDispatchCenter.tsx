import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users, UserPlus, MapPin, Zap, Star, Shield, Filter, Search, Phone, Navigation, AlertTriangle } from "lucide-react";
import { useToast } from "../Toast";

export default function VolunteerDispatchCenter() {
  const [activeTab, setActiveTab] = useState<"nearby" | "smart" | "mobilization">("nearby");
  const { showToast } = useToast();

  const handleDispatch = () => showToast("Volunteer Dispatched successfully!", "success");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Volunteer Dispatch Center</h2>
          <p className="text-slate-500 text-sm mt-1 opacity-75">Match, assign, and deploy ground volunteers to active tasks based on intelligence routing.</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
          {[
            { id: "nearby", label: "Nearby Pool" },
            { id: "smart", label: "Smart Ranking" },
            { id: "mobilization", label: "Emergency Mass Alert" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id ? "bg-brand-green text-white shadow-xl shadow-brand-green/20" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "nearby" && (
          <motion.div key="nearby" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
             <div className="flex flex-wrap gap-4 items-center mb-6">
               <div className="relative flex-1 min-w-[200px]">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                 <input type="text" placeholder="Search by name, skill, or ID..." className="w-full bg-white border border-slate-100 text-slate-900 pl-12 pr-4 py-3 rounded-2xl focus:ring-2 focus:ring-brand-green/20 outline-none shadow-sm" />
               </div>
               <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-100 text-slate-600 rounded-2xl hover:bg-slate-50 transition-all font-bold text-sm shadow-sm">
                 <Filter size={18} /> Filter Status
               </button>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {[1, 2, 3, 4, 5, 6].map(i => (
                 <div key={i} className="bg-white border border-slate-100 rounded-[2.5rem] p-8 group hover:shadow-xl hover:shadow-slate-200/50 transition-all">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden relative shadow-sm">
                         <img src={`https://i.pravatar.cc/150?u=vol${i}`} alt="Avatar" className="w-full h-full object-cover" />
                         <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 inline-flex items-center gap-1.5 group-hover:text-brand-green transition-colors">
                           Volunteer {i} <Shield size={14} className="text-brand-green" />
                        </h3>
                        <p className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5 mt-0.5 uppercase tracking-widest"><MapPin size={12} className="text-brand-green" /> 1.2 km away</p>
                      </div>
                      <div className="bg-brand-peach border border-brand-orange/10 px-2.5 py-1.5 rounded-xl text-[10px] font-stone-bold text-brand-orange flex items-center gap-1 shadow-sm">
                        <Star size={12} fill="currentColor" /> 4.9
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      <span className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-100">First Aid</span>
                      <span className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-100">Bike Output</span>
                    </div>

                    <div className="flex gap-3">
                       <button onClick={handleDispatch} className="flex-1 py-3.5 bg-brand-green text-white shadow-lg shadow-brand-green/20 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex justify-center items-center gap-2">
                         <Navigation size={18} /> Assign Task
                       </button>
                       <button className="p-3.5 bg-white border border-slate-100 text-slate-400 hover:text-brand-green hover:border-brand-green/20 rounded-2xl transition-all shadow-sm group/btn">
                          <Phone size={18} className="group-hover/btn:scale-110 transition-transform" />
                       </button>
                    </div>
                 </div>
               ))}
             </div>
          </motion.div>
        )}

        {activeTab === "smart" && (
          <motion.div key="smart" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto pt-10">
             <div className="bg-white border border-slate-100 rounded-[3rem] text-center overflow-hidden mb-6 shadow-sm relative group">
                <div className="p-16 relative z-10 transition-transform duration-500">
                  <div className="w-20 h-20 bg-brand-green/10 text-brand-green rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:scale-110 transition-transform">
                     <Zap size={36} fill="currentColor" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Smart Matching Engine</h3>
                  <p className="text-slate-500 text-sm max-w-lg mx-auto mb-10 leading-relaxed font-medium opacity-75">Select a task from the queue to run the matching AI. It ranks volunteers by distance, skill affinity, trust score, and availability.</p>
                  
                  <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 text-left mb-10 max-w-md mx-auto shadow-inner">
                     <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Selected Task Analysis</div>
                     <div className="text-xl font-bold text-slate-900 mb-2 font-serif">Deliver food packets to Sector 4</div>
                     <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                        <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
                        Requires constraints: <span className="text-brand-green">Heavy Lifter</span>, <span className="text-brand-green">Has Vehicle</span>
                     </div>
                  </div>

                  <button className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-green transition-all shadow-2xl shadow-slate-900/20 translate-y-0 hover:-translate-y-1">
                    Run Auto-Match Algorithm Analysis
                  </button>
                </div>
                <div className="bg-slate-50 h-3 w-full border-t border-slate-100 relative overflow-hidden">
                   <div className="bg-brand-green h-full w-[0%] transition-all duration-1000"></div>
                </div>
             </div>
          </motion.div>
        )}

        {activeTab === "mobilization" && (
           <motion.div key="mobilization" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[500px] flex items-center justify-center bg-rose-50 border-2 border-rose-100 border-dashed rounded-[3rem] shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}></div>
              <div className="text-center relative z-10 max-w-md p-10">
                 <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-rose-200/50">
                    <AlertTriangle size={48} className="text-rose-500 animate-pulse" />
                 </div>
                 <h3 className="text-3xl font-bold text-slate-900 mb-4">Emergency Mobilization</h3>
                 <p className="text-slate-500 text-sm mb-10 leading-relaxed font-medium opacity-75">Instantly alert all nearby available volunteers bypassing standard task assignment. <span className="text-rose-600 font-bold">Use only for confirmed Code Red crises.</span></p>
                 <button className="px-12 py-5 bg-rose-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-rose-600/30 hover:bg-rose-700 transition-all transform hover:scale-105">
                   Trigger Regional Mass Alert
                 </button>
              </div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
