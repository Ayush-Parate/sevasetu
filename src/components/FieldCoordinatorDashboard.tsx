import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  ShieldCheck,
  Users,
  CheckCircle,
  Map,
  AlertTriangle,
  MessageSquare,
  BarChart,
  Settings as SettingsIcon,
  LogOut,
  Bell,
  MapPin,
  Clock,
  Activity,
  Flame,
  LayoutDashboard,
} from "lucide-react";
import ReportsIntakeCenter from "./ReportSubmission";
import MatchingLogic from "./MatchingLogic";
import TaskTracker from "./TaskTracker";
import MapIntelligence from "./MapIntelligence";
import VerificationCenter from "./fc/VerificationCenter";
import EmergencyResponseCenter from "./fc/EmergencyResponseCenter";
import CommunityCommunicationHub from "./fc/CommunityCommunicationHub";
import ProofVerificationCenter from "./fc/ProofVerificationCenter";
import LocalAnalyticsDashboard from "./fc/LocalAnalyticsDashboard";
import FCSettings from "./fc/FCSettings";

type DashboardView =
  | "dashboard"
  | "reports"
  | "verification"
  | "dispatch"
  | "monitoring"
  | "heatmap"
  | "emergency"
  | "communication"
  | "proof"
  | "analytics"
  | "settings";

