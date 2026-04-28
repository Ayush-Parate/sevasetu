import React from "react";
import { motion } from "motion/react";
import { 
  Activity, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  BarChart3, 
  Target, 
  Zap, 
  AlertTriangle,
  History,
  FileText,
  Calendar,
  Layers
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { useToast } from "../Toast";

const SPEED_DATA = [
  { time: '08:00', speed: 12 },
  { time: '10:00', speed: 34 },
  { time: '12:00', speed: 15 },
  { time: '14:00', speed: 45 },
  { time: '16:00', speed: 22 },
  { time: '18:00', speed: 18 },
  { time: '20:00', speed: 10 },
];

const ACCURACY_DATA = [
  { name: 'Ward 1', acc: 98 },
  { name: 'Ward 2', acc: 88 },
  { name: 'Ward 3', acc: 99 },
  { name: 'Ward 4', acc: 94 },
  { name: 'Ward 5', acc: 96 },
];

export default function VerificationAnalytics() {
  const { showToast } = useToast();
  return (
    <div className="space-y-12 animate-in fade-in zoom-in-95 duration-1000">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 px-4">
         <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">Verification Intelligence Analytics</h1>
            <p className="text-slate-500 font-medium italic mt-1 opacity-75 leading-relaxed font-serif">Quantifying system integrity, resolution velocity, and decision precision across all sectors.</p>
         </div>
         <div className="flex items-center gap-4 bg-white px-8 py-4 rounded-[2.5rem] border border-slate-100 shadow-sm shrink-0">
            <div className="text-center px-4">
               <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Precision</div>
               <div className="text-2xl font-black text-slate-900 tracking-tighter">99.8%</div>
            </div>
            <div className="w-px h-10 bg-slate-100"></div>
            <div className="text-center px-4">
               <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Integrity</div>
               <div className="text-2xl font-black text-brand-green tracking-tighter">98.2</div>
            </div>
            <div className="w-px h-10 bg-slate-100"></div>
            <div className="p-3 bg-brand-green text-white rounded-xl shadow-lg shadow-brand-green/20">
               <Target size={20} />
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
         {/* Main Chart Area */}
         <div className="xl:col-span-2 space-y-10">
            {/* Speed Velocity Chart */}
            <div className="bg-white border border-slate-100 p-12 rounded-[4rem] shadow-sm relative overflow-hidden group">
               <div className="flex justify-between items-center mb-12">
                  <div className="space-y-1">
                     <h3 className="text-2xl font-black text-slate-900 tracking-tight">Resolution Velocity Trace</h3>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic flex items-center gap-2 italic">
                        <Clock size={12} className="text-brand-green" /> Real-time Decision Latency (Minutes)
                     </p>
                  </div>
                   <div className="flex gap-4">
                      <button onClick={() => showToast("Exporting comprehensive verification report (PDF)...", "info")} className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
                         <FileText size={14} /> Export Verification Report
                      </button>
                      <button onClick={() => showToast("Generating monthly trust summary index...", "info")} className="px-6 py-3 bg-slate-100 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all font-bold">
                         Monthly Trust Summary
                      </button>
                   </div>
                </div>
               
               <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={SPEED_DATA}>
                        <defs>
                           <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#5D8D70" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#5D8D70" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                          dataKey="time" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fontWeight: 900, fill: '#64748b' }}
                          dy={10}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fontWeight: 900, fill: '#64748b' }}
                          dx={-10}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            borderRadius: '24px', 
                            border: 'none', 
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                            fontSize: '12px',
                            fontWeight: '900',
                            padding: '16px'
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="speed" 
                          stroke="#5D8D70" 
                          strokeWidth={6}
                          fillOpacity={1} 
                          fill="url(#colorSpeed)" 
                          animationDuration={2000}
                        />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </div>

            {/* Ward-wise Accuracy Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
               <div className="bg-slate-950 rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute right-0 top-0 p-12 opacity-5 rotate-12 -translate-y-4">
                     <CheckCircle2 size={150} />
                  </div>
                  <div className="relative z-10 space-y-10 h-full flex flex-col justify-between">
                     <div className="space-y-4">
                        <h4 className="text-2xl font-black italic tracking-tighter uppercase">Regional Accuracy Index</h4>
                        <p className="text-slate-400 text-xs font-medium italic opacity-75 font-serif leading-relaxed">
                           "Tracking the precision of verification consensus across distinct administrative zones."
                        </p>
                     </div>
                     <div className="h-[200px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                           <BarChart data={ACCURACY_DATA}>
                              <Bar dataKey="acc" radius={[10, 10, 0, 0]}>
                                 {ACCURACY_DATA.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.acc > 95 ? '#5D8D70' : '#475569'} />
                                 ))}
                              </Bar>
                              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff' }} />
                           </BarChart>
                        </ResponsiveContainer>
                     </div>
                  </div>
               </div>

               <div className="bg-white border border-slate-100 rounded-[3.5rem] p-12 shadow-sm relative overflow-hidden group">
                  <div className="flex justify-between items-center mb-10">
                     <h4 className="text-xl font-black text-slate-900 tracking-tight italic uppercase">Top Verifier Nodes</h4>
                     <TrendingUp size={20} className="text-brand-green" />
                  </div>
                  <div className="space-y-4">
                     {[
                       { name: "Vanguard 04-A", rank: 1, score: 994, pts: "+1,200" },
                       { name: "TrustUnit-Delta", rank: 2, score: 981, pts: "+940" },
                       { name: "Echo-Sector-2", rank: 3, score: 965, pts: "+820" },
                       { name: "FieldSentinel-1", rank: 4, score: 940, pts: "+450" },
                     ].map((v, i) => (
                        <div key={i} className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-white hover:shadow-xl transition-all group/item">
                           <div className="flex items-center gap-6">
                              <span className="text-[10px] font-black italic text-slate-400">#{v.rank}</span>
                              <div className="text-sm font-bold text-slate-700 italic group-hover/item:text-slate-900 transition-colors uppercase">{v.name}</div>
                           </div>
                           <div className="text-right">
                              <div className="text-lg font-black text-brand-green tracking-tighter">{v.score}</div>
                              <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{v.pts} Points</div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         {/* Sidebar Stats & Info */}
         <div className="xl:col-span-1 space-y-10">
            <div className="bg-brand-green text-white p-12 rounded-[4.5rem] shadow-2xl relative overflow-hidden group">
               <div className="absolute bottom-0 right-0 p-20 opacity-10 rotate-12">
                  <Activity size={200} />
               </div>
               <div className="relative z-10 space-y-12">
                  <div className="space-y-4">
                     <h3 className="text-3xl font-black tracking-tighter leading-none italic uppercase">System Integrity Matrix</h3>
                     <p className="text-brand-green-50 text-sm italic font-medium opacity-80 leading-relaxed font-serif">
                        "Real-time diagnostic of the platform's trust architecture and verification throughput."
                     </p>
                  </div>

                  <div className="space-y-8">
                     {[
                       { label: "AI Contribution", value: "82%", icon: Zap, color: "text-amber-300" },
                       { label: "Manual Override", value: "18%", icon: AlertTriangle, color: "text-rose-200" },
                       { label: "Duplicate Blocked", value: "1,240", icon: Layers, color: "text-blue-200" },
                       { label: "Verified Claims", value: "8.4k", icon: FileText, color: "text-emerald-200" },
                     ].map((stat, i) => (
                        <div key={i} className="flex items-center gap-8 group/stat cursor-help">
                           <div className={`p-4 bg-white/10 rounded-2xl border border-white/10 shadow-inner ${stat.color} group-hover/stat:rotate-12 transition-transform`}>
                              <stat.icon size={28} />
                           </div>
                           <div>
                              <div className="text-4xl font-black tracking-tighter">{stat.value}</div>
                              <div className="text-[10px] font-black uppercase tracking-widest opacity-60">{stat.label}</div>
                           </div>
                        </div>
                     ))}
                  </div>

                  <button className="w-full py-6 bg-white text-brand-green rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-slate-900 hover:text-white transition-all transform active:scale-95">
                     Full Performance Report v4.0
                  </button>
               </div>
            </div>

            <div className="bg-white border border-slate-100 p-12 rounded-[4rem] shadow-sm relative overflow-hidden group">
               <div className="flex justify-between items-center mb-8 px-2">
                  <h4 className="text-xl font-black italic text-slate-900 uppercase">Recent System Alerts</h4>
                  <Calendar size={18} className="text-slate-400" />
               </div>
               <div className="space-y-4">
                  {[
                    "Network Latency detected in Sector 2 Node: +120ms",
                    "Bulk Upload Verification (Ward 4) - Throttled (1k items)",
                    "Anomaly detection algorithm 'Phoenix' updated to v1.2",
                    "New NGO Trust audit requested: ReliefIndia Unit"
                  ].map((alert, i) => (
                     <div key={i} className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-50 italic text-[10px] font-bold text-slate-500 leading-relaxed hover:bg-slate-100 transition-all cursor-pointer">
                        <div className="w-2 h-2 rounded-full bg-brand-green shrink-0 mt-1 shadow-glow shadow-brand-green/20"></div>
                        {alert}
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
