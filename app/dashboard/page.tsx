export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import PerformanceChart from '@/components/ui/PerformanceChart';



export default async function DashboardOverview() {
  // 1. Fetch all trades from your Supabase vault
  const trades = await prisma.trade.findMany({
    orderBy: { createdAt: 'asc' } // Oldest to newest for the chart
  });
  
  const totalTrades = trades.length;
  const netProfit = trades.reduce((acc, trade) => acc + (trade.netPnl || 0), 0);
  const winRate = totalTrades > 0 
    ? (trades.filter(t => (t.netPnl || 0) > 0).length / totalTrades) * 100 
    : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0a0a0a] border border-red-950/40 p-6 rounded-xl shadow-xl">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Total Executions</p>
          <p className="text-3xl font-black text-gray-100 font-mono">{totalTrades}</p>
        </div>
        <div className="bg-[#0a0a0a] border border-red-950/40 p-6 rounded-xl shadow-xl">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Success Rate</p>
          <p className="text-3xl font-black text-amber-500 font-mono">{winRate.toFixed(1)}%</p>
        </div>
        <div className="bg-[#0a0a0a] border border-red-950/40 p-6 rounded-xl shadow-xl">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Net PnL</p>
          <p className={`text-3xl font-black font-mono ${netProfit >= 0 ? 'text-gray-100' : 'text-red-600'}`}>
            ${netProfit.toFixed(2)}
          </p>
        </div>
      </div>

      {/* THE CHART: This is where the red line lives */}
      <div className="h-[400px] w-full">
        <PerformanceChart trades={trades} />
      </div>

      {/* Recent Activity Mini-List */}
      <div className="bg-[#0a0a0a] border border-red-950/40 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-red-950/40 flex justify-between items-center">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Recent Neutralizations</h3>
          <span className="text-[10px] text-red-900 font-bold uppercase animate-pulse">Live Sync Active</span>
        </div>
        <div className="p-2">
          {trades.slice().reverse().slice(0, 3).map((trade) => (
            <div key={trade.id} className="flex justify-between items-center p-4 hover:bg-red-950/10 transition rounded-lg">
              <span className="text-sm font-bold text-gray-200">{trade.ticker}</span>
              <span className={`text-xs font-mono ${trade.netPnl && trade.netPnl > 0 ? 'text-gray-400' : 'text-red-700'}`}>
                {trade.netPnl && trade.netPnl > 0 ? '+' : ''}${trade.netPnl?.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}