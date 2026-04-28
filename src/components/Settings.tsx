import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  Globe,
  ShieldCheck,
  Award,
  Users,
  AlertTriangle,
  Bell,
  Save,
  RotateCcw,
  PlayCircle,
  Sliders,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useToast } from "./Toast";

type Tab = "global" | "verification" | "trust" | "auto" | "fraud" | "notify";

export default function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>("global");
  const { showToast } = useToast();

  const handleSave = () => showToast("Settings saved successfully.", "success");
  const handleReset = () => showToast("Settings reverted to defaults.", "info");

  const renderGlobalSettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Globe className="text-brand-green" /> Platform Configurations
        </h3>
        <div className="space-y-6 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                Platform Timezone
              </label>
              <select className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green/20">
                <option>UTC (Coordinated Universal Time)</option>
                <option>IST (Indian Standard Time)</option>
                <option>PST (Pacific Standard Time)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                Map Default Region
              </label>
              <select className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green/20">
                <option>National View</option>
                <option>Maharashtra</option>
                <option>Karnataka</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
              Escalation Time Limits (Hours)
            </label>
            <input
              type="number"
              defaultValue={24}
              className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green/20"
            />
            <p className="text-xs text-slate-500 mt-2">
              Unresolved critical tasks will auto-escalate to Super Admin after
              this duration.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-lg"
        >
          <Save size={18} /> Save Changes
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-slate-50 text-slate-700 border border-slate-200 text-sm font-bold rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-2"
        >
          <RotateCcw size={18} /> Reset Defaults
        </button>
      </div>
    </div>
  );

  const renderVerificationPolicies = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <ShieldCheck className="text-indigo-500" /> Verification Logic
        </h3>

        <div className="space-y-6 max-w-2xl">
          {[
            {
              label: "Auto-verify trusted NGO reports",
              desc: "Reports from NGOs with trust score > 9 bypass manual review.",
              defaultChecked: true,
            },
            {
              label: "Require manual approval for emergency reports",
              desc: "All critical/red-zone reports must be vetted by a Coordinator.",
              defaultChecked: false,
            },
            {
              label: "Enforce duplicate report checking",
              desc: "AI prevents identical tasks from being created within 5km radius.",
              defaultChecked: true,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100"
            >
              <div>
                <h4 className="font-semibold text-slate-800 text-sm">
                  {item.label}
                </h4>
                <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked={item.defaultChecked}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green"></div>
              </label>
            </div>
          ))}

          <div>
            <div className="flex justify-between mb-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                Confidence Threshold
              </label>
              <span className="text-xs font-bold text-indigo-600">85%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="85"
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <p className="text-xs text-slate-500 mt-2">
              Minimum AI confidence required to auto-verify field images.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      <div className="mb-8">
        <h2 className="text-sm font-semibold tracking-widest text-brand-green uppercase mb-2">
          Governance Engine
        </h2>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-2">
          System Settings
        </h1>
        <p className="text-slate-500 max-w-3xl leading-relaxed">
          Enterprise-grade rule engine controlling platform behaviors,
          verification logic, assignment algorithms, and automated fraud
          thresholds.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="xl:w-64 shrink-0 space-y-2 flex flex-row xl:flex-col overflow-x-auto pb-4 xl:pb-0 custom-scrollbar">
          {[
            { id: "global", label: "Global Settings", icon: Globe },
            {
              id: "verification",
              label: "Verification Policies",
              icon: ShieldCheck,
            },
            { id: "trust", label: "Trust Score Rules", icon: Award },
            { id: "auto", label: "Auto-Assignment", icon: Users },
            { id: "fraud", label: "Fraud Thresholds", icon: AlertTriangle },
            { id: "notify", label: "Notification Rules", icon: Bell },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap text-left ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-white text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-100"
              }`}
            >
              <tab.icon
                size={18}
                className={
                  activeTab === tab.id ? "text-brand-green" : "text-slate-400"
                }
              />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "global" && renderGlobalSettings()}
              {activeTab === "verification" && renderVerificationPolicies()}
              {/* Other tabs would have specialized rule builders */}
              {["trust", "auto", "fraud", "notify"].includes(activeTab) && (
                <div className="bg-white p-12 flex flex-col items-center justify-center rounded-3xl border border-slate-100 shadow-sm text-center">
                  <Sliders size={48} className="text-slate-300 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Rule Builder Interface
                  </h3>
                  <p className="text-slate-500 max-w-sm mb-6">
                    Configure precise algorithm weights and logic parameters for
                    the {activeTab} engine.
                  </p>
                  <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold flex items-center gap-2">
                    <PlayCircle size={16} /> Test Logic Simulation
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
