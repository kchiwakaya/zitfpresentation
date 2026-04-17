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
    <div className="h-full w-full grid lg:grid-cols-[1.1fr_1fr] gap-8 p-8 lg:p-12">
      {/* Left — map */}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-muted-foreground font-semibold">
          <CloudRain className="h-3.5 w-3.5" />
          Rainfall Gradient · East → West
        </div>
        <div className="flex items-start justify-between gap-4 mt-2">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-balance">
              Five regions, one country
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">
              Click any region on the map — or in the list — to explore its
              soils, provinces, and what A1 &amp; A2 farmers grow there.
            </p>
          </div>
          <button
            onClick={() => {
              setAutoSpotlight((s) => !s)
              startTs.current = null
              setProgress(0)
            }}
            className={cn(
              "shrink-0 h-8 px-3 rounded-full border text-[11px] font-semibold tracking-wider flex items-center gap-1.5 transition",
              autoSpotlight
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40",
            )}
            title={autoSpotlight ? "Pause spotlight" : "Play spotlight"}
          >
            {autoSpotlight ? (
              <Pause className="h-3 w-3" />
            ) : (
              <Play className="h-3 w-3" />
            )}
            SPOTLIGHT
          </button>
        </div>

        <div className="mt-auto">
          <ZimbabweMap
            activeRegion={active}
            onSelect={(id) => onJumpTo(1 + id)} // slides[2..6] are regions I..V
            className="max-w-xl mx-auto"
          />
        </div>
      </div>

      {/* Right — region list */}
      <div className="flex flex-col gap-2 overflow-y-auto max-h-full min-w-0">
        <div className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground font-semibold">
          The Regions
        </div>
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-semibold">
            From wettest to driest
          </h3>
          <div className="flex items-center gap-1 text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-semibold">
            <Sparkles className="h-3 w-3" />
            Auto-Tour
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
                "group relative text-left rounded-xl border bg-card p-3.5 transition-all overflow-hidden",
                isActive
                  ? "border-foreground/30 shadow-sm"
                  : "border-border hover:border-foreground/30",
              )}
              style={
                isActive
                  ? {
                      backgroundImage: `linear-gradient(90deg, color-mix(in oklch, ${r.colorVar} 10%, transparent), transparent 50%)`,
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
                    <div className="font-serif text-[15.5px] font-semibold truncate">
                      {r.name}
                    </div>
                    <div className="text-[10.5px] font-mono text-muted-foreground shrink-0 tabular-nums">
                      {r.rainfallMin}–{r.rainfallMax}mm
                    </div>
                  </div>
                  <div className="text-[12.5px] text-muted-foreground truncate">
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
