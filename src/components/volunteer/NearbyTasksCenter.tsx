import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, 
  Search, 
  Filter, 
  Map, 
  List, 
  ArrowRight, 
  Navigation,
  Clock,
  ShieldCheck,
  Package,
  HeartPulse,
  Scale,
  Zap
} from "lucide-react";
import { useToast } from "../Toast";

const CATEGORIES = [
  { id: "all", label: "All Needs", icon: Map },
  { id: "medical", label: "Medical", icon: HeartPulse, color: "text-rose-500", bg: "bg-rose-50" },
  { id: "food", label: "Food & Water", icon: Package, color: "text-amber-500", bg: "bg-amber-50" },
  { id: "legal", label: "Civil/Legal", icon: Scale, color: "text-indigo-500", bg: "bg-indigo-50" },
  { id: "safety", label: "Safety Audit", icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
];

const TASKS = [
  { 
    id: "T-101", 
    title: "Urgent Insulin Delivery", 
    desc: "A diabetic child in Sector 4 needs critical medication delivery immediately. Prescription is verified.", 
    category: "medical", 
    distance: "0.8 km", 
    time: "15 min",
    urgency: "Red Alert", 
    reward: "+120 Impact Pts",
    location: "Block C, Sector 4, Rohini"
  },
  { 
    id: "T-102", 
    title: "Ration Kit Distribution", 
    desc: "Help distribute weekly food kits to 5 families near the community primary school.", 
    category: "food", 
    distance: "1.2 km", 
    time: "1 hour",
    urgency: "Medium", 
    reward: "+50 Impact Pts",
    location: "Main Street, Ward 4"
  },
  { 
    id: "T-103", 
    title: "ID Verification Field Audit", 
    desc: "Verify the residency and school enrollment details for 3 new students registered in the platform.", 
    category: "legal", 
    distance: "2.5 km", 
    time: "45 min",
    urgency: "Low", 
    reward: "+80 Impact Pts",
    location: "West Point Apartments"
  },
  { 
    id: "T-104", 
    title: "Night Safety Patrol", 
    desc: "Collective walk with field agents to audit street lighting and security signals in the high-density zone.", 
    category: "safety", 
    distance: "3.1 km", 
    time: "2 hours",
    urgency: "Medium", 
    reward: "+100 Impact Pts",
    location: "Metro Station Perimeter"
  }
];

export default function NearbyTasksCenter() {
  const [activeSubTab, setActiveSubTab] = useState<"feed" | "map" | "ai">("feed");
  const [activeCategory, setActiveCategory] = useState("all");
  const { showToast } = useToast();

  const filteredTasks = activeCategory === "all" 
    ? TASKS 
    : TASKS.filter(t => t.category === activeCategory);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Nearby Tasks Center</h2>
          <p className="text-slate-500 text-sm mt-1 opacity-75 font-medium italic">Intelligent skill-matched opportunities within 5km of your current location.</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
          {[
            { id: "feed", label: "Smart Feed", icon: List },
            { id: "map", label: "Intelligence Map", icon: Map },
            { id: "ai", label: "For You (AI)", icon: Zap },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeSubTab === tab.id ? 'bg-brand-green text-white shadow-lg shadow-brand-green/20' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeSubTab === "feed" && (
          <motion.div key="feed" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            {/* Filters & Search - Only for Feed */}
            <div className="flex flex-col xl:flex-row gap-6">
              <div className="flex-1 flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`flex items-center gap-3 px-6 py-4 rounded-[2rem] border transition-all whitespace-nowrap group ${
                        activeCategory === cat.id 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xl' 
                        : 'bg-white text-slate-500 border-slate-100 hover:border-brand-green/30'
                      }`}
                    >
                      <cat.icon size={20} className={activeCategory === cat.id ? "text-brand-green" : ""} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{cat.label}</span>
                    </button>
                  ))}
              </div>
              <div className="flex gap-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Keyword search..." 
                        className="pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-[2rem] text-sm focus:outline-none focus:ring-4 focus:ring-brand-green/10 w-64 shadow-sm"
                    />
                  </div>
                  <button className="p-4 bg-white border border-slate-100 rounded-[2rem] text-slate-400">
                    <Filter size={20} />
                  </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-20">
              {filteredTasks.map((task, i) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-white border border-slate-100 p-10 rounded-[3rem] shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all relative overflow-hidden flex flex-col"
                >
                   <div className="absolute right-[-40px] top-[-40px] w-64 h-64 bg-slate-50 rounded-full blur-[80px] pointer-events-none group-hover:bg-brand-green/5 transition-colors"></div>
                   
                   <div className="flex justify-between items-start mb-8 relative z-10">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse"></div>
                          <span className="text-[10px] font-black text-brand-green uppercase tracking-[0.2em]">{task.id} • 95% Skill Match</span>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight font-serif group-hover:text-brand-green transition-colors">{task.title}</h3>
                      </div>
                      <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                        task.urgency === 'Red Alert' ? 'bg-rose-50 text-rose-500 border border-rose-100' : 'bg-slate-50 text-slate-400 border border-slate-100'
                      }`}>
                        {task.urgency}
                      </div>
                   </div>

                   <p className="text-slate-500 text-sm leading-relaxed font-medium opacity-80 italic mb-8 grow">"{task.desc}"</p>

                   <div className="flex flex-wrap gap-4 mb-10 pt-8 border-t border-slate-50">
                      <div className="bg-slate-50 px-4 py-2 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Navigation size={14} /> {task.distance}
                      </div>
                      <div className="bg-slate-50 px-4 py-2 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Clock size={14} /> {task.time}
                      </div>
                      <div className="bg-brand-green/5 px-4 py-2 rounded-xl text-[10px] font-black text-brand-green uppercase tracking-widest flex items-center gap-2">
                        <ShieldCheck size={14} /> {task.reward}
                      </div>
                   </div>

                   <div className="flex flex-wrap gap-3 mt-auto">
                      <button onClick={() => showToast("Mission Accepted!", "success")} className="flex-[2] py-5 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-slate-900/20 flex items-center justify-center gap-3 hover:bg-brand-green transition-all translate-y-0 hover:-translate-y-1 active:scale-95">
                        Accept Mission <ArrowRight size={16} />
                      </button>
                      <button className="flex-1 py-5 bg-white border border-slate-100 text-slate-400 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all flex items-center justify-center">
                        Save
                      </button>
                   </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSubTab === "map" && (
          <motion.div key="map" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="w-full bg-slate-900 rounded-[3.5rem] p-12 min-h-[650px] shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center">
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')]"></div>
             <div className="relative z-10 max-w-xl space-y-10">
                <div className="flex justify-center -space-x-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-16 h-16 rounded-[1.5rem] border-4 border-slate-800 overflow-hidden shadow-2xl">
                      <img src={`https://i.pravatar.cc/100?u=map${i}`} alt="user" />
                    </div>
                  ))}
                  <div className="w-16 h-16 rounded-[1.5rem] border-4 border-slate-800 bg-brand-green text-white flex items-center justify-center font-black text-xs shadow-2xl">+42</div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-4xl font-black text-white tracking-tighter">Ground Intelligence Node</h3>
                  <p className="text-slate-400 text-sm font-medium italic leading-relaxed opacity-80">Visualizing 14 active tasks across Ward 4. You are near a <span className="text-rose-500 font-bold">Critical Zone</span> with 3 unassigned red-alerts.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button className="py-5 bg-white text-slate-900 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-brand-green hover:text-white transition-all active:scale-95">Open Nearby Critical Zone</button>
                  <button className="py-5 bg-white/5 border border-white/10 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all">Enable Route Guidance</button>
                </div>
             </div>
          </motion.div>
        )}

        {activeSubTab === "ai" && (
          <motion.div key="ai" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
            <div className="bg-brand-green text-white p-16 rounded-[3.5rem] shadow-2xl shadow-brand-green/20 relative overflow-hidden group">
               <div className="absolute right-[-100px] top-[-100px] w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-1000"></div>
               <div className="relative z-10 max-w-2xl space-y-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md mb-8">
                    <Zap size={32} className="animate-pulse" />
                  </div>
                  <h3 className="text-4xl font-black tracking-tighter">AI-Optimized Mission Match</h3>
                  <p className="text-brand-green/10 bg-white/10 p-6 rounded-[2rem] text-lg font-medium italic border border-white/10 text-white shadow-inner">
                    "Based on your high success rate in 'Medical Delivery' and your proximity to Sector 7, we've prioritized 3 missions that maximize your community impact score today."
                  </p>
                  <button onClick={() => showToast("Analyzing deep patterns...", "loading")} className="px-12 py-5 bg-white text-brand-green rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl hover:bg-slate-900 hover:text-white transition-all transform hover:-translate-y-1">Generate New Recommendations</button>
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[1, 2, 3].map(i => (
                 <div key={i} className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                    <div className="flex items-center gap-3 mb-6">
                       <span className="text-[10px] font-black text-brand-green bg-brand-green/5 px-3 py-1 rounded-lg border border-brand-green/10">{90 + i}% Match</span>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-brand-green transition-colors italic">Emergency Support #{i}</h4>
                    <p className="text-slate-500 text-xs font-medium mb-8 italic opacity-70 leading-relaxed">Similar to your completion of T-990 last week. High urgency in verified zone.</p>
                    <button className="w-full py-4 bg-slate-50 text-slate-600 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-green hover:text-white transition-all">Quick Accept</button>
                 </div>
               ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
