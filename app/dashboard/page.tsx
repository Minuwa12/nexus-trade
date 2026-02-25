export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import PerformanceChart from '@/components/ui/PerformanceChart';

export default async function DashboardOverview() {
  // 1. SECURE THE VAULT
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  // --- NEW: THE KILL SWITCH (DELETE FUNCTION) ---
  async function deleteTrade(formData: FormData) {
    'use server';
    const tradeId = formData.get('tradeId') as string;
    
    // Double-check security so no one can delete someone else's trade
    const { userId: currentUserId } = await auth();
    if (!currentUserId) return;

    await prisma.trade.delete({
      where: {
        id: tradeId,
        userId: currentUserId 
      }
    });

    // Refresh the dashboard instantly
    revalidatePath('/dashboard');
  }
  // ----------------------------------------------

  // 2. FETCH ONLY THIS USER'S TRADES
  const trades = await prisma.trade.findMany({
    where: { userId: userId },
    orderBy: { createdAt: 'asc' } 
  });

  // 3. MATH CALCULATIONS
  const totalTrades = trades.length;
  const netProfit = trades.reduce((acc, trade) => acc + (trade.netPnl || 0), 0);
  const winRate = totalTrades > 0
    ? (trades.filter(t => (t.netPnl || 0) > 0).length / totalTrades) * 100
    : 0;

  const recentTrades = [...trades].reverse().slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      
      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0a0a0a] border border-red-950/50 p-6 rounded-xl shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 left-0 w-1 h-full bg-red-900 opacity-50 group-hover:opacity-100 transition-opacity"></div>
           <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Executions</p>
           <h2 className="text-4xl font-black text-white mt-4">{totalTrades}</h2>
        </div>

        <div className="bg-[#0a0a0a] border border-red-950/50 p-6 rounded-xl shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 left-0 w-1 h-full bg-red-900 opacity-50 group-hover:opacity-100 transition-opacity"></div>
           <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Success Rate</p>
           <h2 className="text-4xl font-black text-[#ffaa00] mt-4">{winRate.toFixed(1)}%</h2>
        </div>

        <div className="bg-[#0a0a0a] border border-red-950/50 p-6 rounded-xl shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 left-0 w-1 h-full bg-red-900 opacity-50 group-hover:opacity-100 transition-opacity"></div>
           <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Net PnL</p>
           <h2 className={`text-4xl font-black mt-4 ${netProfit >= 0 ? 'text-white' : 'text-red-600'}`}>
             {netProfit >= 0 ? '+' : '-'}${Math.abs(netProfit).toFixed(2)}
           </h2>
        </div>
      </div>

      {/* CHART AREA */}
      <div className="bg-[#0a0a0a] border border-red-950/40 rounded-xl p-8 shadow-2xl relative">
        <div className="flex justify-between items-center mb-6">
           <h3 className="text-[10px] font-black text-red-900 uppercase tracking-[0.3em] flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-red-900 animate-pulse"></span>
             Biometric Sync Active
           </h3>
           <h3 className="text-3xl font-black text-white">${Math.abs(netProfit).toLocaleString()}</h3>
        </div>
        
        <div className="h-[300px] w-full mt-4">
          <PerformanceChart trades={trades} /> 
        </div>
      </div>

      {/* RECENT NEUTRALIZATIONS LIST WITH DELETE BUTTON */}
      <div className="bg-[#0a0a0a] border border-red-950/40 rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-red-950/10 px-6 py-4 border-b border-red-950/30 flex justify-between items-center">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Recent Neutralizations</h3>
          <span className="text-[8px] font-black text-red-900 uppercase tracking-widest">Live Sync Active</span>
        </div>
        
        <div className="p-2">
          {recentTrades.length === 0 ? (
            <div className="py-12 text-center text-gray-700 text-xs font-bold uppercase tracking-widest">
              [ Vault Secure : No Recent Activity ]
            </div>
          ) : (
            recentTrades.map((trade) => (
              <div key={trade.id} className="flex justify-between items-center p-4 hover:bg-red-950/10 transition-colors rounded-lg group">
                <span className="text-white font-black text-sm tracking-widest">{trade.ticker}</span>
                
                <div className="flex items-center gap-6">
                  <span className={`text-sm font-black font-mono ${trade.netPnl && trade.netPnl > 0 ? 'text-gray-300' : 'text-red-600'}`}>
                    {trade.netPnl && trade.netPnl > 0 ? '+' : ''}${trade.netPnl?.toFixed(2) || '0.00'}
                  </span>
                  
                  {/* 👇 THE NEW DELETE FORM & BUTTON 👇 */}
                  <form action={deleteTrade}>
                    <input type="hidden" name="tradeId" value={trade.id} />
                    <button type="submit" className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-500 transition-all font-black text-[10px] tracking-widest uppercase bg-red-950/30 hover:bg-red-900/50 px-3 py-1 rounded">
                      Nuke
                    </button>
                  </form>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}