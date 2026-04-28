import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, UserCheck, CheckCircle2, AlertCircle, FileText, Smartphone, PhoneCall, Zap, Star, Camera } from "lucide-react";
import { useToast } from "../Toast";

export default function TrustVerification() {
  const { showToast } = useToast();

  const verifications = [
    { label: "ID Verified", status: "Verified", icon: UserCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Phone Verified", status: "Verified", icon: PhoneCall, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Skill Verified", status: "In Hub Audit", icon: ShieldCheck, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Emergency Class", status: "Not Started", icon: Zap, color: "text-slate-400", bg: "bg-slate-50" },
  ];

  const factors = [
    { label: "Mission Completion", value: "98%", desc: "Consistency in finishing tasks on time.", icon: CheckCircle2 },
    { label: "Proof Reliability", value: "High", desc: "Quality and accuracy of photo evidence.", icon: Camera },
    { label: "Field Feedback", value: "4.9/5", desc: "Sentiment from beneficiaries and peers.", icon: Star },
    { label: "Urgency Response", value: "92%", desc: "Reliability during red-alert scenarios.", icon: Zap },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-24">
      <div className="bg-slate-900 p-16 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cartographer.png")' }}></div>
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="space-y-6 max-w-xl text-center md:text-left">
               <div className="flex items-center gap-4 justify-center md:justify-start">
                  <div className="w-10 h-10 bg-brand-green/20 text-brand-green rounded-xl flex items-center justify-center border border-brand-green/30">
                     <ShieldCheck size={24} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-green">Level 4 Certified Patriot</span>
               </div>
               <h2 className="text-5xl font-black tracking-tighter leading-none">Trust Profile Command</h2>
               <p className="text-slate-400 text-lg font-medium italic opacity-80 leading-relaxed">
                  Your trust score is the heartbeat of your field access. Higher scores unlock privileged missions and emergency response credentials.
               </p>
            </div>
            <div className="shrink-0 flex flex-col items-center">
               <div className="relative w-48 h-48 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                     <circle cx="96" cy="96" r="88" className="stroke-white/5 fill-none" strokeWidth="12" />
                     <motion.circle 
                       initial={{ strokeDasharray: "0, 553" }}
                       animate={{ strokeDasharray: "519, 553" }}
                       transition={{ duration: 2, ease: "easeOut" }}
                       cx="96" cy="96" r="88" className="stroke-brand-green fill-none" strokeWidth="12" strokeLinecap="round" 
                     />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                     <span className="text-6xl font-black tracking-tighter">940</span>
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Trust Index</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         <div className="bg-white border border-slate-100 p-12 rounded-[4rem] shadow-sm">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-10">Verification Hub</h3>
            <div className="space-y-4">
               {verifications.map((v, i) => (
                  <div key={v.label} className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] flex items-center justify-between group hover:bg-white hover:shadow-xl transition-all">
                     <div className="flex items-center gap-6">
                        <div className={`w-12 h-12 ${v.bg} ${v.color} rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                           <v.icon size={24} />
                        </div>
                        <div>
                           <div className="text-sm font-bold text-slate-900">{v.label}</div>
                           <div className={`text-[10px] font-black uppercase tracking-widest ${v.status === 'Verified' ? 'text-emerald-500 opacity-60' : 'text-slate-400'}`}>{v.status}</div>
                        </div>
                     </div>
                     {v.status !== 'Verified' && (
                       <button onClick={() => showToast(`Starting ${v.label}...`, "info")} className="px-6 py-2 bg-slate-900 text-white rounded-xl text-[8px] font-black uppercase tracking-widest hover:bg-brand-green transition-all shadow-lg active:scale-95">Upgrade</button>
                     )}
                  </div>
               ))}
            </div>
         </div>

         <div className="bg-white border border-slate-100 p-12 rounded-[4rem] shadow-sm">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-10">Factored Scoring</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {factors.map(f => (
                  <div key={f.label} className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] space-y-4 hover:border-brand-green/20 transition-all group">
                     <div className="flex justify-between items-start">
                        <div className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 shadow-sm group-hover:text-brand-green transition-colors">
                           <f.icon size={20} />
                        </div>
                        <span className="text-xl font-black text-slate-900 tracking-tighter">{f.value}</span>
                     </div>
                     <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{f.label}</div>
                        <p className="text-[10px] text-slate-400 font-medium italic leading-relaxed">{f.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>

      <div className="relative p-12 bg-brand-green/5 border border-brand-green/10 rounded-[4rem] flex flex-col md:flex-row items-center gap-12 overflow-hidden shadow-inner">
         <div className="absolute left-[-40px] opacity-[0.05] pointer-events-none hidden lg:block">
            <ShieldCheck size={200} className="text-brand-green" />
         </div>
         <div className="flex-1 space-y-4 relative z-10 text-center md:text-left">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">Trust Review Protocol</h3>
            <p className="text-slate-500 text-sm italic font-medium max-w-xl leading-relaxed mx-auto md:mx-0">
               "If you believe your score was impacted by circumstances outside your control, you can request a manual audit by a regional field coordinator."
            </p>
         </div>
         <button className="px-10 py-5 bg-white border border-brand-green/20 text-brand-green rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-slate-900 hover:text-white transition-all active:scale-95 relative z-10">
            Initiate Manual Review
         </button>
      </div>
    </div>
  );
}
