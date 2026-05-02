import React, { useState } from "react";
import {
  Menu,
  Search,
  Bell,
  LayoutDashboard,
  Map as MapIcon,
  Target,
  Users,
  Zap,
  Settings,
  LogOut,
  ArrowRight,
  Activity,
  AlertTriangle,
  MapPin,
  CheckCircle2,
  Clock,
  BarChart3,
  UserCheck,
  Megaphone,
  Plus,
  Brain,
  ClipboardList,
  MessageSquare,
  Handshake,
  HeartHandshake,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useToast } from "./Toast";
import NeedIntelligenceCenter from "./ngo/NeedIntelligenceCenter";
import VolunteerManagement from "./ngo/VolunteerManagement";
import CampaignManagement from "./ngo/CampaignManagement";
import AreaHeatmap from "./MapIntelligence";
import TaskAssignmentCenter from "./ngo/TaskAssignmentCenter";
import CommunityReportsQueue from "./ReportSubmission";
import NGOAnalyticsImpact from "./TaskTracker";
import FieldCoordinatorManagement from "./ngo/FieldCoordinatorManagement";
import PartnerCollaboration from "./ngo/PartnerCollaboration";
import DonorCSRReports from "./ngo/DonorCSRReports";
import NGOSettings from "./ngo/Settings";
import EmergencyEscalationCenter from "./EmergencyEscalationCenter";
import RoleLiveMap from "./RoleLiveMap";

type SidebarItemProps = {
  label: string;
  icon: any;
  active: boolean;
  onClick: () => void;
  badge?: number;
};

