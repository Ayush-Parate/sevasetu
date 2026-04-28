import React from "react";
import { motion } from "motion/react";
import { 
  Handshake, 
  RefreshCw, 
  PieChart, 
  MapPin, 
  ArrowUpRight,
  ChevronRight,
  Star,
  Users,
  ShieldCheck,
  Calendar
} from "lucide-react";

const partnerships = [
  {
    id: 1,
    ngo: "Asha Foundation",
    focus: "Women Empowerment",
    duration: "2 Years",
    status: "Review Due",
    risk: "Low",
    impact: "12,400 beneficiaries",
    score: 4.8,
    expiry: "In 45 Days"
  },
  {
    id: 2,
    ngo: "Water Relief",
    focus: "Rural Infrastructure",
    duration: "1 Year",
    status: "Active",
    risk: "Moderate",
    impact: "8,500 beneficiaries",
    score: 4.5,
    expiry: "In 210 Days"
  }
];

export default function PartnershipCenter() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-slate-900 leading-tight">Partnership & Renewal</h1>
           <p className="text-slate-500 font-medium">Strategic long-term collaboration and contract management.</p>
        </div>
        <button className="px-6 py-3 bg-brand-green text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-green/20 hover:brightness-110 transition-all flex items-center gap-2">
           <Handshake size={16} /> New Strategic Alliance
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Strategic Relationship Tracker */}
         <div className="lg:col-span-8 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Active Relationships</h2>
            
            <div className="grid grid-cols-1 gap-4">
               {partnerships.map((partner) => (
                 <div key={partner.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-8 group hover:border-brand-green transition-all">
                    <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0">
                       <img src={`https://ui-avatars.com/api/?name=${partner.ngo}&background=random&size=100`} alt={partner.ngo} className="rounded-xl" />
                    </div>
                    
                    <div className="flex-1 space-y-1">
                       <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold text-slate-800">{partner.ngo}</h3>
                          <div className="flex items-center gap-1 text-brand-orange">
                             <Star size={14} fill="currentColor" />
                             <span className="text-xs font-bold">{partner.score}</span>
                          </div>
                       </div>
                       <p className="text-xs text-slate-500 font-medium">{partner.focus} • Established since 2024</p>
                       <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                             <Users size={12} /> {partner.impact}
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                             <ShieldCheck size={12} /> {partner.risk} Risk
                          </div>
                       </div>
                    </div>

                    <div className="w-full md:w-auto text-right space-y-3">
                       <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Renewal</p>
                          <p className="text-sm font-black text-slate-800 mt-1">{partner.expiry}</p>
                       </div>
                       <button className={`w-full md:w-auto px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                         partner.status === 'Review Due' 
                            ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20' 
                            : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                       }`}>
                          {partner.status === 'Review Due' ? 'Initiate Renewal' : 'View Impact Report'}
                       </button>
                    </div>
                 </div>
               ))}
            </div>

            <div className="p-8 bg-slate-900 rounded-[32px] text-white relative overflow-hidden group mt-12">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                  <PieChart size={120} />
               </div>
               <h3 className="text-xl font-bold mb-4">CSR Allocation Optimization</h3>
               <p className="text-white/60 text-sm mb-8 max-w-md">Our AI analysis suggests re-allocating 15% of your education funds to health initiatives in West Bengal where the impact-per-dollar is currently 2.4x higher.</p>
               <button className="flex items-center gap-2 text-xs font-bold text-brand-green uppercase tracking-widest hover:underline">View Re-allocation Proposal <ChevronRight size={14} /></button>
            </div>
         </div>

         {/* Stats and Reminders */}
         <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
               <h2 className="text-lg font-bold text-slate-900 mb-6 uppercase tracking-tight">Key Milestones</h2>
               <div className="space-y-6">
                  {[
                    { label: "Annual Impact Audit", date: "June 12", type: "Mandatory" },
                    { label: "Quarterly Review (Udaan)", date: "May 24", type: "Strategy" },
                    { label: "CSR-1 Filing Deadline", date: "April 30", type: "Legal" },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                       <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                          <Calendar size={18} className="text-slate-400" />
                       </div>
                       <div>
                          <h4 className="text-sm font-bold text-slate-800 leading-tight">{item.label}</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">{item.date} • <span className="text-brand-green font-bold">{item.type}</span></p>
                       </div>
                    </div>
                  ))}
               </div>
               <button className="w-full py-3 mt-8 border border-slate-100 rounded-xl text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:bg-slate-50 transition-colors">Sync to Calendar</button>
            </div>

            <div className="bg-brand-peach/30 p-8 rounded-[32px] border border-brand-peach flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-orange shadow-lg shadow-brand-orange/10 mb-6">
                  <RefreshCw size={24} />
               </div>
               <h3 className="text-lg font-bold text-slate-900 mb-2">Auto-Renewal Strategy</h3>
               <p className="text-xs text-slate-500 mb-6 font-medium leading-relaxed">Enable smart-renewals to maintain continuous funding for high-performance NGO partners.</p>
               <div className="w-full bg-white rounded-2xl p-4 flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Status</span>
                  <div className="w-10 h-5 bg-slate-200 rounded-full relative p-1 cursor-pointer">
                     <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
