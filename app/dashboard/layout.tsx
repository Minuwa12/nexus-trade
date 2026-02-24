import Link from 'next/link';
import LiveSessionClock from '@/components/ui/LiveSessionClock';
import MarketSessions from '@/components/ui/MarketSessions';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#050505] text-gray-300 font-sans overflow-hidden">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#0a0a0a] border-r border-red-950 flex flex-col shadow-[4px_0_24px_rgba(69,10,10,0.3)] z-20">
        <div className="h-16 flex items-center px-6 border-b border-red-950">
          <h1 className="text-xl font-extrabold tracking-widest text-red-700 drop-shadow-md uppercase">
            Nexus<span className="text-amber-500">Trade</span>
          </h1>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-3">
          <Link 
            key="nav-overview" 
            href="/dashboard" 
            className="block px-4 py-3 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-950/10 transition font-bold tracking-widest text-[10px] uppercase"
          >
            Overview
          </Link>
          <Link 
            key="nav-log" 
            href="/dashboard/trades" 
            className="block px-4 py-3 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-950/10 transition font-bold tracking-widest text-[10px] uppercase"
          >
            Execution Log
          </Link>
          <Link 
            key="nav-multiverse" 
            href="/dashboard/multiverse" 
            className="block px-4 py-3 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-950/10 transition font-bold tracking-widest text-[10px] uppercase"
          >
            Multiverse Engine
          </Link>
          <Link 
            key="nav-biometrics" 
            href="/dashboard/biometrics" 
            className="block px-4 py-3 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-950/10 transition font-bold tracking-widest text-[10px] uppercase"
          >
            Biometric Tilt
          </Link>
        </nav>

        {/* Action Area: Voice Journal */}
        <div className="p-4 border-t border-red-950/50">
          <Link 
            key="nav-voice-button"
            href="/dashboard/voice" 
            className="block w-full text-center bg-red-900 hover:bg-red-800 text-white py-3 rounded text-[10px] font-black tracking-[0.2em] transition shadow-[0_0_20px_rgba(153,27,27,0.3)] border border-red-700/50 uppercase"
          >
            + Voice Journal
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* Cinematic Ambient Glow (The Klaus Aesthetic) */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-900/10 blur-[120px] pointer-events-none rounded-full"></div>

        {/* Top Header - THE COMMAND CENTER HUB */}
        <header className="h-16 border-b border-red-950/30 flex items-center justify-between px-8 bg-[#050505]/40 backdrop-blur-xl sticky top-0 z-50">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 border-r border-red-950/50 pr-6">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              <h2 className="text-[10px] font-black text-gray-500 tracking-[0.3em] uppercase">System Live</h2>
            </div>
            
            {/* LIVE MARKET SESSIONS INDICATOR */}
            <MarketSessions />
          </div>
          
          <LiveSessionClock />
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-10 z-10 custom-scrollbar">
          {children}
        </div>
      </main>

    </div>
  );
}