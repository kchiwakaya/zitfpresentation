"use client"

import { Sprout, MapPin, Play, Wheat, ArrowRight } from "lucide-react"

type Props = {
  onStart: () => void
  onStartAuto?: () => void
}

export function TitleSlide({ onStart, onStartAuto }: Props) {
  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Cinematic hero background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: "url(/images/hero-zimbabwe.jpg)" }}
        aria-hidden
      />
      {/* Dark green vignette for legibility + brand */}
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklch, var(--primary) 65%, transparent) 0%, color-mix(in oklch, var(--primary) 35%, transparent) 45%, color-mix(in oklch, var(--background) 92%, transparent) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-topo opacity-40" aria-hidden />

      {/* Five-region color strip at the very top */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5"
        aria-hidden
        style={{
          background:
            "linear-gradient(90deg, var(--region-1) 0%, var(--region-1) 20%, var(--region-2) 20%, var(--region-2) 40%, var(--region-3) 40%, var(--region-3) 60%, var(--region-4) 60%, var(--region-4) 80%, var(--region-5) 80%, var(--region-5) 100%)",
        }}
      />

      <Wheat
        className="absolute top-[14%] left-[8%] h-16 w-16 text-white/40 drop-shadow-md animate-sway"
        aria-hidden
      />
      <Sprout
        className="absolute bottom-[22%] right-[10%] h-20 w-20 text-white/45 drop-shadow-md animate-sway"
        style={{ animationDelay: "1.2s" }}
        aria-hidden
      />

      <div className="relative max-w-4xl text-white">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-[11px] tracking-[0.22em] font-semibold text-white mb-8 uppercase">
          <MapPin className="h-3.5 w-3.5" />
          ZITF Presentation · Zimbabwe
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight text-balance drop-shadow-sm">
          Zimbabwe&apos;s{" "}
          <span className="italic text-accent">Five Natural</span> Farming
          Regions
        </h1>

        <p className="mt-8 text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed text-pretty">
          A journey across the country&apos;s agro-ecological zones — from the
          lush Eastern Highlands to the dry southern Lowveld. See what{" "}
          <span className="font-semibold text-accent">A1 and A2</span> farmers
          can grow and earn in every region.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onStart}
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-accent-foreground font-semibold hover:opacity-90 transition shadow-lg shadow-black/20"
          >
            <Sprout className="h-4 w-4" />
            Begin Presentation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          {onStartAuto && (
            <button
              onClick={onStartAuto}
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/40 text-white bg-white/10 backdrop-blur-sm font-semibold hover:bg-white/20 transition"
            >
              <Play className="h-4 w-4" />
              Start Auto-Tour
            </button>
          )}
        </div>

        <div className="mt-6 text-xs text-white/80 tracking-wider font-mono">
          or press{" "}
          <kbd className="px-1.5 py-0.5 rounded border border-white/30 bg-white/10">
            →
          </kbd>{" "}
          to advance ·{" "}
          <kbd className="px-1.5 py-0.5 rounded border border-white/30 bg-white/10">
            P
          </kbd>{" "}
          for auto-play
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-6 text-[11px] text-white/85 tracking-[0.2em] uppercase">
        <span>Zimbabwe International Trade Fair</span>
        <span className="h-px w-6 bg-white/40" />
        <span>2026</span>
      </div>
    </div>
  )
}
