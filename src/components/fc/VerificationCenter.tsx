import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, MapPin, AlertTriangle, Images, CheckCircle, XCircle, Search, Flame } from "lucide-react";
import { useToast } from "../Toast";

export default function VerificationCenter() {
  const [activeTab, setActiveTab] = useState<"pending" | "severity" | "location">("pending");
  const { showToast } = useToast();

  const handleVerify = () => {
    showToast("Report highly verified", "success");
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Verification Center</h2>
          <p className="text-slate-500 text-sm mt-1 opacity-75">Validate issue authenticity, duplicate logic, severity, and field coordinates.</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
          {[
            { id: "pending", label: "Pending Validation" },
            { id: "severity", label: "Severity Confirmation" },
            { id: "location", label: "Location Validation" },
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
        {activeTab === "pending" && (
          <motion.div key="pending" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                   <div className="flex justify-between items-start mb-6">
                     <span className="bg-brand-peach text-brand-orange px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
                       Awaiting Validation
                     </span>
                     <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">10 mins ago</span>
                   </div>
                   <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-green transition-colors">Needs Medical Kit for Relief Camp</h3>
                   <p className="text-sm text-slate-500 mb-6 line-clamp-2 opacity-75 font-medium leading-relaxed">The north relief camp currently has 45 individuals but is running short on basic first aid and anti-inflammatory supplies due to recent intake.</p>
                   
                   <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-8">
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Supporting Evidence</div>
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-white rounded-xl border border-slate-100 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-brand-peach hover:text-brand-orange hover:border-brand-orange/20 transition-all shadow-sm group/thumb">
                           <Images size={20} className="mb-1" />
                           <span className="text-[9px] font-black">2 PICS</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-2">
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Confidence (AI)</span>
                             <span className="text-xs font-bold text-brand-green">75%</span>
                          </div>
                          <div className="w-full bg-slate-200 h-1.5 rounded-full">
                            <div className="w-3/4 h-full bg-brand-green rounded-full shadow-sm"></div>
                          </div>
                        </div>
                      </div>
                   </div>

                   <div className="flex flex-wrap gap-3">
                     <button onClick={handleVerify} className="flex-1 py-3.5 bg-brand-green text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-brand-green/20 hover:scale-105 active:scale-95 flex justify-center items-center gap-2">
                       <CheckCircle size={18} /> Confirm Need
                     </button>
                     <button onClick={() => showToast("Request rejected", "error")} className="py-3.5 px-6 bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-500 border border-slate-100 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all flex justify-center items-center gap-2 shadow-sm">
                       <XCircle size={18} /> Reject
                     </button>
                   </div>
                   <button className="w-full mt-4 py-2 text-slate-400 hover:text-brand-green text-[9px] font-black uppercase tracking-[0.2em] transition-all">
                     Request More Evidence Required
                   </button>
                 </div>
               ))}
             </div>
          </motion.div>
        )}

        {activeTab === "severity" && (
          <motion.div key="severity" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
             <div className="bg-rose-50 border border-rose-100 rounded-[3rem] p-12 mb-6 shadow-sm relative overflow-hidden group">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl group-hover:scale-110 transition-transform"></div>
                <div className="flex items-center gap-4 text-rose-500 mb-6 relative z-10">
                  <div className="p-4 bg-white rounded-2xl shadow-sm">
                    <Flame size={32} />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">High Severity Queue</h3>
                </div>
                <p className="text-rose-900/60 text-sm max-w-2xl mb-8 leading-relaxed font-medium relative z-10">Reports classified as medical emergencies, women safety, or disaster cases require immediately severity confirmation to bypass standard triage. Your confirmation acts as a command trigger for regional dispatch.</p>
                <button className="px-10 py-5 bg-rose-600 text-white rounded-2xl font-bold font-black uppercase tracking-widest text-xs shadow-xl shadow-rose-600/20 hover:bg-rose-700 transition-all transform hover:-translate-y-1 relative z-10">
                  Review 3 Critical Priority Items Now
                </button>
             </div>
          </motion.div>
        )}

        {activeTab === "location" && (
         <motion.div key="location" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[550px] bg-white rounded-[3rem] border border-slate-100 relative overflow-hidden flex items-center justify-center shadow-sm">
            {/* Map placeholder */}
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cartographer.png")' }}></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white/80"></div>
            
            <div className="relative z-10 text-center max-w-lg p-10">
               <div className="w-24 h-24 bg-brand-peach rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-sm group hover:scale-110 transition-transform">
                <MapPin size={48} className="text-brand-orange animate-bounce" />
               </div>
               <h3 className="text-3xl font-bold text-slate-900 mb-4">Location Precision Scan</h3>
               <p className="text-slate-500 text-sm mb-10 leading-relaxed opacity-75 font-medium italic">Correlates reported addresses with GPS metadata to detect spoofed areas or inaccurate bounding boxes. Critical for ensuring dispatch efficiency.</p>
               <button className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-green transition-all shadow-2xl shadow-slate-900/20 translate-y-0 hover:-translate-y-1">
                 Initial Ground Scan Scan
               </button>
            </div>
         </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
