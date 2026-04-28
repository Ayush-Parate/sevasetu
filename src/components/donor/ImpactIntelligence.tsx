import React from "react";
import { motion } from "motion/react";
import { 
  BarChart2, 
  PieChart as PieChartIcon, 
  Map as MapIcon, 
  Target, 
  ShieldCheck,
  TrendingUp,
  Download,
  Filter
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const regionData = [
  { name: "Urban slums", value: 45, color: "#5D8D70" },
  { name: "Rural clusters", value: 30, color: "#FFB37B" },
  { name: "Tribal areas", value: 15, color: "#4f46e5" },
  { name: "Crisis zones", value: 10, color: "#ef4444" },
];

const impactTraction = [
  { day: "Mon", resolved: 120, reports: 150 },
  { day: "Tue", resolved: 140, reports: 145 },
  { day: "Wed", resolved: 180, reports: 190 },
  { day: "Thu", resolved: 160, reports: 170 },
  { day: "Fri", resolved: 210, reports: 220 },
  { day: "Sat", resolved: 190, reports: 200 },
  { day: "Sun", resolved: 150, reports: 160 },
];

export default function ImpactIntelligence() {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* Header with filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 leading-tight">Impact Intelligence</h1>
          <p className="text-slate-500 font-medium">Quantifying your social footprint across the SevaSetu network.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Filter size={14} /> Filter Insights
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-md">
            <Download size={14} /> Export CSR Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Geographic and Distribution */}
        <div className="lg:col-span-4 space-y-8">
          {/* Impact Distribution */}
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden">
             <div className="relative z-10">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Impact Distribution</h3>
                <p className="text-xs text-slate-500 mb-6 font-medium">Breakdown of support by region type</p>
                
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={regionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={8}
                        dataKey="value"
                      >
                        {regionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  {regionData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                       <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{item.name}</span>
                    </div>
                  ))}
                </div>
             </div>
          </div>

          {/* Social ROI Card */}
          <div className="bg-brand-green p-8 rounded-[32px] text-white shadow-xl shadow-brand-green/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Target size={120} />
              </div>
              <h3 className="text-lg font-bold mb-1 relative z-10">Social ROI (SROI)</h3>
              <p className="text-brand-peach/80 text-xs mb-8 relative z-10 font-medium tracking-wide italic">Verified by Platform OS</p>
              
              <div className="space-y-6 relative z-10">
                <div>
                   <span className="text-4xl font-black block tracking-tighter">1 : 4.8</span>
                   <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-peach/60 mt-1">Impact Multiplier</p>
                </div>
                <p className="text-sm leading-relaxed text-brand-peach/90 opacity-90">
                  Every $1 invested creates $4.80 in long-term community social value through reduced healthcare strain and increased educational retention.
                </p>
              </div>
          </div>
        </div>

        {/* Right Column: Dynamic Traction and Detail Views */}
        <div className="lg:col-span-8 space-y-8">
          {/* Impact Velocity Chart */}
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
             <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-slate-900">Need Resolution Velocity</h3>
                  <p className="text-sm text-slate-500">How fast reported community needs are solved</p>
                </div>
                <div className="flex bg-slate-50 p-1 rounded-xl">
                   <button className="px-4 py-1.5 bg-white text-[10px] font-bold rounded-lg shadow-sm">Weekly</button>
                   <button className="px-4 py-1.5 text-[10px] font-bold text-slate-400">Monthly</button>
                </div>
             </div>

             <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={impactTraction}>
                    <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                    />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
                    />
                    <Bar 
                      dataKey="resolved" 
                      fill="#5D8D70" 
                      radius={[6, 6, 0, 0]} 
                      barSize={32}
                    />
                    <Bar 
                      dataKey="reports" 
                      fill="#f1f5f9" 
                      radius={[6, 6, 0, 0]} 
                      barSize={32}
                    />
                  </BarChart>
                </ResponsiveContainer>
             </div>
             
             <div className="flex items-center gap-6 mt-8 pt-8 border-t border-slate-100">
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full bg-brand-green"></div>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Needs Resolved</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Unresolved Intake</span>
                </div>
             </div>
          </div>

          {/* Strategic KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4">
                <div className="p-3 bg-brand-peach text-brand-orange rounded-2xl">
                   <TrendingUp size={24} />
                </div>
                <div>
                   <h4 className="text-xl font-bold text-slate-900 tracking-tight">82% Retained</h4>
                   <p className="text-sm text-slate-500 font-medium">Beneficiaries transitioned to long-term stability programs.</p>
                </div>
             </div>
             <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                   <ShieldCheck size={24} />
                </div>
                <div>
                   <h4 className="text-xl font-bold text-slate-900 tracking-tight">100% Audit-Pass</h4>
                   <p className="text-sm text-slate-500 font-medium">Verified proof of work for every resource unit deployed.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
