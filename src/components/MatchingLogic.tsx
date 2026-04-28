import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  MapPin, 
  Zap, 
  HandHeart, 
  Award, 
  Languages, 
  Clock, 
  CheckCircle2, 
  Search,
  Filter,
  ArrowUpRight,
  ShieldCheck,
  Star,
  Activity
} from "lucide-react";
import { useToast } from "./Toast";

interface Volunteer {
  id: string;
  name: string;
  distance: string;
  skills: string[];
  languages: string[];
  trustScore: number;
  matchPercentage: number;
  availability: "Immediate" | "Within 2h" | "Scheduled";
  successRate: string;
  avatar: string;
}

const VOLUNTEERS: Volunteer[] = [
  {
    id: "V-9901",
    name: "Rahul Sharma",
    distance: "1.2km",
    skills: ["First Aid", "Crisis Logistics"],
    languages: ["Hindi", "English", "Marathi"],
    trustScore: 982,
    matchPercentage: 98,
    availability: "Immediate",
    successRate: "99.4%",
    avatar: "https://i.pravatar.cc/150?u=rahul"
  },
  {
    id: "V-9902",
    name: "Priya Varma",
    distance: "2.4km",
    skills: ["Counseling", "Women Safety"],
    languages: ["Hindi", "English"],
    trustScore: 945,
    matchPercentage: 86,
    availability: "Within 2h",
    successRate: "98.1%",
    avatar: "https://i.pravatar.cc/150?u=priya"
  },
  {
    id: "V-9903",
    name: "Amit Patel",
    distance: "4.8km",
    skills: ["Sanitation", "Community Outreach"],
    languages: ["Gujarati", "Hindi"],
    trustScore: 890,
    matchPercentage: 72,
    availability: "Immediate",
    successRate: "95.5%",
    avatar: "https://i.pravatar.cc/150?u=patel"
  },
  {
    id: "V-9904",
    name: "John D'Souza",
    distance: "0.8km",
    skills: ["Food Distribution"],
    languages: ["English", "Konkani"],
    trustScore: 810,
    matchPercentage: 65,
    availability: "Scheduled",
    successRate: "92.0%",
    avatar: "https://i.pravatar.cc/150?u=john"
  }
];

