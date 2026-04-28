import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldAlert, 
  Search, 
  UserX, 
  Building2, 
  AlertTriangle, 
  History, 
  MoreVertical, 
  ArrowRight,
  UserCheck,
  Ban,
  Activity,
  Fingerprint,
  Zap,
  Target,
  FileWarning,
  Eye,
  Flag
} from "lucide-react";
import { useToast } from "../Toast";

type FraudTab = "reports" | "volunteers" | "ngos";

const SUSPICIOUS_REPORTS = [
  { id: "SUS-001", title: "False Urgency: 500 Casualties", reason: "AI Flag: Impossible Scenarios", reporter: "Node-X99", timestamp: "1h ago" },
  { id: "SUS-002", title: "Spam Submission: Multiple Ward 2", reason: "Bulk Origin: Lat 28.5, Lon 77.1", reporter: "Unauth API", timestamp: "3h ago" },
];

const VOLUNTEER_FRAUD = [
  { id: "V-FRAUD-42", name: "Rahul Singh", reason: "Fake Completion Proof", trustBefore: 940, pattern: "Repeated GPS-Spoofing", status: "Under Review" },
  { id: "V-FRAUD-12", name: "Arjun S.", reason: "False Attendance Claim", trustBefore: 810, pattern: "Out of Station Geo-Tag", status: "Suspicious" },
];

const NGO_ALERTS = [
  { id: "NGO-W-01", name: "Relief India Cluster", reason: "Abnormal reporting frequency", activity: "300 Reports in 10min", status: "Compliance Review" },
];

