import React from "react";
import {
  Building2,
  MapPin,
  FileText,
  Shield,
  CheckCircle2,
  XCircle,
  PhoneCall,
  Mail,
  User,
  AlertTriangle,
  ArrowLeft,
  Download,
  FileCheck,
  Search,
  Clock,
} from "lucide-react";
import { motion } from "motion/react";

export default function NGOApprovalView({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">
                New Hope Foundation
              </h1>
              <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                Pending Review
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Application ID: APP-2024-992 • Submitted 2 days ago
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-lg shadow-slate-900/10">
            <CheckCircle2 size={16} /> Approve NGO
          </button>
          <button className="px-4 py-2 bg-rose-50 text-rose-600 text-sm font-medium rounded-xl hover:bg-rose-100 transition-colors flex items-center gap-2 border border-rose-100">
            <XCircle size={16} /> Reject
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold tracking-tight text-slate-900 text-lg mb-4">
              Registration Details
            </h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Focus Category
                </span>
                <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <FileText size={16} className="text-slate-400" /> Education &
                  Healthcare
                </span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Operating Region
                </span>
                <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <MapPin size={16} className="text-slate-400" /> South Region,
                  District 4
                </span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Primary Contact
                </span>
                <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <User size={16} className="text-slate-400" /> Dr. Sarah
                  Jenkins
                </span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Contact Details
                </span>
                <span className="flex items-center gap-4 text-sm font-medium text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Mail size={16} className="text-slate-400" />{" "}
                    sarah@newhope.org
                  </span>
                  <span className="flex items-center gap-1.5">
                    <PhoneCall size={16} className="text-slate-400" /> +1 234
                    567 890
                  </span>
                </span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-50">
              <h4 className="text-sm font-semibold text-slate-800 mb-2">
                Organization Mission
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Dedicated to providing foundational education and basic
                healthcare services to underprivileged children in the South
                Region. We aim to build 5 new learning centers in the next two
                years.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold tracking-tight text-slate-900 text-lg">
                Verification Documents
              </h3>
              <span className="text-sm font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-lg">
                3/4 Verified
              </span>
            </div>
            <div className="space-y-3">
              {[
                { name: "Certificate of Incorporation", status: "verified" },
                { name: "Tax Exemption Certificate", status: "verified" },
                { name: "Board of Directors List", status: "verified" },
                { name: "Audit Report (Last FY)", status: "pending" },
              ].map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${doc.status === "verified" ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-500"}`}
                    >
                      <FileCheck size={18} />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-800 block">
                        {doc.name}
                      </span>
                      <span className="text-xs text-slate-500">
                        PDF Document • 2.4 MB
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {doc.status === "verified" ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                        <CheckCircle2 size={14} /> Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-amber-600">
                        <Clock size={14} /> Pending Review
                      </span>
                    )}
                    <button className="p-2 text-slate-400 hover:text-brand-green bg-white rounded-lg shadow-sm border border-slate-100 transition-colors">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Actions */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold tracking-tight text-slate-900 mb-4">
              Action Center
            </h3>
            <div className="space-y-3">
              <button className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-medium rounded-xl transition-colors flex items-center gap-3 border border-slate-100">
                <FileText size={18} className="text-brand-green" />
                Request More Documents
              </button>
              <button className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-medium rounded-xl transition-colors flex items-center gap-3 border border-slate-100">
                <PhoneCall size={18} className="text-indigo-500" />
                Schedule Verification Call
              </button>
              <button className="w-full py-3 px-4 bg-amber-50 hover:bg-amber-100 text-amber-700 text-sm font-medium rounded-xl transition-colors flex items-center gap-3 border border-amber-100">
                <AlertTriangle size={18} />
                Mark Under Review
              </button>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl shadow-sm text-white">
            <h3 className="font-bold tracking-tight mb-2 text-lg">
              Legal Validation
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              Run background checks and legal compliance scans through
              integrated APIs.
            </p>
            <button className="w-full py-3 bg-brand-green text-white text-sm font-bold rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2">
              <Shield size={18} /> Run Compliance Scan
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
