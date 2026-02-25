import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-black text-white font-sans selection:bg-red-500/30">
      {/* --- CINEMATIC SIDEBAR --- */}
      <aside className="w-64 border-r border-red-950/30 flex flex-col bg-[#050505]">
        <div className="p-8">
          <h1 className="text-xl font-black tracking-[0.3em] text-red-600 uppercase italic">
            Nexus<span className="text-white">Trade</span>
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-red-950/10 rounded transition-all group">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Overview</span>
          </Link>
          
          <Link href="/dashboard/trades" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-red-950/10 rounded transition-all group">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Execution Log</span>
          </Link>

          
        </nav>

        {/* --- THE TERMINATE SESSION BUTTON --- */}
        <div className="p-4 border-t border-red-950/30 mb-6">
          <SignOutButton>
            <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-500 hover:text-red-500 hover:bg-red-950/10 transition-all group text-left rounded">
              <div className="w-2 h-2 rounded-full bg-red-900 group-hover:bg-red-500 shadow-[0_0_10px_rgba(153,27,27,0.5)]"></div>
              <span className="text-[10px] font-black tracking-[0.2em] uppercase">Terminate Session</span>
            </button>
          </SignOutButton>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-950/5 via-black to-black p-8">
        {children}
      </main>
    </div>
  );
}