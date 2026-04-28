import React, { useState } from "react";
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
  Activity,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import UserProfileView from "./UserProfileView";
import { useToast } from "./Toast";

type UserTab = "all" | "high_impact" | "flagged";

const mockUsers = [
  {
    id: 1,
    name: "Marcus Chen",
    role: "Field Coordinator",
    ngo: "Global Reach",
    city: "North District",
    score: 9.8,
    status: "Active",
    verification: "Verified",
    avatar: "33",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "NGO Admin",
    ngo: "New Hope Foundation",
    city: "South Region",
    score: 8.5,
    status: "Active",
    verification: "Verified",
    avatar: "24",
  },
  {
    id: 3,
    name: "Emma Wilson",
    role: "Volunteer",
    ngo: "CareConnect",
    city: "East End",
    score: 4.2,
    status: "Flagged",
    verification: "Pending",
    avatar: "12",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Verifier",
    ngo: "System Independent",
    city: "West District",
    score: 9.9,
    status: "Active",
    verification: "Verified",
    avatar: "11",
  },
  {
    id: 5,
    name: "Lisa Rodriguez",
    role: "Survey Collector",
    ngo: "Community First",
    city: "Central",
    score: 9.5,
    status: "Active",
    verification: "Verified",
    avatar: "45",
  },
];

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState<UserTab>("all");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const { showToast } = useToast();

  if (selectedUserId !== null) {
    return <UserProfileView onBack={() => setSelectedUserId(null)} />;
  }

  const handleVerify = () =>
    showToast("Identity documents verified.", "success");
  const handleSuspend = () =>
    showToast("User suspended temporarily.", "warning");
  const handleReward = () => showToast("Incentive reward granted.", "success");

  const renderAllUsers = () => (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-3 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search users by name, email, or ID..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/10 transition-all text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {["Role", "City", "NGO Status", "Verification"].map((filter) => (
            <button
              key={filter}
              className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold border border-slate-100 flex items-center gap-2 hover:bg-slate-100"
            >
              {filter} <ChevronDown size={14} />
            </button>
          ))}
          <button className="w-10 h-10 bg-slate-50 text-slate-600 rounded-xl border border-slate-100 flex justify-center items-center hover:bg-slate-100">
            <Filter size={16} />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-slate-50 text-xs text-slate-500 font-semibold border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role & NGO</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Trust Score</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {mockUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://i.pravatar.cc/150?img=${user.avatar}`}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full object-cover bg-slate-100"
                    />
                    <div>
                      <span className="text-sm font-semibold text-slate-800 block">
                        {user.name}
                      </span>
                      <span className="text-[10px] text-slate-500 tracking-wider uppercase">
                        {user.verification}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-slate-800 block">
                    {user.role}
                  </span>
                  <span className="text-xs text-slate-500">{user.ngo}</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                  {user.city}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-800">
                      {user.score}
                    </span>
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${user.score >= 9 ? "bg-emerald-500" : user.score >= 5 ? "bg-amber-500" : "bg-rose-500"}`}
                        style={{ width: `${user.score * 10}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      user.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedUserId(user.id)}
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

  const renderHighImpact = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockUsers
          .filter((u) => u.score > 9)
          .map((user) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              key={user.id}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-100 transition-colors"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={`https://i.pravatar.cc/150?img=${user.avatar}`}
                      alt="Avatar"
                      className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-slate-900">{user.name}</h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {user.role}
                      </p>
                    </div>
                  </div>
                  <div className="bg-amber-100 text-amber-600 p-2 rounded-xl">
                    <Award size={20} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-1">
                      Completion
                    </span>
                    <span className="text-lg font-bold text-slate-800">
                      98.5%
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-1">
                      Community Rating
                    </span>
                    <span className="text-lg font-bold text-slate-800 flex items-center gap-1">
                      5.0{" "}
                      <Star
                        size={14}
                        className="fill-amber-400 text-amber-400"
                      />
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedUserId(user.id)}
                    className="flex-1 py-2.5 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    View Activity
                  </button>
                  <button
                    onClick={handleReward}
                    className="flex-1 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors flex justify-center items-center gap-2 shadow-md"
                  >
                    <Award size={14} /> Reward
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );

  const renderFlagged = () => (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <ShieldAlert size={20} className="text-rose-500" /> Users Requiring
          Investigation
        </h3>
      </div>
      <table className="w-full text-left whitespace-nowrap">
        <thead className="bg-slate-50 text-xs text-slate-500 font-semibold border-b border-slate-100">
          <tr>
            <th className="px-6 py-4">User</th>
            <th className="px-6 py-4">Issue Priority</th>
            <th className="px-6 py-4">Flag Reason</th>
            <th className="px-6 py-4">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {mockUsers
            .filter((u) => u.status === "Flagged")
            .map((user) => (
              <tr
                key={user.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://i.pravatar.cc/150?img=${user.avatar}`}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full object-cover border border-rose-200"
                    />
                    <div>
                      <span className="text-sm font-semibold text-slate-800 block">
                        {user.name}
                      </span>
                      <span className="text-xs text-slate-500">
                        {user.role}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-rose-100 text-rose-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                    High Priority
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-slate-800 block">
                    Repeated GPS spoofing detected
                  </span>
                  <span className="text-xs text-slate-500">
                    During field report submissions
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedUserId(user.id)}
                      className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1"
                    >
                      <Search size={14} /> Investigate
                    </button>
                    <button
                      onClick={handleSuspend}
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
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold tracking-widest text-brand-green uppercase mb-2">
            ACCESS CONTROL
          </h2>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            User Management
          </h1>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl w-max">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "all"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Users size={16} /> All Users
          </button>
          <button
            onClick={() => setActiveTab("high_impact")}
            className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "high_impact"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Award
              size={16}
              className={activeTab === "high_impact" ? "text-amber-500" : ""}
            />{" "}
            High Impact
          </button>
          <button
            onClick={() => setActiveTab("flagged")}
            className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "flagged"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Flag
              size={16}
              className={activeTab === "flagged" ? "text-rose-500" : ""}
            />{" "}
            Flagged
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
