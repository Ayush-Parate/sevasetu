import React, { Suspense } from "react";
import { motion } from "motion/react";
// Use lazy loading for the map component
const IndiaCrisisMap = React.lazy(() => import("./IndiaCrisisMap"));

export default function IntelligenceGraph() {
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
    <section className="py-24 bg-slate-50" id="heatmap">
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
          <Suspense fallback={
            <div className="w-full h-64 bg-slate-100 animate-pulse rounded-2xl border border-slate-200 flex items-center justify-center">
              <span className="text-sm font-semibold text-slate-400">Loading map...</span>
            </div>
          }>
            <IndiaCrisisMap compact />
          </Suspense>
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
}
