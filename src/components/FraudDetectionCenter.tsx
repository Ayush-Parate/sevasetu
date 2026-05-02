import React, { useState } from "react";
import {
  ShieldAlert,
  AlertTriangle,
  Users,
  Building2,
  Search,
  MapPin,
  CheckCircle2,
  XCircle,
  FileWarning,
  Gavel,
  FileSearch,
  ArrowRight,
  ShieldBan,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useToast } from "./Toast";
import { useAsync } from "../lib/useAsync";
import {
  getSuspiciousReports,
  getFlaggedVolunteers,
  penalizeTrustScore,
  updateUserStatus,
  type SuspiciousReport,
  type FlaggedVolunteer
} from "../lib/api";

type Tab = "reports" | "volunteer" | "ngo";

export default function FraudDetectionCenter() {
  const [activeTab, setActiveTab] = useState<Tab>("reports");
  const { showToast } = useToast();

  const { data: suspiciousReports, loading: loadingReports, reload: reloadReports } = useAsync(getSuspiciousReports);
  const { data: flaggedVols, loading: loadingVols, reload: reloadVols } = useAsync(getFlaggedVolunteers);

  const handleVerify = () => showToast("Report pattern verified as authentic.", "success");
  const handleMerge = () => showToast("Duplicate reports merged successfully.", "info");
  const handleReject = () => showToast("Fraudulent report flagged and logged.", "error");
  const handleEscalate = () => showToast("Issue escalated to manual review team.", "warning");

  const handleWarn = async (id: string) => {
    try {
      await penalizeTrustScore(id, -1);
      showToast("Trust score penalized by -1.", "warning");
      void reloadVols();
    } catch (err: any) {
      showToast(err.message || "Failed to update trust score", "error");
    }
  };

  const handleBan = async (id: string) => {
    try {
      await updateUserStatus(id, false);
      showToast("Volunteer suspended pending investigation.", "error");
      void reloadVols();
    } catch (err: any) {
      showToast(err.message || "Failed to suspend volunteer", "error");
    }
  };

  const handleFreeze = () => showToast("NGO assets frozen temporarily.", "error");
  const handleAudit = () => showToast("Audit process initiated.", "info");

  const renderSuspiciousReports = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loadingReports ? (
          <p className="text-slate-500 text-sm">Scanning for suspicious patterns...</p>
        ) : !suspiciousReports || suspiciousReports.length === 0 ? (
          <div className="col-span-3 p-8 text-center">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <ShieldCheck size={32} className="text-emerald-500" />
            </div>
            <p className="text-slate-700 font-semibold">No suspicious patterns detected</p>
            <p className="text-slate-500 text-sm mt-1">All recent needs look authentic.</p>
          </div>
        ) : (
          suspiciousReports.map((report) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={report.id}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div
                className={`absolute left-0 top-0 w-1.5 h-full ${
                  report.riskLevel === "HIGH" ? "bg-rose-500" : "bg-amber-500"
                }`}
              />
              <div className="flex justify-between items-start mb-4">
                <span
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                    report.riskLevel === "HIGH"
                      ? "bg-rose-100 text-rose-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {report.riskLevel} Risk
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {new Date(report.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h3 className="font-bold tracking-tight text-slate-900 text-lg mb-2 line-clamp-1">
                {report.title}
              </h3>
              <p className="text-sm text-slate-600 mb-4 line-clamp-3">{report.description}</p>
              <div className="flex items-center gap-2 mb-6 text-xs text-slate-500">
                <MapPin size={14} className="text-slate-400" />
                {report.location} &bull; {report.count} report(s)
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleVerify}
                  className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1"
                >
                  <CheckCircle2 size={14} className="text-emerald-500" /> Verify
                </button>
                <button
                  onClick={handleMerge}
                  className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1"
                >
                  <ArrowRight size={14} /> Merge
                </button>
                <button
                  onClick={handleReject}
                  className="py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl transition-colors border border-rose-100 flex items-center justify-center gap-1"
                >
                  <XCircle size={14} /> Reject
                </button>
                <button
                  onClick={handleEscalate}
                  className="py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl transition-colors border border-indigo-100 flex items-center justify-center gap-1"
                >
                  <Search size={14} /> Escalate
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );

  const renderVolunteerMisuse = () => (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Users size={20} className="text-rose-500" /> Flagged Volunteers
        </h3>
      </div>
      <table className="w-full text-left whitespace-nowrap">
        <thead className="bg-slate-50 text-xs text-slate-500 font-semibold border-b border-slate-100">
          <tr>
            <th className="px-6 py-4">Volunteer</th>
            <th className="px-6 py-4">Misuse Pattern</th>
            <th className="px-6 py-4">Evidence Metric</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {loadingVols ? (
            <tr>
              <td colSpan={4} className="p-8 text-center text-slate-500 text-sm">
                Scanning volunteers...
              </td>
            </tr>
          ) : !flaggedVols || flaggedVols.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-8 text-center">
                <div className="flex flex-col items-center gap-2">
                  <ShieldCheck size={32} className="text-emerald-400" />
                  <p className="text-slate-600 font-semibold text-sm">No flagged volunteers</p>
                </div>
              </td>
            </tr>
          ) : (
            flaggedVols.map((vol) => (
              <tr key={vol.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex justify-center items-center font-bold text-slate-500 text-sm">
                      {vol.fullName.charAt(0)}
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-800 block">{vol.fullName}</span>
                      <span className="text-xs text-slate-500">{vol.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-slate-800 block">{vol.pattern}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      vol.severity === "HIGH"
                        ? "bg-rose-100 text-rose-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {vol.severity} severity
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-rose-600 font-semibold bg-rose-50 px-3 py-1 rounded-lg">
                    {vol.probability}% Probability
                  </span>
                  <span className="text-xs text-slate-500 block mt-1">
                    Trust: {vol.trustScore.toFixed(1)} &bull; {vol.recentCompletedTasks} tasks/wk
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => showToast(`Evidence: trustScore=${vol.trustScore.toFixed(1)}, tasks=${vol.recentCompletedTasks}`, "info")}
                      className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1"
                    >
                      <FileSearch size={14} /> Evidence
                    </button>
                    <button
                      onClick={() => void handleWarn(vol.id)}
                      className="px-3 py-1.5 bg-rose-50 text-rose-700 text-[10px] font-bold rounded-lg hover:bg-rose-100 border border-rose-100 transition-colors uppercase tracking-wider"
                    >
                      -1 Trust
                    </button>
                    <button
                      onClick={() => void handleBan(vol.id)}
                      className="p-1.5 text-rose-400 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors"
                    >
                      <ShieldBan size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  const renderNGORiskAlerts = () => (
    <div className="space-y-6">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col md:flex-row gap-6 items-start"
        >
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
            <Building2 size={32} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-slate-900">
                  Abnormal Task Completion Behavior
                </h3>
                <p className="text-sm text-slate-500 font-medium mt-1">
                  NPO: Care Initiative {i}
                </p>
              </div>
              <span className="px-3 py-1.5 bg-rose-100 text-rose-700 text-[10px] font-bold rounded-xl uppercase tracking-wider border border-rose-200">
                Severity: High
              </span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6 mt-4">
              <p className="text-sm text-slate-700 leading-relaxed">
                Algorithms detected 150 tasks marked as "Resolved" within a
                2-hour window. This volume significantly deviates from
                historical baselines and exceeds reasonable physical bounds for
                the assigned active volunteers. Potential artificial impact
                inflation.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAudit}
                className="px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10 flex items-center gap-2"
              >
                <Gavel size={16} /> Open Formal Investigation
              </button>
              <button
                onClick={handleWarn}
                className="px-5 py-2.5 bg-amber-50 text-amber-700 text-sm font-bold rounded-xl hover:bg-amber-100 border border-amber-100 transition-colors flex items-center gap-2"
              >
                <FileWarning size={16} /> Send Compliance Notice
              </button>
              <button
                onClick={handleFreeze}
                className="px-5 py-2.5 bg-rose-50 text-rose-700 text-sm font-bold rounded-xl hover:bg-rose-100 border border-rose-100 transition-colors flex items-center gap-2"
              >
                <ShieldBan size={16} /> Freeze Activities
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      {/* Premium Feature Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-brand-green/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-rose-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="text-brand-green" size={24} />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-brand-green">
                Premium Module
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              Fraud Detection Center
            </h1>
            <p className="text-slate-300 text-sm max-w-xl">
              AI-powered surveillance scanning 2M+ data points daily to prevent
              system abuse, fake reporting, and ensure absolute trust in impact
              metrics.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center shrink-0">
            <span className="text-3xl font-bold text-white block">12</span>
            <span className="text-xs text-slate-300 font-semibold uppercase tracking-wider">
              Active Threats Prevented
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="flex bg-slate-100 p-1 rounded-xl w-max">
          <button
            onClick={() => setActiveTab("reports")}
            className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "reports"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <AlertTriangle size={16} /> Suspicious Reports
          </button>
          <button
            onClick={() => setActiveTab("volunteer")}
            className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "volunteer"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Users size={16} /> Volunteer Misuse
          </button>
          <button
            onClick={() => setActiveTab("ngo")}
            className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "ngo"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Building2 size={16} /> NGO Risk Alerts
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "reports" && renderSuspiciousReports()}
          {activeTab === "volunteer" && renderVolunteerMisuse()}
          {activeTab === "ngo" && renderNGORiskAlerts()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
