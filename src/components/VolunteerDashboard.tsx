import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  LayoutDashboard, 
  MapPin, 
  CheckSquare, 
  AlertCircle, 
  TrendingUp, 
  ShieldCheck, 
  Award, 
  Calendar, 
  MessageSquare, 
  User, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  FileText
} from "lucide-react";
import VolunteerOverview from "./volunteer/VolunteerOverview";
import NearbyTasksCenter from "./volunteer/NearbyTasksCenter";
import MyTaskTracker from "./volunteer/MyTaskTracker";
import EmergencyTaskFeed from "./volunteer/EmergencyTaskFeed";
import ReportSubmission from "./ReportSubmission";
import TaskTracker from "./TaskTracker";
import MapIntelligence from "./MapIntelligence";
import RewardsCenter from "./volunteer/RewardsCenter";
import TrustVerification from "./volunteer/TrustVerification";
import CommunityCampaigns from "./volunteer/CommunityCampaigns";
import CommunicationCenter from "./volunteer/CommunicationCenter";
import ProfileManagement from "./volunteer/ProfileManagement";
import SettingsCenter from "./volunteer/SettingsCenter";

type Tab = 
  | "dashboard" 
  | "nearby" 
  | "tasks" 
  | "emergency" 
  | "impact" 
  | "trust" 
  | "rewards" 
  | "campaigns" 
  | "comms" 
  | "submit_report"
  | "profile" 
  | "settings";

export default function VolunteerDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "nearby", label: "Nearby Tasks", icon: MapPin },
    { id: "tasks", label: "My Tasks", icon: CheckSquare },
    { id: "emergency", label: "Emergency Feed", icon: AlertCircle, count: 3, alert: true },
    { id: "impact", label: "My Impact", icon: TrendingUp },
    { id: "trust", label: "Trust & Verification", icon: ShieldCheck },
    { id: "rewards", label: "Rewards", icon: Award },
    { id: "campaigns", label: "Campaigns", icon: Calendar },
    { id: "comms", label: "Communication", icon: MessageSquare },
    { id: "submit_report", label: "Submit Report", icon: FileText },
    { id: "profile", label: "Profile & Skills", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <VolunteerOverview setActiveTab={setActiveTab} />;
      case "nearby": return <MapIntelligence />;
      case "tasks": return <TaskTracker />;
      case "emergency": return <EmergencyTaskFeed />;
      case "impact": return <TaskTracker />;
      case "trust": return <TrustVerification />;
      case "rewards": return <RewardsCenter />;
      case "campaigns": return <CommunityCampaigns />;
      case "comms": return <CommunicationCenter />;
      case "submit_report": return <ReportSubmission />;
      case "profile": return <ProfileManagement />;
      case "settings": return <SettingsCenter />;
      default: return <VolunteerOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#FDFCFB] overflow-hidden font-sans">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-white border-r border-slate-100 flex flex-col relative z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
      >
        {/* Logo Section */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-brand-green/20">
             <span className="text-white font-black text-xl italic">S</span>
          </div>
          {isSidebarOpen && (
            <span className="font-bold text-slate-800 tracking-tight text-lg">
              SevaSetu<span className="text-brand-green text-xs align-top ml-0.5">Vol</span>
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto no-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`w-full flex items-center gap-3 p-3.5 rounded-2xl transition-all relative group ${
                activeTab === item.id 
                ? "bg-brand-green text-white shadow-xl shadow-brand-green/20" 
                : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? "animate-pulse" : ""} />
              {isSidebarOpen && (
                <span className="text-sm font-bold tracking-tight">{item.label}</span>
              )}
              {item.count && isSidebarOpen && (
                <span className={`ml-auto text-[10px] font-black px-2 py-0.5 rounded-full ${item.alert ? "bg-rose-500 text-white" : "bg-brand-orange text-white"}`}>
                  {item.count}
                </span>
              )}
              {activeTab === item.id && (
                <motion.div layoutId="active-pill" className="absolute left-[-1rem] w-1.5 h-6 bg-brand-green rounded-r-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-slate-50 space-y-2">
           <button 
             onClick={onLogout}
             className="w-full flex items-center gap-3 p-3.5 rounded-2xl text-rose-400 hover:text-rose-600 hover:bg-rose-50 transition-all group"
           >
             <LogOut size={20} />
             {isSidebarOpen && <span className="text-sm font-bold tracking-tight">Logout</span>}
           </button>
           
           {isSidebarOpen && (
             <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-md">
                 <img src="https://i.pravatar.cc/100?u=volunteer1" alt="avatar" />
               </div>
               <div className="flex-1 overflow-hidden">
                 <div className="text-xs font-black text-slate-800 truncate">Arjun Sharma</div>
                 <div className="text-[10px] text-brand-green font-bold uppercase tracking-widest flex items-center gap-1">
                   <div className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse"></div>
                   Verified
                 </div>
               </div>
             </div>
           )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#FDFCFB]">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
             <button 
               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
               className="p-2 text-slate-400 hover:text-slate-600 lg:hidden"
             >
               <Menu size={24} />
             </button>
             <h1 className="text-xl font-bold text-slate-900 tracking-tight capitalize">
               {menuItems.find(i => i.id === activeTab)?.label}
             </h1>
          </div>

          <div className="flex items-center gap-6">
             <div className="relative hidden md:block">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <input 
                  type="text" 
                  placeholder="Universal search..." 
                  className="pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-brand-green/10 w-64 transition-all"
               />
             </div>
             <button className="relative p-2 text-slate-400 hover:text-brand-green transition-all group">
                <Bell size={22} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
             </button>
             <div className="h-8 w-px bg-slate-100 mx-2"></div>
             <div className="flex items-center gap-3">
               <div className="text-right hidden sm:block">
                 <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Personal Mission Control</div>
                 <div className="text-xs font-bold text-slate-700">SevaSetu Vol Intelligence</div>
               </div>
             </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-8">
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
      </main>
    </div>
  );
}
