import { motion } from "motion/react";
import { Search, Gift, Play, HandHeart, CheckCircle2, ChevronDown } from "lucide-react";
import { Circle, CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import PublicRequestModal from "../components/PublicRequestModal";
import { useToast } from "../components/Toast";
import React, { useState } from "react";

const INDIA_CENTER: [number, number] = [22.9, 79.3];
const HOTSPOTS = [
  { name: "Mumbai", position: [19.076, 72.8777] as [number, number], severity: "high", radius: 30000 },
  { name: "Pune", position: [18.5204, 73.8567] as [number, number], severity: "medium", radius: 24000 },
  { name: "Nashik", position: [19.9975, 73.7898] as [number, number], severity: "medium", radius: 18000 },
  { name: "Nagpur", position: [21.1458, 79.0882] as [number, number], severity: "high", radius: 22000 },
  { name: "Assam", position: [26.2006, 92.9376] as [number, number], severity: "high", radius: 36000 },
  { name: "Bengaluru", position: [12.9716, 77.5946] as [number, number], severity: "low", radius: 15000 }
];

const ACTIVE_VOLUNTEERS = [
  [19.12, 72.88],
  [18.56, 73.86],
  [13.02, 77.62],
  [22.59, 88.36],
  [17.43, 78.38],
  [28.63, 77.21]
] as [number, number][];

function IndiaCrisisMap({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`w-full overflow-hidden rounded-2xl border border-slate-200 ${compact ? "h-64" : "h-[420px]"}`}>
      <MapContainer
        center={INDIA_CENTER}
        zoom={5}
        minZoom={4}
        maxZoom={11}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {HOTSPOTS.map((hotspot) => {
          const color =
            hotspot.severity === "high" ? "#ef4444" : hotspot.severity === "medium" ? "#f59e0b" : "#10b981";
          return (
            <Circle
              key={hotspot.name}
              center={hotspot.position}
              radius={hotspot.radius}
              pathOptions={{ color, fillColor: color, fillOpacity: 0.25 }}
            >
              <Popup>
                <strong>{hotspot.name}</strong>
                <br />
                {hotspot.severity.toUpperCase()} priority zone
              </Popup>
            </Circle>
          );
        })}
        {ACTIVE_VOLUNTEERS.map((position, idx) => (
          <CircleMarker
            key={`${position[0]}-${position[1]}-${idx}`}
            center={position}
            radius={6}
            pathOptions={{ color: "#0f766e", fillColor: "#14b8a6", fillOpacity: 0.95 }}
          >
            <Popup>Active volunteer node</Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

const Navbar = ({
  onLoginClick,
  onSignupClick
}: {
  onLoginClick: () => void;
  onSignupClick: () => void;
}) => {
  const allLinks = [
    { name: "HOME", hasDropdown: false },
    { name: "PLATFORM", hasDropdown: true },
    { name: "SOLUTIONS", hasDropdown: true },
    { name: "ABOUT US", hasDropdown: false },
    { name: "CONTACT", hasDropdown: false },
  ];

  return (
    <header className="w-full relative z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0">
      <nav className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-1 group cursor-pointer mr-8 shrink-0">
          <span className="text-xl font-bold text-slate-800 tracking-tight">Sevasetu</span>
          <div className="w-6 h-1.5 bg-brand-green rounded-full mt-auto -ml-1 transition-all group-hover:w-8"></div>
        </div>

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

        <div className="flex items-center gap-3 shrink-0 ml-6">
          <button
            onClick={onLoginClick}
            className="hidden sm:block px-3 py-1.5 text-[9px] 2xl:text-[10px] font-bold tracking-widest text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors uppercase"
          >
            LOGIN
          </button>
          <button
            onClick={onSignupClick}
            className="bg-brand-green text-white px-4 py-2 rounded-lg text-[9px] 2xl:text-[10px] font-bold tracking-widest hover:brightness-110 transition-all shadow-sm uppercase"
          >
            SIGNUP
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

const Hero = ({ onOpenRequest }: { onOpenRequest: (type: "DONOR_INTEREST" | "DEMO_REQUEST") => void }) => {
  return (
    <section className="relative pt-12 pb-24 overflow-hidden">
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
          Most platforms only manage volunteers. Sevasetu reads local community signals, prioritizes urgent needs, and
          dispatches action. We convert scattered field reports into a live intelligence graph for real social impact.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-8"
        >
          <button
            onClick={() => onOpenRequest("DONOR_INTEREST")}
            className="bg-brand-green text-white px-8 py-3.5 rounded-xl font-medium shadow-lg hover:shadow-brand-green/20 hover:-translate-y-0.5 transition-all"
          >
            Donate Now
          </button>

          <button className="group flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-orange/20 rounded-full blur-md group-hover:blur-lg transition-all"></div>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center relative z-10 border border-brand-orange/20 shadow-sm text-brand-orange group-hover:scale-110 transition-transform">
                <Play size={20} fill="currentColor" />
              </div>
              <div className="absolute -inset-4 pointer-events-none animate-[spin_10s_linear_infinite]">
                <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                    fill="transparent"
                  />
                  <text className="text-[8px] uppercase tracking-[2px] font-sans">
                    <textPath xlinkHref="#circlePath">Transforming intelligence into action •</textPath>
                  </text>
                </svg>
              </div>
            </div>
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">See the Heatmap</span>
          </button>
        </motion.div>

        <div className="mt-12">
          <div className="mb-4 flex flex-wrap justify-center gap-3 text-xs font-semibold text-slate-500">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Red hotspots
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Emergency zones
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              Active volunteers
            </span>
          </div>
          <IndiaCrisisMap />
        </div>
      </div>
    </section>
  );
};

const ImageGallery = () => {
  return (
    <section className="max-w-7xl mx-auto px-8 pb-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative group">
          <div className="aspect-[4/6] rounded-[100px] overflow-hidden shadow-2xl relative">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop"
              alt="Children smiling"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
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

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="relative pt-12">
          <div className="aspect-[4/6] rounded-[100px] overflow-hidden shadow-2xl relative outline outline-8 outline-white">
            <img
              src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop"
              alt="Girl studying"
              className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-110 transition-transform duration-700"
            />
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

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="relative group self-center">
          <div className="aspect-[4/6] rounded-[100px] overflow-hidden shadow-2xl relative">
            <img
              src="https://images.unsplash.com/photo-1617953141905-b27fb1f17d88?q=80&w=1000&auto=format&fit=crop"
              alt="Smiling child"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
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

        <div className="mb-10">
          <IndiaCrisisMap compact />
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
              <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function LandingPage({ onLoginClick, onSignupClick }: { onLoginClick: () => void; onSignupClick: () => void }) {
  const { showToast } = useToast();
  const [publicRequestType, setPublicRequestType] = useState<
    "DEMO_REQUEST" | "NGO_REGISTRATION" | "VOLUNTEER_INTEREST" | "DONOR_INTEREST" | null
  >(null);

  return (
    <main className="min-h-screen selection:bg-brand-green/20 overflow-x-hidden">
      <Navbar onLoginClick={onLoginClick} onSignupClick={onSignupClick} />
      <Hero onOpenRequest={(type) => setPublicRequestType(type)} />
      <ImageGallery />
      <IntelligenceGraph />

      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-green/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl tracking-tight font-bold mb-8">Ready to transform community intelligence?</h2>
          <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
            Join the 500+ NGOs already using Sevasetu to prioritize action and maximize their social footprint.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setPublicRequestType("DEMO_REQUEST")}
              className="bg-brand-green px-10 py-4 rounded-xl font-bold hover:brightness-110 transition-all"
            >
              Get a Demo
            </button>
            <button
              onClick={() => setPublicRequestType("NGO_REGISTRATION")}
              className="bg-white/10 px-10 py-4 rounded-xl font-bold backdrop-blur-sm hover:bg-white/20 transition-all"
            >
              Register NGO
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <p className="text-white text-xl font-bold tracking-tight">SevaSetu</p>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-green mt-2">Need se Seva Tak</p>
            <p className="text-sm text-slate-400 mt-4 leading-relaxed">
              India&apos;s intelligent social impact operating system connecting needs to verified action.
            </p>
          </div>
          <div>
            <p className="text-white font-semibold mb-3">Quick Links</p>
            <ul className="space-y-2 text-sm">
              <li>Home</li>
              <li>Platform</li>
              <li>Solutions</li>
              <li>Role-Based Login</li>
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold mb-3">Resources</p>
            <ul className="space-y-2 text-sm">
              <li>Case Studies</li>
              <li>Reports</li>
              <li>Privacy Policy</li>
              <li>Terms &amp; Governance</li>
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold mb-3">Support</p>
            <ul className="space-y-2 text-sm">
              <li>Support Center</li>
              <li>contact@sevasetu.org</li>
              <li>+91 90000 00000</li>
              <li>Follow: LinkedIn • X • YouTube</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} SevaSetu. All rights reserved.
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 w-full h-[15vh] bg-gradient-to-t from-brand-peach/30 to-transparent pointer-events-none -z-10"></div>

      {publicRequestType ? (
        <PublicRequestModal
          requestType={publicRequestType}
          onClose={() => setPublicRequestType(null)}
          onSuccess={(message) => showToast(message, "success")}
        />
      ) : null}
    </main>
  );
}

