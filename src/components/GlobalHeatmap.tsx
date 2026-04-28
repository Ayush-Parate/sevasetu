import React, { useState } from "react";
import {
  Map as MapIcon,
  AlertTriangle,
  Layers,
  Filter,
  Activity,
  Users,
  Siren,
  TrendingUp,
  Navigation,
  ArrowRight,
  ShieldAlert,
  Flame,
  Droplets,
  HeartPulse,
  GraduationCap,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

const trendData = [
  { day: "Mon", urgent: 120, resolved: 80 },
  { day: "Tue", urgent: 150, resolved: 90 },
  { day: "Wed", urgent: 110, resolved: 110 },
  { day: "Thu", urgent: 180, resolved: 140 },
  { day: "Fri", urgent: 220, resolved: 170 },
  { day: "Sat", urgent: 190, resolved: 190 },
  { day: "Sun", urgent: 130, resolved: 160 },
];

const layers = [
  { id: "severity", label: "Need Severity", color: "bg-rose-500" },
  { id: "volunteer", label: "Volunteer Availability", color: "bg-indigo-500" },
  { id: "ngo", label: "NGO Coverage", color: "bg-brand-green" },
  { id: "disaster", label: "Disaster Alert", color: "bg-amber-500" },
  { id: "health", label: "Health Emergency", color: "bg-rose-600" },
  { id: "water", label: "Water/Food Crisis", color: "bg-cyan-500" },
  { id: "women", label: "Women Safety", color: "bg-fuchsia-500" },
  { id: "child", label: "Child Welfare", color: "bg-emerald-500" },
  { id: "elderly", label: "Elderly Support", color: "bg-blue-500" },
  { id: "education", label: "Education Zones", color: "bg-violet-500" },
];

const liveActivities = [
  {
    time: "1m ago",
    action: "New urgent report created",
    location: "Ward 4, North District",
    type: "urgent",
  },
  {
    time: "3m ago",
    action: "Volunteer squad deployed",
    location: "Central Sector",
    type: "info",
  },
  {
    time: "8m ago",
    action: "Crisis escalated to Level 3",
    location: "Flood Zone B",
    type: "critical",
  },
  {
    time: "12m ago",
    action: "NGO collaboration started",
    location: "East Medical Camp",
    type: "success",
  },
  {
    time: "15m ago",
    action: "Area marked resolved",
    location: "South Grid",
    type: "success",
  },
  {
    time: "22m ago",
    action: "Duplicate report merged",
    location: "System Auto",
    type: "info",
  },
];

export default function GlobalHeatmap() {
  const [activeLayer, setActiveLayer] = useState("severity");
  const [emergencyMode, setEmergencyMode] = useState(false);

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      <div className="mb-8">
        <h2 className="text-sm font-semibold tracking-widest text-brand-green uppercase mb-2">
          Platform Intelligence
        </h2>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-2">
          National Community Need Map
        </h1>
        <p className="text-slate-500 max-w-3xl leading-relaxed">
          Real-time visualization of urgent needs, active response zones, and
          unresolved community crises across regions.
        </p>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-rose-500/20 transition-all"></div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <AlertTriangle size={20} />
            </div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
              Critical Hotspots
            </h3>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-bold text-slate-900 tracking-tight">
              42
            </span>
            <span className="text-xs font-bold text-rose-500 flex items-center">
              <ArrowRight size={12} className="-rotate-45" /> +12%
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Top: District 4, North Zone
          </p>
          <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-colors border border-slate-100 flex items-center justify-center gap-1">
            View Critical Regions <ArrowRight size={14} />
          </button>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-500/20 transition-all"></div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Layers size={20} />
            </div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
              Unresolved Clusters
            </h3>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-bold text-slate-900 tracking-tight">
              128
            </span>
            <span className="text-xs font-medium text-slate-500">
              pending blocks
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-4">24 repeated warnings</p>
          <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-colors border border-slate-100 flex items-center justify-center gap-1">
            Cluster Analysis <ArrowRight size={14} />
          </button>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/20 transition-all"></div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Users size={20} />
            </div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
              Coverage Gap
            </h3>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-bold text-slate-900 tracking-tight">
              8
            </span>
            <span className="text-xs font-medium text-slate-500">
              zero-response zones
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Low density in East Sector
          </p>
          <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-colors border border-slate-100 flex items-center justify-center gap-1">
            View Coverage Gaps <ArrowRight size={14} />
          </button>
        </div>

        {/* Card 4 */}
        <div className="bg-slate-900 p-6 rounded-3xl shadow-lg relative overflow-hidden group border border-slate-800">
          <div className="absolute right-0 top-0 w-32 h-32 bg-rose-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
              <Siren size={20} />
            </div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
              Emergency Alerts
            </h3>
          </div>
          <div className="flex items-baseline gap-2 mb-1 relative z-10">
            <span className="text-3xl font-bold text-white tracking-tight">
              3
            </span>
            <span className="text-xs font-bold text-rose-400">
              ACTIVE DISASTERS
            </span>
          </div>
          <p className="text-xs text-slate-400 mb-4 relative z-10">
            Flood alerts in Coastal Zones
          </p>
          <button className="w-full py-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 relative z-10 shadow-lg shadow-rose-500/20">
            Open Response <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left: Live Activity Feed */}
        <div className="xl:w-72 bg-white rounded-3xl border border-slate-100 shadow-sm p-5 flex flex-col h-[700px]">
          <div className="flex items-center gap-2 mb-6 shrink-0">
            <Activity className="text-brand-green" size={20} />
            <h3 className="font-bold text-slate-900 tracking-tight">
              Live Action Feed
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
            {liveActivities.map((act, i) => (
              <div
                key={i}
                className="relative pl-4 border-l-2 border-slate-100 pb-2"
              >
                <div
                  className={`absolute -left-1.5 top-0 w-3 h-3 rounded-full border-2 border-white ${
                    act.type === "urgent"
                      ? "bg-amber-500"
                      : act.type === "critical"
                        ? "bg-rose-500"
                        : act.type === "success"
                          ? "bg-brand-green"
                          : "bg-indigo-500"
                  }`}
                ></div>
                <div className="text-xs font-bold text-slate-800 mb-0.5">
                  {act.action}
                </div>
                <div className="text-xs text-slate-500 flex justify-between">
                  <span>{act.location}</span>
                  <span className="text-[10px] font-medium text-slate-400">
                    {act.time}
                  </span>
                </div>
              </div>
            ))}
            {/* Gradient fade at bottom */}
            <div className="sticky bottom-0 h-10 bg-gradient-to-t from-white to-transparent"></div>
          </div>
        </div>

        {/* Center: Interactive Map */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Map Controls */}
          <div className="bg-slate-900 rounded-3xl p-4 flex flex-wrap items-center justify-between gap-4 border border-slate-800 shadow-lg relative z-20">
            <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1 flex-1">
              {layers.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-2 ${
                    activeLayer === layer.id
                      ? "bg-slate-800 text-white border-slate-600"
                      : "bg-slate-900/50 text-slate-400 border-slate-800 hover:text-slate-300"
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${layer.color}`}></div>
                  {layer.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setEmergencyMode(!emergencyMode)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg shrink-0 ${
                emergencyMode
                  ? "bg-rose-600 text-white shadow-rose-600/30"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <ShieldAlert size={14} /> Crisis Mode{" "}
              {emergencyMode ? "ON" : "OFF"}
            </button>
          </div>

          {/* Map Visualization Area */}
          <div
            className={`flex-1 rounded-3xl border shadow-inner relative overflow-hidden transition-all duration-700 ${
              emergencyMode
                ? "bg-slate-950 border-rose-900/50"
                : "bg-slate-900 border-slate-800"
            }`}
          >
            {/* Map Grid Background */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(#94a3b8 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            ></div>

            {/* Simulated Map Regions and Blurs */}
            <div
              className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[100px] transition-colors duration-1000 ${emergencyMode ? "bg-rose-600/30" : "bg-brand-green/10"}`}
            ></div>
            <div
              className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px] transition-colors duration-1000 ${emergencyMode ? "bg-rose-900/40" : "bg-indigo-500/10"}`}
            ></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2"></div>

            {/* Markers */}
            <div className="absolute top-[30%] left-[40%] flex flex-col items-center">
              <div className="w-5 h-5 bg-rose-500 rounded-full shadow-[0_0_0_8px_rgba(244,63,94,0.3)] animate-pulse"></div>
              <div className="bg-slate-900/90 backdrop-blur border border-slate-700 px-3 py-1.5 rounded-lg mt-3 text-center shadow-xl">
                <div className="text-white text-xs font-bold">
                  Severity: Critical
                </div>
                <div className="text-slate-400 text-[10px]">
                  Medical Emergency
                </div>
              </div>
            </div>

            <div className="absolute top-[60%] left-[25%] flex flex-col items-center">
              <div
                className={`w-4 h-4 rounded-full shadow-[0_0_0_6px_rgba(245,158,11,0.2)] ${emergencyMode ? "bg-amber-600/20 shadow-none" : "bg-amber-500"}`}
              ></div>
              {!emergencyMode && (
                <div className="text-amber-500 text-[10px] font-bold mt-2 bg-slate-900/50 px-2 py-0.5 rounded backdrop-blur">
                  High Priority
                </div>
              )}
            </div>

            <div className="absolute top-[45%] left-[70%] flex flex-col items-center">
              <div
                className={`w-3 h-3 rounded-full ${emergencyMode ? "bg-slate-800" : "bg-brand-green shadow-[0_0_0_4px_rgba(16,185,129,0.2)]"}`}
              ></div>
            </div>

            <div className="absolute top-[20%] left-[60%] flex flex-col items-center">
              <div className="w-6 h-6 bg-rose-600 rounded-full shadow-[0_0_0_10px_rgba(225,29,72,0.4)] animate-pulse flex items-center justify-center text-white">
                <Flame size={12} />
              </div>
              <div className="bg-rose-900/90 border border-rose-500 px-3 py-1.5 rounded-lg mt-4 text-center shadow-xl animate-pulse">
                <div className="text-white text-xs font-bold tracking-widest uppercase">
                  Disaster Level 4
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Filters */}
        <div className="xl:w-72 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col h-[700px] overflow-y-auto custom-scrollbar">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="text-slate-400" size={20} />
            <h3 className="font-bold text-slate-900 tracking-tight">
              Intelligence Filters
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                Location Scope
              </label>
              <select className="w-full bg-slate-50 border border-slate-100 text-slate-700 text-sm font-semibold rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green/20 mb-3">
                <option>Maharashtra</option>
                <option>Gujarat</option>
                <option>Karnataka</option>
              </select>
              <select className="w-full bg-slate-50 border border-slate-100 text-slate-700 text-sm font-semibold rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green/20">
                <option>All Districts</option>
                <option>Mumbai Suburban</option>
                <option>Pune</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                Need Category
              </label>
              <div className="space-y-2">
                {[
                  "Food Resupply",
                  "Health & Medical",
                  "Disaster Relief",
                  "Sanitation",
                ].map((cat, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded text-brand-green focus:ring-brand-green border-slate-300"
                      defaultChecked={i < 2}
                    />
                    <span className="text-sm font-semibold text-slate-700">
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                Urgency Level
              </label>
              <div className="flex flex-wrap gap-2">
                {["Critical", "High", "Medium", "Low"].map((level) => (
                  <button
                    key={level}
                    className="flex-1 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg">
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* District Analytics */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold tracking-tight text-slate-900 text-xl">
              District Performance & Analytics
            </h3>
            <button className="text-sm font-bold text-brand-green hover:underline flex items-center gap-1">
              Full Report <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                Need Density
              </div>
              <div className="text-2xl font-bold text-slate-900">High</div>
              <div className="text-xs text-rose-500 font-medium mt-1">
                45 active zones
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                Avg Response
              </div>
              <div className="text-2xl font-bold text-slate-900">14 mins</div>
              <div className="text-xs text-emerald-500 font-medium mt-1">
                -2m from baseline
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                Volunteer Base
              </div>
              <div className="text-2xl font-bold text-slate-900">4,200</div>
              <div className="text-xs text-brand-green font-medium mt-1">
                82% utilization
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                Unresolved Reports
              </div>
              <div className="text-2xl font-bold text-slate-900">128</div>
              <div className="text-xs text-slate-500 font-medium mt-1">
                Last 24 hours
              </div>
            </div>
          </div>
        </div>

        {/* Trend Graph */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
          <h3 className="font-bold tracking-tight text-slate-900 text-xl mb-6">
            Crisis Evolution Trend
          </h3>
          <div className="flex-1 min-h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={trendData}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUrgent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorResolvedGraph"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  dy={10}
                />
                <RechartsTooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #f1f5f9",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="urgent"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorUrgent)"
                />
                <Area
                  type="monotone"
                  dataKey="resolved"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorResolvedGraph)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
