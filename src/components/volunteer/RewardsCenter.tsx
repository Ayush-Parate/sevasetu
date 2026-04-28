import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, Star, Trophy, Target, Gift, Zap, TrendingUp, ArrowRight, Shield, HeartPulse, ShieldAlert, Users } from "lucide-react";
import { useToast } from "../Toast";

export default function RewardsCenter() {
  const { showToast } = useToast();
  const [boardType, setBoardType] = useState("city");

  const badges = [
    { title: "Rapid Responder", icon: Zap, color: "bg-rose-500", desc: "For 5 consecutive <15m responses." },
    { title: "Health Hero", icon: HeartPulse, color: "bg-blue-500", desc: "Highest contribution in medical drives." },
    { title: "Community Guardian", icon: Shield, color: "bg-brand-green", desc: "Voted top sector trusted scout." },
    { title: "Emergency Warrior", icon: ShieldAlert, color: "bg-brand-orange", desc: "Participated in 10+ red-alerts." },
    { title: "Top Volunteer", icon: Trophy, color: "bg-indigo-500", desc: "Monthly rank #1 in any campaign." },
  ];

  const leaders = [
    { rank: 1, name: "Suresh Kejriwal", score: "2,450", trend: "+120", avatar: "v1" },
    { rank: 2, name: "Priya Menon", score: "2,180", trend: "+85", avatar: "v2" },
    { rank: 3, name: "Arjun Sharma (You)", score: "1,820", trend: "+210", avatar: "volunteer1", me: true },
    { rank: 4, name: "Vikram Rathore", score: "1,550", trend: "+40", avatar: "v4" },
    { rank: 5, name: "Anjali Singh", score: "1,420", trend: "+15", avatar: "v5" },
  ];

  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-700">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-10 bg-white border border-slate-100 p-12 rounded-[4rem] shadow-sm">
         <div className="flex items-center gap-8">
            <div className="w-24 h-24 bg-brand-orange/10 text-brand-orange rounded-[2.5rem] flex items-center justify-center shadow-inner shrink-0 group hover:rotate-12 transition-transform">
               <Trophy size={48} />
            </div>
            <div>
               <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Recognition Architecture</h2>
               <p className="text-slate-500 font-medium italic mt-2 opacity-75 leading-relaxed font-serif max-w-lg">
                 "Rewards at SevaSetu are badges of real-world impact. You're currently ranked in the top <span className="text-brand-green font-bold">3% for community reliability</span>."
               </p>
            </div>
         </div>
         <div className="flex bg-slate-50 p-2 rounded-2xl border border-slate-100 shadow-inner w-full xl:w-auto">
            {['city', 'NGO', 'campaign'].map(t => (
               <button 
                 key={t}
                 onClick={() => setBoardType(t)}
                 className={`flex-1 xl:flex-none px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${boardType === t ? 'bg-slate-900 text-white shadow-xl scale-105' : 'text-slate-400 hover:text-slate-600'}`}>
                  {t} Rank
               </button>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <div className="lg:col-span-2 space-y-10">
            <div className="flex justify-between items-center px-4">
               <h3 className="text-2xl font-black text-slate-900 tracking-tight capitalize">{boardType} Command Board</h3>
               <button onClick={() => showToast("Enrolling in Season 4 Tournament...", "info")} className="text-[10px] font-black text-brand-green uppercase tracking-widest border-b-2 border-brand-green/20 hover:border-brand-green transition-all pb-1">Join Elite Volunteer Team</button>
            </div>
            
            <div className="bg-white border border-slate-100 rounded-[4rem] overflow-hidden shadow-sm divide-y divide-slate-50">
               {leaders.map((user, i) => (
                 <div key={i} className={`flex items-center justify-between p-8 transition-all ${user.me ? 'bg-brand-green/5 border-l-8 border-brand-green' : 'hover:bg-slate-50 cursor-pointer'}`}>
                    <div className="flex items-center gap-8">
                       <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black italic ${i < 3 ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-300'}`}>
                          {user.rank}
                       </div>
                       <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                          <img src={`https://i.pravatar.cc/100?u=${user.avatar}`} alt="avatar" />
                       </div>
                       <div>
                          <div className={`font-bold ${user.me ? 'text-slate-900 text-xl' : 'text-slate-700'}`}>{user.name}</div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                             <Shield size={12} className="text-brand-green" /> Verified Scout Grid 4
                          </div>
                       </div>
                    </div>
                    <div className="text-right">
                       <div className="text-xl font-black text-slate-900 tracking-tight">{user.score} <span className="text-[10px] text-slate-400 lowercase ml-0.5">pts</span></div>
                       <div className="text-[10px] font-black text-emerald-500 uppercase flex items-center justify-end gap-1"><TrendingUp size={12} /> {user.trend}</div>
                    </div>
                 </div>
               ))}
            </div>

            <div className="flex flex-wrap gap-4">
               <button onClick={() => showToast("Application transmitted to regional HQ.", "success")} className="px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-brand-green transition-all shadow-slate-900/10 active:scale-95">Apply for Leadership Badge</button>
               <button onClick={() => showToast("Requesting Elite Sector access...", "loading")} className="px-10 py-5 bg-white border border-slate-100 text-slate-900 rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all shadow-sm active:scale-95">Request Regional Promotion</button>
            </div>
         </div>

         <div className="space-y-10">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight ml-4">Achievement Gallery</h3>
            <div className="grid grid-cols-1 gap-6">
               {badges.map((badge, i) => (
                 <div key={i} className="bg-white border border-slate-100 p-8 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all group flex items-center gap-6 cursor-pointer relative overflow-hidden">
                    <div className={`absolute -right-4 -top-4 w-20 h-20 ${badge.color} opacity-[0.03] rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
                    <div className={`w-16 h-16 ${badge.color} rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                       <badge.icon size={28} fill="white" className="text-white" />
                    </div>
                    <div>
                       <h4 className="text-lg font-bold text-slate-900 tracking-tight mb-1">{badge.title}</h4>
                       <p className="text-[10px] text-slate-500 font-medium italic opacity-75">"{badge.desc}"</p>
                    </div>
                 </div>
               ))}
            </div>
            
            <div className="bg-slate-900 rounded-[4rem] p-12 text-white space-y-8 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-[-50px] right-[-50px] w-80 h-80 bg-brand-green/20 rounded-full blur-[100px] group-hover:bg-brand-green/30 transition-all duration-1000"></div>
               <div className="relative z-10 text-center space-y-6">
                  <div className="w-20 h-20 bg-brand-green/10 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner group-hover:rotate-12 transition-all">
                     <Gift size={40} className="text-brand-green" />
                  </div>
                  <div>
                     <h4 className="text-2xl font-black uppercase tracking-tight italic">Claim Your Reward</h4>
                     <p className="text-slate-400 text-xs font-medium italic opacity-75 mt-2">"You have 1,820 points ready for redemption at partner hospitals and stores."</p>
                  </div>
                  <button onClick={() => showToast("Redemption portal opening...", "loading")} className="w-full py-5 bg-white text-slate-900 rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-brand-green hover:text-white transition-all shadow-xl active:scale-95">Claim Points v4.0</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