export default function MatchingLogic() {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="bg-slate-950 p-16 rounded-[4.5rem] text-white shadow-2xl relative overflow-hidden group">
         <div className="absolute right-0 top-0 p-20 opacity-[0.05] pointer-events-none group-hover:scale-125 transition-transform duration-[5s]">
            <Zap size={250} />
         </div>
         <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12 text-center lg:text-left">
            <div className="space-y-6 max-w-2xl">
               <div className="flex items-center gap-4 justify-center lg:justify-start">
                  <div className="w-14 h-14 bg-brand-green/20 rounded-3xl flex items-center justify-center text-brand-green border border-brand-green/20">
                     <Zap size={28} />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-[0.3em] font-mono opacity-60">Smart Dispatch Engine Active</span>
               </div>
               <h2 className="text-5xl font-black tracking-tighter italic uppercase leading-none">Smart Volunteer Matching</h2>
               <p className="text-slate-400 text-lg font-medium italic opacity-80 leading-relaxed font-serif">
                  "Calculating optimal resource allocation based on distance, linguistic synergy, historical patterns, and validated trust scores."
               </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 bg-white/5 p-10 rounded-[3rem] border border-white/10">
               <div className="text-center">
                  <div className="text-5xl font-black tracking-tighter text-brand-green">98%</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">Average Match</div>
               </div>
               <div className="text-center">
                  <div className="text-5xl font-black tracking-tighter text-blue-400">1.2km</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">Avg Distance</div>
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
         {/* Filters Sidebar */}
         <div className="xl:col-span-1 space-y-10">
            <div className="space-y-6">
               <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase px-4">Recruitment Logic</h3>
               <div className="relative">
                  <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search by UUID or Skill..." 
                    className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-3xl text-sm italic shadow-sm focus:ring-2 focus:ring-brand-green/10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
            </div>

            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
               <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Constraint Parameters</span>
                  <div className="space-y-3">
                     {[
                       { label: "Proximity Priority", value: "8/10", color: "text-brand-green" },
                       { label: "Language Lock", value: "Primary", color: "text-blue-500" },
                       { label: "Trust Barrier", value: ">850 pts", color: "text-amber-500" },
                       { label: "Capacity Limit", value: "Auto-Balance", color: "text-slate-400" },
                     ].map((p, i) => (
                       <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                          <span className="text-[10px] font-bold text-slate-500 uppercase">{p.label}</span>
                          <span className={`text-[10px] font-black ${p.color}`}>{p.value}</span>
                       </div>
                     ))}
                  </div>
               </div>
               
               <button className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-[9px] shadow-xl hover:bg-brand-green transition-all transform active:scale-95">
                  Re-Optimize Strategy
               </button>
            </div>
         </div>

         {/* Results Grid */}
         <div className="xl:col-span-3 space-y-10">
            <div className="flex justify-between items-center px-4">
               <h3 className="text-2xl font-black text-slate-900 tracking-tight italic">Matched Assets <span className="text-slate-400 ml-2 font-medium">(04)</span></h3>
               <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-2">
                  {["all", "high_match", "nearby"].map(f => (
                    <button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeFilter === f ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400'}`}
                    >
                      {f.replace('_', ' ')}
                    </button>
                  ))}
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {VOLUNTEERS.map((v, i) => (
                 <motion.div
                   key={v.id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className="bg-white p-10 rounded-[4rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden flex flex-col"
                 >
                    <div className="flex justify-between items-start mb-8">
                       <div className="flex items-center gap-6">
                          <div className="w-20 h-20 rounded-[2.5rem] overflow-hidden shadow-2xl relative shrink-0">
                             <img src={v.avatar} alt={v.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                             {v.availability === "Immediate" && (
                                <div className="absolute top-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full animate-pulse shadow-lg"></div>
                             )}
                          </div>
                          <div>
                             <h4 className="text-2xl font-black text-slate-900 tracking-tighter italic uppercase">{v.name}</h4>
                             <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{v.id}</span>
                                <div className="w-1.5 h-1.5 bg-slate-100 rounded-full"></div>
                                <div className="flex items-center gap-1">
                                   <MapPin size={12} className="text-brand-green" />
                                   <span className="text-[10px] font-bold italic text-slate-500">{v.distance}</span>
                                </div>
                             </div>
                          </div>
                       </div>
                       <div className="text-right">
                          <div className={`text-4xl font-black tracking-tighter ${v.matchPercentage > 90 ? 'text-brand-green' : v.matchPercentage > 80 ? 'text-blue-500' : 'text-slate-400'}`}>
                             {v.matchPercentage}%
                          </div>
                          <div className="text-[8px] font-black uppercase tracking-widest text-slate-400">Match Factor</div>
                       </div>
                    </div>

                    <div className="space-y-6 flex-1">
                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-5 bg-slate-50 rounded-[2rem] space-y-2">
                             <div className="flex items-center gap-2 text-slate-400">
                                <Activity size={14} />
                                <span className="text-[8px] font-black uppercase tracking-widest">Trust Score</span>
                             </div>
                             <div className="text-xl font-black text-slate-900 tracking-tighter">{v.trustScore}</div>
                          </div>
                          <div className="p-5 bg-slate-50 rounded-[2rem] space-y-2">
                             <div className="flex items-center gap-2 text-slate-400">
                                <CheckCircle2 size={14} />
                                <span className="text-[8px] font-black uppercase tracking-widest">Success Rate</span>
                             </div>
                             <div className="text-xl font-black text-slate-900 tracking-tighter">{v.successRate}</div>
                          </div>
                       </div>

                       <div className="flex flex-wrap gap-2">
                          {v.skills.map(s => (
                            <span key={s} className="px-5 py-2.5 bg-white border border-slate-100 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-600 shadow-sm">{s}</span>
                          ))}
                          {v.languages.map(l => (
                             <span key={l} className="px-5 py-2.5 bg-indigo-50 text-indigo-500 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm flex items-center gap-2"><Languages size={10} /> {l}</span>
                          ))}
                       </div>
                    </div>

                    <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <Clock size={16} className="text-slate-300" />
                          <span className={`text-[10px] font-black uppercase tracking-widest ${v.availability === 'Immediate' ? 'text-emerald-500' : 'text-slate-400'}`}>{v.availability}</span>
                       </div>
                       <button 
                         onClick={() => showToast(`Dispatching task to ${v.name}...`, "success")}
                         className="px-8 py-4 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-[9px] shadow-xl hover:bg-brand-green transition-all transform active:scale-95 flex items-center gap-3"
                       >
                         Dispatch Now <ArrowUpRight size={14} />
                       </button>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
