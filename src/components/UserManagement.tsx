import React, { useMemo, useState } from "react";
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Award,
  Flag,
  ShieldAlert,
  CheckCircle2,
  ChevronDown,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import UserProfileView from "./UserProfileView";
import { useToast } from "./Toast";
import AccessRequestManagement from "./AccessRequestManagement";
import { listUsers, updateUserStatus, type ListedUser } from "../lib/api";
import { useAsync } from "../lib/useAsync";

type UserTab = "all" | "high_impact" | "flagged" | "requests";

function avatarIndex(id: string) {
  let n = 0;
  for (let i = 0; i < id.length; i++) n += id.charCodeAt(i);
  return (n % 70) + 1;
}

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState<UserTab>("all");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const { showToast } = useToast();

  const { data: rawUsers, loading, error, reload } = useAsync(listUsers);

  const users = useMemo(() => rawUsers ?? [], [rawUsers]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q)
    );
  }, [users, query]);

  const highImpact = useMemo(() => filtered.filter((u) => (u.trustScore ?? 0) >= 8), [filtered]);

  const flagged = useMemo(() => filtered.filter((u) => u.isActive === false), [filtered]);

  const selectedUser = selectedUserId ? users.find((u) => u.id === selectedUserId) : undefined;

  if (selectedUserId && selectedUser) {
    return <UserProfileView user={selectedUser} onBack={() => setSelectedUserId(null)} />;
  }

  const handleSuspend = async (userId: string, currentStatus: boolean) => {
    try {
      await updateUserStatus(userId, !currentStatus);
      showToast(`User ${currentStatus ? "suspended" : "activated"} successfully.`, "success");
      void reload();
    } catch (err: any) {
      showToast(err.message || "Failed to update user status.", "error");
    }
  };
  const handleReward = () => showToast("Rewards will use impact analytics when wired.", "success");

  const renderAllUsers = () => (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-3 text-slate-400" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users by name, email, or ID..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/10 transition-all text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {["Role", "Status", "Verified"].map((filter) => (
            <button
              key={filter}
              type="button"
              className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold border border-slate-100 flex items-center gap-2 hover:bg-slate-100"
            >
              {filter} <ChevronDown size={14} />
            </button>
          ))}
          <button
            type="button"
            className="w-10 h-10 bg-slate-50 text-slate-600 rounded-xl border border-slate-100 flex justify-center items-center hover:bg-slate-100"
          >
            <Filter size={16} />
          </button>
        </div>
      </div>
      {loading ? (
        <div className="p-12 text-center text-slate-500 text-sm">Loading directory…</div>
      ) : error ? (
        <div className="p-12 text-center space-y-3">
          <p className="text-rose-600 text-sm font-medium">{error.message}</p>
          <button
            type="button"
            onClick={() => void reload()}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-slate-50 text-xs text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Trust</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((user) => {
                const score = user.trustScore ?? 0;
                const active = user.isActive !== false;
                return (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://i.pravatar.cc/150?img=${avatarIndex(user.id)}`}
                          alt=""
                          className="w-10 h-10 rounded-full object-cover bg-slate-100"
                        />
                        <div>
                          <span className="text-sm font-semibold text-slate-800 block">{user.fullName}</span>
                          <span className="text-[10px] text-slate-500 tracking-wider uppercase">
                            {user.emailVerified === false ? "Email pending" : "Verified"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-800 block">{user.role}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-800">{score.toFixed(1)}</span>
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${score >= 8 ? "bg-emerald-500" : score >= 5 ? "bg-amber-500" : "bg-rose-500"}`}
                            style={{ width: `${Math.min(100, score * 10)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          active ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedUserId(user.id)}
                          className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors"
                        >
                          Profile
                        </button>
                        <button
                          type="button"
                          onClick={() => void handleSuspend(user.id, active)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${active ? "bg-rose-50 text-rose-600 hover:bg-rose-100" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"}`}
                        >
                          {active ? "Suspend" : "Activate"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">No users match this search.</div>
          ) : null}
        </div>
      )}
    </div>
  );

  const renderHighImpact = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {highImpact.map((user) => {
          const score = user.trustScore ?? 0;
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              key={user.id}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-100 transition-colors" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={`https://i.pravatar.cc/150?img=${avatarIndex(user.id)}`}
                      alt=""
                      className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-slate-900">{user.fullName}</h3>
                      <p className="text-xs text-slate-500 font-medium">{user.role}</p>
                    </div>
                  </div>
                  <div className="bg-amber-100 text-amber-600 p-2 rounded-xl">
                    <Award size={20} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-1">
                      Trust score
                    </span>
                    <span className="text-lg font-bold text-slate-800">{score.toFixed(1)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-1">
                      Status
                    </span>
                    <span className="text-lg font-bold text-slate-800 flex items-center gap-1">
                      {user.isActive !== false ? "Active" : "Inactive"}{" "}
                      <Star size={14} className="fill-amber-400 text-amber-400" />
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedUserId(user.id)}
                    className="flex-1 py-2.5 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    View profile
                  </button>
                  <button
                    type="button"
                    onClick={handleReward}
                    className="flex-1 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors flex justify-center items-center gap-2 shadow-md"
                  >
                    <Award size={14} /> Reward
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      {!loading && highImpact.length === 0 ? (
        <p className="text-center text-slate-500 text-sm">No high-impact users in the current filters.</p>
      ) : null}
    </div>
  );

  const renderFlagged = () => (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <ShieldAlert size={20} className="text-rose-500" /> Review queue
        </h3>
        <p className="text-xs text-slate-500 mt-1">Inactive accounts (extend with fraud signals when available).</p>
      </div>
      <table className="w-full text-left whitespace-nowrap">
        <thead className="bg-slate-50 text-xs text-slate-500 font-semibold border-b border-slate-100">
          <tr>
            <th className="px-6 py-4">User</th>
            <th className="px-6 py-4">Signal</th>
            <th className="px-6 py-4">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {flagged.map((user) => (
            <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://i.pravatar.cc/150?img=${avatarIndex(user.id)}`}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover border border-rose-200"
                  />
                  <div>
                    <span className="text-sm font-semibold text-slate-800 block">{user.fullName}</span>
                    <span className="text-xs text-slate-500">{user.role}</span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm font-medium text-slate-800 block">Account inactive</span>
                <span className="text-xs text-slate-500">Trust {(user.trustScore ?? 0).toFixed(1)}</span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedUserId(user.id)}
                    className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1"
                  >
                    <Search size={14} /> Open
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleSuspend(user.id, user.isActive !== false)}
                    className="px-3 py-1.5 bg-rose-50 text-rose-600 text-xs font-bold rounded-lg hover:bg-rose-100 transition-colors"
                  >
                    Suspend
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!loading && flagged.length === 0 ? (
        <div className="p-8 text-center text-slate-500 text-sm">No users in this queue.</div>
      ) : null}
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold tracking-widest text-brand-green uppercase mb-2">ACCESS CONTROL</h2>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">User management</h1>
          <p className="text-sm text-slate-500 mt-2">
            Directory data from <code className="text-xs bg-slate-100 px-1 rounded">GET /users</code>.{" "}
            <button type="button" onClick={() => void reload()} className="text-brand-green font-semibold hover:underline">
              Refresh
            </button>
          </p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl w-max flex-wrap">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "all" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Users size={16} /> All users
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("high_impact")}
            className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "high_impact" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Award size={16} className={activeTab === "high_impact" ? "text-amber-500" : ""} /> High impact
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("flagged")}
            className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "flagged" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Flag size={16} className={activeTab === "flagged" ? "text-rose-500" : ""} /> Flagged
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("requests")}
            className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "requests" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <CheckCircle2 size={16} className={activeTab === "requests" ? "text-brand-green" : ""} />
            Access requests
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
          {activeTab === "all" && renderAllUsers()}
          {activeTab === "high_impact" && renderHighImpact()}
          {activeTab === "flagged" && renderFlagged()}
          {activeTab === "requests" && <AccessRequestManagement />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
