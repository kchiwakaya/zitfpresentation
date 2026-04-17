"use client"

import { useEffect, useRef, useState } from "react"
import { ZimbabweMap } from "@/components/zimbabwe-map"
import { regions } from "@/lib/regions"
import { ArrowRight, CloudRain, Play, Pause, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  onJumpTo: (slideIndex: number) => void
}

const SPOTLIGHT_MS = 4000

export function OverviewSlide({ onJumpTo }: Props) {
  const [hover, setHover] = useState<number | null>(null)
  const [spotlight, setSpotlight] = useState<number>(1)
  const [autoSpotlight, setAutoSpotlight] = useState(true)
  const startTs = useRef<number | null>(null)
  const raf = useRef<number | null>(null)
  const [progress, setProgress] = useState(0)

  const SPOTLIGHT_MS = 4000

  // Auto-cycle spotlight through regions I → V on loop
  useEffect(() => {
    if (!autoSpotlight) {
      if (raf.current !== null) cancelAnimationFrame(raf.current)
      setProgress(0)
      return
    }
    const tick = (ts: number) => {
      if (startTs.current === null) startTs.current = ts
      const elapsed = ts - startTs.current
      const p = Math.min(1, elapsed / SPOTLIGHT_MS)
      setProgress(p)
      if (p >= 1) {
        setSpotlight((r) => (r >= 5 ? 1 : r + 1))
        startTs.current = ts
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current)
    }
  }, [autoSpotlight])

  // What the map shows: hover overrides spotlight
  const active = hover ?? spotlight

  return (
    <div className="h-full w-full grid lg:grid-cols-[1.2fr_1fr] gap-12 p-12 lg:p-20 animate-cinematic-in">
      {/* Left — map */}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-accent font-bold mb-4">
          <CloudRain className="h-4 w-4" />
          Interactive Agro-Ecological Map
        </div>
        <div className="flex items-start justify-between gap-8 mb-12">
          <div>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-cinematic leading-[1.1] text-balance">
              Diversity in <br />
              <span className="text-primary italic">Unity</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed font-medium">
              A precise mapping of Zimbabwe&apos;s natural potential. Select a region to explore local farming models and productivity.
            </p>
          </div>
          <button
            onClick={() => {
              setAutoSpotlight((s) => !s)
              startTs.current = null
              setProgress(0)
            }}
            className={cn(
              "shrink-0 h-10 px-5 rounded-full border text-[10px] font-bold tracking-[0.2em] flex items-center gap-2 transition-all shadow-xl active:scale-95",
              autoSpotlight
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border/40 text-muted-foreground hover:text-foreground hover:border-foreground/40 glass",
            )}
            title={autoSpotlight ? "Pause spotlight" : "Play spotlight"}
          >
            {autoSpotlight ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            SPOTLIGHT
          </button>
        </div>

{/* 
        <div className="mt-auto relative group">
          <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full scale-110 -z-10 transition-opacity opacity-50 group-hover:opacity-100" />
          <ZimbabweMap
            activeRegion={active}
            onSelect={(id) => onJumpTo(1 + id)} // slides[2..6] are regions I..V
            className="max-w-2xl mx-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
          />
        </div> 
        */}
        <div className="mt-auto flex-1 flex items-center justify-center glass rounded-[3rem] p-12 text-muted-foreground italic border-dashed">
          Interactive Map Temporarily Offline
        </div>
      </div>

      {/* Right — region list */}
      <div className="flex flex-col gap-3 overflow-y-auto max-h-full min-w-0 pr-4 cinematic-scroll">
        <div className="text-[10px] tracking-[0.4em] uppercase text-accent font-bold mb-2">
          Region Index
        </div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-2xl font-bold">
            Agro-Ecological Zones
          </h3>
          <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-bold">
            <Sparkles className="h-4 w-4 text-accent" />
            Guided Tour
          </div>
        </div>

        {regions.map((r) => {
          const isActive = active === r.id
          const isSpotlight = spotlight === r.id && autoSpotlight && hover === null
          return (
            <button
              key={r.id}
              onMouseEnter={() => setHover(r.id)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onJumpTo(1 + r.id)}
              className={cn(
                "group relative text-left rounded-xl border p-3.5 transition-all overflow-hidden",
                isActive
                  ? "border-foreground/40 shadow-premium scale-[1.02] bg-background/80"
                  : "border-border/60 hover:border-foreground/30 glass hover:scale-[1.01]",
              )}
              style={
                isActive
                  ? {
                      backgroundImage: `linear-gradient(90deg, color-mix(in oklch, ${r.colorVar} 15%, transparent), transparent 70%)`,
                    }
                  : undefined
              }
            >
              {/* Spotlight progress bar */}
              {isSpotlight && (
                <div
                  className="absolute bottom-0 left-0 h-0.5 origin-left"
                  style={{
                    backgroundColor: r.colorVar,
                    width: "100%",
                    transform: `scaleX(${progress})`,
                  }}
                />
              )}
              <div className="flex items-center gap-4">
                {/* Landscape thumbnail */}
                <div className="relative shrink-0 h-14 w-20 rounded-lg overflow-hidden shadow-sm">
                  <img
                    src={`/images/region-${r.id}.jpg`}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 mix-blend-multiply opacity-35"
                    aria-hidden
                    style={{ backgroundColor: r.colorVar }}
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 flex items-center justify-center font-serif text-[11px] font-bold text-white tracking-wider"
                    style={{
                      backgroundColor: `color-mix(in oklch, ${r.colorVar} 80%, black)`,
                    }}
                  >
                    {r.roman}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="font-serif text-[15.5px] font-semibold leading-snug">
                      {r.name}
                    </div>
                    <div className="text-[10.5px] font-mono text-muted-foreground shrink-0 tabular-nums">
                      {r.rainfallMin}–{r.rainfallMax}mm
                    </div>
                  </div>
                  <div className="text-[12.5px] text-muted-foreground leading-relaxed mt-0.5">
                    {r.tagline}
                  </div>
                </div>
                <ArrowRight
                  className={cn(
                    "h-4 w-4 text-muted-foreground transition-all",
                    isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1",
                  )}
                />
              </div>
            </button>
          )
        })}

        <div className="mt-2 rounded-lg border border-dashed border-primary/30 bg-primary/5 p-3 text-[12px] text-foreground/80 leading-relaxed">
          <span className="font-semibold text-primary">A1 vs A2:</span> every
          region slide shows you exactly what smallholder (A1) and commercial
          (A2) farmers can grow, what inputs they need, and what they can earn.
        </div>
      </div>
    </div>
  )
}
