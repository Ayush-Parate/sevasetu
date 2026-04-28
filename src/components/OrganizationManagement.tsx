import React, { useState } from "react";
import {
  Building2,
  Search,
  MoreVertical,
  CheckCircle2,
  XCircle,
  FileText,
  PhoneCall,
  UserX,
  AlertTriangle,
  History,
  Shield,
  Eye,
  Mail,
  MapPin,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import NGOApprovalView from "./NGOApprovalView";
import NGOProfileView from "./NGOProfileView";
import SuspendedNGOView from "./SuspendedNGOView";
import { useToast } from "./Toast";

type OrgTab = "active" | "approval" | "suspended";

export default function OrganizationManagement() {
  const [activeTab, setActiveTab] = useState<OrgTab>("active");
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);
  const { showToast } = useToast();

  const handleBack = () => setSelectedOrgId(null);

  if (selectedOrgId !== null) {
    if (activeTab === "approval")
      return <NGOApprovalView onBack={handleBack} />;
    if (activeTab === "active") return <NGOProfileView onBack={handleBack} />;
    if (activeTab === "suspended")
      return <SuspendedNGOView onBack={handleBack} />;
  }

  const handleApprove = () =>
    showToast("Organization approved successfully.", "success");
  const handleReject = () => showToast("Organization rejected.", "error");
  const handleSuspend = () =>
    showToast("Organization suspended remotely.", "warning");
  const handleRevoke = () => showToast("Certification revoked.", "error");
  const handleInvestigate = () =>
    showToast("Investigation tracking initialized.", "info");
  const handleBan = () =>
    showToast("Permanent ban assigned to organization.", "error");
  const handleDocs = () => showToast("Opening document vault...", "info");

  const renderApprovalQueue = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={i}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
                  <Building2 size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">
                    New Hope Foundation
                  </h3>
                  <p className="text-xs text-slate-500">Reg: 2024-NGO-{i}92</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                Pending
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin size={16} className="text-slate-400" />
                South Region, District 4
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <FileText size={16} className="text-slate-400" />
                Education & Healthcare
              </div>
              <div className="flex items-center gap-2 text-sm text-amber-600 font-medium">
                <Shield size={16} />
                3/4 Documents Verified
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleApprove}
                className="py-2 bg-brand-green text-white text-xs font-bold rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-1"
              >
                <CheckCircle2 size={14} /> Approve
              </button>
              <button
                onClick={() => setSelectedOrgId(i)}
                className="py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-xl border border-slate-100 hover:bg-slate-100 transition-all flex items-center justify-center gap-1"
              >
                <Eye size={14} /> Review
              </button>
              <button
                onClick={handleDocs}
                className="py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-xl border border-slate-100 hover:bg-slate-100 transition-all flex items-center justify-center gap-1"
              >
                <FileText size={14} /> Docs
              </button>
              <button
                onClick={handleReject}
                className="py-2 bg-rose-50 text-rose-600 text-xs font-bold rounded-xl border border-rose-100 hover:bg-rose-100 transition-all flex items-center justify-center gap-1"
              >
                <XCircle size={14} /> Reject
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderActiveOrganizations = () => (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-3 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search active NGOs..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/10 transition-all text-sm"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-sm font-medium border border-slate-100 flex items-center gap-2">
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-xs text-slate-500 font-semibold border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Organization Detail</th>
              <th className="px-6 py-4">Trust Score</th>
              <th className="px-6 py-4">Impact Metrix</th>
              <th className="px-6 py-4">Status & Region</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <Building2 size={20} />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-800 block">
                        Global Reach Initiative {i}
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-slate-500">
                          ID: GRI-00{i}
                        </span>
                        <span className="text-[10px] bg-indigo-50 text-indigo-600 px-1.5 rounded font-medium">
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="text-xl font-bold text-slate-800">
                      9.{i}
                    </div>
                    <div className="text-xs text-brand-green font-medium">
                      Excellent
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <div className="text-sm font-medium text-slate-700">
                      {124 * i} Needs Solved
                    </div>
                    <div className="text-xs text-slate-500">
                      {12 * i} Active Volunteers
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-wider w-max">
                      Active
                    </span>
                    <span className="text-xs text-slate-500">
                      North & West Districts
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedOrgId(i)}
                      className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors"
                    >
                      Profile
                    </button>
                    <button className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-lg transition-colors">
                      <MoreVertical size={16} />
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

  const renderSuspendedOrganizations = () => (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-xs text-slate-500 font-semibold border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Organization</th>
              <th className="px-6 py-4">Suspension Reason</th>
              <th className="px-6 py-4">Flagged Issues</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[1, 2].map((i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                      <AlertTriangle size={20} />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-800 block">
                        CareConnect {i}
                      </span>
                      <span className="text-xs text-slate-500">
                        Suspended: Oct 12, 2023
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-700 font-medium">
                    Compliance Violation
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1 text-xs text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <XCircle size={12} className="text-rose-500" /> Fraudulent
                      Impact Reports
                    </span>
                    <span className="flex items-center gap-1.5">
                      <XCircle size={12} className="text-rose-500" /> Expired
                      Operating License
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedOrgId(i);
                        handleInvestigate();
                      }}
                      className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors"
                    >
                      Investigate
                    </button>
                    <button
                      onClick={handleBan}
                      className="px-3 py-1.5 bg-rose-50 text-rose-600 text-xs font-bold rounded-lg hover:bg-rose-100 transition-colors"
                    >
                      Ban
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
            NETWORK GOVERNANCE
          </h2>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Organization Management
          </h1>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl w-max">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all ${
              activeTab === "active"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Active NGOs
          </button>
          <button
            onClick={() => setActiveTab("approval")}
            className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "approval"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Approval Queue
            <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] rounded-full">
              12
            </span>
          </button>
          <button
            onClick={() => setActiveTab("suspended")}
            className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "suspended"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Suspended
            <span className="px-2 py-0.5 bg-rose-100 text-rose-700 text-[10px] rounded-full">
              4
            </span>
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
          {activeTab === "approval" && renderApprovalQueue()}
          {activeTab === "active" && renderActiveOrganizations()}
          {activeTab === "suspended" && renderSuspendedOrganizations()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
