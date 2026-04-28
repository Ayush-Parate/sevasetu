import React from "react";
import { motion } from "motion/react";
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  MapPin, 
  Users, 
  Target, 
  Heart, 
  Zap, 
  Clock,
  ArrowUpRight,
  ShieldCheck
} from "lucide-react";

const opportunities = [
  {
    id: 1,
    title: "Clean Water Grid: Purulia",
    ngo: "Water Relief Foundation",
    location: "West Bengal, India",
    goal: "$25,000",
    raised: "$18,200",
    backers: 42,
    impact: "2k families",
    urgency: "HIGH",
    category: "WASH",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Mobile Learning Lab",
    ngo: "Udaan Trust",
    location: "Kolkata Slums",
    goal: "$12,000",
    raised: "$3,500",
    backers: 12,
    impact: "500 children",
    urgency: "MEDIUM",
    category: "Education",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Acute Malnutrition Center",
    ngo: "HealthFirst NGO",
    location: "Sunderbans",
    goal: "$45,000",
    raised: "$12,000",
    backers: 8,
    impact: "1k infants",
    urgency: "CRITICAL",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1541600391513-39ac10850269?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Skill Up: Empowering Women",
    ngo: "Asha Foundation",
    location: "Siliguri Rural",
    goal: "$8,000",
    raised: "$7,200",
    backers: 35,
    impact: "150 women",
    urgency: "LOW",
    category: "Livelihood",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop"
  }
];

export default function ProjectMarketplace() {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      {/* Search and Filters */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Project Marketplace</h1>
          <p className="text-slate-500 font-medium">Invest your CSR capital where it is needed most.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search projects or NGOs..." 
                className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-green/20 w-full md:w-80"
              />
           </div>
           <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
              <Filter size={14} /> Refine Needs
           </button>
           <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 shadow-md">
              <Zap size={14} fill="currentColor" /> Quick Match
           </button>
        </div>
      </div>

      {/* High Priority Needs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {opportunities.map((item, i) => {
           const progress = (parseInt(item.raised.replace('$', '').replace(',', '')) / parseInt(item.goal.replace('$', '').replace(',', ''))) * 100;
           
           return (
             <motion.div
               key={item.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="group bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col md:flex-row hover:shadow-2xl transition-all duration-500"
             >
                <div className="md:w-2/5 relative overflow-hidden">
                   <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                   />
                   <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase shadow-lg backdrop-blur-md ${
                        item.urgency === 'CRITICAL' ? 'bg-red-500/90 text-white' : 
                        item.urgency === 'HIGH' ? 'bg-brand-orange/90 text-white' : 
                        'bg-white/90 text-slate-900'
                      }`}>
                        {item.urgency} NEED
                      </span>
                   </div>
                </div>
                
                <div className="md:w-3/5 p-8 flex flex-col">
                   <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-[10px] font-bold text-brand-green uppercase tracking-widest">{item.category}</span>
                        <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-brand-green transition-colors">{item.title}</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">{item.ngo}</p>
                      </div>
                      <button className="text-slate-200 hover:text-red-500 transition-colors">
                        <Heart size={20} />
                      </button>
                   </div>
                   
                   <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-1.5">
                         <MapPin size={12} className="text-slate-400" />
                         <span className="text-[11px] font-bold text-slate-500">{item.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                         <Users size={12} className="text-slate-400" />
                         <span className="text-[11px] font-bold text-slate-500">{item.impact}</span>
                      </div>
                   </div>
                   
                   <div className="mt-auto space-y-4">
                      <div className="space-y-1.5">
                         <div className="flex justify-between text-[11px] font-bold">
                            <span className="text-slate-400 uppercase tracking-widest">Progress</span>
                            <span className="text-slate-900">{Math.round(progress)}% Funded</span>
                         </div>
                         <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                            <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${progress}%` }}
                               transition={{ duration: 1.5, ease: "easeOut" }}
                               className="h-full bg-brand-green rounded-full"
                            />
                         </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                         <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Target</p>
                            <p className="text-lg font-black text-slate-900 mt-1">{item.goal}</p>
                         </div>
                         <button className="px-8 py-3 bg-brand-green text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-green/20 hover:brightness-110 active:scale-95 transition-all outline-none">
                            Sponsor Now
                         </button>
                      </div>
                   </div>
                </div>
             </motion.div>
           );
         })}
      </div>

      {/* Marketplace CTA */}
      <div className="bg-slate-900 rounded-[40px] p-12 text-white relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-8 opacity-20 rotate-12 group-hover:rotate-0 transition-transform duration-500">
            <ShoppingBag size={200} />
         </div>
         <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight mb-4 leading-tight">Can't find a matching initiative?</h2>
            <p className="text-white/60 text-lg mb-8">
               SevaSetu matches complex philanthropic agendas with ground realities. Let us architect a custom CSR sponsorship plan aligned with your ESG goals.
            </p>
            <div className="flex gap-4">
               <button className="px-10 py-4 bg-brand-green text-white rounded-xl font-bold hover:brightness-110 transition-all flex items-center gap-3">
                  Consult an Impact Architect <ArrowUpRight size={18} />
               </button>
               <button className="px-10 py-4 bg-white/10 text-white rounded-xl font-bold backdrop-blur-sm hover:bg-white/20 transition-all">Download CSR Brochure</button>
            </div>
         </div>
      </div>
    </div>
  );
}
