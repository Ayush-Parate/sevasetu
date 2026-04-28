import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileText, 
  Image as ImageIcon, 
  Mic, 
  File, 
  Table, 
  Keyboard, 
  Scan, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  X,
  Camera,
  Layers,
  ArrowRight
} from "lucide-react";
import { useToast } from "./Toast";

type InputType = "TEXT" | "IMAGE" | "SCAN" | "AUDIO" | "PDF" | "CSV" | "FORM";

const INPUT_CONFIG = [
  { type: "FORM", label: "Manual Form", desc: "Structured data entry", icon: Keyboard, color: "bg-brand-green" },
  { type: "TEXT", label: "Quick Text", desc: "Direct report entry", icon: FileText, color: "bg-blue-500" },
  { type: "IMAGE", label: "Photo Evidence", desc: "Live site photos", icon: ImageIcon, color: "bg-amber-500" },
  { type: "SCAN", label: "Paper Scan", desc: "Extract from documents", icon: Scan, color: "bg-indigo-500" },
  { type: "AUDIO", label: "Voice Note", desc: "Record field signals", icon: Mic, color: "bg-rose-500" },
  { type: "PDF", label: "PDF Report", desc: "Official documentation", icon: File, color: "bg-slate-700" },
  { type: "CSV", label: "Bulk CSV", desc: "Multi-record import", icon: Table, color: "bg-emerald-600" },
];

