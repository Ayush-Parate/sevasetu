import React from "react";
import { motion } from "motion/react";
import { 
  MessageSquare, 
  Video, 
  Send, 
  FileText, 
  Search,
  MoreVertical,
  Plus,
  Phone
} from "lucide-react";

const chats = [
  { id: 1, name: "Asha Foundation Team", type: "NGO", lastMsg: "The distribution logs are updated.", time: "10:24 AM", unread: 2, online: true },
  { id: 2, name: "Crisis Response: Floods", type: "Crisis Group", lastMsg: "Emergency funding received.", time: "9:15 AM", unread: 0, online: true },
  { id: 3, name: "Platform Governance", type: "Support", lastMsg: "Your audit report is ready.", time: "Yesterday", unread: 0, online: false },
];

export default function CommunicationCenter() {
  return (
    <div className="h-[calc(100vh-200px)] flex bg-white border border-slate-100 rounded-[32px] shadow-sm overflow-hidden animate-in fade-in duration-700">
      {/* Sidebar - Contacts */}
      <div className="w-80 border-r border-slate-50 flex flex-col shrink-0 overflow-hidden">
         <div className="p-6 border-b border-slate-50">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Messages</h2>
            <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
               <input 
                 type="text" 
                 placeholder="Search conversations..." 
                 className="w-full pl-9 pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs font-medium focus:ring-2 focus:ring-brand-green/20"
               />
            </div>
         </div>
         
         <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1 custom-scrollbar">
            {chats.map((chat) => (
              <button key={chat.id} className="w-full p-4 flex items-center gap-4 rounded-[20px] hover:bg-slate-50 transition-all text-left relative group">
                 <div className="relative shrink-0">
                    <img src={`https://ui-avatars.com/api/?name=${chat.name}&background=random`} alt={chat.name} className="w-12 h-12 rounded-2xl" />
                    {chat.online && <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-brand-green border-4 border-white rounded-full"></div>}
                 </div>
                 <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-0.5">
                       <h4 className="text-sm font-bold text-slate-800 truncate">{chat.name}</h4>
                       <span className="text-[9px] font-bold text-slate-400 whitespace-nowrap">{chat.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{chat.lastMsg}</p>
                 </div>
                 {chat.unread > 0 && (
                   <div className="bg-brand-green text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                      {chat.unread}
                   </div>
                 )}
              </button>
            ))}
         </div>

         <div className="p-4 bg-slate-50/50">
            <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-md hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
               <Plus size={16} /> Start New Thread
            </button>
         </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
         {/* Chat Header */}
         <div className="px-8 py-4 border-b border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <img src={`https://ui-avatars.com/api/?name=Asha+Foundation&background=random`} alt="NGO" className="w-10 h-10 rounded-xl" />
               <div>
                  <h3 className="text-sm font-bold text-slate-900">Asha Foundation Team</h3>
                  <p className="text-[10px] text-brand-green font-bold uppercase tracking-widest">Active Collaboration</p>
               </div>
            </div>
            <div className="flex items-center gap-2">
               <button className="p-2.5 text-slate-400 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all">
                  <Phone size={18} />
               </button>
               <button className="p-2.5 text-slate-400 hover:bg-slate-50 hover:text-brand-green rounded-xl transition-all">
                  <Video size={18} />
               </button>
               <button className="p-2.5 text-slate-400 hover:bg-slate-50 rounded-xl transition-all">
                  <MoreVertical size={18} />
               </button>
            </div>
         </div>

         {/* Messages Placeholder */}
         <div className="flex-1 overflow-y-auto p-8 space-y-6 flex flex-col justify-end bg-slate-50/30">
            <div className="self-center py-2 px-4 bg-white border border-slate-100 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
               Audit Logs Shared on April 24
            </div>
            
            <div className="max-w-[70%] self-start flex gap-3">
               <img src={`https://ui-avatars.com/api/?name=Asha+Foundation&background=random`} alt="NGO" className="w-8 h-8 rounded-lg shrink-0" />
               <div className="p-4 bg-white border border-slate-100 rounded-2xl rounded-tl-none shadow-sm">
                  <p className="text-sm text-slate-700 leading-relaxed">
                     Hello Team, we have just uploaded the beneficiary list for the latest distribution in Kolkata. Please review at your convenience.
                  </p>
                  <span className="text-[9px] font-bold text-slate-400 mt-2 block uppercase tracking-widest">10:24 AM</span>
               </div>
            </div>

            <div className="max-w-[70%] self-end">
               <div className="p-4 bg-brand-green text-white rounded-2xl rounded-tr-none shadow-lg shadow-brand-green/10">
                  <p className="text-sm leading-relaxed">
                     Thanks for the update. Received the logs. We are initiating the funding renewal process now.
                  </p>
                  <span className="text-[9px] font-bold text-white/50 mt-2 block uppercase tracking-widest text-right">10:45 AM</span>
               </div>
            </div>

            <div className="max-w-[70%] self-start flex gap-3">
               <img src={`https://ui-avatars.com/api/?name=Asha+Foundation&background=random`} alt="NGO" className="w-8 h-8 rounded-lg shrink-0" />
               <div className="p-3 bg-white border border-slate-100 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-3">
                  <div className="p-2 bg-slate-50 rounded-lg text-brand-green">
                     <FileText size={16} />
                  </div>
                  <div>
                     <p className="text-[11px] font-bold text-slate-800">impact_report_q1.pdf</p>
                     <p className="text-[9px] text-slate-400 font-bold uppercase">4.2 MB • PDF</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Input Area */}
         <div className="p-6 bg-white border-t border-slate-50">
            <div className="flex items-center gap-4">
               <button className="p-3 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl transition-all">
                  <Plus size={20} />
               </button>
               <div className="flex-1 relative">
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    className="w-full px-6 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-brand-green/20"
                  />
               </div>
               <button className="p-3.5 bg-brand-green text-white rounded-2xl shadow-lg shadow-brand-green/20 hover:brightness-110 active:scale-95 transition-all outline-none">
                  <Send size={20} />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
