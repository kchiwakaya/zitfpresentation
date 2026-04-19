"use client"

import { useState } from "react"
import { RainfallChart } from "@/components/rainfall-chart"
import { regions } from "@/lib/regions"
import { BarChart3 } from "lucide-react"

export function ComparisonSlide() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div className="h-full w-full p-8 lg:p-12 flex flex-col">
      <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">
        <BarChart3 className="h-3.5 w-3.5" />
        At a Glance
      </div>
      <h2 className="font-serif text-3xl md:text-5xl font-semibold mt-2 text-balance max-w-3xl">
        Rainfall shapes everything
      </h2>
      <p className="mt-3 text-muted-foreground max-w-2xl text-pretty">
        A 1000&nbsp;mm drop in annual rainfall separates Zimbabwe&apos;s
        wettest and driest regions — and with it, the entire agricultural
        playbook shifts.
      </p>

      <div className="mt-8 grid lg:grid-cols-[1.2fr_1fr] gap-10 flex-1 min-h-0">
        {/* Chart */}
        <div className="rounded-2xl border border-border bg-card p-6 flex flex-col">
          <div className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium mb-4">
            Rainfall Comparison
          </div>
          <div className="flex-1 flex items-center">
            <RainfallChart activeRegion={active} onSelect={setActive} />
          </div>
        </div>

        {/* Takeaway grid */}
        <div className="grid grid-cols-1 gap-3 content-start overflow-y-auto pr-2 cinematic-scroll">
          {regions.map((r) => {
            const isActive = active === r.id
            return (
              <button
                key={r.id}
                onMouseEnter={() => setActive(r.id)}
                onMouseLeave={() => setActive(null)}
                className={`text-left rounded-xl border bg-card px-4 py-3 transition-all ${
                  isActive
                    ? "border-foreground/40 shadow-premium scale-[1.02] bg-background/80"
                    : "border-border/60 hover:border-foreground/30 glass hover:scale-[1.01]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-8 w-8 rounded-md flex items-center justify-center font-serif text-sm font-bold text-white shrink-0"
                    style={{ backgroundColor: r.colorVar }}
                  >
                    {r.roman}
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-sm leading-snug">
                      {r.name}
                    </div>
                    <div className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                      {r.soil} · {r.soilQuality}
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
