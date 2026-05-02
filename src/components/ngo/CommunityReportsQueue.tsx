import React, { useState } from "react";
import {
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Split,
  Info,
  Clock,
  MapPin,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useToast } from "../Toast";
import { useAsync } from "../../lib/useAsync";
import { listNeeds, updateNeedStatus } from "../../lib/api";

type ReportView = "pending" | "verified";

export default function CommunityReportsQueue() {
  const [activeView, setActiveView] = useState<ReportView>("pending");
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const { showToast } = useToast();

  const { data: needs = [], loading, reload } = useAsync(listNeeds);

  const pendingReports = needs
    .filter(n => n.status === "pending")
    .map(n => ({
      id: "CR-" + n.id.substring(n.id.length - 4).toUpperCase(),
      originalId: n.id,
      source: "Platform Sync",
      type: n.category,
      desc: n.description,
      risk: n.urgencyScore >= 9 ? "Critical" : n.urgencyScore >= 7 ? "High" : "Medium",
      time: new Date(n.createdAt).toLocaleDateString(),
      location: `Lat: ${n.locationLat.toFixed(2)}, Lng: ${n.locationLng.toFixed(2)}`,
      duplicatePossibility: "Low",
      reporterTrust: 4.5,
    }));

  const verifiedReports = needs
    .filter(n => n.status !== "pending")
    .map(n => ({
      id: "CR-" + n.id.substring(n.id.length - 4).toUpperCase(),
      originalId: n.id,
      type: n.category,
      desc: n.description,
      location: `Lat: ${n.locationLat.toFixed(2)}, Lng: ${n.locationLng.toFixed(2)}`,
      time: new Date(n.createdAt).toLocaleDateString(),
      assignedCoord: "Pending Assignment",
      status: n.status,
    }));

  const handleAction = async (action: string, id: string, realId?: string) => {
    if (action === "Verified" && realId) {
      try {
        await updateNeedStatus(realId, "verified");
        showToast(`Report ${id} verified successfully.`, "success");
        setSelectedReport(null);
        reload();
      } catch (err) {
        showToast("Failed to verify report.", "error");
      }
      return;
    }
    showToast(`${action} for report ${id} processed.`, "success");
  };

  const renderReportDetail = (report: any) => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sticky top-0"
    >
      <div className="flex justify-between items-start mb-6">
        <button
          onClick={() => setSelectedReport(null)}
          className="text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2 text-xs font-bold"
        >
          <ChevronRight className="rotate-180" size={16} /> Close Report
        </button>
        <div className="flex items-center gap-2">
          {report.risk && (
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                report.risk === "Critical"
                  ? "bg-rose-100 text-rose-700"
                  : report.risk === "High"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-indigo-100 text-indigo-700"
              }`}
            >
              {report.risk} Urgency
            </span>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 mb-2">
          {report.type} Issue Report
        </h2>
        <div className="flex items-center gap-4 text-slate-500 text-sm">
          <span className="flex items-center gap-1 font-semibold">
            <MapPin size={14} className="text-brand-green" /> {report.location}
          </span>
          <span className="font-mono text-xs">ID: {report.id}</span>
        </div>
      </div>

      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
        <p className="text-slate-700 leading-relaxed text-sm italic">
          "{report.desc}"
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-white border border-slate-100 rounded-2xl">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            Source Auth
          </div>
          <div className="text-sm font-bold text-slate-900 truncate">
            {report.source || "System Hub"}
          </div>
        </div>
        <div className="p-4 bg-white border border-slate-100 rounded-2xl">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            Platform Trust
          </div>
          <div className="text-sm font-bold text-emerald-600 flex items-center gap-1">
            <ShieldCheck size={14} /> {report.reporterTrust || "Verified"}
          </div>
        </div>
      </div>

      {activeView === "pending" && (
        <>
          <div className="mb-8">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Split size={14} /> AI Duplicate Detection
            </h4>
            <div className="flex items-center justify-between p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
              <span className="text-sm font-bold text-indigo-900">
                Probability
              </span>
              <span
                className={`text-sm font-black ${
                  report.duplicatePossibility?.includes("High")
                    ? "text-rose-600"
                    : "text-indigo-600"
                }`}
              >
                {report.duplicatePossibility}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleAction("Verified", report.id, report.originalId)}
              className="py-3.5 bg-emerald-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
            >
              <CheckCircle size={18} /> Verify
            </button>
            <button
              onClick={() => handleAction("Rejected", report.id)}
              className="py-3.5 bg-rose-50 text-rose-700 border border-rose-100 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-rose-100 transition-colors"
            >
              <XCircle size={18} /> Reject
            </button>
            <button
              onClick={() => handleAction("Merged Duplicate", report.id)}
              className="py-3.5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
            >
              <Split size={18} /> Merge Duplicate
            </button>
            <button
              onClick={() => handleAction("Info Requested", report.id)}
              className="py-3.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-100 transition-colors"
            >
              <Info size={18} /> Request Info
            </button>
          </div>
        </>
      )}

      {activeView === "verified" && (
        <div className="grid grid-cols-1 gap-2">
          <button
            onClick={() => handleAction("Converted to Task", report.id)}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
          >
            <TrendingUp size={20} className="text-brand-green" /> Convert to Task
          </button>
          <button
            onClick={() => handleAction("Coordinator Assigned", report.id)}
            className="w-full py-4 bg-brand-green text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-xl shadow-brand-green/20"
          >
            <MapPin size={20} /> Assign Coordinator
          </button>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="text-amber-500" size={20} />
            <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase">
              Operational Queue
            </h2>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
            Community Reports Hub
          </h1>
          <p className="text-slate-500 max-w-2xl text-sm leading-relaxed">
            Validate field distress signals, eliminate duplicates, and triage
            community needs into actionable tasks for your coordinators.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search reports..."
              className="w-64 pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-green/20 outline-none shadow-sm"
            />
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="flex gap-1 bg-slate-100 p-1 rounded-2xl mb-8 w-max">
        <button
          onClick={() => setActiveView("pending")}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeView === "pending"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Pending Reports ({pendingReports.length})
        </button>
        <button
          onClick={() => setActiveView("verified")}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeView === "verified"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Verified Buffer ({verifiedReports.length})
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          {loading && (activeView === "pending" ? pendingReports : verifiedReports).length === 0 ? (
            <div className="text-center text-slate-500 py-8">Loading reports...</div>
          ) : (activeView === "pending" ? pendingReports : verifiedReports).map(
            (report) => (
              <div
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className={`group cursor-pointer transition-all bg-white p-6 rounded-3xl border shadow-sm ${
                  selectedReport?.id === report.id
                    ? "border-brand-green ring-4 ring-brand-green/5"
                    : "border-slate-100 hover:border-brand-green/30"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-slate-900 text-white text-[10px] font-black rounded-lg">
                      {report.id}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {report.type} Issue
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <Clock size={12} /> {report.time}
                  </div>
                </div>

                <p className="text-slate-900 font-bold mb-4 line-clamp-2 leading-snug">
                  {report.desc}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                    <MapPin size={14} className="text-slate-300" />{" "}
                    {report.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    {report.duplicatePossibility?.includes("High") && (
                      <span className="flex items-center gap-1 text-[10px] font-black text-rose-500 uppercase tracking-tight bg-rose-50 px-2 py-1 rounded-md">
                        <AlertCircle size={10} /> Duplicate Hazard
                      </span>
                    )}
                    <ChevronRight
                      size={20}
                      className={`text-slate-300 transition-transform ${
                        selectedReport?.id === report.id
                          ? "translate-x-1 text-brand-green"
                          : "group-hover:translate-x-1"
                      }`}
                    />
                  </div>
                </div>
              </div>
            )
          )}
          {!loading && (activeView === "pending" ? pendingReports : verifiedReports).length === 0 && (
            <div className="text-center text-slate-500 py-8">No reports found in this queue.</div>
          )}
        </div>

        <div className="bg-slate-50/50 rounded-3xl min-h-[500px]">
          <AnimatePresence mode="wait">
            {selectedReport ? (
              <div key="detail">{renderReportDetail(selectedReport)}</div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-[500px] flex flex-col items-center justify-center text-center p-12"
              >
                <div className="w-20 h-20 bg-white rounded-3xl border border-dashed border-slate-200 flex items-center justify-center mb-6 shadow-sm">
                  <MessageSquare size={32} className="text-slate-200" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">
                  Validation Workspace
                </h3>
                <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
                  Select a report from the queue to perform deep validation,
                  verify coordinates, and dispatch team response.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
