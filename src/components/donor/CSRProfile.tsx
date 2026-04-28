import React from "react";
import { motion } from "motion/react";
import { 
  Building2, 
  MapPin, 
  Target, 
  Heart, 
  Bell, 
  Lock, 
  ChevronRight,
  Globe,
  Briefcase
} from "lucide-react";

export default function CSRProfile() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-8 mb-12 pb-12 border-b border-slate-100">
         <div className="w-24 h-24 rounded-[32px] bg-brand-peach text-brand-orange flex items-center justify-center text-3xl font-black shadow-xl shadow-brand-orange/10 relative overflow-hidden">
            <img src="https://i.pravatar.cc/200?u=techcsr" alt="CSR Profile" className="w-full h-full object-cover" />
         </div>
         <div>
            <div className="flex items-center gap-3 mb-1">
               <h1 className="text-3xl font-bold tracking-tight text-slate-900">Global Tech CSR</h1>
               <span className="px-3 py-1 bg-brand-green/10 text-brand-green rounded-full text-[10px] font-black uppercase tracking-widest">Enterprise Plus</span>
            </div>
            <p className="text-slate-500 font-medium flex items-center gap-2">
               <Building2 size={16} /> Technology Sector • <MapPin size={16} /> San Jose, CA
            </p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {/* Focus Areas */}
         <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-peach text-brand-orange rounded-lg">
                     <Target size={18} />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900">CSR Focus Areas</h2>
               </div>
               <button className="text-[10px] font-bold text-brand-green uppercase tracking-widest hover:underline">Edit Focus</button>
            </div>
            
            <div className="flex flex-wrap gap-2">
               {["Digital Literacy", "Women in Tech", "Rural Education", "Health Innovation"].map((tag) => (
                 <span key={tag} className="px-4 py-2 bg-slate-50 rounded-xl text-xs font-bold text-slate-600 border border-slate-100">
                    {tag}
                 </span>
               ))}
               <button className="px-4 py-2 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-xs font-bold text-slate-400">
                  + Add
               </button>
            </div>
            
            <div className="mt-10 pt-10 border-t border-slate-50">
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Regional Priority</h3>
               <div className="space-y-4">
                  {[
                    { country: "India", region: "West Bengal • Rajasthan", weight: "70%" },
                    { country: "Kenya", region: "Nairobi Clusters", weight: "30%" },
                  ].map((loc, i) => (
                    <div key={i} className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <Globe size={16} className="text-slate-300" />
                          <div className="text-xs font-bold text-slate-700">{loc.country} <span className="text-slate-400 font-medium ml-1">({loc.region})</span></div>
                       </div>
                       <span className="text-xs font-black text-slate-900">{loc.weight}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Funding Logic */}
         <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                     <Briefcase size={18} />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900">Budget Logic</h2>
               </div>
               <button className="text-[10px] font-bold text-brand-green uppercase tracking-widest hover:underline">Manage Wallet</button>
            </div>
            
            <div className="space-y-8 flex-1">
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Annual Commit</p>
                  <p className="text-3xl font-black text-slate-900">$2,400,000</p>
               </div>
               
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <span className="text-xs font-bold text-slate-500">Auto-Sponsor Emergency</span>
                     <div className="w-10 h-5 bg-brand-green rounded-full relative p-1 cursor-pointer">
                        <div className="w-3 h-3 bg-white rounded-full ml-auto"></div>
                     </div>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed font-medium italic">*Allow the platform to instantly co-fund verified Level-5 emergency cases within focus areas up to $5,000/case.</p>
               </div>

               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <span className="text-xs font-bold text-slate-500">Matching Grants</span>
                     <div className="w-10 h-5 bg-slate-200 rounded-full relative p-1 cursor-pointer">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Account Settings Shortcut Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: "Alert Config", icon: Bell, desc: "Notification triggers for crisis and audits." },
           { label: "Security Vault", icon: Lock, desc: "Password, 2FA and Access Keys." },
           { label: "Governance Hub", icon: Heart, desc: "Impact policies and ESG guidelines." },
         ].map((item, i) => (
           <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group cursor-pointer hover:bg-white hover:border-brand-green transition-all">
              <div className="p-3 bg-white rounded-2xl w-fit mb-4 text-slate-400 group-hover:text-brand-green transition-colors shadow-sm">
                 <item.icon size={20} />
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-1">{item.label}</h3>
              <p className="text-[10px] text-slate-500 leading-relaxed">{item.desc}</p>
           </div>
         ))}
      </div>
    </div>
  );
}
