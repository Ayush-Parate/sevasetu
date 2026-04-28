import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BarChart3, 
  LayoutDashboard, 
  CreditCard, 
  Camera, 
  ShoppingBag, 
  ShieldCheck, 
  LogOut, 
  Bell, 
  Settings, 
  Search,
  Menu,
  X,
  ChevronRight,
  User,
  Heart,
  AlertTriangle,
  FileText,
  MessageSquare
} from "lucide-react";

import DonorOverview from "./donor/DonorOverview";
import ImpactIntelligence from "./donor/ImpactIntelligence";
import FinancialLedger from "./donor/FinancialLedger";
import FieldProofWall from "./donor/FieldProofWall";
import ProjectMarketplace from "./donor/ProjectMarketplace";
import ComplianceCenter from "./donor/ComplianceCenter";
import EmergencyFundingCenter from "./donor/EmergencyFundingCenter";
import NGOTrustCenter from "./donor/NGOTrustCenter";
import PartnershipCenter from "./donor/PartnershipCenter";
import CommunicationCenter from "./donor/CommunicationCenter";
import CSRProfile from "./donor/CSRProfile";

export default function DonorDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "marketplace", label: "Funding Opportunities", icon: ShoppingBag },
    { id: "emergency", label: "Emergency Funding", icon: AlertTriangle },
    { id: "impact", label: "CSR Analytics & ROI", icon: BarChart3 },
    { id: "trust", label: "NGO Trust Center", icon: ShieldCheck },
    { id: "ledger", label: "Utilization Reports", icon: CreditCard },
    { id: "proof", label: "Field Proof Wall", icon: Camera },
    { id: "compliance", label: "Compliance & Audit", icon: FileText },
    { id: "partnerships", label: "Partnership Renewal", icon: Heart },
    { id: "comms", label: "Communication", icon: MessageSquare },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <DonorOverview />;
      case "impact": return <ImpactIntelligence />;
      case "ledger": return <FinancialLedger />;
      case "proof": return <FieldProofWall />;
      case "marketplace": return <ProjectMarketplace />;
      case "compliance": return <ComplianceCenter />;
      case "emergency": return <EmergencyFundingCenter />;
      case "trust": return <NGOTrustCenter />;
      case "partnerships": return <PartnershipCenter />;
      case "comms": return <CommunicationCenter />;
      case "profile": return <CSRProfile />;
      default: return <DonorOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF7] flex overflow-hidden font-sans">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="hidden lg:flex flex-col bg-white border-r border-slate-100 z-50 transition-all duration-300 ease-in-out relative"
      >
        <div className="p-8 flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 bg-brand-green rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-brand-green/20">
             <Heart size={18} className="text-white fill-current" />
          </div>
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-xl font-bold tracking-tight text-slate-800 whitespace-nowrap"
              >
                SevaSetu<span className="text-brand-green">.</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group relative ${
                  isActive 
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-900/10" 
                    : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                }`}
              >
                <div className={`shrink-0 transition-transform ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                   <item.icon size={20} />
                </div>
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-bold tracking-tight whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && isSidebarOpen && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="ml-auto"
                  >
                    <ChevronRight size={14} className="opacity-50" />
                  </motion.div>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-50 space-y-2">
          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all">
             <Settings size={20} />
             {isSidebarOpen && <span className="text-sm font-bold tracking-tight">Settings</span>}
          </button>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-50 transition-all"
          >
             <LogOut size={20} />
             {isSidebarOpen && <span className="text-sm font-bold tracking-tight">Sign Out</span>}
          </button>
        </div>

        {/* Toggle Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-4 top-24 w-8 h-8 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-lg text-slate-400 hover:text-brand-green transition-colors z-50 hidden lg:flex"
        >
          {isSidebarOpen ? <X size={14} /> : <Menu size={14} />}
        </button>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-50 px-8 py-4 flex items-center justify-between z-40">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest lg:hidden">
                 <Menu size={18} />
              </div>
              <div className="relative hidden md:block">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                 <input 
                   type="text" 
                   placeholder="Search impact, projects, NGOs..." 
                   className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-green/20 w-80"
                 />
              </div>
           </div>

           <div className="flex items-center gap-4 md:gap-6">
              <button className="relative p-2 text-slate-400 hover:text-slate-900 transition-colors">
                 <Bell size={20} />
                 <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-orange border-2 border-white rounded-full"></span>
              </button>
              <div className="w-px h-6 bg-slate-100 mx-2 hidden md:block"></div>
              <div 
                 onClick={() => setActiveTab("profile")}
                 className="flex items-center gap-3 group cursor-pointer"
              >
                 <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-slate-900 leading-none">Global Tech CSR</p>
                    <p className="text-[10px] text-brand-green font-bold uppercase tracking-widest mt-1">Enterprise Partner</p>
                 </div>
                 <div className="w-10 h-10 rounded-2xl bg-brand-peach text-brand-orange flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform overflow-hidden">
                    <img src="https://i.pravatar.cc/150?u=techcsr" alt="User Profile" />
                 </div>
              </div>
           </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
           <div className="max-w-[1400px] mx-auto">
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
           </div>
        </div>
      </main>
    </div>
  );
}
