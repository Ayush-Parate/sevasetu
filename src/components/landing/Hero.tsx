import React from "react";
import { motion } from "motion/react";
import { Play } from "lucide-react";

export default function Hero({ onOpenRequest }: { onOpenRequest: (type: "DONOR_INTEREST" | "DEMO_REQUEST") => void }) {
  const scrollToHeatmap = () => {
    document.getElementById("heatmap")?.scrollIntoView({ behavior: "smooth" });
  };

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
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8"
        >
          <button
            onClick={() => onOpenRequest("DONOR_INTEREST")}
            className="bg-brand-green text-white px-8 py-3.5 rounded-xl font-medium shadow-lg hover:shadow-brand-green/20 hover:-translate-y-0.5 transition-all w-full sm:w-auto"
            aria-label="Donate Now"
          >
            Donate Now
          </button>

          <button 
            className="group flex items-center gap-3 w-full sm:w-auto justify-center"
            onClick={scrollToHeatmap}
            aria-label="See the Heatmap"
          >
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
            <span className="text-[12px] font-bold tracking-widest text-slate-400 uppercase">See the Heatmap</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
