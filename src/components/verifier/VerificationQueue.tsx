import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, 
  MapPin, 
  Clock, 
  User, 
  Search, 
  ShieldCheck, 
  Eye, 
  Camera, 
  History,
  ShieldAlert,
  Zap,
  ClipboardList,
  Filter
} from "lucide-react";
import { useToast } from "../Toast";
import { useAsync } from "../../lib/useAsync";
import { listNeeds, updateNeedStatus } from "../../lib/api";

type QueueTab = "new" | "priority" | "delayed";

const QUEUE_DATA = {
  new: [
    { id: "REP-9901", title: "Urgent Food Shortage", category: "Nutrition", location: "Sector 12 Slums", reporter: "Field Scout #4", urgency: "High", duplicateProb: "12%", evidence: ["Photo", "Geo-Tag"], status: "Pending" },
    { id: "REP-9902", title: "Water Supply Leakage", category: "Infrastructure", location: "Railway Xing", reporter: "Civic Observer", urgency: "Medium", duplicateProb: "85%", evidence: ["Video"], status: "Checking" },
  ],
  priority: [
    { id: "CRT-001", title: "Women Safety Alert", category: "Protection", location: "Market Metro", reporter: "SOS Node", urgency: "Extreme", scenario: "Harassment Reported", status: "Immediate" },
    { id: "CRT-002", title: "Missing Child Trace", category: "Child Welfare", location: "Old Town Park", reporter: "Guardian", urgency: "Extreme", scenario: "Last seen 2h ago", status: "Immediate" },
  ],
  delayed: [
    { id: "DLY-442", title: "School Supply Request", location: "Ward 4", delay: "48h Overdue", currentAssignee: "Unit-Alpha", status: "Stuck" },
  ]
};

