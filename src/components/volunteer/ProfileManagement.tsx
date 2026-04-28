import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  User, 
  Languages, 
  Truck, 
  Calendar, 
  Heart, 
  Award, 
  Zap, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Plus, 
  Edit3,
  Camera,
  Download,
  AlertCircle
} from "lucide-react";
import { useToast } from "../Toast";

export default function ProfileManagement() {
  const { showToast } = useToast();
  const [isEmergencyMode, setIsEmergencyMode] = useState(true);

  const stats = [
    { label: "Missions", value: "48", color: "text-brand-green" },
    { label: "Trust Score", value: "940", color: "text-blue-500" },
    { label: "Impact", value: "1.2k", color: "text-rose-500" },
  ];

  const profileData = {
    languages: ["English", "Hindi", "Marathi"],
    transport: "Motorcycle (Personal)",
    schedule: "Weekends & Weekdays (7 PM - 10 PM)",
    interests: ["Emergency Relief", "Blood Donation", "Elderly Care"],
    certs: ["First Aid & CPR", "Basic Disaster Response", "NGO Field Scout v2"],
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-top-5 duration-700 pb-24">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
         {/* Left Column: Core Profile */}
         <div className="xl:col-span-1 space-y-10">
            <div className="bg-white border border-slate-100 p-12 rounded-[4rem] shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12 group-hover:scale-150 transition-transform">
                  <User size={120} />
               </div>
               <div className="flex flex-col items-center text-center relative z-10">
                  <div className="relative mb-8 group/avatar cursor-pointer">
                     <div className="w-40 h-40 rounded-[3.5rem] border-[6px] border-slate-50 overflow-hidden shadow-2xl transition-all group-hover/avatar:scale-105">
                        <img src="https://i.pravatar.cc/400?u=volunteer1" alt="Arjun Sharma" className="w-full h-full object-cover" />
                     </div>
                     <button className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-4 rounded-2xl shadow-xl transition-all hover:bg-brand-green active:scale-90">
                        <Camera size={20} />
                     </button>
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Arjun Sharma</h2>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-green bg-brand-green/5 px-4 py-1.5 rounded-full mt-3 border border-brand-green/10">
                     <ShieldCheck size={14} /> Elite Verified Scout
                  </div>

                  <div className="grid grid-cols-3 w-full mt-12 gap-4">
                     {stats.map(s => (
                       <div key={s.label} className="bg-slate-50 border border-slate-100 p-4 rounded-3xl shadow-inner">
                          <div className={`text-2xl font-black ${s.color} tracking-tighter mb-1`}>{s.value}</div>
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className={`p-10 rounded-[4.5rem] transition-all relative overflow-hidden group shadow-2xl ${isEmergencyMode ? 'bg-rose-500 text-white' : 'bg-slate-900 text-white'}`}>
               <div className="absolute top-[-30px] right-[-30px] w-64 h-64 bg-white/10 rounded-full blur-[80px]"></div>
               <div className="relative z-10 space-y-8">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10 ${isEmergencyMode ? 'animate-pulse' : ''}`}>
                           <Zap size={24} className={isEmergencyMode ? 'text-white' : 'text-slate-400'} fill={isEmergencyMode ? 'white' : 'transparent'} />
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-tighter italic">Emergency Mode</h3>
                     </div>
                     <button 
                       onClick={() => setIsEmergencyMode(!isEmergencyMode)}
                       className={`w-16 h-8 rounded-full relative transition-all shadow-inner border border-white/20 ${isEmergencyMode ? 'bg-white' : 'bg-white/10'}`}
                     >
                        <motion.div 
                          animate={{ x: isEmergencyMode ? 32 : 4 }}
                          className={`w-6 h-6 rounded-full absolute top-1 shadow-lg ${isEmergencyMode ? 'bg-rose-500' : 'bg-white'}`}
                        />
                     </button>
                  </div>
                  <p className="text-xs font-medium italic opacity-80 leading-relaxed font-serif">
                     {isEmergencyMode 
                       ? '"You are broadcasting your live location to NGO admins for immediate rescue dispatch and crisis alerts in Sector 4."'
                       : '"Toggle emergency mode on during crisis scenarios to appear on the regional responder heatmaps."'}
                  </p>
                  <button onClick={() => showToast(`Emergency Mode ${isEmergencyMode ? 'Disabled' : 'Enabled'}`, "warning")} className={`w-full py-5 rounded-[2rem] font-black uppercase tracking-widest text-[10px] transition-all shadow-xl active:scale-95 ${isEmergencyMode ? 'bg-white text-rose-500' : 'bg-brand-green text-white'}`}>
                     {isEmergencyMode ? 'Disable Global Alert' : 'Enable Emergency Visibility'}
                  </button>
               </div>
            </div>
         </div>

         {/* Right Column: Skills & Details */}
         <div className="xl:col-span-2 space-y-12">
            <div className="bg-white border border-slate-100 p-12 rounded-[4.5rem] shadow-sm">
               <div className="flex justify-between items-center mb-12">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Intelligence Parameters</h3>
                  <button className="flex items-center gap-2 text-xs font-black text-brand-green uppercase tracking-widest hover:underline">
                     <Edit3 size={16} /> Edit My Profile
                  </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  <div className="space-y-4">
                     <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-3">
                        <Languages size={14} /> Language Fluency
                     </div>
                     <div className="flex flex-wrap gap-2">
                        {profileData.languages.map(l => (
                          <span key={l} className="px-5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black text-slate-600 uppercase tracking-widest">{l}</span>
                        ))}
                        <button className="p-2.5 bg-brand-green/5 text-brand-green border border-brand-green/10 rounded-xl hover:bg-brand-green hover:text-white transition-all"><Plus size={16} /></button>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-3">
                        <Truck size={14} /> Transport Access
                     </div>
                     <div className="flex items-center gap-4 p-5 bg-slate-50 border border-slate-100 rounded-2xl shadow-inner text-slate-900 font-bold italic text-sm">
                        <Truck size={18} className="text-brand-green" /> {profileData.transport}
                     </div>
                  </div>

                  <div className="space-y-4">
                     <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-3">
                        <Calendar size={14} /> Availability Matrix
                     </div>
                     <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl shadow-inner text-slate-900 font-bold italic text-sm flex items-center gap-4">
                        <Calendar size={18} className="text-blue-500" /> {profileData.schedule}
                     </div>
                  </div>

                  <div className="space-y-4">
                     <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-3">
                        <Heart size={14} /> Core Interests
                     </div>
                     <div className="flex flex-wrap gap-2">
                        {profileData.interests.map(i => (
                          <span key={i} className="px-5 py-2.5 bg-brand-orange/5 border border-brand-orange/10 rounded-xl text-[10px] font-black text-brand-orange uppercase tracking-widest">{i}</span>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white border border-slate-100 p-12 rounded-[4.5rem] shadow-sm">
               <div className="flex justify-between items-center mb-12">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Verified Certifications</h3>
                  <button onClick={() => showToast("Uploading Certificate PDF...", "loading")} className="px-8 py-4 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-[9px] shadow-2xl flex items-center gap-3 hover:bg-brand-green transition-all shadow-slate-900/10">
                     <Plus size={18} /> Add Certification
                  </button>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {profileData.certs.map((c, i) => (
                    <div key={i} className="flex items-center justify-between p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] group hover:bg-white hover:shadow-xl transition-all cursor-pointer">
                       <div className="flex items-center gap-6">
                          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-slate-100 text-slate-400 group-hover:text-brand-green transition-colors shadow-inner">
                             <Award size={28} />
                          </div>
                          <div>
                             <h4 className="text-sm font-bold text-slate-900">{c}</h4>
                             <div className="text-[10px] font-black uppercase tracking-widest text-brand-green opacity-75">Trust Validated</div>
                          </div>
                       </div>
                       <Download size={18} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                    </div>
                  ))}
               </div>

               <div className="mt-12 p-10 bg-slate-50/50 border-2 border-dashed border-slate-100 rounded-[3rem] text-center space-y-4 group hover:border-brand-green/20 transition-all">
                  <AlertCircle size={40} className="mx-auto text-slate-200 group-hover:text-brand-green transition-colors mb-2" />
                  <h4 className="text-lg font-bold text-slate-900 tracking-tight italic">Missing Skill Endorsement?</h4>
                  <p className="text-slate-400 text-xs font-medium italic opacity-75 max-w-md mx-auto">
                     "Completed a field training that isn't listed? Request a peer endorsement from your field coordinator or upload photographic verification."
                  </p>
                  <button className="text-xs font-black text-brand-green uppercase tracking-widest hover:underline mt-4">Start Endorsement Request</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
