import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, 
  XSquare, 
  Camera, 
  MapPin, 
  User, 
  ShieldCheck, 
  History, 
  AlertTriangle, 
  Clock, 
  Image as ImageIcon,
  ExternalLink,
  ChevronRight,
  ClipboardList,
  Search,
  Bell
} from "lucide-react";
import { useToast } from "../Toast";

type ProofTab = "queue" | "missing";

const PROOF_DATA = [
  { id: "PF-401", task: "100 Meals Distribution", volunteer: "Rahul S.", location: "Sector 1", proofType: "Photo + Signature", geoMatch: "99%", timestamp: "20m ago" },
  { id: "PF-402", task: "Medical Camp Setup", volunteer: "Priya V.", location: "Ward 4", proofType: "Video + Geo-Tag", geoMatch: "100%", timestamp: "45m ago" },
];

const MISSING_DATA = [
  { id: "PF-390", task: "School Kit Dispatch", volunteer: "Aman K.", location: "Sector 9", deadline: "Exp 4h ago", status: "Delayed" },
  { id: "PF-388", task: "Clean Water Node Install", volunteer: "Sita R.", location: "Ward 2", deadline: "Exp 12h ago", status: "Critical" },
];

export default function ProofReview() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<ProofTab>("queue");
  const [selectedProof, setSelectedProof] = useState<any>(null);

  const renderContent = () => {
    switch (activeTab) {
      case "queue":
        return (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
            <div className="xl:col-span-2 space-y-6">
               {PROOF_DATA.map((proof) => (
                 <div key={proof.id} onClick={() => setSelectedProof(proof)} className={`bg-white p-10 rounded-[4rem] border-2 transition-all cursor-pointer group flex flex-col md:flex-row justify-between gap-8 items-center ${selectedProof?.id === proof.id ? 'border-brand-green shadow-2xl scale-[1.02]' : 'border-slate-100 shadow-sm hover:shadow-xl'}`}>
                    <div className="flex items-center gap-10">
                       <div className="w-20 h-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-400 group-hover:text-brand-green group-hover:rotate-12 transition-all shadow-inner">
                          <Camera size={32} />
                       </div>
                       <div className="space-y-2 text-center md:text-left">
                          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{proof.id}</span>
                             <div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
                             <span className="text-[10px] font-black text-brand-green uppercase tracking-widest italic">{proof.timestamp}</span>
                          </div>
                          <h4 className="text-2xl font-black text-slate-900 tracking-tight">{proof.task}</h4>
                          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-[11px] font-bold italic text-slate-400">
                             <div className="flex items-center gap-2"><User size={14} className="text-slate-300" /> {proof.volunteer}</div>
                             <div className="flex items-center gap-2"><MapPin size={14} className="text-slate-300" /> {proof.location}</div>
                             <div className="flex items-center gap-2 text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">Geo Match: {proof.geoMatch}</div>
                          </div>
                       </div>
                    </div>
                    <ChevronRight size={24} className={`transition-all hidden md:block ${selectedProof?.id === proof.id ? 'translate-x-2 text-brand-green' : 'text-slate-200'}`} />
                 </div>
               ))}
            </div>

            <div className="xl:col-span-1">
               <AnimatePresence mode="wait">
                  {selectedProof ? (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="bg-slate-950 p-12 rounded-[5rem] text-white shadow-2xl relative overflow-hidden group min-h-[600px] flex flex-col justify-between border-4 border-slate-900">
                       <div className="absolute top-0 left-0 p-20 opacity-5 -translate-x-10 -translate-y-10 rotate-12 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                          <ShieldCheck size={200} className="text-brand-green" />
                       </div>
                       <div className="relative z-10 space-y-10">
                          <div className="flex items-center gap-6 pb-8 border-b border-white/10">
                             <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-brand-green shadow-inner">
                                <Camera size={32} />
                             </div>
                             <div>
                                <h5 className="text-2xl font-black italic tracking-tighter uppercase">{selectedProof.id} Review</h5>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Geo-tagged evidence pending audit</span>
                             </div>
                          </div>

                          <div className="space-y-6">
                             <div className="aspect-video bg-white/5 rounded-[3rem] border border-white/10 flex flex-col items-center justify-center gap-4 group/img cursor-zoom-in relative overflow-hidden">
                                <ImageIcon size={48} className="text-slate-700 group-hover/img:scale-110 transition-transform" />
                                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest italic">Video_Proof_Sector_4.mp4</span>
                                <div className="absolute inset-0 bg-brand-green/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                   <ExternalLink size={24} className="text-white" />
                                </div>
                             </div>
                             
                             <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 space-y-4">
                                <div className="flex items-center gap-3 text-brand-green">
                                   <User size={18} />
                                   <span className="text-[10px] font-black uppercase tracking-widest">Beneficiary Confirmation</span>
                                </div>
                                <p className="text-slate-400 text-xs font-medium italic leading-relaxed font-serif opacity-80 italic">"Volunteer was professional and delivered the kits on time at the specified location." - Otp Verified</p>
                             </div>
                          </div>
                       </div>

                       <div className="relative z-10 pt-10 border-t border-white/10 space-y-6">
                          <button onClick={() => { showToast("Task completion proof approved and trust nodes updated.", "success"); setSelectedProof(null); }} className="w-full py-6 bg-brand-green text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] hover:brightness-110 transition-all active:scale-95 shadow-2xl shadow-brand-green/30">Approve Completion</button>
                          <div className="flex gap-4">
                             <button onClick={() => showToast("Proof rejected. Notification sent to volunteer.", "error")} className="flex-1 py-4 bg-white/5 text-rose-400 border border-white/10 rounded-[1.2rem] font-black uppercase tracking-widest text-[10px] hover:bg-rose-500 hover:text-white transition-all">Reject Proof</button>
                             <button onClick={() => showToast("Requesting higher resolution evidence...", "info")} className="flex-1 py-4 bg-white/5 text-slate-400 border border-white/10 rounded-[1.2rem] font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all">Request Re-upload</button>
                          </div>
                       </div>
                    </motion.div>
                  ) : (
                    <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[5rem] p-20 text-center flex flex-col items-center justify-center h-full min-h-[600px] space-y-10 group">
                       <div className="w-24 h-24 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center text-slate-200 group-hover:rotate-12 transition-transform">
                          <ClipboardList size={50} />
                       </div>
                       <div className="space-y-4 max-w-sm">
                          <h4 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">Evidence Inspector</h4>
                          <p className="text-slate-400 text-sm font-medium italic leading-relaxed font-serif opacity-80">
                             "Select a proof packet from the queue to cross-examine geo-telemetry, visual documentation, and beneficiary authentication."
                          </p>
                       </div>
                    </div>
                  )}
               </AnimatePresence>
            </div>
          </div>
        );
      case "missing":
        return (
          <div className="space-y-8">
             <div className="bg-slate-950 p-16 rounded-[4.5rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute right-0 top-0 p-20 opacity-5 rotate-12 -translate-y-10 group-hover:scale-125 transition-transform duration-[5s] pointer-events-none">
                   <Bell size={200} className="text-amber-400" />
                </div>
                <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12 text-center lg:text-left">
                   <div className="space-y-6 max-w-2xl">
                      <h2 className="text-5xl font-black tracking-tighter uppercase italic leading-none">Missing Proof Protocol</h2>
                      <p className="text-slate-400 text-lg font-medium italic opacity-80 leading-relaxed font-serif">
                         "Identifying completed tasks without valid documentation. Prompting volunteers to maintain data integrity before trust scores degrade."
                      </p>
                   </div>
                   <div className="bg-white/5 p-12 rounded-[3.5rem] border border-white/10 shadow-inner flex gap-12">
                      <div className="text-center">
                         <div className="text-5xl font-black tracking-tighter text-amber-400">12</div>
                         <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-2">Open Delays</div>
                      </div>
                      <div className="text-center">
                         <div className="text-5xl font-black tracking-tighter text-rose-500">03</div>
                         <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-2">Critical Triage</div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {MISSING_DATA.map((item) => (
                  <div key={item.id} className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col md:flex-row justify-between items-center gap-10 relative overflow-hidden">
                     <div className="flex items-center gap-8">
                        <div className={`w-20 h-20 rounded-[2.5rem] flex items-center justify-center shrink-0 shadow-inner group-hover:-rotate-6 transition-transform ${item.status === 'Critical' ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-400'}`}>
                           <AlertTriangle size={32} />
                        </div>
                        <div className="space-y-2">
                           <div className="flex items-center gap-3">
                              <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest italic">{item.deadline}</span>
                              <div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
                              <span className="text-[10px] font-bold text-slate-400 italic">ID: {item.id}</span>
                           </div>
                           <h4 className="text-2xl font-black text-slate-900 tracking-tight">{item.task}</h4>
                           <div className="text-[11px] font-bold italic text-slate-400 flex items-center gap-2"><User size={14} /> Volunteer: {item.volunteer} • {item.location}</div>
                        </div>
                     </div>
                     <div className="flex gap-4 w-full md:w-auto">
                        <button onClick={() => showToast("Reminder transmission sent to primary device.", "success")} className="flex-1 md:flex-none px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-brand-green transition-all active:scale-95">Reminder to Volunteer</button>
                        <button onClick={() => showToast("Opening manual evidence review interface...", "info")} className="flex-1 md:flex-none px-10 py-5 bg-white border border-slate-100 text-slate-900 rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 hover:text-white transition-all opacity-60">Manual Review</button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-10 duration-1000">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 bg-white p-12 rounded-[4.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
         <div className="absolute right-0 bottom-0 p-20 opacity-[0.03] text-brand-green rotate-12 pointer-events-none">
            <Camera size={250} />
         </div>
         <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">Proof Integrity Laboratory</h1>
            <p className="text-slate-500 font-medium italic mt-2 opacity-75 font-serif max-w-xl leading-relaxed">
               "Cross-referencing digital evidence with physical geolocation telemetry to ensure 100% impact authenticity."
            </p>
         </div>
         <div className="flex bg-slate-50 p-2 rounded-[2.5rem] border border-slate-100 shadow-inner relative z-10 w-full lg:w-auto">
            {(["queue", "missing"] as ProofTab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 lg:flex-none px-12 py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-slate-950 text-white shadow-2xl scale-105' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab === 'queue' ? 'Confirmation Queue' : 'Missing Proofs'}
              </button>
            ))}
         </div>
      </div>

      <div className="min-h-[600px]">
         <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
               {renderContent()}
            </motion.div>
         </AnimatePresence>
      </div>
    </div>
  );
}
