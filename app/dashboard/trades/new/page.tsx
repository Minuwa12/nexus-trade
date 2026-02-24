import { addTrade } from '@/app/actions/tradeActions';
import Link from 'next/link';

export default function NewTradePage() {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-200 tracking-widest uppercase">Inject Trade Data</h1>
        <p className="text-gray-500 font-medium text-sm tracking-wide mt-2">Manual entry terminal for the Supabase Vault.</p>
      </div>

      <div className="bg-[#0a0a0a] border border-red-950/60 rounded-xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-red-700"></div>
        
        {/* We connect the form directly to the Server Action we just built */}
        <form action={addTrade} className="space-y-6 relative z-10">
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Asset Ticker</label>
              <input type="text" name="ticker" required placeholder="e.g. NQ, AAPL, BTC" className="w-full bg-[#050505] border border-red-950/50 rounded p-3 text-gray-200 focus:border-red-700 focus:outline-none focus:ring-1 focus:ring-red-700 transition uppercase" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Position Side</label>
              <select name="side" required className="w-full bg-[#050505] border border-red-950/50 rounded p-3 text-gray-200 focus:border-red-700 focus:outline-none focus:ring-1 focus:ring-red-700 transition">
                <option value="LONG">LONG</option>
                <option value="SHORT">SHORT</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Entry Price</label>
              <input type="number" step="0.01" name="entryPrice" required placeholder="0.00" className="w-full bg-[#050505] border border-red-950/50 rounded p-3 text-gray-200 focus:border-red-700 focus:outline-none focus:ring-1 focus:ring-red-700 transition font-mono" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Exit Price</label>
              <input type="number" step="0.01" name="exitPrice" placeholder="0.00 (Optional)" className="w-full bg-[#050505] border border-red-950/50 rounded p-3 text-gray-200 focus:border-red-700 focus:outline-none focus:ring-1 focus:ring-red-700 transition font-mono" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Net PnL ($)</label>
            <input type="number" step="0.01" name="netPnl" placeholder="e.g. 150.00 or -50.00" className="w-full bg-[#050505] border border-red-950/50 rounded p-3 text-gray-200 focus:border-red-700 focus:outline-none focus:ring-1 focus:ring-red-700 transition font-mono" />
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-red-950/40">
            <Link href="/dashboard/trades" className="text-gray-500 hover:text-gray-300 text-sm font-bold tracking-widest uppercase transition">
              Cancel
            </Link>
            <button type="submit" className="bg-red-900 hover:bg-red-800 text-white px-8 py-3 rounded text-sm font-bold tracking-widest uppercase transition border border-red-700/50 shadow-[0_0_20px_rgba(153,27,27,0.4)]">
              Execute Injection
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}