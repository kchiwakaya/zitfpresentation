"use client"

import { Sprout, MapPin, Play, Wheat, ArrowRight } from "lucide-react"

type Props = {
  onStart: () => void
  onStartAuto?: () => void
}

export function TitleSlide({ onStart, onStartAuto }: Props) {
  return (
    <div className="relative h-full w-full overflow-y-auto vignette bg-[oklch(0.25_0.05_150)]">
      {/* Animated sunlight flare */}
      <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-accent/30 blur-[150px] rounded-full animate-pulse-slow mix-blend-screen pointer-events-none" aria-hidden />
      <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-primary/30 blur-[120px] rounded-full animate-pulse-slow delay-1000 mix-blend-screen pointer-events-none" aria-hidden />

      {/* Cinematic hero background with subtle zoom */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-out fade-out zoom-in-[1.05] duration-[25000ms] ease-linear infinite alternate"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2500&auto=format&fit=crop)" }}
        aria-hidden
      />
      {/* Dramatic lighting gradient - Brighter vegetation green wash */}
      <div
        className="absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle at 50% 40%, transparent 0%, oklch(0.4 0.08 150 / 0.4) 100%), linear-gradient(to bottom, transparent 40%, oklch(0.2 0.08 150 / 0.6) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-white/5 mix-blend-overlay z-0" aria-hidden />
      <div className="absolute inset-0 bg-topo opacity-[0.25] cinematic-mask z-0" aria-hidden />
      
      {/* Floating particles (simplified CSS-only) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/40 rounded-full animate-float" />
        <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-white/30 rounded-full animate-float-delayed" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white/20 rounded-full animate-float" />
      </div>

      <Wheat
        className="absolute top-[10%] left-[5%] h-24 w-24 text-white/10 drop-shadow-2xl animate-sway hidden lg:block"
        aria-hidden
      />
      <Sprout
        className="absolute bottom-[15%] right-[5%] h-32 w-32 text-white/10 drop-shadow-2xl animate-sway hidden lg:block"
        style={{ animationDelay: "2s" }}
        aria-hidden
      />

      <div className="relative min-h-full flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="max-w-6xl glass-luxe rounded-[4rem] p-12 md:p-20 shadow-2xl animate-cinematic-in border-white/10 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full border border-white/20 bg-black/30 backdrop-blur-3xl text-[11px] tracking-[0.4em] font-bold text-white mb-12 uppercase shadow-xl group">
              <div className="h-12 w-12 flex items-center justify-center bg-white rounded-full p-2 shadow-[0_0_20px_rgba(255,255,255,0.4)] border border-white/40 transition-transform group-hover:scale-110">
                <img 
                  src="/images/logo.jpg" 
                  alt="Ministry Logo"
                  className="max-h-full max-w-full object-contain rounded-full"
                  loading="eager"
                />
              </div>
              <span className="drop-shadow-sm">Ministry of Lands and Rural Development</span>
            </div>

            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-cinematic text-balance leading-[0.9] mb-8 text-white">
              Zimbabwe&apos;s<br />
              <span className="text-shimmer italic">Natural</span> Regions
            </h1>

            <div className="h-px w-24 bg-accent/60 mx-auto my-8" />

            <p className="mt-4 text-lg md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed text-pretty font-medium tracking-wide">
              An interactive journey through the agro-ecological heart of the nation.
              Discover the potential of <span className="text-accent font-bold underline decoration-accent/40 underline-offset-4">A1 and A2</span> farming models.
            </p>

            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8">
              <button
                onClick={onStart}
                className="group relative inline-flex items-center gap-4 px-12 py-6 rounded-full bg-accent text-accent-foreground font-bold hover:scale-105 active:scale-95 transition-all glow-premium overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <Sprout className="h-6 w-6" />
                <span className="relative text-lg">Begin Experience</span>
                <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
              </button>
              {onStartAuto && (
                <button
                  onClick={onStartAuto}
                  className="group inline-flex items-center gap-4 px-12 py-6 rounded-full border border-white/20 text-white bg-white/5 backdrop-blur-3xl font-bold hover:bg-white/10 hover:border-white/40 active:scale-95 transition-all shadow-2xl"
                >
                  <Play className="h-6 w-6" />
                  <span className="text-lg">Automated Tour</span>
                </button>
              )}
            </div>

            <div className="mt-12 text-[10px] text-white/40 tracking-[0.2em] font-mono uppercase">
              Best viewed in fullscreen · Press <kbd className="px-2 py-1 rounded bg-white/10 border border-white/20 mx-1">F</kbd>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}
