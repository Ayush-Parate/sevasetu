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
import { useAsync } from "../lib/useAsync";
import {
  listUsers,
  listPublicRequests,
  updatePublicRequestStatus,
  approvePublicRequest,
  updateUserStatus,
  type ListedUser,
  type PublicRequestRecord
} from "../lib/api";

type OrgTab = "active" | "approval" | "suspended";

export default function OrganizationManagement() {
  const [activeTab, setActiveTab] = useState<OrgTab>("active");
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);
  const { showToast } = useToast();

  const handleBack = () => setSelectedOrgId(null);

  const { data: rawUsers, reload: reloadUsers, loading: loadingUsers } = useAsync(listUsers);
  const { data: rawRequests, reload: reloadRequests, loading: loadingRequests } = useAsync(() =>
    listPublicRequests({ requestType: "NGO_REGISTRATION" })
  );

  const activeNGOs = (rawUsers || []).filter((u) => u.role === "NGO_ADMIN" && u.isActive === true);
  const suspendedNGOs = (rawUsers || []).filter((u) => u.role === "NGO_ADMIN" && u.isActive === false);
  const pendingApprovals = (rawRequests || []).filter((r) => r.status === "NEW" || r.status === "IN_REVIEW");

  if (selectedOrgId !== null) {
    if (activeTab === "approval") return <NGOApprovalView onBack={handleBack} />;
    if (activeTab === "active") return <NGOProfileView onBack={handleBack} />;
    if (activeTab === "suspended") return <SuspendedNGOView onBack={handleBack} />;
  }

  const generateTempPassword = () => {
    return Math.random().toString(36).slice(-8) + "Aa1!";
  };

  const handleApprove = async (id: string) => {
    try {
      const tempPass = generateTempPassword();
      await approvePublicRequest(id, {
        role: "NGO_ADMIN",
        tempPassword: tempPass
      });
      showToast(`Organization approved. Temporary password: ${tempPass}`, "success");
      void reloadRequests();
      void reloadUsers();
    } catch (err: any) {
      showToast(err.message || "Failed to approve organization", "error");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await updatePublicRequestStatus(id, { status: "REJECTED" });
      showToast("Organization rejected.", "error");
      void reloadRequests();
    } catch (err: any) {
      showToast(err.message || "Failed to reject organization", "error");
    }
  };

  const handleSuspend = async (id: string, activate = false) => {
    try {
      await updateUserStatus(id, activate);
      showToast(activate ? "Organization activated." : "Organization suspended.", "success");
      void reloadUsers();
    } catch (err: any) {
      showToast(err.message || "Failed to update organization status", "error");
    }
  };

  const handleDocs = () => showToast("Opening document vault...", "info");

  const renderApprovalQueue = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loadingRequests ? (
          <p className="text-slate-500 text-sm">Loading requests...</p>
        ) : pendingApprovals.length === 0 ? (
          <p className="text-slate-500 text-sm">No pending approvals.</p>
        ) : (
          pendingApprovals.map((req) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={req.id}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 line-clamp-1">
                      {req.organizationName || req.fullName}
                    </h3>
                    <p className="text-xs text-slate-500">Reg: {req.id.substring(0, 8)}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                  {req.status}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail size={16} className="text-slate-400" />
                  <span className="truncate">{req.email}</span>
                </div>
                {req.phone && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <PhoneCall size={16} className="text-slate-400" />
                    {req.phone}
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-amber-600 font-medium">
                  <Shield size={16} />
                  Pending Review
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => void handleApprove(req.id)}
                  className="py-2 bg-brand-green text-white text-xs font-bold rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-1"
                >
                  <CheckCircle2 size={14} /> Approve
                </button>
                <button
                  onClick={() => setSelectedOrgId(req.id)}
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
                  onClick={() => void handleReject(req.id)}
                  className="py-2 bg-rose-50 text-rose-600 text-xs font-bold rounded-xl border border-rose-100 hover:bg-rose-100 transition-all flex items-center justify-center gap-1"
                >
                  <XCircle size={14} /> Reject
                </button>
              </div>
            </motion.div>
          ))
        )}
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
            {loadingUsers ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500 text-sm">
                  Loading NGOs...
                </td>
              </tr>
            ) : activeNGOs.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500 text-sm">
                  No active NGOs found.
                </td>
              </tr>
            ) : (
              activeNGOs.map((org) => (
                <tr key={org.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <Building2 size={20} />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-slate-800 block">
                          {org.fullName}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-slate-500">
                            ID: {org.id.substring(0, 8)}
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
                        {(org.trustScore || 0).toFixed(1)}
                      </div>
                      <div className="text-xs text-brand-green font-medium">
                        {(org.trustScore || 0) >= 8 ? "Excellent" : "Good"}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="text-sm font-medium text-slate-700">
                        -
                      </div>
                      <div className="text-xs text-slate-500">
                        -
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-wider w-max">
                        Active
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedOrgId(org.id)}
                        className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => void handleSuspend(org.id, false)}
                        className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold rounded-lg transition-colors"
                      >
                        Suspend
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
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
            {loadingUsers ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500 text-sm">
                  Loading suspended NGOs...
                </td>
              </tr>
            ) : suspendedNGOs.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500 text-sm">
                  No suspended NGOs found.
                </td>
              </tr>
            ) : (
              suspendedNGOs.map((org) => (
                <tr key={org.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                        <AlertTriangle size={20} />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-slate-800 block">
                          {org.fullName}
                        </span>
                        <span className="text-xs text-slate-500">
                          Suspended ID: {org.id.substring(0, 8)}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-700 font-medium">
                      Admin Action
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-xs text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <XCircle size={12} className="text-rose-500" /> Account deactivated
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedOrgId(org.id);
                        }}
                        className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => void handleSuspend(org.id, true)}
                        className="px-3 py-1.5 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg hover:bg-emerald-100 transition-colors"
                      >
                        Activate
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
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
              {pendingApprovals.length}
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
              {suspendedNGOs.length}
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
