import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { deleteTrade } from '@/app/actions/tradeActions';

export default async function TradeLogPage() {
  // Reaches into Supabase to get your trades
  const trades = await prisma.trade.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-100 uppercase tracking-widest">Execution Log</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Securely synced with Supabase Vault.</p>
        </div>
        
        <Link href="/dashboard/trades/new" className="bg-red-900 hover:bg-red-800 text-white px-6 py-2 rounded-lg text-sm font-bold tracking-wider transition border border-red-700/50 shadow-[0_0_15px_rgba(153,27,27,0.4)]">
          + NEW ENTRY
        </Link>
      </div>

      {/* The Data Table */}
      <div className="bg-[#0a0a0a] border border-red-950/60 rounded-xl overflow-hidden shadow-xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-900 to-transparent"></div>
        
        <table className="w-full text-left border-collapse z-10 relative">
          <thead>
            <tr className="bg-[#050505] border-b border-red-950/50 text-xs uppercase tracking-widest text-gray-500 font-bold">
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Asset</th>
              <th className="px-6 py-4">Side</th>
              <th className="px-6 py-4">Entry / Exit</th>
              <th className="px-6 py-4 text-right">Net PnL</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-red-950/30">
            {trades.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center text-red-700/50 font-mono text-sm tracking-widest uppercase font-bold animate-pulse">
                  [ Vault Empty : No Executions Found ]
                </td>
              </tr>
            ) : (
              trades.map((trade) => (
                <tr key={trade.id} className="hover:bg-red-950/20 transition group">
                  <td className="px-6 py-4 text-sm text-gray-400 font-mono">{trade.createdAt.toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm font-black text-gray-200">{trade.ticker}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-bold uppercase tracking-wider rounded ${trade.side === 'LONG' ? 'bg-gray-800 text-gray-300 border border-gray-600' : 'bg-red-950/50 text-red-500 border border-red-900/50'}`}>
                      {trade.side}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400 font-mono">
                    ${trade.entryPrice} <span className="text-gray-600">→</span> ${trade.exitPrice || 'OPEN'}
                  </td>
                  <td className={`px-6 py-4 text-sm font-black text-right font-mono ${
                    trade.netPnl && trade.netPnl > 0 ? 'text-gray-300' : 'text-red-500'
                  }`}>
                    {trade.netPnl && trade.netPnl > 0 ? '+' : ''}{trade.netPnl ? `$${Math.abs(trade.netPnl).toFixed(2)}` : '$0.00'}
                  </td>
                  
                  {/* DELETE ICON */}
                  <td className="px-4 py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                    <form action={deleteTrade}>
                      <input type="hidden" name="id" value={trade.id} />
                      <button type="submit" className="text-red-900 hover:text-red-500 transition-colors p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}