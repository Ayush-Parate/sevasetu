import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Megaphone, Radio, Phone, ThumbsDown, ThumbsUp, ArrowRight } from "lucide-react";
import { useToast } from "../Toast";

export default function CommunityCommunicationHub() {
  const [activeTab, setActiveTab] = useState<"broadcast" | "feedback" | "volunteer">("broadcast");
  const { showToast } = useToast();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Community Hub</h2>
          <p className="text-slate-500 text-sm mt-1 opacity-75">Direct local communication with citizens and volunteers.</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
          {[
            { id: "broadcast", label: "Local Broadcast" },
            { id: "feedback", label: "Community Feedback" },
            { id: "volunteer", label: "Field Team Comms" },
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
        {activeTab === "broadcast" && (
          <motion.div key="broadcast" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8 max-w-4xl pt-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                   <div className="w-20 h-20 bg-indigo-50 text-indigo-500 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                      <Megaphone size={36} />
                   </div>
                   <h3 className="text-xl font-bold text-slate-900 mb-2">Awareness Message</h3>
                   <p className="text-sm text-slate-500 opacity-75 font-medium leading-relaxed">Broadcast health, safety, or general info to all registered community numbers.</p>
                </div>
                <div className="bg-rose-50 p-8 rounded-[2.5rem] border border-rose-100 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-xl hover:shadow-rose-100 transition-all group overflow-hidden relative">
                   <div className="absolute -right-10 -top-10 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl"></div>
                   <div className="w-20 h-20 bg-white text-rose-500 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all">
                      <Radio size={36} />
                   </div>
                   <h3 className="text-xl font-bold text-rose-600 mb-2 font-black uppercase tracking-tight">Emergency SMS Push</h3>
                   <p className="text-sm text-rose-900/60 font-medium leading-relaxed opacity-75">Force SMS and App notification to a specific geofenced area immediately.</p>
                </div>
             </div>
             
             <div className="bg-white rounded-[3rem] border border-slate-100 p-10 space-y-8 shadow-sm">
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 bg-brand-peach rounded-2xl text-brand-orange shadow-sm">
                    <MessageSquare size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Compose Broadcast</h3>
                </div>
                <div className="space-y-6">
                  <div>
                     <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 block">Target Recipient Audience</label>
                     <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:bg-white transition-all appearance-none cursor-pointer font-bold">
                       <option>All Ward 4 Registered Residents</option>
                       <option>Verified Community Leaders Only</option>
                       <option>Emergency Service Volunteers</option>
                       <option>Custom Geopath Selection</option>
                     </select>
                  </div>
                  <div>
                     <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 block">Broadcast Message Body</label>
                     <textarea rows={4} className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-6 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:bg-white transition-all font-medium leading-relaxed" placeholder="Write your urgent or informative message here..."></textarea>
                  </div>
                </div>
                <div className="flex justify-end pt-4 border-t border-slate-50">
                   <button onClick={() => showToast("Broadcast Sent", "success")} className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-green transition-all shadow-2xl shadow-slate-900/20 translate-y-0 hover:-translate-y-1 flex items-center gap-3">
                     <Radio size={20} className="animate-pulse" /> Launch Local Push Delivery
                   </button>
                </div>
             </div>
          </motion.div>
        )}

        {activeTab === "feedback" && (
          <motion.div key="feedback" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pt-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                     <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-2xl bg-brand-peach border border-white shadow-sm overflow-hidden">
                             <img src={`https://i.pravatar.cc/100?u=fb${i}`} alt="user"/>
                           </div>
                           <div>
                              <div className="text-lg font-bold text-slate-900">Citizen Profile #{i}</div>
                              <div className="text-[10px] text-slate-400 tracking-[0.2em] font-black uppercase mt-0.5 font-sans">Ward 4 West Sector</div>
                           </div>
                        </div>
                        <div className={`p-3 rounded-2xl shadow-sm ${i % 2 === 0 ? 'bg-emerald-50 text-emerald-500' : 'bg-brand-orange/10 text-brand-orange'}`}>
                           {i % 2 === 0 ? <ThumbsUp size={20} /> : <MessageSquare size={20} />}
                        </div>
                     </div>
                     <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium opacity-80 font-serif italic">
                       {i % 2 === 0 ? "The volunteer team was very quick to distribute rations. Thank you for the support during this hard time. The food quality was excellent." : "We are still waiting for the medical drop in our street. It has been over 48 hours since the request was marked 'in progress'. Please check."}
                     </p>
                     <div className="flex gap-3 pt-6 border-t border-slate-50">
                        <button className="flex-1 py-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all">Direct Respond</button>
                        {i % 2 !== 0 && (
                          <button className="flex-1 py-3.5 bg-rose-50 text-rose-500 hover:bg-rose-600 hover:text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-sm">Escalate Priority</button>
                        )}
                     </div>
                  </div>
                ))}
             </div>
          </motion.div>
        )}

        {activeTab === "volunteer" && (
          <motion.div key="volunteer" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[3rem] border border-slate-100 p-16 text-center flex flex-col items-center justify-center min-h-[500px] shadow-sm group relative overflow-hidden">
             <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cartographer.png")' }}></div>
             <div className="w-24 h-24 bg-slate-50 text-slate-400 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:bg-brand-green group-hover:text-white transition-all translate-y-0 group-hover:-translate-y-2">
                <Phone size={48} />
             </div>
             <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Field Team Comms Center</h3>
             <p className="text-slate-500 text-sm max-w-sm mb-12 leading-relaxed opacity-70 font-medium italic">Directly interface with active volunteers, send technical group instructions, or trigger emergency safety check-in calls for ground teams.</p>
             <div className="flex flex-wrap gap-5 justify-center relative z-10">
                <button className="px-10 py-5 bg-white border border-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all shadow-sm">Send Group Instructions</button>
                <button className="px-10 py-5 bg-brand-green text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-brand-green/20 hover:bg-slate-900 transition-all translate-y-0 hover:-translate-y-1">Open Active Tactical Chat</button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
