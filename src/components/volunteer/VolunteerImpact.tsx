import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { TrendingUp, Users, Heart, Star, Award, BarChart3, Package, Download, Zap, Shield, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useToast } from "../Toast";

export default function VolunteerImpact() {
  const { showToast } = useToast();

  const stats = [
    { label: "People Impacted", value: "1,240", icon: Users, color: "text-brand-green", bg: "bg-brand-green/10", trend: "+12% this month" },
    { label: "Missions Finished", value: "48", icon: CheckCircle2, color: "text-blue-500", bg: "bg-blue-50", trend: "Top Tier" },
    { label: "Emergency Responses", value: "06", icon: Zap, color: "text-rose-500", bg: "bg-rose-50", trend: "Gold Tier" },
    { label: "Community Trust", value: "940", icon: ShieldCheck, color: "text-amber-500", bg: "bg-amber-50", trend: "Expert" }
  ];

  const trends = [
    { month: "Jan", impact: 400 },
    { month: "Feb", impact: 600 },
    { month: "Mar", impact: 550 },
    { month: "Apr", impact: 900 },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm gap-10">
         <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter">My Community Footprint</h2>
            <p className="text-slate-500 text-sm mt-1 font-medium italic opacity-75 leading-relaxed">Quantifying your selfless contribution to Ward 4's safety and resilience.</p>
         </div>
         <button onClick={() => showToast("Generating Secure PDF Impact Report...", "loading")} className="px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-2xl flex items-center gap-3 hover:bg-brand-green transition-all transform hover:-translate-y-1">
            <Download size={20} /> Export Detailed Audit
         </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
         {stats.map((m, i) => (
           <motion.div
             key={m.label}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-sm hover:shadow-xl transition-all group"
           >
              <div className={`w-14 h-14 ${m.bg} ${m.color} rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform`}>
                 <m.icon size={28} />
              </div>
              <div className="text-4xl font-black text-slate-900 tracking-tighter mb-2">{m.value}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">{m.label}</div>
              <div className="text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100 italic flex items-center gap-2">
                 <TrendingUp size={12} /> {m.trend}
              </div>
           </motion.div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <div className="lg:col-span-2 bg-white border border-slate-100 p-12 rounded-[4rem] shadow-sm">
            <div className="flex justify-between items-center mb-12">
               <h3 className="text-2xl font-black text-slate-900 tracking-tight">Impact Contribution Trends</h3>
               <div className="flex gap-2">
                  {['Weekly', 'Monthly', 'Yearly'].map(t => (
                    <button key={t} className={`px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all ${t === 'Monthly' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400'}`}>{t}</button>
                  ))}
               </div>
            </div>
            <div className="h-[300px] flex items-end justify-between px-6 pt-10 border-b-2 border-slate-100 gap-12">
               {trends.map((t, idx) => (
                 <div key={t.month} className="flex-1 flex flex-col items-center gap-6 relative group">
                    <motion.div
                       initial={{ height: 0 }}
                       animate={{ height: `${(t.impact / 1000) * 100}%` }}
                       className="w-full bg-brand-green/20 rounded-t-[2rem] border-x-2 border-t-2 border-brand-green/10 relative shadow-inner overflow-hidden"
                    >
                       <div className="absolute inset-x-0 bottom-0 bg-brand-green h-1/2 opacity-20 blur-2xl group-hover:opacity-40 transition-opacity"></div>
                    </motion.div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">{t.month}</span>
                    <div className="absolute top-[-40px] opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-black text-brand-green bg-white shadow-xl px-3 py-1 rounded-lg border border-brand-green/10 whitespace-nowrap">{t.impact} Helped</div>
                 </div>
               ))}
            </div>
         </div>

         <div className="bg-slate-900 text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden flex flex-col justify-between group">
            <div className="absolute top-0 right-0 p-12 opacity-10 scale-150 rotate-12 group-hover:scale-[2] transition-transform duration-1000">
               <ShieldCheck size={120} />
            </div>
            <div>
               <h3 className="text-3xl font-black text-white tracking-tighter mb-4">Elite Sector Badge</h3>
               <p className="text-slate-400 text-sm italic font-medium opacity-80 leading-relaxed">
                  You have contributed to <span className="text-brand-green font-bold">85% of critical missions</span> in Sector 4 this quarter.
               </p>
            </div>
            <div className="py-8">
               <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Progress to Diamond Tier</span>
                  <span className="text-xs font-black text-brand-green tracking-tighter">92%</span>
               </div>
               <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} className="h-full bg-brand-green shadow-[0_0_15px_#10b981]" />
               </div>
            </div>
            <button className="w-full py-5 bg-white text-slate-900 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-brand-green hover:text-white transition-all active:scale-95">View Achievement Roadmap</button>
         </div>
      </div>
    </div>
  );
}
