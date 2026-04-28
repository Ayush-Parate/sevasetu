import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Target, 
  ShieldCheck, 
  Users, 
  Building2, 
  Award, 
  AlertTriangle, 
  TrendingUp, 
  Star, 
  Search, 
  ArrowRight,
  Filter,
  CheckCircle2,
  FileText,
  Activity,
  History
} from "lucide-react";
import { useToast } from "../Toast";

export default function TrustReviewCenter() {
  const { showToast } = useToast();
  const [activeSegment, setActiveSegment] = useState("NGOS");

  const renderTrustContent = () => {
    switch (activeSegment) {
      case "VOLUNTEERS":
        return (
          <div className="space-y-6">
            {[
              { name: "Rahul S.", id: "V-9901", score: 840, performance: "92%", complaints: 1, history: "High field activity in Market Zone" },
              { name: "Priya V.", id: "V-9902", score: 960, performance: "99%", complaints: 0, history: "Top contributor for medical camps" },
            ].map((v) => (
              <div key={v.id} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col lg:flex-row justify-between items-center gap-8 group">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-2xl flex items-center justify-center font-black">{v.score}</div>
                  <div>
                    <h4 className="text-xl font-black text-slate-900">{v.name} <span className="text-xs text-slate-400">({v.id})</span></h4>
                    <div className="text-[10px] font-bold text-slate-400 italic">Perf: {v.performance} • Complaints: {v.complaints} • {v.history}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => showToast("Score upgraded. New status: Elite.", "success")} className="px-6 py-3 bg-brand-green text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">Upgrade Score</button>
                  <button onClick={() => showToast("Score reduced due to compliance gap.", "error")} className="px-6 py-3 bg-rose-50 text-rose-500 rounded-xl text-[9px] font-black uppercase tracking-widest">Reduce Score</button>
                  <button onClick={() => showToast("Opening deep investigation timeline...", "info")} className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest">Manual Investigation</button>
                </div>
              </div>
            ))}
          </div>
        );
      case "NGOS":
        return (
          <div className="space-y-6">
            {[
              { name: "Global Relief Found.", id: "NGO-X", score: 982, quality: "High", complaints: "None", credibility: "Tier 1 Verified" },
              { name: "HelpHand India", id: "NGO-Y", score: 720, quality: "Variable", complaints: "Duplicate Alert", credibility: "Under Watch" },
            ].map((n) => (
              <div key={n.id} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col lg:flex-row justify-between items-center gap-8 group">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center font-black">{n.score}</div>
                  <div>
                    <h4 className="text-xl font-black text-slate-900">{n.name} <span className="text-xs text-slate-400">({n.id})</span></h4>
                    <div className="text-[10px] font-bold text-slate-400 italic">Quality: {n.quality} • {n.credibility} • Complaints: {n.complaints}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => showToast("Compliance warning transmitted to NGO admin.", "warning")} className="px-6 py-3 bg-amber-50 text-amber-600 rounded-xl text-[9px] font-black uppercase tracking-widest">NGO Compliance Warning</button>
                  <button onClick={() => showToast("Full financial & activity audit requested.", "info")} className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest">Audit Request</button>
                </div>
              </div>
            ))}
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-white border border-slate-100 p-12 rounded-[4rem] shadow-sm">
         <div className="space-y-2">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">Trust Review Center</h2>
            <p className="text-slate-500 font-medium italic opacity-75 leading-relaxed font-serif max-w-xl">
               "Manage trust scores and credibility reviews across the entire social integrity network."
            </p>
         </div>
         <div className="flex flex-col items-end gap-3 shrink-0">
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total System Nodes</div>
            <div className="text-5xl font-black text-slate-900 tracking-tighter">12,840</div>
            <div className="flex items-center gap-2 text-[10px] font-black text-brand-green uppercase tracking-[0.2em] bg-brand-green/10 px-4 py-1 rounded-full">98% Data Precision</div>
         </div>
      </div>

      <div className="space-y-10">
         <div className="flex bg-slate-50 p-2 rounded-[2rem] border border-slate-100 shadow-inner w-fit">
            {["NGOS", "VOLUNTEERS"].map(t => (
              <button
                key={t}
                onClick={() => setActiveSegment(t)}
                className={`px-12 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSegment === t ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {t} Review
              </button>
            ))}
         </div>

         <div className="min-h-[500px]">
            {renderTrustContent()}
         </div>
      </div>
    </div>
  );
}
