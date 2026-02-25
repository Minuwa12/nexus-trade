import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server'; 

export default function InjectTradePage() {
  
  async function handleInject(formData: FormData) {
    'use server';
    
    const { userId } = await auth(); 
    if (!userId) throw new Error("You must be logged in to inject trades.");

    const ticker = formData.get('ticker') as string;
    const side = formData.get('side') as string;
    const entryPrice = parseFloat(formData.get('entryPrice') as string);
    const exitPrice = parseFloat(formData.get('exitPrice') as string);
    const netPnl = parseFloat(formData.get('netPnl') as string);
    
    const stopLoss = formData.get('stopLoss') ? parseFloat(formData.get('stopLoss') as string) : null;
    const takeProfit = formData.get('takeProfit') ? parseFloat(formData.get('takeProfit') as string) : null;
    
    // Grab the Mindset Data
    const setupQuality = formData.get('setupQuality') as string;

    let rrRatio = 0;
    if (stopLoss && takeProfit) {
      const risk = Math.abs(entryPrice - stopLoss);
      const reward = Math.abs(takeProfit - entryPrice);
      rrRatio = risk > 0 ? (reward / risk) : 0;
    }

    await prisma.trade.create({
      data: {
        userId,
        ticker,
        side,
        entryPrice,
        exitPrice,
        netPnl,
        stopLoss,      
        takeProfit,    
        riskReward: rrRatio, 
        setupQuality, 
      }
    });

    redirect('/dashboard');
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 animate-in fade-in duration-700 pb-20">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-white tracking-widest uppercase drop-shadow-md">
          Inject Trade Data
        </h2>
        <p className="text-gray-500 mt-2 text-sm tracking-wider">
          Manual entry terminal for the Supabase Vault.
        </p>
      </div>

      <form action={handleInject} className="bg-[#0a0a0a] border border-red-950/50 rounded-xl p-8 shadow-[0_0_30px_rgba(69,10,10,0.2)]">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">Asset Ticker</label>
            <input type="text" name="ticker" required defaultValue="GBPUSD" className="w-full bg-[#050505] border border-red-950/50 rounded px-4 py-3 text-white focus:outline-none focus:border-red-700 transition" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">Position Side</label>
            <select name="side" className="w-full bg-[#050505] border border-red-950/50 rounded px-4 py-3 text-white focus:outline-none focus:border-red-700 transition appearance-none">
              <option value="LONG">LONG</option>
              <option value="SHORT">SHORT</option>
            </select>
          </div>
          
          {/* --- PSYCHOLOGY SECTION --- */}
          <div className="space-y-2 col-span-2 border border-red-900/30 p-4 rounded bg-[#050505] my-2">
            <label className="text-[10px] font-black text-red-600 tracking-[0.2em] uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              Psychology & Setup Quality
            </label>
            <select name="setupQuality" className="w-full bg-black border border-red-950/50 rounded px-4 py-3 text-gray-300 focus:outline-none focus:border-red-700 transition appearance-none font-bold text-sm tracking-wider mt-2">
              <option value="A+ Setup">A+ SETUP (Perfect execution)</option>
              <option value="B-Grade">B-GRADE (Good, but not perfect)</option>
              <option value="FOMO">FOMO (Chasing price)</option>
              <option value="Revenge">REVENGE TRADE (Trying to make back a loss)</option>
              <option value="Boredom">BOREDOM / JUNK (Traded just to trade)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">Entry Price</label>
            <input type="number" step="any" name="entryPrice" required className="w-full bg-[#050505] border border-red-950/50 rounded px-4 py-3 text-white focus:outline-none focus:border-red-700 transition" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">Exit Price</label>
            <input type="number" step="any" name="exitPrice" required className="w-full bg-[#050505] border border-red-950/50 rounded px-4 py-3 text-white focus:outline-none focus:border-red-700 transition" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-red-600/50 tracking-[0.2em] uppercase">Stop Loss</label>
            <input type="number" step="any" name="stopLoss" placeholder="0.0000" className="w-full bg-[#050505] border border-red-900/30 rounded px-4 py-3 text-white focus:outline-none focus:border-red-700 transition" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">Take Profit</label>
            <input type="number" step="any" name="takeProfit" placeholder="0.0000" className="w-full bg-[#050505] border border-red-950/50 rounded px-4 py-3 text-white focus:outline-none focus:border-red-700 transition" />
          </div>

          <div className="space-y-2 col-span-2">
            <label className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">Net PNL ($)</label>
            <input type="number" step="any" name="netPnl" required className="w-full bg-[#050505] border border-red-950/50 rounded px-4 py-3 text-white focus:outline-none focus:border-red-700 transition" />
          </div>
        </div>

        <div className="flex items-center justify-between mt-10 pt-6 border-t border-red-950/50">
          <a href="/dashboard" className="text-[10px] font-bold text-gray-500 hover:text-white tracking-[0.2em] uppercase transition">Cancel</a>
          <button type="submit" className="bg-red-900 hover:bg-red-800 text-white px-8 py-3 rounded text-[10px] font-black tracking-[0.2em] transition shadow-[0_0_20px_rgba(153,27,27,0.3)] border border-red-700/50 uppercase">Execute Injection</button>
        </div>
      </form>
    </div>
  );
}