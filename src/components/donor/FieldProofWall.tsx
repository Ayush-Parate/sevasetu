import React from "react";
import { motion } from "motion/react";
import { 
  Camera, 
  MapPin, 
  CheckCircle2, 
  Play, 
  Calendar,
  Layers,
  ArrowRight,
  Maximize2
} from "lucide-react";

const feedItems = [
  {
    id: 1,
    type: "image",
    url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop",
    title: "Distribution Drive: Phase 2",
    location: "Kolkata, WB",
    ngo: "Asha Foundation",
    time: "10 mins ago",
    verifiedBy: "Platform Verifier Node-04",
    impact: "450 Nutrition Kits sent"
  },
  {
    id: 2,
    type: "image",
    url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=600&auto=format&fit=crop",
    title: "New Bridge School Inauguration",
    location: "Rural Sunderbans",
    ngo: "Seva Rural",
    time: "1 hour ago",
    verifiedBy: "On-site Coordinator",
    impact: "125 Children enrolled"
  },
  {
    id: 3,
    type: "image",
    url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=600&auto=format&fit=crop",
    title: "Medical Camp: Acute Care",
    location: "Siliguri, WB",
    ngo: "HealthFirst",
    time: "3 hours ago",
    verifiedBy: "AI Pattern Matcher",
    impact: "22 Emergency cases solved"
  },
  {
    id: 4,
    type: "image",
    url: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=600&auto=format&fit=crop",
    title: "Clean Water Grid Testing",
    location: "Purulia District",
    ngo: "Water Relief",
    time: "Yesterday",
    verifiedBy: "IoT Sensor Verified",
    impact: "2,000 households served"
  }
];

export default function FieldProofWall() {
  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      {/* Wall Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="p-2 bg-brand-green/10 text-brand-green rounded-lg">
                <Camera size={18} />
             </div>
             <span className="text-[10px] font-bold text-brand-green uppercase tracking-[0.2em]">Live Impact Stream</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 leading-tight">Field Proof Wall</h1>
          <p className="text-slate-500 font-medium">Real-time verifiable media from the sites of action.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-100 shadow-sm">
           <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold shadow-md">Grid View</button>
           <button className="px-4 py-2 text-slate-400 hover:text-slate-900 rounded-lg text-xs font-bold transition-colors">Map View</button>
        </div>
      </div>

      {/* Featured Proof Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
         {feedItems.map((item, i) => (
           <motion.div
             key={item.id}
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: i * 0.1 }}
             className="group bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
           >
              <div className="aspect-[4/3] relative overflow-hidden">
                 <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <button className="w-full py-2 bg-white/20 backdrop-blur-md rounded-lg text-white text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 border border-white/20">
                       <Maximize2 size={12} /> Expand Proof Data
                    </button>
                 </div>
                 <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black tracking-widest text-slate-900 uppercase shadow-sm">
                    {item.time}
                 </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                 <div className="flex items-center gap-1.5 mb-3">
                    <MapPin size={12} className="text-brand-orange" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.location}</span>
                 </div>
                 
                 <h3 className="text-sm font-bold text-slate-800 mb-2 leading-tight group-hover:text-brand-green transition-colors">{item.title}</h3>
                 
                 <div className="mt-auto space-y-3">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-bold text-brand-green uppercase tracking-widest">{item.ngo}</span>
                    </div>
                    
                    <div className="p-3 bg-slate-50 rounded-xl relative overflow-hidden">
                       <div className="relative z-10 flex items-center justify-between">
                          <div>
                             <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Verified Impact</p>
                             <p className="text-[11px] font-bold text-slate-700 mt-0.5">{item.impact}</p>
                          </div>
                          <div className="text-brand-green">
                             <CheckCircle2 size={14} />
                          </div>
                       </div>
                       <div className="absolute top-0 right-0 h-full w-1 bg-brand-green"></div>
                    </div>
                 </div>
              </div>
           </motion.div>
         ))}
      </div>

      {/* Proof Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-1 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Verification Integrity</h3>
            <div className="space-y-6">
               {[
                 { label: "Human Audited", value: "65%", icon: CheckCircle2, color: "text-blue-500" },
                 { label: "AI Image Verification", value: "28%", icon: Layers, color: "text-brand-green" },
                 { label: "IoT Sensor Logs", value: "7%", icon: Calendar, color: "text-brand-orange" },
               ].map((stat) => (
                 <div key={stat.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <stat.icon size={16} className={stat.color} />
                       <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</span>
                    </div>
                    <span className="text-sm font-black text-slate-900">{stat.value}</span>
                 </div>
               ))}
            </div>
            <p className="mt-8 text-[11px] text-slate-400 leading-relaxed font-medium italic">
               *100% of your funds are only released after proof-of-work exceeds a 92% confidence threshold across these verification layers.
            </p>
         </div>

         <div className="lg:col-span-2 bg-slate-50 p-8 rounded-[32px] border border-dashed border-slate-200 flex flex-col justify-center items-center text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-300 mb-6 shadow-sm">
               <Play size={24} fill="currentColor" className="ml-1" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Request Field Livestream</h4>
            <p className="text-sm text-slate-500 max-w-sm mb-6">
               Connect directly to a registered Field Coordinator's camera for a real-time audit session of ongoing project milestones.
            </p>
            <button className="px-8 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all outline-none">
               Schedule Live Audit Session
            </button>
         </div>
      </div>
    </div>
  );
}
