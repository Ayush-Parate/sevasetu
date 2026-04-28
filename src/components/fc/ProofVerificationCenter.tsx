import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, XCircle, Search, Images, FileWarning, Eye, UserCheck } from "lucide-react";
import { useToast } from "../Toast";

export default function ProofVerificationCenter() {
  const [activeTab, setActiveTab] = useState<"queue" | "field">("queue");
  const { showToast } = useToast();

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Proof Verification</h2>
          <p className="text-slate-500 text-sm mt-1 opacity-75">Validate task completion proof submitted by volunteers before closing requests.</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
          {[
            { id: "queue", label: "Completion Queue" },
            { id: "field", label: "Field Validation" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id ? "bg-brand-green text-white shadow-xl shadow-brand-green/20" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "queue" && (
          <motion.div key="queue" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6 pt-2">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white border border-slate-100 rounded-[2.5rem] p-10 hover:shadow-2xl hover:shadow-slate-200/50 transition-all group relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-8 opacity-[0.03] scale-150 rotate-12 pointer-events-none group-hover:scale-[1.7] transition-transform">
                        <CheckCircle size={64} />
                     </div>
                     <div className="flex justify-between items-start mb-6">
                       <span className="text-[10px] bg-slate-50 text-slate-400 px-4 py-2 rounded-xl font-black uppercase tracking-[0.2em] border border-slate-100 shadow-inner">Task ID: T-10{i}</span>
                       <span className="text-xs text-brand-green font-bold bg-brand-green/5 px-3 py-1 rounded-lg">Submitted {i * 2}m ago</span>
                     </div>
                     <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight group-hover:text-brand-green transition-colors">Deliver Emergency Food Packets</h3>
                     <div className="flex items-center gap-3 mb-8">
                        <div className="p-1.5 bg-brand-peach rounded-lg text-brand-orange">
                          <UserCheck size={16} />
                        </div>
                        <span className="text-sm text-slate-500 font-medium">Assigned to: <span className="text-slate-900 font-bold">Rahul Mishra</span></span>
                     </div>

                     <div className="bg-slate-50 rounded-[2rem] border border-slate-100 p-6 mb-8 shadow-inner">
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 ml-1">Submitted Evidence Assets</div>
                        <div className="flex items-center gap-5">
                           <div className="w-24 h-24 bg-white rounded-2xl border border-slate-200 overflow-hidden relative group/img cursor-pointer shadow-sm hover:scale-105 transition-transform">
                              <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=200&h=200&fit=crop" className="w-full h-full object-cover group-hover/img:scale-110 transition-all duration-500" alt="Proof" />
                              <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all scale-110 group-hover/img:scale-100">
                                <Eye size={20} className="text-white" />
                              </div>
                           </div>
                           <div className="flex-1 space-y-3">
                              <div className="flex items-center justify-between">
                                 <span className="text-[11px] text-slate-500 font-bold">GPS Location Match</span>
                                 <div className="w-5 h-5 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-100">
                                   <CheckCircle size={10} />
                                 </div>
                              </div>
                              <div className="flex items-center justify-between">
                                 <span className="text-[11px] text-slate-500 font-bold">Liveness Signature</span>
                                 <div className="w-5 h-5 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-100">
                                   <CheckCircle size={10} />
                                 </div>
                              </div>
                              <div className="flex items-center justify-between">
                                 <span className="text-[11px] text-slate-500 font-bold">Beneficiary Acknowledged</span>
                                 <div className="w-5 h-5 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-100">
                                   <CheckCircle size={10} />
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="flex flex-wrap gap-3">
                       <button onClick={() => showToast("Task formally closed", "success")} className="flex-[2] py-4 bg-brand-green lg:hover:bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-brand-green/20 transition-all translate-y-0 active:scale-95 flex justify-center items-center gap-3">
                         <CheckCircle size={18} /> Formalize Closure
                       </button>
                       <button onClick={() => showToast("Proof Rejected", "error")} className="flex-1 py-4 bg-white border border-slate-100 text-slate-400 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-100 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 flex justify-center items-center gap-3">
                         <XCircle size={18} /> Reject
                       </button>
                     </div>
                  </div>
                ))}
             </div>
          </motion.div>
        )}

        {activeTab === "field" && (
          <motion.div key="field" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[3rem] border border-slate-100 p-16 text-center flex flex-col items-center justify-center min-h-[500px] shadow-sm relative overflow-hidden group">
             <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cartographer.png")' }}></div>
             <div className="w-24 h-24 bg-amber-50 text-amber-500 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all transform group-hover:-translate-y-2">
                <FileWarning size={48} />
             </div>
             <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Physical Site Validation Required</h3>
             <p className="text-slate-500 text-sm max-w-sm mb-12 leading-relaxed opacity-70 font-medium italic">Certain critical tasks or ambiguous proofs require another high-tier volunteer or coordinator to physically visit the site to validate resolution accurately.</p>
             <button className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-slate-900/20 flex items-center gap-3 hover:bg-brand-green transition-all translate-y-0 hover:-translate-y-1 active:scale-95">
                <UserCheck size={20} /> Schedule Professional Site Audit
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
