import React from "react";
import { motion } from "motion/react";
import { 
  TrendingUp, 
  Users, 
  Target, 
  Globe, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";

const impactData = [
  { month: "Jan", impact: 4500, funding: 2400 },
  { month: "Feb", impact: 5200, funding: 3200 },
  { month: "Mar", impact: 6100, funding: 4100 },
  { month: "Apr", impact: 5800, funding: 3800 },
  { month: "May", impact: 7200, funding: 5200 },
  { month: "Jun", impact: 8500, funding: 6500 },
];

const sdgMetrics = [
  { goal: "No Poverty", percentage: 85, color: "#e5243b" },
  { goal: "Zero Hunger", percentage: 72, color: "#dda63a" },
  { goal: "Good Health", percentage: 94, color: "#4c9f38" },
  { goal: "Quality Education", percentage: 68, color: "#c5192d" },
];

export default function DonorOverview() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Impact Capital", value: "$4.2M", trend: "+12.5%", icon: Target, color: "text-brand-green", bg: "bg-brand-green/10" },
          { label: "Lives Impacted", value: "128,430", trend: "+5.2k", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "SDG Targets Hit", value: "18/24", trend: "On Track", icon: Globe, color: "text-orange-600", bg: "bg-orange-50" },
          { label: "Resolution Efficiency", value: "92%", trend: "Optimal", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Real-Time</span>
            </div>
            <h3 className="text-sm font-medium text-slate-500 mb-1">{stat.label}</h3>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
              <span className="text-xs font-bold text-brand-green pb-1">{stat.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Funding vs Impact Graph */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">Funding Deployment Velocity</h2>
              <p className="text-sm text-slate-500">Correlation between capital injection and field resolution</p>
            </div>
            <select className="bg-slate-50 border-none text-xs font-bold px-4 py-2 rounded-xl focus:ring-2 focus:ring-brand-green/20">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={impactData}>
                <defs>
                  <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5D8D70" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#5D8D70" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    fontSize: '12px',
                    fontWeight: 600
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="impact" 
                  stroke="#5D8D70" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorImpact)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SDG Contribution */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-2">SDG Alignment</h2>
          <p className="text-sm text-slate-500 mb-8">Strategic impact contribution across UN goals</p>
          
          <div className="space-y-6">
            {sdgMetrics.map((sdg) => (
              <div key={sdg.goal} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                  <span className="text-slate-500">{sdg.goal}</span>
                  <span className="text-slate-900">{sdg.percentage}%</span>
                </div>
                <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${sdg.percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: sdg.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-4 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em] mb-2 leading-relaxed text-center">
              Top Impact Driver
            </p>
            <p className="text-sm text-slate-600 text-center font-medium">
              Health initiatives in West Bengal solved 1,200+ acute cases this month.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recent Verification Logs */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">Proof of Execution (Verified)</h2>
            <button className="text-xs font-bold text-brand-green hover:underline">View Live Feed</button>
          </div>
          
          <div className="space-y-4">
            {[
              { title: "Nutrition Kits Dispatched", location: "Kolkata Slums", time: "2m ago", status: "Verified" },
              { title: "Mobile Clinic Session", location: "Sundarbans", time: "14m ago", status: "Verified" },
              { title: "Bridge School Funding", location: "Siliguri Rural", time: "45m ago", status: "Verified" },
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-brand-green shadow-sm group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{log.title}</h4>
                    <p className="text-[10px] text-slate-500 font-medium">{log.location} • {log.time}</p>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-slate-300 group-hover:text-brand-green transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* High Priority Sponsorships */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">Recommended for You</h2>
            <button className="text-xs font-bold text-brand-green hover:underline">Marketplace</button>
          </div>
          
          <div className="space-y-4">
            {[
              { NGO: "Asha Foundation", need: "Clean Water Grid", funding: "$45k", icon: "💧" },
              { NGO: "Udaan Trust", need: "Digital Literacy Lab", funding: "$22k", icon: "💻" },
            ].map((item, i) => (
              <div key={i} className="relative overflow-hidden group p-5 bg-brand-peach/20 rounded-2xl border border-brand-peach/50 transition-all hover:shadow-lg">
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{item.need}</h4>
                      <p className="text-[10px] text-brand-green font-bold uppercase tracking-widest leading-none">{item.NGO}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-900">{item.funding}</p>
                    <button className="text-[10px] bg-brand-green text-white px-3 py-1 rounded-full font-bold uppercase tracking-widest mt-1 hover:brightness-110">Sponsor</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
