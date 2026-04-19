"use client"

import { useEffect, useRef, useState } from "react"
import type { Region, FarmModel } from "@/lib/regions"
import {
  Tractor,
  Users,
  Banknote,
  Ruler,
  Wrench,
  Lightbulb,
  Check,
  Play,
  Pause,
} from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  region: Region
  /**
   * When true, component auto-cycles between A1 and A2 every `cycleMs`.
   */
  autoCycle?: boolean
  cycleMs?: number
}

/**
 * Interactive A1 vs A2 land-reform farming model card.
 *
 * Farmers on the stand can see — for their region — the typical plot size,
 * recommended enterprise mix, inputs, labour, and expected income under
 * each government-resettlement model.
 */
export function ModelShowcase({
  region,
  autoCycle = true,
  cycleMs = 9000,
}: Props) {
  const [active, setActive] = useState<"A1" | "A2">("A1")
  const [playing, setPlaying] = useState(autoCycle)
  const [progress, setProgress] = useState(0)
  const [modalImage, setModalImage] = useState<{ src: string, title: string } | null>(null)
  const raf = useRef<number | null>(null)
  const startTs = useRef<number | null>(null)

  // Reset when region changes
  useEffect(() => {
    setActive("A1")
    setProgress(0)
    startTs.current = null
  }, [region.id])

  // Auto-cycle loop using rAF (keeps the progress bar in sync)
  useEffect(() => {
    if (!playing) {
      if (raf.current !== null) cancelAnimationFrame(raf.current)
      return
    }
    const tick = (ts: number) => {
      if (startTs.current === null) startTs.current = ts
      const elapsed = ts - startTs.current
      const p = Math.min(1, elapsed / cycleMs)
      setProgress(p)
      if (p >= 1) {
        setActive((a) => (a === "A1" ? "A2" : "A1"))
        startTs.current = ts
        setProgress(0)
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current)
    }
  }, [playing, cycleMs, active])

  const model = region.models[active]

  return (
    <div
      className="rounded-[3rem] border border-white/10 glass-premium overflow-hidden flex flex-col transition-all duration-700 shadow-2xl"
      style={{
        backgroundImage: `linear-gradient(135deg, color-mix(in oklch, ${region.colorVar} 15%, transparent), transparent 70%)`,
      }}
    >
      {/* Header with toggle + auto-play */}
      <div className="flex items-center justify-between gap-3 px-5 pt-5">
        <div>
          <div className="flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-muted-foreground font-semibold">
            <Tractor className="h-3.5 w-3.5" />
            Farming Models · For Your Farm
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            Tap A1 or A2 to see exactly what you can grow and earn.
          </div>
        </div>

        <button
          onClick={() => {
            setPlaying((p) => !p)
            startTs.current = null
            setProgress(0)
          }}
          className="shrink-0 h-7 w-7 rounded-full border border-border hover:border-foreground/40 flex items-center justify-center text-muted-foreground hover:text-foreground transition"
          aria-label={playing ? "Pause auto-cycle" : "Play auto-cycle"}
          title={playing ? "Pause auto-cycle" : "Play auto-cycle"}
        >
          {playing ? (
            <Pause className="h-3 w-3" />
          ) : (
            <Play className="h-3 w-3" />
          )}
        </button>
      </div>

      {/* A1 / A2 segmented toggle */}
      <div className="mt-3 px-5">
        <div className="relative grid grid-cols-2 gap-1 p-1 rounded-full bg-muted">
          {(["A1", "A2"] as const).map((code) => (
            <button
              key={code}
              onClick={() => {
                setActive(code)
                startTs.current = null
                setProgress(0)
              }}
              onDoubleClick={() => {
                const title = code === "A1" ? "A1 Smallholder Model" : "A2 Commercial Model"
                const src = code === "A1" 
                  ? "https://images.unsplash.com/photo-1592419044706-39796d40f98c?q=80&w=1200&auto=format&fit=crop" // Representative A1
                  : "https://images.unsplash.com/photo-1624720114708-0cbd6ee41f4e?q=80&w=1200&auto=format&fit=crop" // Representative A2
                setModalImage({ src, title })
              }}
              className={cn(
                "relative z-10 py-2 px-3 rounded-full text-xs font-semibold tracking-wider transition-all active:scale-95 group/btn",
                active === code
                  ? "text-white"
                  : "text-muted-foreground hover:text-foreground",
              )}
              title={`Switch to ${code} (Double-click to see enhanced view)`}
            >
              <span className="relative z-10 flex items-center justify-center gap-1.5">
                {code} · {region.models[code].label.split(" ")[1]}
                {active === code && (
                  <div className="h-1 w-1 rounded-full bg-white/60 animate-pulse" />
                )}
              </span>
              {active === code && (
                <span
                  className="absolute inset-0 rounded-full transition-all shadow-lg"
                  style={{ backgroundColor: region.colorVar }}
                  aria-hidden
                />
              )}
            </button>
          ))}
        </div>
        {/* Auto-cycle progress bar */}
        <div className="mt-1 h-0.5 w-full overflow-hidden rounded-full">
          {playing && (
            <div
              className="h-full origin-left"
              style={{
                backgroundColor: region.colorVar,
                transform: `scaleX(${progress})`,
                opacity: 0.4,
              }}
            />
          )}
        </div>
      </div>

      {/* Model body */}
      <div key={active} className="p-8 md:p-10 animate-in fade-in slide-in-from-bottom-2 duration-500 flex-1 flex flex-col gap-8 overflow-y-auto min-h-0 cinematic-scroll">
        <ModelHeadline 
          model={model} 
          colorVar={region.colorVar} 
          onShowEnhanced={() => {
            const title = active === "A1" ? `${region.roman} · A1 Smallholder Model` : `${region.roman} · A2 Commercial Model`
            const srcs = {
              1: "https://images.unsplash.com/photo-1597484662317-9bd76add240a?q=80&w=1200&auto=format&fit=crop",
              2: "https://images.unsplash.com/photo-1594750013233-0498305f23bc?q=80&w=1200&auto=format&fit=crop",
              3: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1200&auto=format&fit=crop",
              4: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop",
              5: "https://images.unsplash.com/photo-1516422317184-3388bc6768b2?q=80&w=1200&auto=format&fit=crop"
            }
            setModalImage({ src: srcs[region.id as keyof typeof srcs], title })
          }}
        />

        <div className="grid md:grid-cols-2 gap-4 flex-1">
          <div className="rounded-xl border border-border/60 bg-background/60 p-4">
            <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-semibold mb-3">
              <Check className="h-3 w-3" />
              Recommended Enterprise Mix
            </div>
            <ul className="space-y-2">
              {model.enterprises.map((e) => (
                <li key={e.name} className="flex items-start gap-2 text-[13px]">
                  <span
                    className="mt-1.5 shrink-0 h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: region.colorVar }}
                  />
                  <div className="min-w-0">
                    <div className="font-medium leading-tight">{e.name}</div>
                    <div className="text-muted-foreground text-[11.5px] leading-snug">
                      {e.detail}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <FactRow
              icon={<Wrench className="h-3.5 w-3.5" />}
              label="Typical Inputs"
              value={model.inputs.join(" · ")}
            />
            <FactRow
              icon={<Users className="h-3.5 w-3.5" />}
              label="Labour"
              value={model.labour}
            />
            <FactRow
              icon={<Banknote className="h-3.5 w-3.5" />}
              label="Typical Annual Income"
              value={model.typicalIncome}
              valueAccent
              accentColor={region.colorVar}
            />
            <div
              className="mt-auto rounded-lg p-3 text-[12.5px] leading-relaxed"
              style={{
                backgroundColor: `color-mix(in oklch, ${region.colorVar} 14%, transparent)`,
              }}
            >
              <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase mb-1 text-foreground/80">
                <Lightbulb className="h-3 w-3" />
                Winning Tip
              </div>
              <div className="text-foreground/85 italic">
                &ldquo;{model.successTip}&rdquo;
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Enhanced View Modal */}
      {modalImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setModalImage(null)}
        >
          <div 
            className="relative max-w-5xl w-full glass rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={() => setModalImage(null)}
                className="h-10 w-10 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md text-white flex items-center justify-center transition"
              >
                <Pause className="h-5 w-5 rotate-45" />
              </button>
            </div>
            <div className="aspect-[16/10] relative">
              <img 
                src={modalImage.src} 
                alt={modalImage.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="text-xs tracking-[0.3em] uppercase font-bold text-accent mb-2">
                  Enhanced Visualization · Region {region.roman}
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
                  {modalImage.title}
                </h2>
                <p className="text-white/80 max-w-2xl text-sm md:text-base leading-relaxed">
                  {active === "A1" 
                    ? `A closer look at the A1 smallholder farming model in Region ${region.roman}. This model focuses on intensive land use, diverse crop rotation (like ${model.enterprises[0]?.name}), and community-centric homesteads.`
                    : `An aerial perspective of the A2 commercial model in Region ${region.roman}. Characterized by larger scales, professional infrastructure (like ${model.plotSize} plots), and mechanized systems optimized for this agro-ecological zone.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ModelHeadline({
  model,
  colorVar,
  onShowEnhanced,
}: {
  model: FarmModel
  colorVar: string
  onShowEnhanced: () => void
}) {
  const imgSrc =
    model.code === "A1" ? "/images/model-a1.jpg" : "/images/model-a2.jpg"
  const imgAlt =
    model.code === "A1"
      ? "Aerial view of an A1 smallholder farm plot"
      : "Aerial view of an A2 commercial farm with center-pivot irrigation"

  return (
    <div className="flex items-center gap-4">
      {/* Aerial thumbnail of the plot type */}
      <div
        key={model.code}
        className="relative h-16 w-20 rounded-xl overflow-hidden shrink-0 shadow-sm border border-border animate-in fade-in zoom-in-95 duration-300"
      >
        <img
          src={imgSrc || "/placeholder.svg"}
          alt={imgAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 mix-blend-multiply opacity-25"
          aria-hidden
          style={{ backgroundColor: colorVar }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 px-1.5 py-0.5 font-serif text-[11px] font-bold text-white text-center"
          style={{
            backgroundColor: `color-mix(in oklch, ${colorVar} 80%, black)`,
          }}
        >
          {model.code}
        </div>
      </div>

      <button 
        onClick={onShowEnhanced}
        className="min-w-0 flex-1 text-left group/head transition-transform active:scale-95"
      >
        <div className="font-serif text-lg md:text-xl font-semibold leading-tight group-hover/head:text-primary transition-colors flex items-center gap-2">
          {model.label}
          <div className="h-1.5 w-1.5 rounded-full bg-primary opacity-0 group-hover/head:opacity-100 transition-opacity" />
        </div>
        <div className="text-[12px] text-muted-foreground group-hover/head:text-foreground/80 transition-colors">
          {model.subtitle}
        </div>
      </button>
      <div className="ml-auto flex items-center gap-2 shrink-0">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border bg-background text-[11px] font-mono">
          <Ruler className="h-3 w-3 text-muted-foreground" />
          {model.plotSize}
        </div>
      </div>
    </div>
  )
}

function FactRow({
  icon,
  label,
  value,
  valueAccent,
  accentColor,
}: {
  icon: React.ReactNode
  label: string
  value: string
  valueAccent?: boolean
  accentColor?: string
}) {
  return (
    <div className="rounded-lg border border-border/40 bg-background/40 backdrop-blur-md p-3 transition-colors hover:bg-background/60">
      <div className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-semibold">
        {icon}
        {label}
      </div>
      <div
        className={cn(
          "mt-1 text-[13px] leading-snug",
          valueAccent ? "font-bold text-[15px]" : "font-medium",
        )}
        style={valueAccent && accentColor ? { color: accentColor } : undefined}
      >
        {value}
      </div>
    </div>
  )
}
