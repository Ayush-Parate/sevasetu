import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  AlertTriangle, 
  ShieldAlert, 
  Zap, 
  MapPin, 
  Clock, 
  User, 
  Radio, 
  Bell, 
  ShieldCheck, 
  Building2, 
  Users,
  Activity,
  PhoneCall,
  Camera
} from "lucide-react";
import { useToast } from "../Toast";

type EmergencyTab = "red_alert" | "incidents";

const RED_ALERTS = [
  { id: "SOS-101", title: "Active Fire reported in Market Sector", severity: 98, deadline: "5m remaining", reporter: "Automated Sensor Node", location: "Sector 4 Market" },
  { id: "SOS-102", title: "Medical Emergency: Multi-Casualty Hub", severity: 92, deadline: "8m remaining", reporter: "Field Unit Beta", location: "Railway Xing Hub" },
];

const INCIDENTS = [
  { id: "INC-99", title: "Sustained Flooding - Ward 2", type: "Natural Disaster", severity: "High", impacted: "120 Families", status: "Critical" },
  { id: "INC-88", title: "Missing Child: Age 6 (Blue Jacket)", type: "Child Protection", severity: "Critical", impacted: "1 Subject", status: "Active" },
];

export default function EmergencyValidation() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<EmergencyTab>("red_alert");

  const renderContent = () => {
    switch (activeTab) {
      case "red_alert":
        return (
          <div className="space-y-8">
            {RED_ALERTS.map((alert) => (
              <div key={alert.id} className="bg-slate-950 p-12 rounded-[4.5rem] border border-rose-500/20 shadow-2xl relative overflow-hidden group">
                 <div className="absolute right-0 top-0 p-20 opacity-5 rotate-12 -translate-y-6 group-hover:scale-125 transition-transform duration-[10s]">
                    <ShieldAlert size={200} className="text-rose-500" />
                 </div>
                 <div className="relative z-10 flex flex-col xl:flex-row justify-between items-center gap-12">
                    <div className="space-y-6 flex-1">
                       <div className="flex items-center gap-4 justify-center xl:justify-start">
                          <span className="px-5 py-2 bg-rose-500 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full animate-pulse">Critical Red Alert</span>
                          <span className="text-[10px] font-bold text-slate-500 tracking-widest">{alert.id}</span>
                       </div>
                       <h3 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">{alert.title}</h3>
                       <div className="flex flex-wrap gap-8 text-sm font-bold text-slate-400 italic font-serif">
                          <div className="flex items-center gap-2"><MapPin size={18} className="text-rose-500" /> {alert.location}</div>
                          <div className="flex items-center gap-2"><Clock size={18} className="text-rose-500 underline underline-offset-4 decoration-rose-500/30" /> SLA: {alert.deadline}</div>
                          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl text-brand-green border border-white/10 shadow-inner">Severity Score: {alert.severity}</div>
                       </div>
                    </div>
                    <div className="flex gap-4 w-full xl:w-auto">
                       <button onClick={() => showToast("INSTANT APPROVAL CONCLUDED. Response units deployed.", "success")} className="flex-1 xl:px-12 py-6 bg-brand-green text-white rounded-[2rem] font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-brand-green/20 hover:brightness-110 transition-all active:scale-95">Instant Approve</button>
                       <button onClick={() => showToast("Emergency Field Scout dispatched to geo-coordinates.", "info")} className="flex-1 xl:px-12 py-6 bg-white/5 text-white border border-white/10 rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all">Emergency Field Check</button>
                       <button onClick={() => showToast("Escalated to Global Emergency Command Node.", "error")} className="p-6 bg-rose-900/20 text-rose-500 rounded-3xl hover:bg-rose-500 hover:text-white transition-all shadow-xl"><Zap size={24} /></button>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        );
      case "incidents":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {INCIDENTS.map((inc) => (
              <div key={inc.id} className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden">
                 <div className="absolute right-0 top-0 p-10 opacity-5 -translate-y-4 text-slate-200">
                    <Activity size={120} />
                 </div>
                 <div className="space-y-8 relative z-10">
                    <div className="flex justify-between items-start">
                       <div className="space-y-2">
                          <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full inline-block">{inc.type}</div>
                          <h4 className="text-2xl font-black text-slate-900 tracking-tight">{inc.title}</h4>
                       </div>
                       <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-slate-400 group-hover:bg-rose-50 group-hover:text-rose-500 transition-all shadow-inner">
                          {inc.type.includes('Child') ? <Users size={28} /> : <Building2 size={28} />}
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-5 bg-slate-50 rounded-2xl border border-slate-50 space-y-1">
                          <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Impacted Nodes</div>
                          <div className="text-xl font-bold text-slate-900">{inc.impacted}</div>
                       </div>
                       <div className="p-5 bg-slate-50 rounded-2xl border border-slate-50 space-y-1">
                          <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Incident Status</div>
                          <div className="text-xl font-bold text-rose-500 italic">{inc.status}</div>
                       </div>
                    </div>

                    <div className="pt-6 space-y-4">
                       <button onClick={() => showToast(`CRISIS PROTOCOL ${inc.id} ACTIVATED. Synchronizing NGO resources.`, "error")} className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-rose-600 transition-all active:scale-95 flex items-center justify-center gap-3">
                          <ShieldAlert size={18} /> Activate Crisis Protocol
                       </button>
                       <button onClick={() => showToast("Regional NGO Admins notified via high-priority push.", "info")} className="w-full py-5 border-2 border-slate-100 text-slate-400 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] hover:border-slate-900 hover:text-slate-900 transition-all flex items-center justify-center gap-2">
                          Notify NGO Admin <PhoneCall size={16} />
                       </button>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-top-10 duration-1000">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-white p-12 rounded-[4.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
         <div className="absolute left-0 top-0 p-20 opacity-[0.03] pointer-events-none rotate-45 text-rose-500">
            <Radio size={300} />
         </div>
         <div className="space-y-3 relative z-10 max-w-2xl text-center lg:text-left">
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Emergency Command Hub</h1>
            <p className="text-slate-500 text-lg font-medium italic opacity-80 font-serif leading-relaxed">
               "When human lives are on the line, verification latency must hit zero. Deploy high-trust protocols for critical regional incidents."
            </p>
         </div>
         <div className="flex bg-slate-50 p-2 rounded-[2.5rem] border border-slate-100 shadow-inner relative z-10 w-full lg:w-auto">
            {(["red_alert", "incidents"] as EmergencyTab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 lg:flex-none px-12 py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-rose-500 text-white shadow-2xl scale-105' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab.replace('_', ' ')}
              </button>
            ))}
         </div>
      </div>

      <div className="min-h-[500px]">
         <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
               {renderContent()}
            </motion.div>
         </AnimatePresence>
      </div>
    </div>
  );
}
