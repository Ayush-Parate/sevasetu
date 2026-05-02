import React from "react";
import { motion } from "motion/react";
import { HandHeart, CheckCircle2, Gift } from "lucide-react";

export default function ImageGallery() {
  return (
    <section className="max-w-7xl mx-auto px-8 pb-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative group">
          <div className="aspect-[4/6] rounded-[100px] overflow-hidden shadow-2xl relative">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop"
              alt="Children smiling"
              loading="lazy"
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
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt={`Avatar ${i}`} loading="lazy" />
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
              loading="lazy"
              className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute bottom-6 inset-x-6 bg-brand-green/90 backdrop-blur-sm p-4 rounded-3xl text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider">AI Need Prioritization</span>
                <CheckCircle2 size={14} className="text-brand-orange" />
              </div>
              <p className="text-[11px] leading-relaxed opacity-80">
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
              loading="lazy"
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
                    <span className="text-[10px] font-bold text-slate-400">89%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
