import React, { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  Users,
  ShieldAlert,
  AlertTriangle,
  BarChart3,
  ClipboardList,
  Map,
  Flame,
  CreditCard,
  Settings as SettingsIcon,
  Gavel,
  Search,
  Bell,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Filter,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import OrganizationManagement from "./OrganizationManagement";
import UserManagement from "./UserManagement";

import RolePermissionCenter from "./RolePermissionCenter";
import FraudDetectionCenter from "./FraudDetectionCenter";
import PlatformAnalytics from "./PlatformAnalytics";
import ReportsAndAuditCenter from "./ReportsAndAuditCenter";
import GlobalHeatmap from "./GlobalHeatmap";
import EmergencyEscalationCenter from "./EmergencyEscalationCenter";
import Settings from "./Settings";
import SupportAndGovernance from "./SupportAndGovernance";
import BillingAndSubscriptionCenter from "./BillingAndSubscriptionCenter";

// Types
type ActiveView =
  | "dashboard"
  | "organizations"
  | "users"
  | "needs"
  | "heatmap"
  | "fraud"
  | "analytics"
  | "reports"
  | "emergency"
  | "billing"
  | "settings"
  | "support"
  | "roles";

interface StatCardProps {
  title: string;
  value: string;
  subValue: string;
  trend?: { value: string; isUp: boolean };
  buttonLabel: string;
  onClick: () => void;
  icon: any;
  color: string;
}

const StatCard = ({
  title,
  value,
  subValue,
  trend,
  buttonLabel,
  onClick,
  icon: Icon,
  color,
}: StatCardProps) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all"
  >
    <div className="flex justify-between items-start mb-4">
      <div
        className={`p-3 rounded-2xl ${color} bg-opacity-10 text-${color.replace("bg-", "")}`}
      >
        <Icon size={24} />
      </div>
      {trend && (
        <span
          className={`flex items-center gap-1 text-xs font-bold ${trend.isUp ? "text-emerald-500" : "text-rose-500"}`}
        >
          {trend.isUp ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}
          {trend.value}
        </span>
      )}
    </div>
    <h3 className="text-slate-500 text-xs font-semibold tracking-wide uppercase mb-1">
      {title}
    </h3>
    <div className="flex items-baseline gap-2 mb-1">
      <span className="text-3xl font-bold tracking-tight text-slate-900">
        {value}
      </span>
    </div>
    <p className="text-slate-400 text-sm mb-6">{subValue}</p>
    <button
      onClick={onClick}
      className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-600 text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
    >
      {buttonLabel}
      <ChevronRight size={14} />
    </button>
  </motion.div>
);

const SidebarItem = ({ icon: Icon, label, active, onClick, badge }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
      active
        ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
    }`}
  >
    <div className="flex items-center gap-3">
      <Icon size={20} />
      <span className="text-sm font-medium">{label}</span>
    </div>
    {badge && (
      <span
        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${active ? "bg-brand-green text-white" : "bg-rose-100 text-rose-600"}`}
      >
        {badge}
      </span>
    )}
  </button>
);

