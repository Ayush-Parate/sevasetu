import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  Clock,
  MapPin,
  Truck,
  User,
  Activity,
  BarChart3,
  TrendingUp,
  Award,
  ClipboardList,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useToast } from "./Toast";
import { listTasks, updateTaskStatus, type TaskRecord } from "../lib/api";
import { useAsync } from "../lib/useAsync";

/** Matches backend Joi `updateTaskStatusSchema`. */
const TASK_STATUSES = [
  "OPEN",
  "ASSIGNED",
  "ACCEPTED",
  "ON_WAY",
  "IN_PROGRESS",
  "COMPLETED",
  "VERIFIED",
  "BLOCKED",
] as const;

function formatStatus(status: string) {
  return status.replace(/_/g, " ");
}

function locationLabel(task: TaskRecord) {
  if (task.locationLat != null && task.locationLng != null) {
    return `${task.locationLat.toFixed(3)}, ${task.locationLng.toFixed(3)}`;
  }
  return "Location TBD";
}

function statusProgress(status: string) {
  const idx = TASK_STATUSES.indexOf(status as (typeof TASK_STATUSES)[number]);
  if (idx < 0) return 12;
  return ((idx + 1) / TASK_STATUSES.length) * 100;
}

export default function TaskTracker() {
  const { showToast } = useToast();
  const [activeSegment, setActiveSegment] = useState("live");
  const { data: tasks, loading, error, reload } = useAsync(listTasks);

  const filtered = useMemo(() => {
    const list = tasks ?? [];
    const archivedStates = new Set(["COMPLETED", "VERIFIED", "BLOCKED"]);
    return list.filter((t) =>
      activeSegment === "archived" ? archivedStates.has(t.status) : !archivedStates.has(t.status)
    );
  }, [tasks, activeSegment]);

  const stats = useMemo(() => {
    const list = tasks ?? [];
    const completed = list.filter((t) => /^(COMPLETED|VERIFIED)$/i.test(t.status)).length;
    const units = list.reduce((s, t) => s + (t.volunteerRequirement ?? 0), 0);
    const urgencyAvg =
      list.length > 0
        ? (
            list.reduce((s, t) => s + (typeof t.urgencyOverride === "number" ? t.urgencyOverride : 0), 0) /
            list.length
          ).toFixed(1)
        : "—";
    return {
      total: list.length,
      completed,
      units,
      urgencyAvg,
    };
  }, [tasks]);

  async function handleStatusChange(taskId: string, next: string) {
    try {
      await updateTaskStatus(taskId, next);
      showToast("Task status updated.", "success");
      await reload();
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Unable to update task", "error");
    }
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: "Tasks tracked",
            val: loading ? "…" : String(stats.total),
            icon: ClipboardList,
            color: "text-brand-green",
          },
          {
            label: "Completed / verified",
            val: loading ? "…" : String(stats.completed),
            icon: Activity,
            color: "text-blue-500",
          },
          {
            label: "Volunteer slots (sum)",
            val: loading ? "…" : String(stats.units),
            icon: Clock,
            color: "text-amber-500",
          },
          {
            label: "Avg urgency override",
            val: loading ? "…" : String(stats.urgencyAvg),
            icon: Award,
            color: "text-rose-500",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-4 hover:shadow-xl transition-all"
          >
            <div className={`w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center ${stat.color}`}>
              <stat.icon size={22} />
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-black text-slate-900 tracking-tighter">{stat.val}</div>
              <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 px-4">
        <button
          type="button"
          onClick={() => void reload()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest"
        >
          <RefreshCw size={14} /> Sync tasks
        </button>
        {error ? <span className="text-xs text-rose-600 font-semibold">{error.message}</span> : null}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        <div className="xl:col-span-2 space-y-10">
          <div className="flex justify-between items-center px-4">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase flex items-center gap-3">
              Execution pipeline <ClipboardList size={22} className="text-brand-green" />
            </h3>
            <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100 shadow-inner">
              {["live", "archived"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveSegment(t)}
                  className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeSegment === t ? "bg-slate-900 text-white shadow-xl" : "text-slate-400"
                  }`}
                >
                  {t} tasks
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((task, i) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white p-10 rounded-[4rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-50">
                    <div
                      className="h-full bg-brand-green transition-all duration-1000"
                      style={{ width: `${statusProgress(task.status)}%` }}
                    />
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
                    <div className="flex items-center gap-8">
                      <div
                        className={`w-20 h-20 rounded-[2.5rem] flex items-center justify-center shrink-0 shadow-inner group-hover:rotate-12 transition-transform ${
                          task.status === "VERIFIED"
                            ? "bg-brand-green/10 text-brand-green"
                            : task.status === "IN_PROGRESS"
                              ? "bg-blue-50 text-blue-500"
                              : "bg-slate-50 text-slate-400"
                        }`}
                      >
                        {task.status === "COMPLETED" || task.status === "VERIFIED" ? (
                          <CheckCircle2 size={32} />
                        ) : (
                          <Truck size={32} />
                        )}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className="text-[10px] font-black text-brand-green uppercase tracking-[0.2em]">
                            {formatStatus(task.status)}
                          </span>
                          <div className="w-1.5 h-1.5 bg-slate-100 rounded-full" />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">
                            {task.id}
                          </span>
                        </div>
                        <h4 className="text-2xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">
                          {task.title}
                        </h4>
                        {task.description ? (
                          <p className="text-xs text-slate-500 mt-2 font-medium line-clamp-2">{task.description}</p>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-10">
                      <div className="text-center">
                        <div className="text-2xl font-black text-slate-900 tracking-tighter">
                          {task.volunteerRequirement ?? 0}
                        </div>
                        <div className="text-[8px] font-black uppercase tracking-widest text-slate-400">
                          Volunteer slots
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-black text-slate-900 tracking-tighter">
                          {typeof task.urgencyOverride === "number" ? task.urgencyOverride : "—"}
                        </div>
                        <div className="text-[8px] font-black uppercase tracking-widest text-slate-400">
                          Urgency
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-slate-50">
                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                          <User size={14} />
                        </div>
                        <span className="text-[11px] font-bold text-slate-700 italic">
                          {task.assignee?.fullName ?? "Unassigned"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                          <MapPin size={14} />
                        </div>
                        <span className="text-[11px] font-bold text-slate-700 italic">{locationLabel(task)}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 items-center">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        Status
                        <select
                          value={task.status}
                          onChange={(e) => void handleStatusChange(task.id, e.target.value)}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[10px] font-bold text-slate-800"
                        >
                          {TASK_STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {formatStatus(s)}
                            </option>
                          ))}
                        </select>
                      </label>
                      <button
                        type="button"
                        onClick={() => showToast("Timeline audit hooks to task history when exposed.", "info")}
                        className="px-6 py-3 bg-slate-50 text-slate-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all"
                      >
                        Audit trail
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {!loading && filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-3">
                <AlertCircle size={32} />
                <p className="text-sm font-semibold">No tasks in this segment.</p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="space-y-10">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight italic px-4 uppercase">Signals</h3>

          <div className="bg-slate-900 p-12 rounded-[5rem] text-white shadow-2xl relative overflow-hidden group min-h-[400px]">
            <div className="absolute top-0 right-0 p-16 opacity-10 rotate-12 -translate-y-10 group-hover:scale-125 transition-transform duration-[5s]">
              <BarChart3 size={150} />
            </div>

            <div className="relative z-10 space-y-10">
              <div className="flex items-center gap-4 border-b border-white/10 pb-8">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-brand-green">
                  <TrendingUp size={28} />
                </div>
                <div>
                  <h4 className="text-2xl font-black italic tracking-tighter uppercase">Live queue</h4>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Pulled from GET /tasks
                  </span>
                </div>
              </div>

              <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
                <p>
                  Deep charts will consume <span className="text-white font-mono text-xs">/impact-analytics/summary</span>{" "}
                  or per-task metrics. Use NGO Task Assignment for creation and matching.
                </p>
                <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-green">Tip</p>
                  <p className="text-xs text-slate-400">
                    Volunteers and coordinators can change status here when authorized by the API.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
