import React, { useState } from "react";
import {
  Shield,
  Bell,
  Zap,
  Activity,
  Users,
  Lock,
  Globe,
  Settings as SettingsIcon,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Gauge,
  Workflow,
  Radio,
  Map,
  Eye,
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
  Mail,
  Smartphone,
  Server,
  CloudLightning,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useToast } from "../Toast";

type SettingSection =
  | "task_approval"
  | "volunteer_trust"
  | "campaign"
  | "emergency"
  | "verification"
  | "notifications"
  | "area_access";

export default function NGOSettings() {
  const [activeSection, setActiveSection] = useState<SettingSection>(
    "task_approval"
  );
  const { showToast } = useToast();

  const handleAction = (msg: string) => {
    showToast(`${msg} saved!`, "success");
  };

  const sections = [
    {
      id: "task_approval",
      label: "Task Approval Rules",
      icon: Workflow,
      desc: "Auto-approval workflow & logic gates",
    },
    {
      id: "volunteer_trust",
      label: "Vol. Trust Logic",
      icon: Gauge,
      desc: "Formula for community trust scores",
    },
    {
      id: "campaign",
      label: "Campaign Controls",
      icon: Zap,
      desc: "Visibility & closure automation",
    },
    {
      id: "emergency",
      label: "Emergency Policy",
      icon: AlertTriangle,
      desc: "Dispatch & auto-escalation rules",
    },
    {
      id: "verification",
      label: "Report Verification",
      icon: ShieldCheck,
      desc: "Fraud risk & duplicate detection",
    },
    {
      id: "notifications",
      label: "Notification Rules",
      icon: Bell,
      desc: "Priority routing & reminder logic",
    },
    {
      id: "area_access",
      label: "Area Management",
      icon: Map,
      desc: "Coordinator territory assignment",
    },
  ];

  const [toggles, setToggles] = useState({
    autoApprove: true,
    manualCritical: true,
    multiLevel: false,
    autoClose: true,
    emergencyBypass: true,
    fraudDetection: true,
  });

  const toggle = (key: keyof typeof toggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderSectionHeader = (title: string, subtitle: string) => (
    <div className="mb-8">
      <h3 className="text-xl font-black text-slate-900 mb-2">{title}</h3>
      <p className="text-sm font-medium text-slate-500 max-w-xl">{subtitle}</p>
    </div>
  );

  const renderTaskApproval = () => (
    <div className="space-y-6">
      {renderSectionHeader(
        "Task Approval Workflow Rules",
        "Control how tasks transition through the states of the system. Define automation thresholds for operational speed."
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            id: "autoApprove",
            title: "Auto-approve low-risk tasks",
            desc: "Tasks under ₹500 or simple informative reports require no verification.",
          },
          {
            id: "manualCritical",
            title: "Manual Approval for Emergency",
            desc: "Critical emergency tasks must be signed off by a Field Coordinator.",
          },
          {
            id: "multiLevel",
            title: "Multi-level Approval",
            desc: "Large scale campaigns require both Coordinator and Admin signoff.",
          },
        ].map((item) => (
          <div
            key={item.id}
            onClick={() => toggle(item.id as keyof typeof toggles)}
            className={`p-6 rounded-3xl border transition-all cursor-pointer flex justify-between items-center group ${
              toggles[item.id as keyof typeof toggles]
                ? "bg-brand-green/5 border-brand-green/20"
                : "bg-white border-slate-100 hover:border-slate-300 shadow-sm"
            }`}
          >
            <div className="max-w-[70%]">
              <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                {item.desc}
              </p>
            </div>
            {toggles[item.id as keyof typeof toggles] ? (
              <ToggleRight className="text-brand-green group-hover:scale-110 transition-transform" size={40} />
            ) : (
              <ToggleLeft className="text-slate-300 group-hover:scale-110 transition-transform" size={40} />
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => handleAction("Approval Logic Rules")}
          className="px-8 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all"
        >
          Save Workflow Rules
        </button>
        <button className="px-8 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
          Test Approval Logic
        </button>
      </div>
    </div>
  );

  const renderVolunteerTrustLogic = () => (
    <div className="space-y-8">
      {renderSectionHeader(
        "Volunteer Trust Score Calculation",
        "Adjust the parameters that define the Trust Score of users on your platform. This determines task eligibility and role upgrades."
      )}
      <div className="space-y-6 max-w-2xl">
        {[
          { label: "Task Completion Rate", weight: 40, color: "bg-brand-green" },
          { label: "Emergency Response Rate", weight: 30, color: "bg-rose-500" },
          { label: "Community Feedback Quality", weight: 20, color: "bg-indigo-500" },
          { label: "Profile Verification Status", weight: 10, color: "bg-amber-500" },
        ].map((param, i) => (
          <div key={i} className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <span className="text-xs font-black text-slate-700 uppercase tracking-widest">
                {param.label}
              </span>
              <span className="text-sm font-black text-slate-900">{param.weight}% Weight</span>
            </div>
            <div className="h-4 bg-slate-100 rounded-full relative overflow-hidden group">
              <div
                className={`h-full ${param.color} rounded-full transition-all duration-1000`}
                style={{ width: `${param.weight}%` }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-end px-4">
                 <div className="h-full w-1 bg-white opacity-20 cursor-ew-resize"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
          Trust Logic Preview
        </h4>
        <p className="text-sm italic font-medium text-slate-500 leading-relaxed mb-6">
          "With current settings, high-impact volunteers (95+ score) will be automatically eligible for Lead Responder roles in emergency campaigns."
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => handleAction("Trust Formula History Saved")}
            className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold"
          >
            Edit Formula
          </button>
          <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold">
            Simulate Changes
          </button>
        </div>
      </div>
    </div>
  );

  const renderEmergencyResponseRules = () => (
    <div className="space-y-6">
      {renderSectionHeader(
        "Emergency Governance & Dispatch Policy",
        "Critical settings for life-saving operations. Define auto-escalation pathways and override policies."
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
           {[
             { title: "Priority Override", level: "Critical", icon: Zap, status: "Active" },
             { title: "Emergency Alert Broadcast", level: "High", icon: Radio, status: "Active" },
             { title: "Auto-Dispatch Nearest Vol.", level: "System", icon: Map, status: "Standby" },
           ].map((rule, i) => (
             <div key={i} className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-rose-200 transition-all">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <rule.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900">{rule.title}</h4>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Response Level: <span className="text-rose-500">{rule.level}</span>
                    </div>
                  </div>
                </div>
                <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase">
                  {rule.status}
                </div>
             </div>
           ))}
        </div>
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
           <CloudLightning className="text-brand-green mb-4" size={32} />
           <h4 className="text-xl font-black mb-4">Emergency SOP</h4>
           <p className="text-sm text-slate-400 leading-relaxed mb-8">
             During an active disaster state, the system automatically bypasses standard approval for life-critical resources.
           </p>
           <button
             onClick={() => handleAction("Emergency Policy Triggered")}
             className="w-full py-4 bg-rose-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-500/30 hover:bg-rose-600 transition-all"
           >
             Activate Emergency SOP
           </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      <div className="mb-10 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
          <SettingsIcon className="text-slate-400" size={20} />
          <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase">
            NGO Operations & Settings Center
          </h2>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-2">
          Central Governance & Logic
        </h1>
        <p className="text-slate-500 max-w-2xl text-sm leading-relaxed mx-auto md:mx-0">
          Manage organization policies, task automation, volunteer trust rules,
          campaign controls, and emergency response governance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-2 sticky top-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as SettingSection)}
              className={`w-full p-4 rounded-2xl transition-all flex items-center gap-4 text-left group overflow-hidden relative ${
                activeSection === section.id
                  ? "bg-slate-900 text-white shadow-xl shadow-slate-900/10 active-setting"
                  : "bg-white border border-slate-50 text-slate-600 hover:bg-slate-50 hover:border-slate-100"
              }`}
            >
              {activeSection === section.id && (
                <motion.div
                   layoutId="active-pill"
                   className="absolute left-0 w-1 h-8 bg-brand-green rounded-r-full"
                />
              )}
              <div
                className={`p-2 rounded-xl shrink-0 transition-all ${
                  activeSection === section.id
                    ? "bg-white/10 text-brand-green"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                <section.icon size={18} />
              </div>
              <div className="flex-1">
                <div className={`text-xs font-black uppercase tracking-widest transition-colors ${
                  activeSection === section.id ? "text-white" : "text-slate-900"
                }`}>
                  {section.label}
                </div>
                <div className={`text-[10px] font-bold mt-0.5 leading-tight ${
                  activeSection === section.id ? "text-slate-400" : "text-slate-500"
                }`}>
                  {section.desc}
                </div>
              </div>
              <ChevronRight
                size={16}
                className={`transition-transform duration-300 ${
                  activeSection === section.id
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-4 opacity-0"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9 bg-white min-h-[600px] rounded-[3rem] border border-slate-100 shadow-sm p-8 lg:p-12 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeSection === "task_approval" && (
              <motion.div
                key="task_approval"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {renderTaskApproval()}
              </motion.div>
            )}

            {activeSection === "volunteer_trust" && (
              <motion.div
                key="volunteer_trust"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {renderVolunteerTrustLogic()}
              </motion.div>
            )}

            {activeSection === "emergency" && (
              <motion.div
                key="emergency"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
              >
                {renderEmergencyResponseRules()}
              </motion.div>
            )}

            {activeSection !== "task_approval" &&
              activeSection !== "volunteer_trust" &&
              activeSection !== "emergency" && (
                <motion.div
                  key="fallback"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-[400px] text-center"
                >
                  <div className="w-20 h-20 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-center mb-6">
                    <Activity size={32} className="text-slate-200" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">
                    Advanced Logic Module
                  </h3>
                  <p className="text-slate-400 text-sm max-w-sm mb-8 font-medium">
                    This module controls high-level {activeSection.replace("_", " ")} logic gates. Advanced operational governance is enabled.
                  </p>
                  <button
                    onClick={() => handleAction(`Settings for ${activeSection}`)}
                    className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-brand-green transition-all"
                  >
                    Open advanced logic
                  </button>
                </motion.div>
              )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
