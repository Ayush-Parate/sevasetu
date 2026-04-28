import React, { useState } from "react";
import {
  BarChart as BarChartIcon,
  TrendingUp,
  Users,
  Activity,
  Map,
  Target,
  Zap,
  Download,
  Calendar,
  ArrowUpRight,
  Award,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

type Tab = "impact" | "intelligence" | "volunteers" | "ngos";

const impactData = [
  { month: "Jan", helped: 4000, resolved: 2400 },
  { month: "Feb", helped: 5500, resolved: 3100 },
  { month: "Mar", helped: 7200, resolved: 4800 },
  { month: "Apr", helped: 6800, resolved: 4100 },
  { month: "May", helped: 9500, resolved: 6500 },
  { month: "Jun", helped: 12400, resolved: 8200 },
];

const intelligenceData = [
  { category: "Medical", urgency: 85, volume: 1200 },
  { category: "Food", urgency: 65, volume: 2400 },
  { category: "Shelter", urgency: 92, volume: 800 },
  { category: "Education", urgency: 45, volume: 1500 },
  { category: "Rescue", urgency: 98, volume: 400 },
];

const volunteerData = [
  { name: "Active", value: 68, color: "#10b981" },
  { name: "Irregular", value: 22, color: "#f59e0b" },
  { name: "Inactive", value: 10, color: "#ef4444" },
];

const ngoRankings = [
  {
    id: 1,
    name: "Global Reach Initiative",
    speed: "14 mins",
    impact: 9.8,
    trust: 9.9,
    quality: "Exceptional",
  },
  {
    id: 2,
    name: "CareConnect Foundation",
    speed: "22 mins",
    impact: 9.5,
    trust: 9.7,
    quality: "High",
  },
  {
    id: 3,
    name: "Community First",
    speed: "45 mins",
    impact: 9.1,
    trust: 9.4,
    quality: "High",
  },
  {
    id: 4,
    name: "SafeHands NGO",
    speed: "1.2 hrs",
    impact: 8.8,
    trust: 9.0,
    quality: "Standard",
  },
  {
    id: 5,
    name: "Urban Relief",
    speed: "2.5 hrs",
    impact: 8.4,
    trust: 8.5,
    quality: "Standard",
  },
];

export default function PlatformAnalytics() {
  const [activeTab, setActiveTab] = useState<Tab>("impact");

  const renderGlobalImpact = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total People Helped",
            value: "248.5K",
            trend: "+12%",
            icon: Users,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
          },
          {
            label: "Critical Needs Resolved",
            value: "84.2K",
            trend: "+8.4%",
            icon: Target,
            color: "text-indigo-500",
            bg: "bg-indigo-50",
          },
          {
            label: "Avg Area Recovery Rate",
            value: "68%",
            trend: "+4.2%",
            icon: TrendingUp,
            color: "text-amber-500",
            bg: "bg-amber-50",
          },
          {
            label: "Volunteer Effectiveness",
            value: "92%",
            trend: "+1.5%",
            icon: Zap,
            color: "text-brand-green",
            bg: "bg-brand-green/10",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group"
          >
            <div
              className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity ${stat.bg}`}
            ></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight text-slate-900">
                  {stat.value}
                </span>
                <span className="text-sm font-semibold text-emerald-500 flex items-center gap-0.5">
                  <ArrowUpRight size={14} />
                  {stat.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm leading-none">
          <h3 className="font-bold tracking-tight text-slate-900 text-lg mb-6">
            Impact Trajectory & Resolution Trends
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={impactData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorHelped" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorResolved"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                  labelStyle={{
                    fontWeight: "bold",
                    color: "#0f172a",
                    marginBottom: "4px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="helped"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorHelped)"
                />
                <Area
                  type="monotone"
                  dataKey="resolved"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorResolved)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl shadow-sm text-white flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
          <Award size={48} className="text-amber-400 mb-4 relative z-10" />
          <h3 className="text-2xl font-bold tracking-tight mb-2 relative z-10">
            Top Performing Area
          </h3>
          <p className="text-brand-green font-bold uppercase tracking-widest text-sm mb-4 relative z-10">
            South District Sector 4
          </p>
          <p className="text-slate-400 text-sm leading-relaxed relative z-10">
            Demonstrated a 94% recovery rate over the last 30 days due to high
            volunteer engagement and swift medical distributions.
          </p>
        </div>
      </div>
    </div>
  );

  const renderIntelligenceTrends = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm leading-none flex flex-col">
        <h3 className="font-bold tracking-tight text-slate-900 text-lg mb-2">
          Rising Problem Categories
        </h3>
        <p className="text-slate-500 text-sm mb-6">
          Volume vs. Urgency by need category
        </p>
        <div className="flex-1 min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={intelligenceData}
              layout="vertical"
              margin={{ top: 0, right: 30, left: 20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="#f1f5f9"
              />
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <YAxis
                dataKey="category"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#475569", fontSize: 12, fontWeight: 600 }}
                width={80}
              />
              <Tooltip
                cursor={{ fill: "#f8fafc" }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #f1f5f9",
                }}
              />
              <Bar
                dataKey="volume"
                fill="#cbd5e1"
                radius={[0, 4, 4, 0]}
                barSize={20}
              />
              <Bar
                dataKey="urgency"
                fill="#10b981"
                radius={[0, 4, 4, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold tracking-tight text-slate-900 text-lg">
            City-Wise Problem Clusters
          </h3>
          <button className="text-brand-green text-sm font-semibold hover:underline">
            View Live Map
          </button>
        </div>
        <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-100 p-4 relative overflow-hidden flex items-center justify-center min-h-[300px]">
          {/* Mock Heatmap */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>

          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-rose-500/30 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-1/4 left-1/4 flex flex-col items-center">
            <div className="w-4 h-4 bg-rose-500 rounded-full shadow-[0_0_0_4px_rgba(244,63,94,0.2)]"></div>
            <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full mt-2 shadow-sm">
              Medical Surge
            </span>
          </div>

          <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-amber-500/30 rounded-full blur-2xl border border-slate-100 p-4 relative overflow-hidden flex items-center justify-center min-h-[300px]"></div>
          <div className="absolute bottom-1/3 right-1/4 flex flex-col items-center">
            <div className="w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_0_4px_rgba(245,158,11,0.2)]"></div>
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full mt-2 shadow-sm">
              Food Scarcity
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVolunteerAnalytics = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
        <h3 className="font-bold tracking-tight text-slate-900 text-lg mb-2">
          Retention Rate
        </h3>
        <p className="text-slate-500 text-sm mb-6">
          Volunteer engagement status
        </p>
        <div className="flex-1 flex flex-col items-center justify-center min-h-[250px]">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={volunteerData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {volunteerData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4 w-full">
            {volunteerData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-xs font-semibold text-slate-600">
                  {entry.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="font-bold tracking-tight text-slate-900 text-lg mb-6">
          Best-Performing Operational Areas
        </h3>
        <div className="space-y-4">
          {[
            {
              area: "North Central Grid",
              score: 98,
              trend: "+5%",
              status: "Peak Efficiency",
            },
            {
              area: "West End Slums",
              score: 92,
              trend: "+12%",
              status: "Rapidly Improving",
            },
            {
              area: "Eastern Suburbs",
              score: 85,
              trend: "-2%",
              status: "Stable",
            },
            {
              area: "South Port Region",
              score: 78,
              trend: "+1%",
              status: "Needs Support",
            },
          ].map((area, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
                  #{i + 1}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">
                    {area.area}
                  </h4>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">
                    {area.status}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold tracking-tight text-slate-900">
                  {area.score}
                  <span className="text-sm text-slate-400">/100</span>
                </div>
                <div
                  className={`text-xs font-bold ${area.trend.startsWith("+") ? "text-emerald-500" : "text-amber-500"}`}
                >
                  {area.trend} active volunteers
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNGORankings = () => (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Award size={20} className="text-amber-500" /> Top NGO Performers
        </h3>
        <button className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-sm font-semibold border border-slate-100 hover:bg-slate-100 transition-colors flex items-center gap-2">
          <Download size={16} /> Export Ranking Report
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-slate-50 text-xs text-slate-500 font-semibold border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Rank & Organization</th>
              <th className="px-6 py-4">Response Speed</th>
              <th className="px-6 py-4">Impact Score</th>
              <th className="px-6 py-4">Trust Score</th>
              <th className="px-6 py-4">Resolution Quality</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {ngoRankings.map((ngo, index) => (
              <tr
                key={ngo.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        index === 0
                          ? "bg-amber-100 text-amber-600"
                          : index === 1
                            ? "bg-slate-200 text-slate-600"
                            : index === 2
                              ? "bg-amber-50/50 text-amber-700/50"
                              : "bg-slate-50 text-slate-400"
                      }`}
                    >
                      #{index + 1}
                    </div>
                    <span className="text-sm font-bold text-slate-800">
                      {ngo.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-slate-700">
                    {ngo.speed}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-brand-green/10 text-brand-green text-xs font-bold rounded-lg">
                    {ngo.impact}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-sm font-bold text-slate-700">
                    <Shield size={14} className="text-emerald-500" />{" "}
                    {ngo.trust}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      ngo.quality === "Exceptional"
                        ? "text-indigo-600"
                        : ngo.quality === "High"
                          ? "text-emerald-600"
                          : "text-slate-500"
                    }`}
                  >
                    {ngo.quality}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      {/* Premium Analytics Banner */}
      <div className="bg-slate-900 rounded-3xl p-8 lg:p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-brand-green/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10 flex flex-col lg:flex-row gap-8 justify-between items-start lg:items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
              Platform Analytics
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Enterprise-grade intelligence summarizing global impact,
              predictive need trends, and high-level operational performance.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button className="px-6 py-3 bg-white text-slate-900 text-sm font-bold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-lg">
              <Download size={18} /> Export Analytics
            </button>
            <button className="px-6 py-3 bg-slate-800 text-white text-sm font-bold rounded-xl border border-slate-700 hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
              <Calendar size={18} /> Schedule Report
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl w-max overflow-x-auto custom-scrollbar">
        {[
          {
            id: "impact",
            label: "Global Impact Dashboard",
            icon: BarChartIcon,
          },
          {
            id: "intelligence",
            label: "Need Intelligence Trends",
            icon: Activity,
          },
          { id: "volunteers", label: "Volunteer Analytics", icon: Users },
          { id: "ngos", label: "NGO Performance Ranking", icon: Award },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <tab.icon
              size={18}
              className={activeTab === tab.id ? "text-brand-green" : ""}
            />{" "}
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "impact" && renderGlobalImpact()}
          {activeTab === "intelligence" && renderIntelligenceTrends()}
          {activeTab === "volunteers" && renderVolunteerAnalytics()}
          {activeTab === "ngos" && renderNGORankings()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
