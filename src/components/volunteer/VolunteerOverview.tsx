import React from "react";
import { 
  MapPin, 
  CheckSquare, 
  AlertCircle, 
  TrendingUp, 
  ShieldCheck, 
  Award, 
  Calendar, 
  Bell,
  ArrowRight,
  Target,
  Zap,
  Users,
  Compass
} from "lucide-react";
import { motion } from "motion/react";
import RoleLiveMap from "../RoleLiveMap";
import { useAsync } from "../../lib/useAsync";
import { getVolunteerStats } from "../../lib/api";

interface OverviewCardProps {
  title: string;
  value: string;
  desc: string;
  icon: any;
  btnLabel: string;
  onClick: () => void;
  color: string;
  lightBg: string;
  alert?: boolean;
}

const OverviewCard = ({ title, value, desc, icon: Icon, btnLabel, onClick, color, lightBg, alert }: OverviewCardProps) => (
  <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all group flex flex-col items-start relative overflow-hidden h-full">
    {alert && (
      <div className="absolute top-6 right-6 flex items-center gap-2">
        <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></div>
        <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">Live Alert</span>
      </div>
    )}
    <div className={`w-14 h-14 ${lightBg} ${color} rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform shadow-inner`}>
      <Icon size={28} />
    </div>
    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 font-sans">{title}</div>
    <div className="text-4xl font-black text-slate-900 tracking-tighter mb-4">{value}</div>
    <p className="text-sm text-slate-500 font-medium opacity-75 mb-8 line-clamp-2 leading-relaxed italic">{desc}</p>
    <button 
      onClick={onClick}
      className="mt-auto flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-slate-800 hover:text-brand-green border-t border-slate-50 w-full pt-6 group/btn transition-colors"
    >
      {btnLabel} <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
    </button>
  </div>
);

