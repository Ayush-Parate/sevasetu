import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Bell, 
  MapPin, 
  Shield, 
  Calendar, 
  Zap, 
  User, 
  ChevronRight, 
  Info, 
  EyeOff, 
  Lock, 
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Plane
} from "lucide-react";
import { useToast } from "../Toast";

export default function SettingsCenter() {
  const { showToast } = useToast();
  const [vacationMode, setVacationMode] = useState(false);

  const SettingRow = ({ icon: Icon, title, desc, active, onToggle, danger }: any) => (
    <div className={`p-10 rounded-[3rem] border border-slate-100 flex items-center justify-between transition-all group ${active ? 'bg-white shadow-xl' : 'bg-slate-50 opacity-100'}`}>
      <div className="flex items-center gap-8">
        <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform ${danger ? 'bg-rose-50 text-rose-500' : 'bg-slate-200 text-slate-500 group-hover:bg-slate-900 group-hover:text-white'}`}>
           <Icon size={28} />
        </div>
        <div>
          <h4 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h4>
          <p className="text-[10px] text-slate-400 font-medium italic uppercase tracking-widest mt-1">{desc}</p>
        </div>
      </div>
      <button 
        onClick={onToggle}
        className={`w-14 h-8 rounded-full relative transition-all ${active ? 'bg-brand-green' : 'bg-slate-300'}`}
      >
        <motion.div 
          animate={{ x: active ? 26 : 4 }}
          className="w-6 h-6 bg-white rounded-full absolute top-1 shadow-md"
        />
      </button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm gap-10">
         <div className="space-y-1">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Preference Architecture</h2>
            <p className="text-slate-500 text-sm font-medium italic opacity-75">Fine-tune how the SevaSetu OS dispatches missions and tracks your field presence.</p>
         </div>
         <button onClick={() => showToast("All preferences strictly synchronized.", "success")} className="px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-brand-green transition-all shadow-slate-900/10 active:scale-95">
            Save Global Preferences
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-10 mb-6">Dispatch Intelligence</h3>
            <SettingRow 
               icon={Bell} 
               title="Mission Notifications" 
               desc="Push alerts for high-priority local tasks"
               active={true}
               onToggle={() => {}}
            />
            <SettingRow 
               icon={MapPin} 
               title="Location Harvesting" 
               desc="Sync live proximity for routing logic"
               active={true}
               onToggle={() => {}}
            />
            <SettingRow 
               icon={Zap} 
               title="Emergency Alerts" 
               desc="Critical sound alerts even in DND mode"
               active={true}
               onToggle={() => {}}
            />
         </div>

         <div className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-10 mb-6">Security & Privacy</h3>
            <SettingRow 
               icon={EyeOff} 
               title="Ghost Navigation" 
               desc="Hide profile from global search network"
               active={false}
               onToggle={() => {}}
            />
            <SettingRow 
               icon={Shield} 
               title="Public Trust Audit" 
               desc="Allow NGOs to view full verification logs"
               active={true}
               onToggle={() => {}}
            />
            <SettingRow 
               icon={Smartphone} 
               title="Biometric Auth" 
               desc="Require face-check for field reports"
               active={true}
               onToggle={() => {}}
            />
         </div>
      </div>

      <div className={`p-12 border-2 rounded-[4.5rem] transition-all relative overflow-hidden group ${vacationMode ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-100 grayscale hover:grayscale-0'}`}>
         {vacationMode && (
            <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 group-hover:scale-[2] transition-transform duration-1000">
               <Plane size={150} className="text-amber-500" />
            </div>
         )}
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl space-y-6 text-center md:text-left">
               <div className="flex items-center gap-4 justify-center md:justify-start">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${vacationMode ? 'bg-amber-500 text-white shadow-amber-200' : 'bg-slate-200 text-slate-400'}`}>
                     <Plane size={24} />
                  </div>
                  <h3 className={`text-2xl font-black italic uppercase tracking-tighter ${vacationMode ? 'text-amber-900' : 'text-slate-400'}`}>Volunteer Vacation Mode</h3>
               </div>
               <p className={`text-sm font-medium italic leading-relaxed font-serif ${vacationMode ? 'text-amber-700 opacity-80' : 'text-slate-400'}`}>
                  "Activating Vacation Mode pauses all automated dispatch logic and hides you from emergency responder heatmaps until deactivated. This helps us optimize resource allocation in your absence."
               </p>
            </div>
            <button 
              onClick={() => {
                setVacationMode(!vacationMode);
                showToast(`Vacation Mode ${!vacationMode ? 'Activated' : 'Suspended'}`, "info");
              }}
              className={`px-12 py-6 rounded-[2rem] font-black uppercase tracking-widest text-[11px] shadow-2xl transition-all transform active:scale-95 ${vacationMode ? 'bg-white text-amber-600 border border-amber-200 shadow-amber-100' : 'bg-slate-900 text-white shadow-slate-200 hover:bg-brand-green'}`}
            >
               {vacationMode ? 'I am Back Online' : 'Initiate Vacation Pause'}
            </button>
         </div>
      </div>

      <div className="bg-rose-50 border border-rose-100 p-10 rounded-[3rem] flex items-center gap-8 group hover:bg-white transition-all shadow-inner hover:shadow-xl">
         <div className="w-16 h-16 bg-rose-500 text-white rounded-2xl flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 transition-transform">
            <AlertTriangle size={28} />
         </div>
         <div className="flex-1">
            <h4 className="text-lg font-black text-rose-900 tracking-tight italic">Dangerous Action Zone</h4>
            <p className="text-xs font-medium text-rose-500 opacity-80 italic">"Deleting your volunteer identity is irreversible and wipes all trust scores, badges, and verified mission history from the grid."</p>
         </div>
         <button className="px-8 py-4 bg-white border border-rose-200 text-rose-500 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-rose-500 hover:text-white transition-all active:scale-95">
            Purge Identity
         </button>
      </div>
    </div>
  );
}
