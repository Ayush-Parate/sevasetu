import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  AlertTriangle,
  MapPin,
  Clock,
  Mic,
  Camera,
  Upload,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  History,
  Activity,
  User,
  ShieldAlert
} from "lucide-react";
import { useToast } from "../Toast";

export default function ReportsIntakeCenter() {
  const [activeTab, setActiveTab] = useState<"new" | "upload" | "historical">("new");
  const { showToast } = useToast();

  const mockReports = [
    { id: "R-091", title: "Water Logging in Sector 4", category: "Infrastructure", location: "Sector 4 Market", reporter: "Ramesh K.", urgency: "High", time: "10m ago", duplicate: false },
    { id: "R-092", title: "Medical Kit Shortage", category: "Medical", location: "City Hospital Camp", reporter: "Dr. Anita", urgency: "Critical", time: "25m ago", duplicate: false },
    { id: "R-093", title: "Fallen Tree Re-reporting", category: "Infrastructure", location: "MG Road, Block 2", reporter: "Sunil V.", urgency: "Medium", time: "1h ago", duplicate: true },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Reports Intake Center</h2>
          <p className="text-slate-500 text-sm mt-1 opacity-75">Capture and manage field-level community reports directly from the ground.</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
          {[
            { id: "new", label: "New Reports" },
            { id: "upload", label: "Field Survey Upload" },
            { id: "historical", label: "Historical Records" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id ? "bg-brand-green text-white shadow-sm" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "new" && (
          <motion.div key="new" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
            <div className="flex flex-wrap gap-4 items-center mb-6">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" placeholder="Search reports..." className="w-full bg-white border border-slate-100 text-slate-900 pl-12 pr-4 py-3 rounded-2xl focus:ring-2 focus:ring-brand-green/20 outline-none shadow-sm" />
              </div>
              <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-100 text-slate-600 rounded-2xl hover:bg-slate-50 transition-all font-bold text-sm shadow-sm">
                <Filter size={18} /> Filters
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {mockReports.map(report => (
                  <div key={report.id} className="bg-white border border-slate-100 rounded-[2rem] p-8 group hover:shadow-xl hover:shadow-slate-200/50 transition-all">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-2xl ${report.urgency === 'Critical' ? 'bg-rose-50 text-rose-500' : report.urgency === 'High' ? 'bg-brand-orange/10 text-brand-orange' : 'bg-brand-green/10 text-brand-green'}`}>
                          {report.urgency === 'Critical' ? <AlertTriangle size={24} /> : <FileText size={24} />}
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                             <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-green transition-colors">{report.title}</h3>
                             {report.duplicate && <span className="bg-brand-peach text-brand-orange text-[9px] px-2.5 py-1 rounded-lg font-black uppercase tracking-widest">Possible Duplicate</span>}
                          </div>
                          <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                             <span className="flex items-center gap-1.5"><MapPin size={14} className="text-brand-green" /> {report.location}</span>
                             <span className="opacity-30">•</span>
                             <span className="flex items-center gap-1.5"><User size={14} className="text-brand-green" /> {report.reporter}</span>
                             <span className="opacity-30">•</span>
                             <span className="flex items-center gap-1.5"><Clock size={14} className="text-brand-green" /> {report.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl bg-slate-50 text-slate-400 border border-slate-100">
                        {report.id}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-slate-50">
                      <button onClick={() => showToast("Report verified", "success")} className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all">
                        <CheckCircle size={16} /> Verify
                      </button>
                      <button onClick={() => showToast("Task assigned", "success")} className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all">
                        <Activity size={16} /> Assign Action
                      </button>
                      {report.duplicate && (
                        <button onClick={() => showToast("Marked as duplicate", "success")} className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 hover:bg-slate-200 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all">
                           Merge Duplicate
                        </button>
                      )}
                      <button onClick={() => showToast("Escalated to Emergency", "success")} className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ml-auto">
                        <ShieldAlert size={16} /> Escalate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm h-max">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Intake Statistics</h3>
                <div className="space-y-5">
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                     <div className="text-3xl font-bold text-brand-green">124</div>
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Total Reports Today</div>
                  </div>
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                     <div className="text-3xl font-bold text-rose-500">18</div>
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Critical Level Needs</div>
                  </div>
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                     <div className="flex justify-between items-center mb-2">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Auto-Categorization</span>
                       <span className="text-xs font-bold text-brand-green">92%</span>
                     </div>
                     <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                       <div className="h-full bg-brand-green w-[92%]"></div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {activeTab === "upload" && (
          <motion.div key="upload" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl mx-auto space-y-6 pt-10">
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-[3rem] p-16 text-center hover:border-brand-green/50 hover:bg-brand-peach transition-all cursor-pointer group shadow-sm">
              <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 group-hover:bg-white transition-colors">
                <Camera size={40} className="text-slate-400 group-hover:text-brand-green transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Upload Paper Survey</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto mb-8 leading-relaxed opacity-75">Take a photo of physical survey forms. AI will automatically extract and categorize the handwritten constraints.</p>
              <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-brand-green transition-all transform hover:scale-105 shadow-xl shadow-slate-900/10 flex items-center gap-3 mx-auto">
                <Upload size={20} /> Choose File or Capture
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-start gap-6 hover:shadow-lg transition-all group">
                 <div className="p-4 bg-indigo-50 text-indigo-500 rounded-2xl group-hover:bg-indigo-500 group-hover:text-white transition-all">
                   <Mic size={28} />
                 </div>
                 <div>
                   <h4 className="text-lg font-bold text-slate-900 mb-1">Voice Note</h4>
                   <p className="text-sm text-slate-500 mb-4 opacity-75 leading-relaxed">Record quick field observations.</p>
                   <button className="text-[10px] font-black uppercase tracking-widest text-indigo-500 hover:tracking-[0.2em] transition-all">Start Recording →</button>
                 </div>
              </div>
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-start gap-6 hover:shadow-lg transition-all group">
                 <div className="p-4 bg-brand-green/10 text-brand-green rounded-2xl group-hover:bg-brand-green group-hover:text-white transition-all">
                   <FileText size={28} />
                 </div>
                 <div>
                   <h4 className="text-lg font-bold text-slate-900 mb-1">Quick Entry</h4>
                   <p className="text-sm text-slate-500 mb-4 opacity-75 leading-relaxed">Type an emergency note directly.</p>
                   <button className="text-[10px] font-black uppercase tracking-widest text-brand-green hover:tracking-[0.2em] transition-all">Open Form →</button>
                 </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "historical" && (
          <motion.div key="historical" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-[3rem] border border-slate-100 p-16 text-center flex flex-col items-center justify-center min-h-[500px] shadow-sm">
             <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-8">
               <History size={36} className="text-slate-400" />
             </div>
             <h3 className="text-2xl font-bold text-slate-900 mb-3">Historical Records Archive</h3>
             <p className="text-slate-500 text-sm max-w-sm mb-10 leading-relaxed opacity-75 font-medium italic">Review past issues to identify recurring area problems and run pattern analysis for better urban planning.</p>
             <button className="px-10 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all font-bold text-sm shadow-sm tracking-widest uppercase text-[10px] items-center flex gap-2">
               Load Area Archives <Activity size={16} className="text-brand-green" />
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
