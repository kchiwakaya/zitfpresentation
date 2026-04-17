"use client"

import { Sprout, MapPin, Play, Wheat, ArrowRight } from "lucide-react"

type Props = {
  onStart: () => void
  onStartAuto?: () => void
}

export function TitleSlide({ onStart, onStartAuto }: Props) {
  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center text-center px-6 overflow-hidden vignette">
      {/* Cinematic hero background with subtle zoom */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-out fade-out zoom-in-[1.02] duration-[10000ms] ease-linear infinite alternate"
        style={{ backgroundImage: "url(/images/hero-zimbabwe.jpg)" }}
        aria-hidden
      />
      {/* Dramatic lighting gradient */}
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 0%, oklch(0.2 0.05 150 / 0.4) 100%), linear-gradient(to bottom, transparent 0%, var(--primary) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-topo opacity-20 cinematic-mask" aria-hidden />

      <Wheat
        className="absolute top-[10%] left-[5%] h-24 w-24 text-white/10 drop-shadow-2xl animate-sway hidden lg:block"
        aria-hidden
      />
      <Sprout
        className="absolute bottom-[15%] right-[5%] h-32 w-32 text-white/10 drop-shadow-2xl animate-sway hidden lg:block"
        style={{ animationDelay: "2s" }}
        aria-hidden
      />

      <div className="relative max-w-5xl text-white animate-cinematic-in">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl text-[10px] tracking-[0.3em] font-bold text-accent mb-16 uppercase shadow-2xl">
          <img 
            src="/images/logo.jpg" 
            alt=""
            className="h-6 w-auto brightness-0 invert"
            loading="eager"
          />
          Ministry of Lands and Rural Development
        </div>

        <h1 className="font-serif text-6xl md:text-8xl lg:text-[10rem] font-bold text-cinematic text-balance leading-[0.95] mb-6">
          Zimbabwe&apos;s<br />
          <span className="text-shimmer italic">Natural</span> Regions
        </h1>

        <div className="h-px w-24 bg-accent/60 mx-auto my-8" />

        <p className="mt-8 text-lg md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed text-pretty font-medium tracking-wide">
          An interactive journey through the agro-ecological heart of the nation.
          Discover the potential of <span className="text-accent font-bold underline decoration-accent/40 underline-offset-4">A1 and A2</span> farming models.
        </p>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            onClick={onStart}
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-accent text-accent-foreground font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-accent/40 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <Sprout className="h-5 w-5" />
            <span className="relative">Begin Experience</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
          {onStartAuto && (
            <button
              onClick={onStartAuto}
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-full border border-white/20 text-white bg-white/5 backdrop-blur-xl font-bold hover:bg-white/10 hover:border-white/40 active:scale-95 transition-all shadow-xl"
            >
              <Play className="h-5 w-5" />
              Automated Tour
            </button>
          )}
        </div>

        <div className="mt-12 text-[10px] text-white/40 tracking-[0.2em] font-mono uppercase">
          Best viewed in fullscreen · Press <kbd className="px-2 py-1 rounded bg-white/10 border border-white/20 mx-1">F</kbd>
        </div>
      </div>

      <div className="absolute bottom-12 left-0 right-0 flex items-center justify-center gap-8 text-[10px] text-white/50 tracking-[0.4em] uppercase font-bold">
        <span>EST. 2026</span>
        <span className="h-[1px] w-12 bg-white/20" />
        <span>Agricultural Presentation</span>
      </div>
    </div>
  )
}
