import React from "react";
import { motion } from "motion/react";
import { 
  CreditCard, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  Search, 
  FileText, 
  Download,
  AlertCircle,
  Clock,
  History,
  Lock
} from "lucide-react";
import { useAsync } from "../../lib/useAsync";
import { getDonorLedger } from "../../lib/api";

export default function FinancialLedger() {
  const { data: transactions = [], loading } = useAsync(getDonorLedger);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Wallet / Balance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden group">
           <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-brand-green/20 rounded-full blur-3xl group-hover:scale-110 transition-transform"></div>
           <div className="relative z-10">
              <div className="flex justify-between items-start mb-12">
                 <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                    <CreditCard size={24} className="text-brand-green" />
                 </div>
                 <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Available Impact Funds</span>
                    <h2 className="text-3xl font-black tracking-tight mt-1">$450,224.50</h2>
                 </div>
              </div>
              
              <div className="space-y-4">
                 <div className="flex justify-between text-xs">
                    <span className="text-white/50 font-medium">Monthly Burn Rate</span>
                    <span className="font-bold whitespace-nowrap">$42,500 / mo</span>
                 </div>
                 <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-green w-1/4 rounded-full"></div>
                 </div>
                 <div className="flex justify-between text-[10px] text-white/30 font-bold uppercase tracking-widest">
                    <span>Low Utilisation</span>
                    <span>Strategic Reserve</span>
                 </div>
              </div>

              <div className="mt-12 flex gap-3">
                 <button className="flex-1 py-3 bg-brand-green text-white rounded-xl text-xs font-bold hover:brightness-110 active:scale-[0.98] transition-all">Add Funds</button>
                 <button className="flex-1 py-3 bg-white/10 text-white rounded-xl text-xs font-bold hover:bg-white/20 transition-all border border-white/10">Manage Allocation</button>
              </div>
           </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-4 mb-6">
                 <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                    <ArrowDownCircle size={24} />
                 </div>
                 <div>
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Quarterly Infusion</h3>
                    <p className="text-2xl font-black text-slate-900">$150,000.00</p>
                 </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium bg-slate-50 px-4 py-2 rounded-xl">
                 <Clock size={14} />
                 Next scheduled donation on May 15, 2026
              </div>
           </div>

           <div className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-4 mb-6">
                 <div className="p-3 bg-brand-peach text-brand-orange rounded-2xl">
                    <ArrowUpCircle size={24} />
                 </div>
                 <div>
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Field Outflow</h3>
                    <p className="text-2xl font-black text-slate-900">$84,230.12</p>
                 </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-brand-green font-bold bg-brand-green/5 px-4 py-2 rounded-xl">
                 <AlertCircle size={14} />
                 94.2% funds mapped directly to verified field proof.
              </div>
           </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white border border-slate-100 rounded-[32px] shadow-sm overflow-hidden">
         <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
               <h2 className="text-xl font-bold tracking-tight text-slate-900 leading-none">Transparency Ledger</h2>
               <p className="text-sm text-slate-500 mt-2">Every rupee tracked from source to impact site.</p>
            </div>
            
            <div className="flex items-center gap-3">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search ledger..." 
                    className="pl-9 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-xs font-medium focus:ring-2 focus:ring-brand-green/20 w-full md:w-64"
                  />
               </div>
               <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:text-brand-green transition-colors">
                  <History size={18} />
               </button>
            </div>
         </div>

         {loading ? (
            <div className="flex items-center justify-center py-20 text-slate-400">Loading ledger data...</div>
         ) : (
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-slate-50/50">
                  <tr>
                     <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Transaction ID</th>
                     <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Entity / Purpose</th>
                     <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                     <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                     <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Amount</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {transactions.map((tx) => (
                     <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                        <td className="px-8 py-6">
                           <span className="text-xs font-mono font-bold text-slate-400">{tx.id}</span>
                           <p className="text-[10px] text-slate-400 mt-0.5">{tx.date}</p>
                        </td>
                        <td className="px-8 py-6">
                           <p className="text-sm font-bold text-slate-800">{tx.entity}</p>
                           <p className="text-xs text-slate-500 mt-0.5">{tx.purpose}</p>
                        </td>
                        <td className="px-8 py-6">
                           <span className="px-3 py-1 bg-slate-100 text-[10px] font-bold rounded-lg text-slate-600 uppercase tracking-wider">{tx.type}</span>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full ${tx.status === 'Completed' || tx.status === 'Verified' ? 'bg-brand-green' : 'bg-brand-orange'}`}></div>
                              <span className="text-xs font-bold text-slate-700">{tx.status}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <p className={`text-sm font-black ${tx.amount.startsWith('+') ? 'text-brand-green' : 'text-slate-900'}`}>{tx.amount}</p>
                           <button className="text-[10px] font-bold text-brand-green uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity mt-1">View Receipt</button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         )}

         <div className="p-8 bg-slate-50/50 flex justify-center">
            <button className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest flex items-center gap-2">
               <Download size={14} /> Download Annual Financial Statement (PDF)
            </button>
         </div>
      </div>
    </div>
  );
}
