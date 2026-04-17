"use client"

import { ZimbabweMap } from "@/components/zimbabwe-map"
import { ModelShowcase } from "@/components/model-showcase"
import { type Region } from "@/lib/regions"
import { CloudRain, Layers, MapPin, Leaf, Check, Droplets } from "lucide-react"
import { useCountUp } from "@/hooks/use-count-up"

type Props = {
  region: Region
}

export function RegionSlide({ region }: Props) {
  const rainMin = useCountUp(region.rainfallMin, 900)
  const rainMax = useCountUp(region.rainfallMax, 1100)

  return (
    <div className="h-full w-full grid lg:grid-cols-[0.95fr_1fr_1.15fr] gap-5 p-5 lg:p-6 overflow-y-auto">
      {/* ============ Column 1 — identity + landscape hero + map ============ */}
      <div className="flex flex-col gap-4 min-w-0">
        {/* Landscape hero banner */}
        <div className="relative rounded-2xl overflow-hidden border border-border/40 shadow-premium aspect-[4/3] lg:aspect-[5/4] transition-all duration-500">
          <img
            src={`/images/region-${region.id}.jpg`}
            alt={`Landscape of ${region.name}, Zimbabwe`}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Tint with region color for cohesion */}
          <div
            className="absolute inset-0 mix-blend-multiply opacity-30"
            aria-hidden
            style={{ backgroundColor: region.colorVar }}
          />
          {/* Bottom-up gradient for legibility */}
          <div
            className="absolute inset-x-0 bottom-0 h-2/3"
            aria-hidden
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.8) 100%)",
            }}
          />
          {/* Roman numeral badge */}
          <div
            className="absolute top-3 left-3 h-12 w-12 rounded-xl flex items-center justify-center font-serif text-xl font-bold text-white shadow-md backdrop-blur-sm"
            style={{ backgroundColor: region.colorVar }}
          >
            {region.roman}
          </div>
          {/* Name + tagline over gradient */}
          <div className="absolute left-0 right-0 bottom-0 p-4 text-white">
            <div className="text-[10px] tracking-[0.22em] uppercase font-semibold text-white/85">
              Region {region.roman}
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold leading-tight text-balance drop-shadow">
              {region.name}
            </h2>
            <div className="text-xs md:text-sm text-white/90 mt-0.5 italic">
              {region.tagline}
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
          {region.summary}
        </p>

        {/* Animated rainfall band */}
        <div className="rounded-xl border border-border/40 glass p-4 shadow-premium">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-semibold mb-2">
            <Droplets className="h-3.5 w-3.5" />
            Annual Rainfall
          </div>
          <div className="flex items-baseline gap-2">
            <div
              className="font-serif text-3xl font-semibold tabular-nums"
              style={{ color: region.colorVar }}
            >
              {rainMin}
            </div>
            <div className="text-muted-foreground">–</div>
            <div
              className="font-serif text-3xl font-semibold tabular-nums"
              style={{ color: region.colorVar }}
            >
              {rainMax}
            </div>
            <div className="text-xs text-muted-foreground ml-1">mm / yr</div>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full animate-grow-bar"
              style={{
                width: `${Math.min(100, (region.rainfallMax / 1400) * 100)}%`,
                backgroundColor: region.colorVar,
                animationDuration: "1200ms",
              }}
            />
          </div>
        </div>

        <div className="mt-auto">
          <ZimbabweMap
            activeRegion={region.id}
            interactive={false}
            className="w-full"
          />
        </div>
      </div>

      {/* ============ Column 2 — facts + what thrives ============ */}
      <div className="flex flex-col gap-3 min-w-0">
        <div className="grid gap-3">
          <StatCard
            icon={<CloudRain className="h-4 w-4" />}
            label="Rainfall Pattern"
            value={region.rainfall}
          />
          <StatCard
            icon={<Layers className="h-4 w-4" />}
            label="Soil Type"
            value={region.soil}
            subValue={region.soilQuality}
            subColor={region.colorVar}
          />
          <StatCard
            icon={<MapPin className="h-4 w-4" />}
            label="Provinces"
            value={region.provinces.join(" · ")}
          />
        </div>

        <div
          className="rounded-2xl border border-border/40 glass p-5 relative overflow-hidden flex-1 shadow-premium"
          style={{
            backgroundImage: `linear-gradient(135deg, color-mix(in oklch, ${region.colorVar} 18%, transparent), transparent 70%)`,
          }}
        >
          <div className="flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-muted-foreground font-semibold">
            <Leaf className="h-3.5 w-3.5" />
            Agricultural Potential
          </div>
          <h3 className="font-serif text-lg font-semibold mt-1 mb-3">
            What thrives here
          </h3>
          <ul className="space-y-2.5">
            {region.potential.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[13.5px]">
                <span
                  className="mt-0.5 shrink-0 h-5 w-5 rounded-full flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: region.colorVar }}
                >
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <div
            className="absolute -bottom-10 -right-10 font-serif text-[180px] leading-none opacity-[0.08] select-none pointer-events-none"
            style={{ color: region.colorVar }}
          >
            {region.roman}
          </div>
        </div>

        <div
          className="rounded-xl p-3.5 text-xs italic border border-dashed"
          style={{
            borderColor: `color-mix(in oklch, ${region.colorVar} 45%, transparent)`,
            backgroundColor: `color-mix(in oklch, ${region.colorVar} 6%, transparent)`,
          }}
        >
          <span className="font-semibold not-italic text-foreground">
            Key insight:
          </span>{" "}
          <span className="text-foreground/80">{region.tagline}.</span>
        </div>
      </div>

      {/* ============ Column 3 — A1 / A2 model showcase ============ */}
      <div className="min-w-0">
        <ModelShowcase region={region} />
      </div>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  subValue,
  subColor,
}: {
  icon: React.ReactNode
  label: string
  value: string
  subValue?: string
  subColor?: string
}) {
  return (
    <div className="rounded-xl border border-border/40 bg-background/40 backdrop-blur-md p-3.5 shadow-sm transition-all hover:bg-background/60">
      <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-semibold">
        {icon}
        {label}
      </div>
      <div className="mt-1 font-medium text-[13px] leading-snug">{value}</div>
      {subValue && (
        <div
          className="mt-1.5 inline-block text-[9px] font-bold tracking-[0.2em] px-2 py-0.5 rounded-full text-white"
          style={{ backgroundColor: subColor }}
        >
          {subValue}
        </div>
      )}
    </div>
  )
}
