import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function ExecutionLogPage() {
  // SECURE THE VAULT
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  // Fetch trades, latest first
  const trades = await prisma.trade.findMany({
    where: { userId: userId },
    orderBy: { createdAt: 'desc' }
  });

  // 👇 THE COLOR-CODED MINDSET BADGE LOGIC 👇
  const getMindsetLabel = (quality: string | null) => {
    if (!quality) return <span className="text-gray-600 border border-gray-800 px-2 py-1 rounded text-[8px]">UNLOGGED</span>;
    if (quality === 'A+ Setup') return <span className="text-green-500 border border-green-900/50 bg-green-950/20 px-2 py-1 rounded text-[8px] tracking-widest">A+ SETUP</span>;
    if (quality === 'B-Grade') return <span className="text-blue-400 border border-blue-900/50 bg-blue-950/20 px-2 py-1 rounded text-[8px] tracking-widest">B-GRADE</span>;
    // FOMO, Revenge, Boredom will be red
    return <span className="text-red-500 border border-red-900/50 bg-red-950/20 px-2 py-1 rounded text-[8px] tracking-widest">{quality.toUpperCase()}</span>;
  };

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-700 pb-20">
      
      <div className="mb-8">
        <h2 className="text-3xl font-black text-white tracking-widest uppercase drop-shadow-md">
          Execution Log
        </h2>
        <p className="text-gray-500 mt-2 text-sm tracking-wider">
          Comprehensive ledger of all neutralized targets and market psychology.
        </p>
      </div>

      <div className="bg-[#0a0a0a] border border-red-950/40 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-red-950/10 border-b border-red-950/30">
                <th className="py-4 px-6 text-[10px] font-black text-red-900 uppercase tracking-[0.2em]">Date</th>
                <th className="py-4 px-6 text-[10px] font-black text-red-900 uppercase tracking-[0.2em]">Asset</th>
                <th className="py-4 px-6 text-[10px] font-black text-red-900 uppercase tracking-[0.2em]">Side</th>
                
                {/* NEW PSYCHOLOGY COLUMN HEADER */}
                <th className="py-4 px-6 text-[10px] font-black text-red-900 uppercase tracking-[0.2em]">Psychology</th>
                
                <th className="py-4 px-6 text-[10px] font-black text-red-900 uppercase tracking-[0.2em]">Entry</th>
                <th className="py-4 px-6 text-[10px] font-black text-red-900 uppercase tracking-[0.2em]">R:R Ratio</th>
                <th className="py-4 px-6 text-[10px] font-black text-red-900 uppercase tracking-[0.2em]">Net PNL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-900/50">
              {trades.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-700 text-xs font-bold uppercase tracking-widest">
                    [ Vault Secure : No Executions Found ]
                  </td>
                </tr>
              ) : (
                trades.map((trade) => (
                  <tr key={trade.id} className="hover:bg-red-950/10 transition-colors group">
                    <td className="py-4 px-6 text-xs font-bold text-gray-500">
                      {new Date(trade.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-sm font-black text-white tracking-widest">
                      {trade.ticker}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`text-[10px] font-black tracking-widest px-2 py-1 rounded ${trade.side === 'LONG' ? 'text-green-500 bg-green-950/20' : 'text-red-500 bg-red-950/20'}`}>
                        {trade.side}
                      </span>
                    </td>
                    
                    {/* NEW PSYCHOLOGY DATA CELL */}
                    <td className="py-4 px-6 font-black">
                      {getMindsetLabel(trade.setupQuality)}
                    </td>

                    <td className="py-4 px-6 text-xs font-mono text-gray-400">
                      {trade.entryPrice}
                    </td>
                    <td className="py-4 px-6 text-xs font-bold text-gray-400">
                      {trade.riskReward ? `1:${trade.riskReward.toFixed(1)}` : 'N/A'}
                    </td>
                    <td className={`py-4 px-6 text-sm font-black font-mono ${trade.netPnl && trade.netPnl > 0 ? 'text-gray-300' : 'text-red-600'}`}>
                      {trade.netPnl && trade.netPnl > 0 ? '+' : ''}${trade.netPnl?.toFixed(2) || '0.00'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}