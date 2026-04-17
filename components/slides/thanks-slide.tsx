"use client"

import { Sprout, RotateCcw } from "lucide-react"
import { regions } from "@/lib/regions"
import { ZimbabweMap } from "@/components/zimbabwe-map"

type Props = {
  onRestart: () => void
}

export function ThanksSlide({ onRestart }: Props) {
  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Soft landscape backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 opacity-80"
        style={{ backgroundImage: "url(/images/hero-zimbabwe.jpg)" }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklch, var(--background) 70%, transparent) 0%, color-mix(in oklch, var(--background) 92%, transparent) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-topo opacity-50" aria-hidden />

      {/* Horizontal region strips */}
      <div className="absolute top-0 left-0 right-0 h-2 flex">
        {regions.map((r) => (
          <div
            key={r.id}
            className="flex-1"
            style={{ backgroundColor: r.colorVar }}
          />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-2 flex">
        {regions.map((r) => (
          <div
            key={r.id}
            className="flex-1"
            style={{ backgroundColor: r.colorVar }}
          />
        ))}
      </div>

      <div className="relative max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-card/80 backdrop-blur-sm text-xs tracking-[0.18em] font-semibold text-primary mb-8 uppercase">
          <Sprout className="h-3.5 w-3.5" />
          End of Presentation
        </div>

        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-semibold leading-[0.9] tracking-tight">
          Thank <span className="italic text-primary">you</span>.
        </h1>

        <p className="mt-8 text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed text-pretty">
          May the lands of Zimbabwe — from the Eastern Highlands to the
          Lowveld — continue to feed and inspire us.
        </p>

        {/* Zimbabwe map recap — all five regions at a glance */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="w-full max-w-md mx-auto rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-4 shadow-sm">
            <ZimbabweMap interactive={false} showLabels />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
            {regions.map((r) => (
              <div
                key={r.id}
                className="flex items-center gap-1.5 text-[11px] text-foreground/70"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: r.colorVar }}
                  aria-hidden
                />
                <span className="font-medium">
                  {r.roman} · {r.name.replace("The ", "")}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition shadow-sm"
          >
            <RotateCcw className="h-4 w-4" />
            Restart Presentation
          </button>
          <div className="text-xs text-muted-foreground tracking-wider font-mono">
            ZITF · Zimbabwe International Trade Fair
          </div>
        </div>
      </div>
    </div>
  )
}
