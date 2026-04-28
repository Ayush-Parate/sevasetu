import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, 
  Send, 
  PhoneCall, 
  AlertTriangle, 
  User, 
  ShieldCheck, 
  Zap, 
  MoreVertical,
  Paperclip,
  Smile,
  Users,
  Mic,
  MoreHorizontal
} from "lucide-react";
import { useToast } from "../Toast";

export default function CommunicationCenter() {
  const { showToast } = useToast();
  const [activeChannel, setActiveChannel] = useState("ngo_admin");

  const channels = [
    { id: "ngo_admin", name: "NGO Admin Control", type: "Direct", icon: ShieldCheck, status: "Online" },
    { id: "field_coord", name: "Field Coordinator", type: "Mission Lead", icon: Zap, status: "Offline" },
    { id: "v_group", name: "Volunteer S-Squad 4", type: "Team Group", icon: Users, status: "12 Online" },
  ];

  return (
    <div className="flex h-[calc(100vh-12rem)] bg-white border border-slate-100 rounded-[4rem] shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-700">
      {/* Sidebar Channels */}
      <div className="w-[350px] border-r border-slate-50 flex flex-col bg-slate-50/50">
         <div className="p-10">
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Secure Comms</h2>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1 italic opacity-75">Intelligence Grid v4.2</div>
         </div>
         
         <div className="flex-1 px-6 space-y-4 overflow-y-auto no-scrollbar">
            {channels.map(channel => (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id)}
                className={`w-full p-6 rounded-[2.5rem] flex items-center gap-5 transition-all text-left group ${activeChannel === channel.id ? 'bg-white shadow-2xl shadow-slate-200/50 scale-[1.02] border border-slate-100' : 'hover:bg-white/50'}`}
              >
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform ${activeChannel === channel.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    <channel.icon size={26} />
                 </div>
                 <div className="flex-1 overflow-hidden">
                    <div className="flex justify-between items-center mb-1">
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{channel.type}</span>
                       <div className={`w-2 h-2 rounded-full ${channel.status === 'Online' || channel.status.includes('Online') ? 'bg-emerald-400 animate-pulse' : 'bg-slate-300'}`}></div>
                    </div>
                    <div className="font-bold text-slate-800 truncate">{channel.name}</div>
                    <div className="text-[10px] text-slate-400 italic truncate font-medium">Click to synchronize message stream...</div>
                 </div>
              </button>
            ))}

            <div className="pt-10">
               <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-4 mb-6">Crisis Support Line</div>
               <button 
                 onClick={() => showToast("Connecting to Emergency Coordinator...", "warning")}
                 className="w-full p-8 bg-rose-500 text-white rounded-[2.5rem] shadow-2xl shadow-rose-200 flex flex-col items-center gap-4 group transition-all hover:bg-rose-600 active:scale-95"
               >
                  <PhoneCall size={32} className="group-hover:rotate-12 transition-transform" />
                  <div className="text-center">
                     <div className="font-black uppercase tracking-widest text-[11px] mb-1">Call Emergency Lead</div>
                     <div className="text-[10px] opacity-75 italic font-medium">Report Ground Zero Crisis</div>
                  </div>
               </button>
            </div>
         </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
         {/* Top Bar */}
         <div className="px-10 py-8 border-b border-slate-50 flex items-center justify-between bg-white/80 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center gap-6">
               <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg">
                  {activeChannel === 'ngo_admin' ? <ShieldCheck size={28} /> : activeChannel === 'field_coord' ? <Zap size={28} /> : <Users size={28} />}
               </div>
               <div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">{channels.find(c => c.id === activeChannel)?.name}</h3>
                  <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                     Encrypted Node Connection
                  </div>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-slate-600 transition-all shadow-inner"><Mic size={20} /></button>
               <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-slate-600 transition-all shadow-inner"><MoreHorizontal size={20} /></button>
            </div>
         </div>

         {/* Messages */}
         <div className="flex-1 p-10 overflow-y-auto no-scrollbar space-y-10">
            <div className="flex flex-col gap-8">
               {/* Incoming */}
               <div className="flex items-start gap-4 max-w-2xl">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 shrink-0 shadow-inner">
                     <User size={20} />
                  </div>
                  <div className="space-y-2">
                     <div className="bg-slate-50 border border-slate-100 p-6 rounded-tr-3xl rounded-br-3xl rounded-bl-3xl shadow-sm">
                        <p className="text-sm text-slate-600 font-medium italic leading-relaxed">
                           "Arjun, the blood drive in Sector 4 is seeing high traffic. We need you to verify the cold-chain storage status at City Hospital by 2 PM. Please report back once you reach the node."
                        </p>
                     </div>
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">NGO Admin • 09:42 AM</span>
                  </div>
               </div>

               {/* Outgoing */}
               <div className="flex items-start gap-4 max-w-2xl ml-auto flex-row-reverse">
                  <div className="w-10 h-10 bg-brand-green/20 text-brand-green rounded-xl flex items-center justify-center shrink-0 border border-brand-green/10 shadow-inner">
                     <User size={20} />
                  </div>
                  <div className="space-y-2 text-right">
                     <div className="bg-brand-green text-white p-6 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl shadow-2xl shadow-brand-green/20 border border-brand-green/30">
                        <p className="text-sm font-bold leading-relaxed italic">
                           "Understood. Moving to City Hospital node now. Will provide live video verification of the refrigeration units on arrival. Expect update in 20 mins."
                        </p>
                     </div>
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">You • 09:45 AM</span>
                  </div>
               </div>

               {/* System Alert */}
               <div className="flex items-center gap-6 px-10 py-6 bg-rose-50 border border-rose-100 rounded-[2rem] text-rose-500 overflow-hidden relative group">
                  <div className="absolute right-0 top-0 p-8 opacity-[0.05] rotate-12 group-hover:scale-150 transition-transform">
                     <AlertTriangle size={80} />
                  </div>
                  <AlertTriangle size={24} className="shrink-0 animate-bounce" />
                  <div>
                     <div className="text-[10px] font-black uppercase tracking-widest">Urgent System Alert</div>
                     <p className="text-xs font-bold italic opacity-80 mt-1">"Heavy rainfall predicted in Sector 2. All field scouts advised to maintain safety protocols."</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Message Input */}
         <div className="p-10 border-t border-slate-50 bg-slate-50/50">
            <div className="flex items-center gap-6 bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 relative">
               <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:text-slate-600 transition-all shadow-inner hover:rotate-12"><Paperclip size={22} /></button>
               <input 
                 type="text" 
                 placeholder="Type your field report or response..." 
                 className="flex-1 bg-transparent border-none text-sm font-medium focus:outline-none placeholder:text-slate-300 placeholder:italic"
               />
               <div className="flex items-center gap-4">
                  <button className="p-4 text-slate-300 hover:text-brand-orange transition-all"><Smile size={24} /></button>
                  <button 
                    onClick={() => showToast("Field update transmitted secure.", "success")}
                    className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-brand-green transition-all shadow-xl active:scale-90"
                  >
                     <Send size={24} />
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