export default function VolunteerOverview({ setActiveTab }: { setActiveTab: (tab: any) => void }) {
  const { data: stats } = useAsync(getVolunteerStats);

  const cards = [
    {
      title: "Available Tasks Near Me",
      value: "14",
      desc: "Based on your location and 'Emergency Medical' skills.",
      icon: MapPin,
      btnLabel: "View Nearby Tasks",
      tab: "nearby",
      color: "text-brand-green",
      lightBg: "bg-brand-green/10"
    },
    {
      title: "My Active Tasks",
      value: stats?.activeTasks ?? "...",
      desc: `${stats?.completedTasks ?? 0} tasks completed so far.`,
      icon: CheckSquare,
      btnLabel: "Open Task Tracker",
      tab: "tasks",
      color: "text-blue-600",
      lightBg: "bg-blue-50"
    },
    {
      title: "High Priority Emergency",
      value: "3",
      desc: "Urgent red-alerts in Sector 4 needing rapid physical deployment.",
      icon: AlertCircle,
      btnLabel: "Open Emergency Feed",
      tab: "emergency",
      color: "text-rose-600",
      lightBg: "bg-rose-50",
      alert: true
    },
    {
      title: "My Impact Score",
      value: stats?.impactScore ?? "...",
      desc: "Top 5% of volunteers in your ward this month.",
      icon: TrendingUp,
      btnLabel: "View Impact Detail",
      tab: "impact",
      color: "text-indigo-600",
      lightBg: "bg-indigo-50"
    },
    {
      title: "Trust Verification",
      value: `${stats?.trustScore ?? "..."}/10`,
      desc: `Verification Level: ${stats?.rank ?? "..."}. You can now verify other's tasks.`,
      icon: ShieldCheck,
      btnLabel: "Trust Profile",
      tab: "trust",
      color: "text-emerald-600",
      lightBg: "bg-emerald-50"
    },
    {
      title: "Rewards & Recognition",
      value: "8",
      desc: "New 'Life Saver' badge unlocked. Claim your reward.",
      icon: Award,
      btnLabel: "Rewards Center",
      tab: "rewards",
      color: "text-brand-orange",
      lightBg: "bg-brand-orange/10"
    },
    {
      title: "Upcoming Community Drives",
      value: "1",
      desc: "Join the 'Clean Slum' initiative this Sunday.",
      icon: Calendar,
      btnLabel: "Join Campaign",
      tab: "campaigns",
      color: "text-amber-600",
      lightBg: "bg-amber-50"
    },
    {
      title: "Active Comms",
      value: "12",
      desc: "Targeted updates from Field Coordinators for your active zone.",
      icon: Bell,
      btnLabel: "Open Notifications",
      tab: "comms",
      color: "text-sky-600",
      lightBg: "bg-sky-50"
    }
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Welcome Banner */}
      <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-sm relative overflow-hidden group">
         <div className="absolute right-0 top-0 w-1/3 h-full bg-brand-green/10 clip-path-slant group-hover:w-1/2 transition-all duration-1000 hidden md:block"></div>
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-4">
               <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                 Heroic Afternoon, <span className="text-brand-green italic">Arjun!</span>
               </h2>
               <p className="text-slate-500 font-medium max-w-xl leading-relaxed italic opacity-80">
                 "Every small action ripples across the community. Your involvement today in Ward 4 could be the turning point for a family in need."
               </p>
               <div className="flex gap-4 pt-4">
                  <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 shadow-inner">
                    <Target size={16} className="text-brand-orange" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Monthly Goal: <span className="text-slate-900">12/15 Tasks</span></span>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 shadow-inner">
                    <Zap size={16} className="text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Active Streaks: <span className="text-emerald-700">5 Days</span></span>
                  </div>
               </div>
            </div>
            <div className="flex -space-x-4">
               {[1, 2, 3, 4, 5].map(i => (
                 <div key={i} className="w-16 h-16 rounded-[1.5rem] border-4 border-white overflow-hidden shadow-xl hover:translate-y-[-10px] transition-all bg-slate-200 cursor-pointer">
                    <img src={`https://i.pravatar.cc/150?u=team${i}`} alt="team" />
                 </div>
               ))}
               <div className="w-16 h-16 rounded-[1.5rem] border-4 border-white bg-brand-green text-white flex items-center justify-center font-bold text-xs shadow-xl cursor-pointer">
                 +24
               </div>
            </div>
         </div>
      </div>

      {/* Action Command Grid */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
           <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             <div className="p-2 bg-slate-100 rounded-xl">
               <Compass size={24} className="text-slate-400" />
             </div>
             Action Command Center
           </h3>
           <div className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-green bg-brand-green/5 px-4 py-2 rounded-xl border border-brand-green/20">
             Live Intelligence Filtered for You
           </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <OverviewCard 
                {...card} 
                onClick={() => setActiveTab(card.tab)} 
              />
            </motion.div>
          ))}
        </div>
      </div>

      <RoleLiveMap height={320} title="Volunteer Nearby Need Map" />
      
      {/* Quick Mission Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-white border border-slate-100 rounded-[3rem] p-10 shadow-sm space-y-8">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-xl text-indigo-500">
                <Target size={20} />
              </div>
              Suggested Missions for Today
            </h3>
            <div className="space-y-4">
              {[
                { title: "Medicines Delivery", area: "Sector 4", reward: "+50 pts", type: "Urgent", time: "2h ago", icon: Zap, color: "text-rose-500", bg: "bg-rose-50" },
                { title: "ID Verification Support", area: "Community Hall", reward: "+30 pts", type: "Social", time: "4h ago", icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-50" },
                { title: "Food Packet Distro", area: "Ward 4 East", reward: "+40 pts", type: "Regular", time: "6h ago", icon: Users, color: "text-brand-green", bg: "bg-brand-green/10" }
              ].map((mission, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all group cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 ${mission.bg} ${mission.color} rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                      <mission.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-brand-green transition-colors">{mission.title}</h4>
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">
                        <span className="flex items-center gap-1"><MapPin size={12} /> {mission.area}</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span>{mission.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                     <span className="text-xs font-black text-brand-green bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">{mission.reward}</span>
                     <button className="p-2 border border-slate-200 rounded-xl hover:bg-brand-green hover:text-white transition-all text-slate-400">
                       <ArrowRight size={16} />
                     </button>
                  </div>
                </div>
              ))}
            </div>
         </div>
         
         <div className="bg-slate-900 rounded-[3rem] p-10 text-white flex flex-col relative overflow-hidden group shadow-2xl">
            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-brand-green/20 rounded-full blur-[80px]"></div>
            <div className="relative z-10">
               <h3 className="text-2xl font-black tracking-tight mb-2">Volunteer Leaderboard</h3>
               <p className="text-slate-400 text-xs font-medium italic opacity-75 mb-10">Real-time ranking in Ward 4 Intelligence Network.</p>
               
               <div className="space-y-6">
                 {[
                   { name: "Suresh K.", rank: 1, score: "2.4k", avatar: "v1" },
                   { name: "Priya M.", rank: 2, score: "2.1k", avatar: "v2" },
                   { name: "You", rank: 3, score: "1.8k", avatar: "volunteer1", me: true },
                   { name: "Vikram R.", rank: 4, score: "1.5k", avatar: "v4" }
                 ].map((user, i) => (
                   <div key={i} className={`flex items-center justify-between p-4 rounded-2xl transition-all ${user.me ? 'bg-brand-green/20 border border-brand-green/30 scale-105' : 'hover:bg-white/5'}`}>
                      <div className="flex items-center gap-4">
                        <div className="text-xs font-black text-slate-500 w-4">#{user.rank}</div>
                        <div className="w-10 h-10 rounded-[1rem] overflow-hidden border border-white/10 shadow-lg">
                          <img src={`https://i.pravatar.cc/100?u=${user.avatar}`} alt="avatar" />
                        </div>
                        <div className={`text-sm font-bold ${user.me ? 'text-white' : 'text-slate-300'}`}>{user.name}</div>
                      </div>
                      <div className="text-[10px] font-black text-brand-green bg-white/5 px-2.5 py-1 rounded-lg uppercase tracking-widest">{user.score} pts</div>
                   </div>
                 ))}
               </div>
               
               <button onClick={() => setActiveTab("rewards")} className="w-full mt-12 py-4 bg-white/5 hover:bg-brand-green text-xs font-black uppercase tracking-[0.3em] rounded-2xl transition-all border border-white/10">
                 Full Leaderboard
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
