import React, { useState } from "react";
import {
  PieChart,
  BarChart3,
  FileText,
  ShieldCheck,
  TrendingUp,
  Download,
  Search,
  Filter,
  DollarSign,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  History,
  Lock,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  Target,
  Users,
  Activity,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useToast } from "../Toast";

type ReportTab =
  | "campaigns"
  | "analytics"
  | "utilization"
  | "transparency"
  | "funding";

export default function DonorCSRReports() {
  const [activeTab, setActiveTab] = useState<ReportTab>("campaigns");
  const { showToast } = useToast();

  const handleAction = (action: string) => {
    showToast(`${action} successful!`, "success");
  };

  const sponsoredCampaigns = [
    {
      id: "C-401",
      name: "Rural Healthcare Expansion",
      sponsor: "TechCorp Foundation",
      amount: "₹1,200,000",
      progress: 75,
      impact: 92,
      status: "In Progress",
    },
    {
      id: "C-402",
      name: "Clean Water Initiative",
      sponsor: "Global Eco Solutions",
      amount: "₹850,000",
      progress: 40,
      impact: 88,
      status: "Active",
    },
    {
      id: "C-403",
      name: "Youth Education Grant",
      sponsor: "Future Talent Corp",
      amount: "₹2,500,000",
      progress: 95,
      impact: 98,
      status: "Near Completion",
    },
  ];

  const renderOverviewCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {[
        {
          label: "Sponsored Campaigns",
          value: "12",
          sub: "8 Active • 4 Completed",
          icon: Target,
          color: "text-brand-green",
          bg: "bg-emerald-50",
          action: "View Campaigns",
        },
        {
          label: "Funding Received",
          value: "₹84.2L",
          sub: "+12% Growth YoY",
          icon: DollarSign,
          color: "text-indigo-600",
          bg: "bg-indigo-50",
          action: "Analytics",
        },
        {
          label: "Fund efficiency",
          value: "96.4%",
          sub: "Resource Usage Quality",
          icon: Activity,
          color: "text-amber-600",
          bg: "bg-amber-50",
          action: "Utilization",
        },
        {
          label: "Transparency Score",
          value: "99/100",
          sub: "Audit Confidence High",
          icon: ShieldCheck,
          color: "text-rose-600",
          bg: "bg-rose-50",
          action: "Transparency",
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
              className="text-[10px] font-black uppercase text-slate-400 hover:text-slate-900 transition-colors"
            >
              <ChevronRight size={16} />
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

  const renderSponsoredCampaigns = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sponsoredCampaigns.map((camp) => (
        <div
          key={camp.id}
          className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col group"
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="px-2.5 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest">
                ID: {camp.id}
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold text-slate-400 uppercase">
                  Funding
                </div>
                <div className="text-sm font-black text-slate-900">
                  {camp.amount}
                </div>
              </div>
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
              {camp.name}
            </h3>
            <p className="text-xs font-bold text-slate-400 uppercase mb-6 flex items-center gap-1.5">
              <Briefcase size={12} className="text-indigo-500" /> Sponsored by{" "}
              {camp.sponsor}
            </p>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-black uppercase text-slate-400">
                    Campaign Progress
                  </span>
                  <span className="text-xs font-black text-slate-900">
                    {camp.progress}%
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-green rounded-full"
                    style={{ width: `${camp.progress}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-black uppercase text-slate-400">
                    Impact Evidence
                  </span>
                  <span className="text-xs font-black text-brand-green">
                    {camp.impact}/100 Score
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-2">
            <button
              onClick={() => handleAction(`Report Generated: ${camp.name}`)}
              className="py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
            >
              <Download size={14} /> Report
            </button>
            <button
              onClick={() => handleAction(`Sponsorship Renewed: ${camp.sponsor}`)}
              className="py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-green transition-all shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2"
            >
              <TrendingUp size={14} /> Renew
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderUtilizationReports = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Food Support", usage: "32%", amount: "₹4.2L", icon: Zap },
          { label: "Health Camps", usage: "28%", amount: "₹3.8L", icon: Briefcase },
          { label: "School Kits", usage: "15%", amount: "₹1.9L", icon: Users },
          { label: "Emergency Res", usage: "25%", amount: "₹3.2L", icon: Activity },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <item.icon size={20} className="text-indigo-500" />
              <span className="text-lg font-black text-slate-900">{item.usage}</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900 mb-1">{item.label}</h4>
            <div className="text-[10px] font-bold text-slate-400 uppercase">
              Total Spent: {item.amount}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="w-48 h-48 rounded-full border-[12px] border-brand-green/20 border-t-brand-green border-r-indigo-500 relative flex items-center justify-center shrink-0">
          <div className="text-center">
            <span className="block text-2xl font-black text-slate-900">96.4%</span>
            <span className="block text-[8px] font-black text-slate-400 uppercase tracking-tighter">
              Efficiency
            </span>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <h3 className="text-xl font-black text-slate-900">
            Resource Utilization Audit Trail
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-4">
            Our multi-party verification system ensures that every rupee donated
            is tracked against a physical artifact (receipt, proof-of-work, or
            beneficiary sign-off).
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleAction("Full Audit Trail Exported")}
              className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              <FileText size={16} /> Full Audit Trail
            </button>
            <button
              onClick={() => handleAction("Utilization PDF Downloaded")}
              className="px-6 py-3 bg-indigo-50 text-indigo-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-100 transition-all flex items-center gap-2"
            >
              <Download size={16} /> Utilization PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTransparencyDashboard = () => (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <ShieldCheck className="text-brand-green" /> Compliance Verification Center
          </h3>
          <p className="text-xs font-bold text-slate-500 mt-1">
            Blockchain-anchored proof of delivery and audit reports.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black uppercase text-slate-900 tracking-widest">
              Live Verified
            </span>
          </div>
          <button
            onClick={() => handleAction("Sponsor Trust Certificate Generated")}
            className="px-4 py-2 bg-brand-green text-white rounded-xl text-[10px] font-black uppercase tracking-widest"
          >
            Trust Cert
          </button>
        </div>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Verified Invoices",
              count: "2.4k Items",
              status: "Audited",
              icon: FileSpreadsheet,
            },
            {
              title: "Completion Proofs",
              count: "482 Proofs",
              status: "Validated",
              icon: CheckCircle2,
            },
            {
              title: "Credibility Score",
              count: "9.8 / 10",
              status: "Gold Tier",
              icon: ShieldCheck,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 bg-slate-50 border border-slate-100 rounded-3xl group hover:border-brand-green/30 transition-all"
            >
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <item.icon className="text-brand-green" size={24} />
              </div>
              <h4 className="font-black text-slate-900 mb-1">{item.title}</h4>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-500">
                  {item.count}
                </span>
                <span className="text-[10px] font-black uppercase text-brand-green">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 p-8 bg-slate-900 rounded-[2.5rem] relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full"></div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="text-indigo-400" size={20} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
                  Secure Data Vault
                </span>
              </div>
              <h4 className="text-2xl font-black mb-4">
                Open Access Audit Protocol
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                All sponsors with active grants can access the secure data vault
                containing real-time financial tracking and verification media.
              </p>
              <button
                onClick={() => handleAction("Audit Vault Accessed")}
                className="group flex items-center gap-3 text-sm font-black uppercase tracking-widest text-brand-green hover:text-white transition-all"
              >
                Launch Audit Vault <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
            <div className="w-full md:w-auto flex flex-col gap-3 shrink-0">
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xs font-black">
                  KYC
                </div>
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase">
                    Status
                  </div>
                  <div className="text-xs font-bold">Verified Institution</div>
                </div>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xs font-black">
                  Tax
                </div>
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase">
                    Benefit
                  </div>
                  <div className="text-xs font-bold">CSR Compliance Ready</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFundingRequestCenter = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
        <div>
          <h3 className="text-xl font-black text-slate-900 mb-2">
            Submit New Funding Proposal
          </h3>
          <p className="text-xs font-medium text-slate-500">
            Submit campaign details for corporate sponsorship matching. Ensure all
            impact metrics are documented.
          </p>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 focus-within:scale-[1.01] transition-transform">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
                Campaign Need Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold"
                placeholder="e.g. Winter Clothes for Ward 4"
              />
            </div>
            <div className="space-y-1.5 focus-within:scale-[1.01] transition-transform">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
                Funding Required
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold"
                placeholder="₹ 50,000"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
              Expected Impact Summary
            </label>
            <textarea
              rows={3}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold resize-none"
              placeholder="Describe what this funding will achieve..."
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-slate-50 hover:border-indigo-300 transition-all group">
              <FileSpreadsheet className="text-slate-400 group-hover:text-indigo-600 group-hover:scale-110 transition-all" size={24} />
              <span className="text-[10px] font-black tracking-widest text-slate-400 group-hover:text-slate-600 uppercase">
                Attach Proposal
              </span>
            </button>
            <button
              onClick={() => handleAction("Emergency Request Flagged")}
              className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-rose-100 rounded-2xl bg-rose-50/20 hover:bg-rose-50 hover:border-rose-300 transition-all group"
            >
              <AlertCircle className="text-rose-300 group-hover:text-rose-500 group-hover:scale-110 transition-all" size={24} />
              <span className="text-[10px] font-black tracking-widest text-rose-400 group-hover:text-rose-600 uppercase">
                Emergency Priority
              </span>
            </button>
          </div>
        </div>
        <button
          onClick={() => handleAction("Funding Request Submitted")}
          className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10"
        >
          Submit Funding Request
        </button>
      </div>
      <div className="space-y-6">
        <div className="p-8 bg-indigo-50 rounded-[2.5rem] relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-indigo-100 rounded-full opacity-50"></div>
          <h4 className="text-indigo-900 font-black mb-2">Proposal Guidelines</h4>
          <ul className="space-y-3">
            {[
              "Audit verification requirement of 100%",
              "Impact score baseline of 8.5/10",
              "Timeline must not exceed 6 months",
              "Tax exemption status must be valid",
            ].map((rule, i) => (
              <li key={i} className="flex gap-3 text-xs font-bold text-indigo-700/70">
                <CheckCircle2 size={16} className="text-indigo-400 shrink-0" />
                {rule}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-8 bg-slate-900 text-white rounded-[2.5rem]">
          <h4 className="text-lg font-black mb-4">Sponsor Matching AI</h4>
          <p className="text-slate-400 text-sm leading-relaxed mb-6 italic">
            "Your proposal aligns with 12 existing CSR mandates from companies like
            TechCorp and Unity Infrastructure based on historical funding patterns."
          </p>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center text-[10px] font-black uppercase"
                >
                  C{i}
                </div>
              ))}
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">
              +9 potential sponsors
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 text-center md:text-left">
        <div className="flex-1">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <ShieldCheck className="text-brand-green" size={20} />
            <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase">
              Donor & CSR Impact Intelligence Center
            </h2>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-2">
            Transparency & Financial Ops
          </h1>
          <p className="text-slate-500 max-w-2xl text-sm leading-relaxed mx-auto md:mx-0">
            Track funding utilization, campaign transparency, measurable
            outcomes, and sponsor trust across all impact operations.
          </p>
        </div>
      </div>

      {renderOverviewCards()}

      <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl mb-8 w-max overflow-x-auto mx-auto lg:mx-0">
        {[
          { id: "campaigns", label: "Sponsored Campaigns", icon: Target },
          { id: "analytics", label: "Funding Analytics", icon: TrendingUp },
          { id: "utilization", label: "Utilization Reports", icon: PieChart },
          { id: "transparency", label: "Transparency Dashboard", icon: ShieldCheck },
          { id: "funding", label: "Funding Requests", icon: Briefcase },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as ReportTab)}
            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <tab.icon
              size={18}
              className={activeTab === tab.id ? "text-indigo-500" : ""}
            />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          {activeTab === "campaigns" && (
            <motion.div
              key="campaigns"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {renderSponsoredCampaigns()}
            </motion.div>
          )}

          {activeTab === "utilization" && (
            <motion.div
              key="utilization"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {renderUtilizationReports()}
            </motion.div>
          )}

          {activeTab === "transparency" && (
            <motion.div
              key="transparency"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {renderTransparencyDashboard()}
            </motion.div>
          )}

          {activeTab === "funding" && (
            <motion.div
              key="funding"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {renderFundingRequestCenter()}
            </motion.div>
          )}

          {activeTab === "analytics" && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-white border border-slate-100 rounded-[2.5rem] p-12 text-center"
            >
              <BarChart3 size={64} className="text-indigo-100 mb-6 mx-auto" />
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                Predictive Funding Analytics
              </h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto mb-10 leading-relaxed">
                Analyze monthly funding trends, top sponsors, and campaign-wise
                ROI. Project expected funding growth based on impact score history.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => handleAction("Export Financial Summary")}
                  className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all flex items-center gap-2"
                >
                  <Download size={16} /> Export Summary
                </button>
                <button className="px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
                  View Detailed Trends
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
