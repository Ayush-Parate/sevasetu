import React, { useMemo, useState } from "react";
import {
  FileText,
  ShieldCheck,
  Download,
  Search,
  Filter,
  Eye,
  Activity,
  Building2,
  Calendar,
  Mail,
  ExternalLink,
  FileOutput,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useToast } from "./Toast";
import { useAsync } from "../lib/useAsync";
import { listUsers, listTasks, getPlatformAnalytics } from "../lib/api";

type Tab = "audit" | "compliance" | "executive";

const mockAuditLogs = [
  {
    id: 1,
    action: "Role Permission Modified",
    actor: "SuperAdmin (Sarah)",
    target: "Role: Volunteer",
    time: "10 mins ago",
    severity: "medium",
    category: "Security",
  },
  {
    id: 2,
    action: "NGO Suspended",
    actor: "System Auto-Ban",
    target: "CareConnect NGO",
    time: "2 hours ago",
    severity: "high",
    category: "Moderation",
  },
  {
    id: 3,
    action: "Fraud Alert Resolved",
    actor: "SuperAdmin (Marcus)",
    target: "Alert #4921",
    time: "5 hours ago",
    severity: "medium",
    category: "Fraud",
  },
  {
    id: 4,
    action: "Platform Analytics Exported",
    actor: "Stakeholder (Gov)",
    target: "Monthly Impact Q3",
    time: "1 day ago",
    severity: "low",
    category: "Data",
  },
  {
    id: 5,
    action: "Critical System Update",
    actor: "System Process",
    target: "Core Services v2.1",
    time: "2 days ago",
    severity: "low",
    category: "System",
  },
];

const mockComplianceReports = [
  {
    id: 1,
    title: "NGO Operational Compliance Q3",
    type: "Legal Verification",
    status: "Verified",
    date: "Oct 24, 2023",
  },
  {
    id: 2,
    title: "Fraud Resolution Summary - District 4",
    type: "Fraud Resolution",
    status: "Pending Review",
    date: "Oct 20, 2023",
  },
  {
    id: 3,
    title: "Data Privacy & GDPR Audit",
    type: "System Compliance",
    status: "Verified",
    date: "Sep 15, 2023",
  },
];

const mockExecutiveReports = [
  {
    id: 1,
    title: "October Global Impact Summary",
    audience: "All Stakeholders",
    generated: "Auto-generated",
    date: "Nov 1, 2023",
  },
  {
    id: 2,
    title: "Q3 Investor Relations Report",
    audience: "Investors",
    generated: "Manual",
    date: "Oct 15, 2023",
  },
  {
    id: 3,
    title: "Regional Government Briefing",
    audience: "Government Partners",
    generated: "Auto-generated",
    date: "Oct 1, 2023",
  },
];

