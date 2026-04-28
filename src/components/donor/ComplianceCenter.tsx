import React from "react";
import { motion } from "motion/react";
import { 
  FileCheck, 
  Download, 
  ShieldCheck, 
  Clock, 
  ChevronRight,
  ExternalLink,
  FileText,
  BadgeCheck,
  AlertCircle
} from "lucide-react";

const certificates = [
  { name: "CSR-1 Registration", id: "CSR1-2026-00412", date: "Jan 12, 2026", status: "Active" },
  { name: "80G Tax Exemption", id: "80G-E-092-2024", date: "March 24, 2024", status: "Active" },
  { name: "12A Certificate", id: "12A-IT-4912-X", date: "April 05, 2024", status: "Active" },
  { name: "FCRA Compliance", id: "FCRA-921-2025", date: "Sept 18, 2025", status: "Renewing" },
];

const reports = [
  { name: "Annual Impact Audit 2025", pages: 42, format: "PDF", size: "4.2 MB", type: "Comprehensive" },
  { name: "Quarterly Financial Transparency Report", pages: 12, format: "PDF", size: "1.5 MB", type: "Financial" },
  { name: "Beneficiary Verification Summary", pages: 28, format: "XLSX", size: "850 KB", type: "Data" },
];

export default function ComplianceCenter() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
       <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Compliance & Governance</h1>
          <p className="text-slate-500 font-medium">Verified legal documentation and audit-ready reports for your regulatory filings.</p>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Statutory Documents */}
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <ShieldCheck size={18} />
                   </div>
                   <h2 className="text-xl font-bold tracking-tight text-slate-900">Legal Certifications</h2>
                </div>
                <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">Download Vault (ZIP)</button>
             </div>

             <div className="space-y-3">
                {certificates.map((cert) => (
                  <div key={cert.id} className="p-5 bg-slate-50 rounded-2xl flex items-center justify-between hover:bg-slate-100 transition-all group">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-300">
                           <FileCheck size={20} />
                        </div>
                        <div>
                           <h4 className="text-sm font-bold text-slate-800">{cert.name}</h4>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{cert.id}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${cert.status === 'Active' ? 'bg-brand-green/10 text-brand-green' : 'bg-brand-orange/10 text-brand-orange'}`}>
                           {cert.status}
                        </span>
                        <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                           <Download size={16} />
                        </button>
                     </div>
                  </div>
                ))}
             </div>

             <div className="mt-8 p-4 bg-blue-50/50 rounded-2xl flex gap-3 border border-blue-100">
                <AlertCircle className="text-blue-500 shrink-0" size={18} />
                <p className="text-xs text-blue-700 leading-relaxed">
                   SevaSetu maintains an automated compliance monitor. All NGO partners listed on the dashboard go through <strong>12-layer statutory verification</strong> before being allowed to receive funding.
                </p>
             </div>
          </div>

          {/* Audit Reports */}
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-brand-peach text-brand-orange rounded-lg">
                      <FileText size={18} />
                   </div>
                   <h2 className="text-xl font-bold tracking-tight text-slate-900">Audit Reports</h2>
                </div>
                <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">Request Custom Audit</button>
             </div>

             <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.name} className="relative group p-6 border border-slate-100 rounded-2xl hover:border-brand-green hover:shadow-xl hover:shadow-brand-green/5 transition-all">
                     <div className="flex items-center justify-between mb-4">
                        <span className="px-2 py-1 bg-slate-100 text-[10px] font-bold text-slate-500 rounded uppercase tracking-wider">{report.type} Audit</span>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                           <Clock size={10} /> Published 2w ago
                        </div>
                     </div>
                     <h4 className="text-base font-bold text-slate-900 mb-2 leading-tight">{report.name}</h4>
                     <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400">
                           <span className="flex items-center gap-1"><FileText size={12} /> {report.pages} Pages</span>
                           <span className="flex items-center gap-1 uppercase">{report.format} • {report.size}</span>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all opacity-0 group-hover:opacity-100">
                           <Download size={14} /> Download
                        </button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
       </div>

       {/* Trust Banner */}
       <div className="p-12 bg-white rounded-[40px] border border-slate-100 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
          <div className="shrink-0 relative">
             <div className="w-24 h-24 bg-brand-green rounded-3xl rotate-12 flex items-center justify-center text-white shadow-2xl shadow-brand-green/20">
                <BadgeCheck size={48} />
             </div>
          </div>
          <div>
             <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-4 leading-tight">Zero-Leakage Guarantee</h2>
             <p className="text-slate-500 font-medium leading-relaxed max-w-2xl mb-8">
                Our smart contracts and verification algorithms ensure that every single resource unit deployed reaches the intended beneficiary. We provide full reconciliation at the end of every quarter.
             </p>
             <button className="flex items-center gap-2 text-sm font-bold text-brand-green hover:underline">
                View Governance Framework <ExternalLink size={14} />
             </button>
          </div>
       </div>
    </div>
  );
}
