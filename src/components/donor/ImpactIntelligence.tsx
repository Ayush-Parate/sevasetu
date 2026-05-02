import React, { useMemo } from "react";
import { motion } from "motion/react";
import {
  BarChart2,
  PieChart as PieChartIcon,
  Map as MapIcon,
  Target,
  ShieldCheck,
  TrendingUp,
  Download,
  Filter,
  RefreshCw,
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
} from "recharts";
import { getImpactSummary, type ImpactSummary } from "../../lib/api";
import { useAsync } from "../../lib/useAsync";

const FALLBACK_REGION = [
  { name: "Urban slums", value: 45, color: "#5D8D70" },
  { name: "Rural clusters", value: 30, color: "#FFB37B" },
  { name: "Tribal areas", value: 15, color: "#4f46e5" },
  { name: "Crisis zones", value: 10, color: "#ef4444" },
];

const FALLBACK_BAR = [
  { day: "Mon", resolved: 120, reports: 150 },
  { day: "Tue", resolved: 140, reports: 145 },
  { day: "Wed", resolved: 180, reports: 190 },
  { day: "Thu", resolved: 160, reports: 170 },
  { day: "Fri", resolved: 210, reports: 220 },
  { day: "Sat", resolved: 190, reports: 200 },
  { day: "Sun", resolved: 150, reports: 160 },
];

const COLORS = ["#5D8D70", "#FFB37B", "#4f46e5", "#ef4444", "#0891b2", "#64748b"];

function trendsToPie(summary: ImpactSummary | null) {
  const trends = summary?.areaImprovementTrends ?? [];
  if (!trends.length) return FALLBACK_REGION;
  const total = trends.reduce((s, t) => s + Math.max(0, t.dataPoints || 0), 0) || 1;
  return trends.slice(0, 6).map((t, i) => ({
    name: t.location || `Area ${i + 1}`,
    value: Math.round(((t.dataPoints || 0) / total) * 100),
    color: COLORS[i % COLORS.length],
  }));
}

export default function ImpactIntelligence() {
  const { data: summary, loading, error, reload } = useAsync(() => getImpactSummary());

  const regionData = useMemo(() => trendsToPie(summary), [summary]);

  const tractionBar = FALLBACK_BAR;

  const topVolunteers = summary?.volunteerPerformance?.slice(0, 4) ?? [];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 leading-tight">Impact Intelligence</h1>
          <p className="text-slate-500 font-medium">
            Live aggregates from <span className="font-mono text-xs">GET /impact-analytics/summary</span>.
          </p>
          {error ? (
            <p className="text-sm text-rose-600 mt-2">{error.message}</p>
          ) : loading ? (
            <p className="text-sm text-slate-400 mt-2">Loading metrics…</p>
          ) : null}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => void reload()}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
          >
            <RefreshCw size={14} /> Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Filter size={14} /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-md">
            <Download size={14} /> Export CSR Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tasks completed</p>
          <p className="text-3xl font-black text-slate-900 mt-2">{summary?.totals.tasksCompleted ?? "—"}</p>
        </motion.div>
        <motion.div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">People helped (metrics)</p>
          <p className="text-3xl font-black text-slate-900 mt-2">{summary?.totals.peopleHelped ?? "—"}</p>
        </motion.div>
        <motion.div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Avg response (h)</p>
          <p className="text-3xl font-black text-slate-900 mt-2">{summary?.averages.responseTimeHours ?? "—"}</p>
        </motion.div>
        <motion.div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Avg resolution (h)</p>
          <p className="text-3xl font-black text-slate-900 mt-2">{summary?.averages.resolutionTimeHours ?? "—"}</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                <PieChartIcon size={18} /> Area signals
              </h3>
              <p className="text-xs text-slate-500 mb-6 font-medium">
                From impact metric locations (fallback demo slice when empty).
              </p>

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
                        <Cell key={`cell-${entry.name}-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: "16px",
                        border: "none",
                        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                {regionData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-brand-green p-8 rounded-[32px] text-white shadow-xl shadow-brand-green/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Target size={120} />
            </div>
            <h3 className="text-lg font-bold mb-1 relative z-10">Volunteer throughput</h3>
            <p className="text-brand-peach/80 text-xs mb-8 relative z-10 font-medium tracking-wide italic">
              Top performers by completed assignments
            </p>

            <div className="space-y-4 relative z-10">
              {topVolunteers.length ? (
                topVolunteers.map((v) => (
                  <div key={v.volunteerId} className="flex justify-between text-xs border-b border-white/10 pb-2">
                    <span className="font-mono opacity-90 truncate max-w-[140px]">{v.volunteerId}</span>
                    <span className="font-bold">
                      {v.completedCount}/{v.assignedCount} · {v.successRate}%
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-brand-peach/90">No volunteer stats yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                  <BarChart2 size={22} /> Resolution velocity (sample week)
                </h3>
                <p className="text-sm text-slate-500">
                  Weekly chart is illustrative until time-series endpoints exist.
                </p>
              </div>
            </div>

            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tractionBar}>
                  <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }} />
                  <Tooltip
                    cursor={{ fill: "#f8fafc" }}
                    contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                  />
                  <Bar dataKey="resolved" fill="#5D8D70" radius={[6, 6, 0, 0]} barSize={32} />
                  <Bar dataKey="reports" fill="#f1f5f9" radius={[6, 6, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center gap-6 mt-8 pt-8 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-green" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Resolved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Reports</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-brand-peach text-brand-orange rounded-2xl">
                <TrendingUp size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 tracking-tight">Operational speed</h4>
                <p className="text-sm text-slate-500 font-medium">
                  Response {summary?.averages.responseTimeHours ?? "—"}h · Resolution{" "}
                  {summary?.averages.resolutionTimeHours ?? "—"}h from task timestamps.
                </p>
              </div>
            </div>
            <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 tracking-tight">Verified completions</h4>
                <p className="text-sm text-slate-500 font-medium">
                  {summary?.totals.tasksCompleted ?? 0} tasks marked completed in aggregation queries.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 flex gap-3 text-sm text-slate-600">
            <MapIcon className="shrink-0 text-slate-400" />
            <p>
              Area drill-down charts will use <span className="font-mono text-xs">/impact-analytics/area/:location</span>{" "}
              when wired to filters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
