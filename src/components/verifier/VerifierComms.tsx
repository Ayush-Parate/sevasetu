import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, 
  Send, 
  User, 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  PhoneCall, 
  Video, 
  MoreVertical, 
  Paperclip,
  Mic,
  Smile,
  LogOut,
  ArrowLeft,
  Users,
  Activity,
  History,
  Info,
  ShieldQuestion,
  BellRing,
  ShieldAlert
} from "lucide-react";
import { useToast } from "../Toast";

type CommTab = "CLARIFICATION" | "ESCALATION";

export default function VerifierComms() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<CommTab>("CLARIFICATION");
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [message, setMessage] = useState("");

  const chats = activeTab === "CLARIFICATION" ? [
    { id: 1, name: "NGO Admin (Global Relief)", lastMsg: "Clarification needed on Ward 4 proofs", time: "5m ago", type: "org" },
    { id: 2, name: "Field Coordinator (Slum Zone)", lastMsg: "Please verify location coordinates", time: "12m ago", type: "field" },
    { id: 3, name: "Volunteer Rahul", lastMsg: "Sent more report details", time: "1h ago", type: "field" },
  ] : [
    { id: 10, name: "Super Admin (Crisis Central)", lastMsg: "Fraud investigation Lvl 3 active", time: "1m ago", type: "system" },
    { id: 11, name: "NGO Compliance Board", lastMsg: "Emergency review requested for ID X0", time: "4m ago", type: "org" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="flex bg-slate-50 p-2 rounded-[2.5rem] border border-slate-100 shadow-inner w-fit">
        {["CLARIFICATION", "ESCALATION"].map(t => (
          <button
            key={t}
            onClick={() => { setActiveTab(t as CommTab); setSelectedChat(null); }}
            className={`px-10 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === t ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
          >
            {t} ROOM
          </button>
        ))}
      </div>

      <div className="h-[calc(100vh-22rem)] flex items-stretch gap-10">
        {/* Chat Sidebar */}
        <div className="w-full lg:w-[400px] flex flex-col bg-white border border-slate-100 rounded-[3.5rem] shadow-sm overflow-hidden shrink-0">
           <div className="p-10 border-b border-slate-50 space-y-6">
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">{activeTab} Center</h2>
              <div className="relative">
                 <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input type="text" placeholder="Search Encrypted Channels..." className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs italic focus:ring-2 focus:ring-brand-green/20" />
              </div>
           </div>
           <div className="flex-1 overflow-y-auto no-scrollbar py-6">
              {chats.map(chat => (
                <div 
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`p-8 flex items-center gap-6 cursor-pointer transition-all border-l-8 ${selectedChat?.id === chat.id ? 'bg-slate-50 border-brand-green' : 'border-transparent hover:bg-slate-50/50'}`}
                >
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg relative ${
                     chat.type === 'system' ? 'bg-rose-500 text-white' : 
                     chat.type === 'security' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400'
                   }`}>
                      {chat.type === 'field' ? <User size={24} /> : chat.type === 'system' ? <ShieldAlert size={24} /> : <Users size={24} />}
                   </div>
                   <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                         <span className="text-sm font-bold text-slate-900 truncate uppercase tracking-tight">{chat.name}</span>
                         <span className="text-[9px] font-black text-slate-400 whitespace-nowrap">{chat.time}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium italic truncate">{chat.lastMsg}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Messaging Area */}
        <div className="flex-1 flex flex-col bg-slate-950 rounded-[4rem] shadow-2xl relative overflow-hidden group border-4 border-slate-900">
           {selectedChat ? (
             <div className="flex-1 flex flex-col relative z-10">
                <div className="p-10 border-b border-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-brand-green border border-white/10 shadow-inner">
                         <MessageSquare size={28} />
                      </div>
                      <div>
                         <h3 className="text-2xl font-black italic text-white tracking-tighter uppercase">{selectedChat.name}</h3>
                         <span className="text-[10px] font-black text-brand-green uppercase tracking-widest opacity-60">Session: Active Security Tunnel</span>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      {activeTab === "CLARIFICATION" ? (
                        <>
                          <button onClick={() => showToast("Clarification request sent.", "success")} className="px-6 py-3 bg-brand-green text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:brightness-110">Send Clarification</button>
                          <button onClick={() => showToast("Urgent follow-up triggered.", "warning")} className="px-6 py-3 bg-amber-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest">Urgent Follow-up</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => showToast("Escalated to NGO Admin.", "warning")} className="px-6 py-3 bg-indigo-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest">Escalate to NGO Admin</button>
                          <button onClick={() => showToast("CRITICAL ESCALATION TO SUPER ADMIN.", "error")} className="px-6 py-3 bg-rose-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest">Escalate to Super Admin</button>
                        </>
                      )}
                   </div>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar p-10 space-y-8">
                   <div className="flex justify-start max-w-xl">
                      <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] rounded-tl-none">
                         <p className="text-slate-300 text-sm font-medium italic leading-relaxed font-serif">
                            {selectedChat.lastMsg}. Please coordinate immediate response.
                         </p>
                      </div>
                   </div>
                </div>

                <div className="p-10 border-t border-white/5">
                   <div className="flex items-center gap-6 bg-white/5 border border-white/10 p-4 rounded-[3rem] shadow-inner focus-within:border-brand-green transition-all">
                      <input 
                        type="text" 
                        placeholder="Transmit Encrypted Message..." 
                        className="flex-1 bg-transparent border-none text-white focus:ring-0 text-sm italic font-medium"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (setMessage(""), showToast("Message Transmitted.", "success"))}
                      />
                      <button 
                        onClick={() => { setMessage(""); showToast("Message Transmitted.", "success"); }}
                        className="w-14 h-14 bg-brand-green text-white rounded-[1.5rem] flex items-center justify-center shadow-lg"
                      >
                         <Send size={24} />
                      </button>
                   </div>
                </div>
             </div>
           ) : (
             <div className="flex-1 flex flex-col items-center justify-center p-20 text-center space-y-8">
                <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center text-slate-300 border border-white/10 shadow-2xl">
                   <ShieldQuestion size={48} />
                </div>
                <div className="space-y-4 max-w-sm">
                   <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">Security Comms Protocol</h3>
                   <p className="text-slate-500 text-sm font-medium italic leading-relaxed font-serif opacity-75">
                      Select a node from the {activeTab.toLowerCase()} desk to initiate secure coordination.
                   </p>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
