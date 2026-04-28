import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BarChart3, 
  ShieldCheck, 
  AlertTriangle, 
  ClipboardCheck, 
  Copy, 
  Search, 
  Users, 
  LayoutDashboard, 
  FileCheck, 
  ShieldAlert, 
  History, 
  MessageSquare, 
  Settings, 
  LogOut,
  Bell,
  SearchIcon,
  ChevronDown,
  User,
  Activity,
  Zap,
  Target
} from "lucide-react";

// Sub-components
import VerifierOverview from "./verifier/VerifierOverview";
import VerificationQueue from "./verifier/VerificationQueue";
import EmergencyValidation from "./verifier/EmergencyValidation";
import ProofReview from "./verifier/ProofReview";
import DuplicateDetection from "./verifier/DuplicateDetection";
import FraudInvestigation from "./verifier/FraudInvestigation";
import TrustReviewCenter from "./verifier/TrustReviewCenter";
import FieldValidation from "./verifier/FieldValidation";
import VerificationAnalytics from "./verifier/VerificationAnalytics";
import VerifierComms from "./verifier/VerifierComms";
import VerifierSettings from "./verifier/VerifierSettings";

type VerifierTab = 
  | "dashboard" 
  | "queue" 
  | "emergency" 
  | "proof" 
  | "duplicates" 
  | "fraud" 
  | "trust" 
  | "field" 
  | "analytics" 
  | "comms" 
  | "settings";

export default function VerifierDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<VerifierTab>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { id: "dashboard", label: "Intelligence Center", icon: LayoutDashboard },
    { id: "queue", label: "Verification Queue", icon: ClipboardCheck },
    { id: "emergency", label: "Emergency Validator", icon: Zap },
    { id: "proof", label: "Proof Review Hub", icon: FileCheck },
    { id: "duplicates", label: "Duplicate Detection", icon: Copy },
    { id: "fraud", label: "Fraud Investigation", icon: ShieldAlert },
    { id: "trust", label: "Trust Score Audits", icon: Target },
    { id: "field", label: "Field Requests", icon: Users },
    { id: "analytics", label: "Accuracy Metrics", icon: Activity },
    { id: "comms", label: "Escalation Comms", icon: MessageSquare },
    { id: "settings", label: "System Config", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <VerifierOverview setActiveTab={setActiveTab} />;
      case "queue": return <VerificationQueue />;
      case "emergency": return <EmergencyValidation />;
      case "proof": return <ProofReview />;
      case "duplicates": return <DuplicateDetection />;
      case "fraud": return <FraudInvestigation />;
      case "trust": return <TrustReviewCenter />;
      case "field": return <FieldValidation />;
      case "analytics": return <VerificationAnalytics />;
      case "comms": return <VerifierComms />;
      case "settings": return <VerifierSettings />;
      default: return <VerifierOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans selection:bg-brand-green/20">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 320 : 100 }}
        className="h-full bg-slate-950 text-white flex flex-col relative z-20 shadow-2xl"
      >
        <div className="p-8 flex items-center gap-4">
          <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-brand-green/20">
            <ShieldCheck size={24} className="text-white" />
          </div>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-lg tracking-tight"
            >
              Trust<span className="text-brand-green">Sentry</span>
            </motion.div>
          )}
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto no-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as VerifierTab)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${
                activeTab === item.id 
                  ? "bg-brand-green text-white shadow-lg shadow-brand-green/20" 
                  : "text-slate-500 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={22} className={`${activeTab === item.id ? "text-white" : "group-hover:text-brand-green transition-colors"}`} />
              {isSidebarOpen && <span className="text-sm font-bold tracking-tight">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto space-y-2">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 p-4 rounded-2xl text-rose-400 hover:bg-rose-500/10 transition-all group"
          >
            <LogOut size={22} />
            {isSidebarOpen && <span className="text-sm font-bold tracking-tight">System Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-24 bg-white border-b border-slate-100 px-10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-6 flex-1">
             <button 
               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
               className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-slate-900 transition-colors"
             >
                <LayoutDashboard size={20} />
             </button>
             <div className="relative max-w-md w-full">
                <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search Case ID, NGO UUID, or Field Agent..." 
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand-green/20 placeholder:text-slate-400 italic"
                />
             </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
               <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Node Sync Active</span>
            </div>
            
            <button className="relative p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-brand-green transition-all">
               <Bell size={20} />
               <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="flex items-center gap-4 pl-8 border-l border-slate-100">
               <div className="text-right hidden sm:block">
                  <div className="text-sm font-bold text-slate-900 leading-none">Vanguard Unit 04</div>
                  <div className="text-[10px] font-black text-brand-green uppercase tracking-widest mt-1">Lead Verifier</div>
               </div>
               <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shadow-inner flex items-center justify-center text-slate-400">
                  <User size={24} />
               </div>
               <ChevronDown size={16} className="text-slate-400" />
            </div>
          </div>
        </header>

        {/* Dynamic Canvas */}
        <section className="flex-1 overflow-y-auto no-scrollbar bg-slate-50/50 p-10">
           <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                 {renderContent()}
              </motion.div>
           </AnimatePresence>
        </section>
      </main>
    </div>
  );
}
