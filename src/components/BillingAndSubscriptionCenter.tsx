import React, { useState } from "react";
import {
  CreditCard,
  TrendingUp,
  Users,
  Clock,
  AlertCircle,
  Building2,
  FileText,
  ShieldCheck,
  DollarSign,
  Download,
  ArrowRight,
  Settings,
  Heart,
  Landmark,
  FileBarChart,
  Edit,
  ArrowUpRight,
  Plus,
  Box,
  PieChart,
  Phone,
  RefreshCcw,
  HandHeart,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useToast } from "./Toast";

type SubView =
  | "plans"
  | "ngo_subs"
  | "renewals"
  | "recovery"
  | "invoices"
  | "analytics"
  | "enterprise"
  | "csr"
  | "donors"
  | "tax"
  | "settings";

export default function BillingAndSubscriptionCenter() {
  const [activeView, setActiveView] = useState<SubView>("plans");
  const { showToast } = useToast();

  const handleAction = (
    msg: string,
    type: "success" | "info" | "warning" | "error" = "success",
  ) => {
    showToast(msg, type);
  };

  const renderTopCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      {/* Card 1 */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 bg-brand-green/10 text-brand-green rounded-lg">
            <DollarSign size={16} />
          </div>
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Monthly Revenue
          </h3>
        </div>
        <div className="text-2xl font-bold text-slate-900 tracking-tight">
          $142,500
        </div>
        <div className="text-[10px] text-emerald-600 font-bold mb-3 flex items-center gap-1">
          <ArrowUpRight size={12} /> +12% this month
        </div>
        <button
          onClick={() => setActiveView("analytics")}
          className="py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1 w-full border border-slate-100"
        >
          Analytics <ArrowRight size={12} />
        </button>
      </div>

      {/* Card 2 */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
            <Users size={16} />
          </div>
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Active Subs
          </h3>
        </div>
        <div className="text-2xl font-bold text-slate-900 tracking-tight">
          1,240
        </div>
        <div className="text-[10px] text-slate-500 mb-3">
          890 Pro, 350 Enterprise
        </div>
        <button
          onClick={() => setActiveView("ngo_subs")}
          className="py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1 w-full border border-slate-100"
        >
          View Subscriptions <ArrowRight size={12} />
        </button>
      </div>

      {/* Card 3 */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 bg-amber-50 text-amber-600 rounded-lg">
            <Clock size={16} />
          </div>
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Pending Renewals
          </h3>
        </div>
        <div className="text-2xl font-bold text-slate-900 tracking-tight">
          85
        </div>
        <div className="text-[10px] text-amber-600 font-bold mb-3">
          Expiring this week
        </div>
        <button
          onClick={() => setActiveView("renewals")}
          className="py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1 w-full border border-slate-100"
        >
          Renewal Center <ArrowRight size={12} />
        </button>
      </div>

      {/* Card 4 */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 bg-rose-50 text-rose-600 rounded-lg">
            <AlertCircle size={16} />
          </div>
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Failed Payments
          </h3>
        </div>
        <div className="text-2xl font-bold text-slate-900 tracking-tight">
          12
        </div>
        <div className="text-[10px] text-rose-600 font-bold mb-3">
          Total $3,450 blocked
        </div>
        <button
          onClick={() => setActiveView("recovery")}
          className="py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1 w-full border border-slate-100"
        >
          Payment Recovery <ArrowRight size={12} />
        </button>
      </div>

      {/* Card 5 */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
            <HandHeart size={16} />
          </div>
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Sponsored NGOs
          </h3>
        </div>
        <div className="text-2xl font-bold text-slate-900 tracking-tight">
          320
        </div>
        <div className="text-[10px] text-slate-500 mb-3">
          Funded by CSR/Donors
        </div>
        <button
          onClick={() => setActiveView("csr")}
          className="py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1 w-full border border-slate-100"
        >
          Sponsorship Hub <ArrowRight size={12} />
        </button>
      </div>

      {/* Card 6 */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-sm flex flex-col justify-between text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green/20 blur-xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-brand-green/30 transition-all"></div>
        <div className="flex items-center gap-2 mb-2 relative z-10">
          <div className="p-1.5 bg-white/10 text-white rounded-lg">
            <Building2 size={16} />
          </div>
          <h3 className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
            Enterprise Clients
          </h3>
        </div>
        <div className="text-2xl font-bold text-white tracking-tight relative z-10">
          45
        </div>
        <div className="text-[10px] text-slate-400 mb-3 relative z-10">
          Gov & Large chains
        </div>
        <button
          onClick={() => setActiveView("enterprise")}
          className="py-1.5 bg-brand-green text-white hover:brightness-110 text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1 w-full border border-brand-green/20 relative z-10"
        >
          Enterprise <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );

  const renderPlans = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Subscription Plans & Matrix
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Manage pricing tiers and feature access controls.
          </p>
        </div>
        <button
          onClick={() => handleAction("New plan creator opened.", "info")}
          className="px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 shadow-lg flex flex-row items-center justify-center gap-2"
        >
          <Plus size={16} /> Create New Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          {
            name: "Free Starter",
            desc: "For small NGOs",
            price: "$0",
            features: [
              "Basic Reporting",
              "Limited Volunteers",
              "Limited Tasks",
              "Standard Dashboard",
            ],
            color: "bg-slate-50 border-slate-200",
          },
          {
            name: "Growth Plan",
            desc: "For medium NGOs",
            price: "$49/mo",
            features: [
              "Advanced Analytics",
              "Volunteer Matching",
              "Heatmap Access",
              "Priority Support",
            ],
            color: "bg-indigo-50 border-indigo-200",
          },
          {
            name: "Impact Pro",
            desc: "For large NGOs",
            price: "$149/mo",
            features: [
              "Full Need Intelligence",
              "Emergency Dispatch",
              "Multi-location Control",
              "Fraud Detection",
              "Premium Analytics",
            ],
            color: "bg-emerald-50 border-emerald-200",
          },
          {
            name: "Enterprise",
            desc: "City ops, Gov, CSR",
            price: "Custom",
            features: [
              "Custom Dashboards",
              "Dedicated Support",
              "District-wide Control",
              "API Integrations",
            ],
            color: "bg-slate-900 border-slate-800 text-white",
          },
        ].map((plan, i) => (
          <div
            key={i}
            className={`p-6 rounded-3xl border shadow-sm flex flex-col justify-between ${plan.color}`}
          >
            <div>
              <h4
                className={`text-xl font-bold tracking-tight mb-1 ${plan.name === "Enterprise" ? "text-white" : "text-slate-900"}`}
              >
                {plan.name}
              </h4>
              <p
                className={`text-xs font-semibold mb-4 ${plan.name === "Enterprise" ? "text-slate-400" : "text-slate-500"}`}
              >
                {plan.desc}
              </p>
              <div
                className={`text-3xl font-bold tracking-tight mb-6 ${plan.name === "Enterprise" ? "text-white" : "text-slate-900"}`}
              >
                {plan.price}
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feat, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <CheckCircle2
                      size={16}
                      className={
                        plan.name === "Enterprise"
                          ? "text-brand-green"
                          : "text-slate-400"
                      }
                    />
                    <span
                      className={`text-sm font-semibold ${plan.name === "Enterprise" ? "text-slate-300" : "text-slate-700"}`}
                    >
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleAction(`Editing ${plan.name}`, "info")}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 ${
                  plan.name === "Enterprise"
                    ? "bg-white/10 text-white hover:bg-white/20"
                    : "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                <Edit size={14} /> Edit
              </button>
              <button
                onClick={() =>
                  handleAction("Plan features duplicated.", "success")
                }
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 ${
                  plan.name === "Enterprise"
                    ? "bg-white/10 text-white hover:bg-white/20"
                    : "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                Duplicate
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mt-6">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-900">Feature Access Matrix</h3>
          <button
            onClick={() => handleAction("Feature locks updated.", "success")}
            className="px-4 py-2 bg-slate-50 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
          >
            Lock Premium Feature
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-slate-50 text-xs text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Feature</th>
                <th className="px-6 py-4 text-center">Free</th>
                <th className="px-6 py-4 text-center">Growth</th>
                <th className="px-6 py-4 text-center">Pro</th>
                <th className="px-6 py-4 text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { name: "Basic Reporting", access: [true, true, true, true] },
                { name: "Heatmap", access: [false, true, true, true] },
                { name: "Emergency Mode", access: [false, false, true, true] },
                {
                  name: "District-wide Control",
                  access: [false, false, false, true],
                },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                    {row.name}
                  </td>
                  {row.access.map((val, j) => (
                    <td key={j} className="px-6 py-4 text-center">
                      {val ? (
                        <CheckCircle2
                          size={16}
                          className="text-emerald-500 mx-auto"
                        />
                      ) : (
                        <XCircle size={16} className="text-slate-300 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderNGOSubs = () => (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50">
        <h3 className="text-lg font-bold text-slate-900">
          NGO Subscription Management
        </h3>
      </div>
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-slate-50 text-xs text-slate-500 font-semibold border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">NGO Name</th>
              <th className="px-6 py-4">Current Plan</th>
              <th className="px-6 py-4">Renewal Date</th>
              <th className="px-6 py-4">Payment Status</th>
              <th className="px-6 py-4">Revenue</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[
              {
                name: "CareConnect India",
                plan: "Impact Pro",
                date: "Nov 12, 2023",
                status: "Paid",
                rev: "$149/mo",
                sponsored: false,
              },
              {
                name: "Global Relief NGO",
                plan: "Enterprise",
                date: "Dec 01, 2023",
                status: "Pending",
                rev: "$899/mo",
                sponsored: false,
              },
              {
                name: "Local Outreach",
                plan: "Growth Plan",
                date: "Oct 28, 2023",
                status: "Sponsored",
                rev: "$49/mo",
                sponsored: true,
              },
            ].map((ngo, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-slate-900">
                    {ngo.name}
                  </div>
                  {ngo.sponsored && (
                    <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mt-1 block">
                      Sponsored
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-indigo-600">
                  {ngo.plan}
                </td>
                <td className="px-6 py-4 text-xs font-semibold text-slate-500">
                  {ngo.date}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                      ngo.status === "Paid" || ngo.status === "Sponsored"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {ngo.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-700">
                  {ngo.rev}
                </td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <button
                    onClick={() => handleAction("Opening NGO Profile.", "info")}
                    className="px-3 py-1.5 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg border border-slate-100 hover:bg-slate-100 transition-colors"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() =>
                      handleAction("Upgrade modal triggered.", "info")
                    }
                    className="px-3 py-1.5 bg-brand-green/10 text-brand-green text-xs font-bold rounded-lg hover:bg-brand-green/20 transition-colors"
                  >
                    Upgrade
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderRenewals = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="text-amber-500" size={24} />
            <h3 className="text-lg font-bold text-slate-900">
              Upcoming Renewals
            </h3>
          </div>
          <div className="space-y-4">
            {[
              { name: "City Rescue Team", days: "7 days", plan: "Growth Plan" },
              { name: "Hope Foundation", days: "15 days", plan: "Impact Pro" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100"
              >
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">
                    {item.name}
                  </h4>
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    {item.plan}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-amber-600 font-bold text-sm mb-1">
                    {item.days}
                  </div>
                  <button
                    onClick={() =>
                      handleAction("Auto reminder sent.", "success")
                    }
                    className="text-xs font-bold text-indigo-600 hover:underline"
                  >
                    Send Reminder
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="text-rose-500" size={24} />
            <h3 className="text-lg font-bold text-slate-900">
              Overdue Renewals
            </h3>
          </div>
          <div className="space-y-4">
            {[
              {
                name: "Westside Relief",
                due: "Expired 2 days ago",
                plan: "Impact Pro",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-4 bg-rose-50 rounded-xl border border-rose-100"
              >
                <div>
                  <h4 className="font-bold text-rose-900 text-sm">
                    {item.name}
                  </h4>
                  <p className="text-xs font-semibold text-rose-700/80 mt-1">
                    {item.plan}
                  </p>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                  <div className="text-rose-600 font-bold text-xs">
                    {item.due}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleAction("Grace period extended 7 days.", "success")
                      }
                      className="px-2 py-1 bg-white text-rose-700 text-[10px] font-bold rounded-md border border-rose-200"
                    >
                      Extend Grace
                    </button>
                    <button
                      onClick={() => handleAction("Calling NGO...", "info")}
                      className="px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-md"
                    >
                      Call
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderInvoices = () => (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-900">Generated Invoices</h3>
        <button
          onClick={() =>
            handleAction("Manual invoice creation opened.", "info")
          }
          className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl transition-colors"
        >
          Manual Record
        </button>
      </div>
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-slate-50 text-xs text-slate-500 font-semibold border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Invoice ID</th>
              <th className="px-6 py-4">Client/NGO</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[
              {
                id: "INV-2023-001",
                org: "CareConnect India",
                amt: "$149.00",
                due: "Oct 25, 2023",
                status: "Paid",
              },
              {
                id: "INV-2023-002",
                org: "Gov of District 5",
                amt: "$12,500.00",
                due: "Oct 28, 2023",
                status: "Pending",
              },
              {
                id: "INV-2023-003",
                org: "Global Relief",
                amt: "$899.00",
                due: "Oct 20, 2023",
                status: "Overdue",
              },
            ].map((inv, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-bold text-slate-500 font-mono">
                  {inv.id}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                  {inv.org}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-700">
                  {inv.amt}
                </td>
                <td className="px-6 py-4 text-xs font-semibold text-slate-500">
                  {inv.due}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                      inv.status === "Paid"
                        ? "bg-emerald-50 text-emerald-700"
                        : inv.status === "Pending"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleAction("PDF downloaded.", "success")}
                    className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors border border-slate-100"
                  >
                    <Download size={16} />
                  </button>
                  <button
                    onClick={() => handleAction("Invoice resent.", "success")}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-lg transition-colors border border-slate-100"
                  >
                    Resend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCSR = () => (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10 max-w-lg mb-6 md:mb-0">
          <div className="flex items-center gap-3 mb-2">
            <HandHeart className="text-emerald-400" size={24} />
            <h3 className="text-2xl font-bold text-white tracking-tight">
              CSR Sponsorship Hub
            </h3>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Manage corporate sponsorships. Corporations fund NGO access, and the
            system auto-generates CSR impact reports for their compliance.
          </p>
        </div>
        <div className="relative z-10">
          <button
            onClick={() => handleAction("Sponsorship builder opened.", "info")}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-emerald-500/20 flex items-center gap-2"
          >
            <Plus size={18} /> Create Sponsorship Plan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          {
            corp: "TechCorp India",
            ngos: 15,
            duration: "12 Months",
            value: "$25,000",
          },
          {
            corp: "Global Bank CSR",
            ngos: 40,
            duration: "24 Months",
            value: "$85,000",
          },
        ].map((sponsor, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between"
          >
            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">
                {sponsor.corp}
              </h4>
              <div className="grid grid-cols-3 gap-2 mb-6">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Funded NGOs
                  </div>
                  <div className="text-lg font-bold text-indigo-600">
                    {sponsor.ngos}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Duration
                  </div>
                  <div className="text-sm font-semibold text-slate-700 mt-1">
                    {sponsor.duration}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Value
                  </div>
                  <div className="text-sm font-bold text-emerald-600 mt-1">
                    {sponsor.value}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  handleAction("Impact report generated.", "success")
                }
                className="flex-1 py-2 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors flex justify-center items-center gap-1"
              >
                <FileBarChart size={14} /> Impact Report
              </button>
              <button
                onClick={() =>
                  handleAction("Assigning new NGO to sponsor pool...", "info")
                }
                className="flex-1 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
              >
                Assign NGO
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 flex flex-col lg:flex-row h-full">
      {/* Left Sidebar Menu */}
      <div className="w-full lg:w-64 shrink-0 overflow-y-auto custom-scrollbar border-r border-slate-100 bg-slate-50/50 p-6 hidden lg:block">
        <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4 px-2">
          FINANCIAL CONTROL
        </h2>
        <nav className="space-y-1">
          {[
            { id: "plans", label: "Subscription Plans", icon: Box },
            { id: "ngo_subs", label: "NGO Subscription Mgt", icon: Building2 },
            { id: "renewals", label: "Renewal Center", icon: RefreshCcw },
            { id: "recovery", label: "Payment Recovery", icon: AlertCircle },
            { id: "invoices", label: "Invoice Management", icon: FileText },
            { id: "analytics", label: "Revenue Analytics", icon: PieChart },
            { id: "enterprise", label: "Enterprise Contracts", icon: Landmark },
            { id: "csr", label: "CSR Sponsorship Hub", icon: HandHeart },
            { id: "donors", label: "Donor Funding Plans", icon: Heart },
            { id: "tax", label: "Tax & Compliance", icon: ShieldCheck },
            { id: "settings", label: "Billing Settings", icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as SubView)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeView === item.id
                  ? "bg-white text-brand-green shadow-sm border border-slate-100"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
              }`}
            >
              <item.icon
                size={18}
                className={
                  activeView === item.id ? "text-brand-green" : "text-slate-400"
                }
              />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 overflow-y-auto custom-scrollbar p-6 lg:p-8 bg-white/50">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-2">
            Billing & Subscription Center
          </h1>
          <p className="text-slate-500 max-w-3xl leading-relaxed text-sm">
            Manage NGO plans, platform revenue, renewals, invoices, enterprise
            access, and sponsorship billing across the ecosystem.
          </p>
        </div>

        {/* Mobile Menu Dropdown (visible only on small screens) */}
        <div className="mb-6 lg:hidden">
          <select
            value={activeView}
            onChange={(e) => setActiveView(e.target.value as SubView)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green/20"
          >
            <option value="plans">Subscription Plans</option>
            <option value="ngo_subs">NGO Subscription Management</option>
            <option value="renewals">Renewal Center</option>
            <option value="recovery">Payment Recovery</option>
            <option value="invoices">Invoice Management</option>
            <option value="analytics">Revenue Analytics</option>
            <option value="enterprise">Enterprise Contracts</option>
            <option value="csr">CSR Sponsorship Hub</option>
            <option value="donors">Donor Funding Plans</option>
            <option value="tax">Tax & Compliance</option>
            <option value="settings">Billing Settings</option>
          </select>
        </div>

        {renderTopCards()}

        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeView === "plans" && renderPlans()}
              {activeView === "ngo_subs" && renderNGOSubs()}
              {activeView === "renewals" && renderRenewals()}
              {activeView === "invoices" && renderInvoices()}
              {activeView === "csr" && renderCSR()}

              {/* Fallback for un-implemented subpages */}
              {[
                "recovery",
                "analytics",
                "enterprise",
                "donors",
                "tax",
                "settings",
              ].includes(activeView) && (
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-12 flex flex-col items-center justify-center text-center">
                  <Settings size={48} className="text-slate-300 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2 capitalize">
                    {activeView.replace("_", " ")} Module
                  </h3>
                  <p className="text-slate-500 max-w-sm mb-6">
                    This administration module is loaded efficiently and
                    displays configuration arrays specific to the{" "}
                    {activeView.replace("_", " ")} domain.
                  </p>
                  <button
                    onClick={() => setActiveView("plans")}
                    className="px-6 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl shadow-sm hover:bg-slate-50"
                  >
                    Return to Plans
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
