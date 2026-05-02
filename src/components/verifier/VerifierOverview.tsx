import React from "react";
import { motion } from "motion/react";
import { 
  ClipboardList, 
  Zap, 
  FileCheck, 
  ShieldAlert, 
  Copy, 
  Target, 
  Clock, 
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  History
} from "lucide-react";
import RoleLiveMap from "../RoleLiveMap";
import { useAsync } from "../../lib/useAsync";
import { getVerifierStats } from "../../lib/api";

export default function VerifierOverview({ setActiveTab }: { setActiveTab: (tab: any) => void }) {
  const { data: stats } = useAsync(getVerifierStats);

  const cards = [
    {
      id: "queue",
      title: "Pending Verifications",
      value: stats?.pendingVerifications ?? "...",
      sub: `${stats?.emergencyClaims ?? 0} Urgent`,
      icon: ClipboardList,
      color: "text-blue-500",
      bg: "bg-blue-50",
      btn: "Open Verification Queue"
    },
    {
      id: "emergency",
      title: "Emergency Claims",
      value: stats?.emergencyClaims ?? "...",
      sub: "Critical high-risk",
      icon: Zap,
      color: "text-rose-500",
      bg: "bg-rose-50",
      btn: "Emergency Validation"
    },
    {
      id: "proof",
      title: "Completion Proofs",
      value: stats?.completedToday ?? "...",
      sub: "Verified today",
      icon: FileCheck,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      btn: "Proof Review Center"
    },
    {
      id: "fraud",
      title: "Fraud Alerts",
      value: stats?.fraudAlerts ?? "...",
      sub: "Suspicious telemetry",
      icon: ShieldAlert,
      color: "text-amber-500",
      bg: "bg-amber-50",
      btn: "Fraud Investigation"
    },
    {
      id: "duplicates",
      title: "Duplicate Reports",
      value: stats?.duplicateCount ?? "...",
      sub: "Location overlap",
      icon: Copy,
      color: "text-slate-500",
      bg: "bg-slate-100",
      btn: "Duplicate Detection"
    },
    {
      id: "trust",
      title: "Trust Score Reviews",
      value: stats?.trustReviews ?? "...",
      sub: "NGO/Volunteer audits",
      icon: Target,
      color: "text-brand-green",
      bg: "bg-brand-green/10",
      btn: "Trust Review Center"
    },
    {
      id: "analytics",
      title: "Verification Speed",
      value: stats?.verificationSpeed ?? "...",
      sub: "-4m from average",
      icon: Clock,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
      btn: "Performance Analytics"
    },
    {
      id: "analytics",
      title: "Resolution Accuracy",
      value: stats?.resolutionAccuracy ?? "...",
      sub: "+0.2% precision",
      icon: CheckCircle2,
      color: "text-cyan-500",
      bg: "bg-cyan-50",
      btn: "Accuracy Dashboard"
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Header Info */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Command Intelligence Center</h1>
           <p className="text-slate-400 font-medium italic mt-1 opacity-75">Decentralized Trust Auditing & Need Verification Protocol v4.0</p>
        </div>
        <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-[1.5rem] border border-slate-100 shadow-sm">
           <div className="flex flex-col text-right">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Trust Index</span>
              <span className="text-xl font-black text-brand-green tracking-tighter">98.4% Secure</span>
           </div>
           <div className="w-px h-10 bg-slate-100 mx-2"></div>
           <TrendingUp size={24} className="text-brand-green" />
        </div>
      </div>

      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
         {cards.map((card, i) => (
           <motion.div
             key={card.title}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.05 }}
             className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col items-center text-center overflow-hidden relative"
           >
              <div className={`absolute -right-4 -top-4 w-32 h-32 ${card.bg} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
              
              <div className={`w-16 h-16 ${card.bg} ${card.color} rounded-[1.5rem] flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform`}>
                 <card.icon size={32} />
              </div>
              
              <div className="space-y-1 mb-6">
                 <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{card.title}</div>
                 <div className="text-5xl font-black text-slate-900 tracking-tighter">{card.value}</div>
                 <div className={`text-[10px] font-bold ${card.color} italic px-3 py-1 rounded-full bg-white border border-slate-100 w-fit mx-auto mt-2`}>
                   {card.sub}
                 </div>
              </div>

              <button 
                onClick={() => setActiveTab(card.id)}
                className="w-full mt-4 py-4 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-[9px] shadow-2xl flex items-center justify-center gap-2 hover:bg-brand-green transition-all transform active:scale-95"
              >
                 {card.btn} <ArrowRight size={14} />
              </button>
           </motion.div>
         ))}
      </div>

      <RoleLiveMap height={320} title="Verifier Hotspot Validation Map" />

      {/* Critical Alerts Strip */}
      <div className="bg-slate-900 p-12 rounded-[4rem] text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl">
         <div className="absolute left-0 top-0 p-20 opacity-5 rotate-12 pointer-events-none">
            <AlertTriangle size={200} />
         </div>
         <div className="flex-1 space-y-4 relative z-10 text-center lg:text-left">
            <div className="flex items-center gap-4 justify-center lg:justify-start">
               <span className="px-4 py-1.5 bg-rose-500 text-[10px] font-black uppercase tracking-widest rounded-full animate-pulse shadow-lg shadow-rose-500/20">Critical Anomaly</span>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">ID: X7-99-ALPHA</span>
            </div>
            <h2 className="text-3xl font-black tracking-tighter leading-none italic uppercase">Suspicious High-Density Reporting in Ward 4</h2>
            <p className="text-slate-400 text-sm font-medium italic opacity-75 max-w-2xl leading-relaxed font-serif">
              "We've detected a cluster of 12 identical reports within 200m radius of Sector 4 Metro Station. Potential BOT-net activity or major systemic event. Manual field validation request auto-generated."
            </p>
         </div>
         <div className="flex gap-4 relative z-10">
            <button className="px-10 py-5 bg-white text-slate-900 rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-brand-green hover:text-white transition-all transform active:scale-95">
               Deploy Investigation Unit
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all">
               Ignore / Merge Reports
            </button>
         </div>
      </div>

      {/* Secondary Intelligence Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         <div className="bg-white border border-slate-100 p-12 rounded-[4rem] shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-center mb-10">
               <h3 className="text-2xl font-black text-slate-900 tracking-tight">Recent Decision Logs</h3>
               <button className="text-[10px] font-black text-brand-green uppercase tracking-widest hover:underline flex items-center gap-2">
                 Full Archive <History size={14} />
               </button>
            </div>
            <div className="space-y-4">
               {[
                 { action: "APPROVED", item: "Emergency Food Claim #829", time: "2m ago", status: "text-emerald-500" },
                 { action: "REJECTED", item: "Resource Completion Proof #112", time: "14m ago", status: "text-rose-500" },
                 { action: "FLAGGED", item: "NGO Trust Audit - HelpHand India", time: "22m ago", status: "text-amber-500" },
                 { action: "MERGED", item: "5 Duplicate Fire Reports - Sector 2", time: "1h ago", status: "text-slate-400" },
               ].map((log, idx) => (
                 <div key={idx} className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-white transition-all cursor-pointer group/log">
                    <div className="flex items-center gap-6">
                       <span className={`text-[10px] font-black ${log.status} uppercase tracking-widest px-4 py-1.5 rounded-full bg-white border border-slate-50 group-hover/log:scale-105 transition-transform`}>{log.action}</span>
                       <span className="text-sm font-bold text-slate-700 italic group-hover/log:text-slate-900 transition-colors">{log.item}</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{log.time}</span>
                 </div>
               ))}
            </div>
         </div>

         <div className="bg-brand-green text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute bottom-0 right-0 p-16 opacity-10 rotate-12">
               <Target size={200} />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-between">
               <div>
                  <h3 className="text-3xl font-black tracking-tighter mb-4">Regional Integrity Roadmap</h3>
                  <p className="text-brand-green-50 text-sm italic font-medium opacity-80 leading-relaxed font-serif">
                     "Our goal for Ward 4 is <span className="text-white font-bold underline">100% Zero-Trust Automation</span>. We are currently verifying <span className="text-white font-bold">24% of reports</span> via AI-consensus before a verifier even looks."
                  </p>
               </div>
               
               <div className="grid grid-cols-2 gap-8 my-8 pb-8">
                  <div>
                     <div className="text-5xl font-black tracking-tighter mb-2">840</div>
                     <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Verified Nodes Today</div>
                  </div>
                  <div>
                     <div className="text-5xl font-black tracking-tighter mb-2">91%</div>
                     <div className="text-[10px] font-black uppercase tracking-widest opacity-60">AI Confidence Index</div>
                  </div>
               </div>

               <button className="w-full py-6 bg-white text-brand-green rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-slate-900 hover:text-white transition-all transform active:scale-95">
                  View Integrity Deep-Dive
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
