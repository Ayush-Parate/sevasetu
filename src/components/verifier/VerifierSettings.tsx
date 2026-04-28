import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Settings, 
  ShieldCheck, 
  Zap, 
  Bell, 
  Lock, 
  Sliders, 
  Save, 
  ShieldAlert,
  Fingerprint,
  RotateCcw,
  Play
} from "lucide-react";
import { useToast } from "../Toast";

export default function VerifierSettings() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("protocols");

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-top-10 duration-700 max-w-7xl">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 px-4">
         <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">Platform Security Configuration</h1>
            <p className="text-slate-500 font-medium italic mt-1 opacity-75 leading-relaxed font-serif">Deep-level parameter tuning for fraud detection, duplicate merging, and emergency fast-track policies.</p>
         </div>
         <div className="flex gap-4">
            <button 
              onClick={() => showToast("Verification policy reset to factory defaults.", "warning")}
              className="px-8 py-5 bg-white text-slate-400 border border-slate-200 rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:text-rose-500 transition-all flex items-center gap-3"
            >
               <RotateCcw size={18} /> Reset Policy
            </button>
            <button 
              onClick={() => showToast("Simulating verification logic on 1,000 mock cases...", "info")}
              className="px-8 py-5 bg-slate-100 text-slate-900 rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 transition-all flex items-center gap-3"
            >
               <Play size={18} /> Test Logic
            </button>
            <button 
              onClick={() => showToast("Configuration logic synchronized & locked.", "success")}
              className="px-12 py-5 bg-brand-green text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-brand-green/20 hover:brightness-110 transition-all transform active:scale-95 flex items-center gap-3"
            >
               <Save size={18} /> Save Rules
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
         <div className="lg:col-span-1 space-y-4">
            {[
              { id: "protocols", label: "Priority Rules", icon: Settings },
              { id: "fraud", label: "Fraud Thresholds", icon: ShieldAlert },
              { id: "duplicates", label: "Duplicate Sensitivity", icon: Sliders },
              { id: "proof", label: "Approval Logic", icon: ShieldCheck },
              { id: "emergency", label: "Fast-Track Policy", icon: Zap },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-6 p-6 rounded-[2.5rem] transition-all group ${
                  activeTab === item.id 
                    ? "bg-slate-900 text-white shadow-2xl" 
                    : "bg-white text-slate-400 hover:bg-slate-50 border border-slate-100"
                }`}
              >
                 <item.icon size={22} className={`${activeTab === item.id ? "text-brand-green" : "group-hover:text-slate-900"}`} />
                 <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
              </button>
            ))}
         </div>

         <div className="lg:col-span-3 space-y-10">
            <div className="bg-white border border-slate-100 p-12 rounded-[4rem] shadow-sm space-y-12">
               <div className="space-y-10">
                  <div className="flex items-center gap-6 border-b border-slate-50 pb-10">
                     <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-slate-900 shadow-inner">
                        <Sliders size={32} />
                     </div>
                     <div>
                        <h3 className="text-2xl font-black italic tracking-tighter uppercase text-slate-900">{activeTab.replace('-', ' ')}</h3>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Verifying System Integrity Node 04-A</span>
                     </div>
                  </div>

                  <div className="space-y-12">
                     <div className="flex flex-col sm:flex-row items-center justify-between gap-8 p-10 bg-slate-50 rounded-[3rem] border border-slate-50 group hover:bg-white hover:shadow-xl transition-all">
                        <div className="space-y-2 flex-1">
                           <div className="flex items-center gap-3">
                              <ShieldCheck size={20} className="text-brand-green" />
                              <h4 className="text-lg font-bold text-slate-900 tracking-tight italic uppercase">Sensitivity Index</h4>
                           </div>
                           <p className="text-slate-400 text-xs font-medium italic opacity-75 font-serif max-w-sm leading-relaxed">
                              "Adjusting the delta required for various algorithms to trigger automated verification or manual audit flags."
                           </p>
                        </div>
                        <div className="flex items-center gap-6">
                           <div className="text-5xl font-black text-slate-900 tracking-tighter">88%</div>
                           <input type="range" className="w-32 accent-brand-green shadow-sm" defaultValue="88" />
                        </div>
                     </div>

                     <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-50 space-y-6">
                        <div className="flex items-center justify-between">
                           <h4 className="text-lg font-bold text-slate-900 tracking-tight italic uppercase">Fast-Track Protocols</h4>
                           <Zap size={20} className="text-amber-500 animate-pulse" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {[
                              "Auto-Approve for 950+ Trust Score",
                              "Skip Duplicate Check for Emergency Tags",
                              "Prioritize Women Safety Reports",
                              "Force Manual Check for New NGOs"
                           ].map((rule, i) => (
                              <div key={i} className="flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-100 shadow-sm cursor-pointer hover:border-brand-green transition-all group">
                                 <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">{rule}</span>
                                 <div className="w-10 h-5 bg-brand-green rounded-full relative">
                                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-md"></div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-slate-900 rounded-[4rem] p-12 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-16 opacity-10 rotate-12 -translate-y-10 group-hover:scale-125 transition-transform duration-[5s]">
                  <ShieldAlert size={150} />
               </div>
               <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                  <div className="space-y-4 max-w-xl">
                     <h4 className="text-3xl font-black italic tracking-tighter uppercase leading-none text-rose-500">Master Lock Protocol</h4>
                     <p className="text-slate-400 text-sm font-medium italic opacity-75 font-serif leading-relaxed">
                        "Emergency override to suspend all concurrent verification threads in case of massive data integrity failure."
                     </p>
                  </div>
                  <button 
                    onClick={() => showToast("SYSTEM LOCKDOWN INITIATED.", "error")}
                    className="px-14 py-6 bg-rose-500 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-rose-900/40 hover:bg-rose-600 transition-all transform active:scale-95 whitespace-nowrap"
                  >
                     Suspend All Nodes
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