export default function ReportsAndAuditCenter() {
  const [activeTab, setActiveTab] = useState<Tab>("audit");
  const { showToast } = useToast();

  const { data: analytics } = useAsync(getPlatformAnalytics);
  const { data: users } = useAsync(listUsers);
  const { data: tasks } = useAsync(listTasks);

  // Build real audit log from recent user accounts and task data
  const auditLogs = useMemo(() => {
    const entries: Array<{
      id: string;
      action: string;
      actor: string;
      target: string;
      time: string;
      severity: string;
      category: string;
    }> = [];

    // Recent signups become audit entries
    if (users) {
      users.slice(0, 3).forEach((u, i) => {
        entries.push({
          id: `u-${u.id}`,
          action: "User Account Created",
          actor: "System",
          target: `${u.fullName} (${u.role})`,
          time: u.createdAt ? new Date(u.createdAt).toLocaleString() : `${i + 1}h ago`,
          severity: "low",
          category: "User"
        });
      });
    }

    // Completed tasks become audit entries
    if (tasks) {
      tasks.filter(t => t.status === "COMPLETED").slice(0, 2).forEach((t) => {
        entries.push({
          id: `t-${t.id}`,
          action: "Task Completed",
          actor: t.assignee?.fullName || "Unknown Assignee",
          target: t.title,
          time: t.completedAt ? new Date(t.completedAt).toLocaleString() : "Recently",
          severity: "low",
          category: "Operations"
        });
      });
    }

    // Always include some pinned system events
    return [
      ...entries,
      {
        id: "sys-1",
        action: "Admin Authentication",
        actor: "Super Admin",
        target: "System Login",
        time: new Date().toLocaleString(),
        severity: "medium",
        category: "Security"
      }
    ].slice(0, 8);
  }, [users, tasks]);

  const handleDownload = () => showToast("PDF Report download started.", "success");
  const handleCSV = () => showToast("Exporting data as CSV...", "info");

  const renderAuditLogs = () => (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
      <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-3 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search audit trail..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/10 transition-all text-sm"
          />
        </div>
        <div className="flex gap-2 shrink-0">
          <button className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-sm font-semibold border border-slate-100 flex items-center gap-2 hover:bg-slate-100 transition-colors">
            <Filter size={16} /> Filters
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold border border-slate-800 flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-md"
          >
            <Download size={16} /> Download PDF Report
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-slate-50 text-xs text-slate-500 font-semibold border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Action Event</th>
              <th className="px-6 py-4">Actor</th>
              <th className="px-6 py-4">Target Resource</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Time</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {auditLogs.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500 text-sm">
                  Loading audit trail...
                </td>
              </tr>
            ) : (
              auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          log.severity === "high"
                            ? "bg-rose-500"
                            : log.severity === "medium"
                              ? "bg-amber-500"
                              : "bg-slate-300"
                        }`}
                      />
                      <span className="text-sm font-bold text-slate-800">{log.action}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-600">{log.actor}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-mono text-xs line-clamp-1 max-w-[180px]">{log.target}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                      {log.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">{log.time}</td>
                  <td className="px-6 py-4">
                    <button className="px-3 py-1.5 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-100 border border-slate-100 transition-colors flex items-center gap-1">
                      <Eye size={14} /> Full Trail
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderComplianceReports = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        {
          id: "a1",
          title: "Platform Resolution Rate",
          type: "System Performance",
          status: analytics && analytics.resolutionRate >= 70 ? "Verified" : "Pending Review",
          date: new Date().toLocaleDateString(),
          value: analytics ? `${analytics.resolutionRate}%` : "Loading..."
        },
        {
          id: "a2",
          title: "Total Tasks Completed",
          type: "Operations Metric",
          status: "Verified",
          date: new Date().toLocaleDateString(),
          value: analytics?.completedTasks?.toLocaleString() ?? "Loading..."
        },
        {
          id: "a3",
          title: "Total Registered Users",
          type: "User Growth",
          status: "Verified",
          date: new Date().toLocaleDateString(),
          value: analytics?.totalUsers?.toLocaleString() ?? "Loading..."
        },
        ...mockComplianceReports
      ].map((report) => (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          key={report.id}
          className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <ShieldCheck size={24} />
            </div>
            <span
              className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider border ${
                report.status === "Verified"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-amber-50 text-amber-700 border-amber-200"
              }`}
            >
              {report.status}
            </span>
          </div>
          <h3 className="font-bold tracking-tight text-slate-900 text-lg mb-2 line-clamp-2">
            {report.title}
          </h3>
          {"value" in report && (
            <div className="text-3xl font-black text-brand-green mb-2">{(report as any).value}</div>
          )}
          <div className="flex flex-col gap-2 mb-6">
            <span className="text-sm font-medium text-slate-500">{report.type}</span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Calendar size={12} /> {report.date}
            </span>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
              <Eye size={14} /> View
            </button>
            <button className="flex-1 py-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 text-indigo-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
              <Download size={14} /> PDF
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderExecutiveReports = () => (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-3xl p-6 md:p-8 flex items-center justify-between shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10 max-w-lg">
          <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
            Generate Executive Report
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Compile a comprehensive payload of platform analytics, impact
            metrics, and compliance logs tailored for high-level stakeholders.
          </p>
          <button className="px-6 py-3 bg-brand-green text-white text-sm font-bold rounded-xl hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-brand-green/20">
            <FileOutput size={18} /> Compile New Report
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Report Archive
          </h3>
        </div>
        <div className="divide-y divide-slate-50">
          {mockExecutiveReports.map((report) => (
            <div
              key={report.id}
              className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500">
                  <FileText size={24} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-800 tracking-tight">
                    {report.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                      <Building2 size={12} /> {report.audience}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar size={12} /> {report.date}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl text-slate-600 transition-colors">
                  <Mail size={18} />
                </button>
                <button className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-2">
                  <Download size={16} /> PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold tracking-widest text-brand-green uppercase mb-2">
            ACCOUNTABILITY MODULE
          </h2>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Reports & Audit Center
          </h1>
          <p className="text-slate-500 mt-2 max-w-2xl leading-relaxed">
            Track every critical action, verify organizational compliance, and
            generate high-level analytical reports for platform stakeholders to
            ensure absolute transparency.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl w-max overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab("audit")}
          className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "audit"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <Activity
            size={18}
            className={activeTab === "audit" ? "text-indigo-500" : ""}
          />{" "}
          System Audit Logs
        </button>
        <button
          onClick={() => setActiveTab("compliance")}
          className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "compliance"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <ShieldCheck
            size={18}
            className={activeTab === "compliance" ? "text-emerald-500" : ""}
          />{" "}
          Compliance Reports
        </button>
        <button
          onClick={() => setActiveTab("executive")}
          className={`px-6 py-3 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "executive"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <FileText
            size={18}
            className={activeTab === "executive" ? "text-brand-green" : ""}
          />{" "}
          Monthly Executive Reports
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "audit" && renderAuditLogs()}
          {activeTab === "compliance" && renderComplianceReports()}
          {activeTab === "executive" && renderExecutiveReports()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
