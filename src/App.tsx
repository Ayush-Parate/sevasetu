/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Search, Gift, User, Play, HandHeart, CheckCircle2, ChevronDown } from "lucide-react";
import { useState } from "react";
import LoginPage, { Role } from "./components/LoginPage";

const Navbar = ({ onLoginClick }: { onLoginClick: () => void }) => {
  const allLinks = [
    { name: "HOME", hasDropdown: false },
    { name: "PLATFORM", hasDropdown: true },
    { name: "SOLUTIONS", hasDropdown: true },
    { name: "IMPACT MAP", hasDropdown: false },
    { name: "DEMO", hasDropdown: false },
    { name: "SUCCESS STORIES", hasDropdown: false },
    { name: "PARTNER NETWORK", hasDropdown: false },
    { name: "INSIGHTS", hasDropdown: false },
    { name: "RESOURCES", hasDropdown: true },
    { name: "ABOUT US", hasDropdown: false },
    { name: "CONTACT", hasDropdown: false },
  ];

  return (
    <header className="w-full relative z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0">
      <nav className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-1 group cursor-pointer mr-8 shrink-0">
          <span className="text-xl font-bold text-slate-800 tracking-tight">NeedGraph<span className="text-brand-green">OS</span></span>
          <div className="w-6 h-1.5 bg-brand-green rounded-full mt-auto -ml-1 transition-all group-hover:w-8"></div>
        </div>

        {/* Navigation Links - All in one row */}
        <div className="hidden xl:flex items-center gap-4 2xl:gap-6 flex-1 justify-center">
          {allLinks.map((link) => (
            <div key={link.name} className="relative group cursor-pointer py-1">
              <div className="flex items-center gap-0.5 text-[9px] 2xl:text-[10px] font-bold tracking-widest text-slate-500 group-hover:text-brand-green transition-colors whitespace-nowrap">
                {link.name}
                {link.hasDropdown && <ChevronDown size={12} className="opacity-40" />}
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-green transition-all group-hover:w-full"></div>
            </div>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3 shrink-0 ml-6">
          <button 
            onClick={onLoginClick}
            className="hidden xl:block text-[9px] 2xl:text-[10px] font-bold tracking-widest text-slate-400 hover:text-brand-green transition-colors uppercase"
          >
            LOGIN PORTAL
          </button>
          <button className="hidden sm:block px-3 py-1.5 text-[9px] 2xl:text-[10px] font-bold tracking-widest text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors uppercase">
            NGO REGISTRATION
          </button>
          <button className="bg-brand-green text-white px-4 py-2 rounded-lg text-[9px] 2xl:text-[10px] font-bold tracking-widest hover:brightness-110 transition-all shadow-sm uppercase">
            JOIN AS VOLUNTEER
          </button>
          <div className="w-px h-6 bg-slate-100 mx-1 hidden sm:block"></div>
          <button className="p-2 text-slate-400 hover:text-brand-green transition-colors">
            <Search size={16} />
          </button>
        </div>
      </nav>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-12 pb-24 overflow-hidden">
      {/* Background Gradient Accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
      
      <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-tight text-slate-900 mb-8"
        >
          From Scattered Data to <span className="italic text-brand-green">Need Intelligence</span> & Action.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed text-sm md:text-base opacity-75"
        >
          Most platforms only manage volunteers. NeedGraph OS reads local community signals, prioritizes urgent needs, and dispatches action. We convert scattered field reports into a live intelligence graph for real social impact.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-8"
        >
          <button className="bg-brand-green text-white px-8 py-3.5 rounded-xl font-medium shadow-lg hover:shadow-brand-green/20 hover:-translate-y-0.5 transition-all">
            Donate Now
          </button>

          <button className="group flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-orange/20 rounded-full blur-md group-hover:blur-lg transition-all"></div>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center relative z-10 border border-brand-orange/20 shadow-sm text-brand-orange group-hover:scale-110 transition-transform">
                <Play size={20} fill="currentColor" />
              </div>
              {/* Circular Text Placeholder (SVG) */}
              <div className="absolute -inset-4 pointer-events-none animate-[spin_10s_linear_infinite]">
                 <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
                    <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                    <text className="text-[8px] uppercase tracking-[2px] font-sans">
                       <textPath xlinkHref="#circlePath">
                          Transforming intelligence into action •
                       </textPath>
                    </text>
                 </svg>
              </div>
            </div>
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">See the Heatmap</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const ImageGallery = () => {
  return (
    <section className="max-w-7xl mx-auto px-8 pb-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Card */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="aspect-[4/6] rounded-[100px] overflow-hidden shadow-2xl relative">
            <img 
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop" 
              alt="Children smiling"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {/* Overlay: Volunteers */}
            <div className="absolute bottom-16 left-6 bg-white p-3 rounded-2xl shadow-xl flex flex-col gap-2 max-w-[140px]">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-brand-orange/20 rounded-lg text-brand-orange">
                  <HandHeart size={14} />
                </div>
                <span className="text-[10px] font-bold text-slate-800">12 Active Field Agents</span>
              </div>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Avatar" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Center Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative pt-12"
        >
          <div className="aspect-[4/6] rounded-[100px] overflow-hidden shadow-2xl relative outline outline-8 outline-white">
            <img 
              src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop" 
              alt="Girl studying"
              className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-110 transition-transform duration-700"
            />
            {/* Overlay: Secure Donation */}
            <div className="absolute bottom-6 inset-x-6 bg-brand-green/90 backdrop-blur-sm p-4 rounded-3xl text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider">AI Need Prioritization</span>
                <CheckCircle2 size={14} className="text-brand-orange" />
              </div>
              <p className="text-[9px] leading-relaxed opacity-80">
                Data is automatically ranked by urgency, secondary impact risk, and resource availability for immediate routing.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Card */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="relative group self-center"
        >
          <div className="aspect-[4/6] rounded-[100px] overflow-hidden shadow-2xl relative">
            <img 
              src="https://images.unsplash.com/photo-1617953141905-b27fb1f17d88?q=80&w=1000&auto=format&fit=crop" 
              alt="Smiling child"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {/* Overlay: Overall Donation */}
            <div className="absolute top-1/2 -right-8 -translate-y-1/2 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-white/50 min-w-[180px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange">
                   <Gift size={16} />
                </div>
                <div>
                   <span className="text-[10px] font-bold text-slate-900 block">Need Resolution Rate</span>
                   <div className="flex items-center gap-1">
                      <div className="h-1 w-24 bg-slate-100 rounded-full overflow-hidden">
                         <div className="h-full bg-brand-orange w-3/4 rounded-full"></div>
                      </div>
                      <span className="text-[8px] font-bold text-slate-400">89%</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Dotted Arrow Path */}
      <div className="absolute left-1/2 top-2/3 -translate-x-1/2 w-48 h-24 hidden lg:block opacity-30 pointer-events-none">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <path d="M 0,50 Q 50,0 100,50 T 200,50" fill="none" stroke="#5D8D70" strokeWidth="2" strokeDasharray="6 6" />
        </svg>
      </div>
    </section>
  );
};

const IntelligenceGraph = () => {
  const steps = [
    {
      title: "Collect Scattered Data",
      desc: "Convert paper surveys, field reports, and WhatsApp signals into structured digital intake.",
      icon: "01",
    },
    {
      title: "Need Intelligence Graph",
      desc: "Our OS ranks problems by urgency and identifies hidden community needs automatically.",
      icon: "02",
    },
    {
      title: "Smart Dispatch",
      desc: "Automated volunteer routing based on skill, location, and priority of the need.",
      icon: "03",
    },
    {
      title: "Impact Verification",
      desc: "Track every action from dispatch to completion with verifiable social impact metrics.",
      icon: "04",
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold tracking-[0.2em] text-brand-green uppercase mb-4">The Need Intelligence Loop</h2>
            <p className="text-4xl md:text-5xl tracking-tight font-bold text-slate-900 leading-tight">
              Moving from <span className="italic">Manual Management</span> to Intelligent Action Routing.
            </p>
          </div>
          <p className="text-slate-500 max-w-sm text-sm border-l-2 border-brand-green pl-6 py-2">
            Most platforms stop at data collection. We start with action intelligence, ensuring the most critical community issues get solved first.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <motion.div 
              key={step.title}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
            >
              <span className="text-6xl font-black text-brand-green/10 group-hover:text-brand-green/20 transition-colors block mb-4">
                {step.icon}
              </span>
              <h3 className="text-xl font-bold tracking-tight text-slate-800 mb-3">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [view, setView] = useState<"landing" | "login" | "superadmin" | "ngoadmin" | "field_coordinator" | "volunteer" | "verifier" | "donor">("landing");

  if (view === "login") {
    return <LoginPage 
      onBack={() => setView("landing")} 
      onLoginSuccess={(role: Role) => {
        if (role === "SUPER_ADMIN") setView("superadmin");
        else if (role === "NGO_ADMIN") setView("ngoadmin");
        else if (role === "FIELD_COORDINATOR") setView("field_coordinator");
        else if (role === "VOLUNTEER") setView("volunteer");
        else if (role === "VERIFIER") setView("verifier");
        else if (role === "DONOR") setView("donor");
        else {
          alert(`Dashboard for ${role} is not yet implemented.`);
          setView("landing");
        }
      }} 
    />;
  }

  if (view === "superadmin") {
    return <SuperAdminDashboard onLogout={() => setView("landing")} />;
  }

  if (view === "ngoadmin") {
    return <NGOAdminDashboard onLogout={() => setView("landing")} />;
  }

  if (view === "field_coordinator") {
    return <FieldCoordinatorDashboard onLogout={() => setView("landing")} />;
  }

  if (view === "volunteer") {
    return <VolunteerDashboard onLogout={() => setView("landing")} />;
  }

  if (view === "verifier") {
    return <VerifierDashboard onLogout={() => setView("landing")} />;
  }

  if (view === "donor") {
    return <DonorDashboard onLogout={() => setView("landing")} />;
  }

  return (
    <main className="min-h-screen selection:bg-brand-green/20 overflow-x-hidden">
      <Navbar onLoginClick={() => setView("login")} />
      <Hero />
      <ImageGallery />
      <IntelligenceGraph />
      
      {/* Footer/CTA */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-green/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl tracking-tight font-bold mb-8">Ready to transform community intelligence?</h2>
          <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
            Join the 500+ NGOs already using NeedGraph OS to prioritize action and maximize their social footprint.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
             <button className="bg-brand-green px-10 py-4 rounded-xl font-bold hover:brightness-110 transition-all">Get a Demo</button>
             <button className="bg-white/10 px-10 py-4 rounded-xl font-bold backdrop-blur-sm hover:bg-white/20 transition-all">Register NGO</button>
          </div>
        </div>
      </section>
      
      {/* Decorative accent */}
      <div className="fixed bottom-0 left-0 w-full h-[15vh] bg-gradient-to-t from-brand-peach/30 to-transparent pointer-events-none -z-10"></div>
    </main>
  );
}

import SuperAdminDashboard from "./components/SuperAdminDashboard";
import NGOAdminDashboard from "./components/NGOAdminDashboard";
import FieldCoordinatorDashboard from "./components/FieldCoordinatorDashboard";
import VolunteerDashboard from "./components/VolunteerDashboard";
import VerifierDashboard from "./components/VerifierDashboard";
import DonorDashboard from "./components/DonorDashboard";
