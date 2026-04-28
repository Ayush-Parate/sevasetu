import React from "react";
import { Settings, Shield, Zap, Bell, Users, Lock, ChevronRight } from "lucide-react";

export default function FCSettings() {
  const sections = [
    {
      title: "Verification Logic",
      icon: Shield,
      desc: "Set rules for AI-based duplicate detection and minimum evidence requirements.",
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    },
    {
      title: "Emergency Escalation",
      icon: Zap,
      desc: "Define keywords and parameters that automatically trigger Code Red alerts.",
      color: "text-rose-600",
      bg: "bg-rose-50"
    },
    {
      title: "Dispatch Engine Rules",
      icon: Users,
      desc: "Adjust weights for distance, trust score, and skill matching in the AI algorithm.",
      color: "text-brand-green",
      bg: "bg-brand-green/10"
    },
    {
      title: "Proof Validation Settings",
      icon: Lock,
      desc: "Determine which tasks require GPS correlation vs physical supervisor visits.",
      color: "text-slate-600",
      bg: "bg-slate-100"
    },
    {
      title: "Local Notification Rules",
      icon: Bell,
      desc: "Set thresholds for when to auto-notify citizens vs when to hold for manual review.",
      color: "text-brand-orange",
      bg: "bg-brand-orange/10"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-700">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-4">
           <div className="p-3 bg-brand-peach rounded-2xl text-brand-orange shadow-sm border border-brand-orange/10">
             <Settings size={28} />
           </div>
           Operational Control
        </h2>
        <p className="text-slate-500 text-sm mt-3 font-medium opacity-75 max-w-sm ml-1">Configure the ground-level automation rules that power SevaSetu's intelligence operations.</p>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden divide-y divide-slate-50 shadow-sm">
         {sections.map((sec, i) => (
           <div key={i} className="p-8 flex items-center gap-6 hover:bg-slate-50/80 cursor-pointer group transition-all">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-white ${sec.color} ${sec.bg} group-hover:scale-110 transition-transform shadow-inner`}>
                 <sec.icon size={24} />
              </div>
              <div className="flex-1">
                 <h3 className="text-slate-900 font-bold text-lg group-hover:text-brand-green transition-colors">{sec.title}</h3>
                 <p className="text-sm text-slate-500 font-medium opacity-70 max-w-xl mt-0.5 leading-relaxed italic">{sec.desc}</p>
              </div>
              <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center bg-white shadow-sm group-hover:translate-x-2 transition-all">
                <ChevronRight className="text-slate-300 group-hover:text-brand-green transition-colors" size={20} />
              </div>
           </div>
         ))}
      </div>

      <div className="bg-brand-peach/30 border-2 border-brand-orange/20 border-dashed rounded-[3rem] p-10 flex flex-col items-center text-center">
        <Shield className="text-brand-orange mb-4 opacity-50" size={32} />
        <h3 className="text-brand-orange font-black uppercase tracking-[0.2em] text-xs mb-2">Protocol Integrity</h3>
        <p className="text-brand-orange/70 text-sm font-medium italic">Changes here affect real-time dispatch and crisis triage. Requires administrator override for core logic shifts.</p>
      </div>
    </div>
  );
}
