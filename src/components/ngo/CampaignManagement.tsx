import React, { useState } from "react";
import {
  Target,
  Plus,
  Zap,
  Users,
  BarChart3,
  TrendingUp,
  MapPin,
  Calendar,
  DollarSign,
  Search,
  ChevronRight,
  Download,
  AlertCircle,
  Clock,
  CheckCircle2,
  Save,
  Rocket,
  MoreVertical,
  Activity,
  Heart,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useToast } from "../Toast";

type CampaignSubView = "active" | "create" | "performance";

export default function CampaignManagement() {
  const [activeSubView, setActiveSubView] = useState<CampaignSubView>("active");
  const { showToast } = useToast();

  const handleAction = (action: string, name?: string) => {
    showToast(`${action} ${name ? `for ${name}` : ""} successful.`, "success");
    if (activeSubView === "create") {
      setActiveSubView("active");
    }
  };

  const renderActiveCampaigns = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        {
          name: "Global Food Drive 2024",
          category: "Food Distribution",
          area: "Northeast Districts",
          progress: 78,
          target: "10,000 Meals",
          vols: 142,
          budget: "$12,500",
          status: "On Track",
        },
        {
          name: "Urban School Support",
          category: "Education",
          area: "Central Metro Slums",
          progress: 45,
          target: "500 Study Kits",
          vols: 38,
          budget: "$4,200",
          status: "Delayed",
        },
        {
          name: "Community Health Camp",
          category: "Medical",
          area: "Sector 4 Cluster",
          progress: 92,
          target: "2,000 Checkups",
          vols: 85,
          budget: "$8,000",
          status: "On Track",
        },
        {
          name: "Monsoon Relief Ops",
          category: "Disaster Management",
          area: "Riverbank Settlements",
          progress: 15,
          target: "500 Rescue Kits",
          vols: 210,
          budget: "$25,000",
          status: "Critical",
        },
      ].map((camp, idx) => (
        <div
          key={idx}
          className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-slate-300 transition-all"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`p-2.5 rounded-xl ${
                  camp.status === "Critical"
                    ? "bg-rose-100 text-rose-600"
                    : camp.status === "Delayed"
                      ? "bg-amber-100 text-amber-600"
                      : "bg-emerald-100 text-emerald-600"
                }`}
              >
                <Target size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-green transition-colors">
                  {camp.name}
                </h3>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                  {camp.category} • {camp.area}
                </div>
              </div>
            </div>
            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors">
              <MoreVertical size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100/50 text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Budget
              </div>
              <div className="text-sm font-bold text-slate-900">
                {camp.budget}
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100/50 text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Volunteers
              </div>
              <div className="text-sm font-bold text-slate-900">
                {camp.vols}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-[10px] font-bold mb-2">
              <span className="text-slate-500 uppercase tracking-widest">
                Progress: {camp.target}
              </span>
              <span className="text-slate-900">{camp.progress}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  camp.status === "Critical"
                    ? "bg-rose-500"
                    : camp.status === "Delayed"
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                }`}
                style={{ width: `${camp.progress}%` }}
              ></div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleAction("View Campaign", camp.name)}
              className="flex-1 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              View Campaign
            </button>
            <button
              onClick={() => handleAction("Add Volunteers", camp.name)}
              className="flex-1 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-colors"
            >
              Add Volunteers
            </button>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => handleAction("Campaign Extension Requested", camp.name)}
              className="flex-1 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors"
            >
              Extend Campaign
            </button>
            <button
              onClick={() => handleAction("Campaign Closure Initiated", camp.name)}
              className="flex-1 py-2 bg-rose-50 text-rose-600 rounded-xl text-xs font-bold hover:bg-rose-100 transition-colors"
            >
              Close Campaign
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCreateCampaign = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-6">
            <div className="w-12 h-12 bg-brand-green/10 text-brand-green rounded-2xl flex items-center justify-center">
              <Rocket size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Initiate New Campaign
              </h3>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Strategic Definition Phase
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Campaign Identity
                </label>
                <input
                  type="text"
                  placeholder="e.g. Flood Response 2024"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-brand-green/20 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Focus Category
                </label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-brand-green/20 outline-none cursor-pointer">
                  <option>Relief Supplies</option>
                  <option>Medical Services</option>
                  <option>Education Support</option>
                  <option>Water & Sanitation</option>
                  <option>Infrastructure</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Target Area Selection
              </label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <MapPin
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="Search zones, districts, or GPS..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-brand-green/20 outline-none"
                  />
                </div>
                <button className="px-4 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-colors">
                  <MapPin size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Timeline
                </label>
                <div className="relative">
                  <Calendar
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="date"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-brand-green/20 outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Budget Projection
                </label>
                <div className="relative">
                  <DollarSign
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="number"
                    placeholder="Estimated budget (USD)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-brand-green/20 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Volunteer Requirements
              </label>
              <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="text-indigo-600" size={20} />
                  <span className="text-sm font-bold text-indigo-900">
                    Target Volunteer Force
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="w-8 h-8 rounded-lg bg-white border border-indigo-100 flex items-center justify-center font-bold text-indigo-600 hover:bg-indigo-100 transition-colors">
                    -
                  </button>
                  <span className="text-lg font-black text-indigo-900 w-12 text-center">
                    50
                  </span>
                  <button className="w-8 h-8 rounded-lg bg-white border border-indigo-100 flex items-center justify-center font-bold text-indigo-600 hover:bg-indigo-100 transition-colors">
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-900 p-8 rounded-3xl text-white relative overflow-hidden shadow-xl shadow-slate-900/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <h3 className="text-lg font-bold mb-4 relative z-10">Launch Ready</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-6 relative z-10">
            Strategic campaigns are automatically indexed for volunteer matching
            and platform-wide fundraising if enabled.
          </p>
          <div className="space-y-3 relative z-10">
            <button
              onClick={() => handleAction("Campaign Launched")}
              className="w-full py-3.5 bg-brand-green text-white rounded-2xl font-bold text-sm shadow-lg shadow-brand-green/20 hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <Rocket size={18} /> Launch Campaign
            </button>
            <button
              onClick={() => handleAction("Draft Saved")}
              className="w-full py-3.5 bg-white/10 text-white border border-white/10 rounded-2xl font-bold text-sm hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Save size={18} /> Save Draft
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Platform Guidance
          </h4>
          <div className="space-y-4">
            <div className="flex gap-3">
              <AlertCircle size={16} className="text-indigo-500 shrink-0" />
              <p className="text-xs text-slate-500 leading-relaxed">
                <span className="font-bold text-slate-900 block mb-0.5">
                  Reach Prediction
                </span>
                Based on current area signals, this campaign will reach{" "}
                <span className="font-bold text-brand-green">2.4k people</span>.
              </p>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
              <p className="text-xs text-slate-500 leading-relaxed">
                <span className="font-bold text-slate-900 block mb-0.5">
                  Approval Status
                </span>
                Campaign is compliant with platform guidelines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Reach",
            value: "24.8k",
            trend: "+12%",
            icon: Activity,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
          },
          {
            label: "Vols Allocated",
            value: "384",
            trend: "+5%",
            icon: Users,
            color: "text-brand-green",
            bg: "bg-brand-green/10",
          },
          {
            label: "People Helped",
            value: "14.2k",
            trend: "+18%",
            icon: Heart,
            color: "text-rose-600",
            bg: "bg-rose-50",
          },
          {
            label: "Impact Score",
            value: "92/100",
            trend: "+2%",
            icon: Zap,
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`p-3 rounded-2xl ${stat.bg} ${stat.color} shadow-sm border border-black/5`}
              >
                <stat.icon size={20} />
              </div>
              <div className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                {stat.trend}
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 mb-1">
              {stat.value}
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm overflow-hidden relative">
        <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Impact Delivery Analytics
            </h3>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">
              Real-time campaign outcome tracking
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all">
            <Download size={18} /> Download Campaign Report
          </button>
        </div>

        <div className="h-64 flex items-end justify-between gap-2 px-4 pb-4 border-b-2 border-slate-100 relative">
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pr-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-full h-px bg-slate-50/50"></div>
            ))}
          </div>
          {[40, 65, 42, 85, 95, 75, 88].map((h, i) => (
            <div
              key={i}
              className="w-full relative group flex flex-col items-center"
              style={{ height: `${h}%` }}
            >
              <div className="absolute -top-8 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                {h}%
              </div>
              <div className="flex-1 w-full max-w-[50px] bg-brand-green/20 rounded-t-xl overflow-hidden flex items-end group-hover:bg-brand-green/30 transition-colors">
                <div
                  className="w-full bg-brand-green"
                  style={{ height: `${h - 20}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between px-4 mt-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <span>Week 1</span>
          <span>Week 2</span>
          <span>Week 3</span>
          <span>Week 4</span>
          <span>Week 5</span>
          <span>Week 6</span>
          <span>Week 7</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-brand-green/10 text-brand-green rounded-lg">
              <Target size={18} />
            </div>
            <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase">
              Initiative Command
            </h2>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">
            Campaign Management
          </h1>
          <p className="text-slate-500 max-w-2xl text-sm leading-relaxed">
            Architect strategic NGO campaigns, mobilize collective volunteer
            action, and quantify mission impact with high-fidelity performance
            tracking.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
              size={16}
            />
            <input
              type="text"
              placeholder="Filter active missions..."
              className="w-full md:w-64 bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-green/20 outline-none transition-all focus:border-brand-green/30"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 shrink-0">
        {[
          { id: "active", label: "Active Campaigns", icon: Zap, count: 12 },
          { id: "create", label: "Launch New Initiative", icon: Rocket, count: 0 },
          { id: "performance", label: "Impact Performance", icon: BarChart3, count: 0 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubView(tab.id as CampaignSubView)}
            className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2.5 border shadow-sm ${
              activeSubView === tab.id
                ? "bg-slate-900 text-white border-slate-900 ring-4 ring-slate-900/5 translate-y-[-2px] shadow-lg shadow-slate-900/10"
                : "bg-white text-slate-400 border-slate-100 hover:text-slate-900 hover:border-slate-200"
            }`}
          >
            <tab.icon
              size={16}
              className={activeSubView === tab.id ? "text-brand-green" : ""}
            />
            {tab.label}
            {tab.count > 0 && (
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeSubView === tab.id
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 pb-12 overflow-y-auto custom-scrollbar pr-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSubView}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {activeSubView === "active" && renderActiveCampaigns()}
            {activeSubView === "create" && renderCreateCampaign()}
            {activeSubView === "performance" && renderPerformance()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
