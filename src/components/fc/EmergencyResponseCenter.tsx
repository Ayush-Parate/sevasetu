import React, { useState } from "react";
import { motion } from "motion/react";
import { AlertCircle, Flame, ShieldAlert, Zap, Phone, Radio, Users } from "lucide-react";
import { useToast } from "../Toast";

export default function EmergencyResponseCenter() {
  const { showToast } = useToast();

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-rose-600 tracking-tight flex items-center gap-3">
             <div className="p-2 bg-rose-100 rounded-xl">
               <AlertCircle size={24} />
             </div>
             Emergency Response Center
          </h2>
          <p className="text-rose-900/60 text-sm mt-1 leading-relaxed font-medium">Immediate action queue for Code Red situations (floods, accidents, safety, medical).</p>
        </div>
        <button className="px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-rose-600/30 transition-all transform hover:-translate-y-1">
          Open NGO Emergency War Room
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Active Emergency */}
        <div className="md:col-span-2 bg-white border border-rose-100 rounded-[3rem] p-8 shadow-sm relative overflow-hidden group">
           <div className="absolute -right-20 -top-20 w-80 h-80 bg-rose-50 rounded-full blur-3xl opacity-50 group-hover:scale-110 transition-transform"></div>
           
           <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-4">
                 <div className="w-4 h-4 bg-rose-500 rounded-full animate-ping shadow-[0_0_15px_rgba(244,63,94,0.6)]"></div>
                 <h3 className="text-2xl font-black text-slate-900 tracking-tight">Active Red Alert</h3>
              </div>
              <span className="text-[10px] font-black text-rose-600 uppercase tracking-[0.2em] px-4 py-2 bg-rose-50 rounded-xl border border-rose-100">
                Triage Phase 1
              </span>
           </div>

           <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 mb-8 relative z-10 shadow-inner group/card">
             <h4 className="text-2xl font-bold text-slate-900 mb-2 font-serif">Severe Flooding in Sector 9</h4>
             <p className="text-slate-500 text-sm mb-6 leading-relaxed font-medium opacity-80 italic">Water levels rising rapidly. Approx 50 individuals stranded needing evacuation and immediate medical assistance. Power lines down.</p>
             <div className="flex flex-wrap gap-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
               <span className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-sm"><Flame size={16} className="text-rose-500" /> Hazard: Electrical</span>
               <span className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-sm"><Users size={16} className="text-brand-green" /> Affected: ~50</span>
               <span className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-sm"><ShieldAlert size={16} className="text-brand-orange" /> Volunteers: 10+</span>
             </div>
           </div>

           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
              <button className="flex flex-col items-center justify-center gap-3 bg-white hover:bg-rose-50 border border-slate-100 p-6 rounded-[2rem] transition-all shadow-sm hover:shadow-xl hover:shadow-rose-100 hover:scale-105 active:scale-95 group/btn">
                 <div className="p-3 bg-amber-50 rounded-xl text-amber-500 group-hover/btn:bg-amber-500 group-hover/btn:text-white transition-all shadow-sm">
                   <Zap size={24} fill="currentColor" />
                 </div>
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Rapid Response</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-3 bg-white hover:bg-blue-50 border border-slate-100 p-6 rounded-[2rem] transition-all shadow-sm hover:shadow-xl hover:shadow-blue-100 hover:scale-105 active:scale-95 group/btn">
                 <div className="p-3 bg-blue-50 rounded-xl text-blue-500 group-hover/btn:bg-blue-500 group-hover/btn:text-white transition-all shadow-sm">
                   <Radio size={24} />
                 </div>
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Mass Alerts</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-3 bg-white hover:bg-rose-50 border border-slate-100 p-6 rounded-[2rem] transition-all shadow-sm hover:shadow-xl hover:shadow-rose-100 hover:scale-105 active:scale-95 group/btn">
                 <div className="p-3 bg-rose-50 rounded-xl text-rose-500 group-hover/btn:bg-rose-500 group-hover/btn:text-white transition-all shadow-sm">
                   <ShieldAlert size={24} />
                 </div>
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Priority Mod</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-3 bg-white hover:bg-emerald-50 border border-slate-100 p-6 rounded-[2rem] transition-all shadow-sm hover:shadow-xl hover:shadow-emerald-100 hover:scale-105 active:scale-95 group/btn">
                 <div className="p-3 bg-emerald-50 rounded-xl text-emerald-500 group-hover/btn:bg-emerald-500 group-hover/btn:text-white transition-all shadow-sm">
                   <Phone size={24} />
                 </div>
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Call Auth</span>
              </button>
           </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[3rem] p-8 shadow-sm flex flex-col items-start h-full">
           <h3 className="text-slate-900 font-bold text-xl mb-8 flex items-center gap-3">
             <div className="p-2 bg-slate-50 rounded-xl text-slate-400">
               <Users size={20}/>
             </div>
             Emergency Team
           </h3>
           <div className="space-y-4 w-full flex-1">
              {[1, 2, 3].map(i => (
                 <div key={i} className="flex items-center justify-between bg-slate-50 border border-slate-100 p-4 rounded-2xl group hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-peach overflow-hidden shadow-sm border border-white">
                        <img src={`https://i.pravatar.cc/100?u=et${i}`} alt="user"/>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 mb-0.5">Rescue Hero {i}</div>
                        <div className="text-[9px] text-brand-green font-black uppercase tracking-[0.2em] flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse"></div>
                          En Route
                        </div>
                      </div>
                    </div>
                    <button className="p-2.5 bg-white rounded-xl text-slate-400 hover:text-brand-green hover:shadow-md transition-all shadow-sm border border-slate-100 group-hover:scale-110">
                      <Phone size={16} />
                    </button>
                 </div>
              ))}
           </div>
           
           <div className="mt-8 pt-8 border-t border-slate-50 w-full">
             <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Live Protocol Status</div>
             <div className="space-y-4">
               <div className="flex items-center gap-3 text-xs text-slate-500 font-bold">
                 <div className="w-2 h-2 bg-brand-green rounded-full shadow-[0_0_8px_rgba(93,141,112,0.5)]"></div> Local Auth Notified
               </div>
               <div className="flex items-center gap-3 text-xs text-slate-500 font-bold">
                 <div className="w-2 h-2 bg-brand-green rounded-full shadow-[0_0_8px_rgba(93,141,112,0.5)]"></div> Mass Alert Sent
               </div>
               <div className="flex items-center gap-3 text-xs text-slate-500 font-bold">
                 <div className="w-2 h-2 bg-brand-orange rounded-full shadow-[0_0_8px_rgba(255,179,123,0.5)]"></div> Perimeter Secured
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
