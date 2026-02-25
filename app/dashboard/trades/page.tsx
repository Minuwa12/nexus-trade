import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { TrendingUp, Activity, DollarSign } from "lucide-react";

export default async function DashboardOverview() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const trades = await prisma.trade.findMany({
    where: { userId: userId }, 
    orderBy: { createdAt: "desc" },
  });

  const totalExecutions = trades.length;
  const netPnl = trades.reduce((acc, trade) => acc + (trade.netPnl || 0), 0);
  const wins = trades.filter((t) => t.netPnl && t.netPnl > 0).length;
  const successRate = totalExecutions > 0 ? ((wins / totalExecutions) * 100).toFixed(1) : "0.0";

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* HEADER SECTION */}
      <div className="border-b border-red-950/30 pb-6">
        <h1 className="text-3xl font-black text-white tracking-widest uppercase">Overview</h1>
        <p className="text-gray-500 text-sm font-medium mt-1">Personalized performance metrics.</p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0a0a0a] border border-red-950/50 p-6 rounded-xl shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 left-0 w-1 h-full bg-red-900 opacity-50 group-hover:opacity-100 transition-opacity"></div>
           <p className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
             <Activity size={14} className="text-red-900" /> Total Executions
           </p>
           <h2 className="text-5xl font-black text-white mt-4">{totalExecutions}</h2>
        </div>

        <div className="bg-[#0a0a0a] border border-red-950/50 p-6 rounded-xl shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 left-0 w-1 h-full bg-red-900 opacity-50 group-hover:opacity-100 transition-opacity"></div>
           <p className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
             <TrendingUp size={14} className="text-red-900" /> Success Rate
           </p>
           <h2 className="text-5xl font-black text-white mt-4">{successRate}%</h2>
        </div>

        <div className="bg-[#0a0a0a] border border-red-950/50 p-6 rounded-xl shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 left-0 w-1 h-full bg-red-900 opacity-50 group-hover:opacity-100 transition-opacity"></div>
           <p className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
             <DollarSign size={14} className="text-red-900" /> Net PnL
           </p>
           <h2 className={`text-5xl font-black mt-4 ${netPnl >= 0 ? 'text-white' : 'text-red-600'}`}>
             {netPnl >= 0 ? '+' : '-'}${Math.abs(netPnl).toFixed(2)}
           </h2>
        </div>
      </div>

      {/* --- MARKET SENTIMENT ANALYSIS (REPLACED PLACEHOLDER) --- */}
      <div className="bg-[#0a0a0a] border border-red-950/40 rounded-xl p-8 min-h-[300px]">
         <div className="flex justify-between items-center mb-6">
           <h3 className="text-xs font-black text-red-900 uppercase tracking-[0.3em]">Market Sentiment Analysis</h3>
           <span className="text-[10px] text-gray-600 font-bold uppercase">System Live</span>
         </div>
         
         <div className="grid grid-cols-2 gap-4">
           <div className="border border-red-950/20 p-4 rounded-lg bg-red-950/5">
             <p className="text-[10px] text-gray-500 font-bold uppercase">Avg Win</p>
             <p className="text-xl font-black text-white mt-1">
               ${trades.filter(t => (t.netPnl || 0) > 0).length > 0 ? (trades.filter(t => (t.netPnl || 0) > 0).reduce((acc, t) => acc + (t.netPnl || 0), 0) / trades.filter(t => (t.netPnl || 0) > 0).length).toFixed(2) : "0.00"}
             </p>
           </div>
           <div className="border border-red-950/20 p-4 rounded-lg bg-red-950/5">
             <p className="text-[10px] text-gray-500 font-bold uppercase">Avg Loss</p>
             <p className="text-xl font-black text-red-600 mt-1">
               ${trades.filter(t => (t.netPnl || 0) < 0).length > 0 ? Math.abs(trades.filter(t => (t.netPnl || 0) < 0).reduce((acc, t) => acc + (t.netPnl || 0), 0) / trades.filter(t => (t.netPnl || 0) < 0).length).toFixed(2) : "0.00"}
             </p>
           </div>
         </div>
      </div>
    </div>
  );
}