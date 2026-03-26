import Link from 'next/link';
import Header from '@/components/layout/header';

export default function ProjectAkhLanding() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 min-h-screen bg-black text-green-500 font-mono p-8 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        <div className="z-10 text-center space-y-8 max-w-3xl border border-green-500/30 p-12 bg-black/80 backdrop-blur-sm rounded-sm mt-16">
          <h1 className="text-5xl font-bold tracking-tight text-green-400 drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]">
            PROJECT AKH
          </h1>
          <p className="text-lg text-green-600">
            SYSTEM INITIALIZED. WELCOME TO THE DIGITAL ETHER.
          </p>
          <div className="pt-8 flex flex-col items-center gap-4">
            <Link href="/akh/bond-project">
              <button className="px-8 py-3 bg-green-900/40 border border-green-500 text-green-400 hover:bg-green-500 hover:text-black transition-all duration-300 font-bold uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(0,255,0,0.2)] hover:shadow-[0_0_25px_rgba(0,255,0,0.6)]">
                Access The Bond Project (Per-hedj)
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
