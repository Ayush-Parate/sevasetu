import React from "react";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Star, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  ExternalLink,
  Users,
  MapPin,
  TrendingDown
} from "lucide-react";

const ngos = [
  { id: 1, name: "Asha Foundation", trust: 98, impact: "High", focus: "Women Safety", compliance: "100%", status: "Tier 1", verified: true },
  { id: 2, name: "Seva Rural Trust", trust: 94, impact: "High", focus: "Rural Health", compliance: "98%", status: "Tier 1", verified: true },
  { id: 3, name: "Education Plus", trust: 82, impact: "Medium", focus: "Child Literacy", compliance: "92%", status: "Tier 2", verified: true },
  { id: 4, name: "Green Earth NGO", trust: 65, impact: "Low", focus: "Climate Action", compliance: "85%", status: "Under Audit", verified: false },
];

export default function NGOTrustCenter() {
  return (
    <div className="space-y-8 animate-in slide-in-from-left-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-brand-green/10 text-brand-green rounded-lg">
                 <ShieldCheck size={18} />
              </div>
              <span className="text-[10px] font-bold text-brand-green uppercase tracking-[0.2em]">Verified Partner Protocol</span>
           </div>
           <h1 className="text-3xl font-bold tracking-tight text-slate-900 leading-tight">NGO Trust Center</h1>
           <p className="text-slate-500 font-medium leading-relaxed">AI-vetted compliance tracking and historical impact audits of potential partners.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
              <input 
                type="text" 
                placeholder="Search NGO database..." 
                className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-brand-green/20 w-64 shadow-sm"
              />
           </div>
           <button className="p-2.5 bg-white border border-slate-200 text-slate-400 rounded-xl hover:text-slate-900 transition-all shadow-sm">
              <Filter size={18} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         {[
           { label: "Verified Partners", value: "142", trend: "Tier 1", color: "text-brand-green" },
           { label: "Under Surveillance", value: "8", trend: "Locked", color: "text-red-500" },
           { label: "Compliance Pass Rate", value: "94.2%", trend: "Stable", color: "text-blue-500" },
           { label: "Fraud Prevented", value: "$4.2M", trend: "Detected", color: "text-brand-orange" },
         ].map((stat, i) => (
           <div key={i} className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <div className="flex items-end justify-between">
                 <h4 className="text-2xl font-black text-slate-900">{stat.value}</h4>
                 <span className={`text-[10px] font-bold uppercase tracking-widest ${stat.color}`}>{stat.trend}</span>
              </div>
           </div>
         ))}
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-slate-50/50">
                  <tr>
                     <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Partner Identity</th>
                     <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trust Index</th>
                     <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Impact Maturity</th>
                     <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Compliance</th>
                     <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Classification</th>
                     <th className="px-8 py-4"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {ngos.map((ngo) => (
                     <tr key={ngo.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-400 text-xs">
                                 {ngo.name.substring(0, 1)}
                              </div>
                              <div>
                                 <div className="flex items-center gap-1.5">
                                    <span className="text-sm font-bold text-slate-800">{ngo.name}</span>
                                    {ngo.verified && <CheckCircle2 size={12} className="text-brand-green" />}
                                 </div>
                                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{ngo.focus}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-2">
                              <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                                 <div className={`h-full rounded-full ${ngo.trust > 90 ? 'bg-brand-green' : ngo.trust > 70 ? 'bg-brand-orange' : 'bg-red-500'}`} style={{ width: `${ngo.trust}%` }}></div>
                              </div>
                              <span className="text-xs font-black text-slate-900">{ngo.trust}%</span>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${ngo.impact === 'High' ? 'bg-brand-green/10 text-brand-green' : 'bg-slate-100 text-slate-500'}`}>
                              {ngo.impact}
                           </span>
                        </td>
                        <td className="px-8 py-6">
                           <span className="text-xs font-bold text-slate-600">{ngo.compliance}</span>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-2">
                              {ngo.status === 'Under Audit' ? <AlertCircle size={14} className="text-brand-orange" /> : <div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div>}
                              <span className="text-xs font-bold text-slate-700">{ngo.status}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors opacity-0 group-hover:opacity-100">
                              <ExternalLink size={16} />
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="p-8 bg-slate-900 rounded-[32px] text-white">
            <h3 className="text-lg font-bold mb-2">Request Due Diligence</h3>
            <p className="text-white/60 text-xs mb-6 font-medium leading-relaxed">Get a comprehensive 3rd-party background verification report for any NGO on the platform.</p>
            <div className="space-y-4">
               <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center"><FileText size={16} /></div>
                  <div className="flex-1 text-[11px] font-medium text-white/80">Select NGO from list...</div>
               </div>
               <button className="w-full py-3 bg-brand-green text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-green/20 hover:brightness-110">Generate Deep-Audit Report</button>
            </div>
         </div>
         
         <div className="p-8 bg-brand-peach/20 rounded-[32px] border border-brand-peach/50 flex items-center gap-8 relative overflow-hidden">
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-brand-orange/10 rounded-full blur-3xl"></div>
            <div className="shrink-0 w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-brand-orange shadow-lg shadow-brand-orange/10">
               <TrendingDown size={32} />
            </div>
            <div>
               <h3 className="text-lg font-bold text-slate-900 mb-1">Fraud Detection Live</h3>
               <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-xs mb-4">Our AI patterns detected attempted duplicate beneficiary reports from a candidate NGO last night. Threat neutralized.</p>
               <button className="text-[10px] font-black text-brand-orange uppercase tracking-[0.2em] hover:underline">View Forensic Logs</button>
            </div>
         </div>
      </div>
    </div>
  );
}
