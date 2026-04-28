import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  HeartHandshake,
  ShieldCheck,
  Download,
  Calendar,
  FileText,
  Target,
  Percent,
  ChevronRight,
  TrendingDown,
  ArrowUpRight,
  Activity,
  Layers,
} from "lucide-react";
import { motion } from "motion/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { name: "Jan", impact: 1200, efficiency: 85 },
  { name: "Feb", impact: 1900, efficiency: 88 },
  { name: "Mar", impact: 1500, efficiency: 92 },
  { name: "Apr", impact: 2400, efficiency: 90 },
  { name: "May", impact: 2800, efficiency: 94 },
  { name: "Jun", impact: 3450, efficiency: 96 },
];

export default function NGOAnalyticsImpact() {
  const [activeMetric, setActiveMetric] = useState<"impact" | "efficiency">(
    "impact"
  );

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="text-emerald-500" size={20} />
            <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase">
              Impact Intelligence
            </h2>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
            Performance & Reach Analytics
          </h1>
          <p className="text-slate-500 max-w-2xl text-sm leading-relaxed">
            Quantify mission success through granular tracking of lives reached,
            response velocity, and volunteer efficiency. This data powers your
            CSR Transparency reports.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors">
            <FileText size={16} /> Monthly Summary
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
            <Download size={16} /> Export CSR Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "People Helped",
            value: "3,450",
            sub: "+12% Monthly",
            icon: HeartHandshake,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "Resolution Speed",
            value: "14.2m",
            sub: "-2.4m Improvement",
            icon: Activity,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
          },
          {
            label: "Vol. Performance",
            value: "4.8/5",
            sub: "Top Tier Consistency",
            icon: Users,
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
          {
            label: "Repeat Issues",
            value: "-15%",
            sub: "Reduction in wards",
            icon: Target,
            color: "text-rose-600",
            bg: "bg-rose-50",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group"
          >
            <div
              className={`absolute top-0 right-0 w-20 h-20 ${stat.bg} rounded-full blur-2xl -translate-y-1/2 translate-x-1/2`}
            ></div>
            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4 relative z-10`}>
              <stat.icon size={20} />
            </div>
            <div className="text-3xl font-black text-slate-900 mb-1 relative z-10">
              {stat.value}
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 relative z-10">
              {stat.label}
            </div>
            <div className={`text-xs font-bold leading-none ${stat.color} relative z-10`}>
              {stat.sub}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h3 className="text-xl font-black text-slate-900 border-b-4 border-brand-green/30 pb-1 inline-block">
                  Growth & Efficiency Trends
                </h3>
              </div>
              <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100">
                <button
                  onClick={() => setActiveMetric("impact")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeMetric === "impact"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  Reach
                </button>
                <button
                  onClick={() => setActiveMetric("efficiency")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeMetric === "efficiency"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  Efficiency
                </button>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 700 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 700 }}
                  />
                  <Tooltip
                    cursor={{ fill: "#f8fafc" }}
                    contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                  />
                  <Bar
                    dataKey={activeMetric === "impact" ? "impact" : "efficiency"}
                    radius={[10, 10, 10, 10]}
                    barSize={40}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === data.length - 1 ? "#10b981" : "#e2e8f0"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 p-8 rounded-3xl text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
               <h4 className="text-xs font-black uppercase tracking-[0.2em] text-brand-green mb-4">
                 Top Area Insight
               </h4>
               <div className="text-2xl font-black mb-2">North District</div>
               <p className="text-slate-400 text-sm leading-relaxed mb-6">
                 Issue resolution speed improved by 24% after dispatching the coordinator team to sector 2.
               </p>
               <div className="flex items-center gap-4">
                 <div className="flex-1">
                   <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Impact Level</div>
                   <div className="h-1.5 bg-slate-800 rounded-full">
                     <div className="h-full bg-brand-green w-[85%] rounded-full shadow-[0_0_10px_2px_rgba(16,185,129,0.3)]"></div>
                   </div>
                 </div>
                 <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                   <TrendingUp size={20} className="text-brand-green" />
                 </div>
               </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                   Platform Trust Signal
                 </h4>
                 <div className="flex items-center gap-4 mb-4">
                   <div className="text-4xl font-black text-slate-900 tracking-tighter">94</div>
                   <div className="text-xs font-bold text-slate-500 leading-tight">
                     PLATFORM <br/> TRUST SCORE
                   </div>
                 </div>
                 <div className="text-xs text-slate-400 leading-relaxed italic">
                   "Organization ranks in top 5% for response fidelity and transparency."
                 </div>
              </div>
              <button className="w-full mt-6 py-3 bg-slate-100 text-slate-900 text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-slate-200 transition-all">
                View Badge Details
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Calendar className="text-brand-green" size={18} /> Impact Milestones
            </h3>
            <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-50">
              {[
                { date: "May 24", title: "Resolved Sector 4 Crisis", impact: "1.2k lives", icon: ShieldCheck, color: "text-emerald-500" },
                { date: "May 12", title: "Mass Mobilization High", impact: "240 volunteers", icon: Users, color: "text-indigo-500" },
                { date: "Apr 28", title: "Transparency Audit Pass", impact: "Score 96.4", icon: FileText, color: "text-amber-500" },
              ].map((m, i) => (
                <div key={i} className="relative pl-8">
                   <div className={`absolute left-0 top-1 p-1 rounded-full ${m.color} bg-white border border-slate-100 z-10 shadow-sm`}>
                     <m.icon size={10} />
                   </div>
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{m.date}</div>
                   <div className="text-sm font-bold text-slate-900 leading-none mb-1">{m.title}</div>
                   <div className="text-xs font-bold text-brand-green">{m.impact}</div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3.5 bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-100 transition-all flex items-center justify-center gap-2">
              View Activity Log <ChevronRight size={14} />
            </button>
          </div>

          <div className="bg-brand-green p-6 rounded-3xl shadow-xl relative overflow-hidden text-white">
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 blur-2xl rounded-full"></div>
            <h3 className="text-lg font-black mb-4 flex items-center gap-2">
              <ShieldCheck /> CSR Transparency
            </h3>
            <p className="text-white/80 text-xs leading-relaxed mb-6">
              Your impact reports are fully compliant with standard CSR audit protocols. Generate a verified export for sponsors.
            </p>
            <button className="w-full py-3 bg-white text-emerald-700 text-xs font-black uppercase tracking-widest rounded-2xl hover:brightness-105 transition-all shadow-lg flex items-center justify-center gap-2">
              <Download size={14} /> Download CSR Kit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
