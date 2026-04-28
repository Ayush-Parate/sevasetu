import React, { useState } from "react";
import {
  Siren,
  Flame,
  Users,
  Building2,
  AlertTriangle,
  Radio,
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  HeartPulse,
  Droplets,
  Navigation,
  CheckCircle2,
  Clock,
  Megaphone,
  Stethoscope,
  Truck,
  Users2,
  Zap,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useToast } from "./Toast";

type Tab = "alerts" | "volunteers" | "ngo" | "queue" | "collaboration";

export default function EmergencyEscalationCenter() {
  const [activeTab, setActiveTab] = useState<Tab>("alerts");
  const [emergencyMode, setEmergencyMode] = useState(false);
  const { showToast } = useToast();

  const handleAction = (action: string) => {
    showToast(`${action} activated!`, "warning");
  };

  const renderTopCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
      <div className="bg-rose-50 border border-rose-100 p-6 rounded-3xl relative overflow-hidden group">
        <div className="absolute right-0 top-0 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-rose-500/20 transition-all"></div>
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="p-2 rounded-xl bg-rose-100 text-rose-600">
            <Siren size={20} />
          </div>
          <h3 className="text-xs font-bold text-rose-900 uppercase tracking-widest whitespace-nowrap">
            Red Alerts
          </h3>
        </div>
        <div className="flex items-baseline gap-2 mb-1 relative z-10">
          <span className="text-4xl font-black text-rose-700 tracking-tight">
            14
          </span>
          <span className="text-xs font-bold text-rose-500 flex items-center">
            Zones
          </span>
        </div>
        <p className="text-xs text-rose-600/80 mb-4 relative z-10">
          Instant attention required
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl relative overflow-hidden group">
        <div className="absolute right-0 top-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-500/20 transition-all"></div>
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-600">
            <Users2 size={20} />
          </div>
          <h3 className="text-xs font-bold text-amber-900 uppercase tracking-widest whitespace-nowrap">
            Emerg. Pool
          </h3>
        </div>
        <div className="flex items-baseline gap-2 mb-1 relative z-10">
          <span className="text-4xl font-black text-amber-700 tracking-tight">
            420
          </span>
          <span className="text-xs font-bold text-amber-600 flex items-center">
            Avail.
          </span>
        </div>
        <p className="text-xs text-amber-600/80 mb-4 relative z-10">
          Verified responders
        </p>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-3xl relative overflow-hidden group">
        <div className="absolute right-0 top-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/20 transition-all"></div>
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="p-2 rounded-xl bg-indigo-100 text-indigo-600">
            <Zap size={20} />
          </div>
          <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-widest whitespace-nowrap">
            Rapid Dispatch
          </h3>
        </div>
        <div className="flex items-baseline gap-2 mb-1 relative z-10">
          <span className="text-4xl font-black text-indigo-700 tracking-tight">
            8
          </span>
          <span className="text-xs font-bold text-indigo-600 flex items-center">
            Min Avg
          </span>
        </div>
        <p className="text-xs text-indigo-600/80 mb-4 relative z-10">
          Response latency
        </p>
      </div>

      <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl relative overflow-hidden group">
        <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-all"></div>
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600">
            <Building2 size={20} />
          </div>
          <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-widest whitespace-nowrap">
            Partners
          </h3>
        </div>
        <div className="flex items-baseline gap-2 mb-1 relative z-10">
          <span className="text-4xl font-black text-emerald-700 tracking-tight">
            12
          </span>
          <span className="text-xs font-bold text-emerald-600 flex items-center">
            Active
          </span>
        </div>
        <p className="text-xs text-emerald-600/80 mb-4 relative z-10">
          NGOs collaborating
        </p>
      </div>
    </div>
  );

  const renderAlerts = () => (
    <div className="space-y-4">
      {[
        {
          id: "E-102",
          title: "Sudden Food Crisis",
          desc: "Block C community kitchen shutdown due to fire.",
          urgency: "Critical",
          location: "North Wing",
          time: "4 mins ago",
          type: "Food",
        },
        {
          id: "E-105",
          title: "Health Outbreak",
          desc: "50+ symptoms of water-borne illness reported in sector 4.",
          urgency: "High",
          location: "Sector 4",
          time: "12 mins ago",
          type: "Medical",
        },
        {
          id: "E-108",
          title: "Women Safety Escalation",
          desc: "SOS signals from street lighting blackout area.",
          urgency: "Critical",
          location: "Park Rd",
          time: "15 mins ago",
          type: "Safety",
        },
      ].map((alert) => (
        <div
          key={alert.id}
          className="bg-white rounded-3xl border border-slate-100 p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 shrink-0">
            {alert.type === "Medical" ? (
              <HeartPulse size={32} />
            ) : alert.type === "Food" ? (
              <Flame size={32} />
            ) : (
              <ShieldAlert size={32} />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {alert.id}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                  alert.urgency === "Critical"
                    ? "bg-rose-100 text-rose-700 animate-pulse"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {alert.urgency}
              </span>
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-1">
              {alert.title}
            </h3>
            <p className="text-sm text-slate-500 leading-snug">{alert.desc}</p>
          </div>
          <div className="flex md:flex-col gap-2 shrink-0 w-full md:w-auto">
            <button
              onClick={() => handleAction("Emergency Dispatch")}
              className="flex-1 py-2.5 px-6 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              <Zap size={14} className="text-brand-green" /> Priority Dispatch
            </button>
            <button
              onClick={() => handleAction("Network Alert Sent")}
              className="flex-1 py-2.5 px-6 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              <Megaphone size={14} /> Alert Network
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      <div className="mb-8 p-8 bg-slate-950 rounded-3xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-rose-500 rounded-lg animate-pulse">
                <Siren className="text-white" size={18} />
              </div>
              <h2 className="text-xs font-black tracking-widest text-rose-400 uppercase">
                Critical Operations
              </h2>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white mb-2">
              Emergency Response Center
            </h1>
            <p className="text-slate-400 max-w-2xl text-sm leading-relaxed">
              Activate rapid dispatch protocols for floods, health outbreaks, or
              safety escalations. Override standard approval chains to save
              lives.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleAction("Mass Volunteer Alert")}
              className="py-3 px-6 bg-rose-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-rose-500/30 hover:bg-rose-600 transition-all flex items-center justify-center gap-2"
            >
              <Megaphone size={18} /> Mass Volunteer Alert
            </button>
            <button
              onClick={() => handleAction("Emergency Response Protocols")}
              className="py-3 px-6 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Zap size={18} className="text-brand-green" /> Activate Primary Response
            </button>
          </div>
        </div>
      </div>

      {renderTopCards()}

      <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl mb-8 w-max overflow-x-auto">
        {[
          { id: "alerts", label: "Red Alerts Feed", icon: Siren },
          { id: "volunteers", label: "Emergency Pool", icon: Users2 },
          { id: "queue", label: "Dispatch Queue", icon: Zap },
          { id: "collaboration", label: "NGO Collab Room", icon: MessageSquare },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <tab.icon
              size={18}
              className={activeTab === tab.id ? "text-rose-500" : ""}
            />{" "}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[500px]">
        {activeTab === "alerts" && renderAlerts()}
        {activeTab === "volunteers" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Medical Dr.",
              "Logistics Lead",
              "Rescue Squad",
              "Food Relief Coordinator",
              "Child Specialist",
            ].map((role, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                    <Users size={24} />
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-lg">
                    VERIFIED
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{role} Team</h3>
                <p className="text-xs text-slate-400 mb-4">
                  12 responders available in 15 mins
                </p>
                <button
                  onClick={() => handleAction(`${role} Mobilization`)}
                  className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all"
                >
                  Mobilize Now
                </button>
              </div>
            ))}
          </div>
        )}
        {activeTab === "collaboration" && (
          <div className="bg-white p-12 rounded-3xl border border-slate-100 shadow-sm text-center flex flex-col items-center justify-center">
            <Radio size={64} className="text-slate-200 mb-4 animate-pulse" />
            <h3 className="text-xl font-black text-slate-900 mb-2">
              NGO Collaboration Room
            </h3>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed mb-8">
              Open a shared secure channel with partner NGOs to coordinate
              overlapping missions and prevent resource waste during the crisis.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleAction("Partner Invite")}
                className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
              >
                Invite Partner NGO
              </button>
              <button
                onClick={() => handleAction("Joint Op Mode")}
                className="px-8 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all"
              >
                Launch Joint Campaign
              </button>
            </div>
          </div>
        )}
        {activeTab === "queue" && (
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50">
                  <th className="pb-4 pt-2 px-4 whitespace-nowrap">ID</th>
                  <th className="pb-4 pt-2 px-4">Urgent Task</th>
                  <th className="pb-4 pt-2 px-4 whitespace-nowrap">ETA</th>
                  <th className="pb-4 pt-2 px-4 text-right">Dispatch</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i}>
                    <td className="py-4 px-4 font-mono text-xs text-slate-400">
                      RQ-{150 + i}
                    </td>
                    <td className="py-4 px-4 font-bold text-sm text-slate-900">
                      Deploy 4 medical kits to Coastal Camp {i}
                    </td>
                    <td className="py-4 px-4 text-xs font-bold text-rose-500">
                      T-minus {10 + i * 5}m
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => handleAction("Manual Dispatch Override")}
                        className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
                      >
                        <Navigation size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
