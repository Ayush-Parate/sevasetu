import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Heart, 
  BookOpen, 
  Droplet, 
  Flame, 
  GraduationCap, 
  ArrowRight, 
  Search, 
  Filter, 
  MapPin, 
  Calendar,
  UserPlus,
  Share2
} from "lucide-react";
import { useToast } from "../Toast";

const CAMPAIGNS = [
  {
    id: "CAMP-001",
    title: "Life-Stream Blood Drive",
    category: "Health",
    location: "City Hospital, Ward 4",
    date: "May 5, 2026",
    volunteers: 42,
    goal: 100,
    desc: "Critical shortage of O+ and B- blood types reported. Join the organized drive to restock the regional blood bank.",
    icon: Droplet,
    color: "rose"
  },
  {
    id: "CAMP-002",
    title: "Digital Literacy Mission",
    category: "Education",
    location: "MCD Community Center",
    date: "Every Weekend",
    volunteers: 18,
    goal: 30,
    desc: "Teaching senior citizens how to use government apps and secure banking. Focus on digital independence.",
    icon: GraduationCap,
    color: "blue"
  },
  {
    id: "CAMP-003",
    title: "Zero-Hunger Food Drive",
    category: "Food",
    location: "Sector 7 Slums",
    date: "Daily Operations",
    volunteers: 25,
    goal: 50,
    desc: "Surplus food recovery from local banquets and distribution to identified high-need families.",
    icon: Heart,
    color: "brand-green"
  },
  {
    id: "CAMP-004",
    title: "Monsoon Flood Readiness",
    category: "Disaster",
    location: "Yamuna River Banks",
    date: "Pre-Monsoon Week",
    volunteers: 120,
    goal: 200,
    desc: "Strategic sandbagging and evacuation mapping for vulnerable river-front communities.",
    icon: Flame,
    color: "brand-orange"
  }
];

export default function CommunityCampaigns() {
  const { showToast } = useToast();
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredCampaigns = activeFilter === "all" 
    ? CAMPAIGNS 
    : CAMPAIGNS.filter(c => c.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm gap-8 transition-all hover:shadow-xl">
         <div className="space-y-1">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Active Social Campaigns</h2>
            <p className="text-slate-500 text-sm font-medium italic opacity-75">Large-scale strategic initiatives requiring collective volunteer mobilization.</p>
         </div>
         <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100 shadow-inner">
            {["all", "health", "education", "food", "disaster"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === tab ? 'bg-white text-brand-green shadow-xl border border-brand-green/10' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab}
              </button>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         {filteredCampaigns.map((camp, i) => (
           <motion.div 
             key={camp.id}
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: i * 0.1 }}
             className="bg-white border border-slate-100 p-10 rounded-[3.5rem] shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden flex flex-col"
           >
              <div className={`absolute top-0 right-0 w-40 h-40 bg-${camp.color}-50 rounded-bl-[5rem] -translate-y-8 translate-x-8 opacity-40 blur-3xl group-hover:scale-150 transition-transform duration-700`}></div>
              
              <div className="flex justify-between items-start mb-8 relative z-10">
                 <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 bg-${camp.color}-50 text-${camp.color === 'brand-green' ? 'emerald-500' : camp.color === 'brand-orange' ? 'orange-500' : camp.color + '-500'} rounded-2xl flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform`}>
                       <camp.icon size={28} />
                    </div>
                    <div>
                       <span className={`text-[10px] font-black uppercase tracking-widest text-${camp.color === 'brand-green' ? 'emerald-500' : camp.color === 'brand-orange' ? 'orange-500' : camp.color + '-500'}`}>{camp.category}</span>
                       <h3 className="text-2xl font-black text-slate-900 tracking-tight font-serif group-hover:text-brand-green transition-colors">{camp.title}</h3>
                    </div>
                 </div>
                 <div className="text-right">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Reach</span>
                    <div className="text-lg font-black text-slate-900 tracking-tighter">{camp.goal} Vanguards</div>
                 </div>
              </div>

              <p className="text-slate-500 text-sm leading-relaxed font-medium italic mb-10 opacity-80 grow">
                 "{camp.desc}"
              </p>

              <div className="grid grid-cols-2 gap-4 mb-10">
                 <div className="bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 flex items-center gap-4">
                    <MapPin size={18} className="text-slate-400" />
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-tight">{camp.location}</div>
                 </div>
                 <div className="bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 flex items-center gap-4">
                    <Calendar size={18} className="text-slate-400" />
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-tight">{camp.date}</div>
                 </div>
              </div>

              <div className="space-y-3 mb-10">
                 <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Mobilization Progress</span>
                    <span className="text-brand-green">{Math.round((camp.volunteers/camp.goal)*100)}% Squad Ready</span>
                 </div>
                 <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden shadow-inner border border-slate-100">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(camp.volunteers/camp.goal)*100}%` }}
                      className="h-full bg-brand-green shadow-[0_0_15px_rgba(93,141,112,0.4)] rounded-full"
                    />
                 </div>
              </div>

              <div className="flex gap-4 mt-auto">
                 <button 
                   onClick={() => showToast(`Successfully registered for ${camp.title}`, "success")}
                   className="flex-1 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-slate-900/20 flex items-center justify-center gap-3 hover:bg-brand-green transition-all transform active:scale-95 translate-y-0 hover:-translate-y-1"
                 >
                    Join Campaign <ArrowRight size={16} />
                 </button>
                 <button className="px-6 py-5 bg-white border border-slate-100 text-slate-400 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all flex items-center justify-center shadow-sm">
                    <Share2 size={20} />
                 </button>
              </div>
           </motion.div>
         ))}
      </div>

      <div className="bg-slate-900 rounded-[4rem] p-20 text-center shadow-2xl relative overflow-hidden group">
         <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')]"></div>
         <div className="relative z-10 max-w-2xl mx-auto space-y-10">
            <div className="w-20 h-20 bg-brand-green/10 text-brand-green rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner group-hover:scale-110 transition-transform">
               <Users size={40} />
            </div>
            <h3 className="text-4xl font-black text-white tracking-tighter">Register External Mobilization Group</h3>
            <p className="text-slate-400 text-lg font-medium italic opacity-80 leading-relaxed font-serif">
               "NGOs, College Groups, and Corporate Teams can register a unified response squad to handle high-volume campaigns together."
            </p>
            <div className="flex flex-wrap justify-center gap-6">
               <button className="px-12 py-6 bg-white text-slate-900 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:bg-brand-green hover:text-white transition-all transform active:scale-95 translate-y-0 hover:-translate-y-1">
                  Start Group Registration
               </button>
               <button className="px-12 py-6 bg-white/5 border border-white/10 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-all">
                  Invite External Leads
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
