import React, { useState } from "react";
import {
  ShieldCheck,
  Lock,
  Copy,
  Plus,
  AlertCircle,
  Search,
  Filter,
  ShieldAlert,
  Key,
  Activity,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type Tab = "matrix" | "logs";

const ROLES = [
  "NGO Admin",
  "Field Coordinator",
  "Volunteer",
  "Verifier",
  "Survey Collector",
  "Donor",
  "Partner Organization",
];

const PERMISSIONS = [
  { module: "Dashboard", rights: ["View Analytics", "Export Reports"] },
  {
    module: "Organization",
    rights: ["Approve NGO", "Suspend NGO", "Edit Profile"],
  },
  {
    module: "Tasks",
    rights: ["Create Tasks", "Update Tasks", "Delete Tasks", "Assign Tasks"],
  },
  {
    module: "Users",
    rights: ["Manage Users", "View Activity", "Adjust Trust Score"],
  },
];

export default function RolePermissionCenter() {
  const [activeTab, setActiveTab] = useState<Tab>("matrix");
  const [selectedRole, setSelectedRole] = useState(ROLES[0]);

  const renderMatrix = () => (
    <div className="space-y-6">
      {/* Top Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2 shrink-0 overflow-x-auto pb-2 custom-scrollbar">
          {ROLES.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg whitespace-nowrap transition-all ${
                selectedRole === role
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
        <div className="flex gap-2 shrink-0">
          <button className="px-4 py-2 bg-indigo-50 text-indigo-700 text-sm font-semibold rounded-lg border border-indigo-100 flex items-center gap-2 hover:bg-indigo-100 transition-colors">
            <Copy size={16} /> Clone
          </button>
          <button className="px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-md">
            <Plus size={16} /> Custom Role
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="text-brand-green" size={20} />
            {selectedRole} Permissions
          </h3>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-50 text-slate-600 text-sm font-semibold rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors">
              Edit Permissions
            </button>
            <button className="px-4 py-2 bg-rose-50 text-rose-700 text-sm font-semibold rounded-lg border border-rose-100 flex items-center gap-2 hover:bg-rose-100 transition-colors">
              <Lock size={16} /> Lock Critical
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PERMISSIONS.map((group) => (
            <div
              key={group.module}
              className="border border-slate-100 rounded-2xl p-5 bg-slate-50/50"
            >
              <h4 className="font-semibold text-slate-800 mb-4 tracking-tight">
                {group.module} Rights
              </h4>
              <div className="space-y-3">
                {group.rights.map((right) => {
                  const isGranted = Math.random() > 0.4; // Simulation
                  return (
                    <div
                      key={right}
                      className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100 shadow-sm"
                    >
                      <span className="text-sm font-medium text-slate-700">
                        {right}
                      </span>
                      <div
                        className={`w-10 h-5 rounded-full relative transition-colors ${isGranted ? "bg-brand-green" : "bg-slate-200"}`}
                      >
                        <div
                          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${isGranted ? "left-5.5 right-0.5" : "left-0.5"}`}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAccessLogs = () => (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-3 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search logs by user, action, or IP..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/10 transition-all text-sm"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-sm font-semibold border border-slate-100 hover:bg-slate-100 flex items-center gap-2">
            <Filter size={16} /> Filters
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-slate-50 text-xs text-slate-500 font-semibold border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Action</th>
              <th className="px-6 py-4">Resource</th>
              <th className="px-6 py-4">Timestamp</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-xs font-bold">
                      U{i}
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-800 block">
                        User Name {i}
                      </span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest">
                        {ROLES[i % ROLES.length]}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                      i % 3 === 0
                        ? "bg-amber-100 text-amber-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {i % 3 === 0 ? "Data Export" : "View Profile"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                  {i % 3 === 0
                    ? "/api/reports/ngo/export"
                    : "/api/users/profile"}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} /> Oct 24, 14:32:0{i}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1">
                      <Search size={14} /> Investigate
                    </button>
                    <button className="px-3 py-1.5 bg-rose-50 text-rose-700 text-xs font-bold rounded-lg hover:bg-rose-100 transition-colors flex items-center gap-1">
                      <Lock size={14} /> Restrict
                    </button>
                  </div>
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
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold tracking-widest text-brand-green uppercase mb-2">
            ACCESS & SECURITY
          </h2>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Role & Permission Control
          </h1>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl w-max">
          <button
            onClick={() => setActiveTab("matrix")}
            className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "matrix"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <ShieldCheck size={16} /> Permission Matrix
          </button>
          <button
            onClick={() => setActiveTab("logs")}
            className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "logs"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Activity size={16} /> Access Logs
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
          {activeTab === "matrix" && renderMatrix()}
          {activeTab === "logs" && renderAccessLogs()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
