import React, { useState } from "react";
import {
  FileText,
  ShieldCheck,
  Ticket,
  Users,
  Scale,
  Search,
  Edit3,
  Plus,
  History,
  Lock,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  UserPlus,
  Filter,
  Download,
  FileSignature,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useToast } from "./Toast";

type Tab = "governance" | "security" | "support" | "team" | "legal";

export default function SupportAndGovernance() {
  const [activeTab, setActiveTab] = useState<Tab>("governance");
  const { showToast } = useToast();

  const handleAction = (
    message: string,
    type: "success" | "info" | "warning" | "error" = "success",
  ) => {
    showToast(message, type);
  };

  const renderGovernance = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-slate-900">
            Governance Policies
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Manage platform rules, code of conduct, and ethical frameworks.
          </p>
        </div>
        <button
          onClick={() => handleAction("Policy draft interface opened.", "info")}
          className="px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-lg"
        >
          <Plus size={18} /> Publish New Policy
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {[
          {
            title: "Platform Master Rules",
            updated: "2 weeks ago",
            version: "v3.2.1",
          },
          {
            title: "Code of Conduct",
            updated: "1 month ago",
            version: "v2.1.0",
          },
          {
            title: "NGO Compliance Framework",
            updated: "3 days ago",
            version: "v4.0.5",
          },
          {
            title: "Volunteer Ethics Guidelines",
            updated: "2 months ago",
            version: "v1.5.0",
          },
        ].map((policy, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between group hover:border-slate-200 transition-all"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                  <FileText size={24} />
                </div>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                  {policy.version}
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                {policy.title}
              </h4>
              <p className="text-xs font-semibold text-slate-400 mb-6">
                Last updated: {policy.updated}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  handleAction(`Opening editor for ${policy.title}`, "info")
                }
                className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-100 transition-colors flex items-center justify-center gap-1"
              >
                <Edit3 size={14} /> Edit
              </button>
              <button
                onClick={() =>
                  handleAction("Versioning history opened.", "info")
                }
                className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-100 transition-colors flex items-center justify-center gap-1"
              >
                <History size={14} /> History
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-rose-50 border border-rose-100 p-6 rounded-3xl col-span-1 md:col-span-1 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="text-rose-500" size={24} />
            <h3 className="text-base font-bold text-rose-900">
              Security Alerts
            </h3>
          </div>
          <p className="text-3xl font-bold text-rose-700 tracking-tight">4</p>
          <p className="text-xs text-rose-600 mt-1">
            Suspicious access attempts
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm col-span-1 md:col-span-2 flex flex-col justify-center">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-4">
            Quick Security Actions
          </h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() =>
                handleAction("Initiating global security audit...", "info")
              }
              className="px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2"
            >
              <ShieldCheck size={18} /> Global Security Audit
            </button>
            <button
              onClick={() => handleAction("Account access locked.", "warning")}
              className="px-5 py-2.5 bg-rose-50 border border-rose-100 text-rose-700 text-sm font-bold rounded-xl hover:bg-rose-100 transition-colors flex items-center gap-2"
            >
              <Lock size={18} /> Lock Compromised Access
            </button>
            <button
              onClick={() =>
                handleAction("Force password reset triggered.", "success")
              }
              className="px-5 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-2"
            >
              <RotateCcw size={18} /> Force Password Reset
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <h3 className="font-bold text-slate-900 text-lg">
            Recent Anomalies & Logs
          </h3>
        </div>
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-slate-50 text-xs text-slate-500 font-semibold border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Event Signature</th>
              <th className="px-6 py-4">IP / Location</th>
              <th className="px-6 py-4">Target Account</th>
              <th className="px-6 py-4">Time</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[1, 2, 3].map((i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <AlertTriangle
                      size={16}
                      className={i === 1 ? "text-rose-500" : "text-amber-500"}
                    />
                    {i === 1
                      ? "Multiple Failed Admin Logins"
                      : "Login from New IP Region"}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-500 font-mono">
                  192.168.1.{i}4 • Unknown
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                  Admin_Coord_{i}
                </td>
                <td className="px-6 py-4 text-xs font-semibold text-slate-400">
                  {i * 10} mins ago
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      i === 1
                        ? "bg-rose-100 text-rose-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    Investigating
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSupport = () => (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
          <Ticket className="text-amber-500" /> Active Support Tickets
        </h3>
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-3 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search tickets..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/10 transition-all text-sm"
          />
        </div>
      </div>
      <div className="divide-y divide-slate-100">
        {[
          {
            id: "TCK-892",
            subject: "NGO Verification Stuck",
            sender: "CareConnect NGO",
            type: "NGO Support",
            priority: "High",
            status: "Open",
          },
          {
            id: "TCK-891",
            subject: "Bug in Volunteer Assignment",
            sender: "Coord_East",
            type: "Technical",
            priority: "Critical",
            status: "Investigating",
          },
          {
            id: "TCK-885",
            subject: "Dispute over Trust Score",
            sender: "Vol_SarahJ",
            type: "Complaint",
            priority: "Medium",
            status: "Open",
          },
        ].map((tck, idx) => (
          <div
            key={idx}
            className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-bold text-slate-400 font-mono">
                  {tck.id}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    tck.priority === "Critical"
                      ? "bg-rose-100 text-rose-700"
                      : tck.priority === "High"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {tck.priority}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                {tck.subject}
              </h4>
              <p className="text-xs text-slate-500 font-semibold">
                {tck.sender} • {tck.type}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() =>
                  handleAction("Ticket marked resolved.", "success")
                }
                className="px-4 py-2 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100 hover:bg-emerald-100 transition-colors flex items-center gap-1"
              >
                <CheckCircle2 size={14} /> Resolve
              </button>
              <button
                onClick={() => handleAction("Support team assigned.", "info")}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors"
              >
                Assign
              </button>
              <button
                onClick={() =>
                  handleAction("Issue escalated to engineering.", "warning")
                }
                className="px-4 py-2 bg-rose-50 text-rose-700 text-xs font-bold rounded-lg border border-rose-100 hover:bg-rose-100 transition-colors"
              >
                Escalate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTeamAccess = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-slate-900">
            Internal Team Directory
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Manage core team members, audit ownership, and staff permissions.
          </p>
        </div>
        <button
          onClick={() =>
            handleAction("Internal member invite sent.", "success")
          }
          className="px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-lg"
        >
          <UserPlus size={18} /> Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[
          {
            name: "Sarah Connor",
            role: "Chief Compliance Officer",
            access: "Super Admin",
            status: "Active",
          },
          {
            name: "Marcus Rivera",
            role: "Head of Operations",
            access: "Admin",
            status: "Active",
          },
          {
            name: "Elena Rostova",
            role: "Security Analyst",
            access: "Security Lead",
            status: "Active",
          },
        ].map((member, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center font-bold text-indigo-700">
                {member.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{member.name}</h4>
                <p className="text-xs font-semibold text-slate-500">
                  {member.role}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-6">
              <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg">
                {member.access}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => handleAction("Audit rights reviewed.", "info")}
                  className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  title="Audit Rights"
                >
                  <ShieldCheck size={18} />
                </button>
                <button
                  onClick={() =>
                    handleAction("Access restrictions applied.", "warning")
                  }
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Restrict Access"
                >
                  <Lock size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLegal = () => (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10 max-w-lg mb-6 md:mb-0">
          <div className="flex items-center gap-3 mb-2">
            <Scale className="text-indigo-400" size={24} />
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Legal Management
            </h3>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Centralized portal for managing disputes, NGO liability agreements,
            and verified regulatory compliance certificates.
          </p>
        </div>
        <div className="relative z-10 w-full md:w-auto flex flex-col gap-3">
          <button
            onClick={() => handleAction("New legal case opened.", "info")}
            className="px-6 py-3 w-full bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
          >
            <Scale size={18} /> Open Legal Case
          </button>
          <button
            onClick={() =>
              handleAction("Compliance report downlaoding...", "success")
            }
            className="px-6 py-3 w-full bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 backdrop-blur"
          >
            <Download size={18} /> Compliance Report
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-lg">
            Active Agreements & Disputes
          </h3>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            {
              title: "Global Relief NGO Data Agreement",
              status: "Signed",
              date: "Oct 20, 2023",
              type: "Contract",
            },
            {
              title: "Dispute: Case #441A - Misallocated Funds",
              status: "Under Review",
              date: "Oct 24, 2023",
              type: "Dispute",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-xl ${item.type === "Dispute" ? "bg-rose-50 text-rose-600" : "bg-indigo-50 text-indigo-600"}`}
                >
                  {item.type === "Dispute" ? (
                    <Scale size={20} />
                  ) : (
                    <FileSignature size={20} />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{item.title}</h4>
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    Updated: {item.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    item.status === "Signed"
                      ? "bg-brand-green/10 text-brand-green"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {item.status}
                </span>
                <button
                  onClick={() =>
                    handleAction("Viewing contract details...", "info")
                  }
                  className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      <div className="mb-8">
        <h2 className="text-sm font-semibold tracking-widest text-brand-green uppercase mb-2">
          SYSTEM ADMINISTRATION
        </h2>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-2">
          Support & Governance
        </h1>
        <p className="text-slate-500 max-w-3xl leading-relaxed">
          Maintain platform integrity through strict governance policies, robust
          security oversight, and centralized legal compliance management.
        </p>
      </div>

      <div className="flex bg-slate-100 p-1.5 rounded-2xl w-max overflow-x-auto custom-scrollbar">
        {[
          { id: "governance", label: "Governance Policies", icon: FileText },
          { id: "security", label: "Platform Security", icon: ShieldCheck },
          { id: "support", label: "Support Tickets", icon: Ticket },
          { id: "team", label: "Internal Access", icon: Users },
          { id: "legal", label: "Legal Management", icon: Scale },
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
              className={activeTab === tab.id ? "text-indigo-500" : ""}
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
          {activeTab === "governance" && renderGovernance()}
          {activeTab === "security" && renderSecurity()}
          {activeTab === "support" && renderSupport()}
          {activeTab === "team" && renderTeamAccess()}
          {activeTab === "legal" && renderLegal()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