export default function FraudInvestigation() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<FraudTab>("reports");

  const renderContent = () => {
    switch (activeTab) {
      case "reports":
        return (
          <div className="space-y-6">
            {SUSPICIOUS_REPORTS.map((rep) => (
              <div key={rep.id} className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all flex flex-col md:flex-row justify-between items-center gap-10 group relative overflow-hidden">
                 <div className="absolute left-0 top-0 w-2 h-full bg-rose-500"></div>
                 <div className="flex items-center gap-8">
                    <div className="w-20 h-20 bg-rose-50 rounded-[2.5rem] flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform shadow-inner">
                       <ShieldAlert size={32} />
                    </div>
                    <div className="space-y-2">
                       <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">{rep.id} Deep Audit</span>
                          <div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
                          <span className="text-[10px] font-bold text-slate-400 italic">{rep.timestamp}</span>
                       </div>
                       <h4 className="text-2xl font-black text-slate-900 tracking-tight">{rep.title}</h4>
                       <p className="text-[11px] font-bold text-slate-400 flex items-center gap-2 italic"><Flag size={14} className="text-rose-500" /> REASON: {rep.reason}</p>
                    </div>
                 </div>
                 <div className="flex gap-4 w-full md:w-auto">
                    <button onClick={() => showToast("Opening Forensic Intelligence Suite...", "info")} className="flex-1 md:flex-none px-10 py-5 bg-slate-950 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-brand-green transition-all shadow-xl active:scale-95 flex items-center gap-3">
                       <Eye size={18} /> Investigate
                    </button>
                    <button onClick={() => showToast("Report rejected. System security nodes updated.", "error")} className="flex-1 md:flex-none px-10 py-5 bg-slate-50 text-slate-400 rounded-[2rem] border border-slate-200 font-black uppercase tracking-widest text-[10px] hover:bg-rose-500 hover:text-white transition-all">Reject</button>
                    <button onClick={() => showToast("Reporter UUID blacklisted across all nodes.", "error")} className="p-5 bg-rose-50 text-rose-500 rounded-3xl hover:bg-rose-600 hover:text-white transition-all shadow-xl"><Ban size={24} /></button>
                 </div>
              </div>
            ))}
          </div>
        );
      case "volunteers":
        return (
          <div className="space-y-6">
            {VOLUNTEER_FRAUD.map((vol) => (
              <div key={vol.id} className="bg-slate-950 p-12 rounded-[4.5rem] text-white border border-rose-500/10 shadow-2xl relative overflow-hidden group">
                 <div className="absolute right-0 top-0 p-20 opacity-5 rotate-12 -translate-y-6 group-hover:rotate-45 transition-transform duration-[10s] pointer-events-none">
                    <UserX size={150} className="text-rose-500" />
                 </div>
                 <div className="relative z-10 flex flex-col xl:flex-row justify-between items-center gap-12">
                    <div className="space-y-6 flex-1">
                       <div className="flex items-center gap-4">
                          <span className="px-5 py-2 bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full">{vol.status}</span>
                          <span className="text-[11px] font-bold text-slate-500 italic tracking-widest uppercase">Node: {vol.id}</span>
                       </div>
                       <h3 className="text-4xl font-black italic tracking-tighter uppercase leading-none">{vol.name}</h3>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                          <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] space-y-2">
                             <div className="text-[9px] font-black tracking-widest text-slate-500 uppercase">Fraud Vector</div>
                             <div className="text-sm font-bold text-rose-400 italic">{vol.reason}</div>
                          </div>
                          <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] space-y-2">
                             <div className="text-[9px] font-black tracking-widest text-slate-500 uppercase">Detection Pattern</div>
                             <div className="text-sm font-bold text-slate-300 italic">{vol.pattern}</div>
                          </div>
                       </div>
                    </div>
                    <div className="flex flex-wrap gap-4 w-full xl:w-auto">
                       <button onClick={() => showToast("Reputation reduction executed. New Score: 400.", "warning")} className="flex-1 xl:px-10 py-6 bg-white/5 border border-white/10 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-rose-500 transition-all flex items-center justify-center gap-3">
                          <Target size={20} /> Reduce Trust
                       </button>
                       <button onClick={() => showToast("Volunteer tokens revoked. Suspension active.", "error")} className="flex-1 xl:px-10 py-6 bg-rose-500 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-rose-900/20 hover:brightness-110 active:scale-95 transition-all">Suspend Volunteer</button>
                       <button onClick={() => showToast("Deep forensic audit initialized for this node.", "info")} className="p-6 bg-slate-900 rounded-3xl border border-white/10 hover:bg-brand-green transition-all shadow-xl"><Zap size={24} /></button>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        );
      case "ngos":
        return (
          <div className="space-y-8">
            <div className="bg-brand-green text-white p-16 rounded-[4.5rem] shadow-2xl relative overflow-hidden group">
               <div className="absolute right-0 top-0 p-20 opacity-10 rotate-12 -translate-y-8 group-hover:scale-125 transition-transform duration-[7s]">
                  <Building2 size={300} />
               </div>
               <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12 text-center lg:text-left">
                  <div className="space-y-6 max-w-2xl">
                     <h2 className="text-5xl font-black tracking-tighter uppercase italic leading-none">NGO Integrity Auditing</h2>
                     <p className="text-brand-green-50 text-lg font-medium italic opacity-80 leading-relaxed font-serif">
                        "Detecting systematic abuse, phantom reporting, and abnormal cluster spikes in NGO node activity. Escalate high-risk orgs to super-admin instantly."
                     </p>
                  </div>
                  <div className="bg-white/10 p-12 rounded-[3.5rem] border border-white/20 shadow-inner">
                     <div className="text-7xl font-black tracking-tighter italic">01</div>
                     <div className="text-[10px] font-black uppercase tracking-widest text-brand-green-100 mt-2">Org Anomalies Detected</div>
                  </div>
               </div>
            </div>

            {NGO_ALERTS.map((ngo) => (
              <div key={ngo.id} className="bg-white p-12 rounded-[4rem] border-2 border-rose-100 shadow-sm hover:shadow-2xl transition-all flex flex-col xl:flex-row justify-between items-center gap-10 group relative">
                 <div className="flex items-center gap-10">
                    <div className="w-24 h-24 bg-slate-50 rounded-[3rem] flex items-center justify-center text-slate-400 group-hover:bg-rose-50 group-hover:text-rose-500 transition-all shadow-inner">
                       <Fingerprint size={48} />
                    </div>
                    <div className="space-y-4">
                       <div className="flex items-center gap-4">
                          <span className="px-5 py-2 bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-widest rounded-full animate-pulse">{ngo.status}</span>
                          <span className="text-[11px] font-bold text-slate-400 italic uppercase tracking-widest">{ngo.id}</span>
                       </div>
                       <h3 className="text-4xl font-black text-slate-900 tracking-tighter leading-none italic">{ngo.name}</h3>
                       <div className="flex items-center gap-6 text-[11px] font-bold italic text-slate-500 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-50">
                          <Activity size={18} className="text-rose-500" /> ACTIVITY SPIKE: <span className="text-rose-600 font-black ml-2 underline underline-offset-4 decoration-rose-200">{ngo.activity}</span>
                       </div>
                    </div>
                 </div>
                 <div className="flex flex-col sm:flex-row gap-6 w-full xl:w-auto">
                    <button onClick={() => showToast("Initializing mandatory compliance review for this organization.", "info")} className="flex-1 xl:px-14 py-7 bg-slate-950 text-white rounded-[2rem] font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-brand-green transition-all transform active:scale-95 flex items-center justify-center gap-4">
                       <FileWarning size={22} /> Compliance Review
                    </button>
                    <button onClick={() => showToast("CRITICAL ESCALATION: Super Admin notified. Org tokens frozen.", "error")} className="flex-1 xl:px-14 py-7 bg-rose-100 text-rose-600 border-2 border-rose-200 rounded-[2rem] font-black uppercase tracking-widest text-[11px] hover:bg-rose-500 hover:text-white transition-all shadow-xl shadow-rose-900/10">Escalate to Super Admin</button>
                 </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 bg-white p-12 rounded-[4.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
         <div className="absolute right-0 bottom-0 p-20 opacity-[0.03] text-rose-500 -rotate-12 pointer-events-none">
            <Zap size={300} />
         </div>
         <div className="space-y-3 relative z-10">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">Fraud Investigation Hub</h1>
            <p className="text-slate-500 font-medium italic mt-1 opacity-75 font-serif max-w-xl leading-relaxed">
               "Systemically eradicating deception from the trust network. We audit reporter patterns, volunteer authenticity, and organizational compliance."
            </p>
         </div>
         <div className="flex bg-slate-50 p-2 rounded-[2.5rem] border border-slate-100 shadow-inner relative z-10 w-full lg:w-auto overflow-x-auto no-scrollbar">
            {(["reports", "volunteers", "ngos"] as FraudTab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 lg:flex-none px-12 py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-slate-950 text-white shadow-2xl scale-105' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab === 'reports' ? 'Suspicious Reports' : tab === 'volunteers' ? 'Volunteer Fraud' : 'NGO Misuse'}
              </button>
            ))}
         </div>
      </div>

      <div className="min-h-[600px]">
         <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
               {renderContent()}
            </motion.div>
         </AnimatePresence>
      </div>
    </div>
  );
}