export default function ReportSubmission() {
  const { showToast } = useToast();
  const [selectedType, setSelectedType] = useState<InputType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate Processing (Classification & Urgency Engines)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      showToast("Need Intelligence Graph updated. Resource routed.", "success");
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center text-center p-12 bg-white rounded-[4rem] shadow-sm border border-slate-100">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-brand-green text-white rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-brand-green/20"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase mb-4">Transmission Successful</h2>
        <p className="text-slate-500 font-medium italic max-w-sm mb-10 leading-relaxed font-serif">
          Our classification engine has categorized this as <span className="text-brand-green font-bold">DRINKING WATER SCARCITY</span> with an urgency score of <span className="text-brand-green font-bold">8.4/10</span>.
        </p>
        <button 
          onClick={() => { setIsSuccess(false); setSelectedType(null); }}
          className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-brand-green transition-all"
        >
          Submit Another Report
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 border-b border-slate-50 pb-10">
         <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">Community Data Collection</h2>
            <p className="text-slate-500 font-medium italic opacity-75 leading-relaxed font-serif max-w-xl">
               Digitalizing ground reality. Supports multiple formats to bridge the rural-digital divide across India.
            </p>
         </div>
         <div className="flex bg-slate-100 p-1.5 rounded-2xl shadow-inner shrink-0">
            <div className="px-6 py-2 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">Real-time Intake</div>
         </div>
      </div>

      {!selectedType ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {INPUT_CONFIG.map((item) => (
             <motion.button
               key={item.type}
               whileHover={{ y: -8, scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               onClick={() => setSelectedType(item.type as InputType)}
               className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer group text-left relative overflow-hidden"
             >
                <div className={`w-16 h-16 ${item.color} text-white rounded-2xl flex items-center justify-center mb-10 group-hover:rotate-12 transition-transform shadow-lg`}>
                   <item.icon size={28} />
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-2 uppercase italic">{item.label}</h3>
                <p className="text-[10px] font-bold text-slate-400 italic uppercase tracking-wider">{item.desc}</p>
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all">
                  <ArrowRight size={20} className="text-slate-300" />
                </div>
             </motion.button>
           ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-12 rounded-[4.5rem] border border-slate-100 shadow-2xl relative overflow-hidden max-w-3xl mx-auto w-full"
        >
          <button 
            onClick={() => setSelectedType(null)}
            className="absolute top-10 right-10 p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-rose-500 transition-all"
          >
            <X size={20} />
          </button>

          <form onSubmit={handleSubmit} className="space-y-10">
             <div className="flex items-center gap-6 mb-12">
                <div className={`w-14 h-14 ${INPUT_CONFIG.find(c => c.type === selectedType)?.color} text-white rounded-2xl flex items-center justify-center`}>
                  {React.createElement(INPUT_CONFIG.find(c => c.type === selectedType)?.icon || FileText, { size: 24 })}
                </div>
                <div>
                   <h3 className="text-2xl font-black italic tracking-tighter uppercase text-slate-900">{selectedType} Submission</h3>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Processing Node: AI Intake Sector 4</span>
                </div>
             </div>

             <div className="space-y-8">
                {selectedType === "FORM" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Name / Reporter</label>
                        <input required type="text" className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-sm font-medium italic focus:ring-2 focus:ring-brand-green/20" placeholder="e.g. S. Kumar" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Phone Number</label>
                        <input required type="tel" className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-sm font-medium italic focus:ring-2 focus:ring-brand-green/20" placeholder="+91 0000 0000" />
                     </div>
                     <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Need Category</label>
                        <select className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-sm font-medium italic focus:ring-2 focus:ring-brand-green/20 appearance-none">
                           <option>Food Scarcity</option>
                           <option>Water Connection Issue</option>
                           <option>Emergency Health Event</option>
                           <option>Women Safety / Harassment</option>
                           <option>Transport Link Broken</option>
                           <option>Sanitation/Waste Pileup</option>
                        </select>
                     </div>
                     <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Description of Incident</label>
                        <textarea required className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm font-medium italic focus:ring-2 focus:ring-brand-green/20 min-h-[150px]" placeholder="Provide details about the issue..."></textarea>
                     </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] text-center space-y-6 hover:border-brand-green hover:bg-brand-green/5 transition-all cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
                     <input type="file" ref={fileInputRef} className="hidden" />
                     <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-400 group-hover:text-brand-green shadow-sm group-hover:scale-110 transition-transform">
                        {selectedType === "AUDIO" ? <Mic size={32} /> : <Upload size={32} />}
                     </div>
                     <div className="space-y-2">
                        <p className="text-lg font-bold text-slate-900 tracking-tight italic">Drag & Drop {selectedType} File</p>
                        <p className="text-xs text-slate-400 font-medium italic font-serif">Maximum file size: 25MB • Secure PII encryption active</p>
                     </div>
                  </div>
                )}
             </div>

             <div className="pt-8 border-t border-slate-50 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-3 text-amber-500">
                   <AlertCircle size={18} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Urgency Verification: Pending</span>
                </div>
                <button 
                  disabled={isSubmitting}
                  className={`px-12 py-5 rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-2xl transition-all transform active:scale-95 flex items-center gap-4 ${isSubmitting ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-brand-green shadow-brand-green/20'}`}
                >
                   {isSubmitting ? (
                     <>
                        <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                        Categorizing Need...
                     </>
                   ) : (
                     <>
                        Transmit to OS <ArrowRight size={18} />
                     </>
                   )}
                </button>
             </div>
          </form>
        </motion.div>
      )}

      {/* Module 2 & 3: Intelligence Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 opacity-75">
         <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white space-y-6">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-brand-green">
                  <Layers size={22} />
               </div>
               <h4 className="text-xl font-black italic tracking-tighter uppercase">Classification Engine</h4>
            </div>
            <p className="text-slate-400 text-xs font-medium italic font-serif leading-relaxed">
               "Automatically segmenting raw community data into 12+ categories using natural language processing and visual anomaly detection."
            </p>
         </div>
         <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white space-y-6">
            <div className="flex items-center gap-4 text-rose-500">
               <Camera size={22} />
               <h4 className="text-xl font-black italic tracking-tighter uppercase text-white">Urgency Scorer</h4>
            </div>
            <p className="text-slate-400 text-xs font-medium italic font-serif leading-relaxed">
               "Ranking reports by repeat frequency, vulnerability density, and time-sensitivity to ensure critical intervention readiness."
            </p>
         </div>
      </div>
    </div>
  );
}