export default function SuperAdminDashboard({
  onLogout,
}: {
  onLogout: () => void;
}) {
  const [activeView, setActiveView] = useState<ActiveView>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-sm font-semibold tracking-widest text-brand-green uppercase mb-2">
            Command Center
          </h2>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Ecosystem Overview
          </h1>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Filter size={16} />
            Filter View
          </button>
          <button className="px-4 py-2 bg-slate-900 rounded-xl text-sm font-medium text-white hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
            Export Monthly Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Active NGOs"
          value="482"
          subValue="12 pending approval • 4 suspended"
          trend={{ value: "+8% vs last month", isUp: true }}
          buttonLabel="View Organizations"
          onClick={() => setActiveView("organizations")}
          icon={Building2}
          color="bg-brand-green"
        />
        <StatCard
          title="Total Users"
          value="12.4k"
          subValue="8.2k active now • 420 top performers"
          trend={{ value: "+12.4% new signups", isUp: true }}
          buttonLabel="View Users"
          onClick={() => setActiveView("users")}
          icon={Users}
          color="bg-indigo-500"
        />
        <StatCard
          title="Active Needs"
          value="1,842"
          subValue="240 urgent • 12 pending verification"
          trend={{ value: "+4.2% since yesterday", isUp: true }}
          buttonLabel="Open Need Intelligence"
          onClick={() => setActiveView("needs")}
          icon={LayoutDashboard}
          color="bg-amber-500"
        />
        <StatCard
          title="Urgent Hotspots"
          value="24"
          subValue="Top: East District • 3 crisis alerts"
          buttonLabel="Open Heatmap"
          onClick={() => setActiveView("heatmap")}
          icon={Flame}
          color="bg-rose-500"
        />
        <StatCard
          title="Response Rate"
          value="94.2%"
          subValue="Avg. 4.2h dispatch time"
          trend={{ value: "-15m improvement", isUp: true }}
          buttonLabel="Response Analytics"
          onClick={() => setActiveView("analytics")}
          icon={Clock}
          color="bg-cyan-500"
        />
        <StatCard
          title="Completed Tasks"
          value="28.5k"
          subValue="1,240 completed today"
          trend={{ value: "98.2% success rate", isUp: true }}
          buttonLabel="Task Performance"
          onClick={() => setActiveView("analytics")}
          icon={CheckCircle2}
          color="bg-emerald-500"
        />
        <StatCard
          title="Unresolved Reports"
          value="68"
          subValue="12 overdue • 4 blocked tasks"
          buttonLabel="Review Reports"
          onClick={() => setActiveView("reports")}
          icon={ClipboardList}
          color="bg-slate-500"
        />
        <StatCard
          title="Health Score"
          value="98.4"
          subValue="System uptime 99.9% • 2 alerts"
          buttonLabel="Platform Diagnostics"
          onClick={() => setActiveView("fraud")}
          icon={ShieldAlert}
          color="bg-teal-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Emergencies */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-50 flex justify-between items-center">
            <h3 className="font-bold tracking-tight text-slate-900 text-lg">
              Emergency Alerts
            </h3>
            <button
              onClick={() => setActiveView("emergency")}
              className="text-rose-500 text-xs font-semibold hover:underline"
            >
              View All Active Alerts
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">
                      Critical Water Shortage - North Slums
                    </h4>
                    <p className="text-xs text-slate-500">
                      Escalated by NGO: SafeHands • 12 mins ago
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-slate-900 text-white text-xs font-medium rounded-lg">
                  Dispatch Help
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Pending NGO Approvals */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-50 flex justify-between items-center">
            <h3 className="font-bold tracking-tight text-slate-900 text-lg">
              Pending Approvals
            </h3>
            <button
              onClick={() => setActiveView("organizations")}
              className="text-brand-green text-sm font-semibold hover:underline"
            >
              Manage All
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">
                      Global Relief Foundation
                    </h4>
                    <p className="text-xs text-slate-500">
                      Registration: {i} day(s) ago • Verify Documents
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                    <XCircle size={18} />
                  </button>
                  <button className="p-2 text-brand-green hover:bg-brand-green/10 rounded-lg transition-colors">
                    <CheckCircle2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0 overflow-hidden">
        <div className="p-8 border-b border-slate-50 shrink-0">
          <div className="flex items-center gap-1 group cursor-pointer mb-2">
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              NeedGraph<span className="text-brand-green">OS</span>
            </span>
            <div className="w-6 h-1.5 bg-brand-green rounded-full mt-auto -ml-1"></div>
          </div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1 block">
            Super Admin Portal
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          <SidebarItem
            label="Dashboard"
            icon={LayoutDashboard}
            active={activeView === "dashboard"}
            onClick={() => setActiveView("dashboard")}
          />
          <SidebarItem
            label="Organizations"
            icon={Building2}
            active={activeView === "organizations"}
            onClick={() => setActiveView("organizations")}
            badge="12"
          />
          <SidebarItem
            label="User Management"
            icon={Users}
            active={activeView === "users"}
            onClick={() => setActiveView("users")}
          />
          <SidebarItem
            label="Role & Permissions"
            icon={SettingsIcon}
            active={activeView === "roles"}
            onClick={() => setActiveView("roles")}
          />
          <SidebarItem
            label="Need Intelligence"
            icon={ClipboardList}
            active={activeView === "needs"}
            onClick={() => setActiveView("needs")}
            badge="240"
          />
          <SidebarItem
            label="Global Heatmap"
            icon={Map}
            active={activeView === "heatmap"}
            onClick={() => setActiveView("heatmap")}
          />

          <div className="my-4 px-4">
            <div className="h-px bg-slate-50"></div>
          </div>

          <SidebarItem
            label="Fraud Detection"
            icon={ShieldAlert}
            active={activeView === "fraud"}
            onClick={() => setActiveView("fraud")}
            badge="2"
          />
          <SidebarItem
            label="Platform Analytics"
            icon={BarChart3}
            active={activeView === "analytics"}
            onClick={() => setActiveView("analytics")}
          />
          <SidebarItem
            label="Crisis Response"
            icon={Flame}
            active={activeView === "emergency"}
            onClick={() => setActiveView("emergency")}
            badge="3"
          />
          <SidebarItem
            label="Reports & Audit"
            icon={FileText}
            active={activeView === "reports"}
            onClick={() => setActiveView("reports")}
          />
          <SidebarItem
            label="Billing & Subs"
            icon={CreditCard}
            active={activeView === "billing"}
            onClick={() => setActiveView("billing")}
          />

          <div className="my-4 px-4">
            <div className="h-px bg-slate-50"></div>
          </div>

          <SidebarItem
            label="Support & Governance"
            icon={ShieldCheck}
            active={activeView === "support"}
            onClick={() => setActiveView("support")}
          />
          <SidebarItem
            label="Settings"
            icon={SettingsIcon}
            active={activeView === "settings"}
            onClick={() => setActiveView("settings")}
          />
        </div>

        <div className="p-4 border-t border-slate-50">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
          >
            <XCircle size={20} />
            <span className="text-sm font-medium">Log Out System</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-50 h-20 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 min-w-[400px]">
            <Search size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder="Quick search: NGOs, Volunteers, Alerts..."
              className="bg-transparent border-none text-sm focus:outline-none w-full"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <button className="relative p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>
              <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors">
                <Search size={20} />
              </button>
            </div>
            <div className="w-px h-8 bg-slate-100"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-sm font-semibold text-slate-900 block">
                  Root Administrator
                </span>
                <span className="text-xs font-medium text-brand-green">
                  Global Access
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-medium">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div
          className={
            activeView === "billing" ? "h-[calc(100vh-80px)]" : "p-8 pb-16"
          }
        >
          <AnimatePresence mode="wait">
            {activeView === "dashboard" && renderDashboard()}
            {activeView === "organizations" && <OrganizationManagement />}
            {activeView === "users" && <UserManagement />}
            {activeView === "roles" && <RolePermissionCenter />}
            {activeView === "fraud" && <FraudDetectionCenter />}
            {activeView === "analytics" && <PlatformAnalytics />}
            {activeView === "reports" && <ReportsAndAuditCenter />}
            {activeView === "heatmap" && <GlobalHeatmap />}
            {activeView === "emergency" && <EmergencyEscalationCenter />}
            {activeView === "settings" && <Settings />}
            {activeView === "support" && <SupportAndGovernance />}
            {activeView === "billing" && <BillingAndSubscriptionCenter />}
            {/* Other views would be implemented similarly */}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