export default function VerificationQueue() {
  const { showToast } = useToast();
  const [activeSubTab, setActiveSubTab] = useState<QueueTab>("new");
  const { data: needs = [], loading, reload } = useAsync(listNeeds);

  const pendingNeeds = needs.filter(n => n.status === "pending");
  const emergencyNeeds = needs.filter(n => n.urgencyScore >= 9 && n.status === "pending");

  const handleVerify = async (id: string) => {
    try {
      await updateNeedStatus(id, "verified");
      showToast("Report verified as genuine.", "success");
      reload();
    } catch {
      showToast("Failed to verify report.", "error");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await updateNeedStatus(id, "rejected");
      showToast("Report rejected as false.", "success");
      reload();
    } catch {
      showToast("Failed to reject report.", "error");
    }
  };

  const renderQueueContent = () => {
    switch (activeSubTab) {
      case "new":
        return (
          <div className="space-y-6">
            {loading && pendingNeeds.length === 0 && (
              <div className="text-center py-8 text-slate-400">Loading reports...</div>
            )}
            {pendingNeeds.map((item) => (
              <div key={item.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col lg:flex-row justify-between gap-8 group">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-lg">{item.id.slice(-6).toUpperCase()}</span>
                    <span className="text-[10px] font-black text-brand-green uppercase tracking-widest">{item.category}</span>
                    <div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
                    <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Urgency: {item.urgencyScore}/10</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">{item.category} Report</h3>
                  <div className="flex flex-wrap gap-6 text-[11px] font-bold italic text-slate-400 font-serif">
                    <div className="flex items-center gap-2"><MapPin size={14} className="text-slate-300" /> {item.location || "Location TBD"}</div>
                    <div className="flex items-center gap-2"><Clock size={14} className="text-slate-300" /> {new Date(item.createdAt).toLocaleDateString()}</div>
                  </div>
                  <p className="text-sm text-slate-500 italic line-clamp-2">{item.description}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 self-center lg:self-auto">
                  <button onClick={() => handleVerify(item.id)} className="px-6 py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all">Verify Genuine</button>
                  <button onClick={() => handleReject(item.id)} className="px-6 py-4 bg-rose-500 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] shadow-lg shadow-rose-500/20 hover:scale-105 active:scale-95 transition-all">Reject False</button>
                  <button onClick={() => showToast("Requesting additional telemetry from field...", "info")} className="px-6 py-4 bg-white border border-slate-100 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[9px] hover:bg-slate-50 transition-all flex items-center gap-2 italic shadow-sm">More Evidence</button>
                </div>
              </div>
            ))}
            {!loading && pendingNeeds.length === 0 && (
              <div className="text-center py-12 text-slate-400">No pending reports in queue. 🎉</div>
            )}
          </div>
        );
      case "priority":
        return (
          <div className="space-y-6">
            <div className="bg-rose-500/5 border-2 border-rose-500 border-dashed p-10 rounded-[4rem] text-center mb-10">
               <h4 className="text-rose-500 font-black uppercase tracking-[0.3em] text-xs mb-2">Zero-Tolerance Critical Monitoring</h4>
               <p className="text-slate-500 font-medium italic text-sm">Priority cases bypass standard AI queues and require immediate human verifier intervention.</p>
            </div>
            {emergencyNeeds.map((item) => (
              <div key={item.id} className="bg-white p-10 rounded-[3.5rem] border-4 border-rose-500/10 shadow-2xl flex flex-col lg:flex-row justify-between gap-10 items-center relative overflow-hidden group">
                 <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-4">
                       <span className="px-5 py-2 bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full animate-pulse">Critical {item.category}</span>
                       <span className="text-[10px] font-bold text-slate-400 italic">ID: {item.id.slice(-6).toUpperCase()}</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter italic">{item.category} Report</h3>
                    <div className="flex items-center gap-6 text-sm font-bold text-slate-500 italic">
                       <div className="flex items-center gap-2"><MapPin size={18} className="text-rose-500" /> {item.location || "Location TBD"}</div>
                       <div className="text-rose-600">Urgency Score: {item.urgencyScore}/10</div>
                    </div>
                    <p className="text-sm text-slate-500 italic line-clamp-2">{item.description}</p>
                 </div>
                 <div className="flex gap-4 relative z-10 w-full lg:w-auto">
                    <button onClick={() => handleVerify(item.id)} className="flex-1 lg:px-10 py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-emerald-500 transition-all active:scale-95">Critical Approval</button>
                    <button onClick={() => handleReject(item.id)} className="flex-1 lg:px-10 py-6 bg-rose-100 text-rose-600 rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-rose-200 transition-all">Reject</button>
                 </div>
              </div>
            ))}
            {!loading && emergencyNeeds.length === 0 && (
              <div className="text-center py-12 text-slate-400">No emergency claims at this time.</div>
            )}
          </div>
        );
      case "delayed":
        return (
          <div className="space-y-6">
            {QUEUE_DATA.delayed.map((item) => (
              <div key={item.id} className="bg-white p-10 rounded-[3.5rem] border border-amber-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-8 group">
                 <div className="flex items-center gap-10">
                    <div className="w-20 h-20 bg-amber-50 rounded-[2.5rem] flex items-center justify-center text-amber-500 group-hover:rotate-12 transition-transform">
                       <Clock size={32} />
                    </div>
                    <div className="space-y-2">
                       <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">{item.delay}</span>
                          <div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Curr: {item.currentAssignee}</span>
                       </div>
                       <h4 className="text-2xl font-black text-slate-900 tracking-tight">{item.title}</h4>
                       <p className="text-[11px] font-bold italic text-slate-400">Decision required to maintain system SLA and node trust.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <button onClick={() => showToast("Fast-tracking review process...", "info")} className="px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-brand-green transition-all shadow-xl active:scale-95">Fast Track Review</button>
                    <button onClick={() => showToast("Backup verifier node assigned.", "success")} className="px-10 py-5 bg-white border border-slate-100 text-slate-900 rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all opacity-60">Assign Backup</button>
                 </div>
              </div>
            ))}
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm gap-8 relative overflow-hidden">
         <div className="absolute right-0 top-0 p-20 opacity-[0.02] pointer-events-none text-brand-green rotate-12">
            <ClipboardList size={250} />
         </div>
         <div className="space-y-2 relative z-10">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Verification Command</h2>
            <p className="text-slate-400 font-medium italic opacity-75 font-serif max-w-lg leading-relaxed">
               "System intelligence requires human validation to root out noise from truth. Triage incoming signals with maximum precision."
            </p>
         </div>
         <div className="flex bg-slate-50 p-2 rounded-[2rem] border border-slate-100 shadow-inner relative z-10 w-full lg:w-auto overflow-x-auto no-scrollbar">
            {(["new", "priority", "delayed"] as QueueTab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`flex-1 lg:flex-none px-12 py-4 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeSubTab === tab ? 'bg-slate-950 text-white shadow-2xl scale-105' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab} Queue
              </button>
            ))}
         </div>
      </div>

      <div className="min-h-[600px]">
         <AnimatePresence mode="wait">
            <motion.div
              key={activeSubTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
               {renderQueueContent()}
            </motion.div>
         </AnimatePresence>
      </div>
    </div>
  );
}
