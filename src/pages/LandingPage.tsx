import React, { useState } from "react";
import PublicRequestModal from "../components/PublicRequestModal";
import { useToast } from "../components/Toast";

import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import ImageGallery from "../components/landing/ImageGallery";
import IntelligenceGraph from "../components/landing/IntelligenceGraph";
import Footer from "../components/landing/Footer";

export default function LandingPage({
  onLoginClick,
  onSignupClick
}: {
  onLoginClick: () => void;
  onSignupClick: () => void;
}) {
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
              className="bg-brand-green px-10 py-4 rounded-xl font-bold hover:brightness-110 transition-all focus:outline-none focus:ring-4 focus:ring-brand-green/50"
              aria-label="Get a Demo"
            >
              Get a Demo
            </button>
            <button
              onClick={() => setPublicRequestType("NGO_REGISTRATION")}
              className="bg-white/10 px-10 py-4 rounded-xl font-bold backdrop-blur-sm hover:bg-white/20 transition-all focus:outline-none focus:ring-4 focus:ring-white/50"
              aria-label="Register NGO"
            >
              Register NGO
            </button>
          </div>
        </div>
      </section>

      <Footer />

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
