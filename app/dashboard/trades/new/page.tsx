import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default function InjectTradePage() {
  // ⚡ THE SERVER ACTION: Saves to your Supabase Vault
  async function handleInject(formData: FormData) {
    'use server';
    
    // Changed 'asset' to 'ticker' to match your database blueprint perfectly!
    const ticker = formData.get('ticker') as string;
    const side = formData.get('side') as string;
    const entryPrice = parseFloat(formData.get('entryPrice') as string);
    const exitPrice = parseFloat(formData.get('exitPrice') as string);
    const netPnl = parseFloat(formData.get('netPnl') as string);

    await prisma.trade.create({
      data: {
        ticker,
        side,
        entryPrice,
        exitPrice,
        netPnl,
      }
    });

    // Teleport back to the dashboard after injecting
    redirect('/dashboard');
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 animate-in fade-in duration-700">
      
      {/* Header Section */}
      <div className="mb-10">
        <h2 className="text-4xl font-black text-white tracking-widest uppercase drop-shadow-md">
          Inject Trade Data
        </h2>
        <p className="text-gray-500 mt-2 text-sm tracking-wider">
          Manual entry terminal for the Supabase Vault.
        </p>
      </div>

      {/* The Injection Form */}
      <form action={handleInject} className="bg-[#0a0a0a] border border-red-950/50 rounded-xl p-8 shadow-[0_0_30px_rgba(69,10,10,0.2)]">
        <div className="grid grid-cols-2 gap-6 mb-6">
          
          {/* Asset Ticker (Updated name="ticker") */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">Asset Ticker</label>
            <input 
              type="text" 
              name="ticker" 
              required 
              defaultValue="GBPUSD"
              className="w-full bg-[#050505] border border-red-950/50 rounded px-4 py-3 text-white focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700 transition"
            />
          </div>

          {/* Position Side */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">Position Side</label>
            <select 
              name="side" 
              className="w-full bg-[#050505] border border-red-950/50 rounded px-4 py-3 text-white focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700 transition appearance-none"
            >
              <option value="LONG">LONG</option>
              <option value="SHORT">SHORT</option>
            </select>
          </div>

          {/* Entry Price (UPGRADED WITH step="any") */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">Entry Price</label>
            <input 
              type="number" 
              step="any" 
              name="entryPrice" 
              required 
              className="w-full bg-[#050505] border border-red-950/50 rounded px-4 py-3 text-white focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700 transition"
            />
          </div>

          {/* Exit Price (UPGRADED WITH step="any") */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">Exit Price</label>
            <input 
              type="number" 
              step="any" 
              name="exitPrice" 
              required 
              className="w-full bg-[#050505] border border-red-950/50 rounded px-4 py-3 text-white focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700 transition"
            />
          </div>

          {/* Net PNL (UPGRADED WITH step="any") */}
          <div className="space-y-2 col-span-2">
            <label className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">Net PNL ($)</label>
            <input 
              type="number" 
              step="any" 
              name="netPnl" 
              required 
              className="w-full bg-[#050505] border border-red-950/50 rounded px-4 py-3 text-white focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700 transition"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-red-950/50">
          <a href="/dashboard" className="text-[10px] font-bold text-gray-500 hover:text-white tracking-[0.2em] uppercase transition">
            Cancel
          </a>
          <button 
            type="submit" 
            className="bg-red-900 hover:bg-red-800 text-white px-8 py-3 rounded text-[10px] font-black tracking-[0.2em] transition shadow-[0_0_20px_rgba(153,27,27,0.3)] border border-red-700/50 uppercase"
          >
            Execute Injection
          </button>
        </div>
      </form>
    </div>
  );
}