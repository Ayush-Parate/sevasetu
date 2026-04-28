import React, { useState } from "react";
import {
  Users2,
  Handshake,
  Globe,
  Plus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Search,
  Filter,
  Zap,
  Truck,
  Package,
  HeartPulse,
  Tent,
  GraduationCap,
  Scale,
  Stethoscope,
  Radio,
  Share2,
  LayoutDashboard,
  Box,
  History,
  ArrowUpRight,
  Activity,
  AlertCircle,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useToast } from "../Toast";

type CollabMode =
  | "partners"
  | "campaigns"
  | "volunteers"
  | "resources"
  | "coordination";

export default function PartnerCollaboration() {
  const [activeMode, setActiveMode] = useState<CollabMode>("partners");
  const { showToast } = useToast();

  const handleAction = (action: string) => {
    showToast(`${action} successful!`, "success");
  };

  const partners = [
    {
      id: "P-001",
      name: "Global Reach Initiative",
      type: "NGO Partner",
      focus: "Medical Logistics",
      region: "North District",
      trust: 98,
      status: "Active Collaboration",
      campaigns: 4,
      logo: "GR",
    },
    {
      id: "P-002",
      name: "Green Earth Foundation",
      type: "Local Group",
      focus: "Sanitation",
      region: "Sector 4 & 5",
      trust: 92,
      status: "Joint Campaign",
      campaigns: 2,
      logo: "GE",
    },
    {
      id: "P-003",
      name: "Unity School District",
      type: "Educational Inst.",
      focus: "Community Outreach",
      region: "West Ward",
      trust: 85,
      status: "Partner Active",
      campaigns: 1,
      logo: "US",
    },
    {
      id: "P-004",
      name: "MediNet Hospital",
      type: "Medical Partner",
      focus: "Health Camps",
      region: "Global",
      trust: 99,
      status: "Pending Resource Swap",
      campaigns: 0,
      logo: "MN",
    },
  ];

  const renderOverviewCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {[
        {
          label: "Active Partners",
          value: "24",
          sub: "12 NGOs • 4 Schools • 8 CSR",
          icon: Globe,
          color: "text-indigo-600",
          bg: "bg-indigo-50",
          action: "View Partners",
        },
        {
          label: "Joint Campaigns",
          value: "08",
          sub: "4 Co-managed active",
          icon: Zap,
          color: "text-amber-600",
          bg: "bg-amber-50",
          action: "Open Collab",
        },
        {
          label: "Shared Vol. Pool",
          value: "1.2k",
          sub: "240 Emergency Ready",
          icon: Users,
          color: "text-emerald-600",
          bg: "bg-emerald-50",
          action: "Shared Pool",
        },
        {
          label: "Resource Exchange",
          value: "84%",
          sub: "Stock Sync Active",
          icon: Package,
          color: "text-rose-600",
          bg: "bg-rose-50",
          action: "Open Exchange",
        },
      ].map((card, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm group"
        >
          <div className="flex justify-between items-start mb-4">
            <div
              className={`p-2.5 rounded-2xl ${card.bg} ${card.color} group-hover:scale-110 transition-transform`}
            >
              <card.icon size={20} />
            </div>
            <button
              onClick={() => handleAction(`Navigating to ${card.action}`)}
              className="text-[10px] font-black uppercase text-indigo-600 hover:underline"
            >
              {card.action}
            </button>
          </div>
          <div className="text-3xl font-black text-slate-900 mb-1">
            {card.value}
          </div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            {card.label}
          </div>
          <div className="text-[10px] font-bold text-slate-500 leading-none">
            {card.sub}
          </div>
        </div>
      ))}
    </div>
  );

  const renderPartnerDirectory = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] uppercase font-black tracking-widest text-slate-500">
              <th className="px-6 py-4">Organization</th>
              <th className="px-6 py-4">Focus / Region</th>
              <th className="px-6 py-4">Trust Score</th>
              <th className="px-6 py-4 text-right">Collaboration Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {partners.map((partner) => (
              <tr key={partner.id} className="group hover:bg-slate-50/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs">
                      {partner.logo}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">
                        {partner.name}
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">
                        {partner.type}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs font-bold text-slate-700">
                    {partner.focus}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">
                    {partner.region}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 max-w-[60px] h-1.5 bg-slate-100 rounded-full">
                      <div
                        className="h-full bg-brand-green rounded-full"
                        style={{ width: `${partner.trust}%` }}
                      ></div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-900">
                      {partner.trust}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleAction(`Campaign Invite: ${partner.name}`)}
                      className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
                      title="Invite to Campaign"
                    >
                      <Zap size={14} />
                    </button>
                    <button
                      onClick={() => handleAction(`Vol. Access: ${partner.name}`)}
                      className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"
                      title="Share Volunteer Access"
                    >
                      <Users size={14} />
                    </button>
                    <button
                      onClick={() => handleAction(`Suspend Partner: ${partner.id}`)}
                      className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors"
                      title="Suspend Collaboration"
                    >
                      <AlertCircle size={14} />
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

  const renderResourceExchange = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        {[
          {
            item: "Rice/Wheat Stocks",
            qty: "4,500 kg",
            needed: "800 kg",
            category: "Food",
            icon: Package,
            partner: "Unity District",
          },
          {
            item: "Medical First-Aid Kits",
            qty: "120 Units",
            needed: "40 Units",
            category: "Health",
            icon: HeartPulse,
            partner: "Global Reach",
          },
          {
            item: "Emergency Shelter Tents",
            qty: "12 Units",
            needed: "25 Units",
            category: "Shelter",
            icon: Tent,
            partner: "Green Earth",
          },
        ].map((res, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center">
                <res.icon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{res.item}</h4>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {res.category} • In Network: {res.qty}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs font-black text-rose-500">
                  {res.needed} Shortfall
                </div>
                <div className="text-[10px] text-slate-400">
                  Near {res.partner}
                </div>
              </div>
              <button
                onClick={() => handleAction("Resource Request Sent")}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all flex items-center gap-2"
              >
                <Share2 size={14} /> Request
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/20 blur-3xl rounded-full"></div>
        <div>
          <h3 className="text-xl font-black mb-4">Resource Exchange Hub</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Manage surplus stocks and critical shortfalls across the organization
            network. Enable automatic stock normalization for disaster preparedness.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-2xl">
              <Box size={20} className="text-brand-green" />
              <div className="text-xs font-bold">Smart Allocation logic enabled</div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-2xl">
              <History size={20} className="text-brand-green" />
              <div className="text-xs font-bold">Audit trail cryptographically verified</div>
            </div>
          </div>
        </div>
        <button
          onClick={() => handleAction("Stock Sync Policy Updated")}
          className="w-full py-4 bg-brand-green text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-brand-green/20 hover:brightness-110 transition-all"
        >
          Manage Exchange Policy
        </button>
      </div>
    </div>
  );

  const renderCoordinationRoom = () => (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[500px]">
      <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse"></div>
            <h3 className="text-sm font-black text-slate-900">
              Live Coordination Feed
            </h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleAction("Broadcast Sent")}
              className="px-3 py-1.5 bg-rose-500 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all"
            >
              Priority Broadcast
            </button>
          </div>
        </div>
        <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar">
          {[
            {
              org: "Global Reach",
              user: "Dr. Arun",
              msg: "Supplies for Ward 4 health camp are 20% short. Can Unity School provide more volunteer support for traffic control?",
              time: "2m ago",
              urgent: true,
            },
            {
              org: "Unity School",
              user: "Principal Mehta",
              msg: "Confirmed. 20 youth volunteers arriving by 3 PM. Sending coordinator contact details.",
              time: "1m ago",
              urgent: false,
            },
            {
              org: "YOU",
              user: "OPS Dashboard",
              msg: "Logistics update: Transport vehicle V-12 diverted to Ward 4 with supplementary medical kits.",
              time: "Just now",
              urgent: false,
              system: true,
            },
          ].map((chat, i) => (
            <div
              key={i}
              className={`flex flex-col ${chat.system ? "items-center" : "items-start"}`}
            >
              {!chat.system ? (
                <div className="max-w-[80%]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase text-indigo-600">
                      {chat.org}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      {chat.user} • {chat.time}
                    </span>
                    {chat.urgent && (
                      <span className="text-[8px] font-black text-rose-500 uppercase tracking-tight">
                        Critical
                      </span>
                    )}
                  </div>
                  <div
                    className={`p-4 rounded-2xl text-sm font-medium ${
                      chat.org === "YOU"
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {chat.msg}
                  </div>
                </div>
              ) : (
                <div className="px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-widest border border-emerald-100">
                  SYSTEM: {chat.msg}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-slate-100 flex gap-2">
          <input
            type="text"
            placeholder="Type coordination note..."
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-green/20"
          />
          <button className="p-3 bg-slate-900 text-white rounded-xl hover:bg-brand-green transition-all">
            <ArrowUpRight size={20} />
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
            Coordination Status
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">Active Orgs</span>
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-black rounded">
                12
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">Sync Status</span>
              <span className="text-xs font-black text-emerald-500">Live</span>
            </div>
          </div>
          <button
            onClick={() => handleAction("Emergency Channel Initiated")}
            className="w-full mt-6 py-3 bg-rose-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 shadow-lg shadow-rose-500/20"
          >
            Start Emergency Channel
          </button>
        </div>
        <div className="p-6 bg-slate-50 border border-dashed border-slate-200 rounded-3xl text-center">
          <Radio size={32} className="text-slate-200 mx-auto mb-2" />
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic leading-relaxed">
            Shared command enabled. <br /> OPS data syncing.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Handshake className="text-indigo-500" size={20} />
            <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase">
              Partner Collaboration Command Center
            </h2>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-2">
            Sector Synergy & Network OPS
          </h1>
          <p className="text-slate-500 max-w-2xl text-sm leading-relaxed">
            Build coordinated action across NGOs, institutions, schools, CSR
            teams, and community partners for faster social impact.
          </p>
        </div>
        <button
          onClick={() => handleAction("Partner Invitation Link Generated")}
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
        >
          <Plus size={18} /> Invite Partner Organisation
        </button>
      </div>

      {renderOverviewCards()}

      <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl mb-8 w-max overflow-x-auto">
        {[
          { id: "partners", label: "Partner Directory", icon: Globe },
          { id: "campaigns", label: "Joint Campaigns", icon: Zap },
          { id: "volunteers", label: "Shared Vol. Pool", icon: Users },
          { id: "resources", label: "Resource Exchange", icon: Box },
          { id: "coordination", label: "Coordination Room", icon: Radio },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveMode(tab.id as CollabMode)}
            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeMode === tab.id
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <tab.icon
              size={18}
              className={activeMode === tab.id ? "text-indigo-500" : ""}
            />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          {activeMode === "partners" && (
            <motion.div
              key="partners"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {renderPartnerDirectory()}
            </motion.div>
          )}

          {activeMode === "volunteers" && (
            <motion.div
              key="volunteers"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm text-center flex flex-col items-center justify-center"
            >
              <Users size={64} className="text-indigo-100 mb-6" />
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                Unified Volunteer Network
              </h3>
              <p className="text-slate-500 text-sm max-w-sm mb-12">
                Borrow emergency responders, approve volunteer swaps, and assign
                temporary access to mission-critical tasks for partner
                personnel.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleAction("Emergency Volunteer Request Sent")}
                  className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all"
                >
                  Emergency Request
                </button>
                <button className="px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
                  Borrow Volunteers
                </button>
              </div>
            </motion.div>
          )}

          {activeMode === "resources" && (
            <motion.div
              key="resources"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {renderResourceExchange()}
            </motion.div>
          )}

          {activeMode === "coordination" && (
            <motion.div
              key="coordination"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {renderCoordinationRoom()}
            </motion.div>
          )}

          {activeMode === "campaigns" && (
            <motion.div
              key="campaigns"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-white border border-slate-100 rounded-[2.5rem] p-12 text-center"
            >
              <LayoutDashboard size={64} className="text-amber-100 mb-6 mx-auto" />
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                Campaign Progress Tracker
              </h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto mb-10 leading-relaxed">
                Centralized monitoring for multi-org missions. Track individual
                partner responsibilities and resource burn rates in real-time.
              </p>
              <button
                onClick={() => handleAction("Joint Campaign Setup Begun")}
                className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all"
              >
                Create Joint Campaign
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