const SidebarItem = ({
  label,
  icon: Icon,
  active,
  onClick,
  badge,
}: SidebarItemProps) => (
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
    {badge !== undefined && badge > 0 && (
      <span
        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${active ? "bg-brand-green text-white" : "bg-rose-100 text-rose-600"}`}
      >
        {badge}
      </span>
    )}
  </button>
);

export default function NGOAdminDashboard({
  onLogout,
}: {
  onLogout: () => void;
}) {
  const [activeView, setActiveView] = useState("dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { showToast } = useToast();

  const handleAction = (
    msg: string,
    type: "info" | "success" | "warning" | "error" = "success",
  ) => {
    showToast(msg, type);
  };

  const renderMissionControl = () => (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></div>
          <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase">
            Live Operations HQ
          </h2>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-2">
          Mission Control
        </h1>
        <p className="text-slate-500 max-w-3xl leading-relaxed text-sm">
          Welcome to your organizational command center. Monitor critical needs,
          dispatch volunteers to pending zones, and track real-time campaign
          performance across your designated areas.
        </p>
      </div>

      {/* Executive NGO Command Center (Top Overview Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Card 1: Total Active Needs */}
        <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden group flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/20 blur-xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div>
            <div className="relative z-10 flex items-center gap-2 mb-2 text-rose-400">
              <AlertTriangle size={16} />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Total Active Needs
              </span>
            </div>
            <div className="text-3xl font-bold text-white relative z-10 mb-3">
              142
            </div>
            <div className="space-y-1 relative z-10">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Critical:</span>
                <span className="text-rose-400 font-semibold">24</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">High-Priority Reports:</span>
                <span className="text-amber-400 font-semibold">58</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Pending Verification:</span>
                <span className="text-slate-300 font-semibold">60</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveView("need_intelligence")}
            className="mt-4 w-full py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl text-xs font-bold transition-colors"
          >
            Open Need Queue
          </button>
        </div>

        {/* Card 2: Active Volunteers */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between group">
          <div>
            <div className="flex items-center gap-2 mb-2 text-indigo-600">
              <Users size={16} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Active Volunteers
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-3">384</div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Available Now:</span>
                <span className="text-emerald-600 font-semibold">142</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">On-Task:</span>
                <span className="text-indigo-600 font-semibold">190</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Emergency Responders:</span>
                <span className="text-rose-500 font-semibold">52</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveView("volunteer")}
            className="mt-4 w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-colors"
          >
            Volunteer Management
          </button>
        </div>

        {/* Card 3: Ongoing Campaigns */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between group">
          <div>
            <div className="flex items-center gap-2 mb-2 text-brand-green">
              <Target size={16} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Ongoing Campaigns
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-3">12</div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">High-Performing:</span>
                <span className="text-brand-green font-semibold">4</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">On-Track:</span>
                <span className="text-slate-700 font-semibold">6</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Delayed:</span>
                <span className="text-amber-500 font-semibold">2</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveView("campaigns")}
            className="mt-4 w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-colors"
          >
            Campaign Center
          </button>
        </div>

        {/* Card 4: Area Heatmap Status */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between group">
          <div>
            <div className="flex items-center gap-2 mb-2 text-rose-500">
              <MapIcon size={16} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Area Heatmap Status
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-3">7</div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Red Zones:</span>
                <span className="text-rose-600 font-semibold">3</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">High-Risk Clusters:</span>
                <span className="text-amber-500 font-semibold">4</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Low-Response Areas:</span>
                <span className="text-indigo-500 font-semibold">2</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveView("heatmap")}
            className="mt-4 w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-colors"
          >
            Open Heatmap
          </button>
        </div>

        {/* Card 5: Response Rate */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between group">
          <div>
            <div className="flex items-center gap-2 mb-2 text-cyan-600">
              <Zap size={16} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Response Rate
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-3">14m</div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Avg Response Speed:</span>
                <span className="text-cyan-600 font-semibold">14 mins</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Pending Delays:</span>
                <span className="text-rose-500 font-semibold">18</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Completion Efficiency:</span>
                <span className="text-brand-green font-semibold">92%</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveView("analytics")}
            className="mt-4 w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-colors"
          >
            Response Analytics
          </button>
        </div>

        {/* Card 6: Completed Tasks */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between group">
          <div>
            <div className="flex items-center gap-2 mb-2 text-emerald-600">
              <CheckCircle2 size={16} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Completed Tasks
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-3">1,204</div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Today:</span>
                <span className="text-emerald-600 font-semibold">42</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">This Week:</span>
                <span className="text-emerald-600 font-semibold">315</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Monthly Success:</span>
                <span className="text-slate-700 font-semibold">96%</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveView("task_assignment")}
            className="mt-4 w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-colors"
          >
            Task Tracker
          </button>
        </div>

        {/* Card 7: Pending Reports */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between group">
          <div>
            <div className="flex items-center gap-2 mb-2 text-amber-600">
              <Activity size={16} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Pending Reports
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-3">37</div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Unverified:</span>
                <span className="text-amber-600 font-semibold">18</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Blocked:</span>
                <span className="text-rose-500 font-semibold">14</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Delayed Approvals:</span>
                <span className="text-slate-700 font-semibold">5</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveView("reports")}
            className="mt-4 w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-colors"
          >
            Reports Queue
          </button>
        </div>

        {/* Card 8: NGO Impact Score */}
        <div className="bg-brand-green p-5 rounded-3xl shadow-lg flex flex-col justify-between group text-white relative overflow-hidden">
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div>
            <div className="flex items-center gap-2 mb-2 text-white/80">
              <BarChart3 size={16} />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                NGO Impact Score
              </span>
            </div>
            <div className="text-3xl font-bold text-white mb-3">94/100</div>
            <div className="space-y-1 relative z-10">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/80">People Helped:</span>
                <span className="text-white font-semibold flex items-center gap-1">
                  3,450
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/80">Resolution Quality:</span>
                <span className="text-white font-semibold">High (4.8/5)</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/80">Trust Score:</span>
                <span className="text-white font-semibold">9.2/10</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveView("analytics")}
            className="mt-4 w-full py-2 bg-white text-brand-green hover:bg-slate-50 rounded-xl text-xs font-bold transition-colors relative z-10"
          >
            Impact Dashboard
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Column: Live Need Radar & Active Campaigns */}
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 tracking-tight">
                <MapPin className="text-brand-green" /> Live Needs Radar
              </h3>
              <button
                onClick={() => setActiveView("heatmap")}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                View Intelligence Map
              </button>
            </div>
            <RoleLiveMap height={320} title="Live Needs Radar Map" />
            <div className="p-4 bg-white grid grid-cols-3 divide-x divide-slate-100 text-center">
              <div className="px-2">
                <div className="text-xl font-bold text-slate-900">
                  Sector Alpha
                </div>
                <div className="text-[10px] text-rose-500 font-bold uppercase mt-1">
                  Critical (Food)
                </div>
              </div>
              <div className="px-2">
                <div className="text-xl font-bold text-slate-900">
                  Sector Beta
                </div>
                <div className="text-[10px] text-amber-500 font-bold uppercase mt-1">
                  High (Medical)
                </div>
              </div>
              <div className="px-2">
                <div className="text-xl font-bold text-slate-900">
                  Sector Delta
                </div>
                <div className="text-[10px] text-emerald-500 font-bold uppercase mt-1">
                  Stabilizing
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Target className="text-indigo-500" /> Active Campaigns
              </h3>
              <button
                onClick={() => setActiveView("campaigns")}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors"
              >
                <Plus size={14} /> New Campaign
              </button>
            </div>
            <div className="divide-y divide-slate-50">
              {[
                {
                  name: "Winter Blanket Drive 2023",
                  progress: 78,
                  target: "5,000 blankets",
                  needs: "More volunteers in North Zone",
                  status: "Active",
                },
                {
                  name: "Emergency Flood Relief",
                  progress: 42,
                  target: "Route medical supplies",
                  needs: "Coordinators stuck at checkpoint",
                  status: "Critical",
                },
                {
                  name: "Youth Education Camp",
                  progress: 95,
                  target: "Enroll 500 kids",
                  needs: "On track",
                  status: "Completing",
                },
              ].map((camp, idx) => (
                <div
                  key={idx}
                  className="p-6 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-slate-900">{camp.name}</h4>
                      <p className="text-xs text-slate-500 mt-1 font-semibold">
                        Target: {camp.target}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        camp.status === "Critical"
                          ? "bg-rose-100 text-rose-700"
                          : camp.status === "Active"
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {camp.status}
                    </span>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between text-[10px] font-bold mb-1">
                      <span className="text-slate-500">Progress</span>
                      <span
                        className={
                          camp.progress < 50
                            ? "text-rose-600"
                            : "text-emerald-600"
                        }
                      >
                        {camp.progress}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${camp.progress < 50 ? "bg-rose-500" : "bg-emerald-500"}`}
                        style={{ width: `${camp.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-3">
                    <Zap
                      size={12}
                      className={
                        camp.status === "Critical"
                          ? "text-amber-500"
                          : "text-slate-400"
                      }
                    />{" "}
                    {camp.needs}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar Column: Interventions & Dispatch status */}
        <div className="space-y-6">
          <div className="bg-rose-50 border border-rose-100 rounded-3xl p-6">
            <h3 className="font-bold text-rose-900 flex items-center gap-2 mb-4">
              <AlertTriangle size={18} /> Delayed Responses
            </h3>
            <div className="space-y-3">
              {[
                {
                  task: "Food package delivery delayed by 4hrs",
                  loc: "Sector B slums",
                },
                { task: "Medical assessment unverified", loc: "Camp 02" },
              ].map((alert, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-xl shadow-sm border border-rose-100/50"
                >
                  <p className="text-xs font-bold text-slate-800 mb-1 leading-tight">
                    {alert.task}
                  </p>
                  <p className="text-[10px] text-slate-500 font-semibold mb-3">
                    {alert.loc}
                  </p>
                  <button
                    onClick={() =>
                      handleAction(
                        "Escalating to field coordinator.",
                        "warning",
                      )
                    }
                    className="w-full py-1.5 text-[10px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    Intervene
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-2xl rounded-full translate-x-1/3 -translate-y-1/3"></div>
            <h3 className="font-bold text-white flex items-center gap-2 mb-4 relative z-10">
              <Users size={18} className="text-indigo-400" /> Field Coordinators
            </h3>
            <div className="space-y-4 relative z-10">
              {[
                { name: "Rahul S.", active: 14, needHelp: true },
                { name: "Priya M.", active: 32, needHelp: false },
                { name: "Amit K.", active: 8, needHelp: false },
              ].map((coord, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                      {coord.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-100">
                        {coord.name}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {coord.active} active tasks
                      </div>
                    </div>
                  </div>
                  {coord.needHelp && (
                    <div
                      className="p-1.5 bg-rose-500/20 text-rose-400 rounded-lg"
                      title="Requires Intervention"
                    >
                      <AlertTriangle size={14} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => setActiveView("task_assignment")}
              className="mt-6 w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors relative z-10"
            >
              View Dispatch Board
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <motion.aside
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: isSidebarOpen ? 288 : 0, opacity: 1 }}
        className="bg-white flex flex-col z-20 shrink-0 border-r border-slate-100 h-screen sticky top-0 overflow-hidden"
      >
        <div className="p-8 border-b border-slate-50 shrink-0">
          <div className="flex items-center gap-1 group cursor-pointer mb-2">
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Sevasetu
            </span>
          </div>
          <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-slate-400 uppercase tracking-widest">
            NGO Operations
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-1">
          <SidebarItem
            label="Dashboard"
            icon={LayoutDashboard}
            active={activeView === "dashboard"}
            onClick={() => setActiveView("dashboard")}
          />
          <SidebarItem
            label="Need Intelligence Center"
            icon={Brain}
            active={activeView === "need_intelligence"}
            onClick={() => setActiveView("need_intelligence")}
          />
          <SidebarItem
            label="Volunteer Management"
            icon={Users}
            active={activeView === "volunteer"}
            onClick={() => setActiveView("volunteer")}
          />
          <SidebarItem
            label="Task Assignment Center"
            icon={ClipboardList}
            active={activeView === "task_assignment"}
            onClick={() => setActiveView("task_assignment")}
            badge={14}
          />
          <SidebarItem
            label="Campaign Management"
            icon={Target}
            active={activeView === "campaigns"}
            onClick={() => setActiveView("campaigns")}
          />
          <SidebarItem
            label="Field Coordinator Management"
            icon={UserCheck}
            active={activeView === "coordinators"}
            onClick={() => setActiveView("coordinators")}
          />
          <SidebarItem
            label="Community Reports Queue"
            icon={MessageSquare}
            active={activeView === "reports"}
            onClick={() => setActiveView("reports")}
            badge={3}
          />
          <SidebarItem
            label="Area Heatmap"
            icon={MapIcon}
            active={activeView === "heatmap"}
            onClick={() => setActiveView("heatmap")}
          />
          <SidebarItem
            label="Emergency Response Center"
            icon={AlertTriangle}
            active={activeView === "emergency"}
            onClick={() => setActiveView("emergency")}
          />

          <div className="py-2">
            <div className="h-px bg-slate-50"></div>
          </div>

          <SidebarItem
            label="NGO Analytics & Impact"
            icon={BarChart3}
            active={activeView === "analytics"}
            onClick={() => setActiveView("analytics")}
          />
          <SidebarItem
            label="Partner Collaboration"
            icon={Handshake}
            active={activeView === "collaboration"}
            onClick={() => setActiveView("collaboration")}
          />
          <SidebarItem
            label="Donor & CSR Reports"
            icon={HeartHandshake}
            active={activeView === "donor_reports"}
            onClick={() => setActiveView("donor_reports")}
          />

          <div className="py-2">
            <div className="h-px bg-slate-50"></div>
          </div>

          <SidebarItem
            label="Settings"
            icon={Settings}
            active={activeView === "settings"}
            onClick={() => setActiveView("settings")}
          />
        </div>

        <div className="p-4 border-t border-slate-50 shrink-0">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-colors font-semibold text-sm"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 relative">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-6 lg:px-8 z-10 shrink-0 sticky top-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green/20"
            >
              <Menu size={20} />
            </button>
            <div className="hidden md:flex relative group">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-green transition-colors"
                size={16}
              />
              <input
                type="text"
                placeholder="Search campaigns, volunteers, or reports..."
                className="w-80 md:w-[400px] bg-slate-100/80 border-none rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-green/20 focus:bg-white transition-all text-slate-700 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <button className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors group">
              <Bell
                size={18}
                className="group-hover:text-slate-700 transition-colors"
              />
              <span className="absolute top-1 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse border-2 border-white"></span>
            </button>

            <div className="h-6 w-px bg-slate-200"></div>

            <button className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200">
              <div className="w-8 h-8 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center font-bold text-sm">
                HC
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-sm font-bold text-slate-800 leading-none mb-1">
                  HopeCharity NGO
                </div>
                <div className="text-[10px] text-slate-500 font-semibold tracking-wider font-mono">
                  NGO_ADMIN
                </div>
              </div>
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto custom-scrollbar p-6 lg:p-8 relative">
          <AnimatePresence mode="wait">
            {activeView === "dashboard" && <div key="dashboard">{renderMissionControl()}</div>}
            {activeView === "need_intelligence" && <NeedIntelligenceCenter key="need_intelligence" />}
            {activeView === "volunteer" && <VolunteerManagement key="volunteer" />}
            {activeView === "campaigns" && <CampaignManagement key="campaigns" />}
            {activeView === "heatmap" && <AreaHeatmap key="heatmap" />}
            {activeView === "task_assignment" && <TaskAssignmentCenter key="task_assignment" />}
            {activeView === "reports" && <CommunityReportsQueue key="reports" />}
            {activeView === "analytics" && <NGOAnalyticsImpact key="analytics" />}
            {activeView === "coordinators" && <FieldCoordinatorManagement key="coordinators" />}
            {activeView === "collaboration" && <PartnerCollaboration key="collaboration" />}
            {activeView === "donor_reports" && <DonorCSRReports key="donor_reports" />}
            {activeView === "emergency" && <EmergencyEscalationCenter key="emergency" />}
            {activeView === "settings" && <NGOSettings key="settings" />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
