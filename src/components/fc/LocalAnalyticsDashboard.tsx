import React from "react";
import { motion } from "motion/react";
import { BarChart3, TrendingUp, Clock, Users, CheckCircle, Download } from "lucide-react";

export default function LocalAnalyticsDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Ground Intelligence</h2>
          <p className="text-slate-500 text-sm mt-1 opacity-75 leading-relaxed font-medium">Ground-level metrics: response speeds, volunteer efficiency, and community satisfaction.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-3 bg-white border border-slate-100 text-slate-600 rounded-2xl hover:bg-slate-50 transition-all text-xs font-black uppercase tracking-widest flex items-center gap-3 shadow-sm active:scale-95 group">
             <Download size={18} className="group-hover:text-brand-green transition-colors" /> Export Data
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group overflow-hidden relative">
            <div className="absolute -right-5 -top-5 w-20 h-20 bg-blue-50/50 rounded-full blur-2xl"></div>
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-inner"><Clock size={24} /></div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 font-sans">Avg Response Speed</div>
            <div className="text-4xl font-black text-slate-900 tracking-tighter">12<span className="text-lg text-slate-400 ml-1 font-medium italic">min</span></div>
            <div className="text-xs text-emerald-500 font-bold mt-4 flex items-center gap-1.5 px-3 py-1 bg-emerald-50 rounded-lg w-fit"><TrendingUp size={14} /> 15% better</div>
         </div>

         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group overflow-hidden relative">
            <div className="absolute -right-5 -top-5 w-20 h-20 bg-brand-green/5 rounded-full blur-2xl"></div>
            <div className="w-12 h-12 bg-brand-green/10 text-brand-green rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-brand-green group-hover:text-white transition-all shadow-inner"><CheckCircle size={24} /></div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 font-sans">Verification Rate</div>
            <div className="text-4xl font-black text-slate-900 tracking-tighter">94<span className="text-lg text-slate-400 ml-1 font-medium italic">%</span></div>
            <div className="text-xs text-emerald-500 font-bold mt-4 flex items-center gap-1.5 px-3 py-1 bg-emerald-50 rounded-lg w-fit"><TrendingUp size={14} /> +2% vs avg</div>
         </div>

         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group overflow-hidden relative">
            <div className="absolute -right-5 -top-5 w-20 h-20 bg-amber-50 rounded-full blur-2xl"></div>
            <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-inner"><Users size={24} /></div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 font-sans">Volunteer Density</div>
            <div className="text-4xl font-black text-slate-900 tracking-tighter">45<span className="text-lg text-slate-400 ml-1 font-medium italic">v/d</span></div>
            <div className="text-xs text-slate-400 font-bold mt-4 flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-lg w-fit">Active daily unique</div>
         </div>

         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group overflow-hidden relative">
            <div className="absolute -right-5 -top-5 w-20 h-20 bg-indigo-50 rounded-full blur-2xl"></div>
            <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-inner"><BarChart3 size={24} /></div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 font-sans">Community NPS</div>
            <div className="text-4xl font-black text-slate-900 tracking-tighter">4.8<span className="text-lg text-slate-400 ml-1 font-medium italic">/5</span></div>
            <div className="text-xs text-emerald-500 font-bold mt-4 flex items-center gap-1.5 px-3 py-1 bg-emerald-50 rounded-lg w-fit"><TrendingUp size={14} /> Trending Up High</div>
         </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 p-20 min-h-[450px] shadow-sm flex flex-col items-center justify-center text-slate-400 relative overflow-hidden group">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cartographer.png")' }}></div>
        <div className="text-center relative z-10">
           <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner group-hover:scale-110 group-hover:bg-slate-100 transition-all border border-slate-50">
             <BarChart3 size={48} className="opacity-50" />
           </div>
           <p className="font-black uppercase tracking-[0.3em] text-xs text-slate-400 mb-2">Live Processing</p>
           <p className="font-serif italic text-slate-500 text-lg">Generating detailed temporal heatmaps & trend vectors...</p>
           <div className="mt-8 flex gap-2 justify-center">
             <div className="w-2 h-2 bg-brand-green rounded-full animate-bounce"></div>
             <div className="w-2 h-2 bg-brand-green rounded-full animate-bounce [animation-delay:0.2s]"></div>
             <div className="w-2 h-2 bg-brand-green rounded-full animate-bounce [animation-delay:0.4s]"></div>
           </div>
        </div>
      </div>
    </div>
  );
}
