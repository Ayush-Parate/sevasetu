import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Clock3, KeyRound, Mail, Search, ShieldCheck, XCircle } from "lucide-react";
import { approvePublicRequest, listPublicRequests, updatePublicRequestStatus, type PublicRequestRecord } from "../lib/api";
import { useToast } from "./Toast";

const ROLE_OPTIONS = [
  "Volunteer",
  "Field Coordinator",
  "NGO Admin",
  "Verifier",
  "Donor",
  "Super Admin"
];

function createTempPassword() {
  return `NeedGraph!${Math.random().toString(36).slice(-8)}A1`;
}

export default function AccessRequestManagement() {
  const { showToast } = useToast();
  const [requests, setRequests] = useState<PublicRequestRecord[]>([]);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [approvalResult, setApprovalResult] = useState<{ email: string; tempPassword: string; role: string } | null>(null);
  const [reviewForm, setReviewForm] = useState({
    role: "Volunteer",
    reviewNotes: "",
    tempPassword: createTempPassword()
  });

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesStatus = statusFilter === "ALL" || request.status === statusFilter;
      const haystack = `${request.fullName} ${request.email} ${request.organizationName || ""} ${request.roleRequested || ""}`.toLowerCase();
      const matchesSearch = !searchQuery || haystack.includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [requests, searchQuery, statusFilter]);

  const selectedRequest =
    requests.find((request) => request.id === selectedRequestId) ||
    filteredRequests[0] ||
    null;

  useEffect(() => {
    void loadRequests();
  }, []);

  useEffect(() => {
    if (selectedRequest) {
      setSelectedRequestId(selectedRequest.id);
      setReviewForm({
        role: selectedRequest.roleRequested || "Volunteer",
        reviewNotes: selectedRequest.reviewNotes || "",
        tempPassword: createTempPassword()
      });
    }
  }, [selectedRequest?.id]);

  async function loadRequests() {
    setIsLoading(true);
    try {
      const data = await listPublicRequests();
      setRequests(data);
      if (data[0] && !selectedRequestId) {
        setSelectedRequestId(data[0].id);
      }
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Failed to load requests", "error");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleStatusUpdate(status: "IN_REVIEW" | "REJECTED") {
    if (!selectedRequest) return;
    setIsSaving(true);
    try {
      const updated = await updatePublicRequestStatus(selectedRequest.id, {
        status,
        reviewNotes: reviewForm.reviewNotes
      });
      setRequests((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      showToast(`Request marked as ${status.replace("_", " ").toLowerCase()}.`, "success");
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Unable to update request", "error");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleApprove() {
    if (!selectedRequest) return;
    setIsSaving(true);
    try {
      const result = await approvePublicRequest(selectedRequest.id, {
        fullName: selectedRequest.fullName,
        phone: selectedRequest.phone,
        role: reviewForm.role,
        tempPassword: reviewForm.tempPassword,
        reviewNotes: reviewForm.reviewNotes
      });
      setRequests((prev) => prev.map((item) => (item.id === result.request.id ? result.request : item)));
      setApprovalResult({
        email: result.user.email,
        tempPassword: result.tempPassword,
        role: result.user.role
      });
      showToast("Request approved and account created.", "success");
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Unable to approve request", "error");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold tracking-widest text-brand-green uppercase mb-2">
            ACCESS REQUESTS
          </h2>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Account Creation Queue
          </h1>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or org..."
              className="pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm min-w-[320px] focus:outline-none focus:ring-2 focus:ring-brand-green/10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-700"
          >
            <option value="ALL">All statuses</option>
            <option value="NEW">New</option>
            <option value="IN_REVIEW">In Review</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_1fr] gap-6">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Incoming Requests</h3>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {filteredRequests.length} visible
            </span>
          </div>
          <div className="divide-y divide-slate-50 max-h-[720px] overflow-y-auto">
            {isLoading ? (
              <div className="p-8 text-sm text-slate-500">Loading access requests...</div>
            ) : filteredRequests.length === 0 ? (
              <div className="p-8 text-sm text-slate-500">No requests matched the current filters.</div>
            ) : (
              filteredRequests.map((request) => (
                <button
                  key={request.id}
                  onClick={() => setSelectedRequestId(request.id)}
                  className={`w-full text-left px-6 py-5 transition-colors ${
                    selectedRequest?.id === request.id ? "bg-brand-green/5" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-slate-900">{request.fullName}</h4>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          {request.requestType.replaceAll("_", " ")}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">{request.email}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {request.organizationName || "Individual request"} {request.roleRequested ? `• ${request.roleRequested}` : ""}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        request.status === "APPROVED"
                          ? "bg-emerald-100 text-emerald-700"
                          : request.status === "REJECTED"
                            ? "bg-rose-100 text-rose-700"
                            : request.status === "IN_REVIEW"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {request.status.replace("_", " ")}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            {selectedRequest ? (
              <div className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{selectedRequest.fullName}</h3>
                    <p className="text-sm text-slate-500 mt-1">{selectedRequest.email}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest">
                    {selectedRequest.requestType.replaceAll("_", " ")}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">Requested Role</p>
                    <p className="font-semibold text-slate-800">{selectedRequest.roleRequested || "Not specified"}</p>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">Organization</p>
                    <p className="font-semibold text-slate-800">{selectedRequest.organizationName || "Not provided"}</p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4">
                  <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">Request Message</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{selectedRequest.message || "No additional message provided."}</p>
                </div>

                <div className="space-y-4 border-t border-slate-100 pt-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                        Assign Role
                      </label>
                      <select
                        value={reviewForm.role}
                        onChange={(e) => setReviewForm((prev) => ({ ...prev, role: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                      >
                        {ROLE_OPTIONS.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                        Temporary Password
                      </label>
                      <div className="relative">
                        <KeyRound className="absolute left-4 top-3.5 text-slate-400" size={16} />
                        <input
                          value={reviewForm.tempPassword}
                          onChange={(e) => setReviewForm((prev) => ({ ...prev, tempPassword: e.target.value }))}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                      Review Notes
                    </label>
                    <textarea
                      value={reviewForm.reviewNotes}
                      onChange={(e) => setReviewForm((prev) => ({ ...prev, reviewNotes: e.target.value }))}
                      className="w-full min-h-[120px] px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm"
                      placeholder="Add internal review notes, approval context, or rejection reason"
                    />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleStatusUpdate("IN_REVIEW")}
                      disabled={isSaving}
                      className="px-4 py-3 rounded-xl bg-amber-50 text-amber-700 text-sm font-bold hover:bg-amber-100 transition-colors flex items-center gap-2"
                    >
                      <Clock3 size={16} /> Mark In Review
                    </button>
                    <button
                      onClick={() => handleApprove()}
                      disabled={isSaving || selectedRequest.status === "APPROVED"}
                      className="px-4 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 disabled:opacity-60"
                    >
                      <CheckCircle2 size={16} /> Approve and Create User
                    </button>
                    <button
                      onClick={() => handleStatusUpdate("REJECTED")}
                      disabled={isSaving || selectedRequest.status === "APPROVED"}
                      className="px-4 py-3 rounded-xl bg-rose-50 text-rose-700 text-sm font-bold hover:bg-rose-100 transition-colors flex items-center gap-2 disabled:opacity-60"
                    >
                      <XCircle size={16} /> Reject Request
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-slate-500">Select a request to review it.</div>
            )}
          </div>

          <AnimatePresence>
            {approvalResult ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 space-y-3"
              >
                <div className="flex items-center gap-2 text-emerald-700">
                  <ShieldCheck size={18} />
                  <h4 className="font-bold">Account Created</h4>
                </div>
                <div className="text-sm text-emerald-900 space-y-2">
                  <p className="flex items-center gap-2"><Mail size={14} /> {approvalResult.email}</p>
                  <p><span className="font-semibold">Role:</span> {approvalResult.role}</p>
                  <p><span className="font-semibold">Temporary password:</span> <code>{approvalResult.tempPassword}</code></p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