const SidebarItem = ({
  label,
  icon: Icon,
  active,
  onClick,
  badge,
}: {
  label: string;
  icon: any;
  active: boolean;
  onClick: () => void;
  badge?: string;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all group ${
      active
        ? "bg-brand-green text-white shadow-xl shadow-brand-green/20"
        : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
    }`}
  >
    <div className="flex items-center gap-3">
      <Icon
        size={18}
        className={active ? "text-white" : "group-hover:text-brand-green transition-colors"}
      />
      <span className="font-bold text-[11px] uppercase tracking-widest">{label}</span>
    </div>
    {badge && (
      <span
        className={`px-2 py-0.5 rounded-lg text-[9px] font-black tracking-widest ${
          active ? "bg-white/20 text-white" : "bg-brand-peach text-brand-orange"
        }`}
      >
        {badge}
      </span>
    )}
  </button>
);

export default function FieldCoordinatorDashboard({
  onLogout,
}: {
  onLogout: () => void;
}) {
  const [activeView, setActiveView] = useState<DashboardView>("dashboard");

  const renderDashboardOverview = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="text-brand-green" size={20} />
            <h2 className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
              Field Operations Command Center
            </h2>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">
            Ground-Level <span className="text-brand-green italic">Intelligence</span>
          </h1>
          <p className="text-slate-500 max-w-2xl text-sm leading-relaxed opacity-75">
            Real-time tracking of community issues, volunteer deployment, emergency actions, and ground operations across your assigned zones.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-2xl flex items-center gap-3 border border-slate-100 shadow-sm">
             <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse"></div>
             <span className="text-[10px] font-black text-slate-600 tracking-widest uppercase">Live Sync Active</span>
          </div>
          <button className="relative p-2.5 bg-white text-slate-400 rounded-2xl hover:text-brand-green hover:bg-slate-50 transition-all border border-slate-100 shadow-sm">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[
          { label: "New Reports Today", value: "24", sub: "8 Urgent needs pending", icon: FileText, color: "brand-green", bg: "bg-brand-green/10", border: "border-brand-green/10", btn: "Reports Queue", alert: true },
          { label: "Active Volunteers", value: "15", sub: "Available within 5km", icon: Users, color: "emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/10", btn: "Dispatch Center" },
          { label: "Live Tasks", value: "32", sub: "5 delayed, 12 completed", icon: Activity, color: "brand-orange", bg: "bg-brand-orange/10", border: "border-brand-orange/10", btn: "Task Tracker" },
          { label: "Area Hotspots", value: "3", sub: "Critical clusters identified", icon: Flame, color: "rose-500", bg: "bg-rose-500/10", border: "border-rose-500/10", btn: "Local Heatmap" },
          { label: "Pending Verification", value: "18", sub: "Requires field confirmation", icon: ShieldCheck, color: "indigo-500", bg: "bg-indigo-500/10", border: "border-indigo-500/10", btn: "Verify Now" },
          { label: "Emergency Alerts", value: "2", sub: "Active crisis interventions", icon: AlertTriangle, color: "rose-500", bg: "bg-rose-500/10", border: "border-rose-500/10", btn: "Emergency Room", pulse: true },
          { label: "Response Speed", value: "14m", sub: "Average dispatch time", icon: Clock, color: "teal-500", bg: "bg-teal-500/10", border: "border-teal-500/10", btn: "Analytics" },
          { label: "Community Trust", value: "9.2", sub: "Satisfaction index (0-10)", icon: CheckCircle, color: "emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/10", btn: "Feedback" },
        ].map((card, i) => {
          const colorClass = card.color.includes('brand') ? `text-${card.color}` : `text-${card.color}`;
          return (
          <div key={i} className={`bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-xl hover:shadow-slate-200/50 transition-all`}>
             <div className="flex justify-between items-start mb-4 relative z-10">
               <div className={`p-4 rounded-3xl ${card.bg} ${colorClass} ${card.pulse ? "animate-pulse" : ""} group-hover:scale-110 transition-transform`}>
                 <card.icon size={24} />
               </div>
               {card.alert && <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-lg shadow-rose-500/50"></div>}
             </div>
             <div className="relative z-10">
               <div className="text-3xl font-bold text-slate-900 mb-1">{card.value}</div>
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{card.label}</div>
               <div className="text-[10px] font-medium text-slate-400 leading-none mb-6 opacity-75">{card.sub}</div>
               <div className={`text-[10px] font-black uppercase tracking-[0.1em] ${colorClass} group-hover:translate-x-1 transition-transform cursor-pointer inline-flex items-center gap-1.5`}>
                 {card.btn} <span className="opacity-50 tracking-normal">→</span>
               </div>
             </div>
             <div className={`absolute -bottom-6 -right-6 opacity-[0.03] ${colorClass}`}>
               <card.icon size={120} />
             </div>
          </div>
        )})}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#FFFBF7] font-sans text-slate-800 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-slate-100 flex flex-col h-full relative z-20">
        <div className="p-8 flex flex-col border-b border-slate-50">
          <div className="flex items-center gap-1 group cursor-pointer">
            <span className="text-xl font-bold text-slate-800 tracking-tight">NeedGraph<span className="text-brand-green">OS</span></span>
            <div className="w-6 h-1 my-auto bg-brand-green rounded-full -ml-1"></div>
          </div>
          <div className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mt-2">
            Ground Ops Controller
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-1">
          <SidebarItem
            label="Live Dashboard"
            icon={LayoutDashboard}
            active={activeView === "dashboard"}
            onClick={() => setActiveView("dashboard")}
          />
          
          <div className="py-4">
            <div className="px-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
              Intelligence & Intake
            </div>
            <div className="space-y-1">
              <SidebarItem
                label="Reports Intake"
                icon={FileText}
                active={activeView === "reports"}
                onClick={() => setActiveView("reports")}
                badge="24"
              />
              <SidebarItem
                label="Verification Hub"
                icon={ShieldCheck}
                active={activeView === "verification"}
                onClick={() => setActiveView("verification")}
                badge="18"
              />
              <SidebarItem
                label="Area Heatmap"
                icon={Map}
                active={activeView === "heatmap"}
                onClick={() => setActiveView("heatmap")}
              />
            </div>
          </div>

          <div className="py-4">
            <div className="px-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
              Active Execution
            </div>
            <div className="space-y-1">
              <SidebarItem
                label="Volunteer Dispatch"
                icon={Users}
                active={activeView === "dispatch"}
                onClick={() => setActiveView("dispatch")}
              />
              <SidebarItem
                label="Task Monitoring"
                icon={Activity}
                active={activeView === "monitoring"}
                onClick={() => setActiveView("monitoring")}
              />
              <SidebarItem
                label="Emergency Response"
                icon={AlertTriangle}
                active={activeView === "emergency"}
                onClick={() => setActiveView("emergency")}
                badge="2"
              />
            </div>
          </div>

          <div className="py-4">
            <div className="px-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
              Impact & Trust
            </div>
            <div className="space-y-1">
              <SidebarItem
                label="Communication Hub"
                icon={MessageSquare}
                active={activeView === "communication"}
                onClick={() => setActiveView("communication")}
              />
              <SidebarItem
                label="Proof Verification"
                icon={CheckCircle}
                active={activeView === "proof"}
                onClick={() => setActiveView("proof")}
              />
              <SidebarItem
                label="Local Analytics"
                icon={BarChart}
                active={activeView === "analytics"}
                onClick={() => setActiveView("analytics")}
              />
            </div>
          </div>
          
          <div className="py-4">
            <SidebarItem
              label="Operating Procedures"
              icon={SettingsIcon}
              active={activeView === "settings"}
              onClick={() => setActiveView("settings")}
            />
          </div>
        </div>

        <div className="p-6 bg-slate-50/50 border-t border-slate-100">
          <div className="flex items-center gap-3 p-3 bg-white rounded-2xl mb-4 border border-slate-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-brand-peach flex items-center justify-center text-brand-orange font-bold">
              AP
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-bold text-slate-900 truncate">Amit Patel</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">North Ward FC</div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-slate-400 rounded-xl hover:text-rose-500 hover:bg-rose-50 hover:border-rose-100 border border-slate-100 transition-all font-bold text-xs tracking-widest uppercase"
          >
            <LogOut size={16} /> End Duty Cycle
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative flex flex-col">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-peach/30 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        <div className="flex-1 overflow-x-hidden overflow-y-auto custom-scrollbar p-10 relative z-10">
          <AnimatePresence mode="wait">
            {activeView === "dashboard" && <div key="dashboard">{renderDashboardOverview()}</div>}
            {activeView === "reports" && <ReportsIntakeCenter key="reports" />}
            {activeView === "verification" && <VerificationCenter key="verification" />}
            {activeView === "dispatch" && <MatchingLogic key="dispatch" />}
            {activeView === "monitoring" && <TaskTracker key="monitoring" />}
            {activeView === "heatmap" && <MapIntelligence key="heatmap" />}
            {activeView === "emergency" && <EmergencyResponseCenter key="emergency" />}
            {activeView === "communication" && <CommunityCommunicationHub key="communication" />}
            {activeView === "proof" && <ProofVerificationCenter key="proof" />}
            {activeView === "analytics" && <LocalAnalyticsDashboard key="analytics" />}
            {activeView === "settings" && <FCSettings key="settings" />}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

