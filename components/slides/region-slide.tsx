"use client"

import { ZimbabweMap } from "@/components/zimbabwe-map"
import { ModelShowcase } from "@/components/model-showcase"
import { type Region } from "@/lib/regions"
import { CloudRain, Layers, MapPin, Leaf, Check, Droplets, Zap } from "lucide-react"
import { useCountUp } from "@/hooks/use-count-up"

type Props = {
  region: Region
}

export function RegionSlide({ region }: Props) {
  const rainMin = useCountUp(region.rainfallMin, 900)
  const rainMax = useCountUp(region.rainfallMax, 1100)

  return (
    <div className="h-full w-full flex flex-col p-8 lg:p-14 animate-cinematic-in overflow-y-auto">
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 flex-1 min-h-0">
        {/* Left Column: Hero & Narrative */}
        <div className="flex flex-col gap-10 min-w-0">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase font-bold text-accent">
              <span className="px-2 py-0.5 rounded bg-accent/20 border border-accent/30 shadow-sm">Natural Region {region.roman}</span>
              <span className="h-px w-8 bg-accent/30" />
              Zimbabwe Agro-Ecological Survey
            </div>
            <h2 className="font-serif text-6xl md:text-8xl font-bold text-cinematic leading-[0.95] text-balance">
              {(region.heroTitle || region.name || "Natural Region").split(" ")[0]} <br />
              <span className="text-primary italic">
                {(region.heroTitle || region.name || "").split(" ").slice(1).join(" ")}
              </span>
            </h2>
          </div>

          <div className="relative aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl group border border-white/10">
            <img
              src={`/images/region-${region.id}.jpg`}
              alt={region.name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[15000ms] group-hover:scale-110"
            />
            {/* Cinematic tint */}
            <div 
              className="absolute inset-0 mix-blend-multiply opacity-20"
              style={{ backgroundColor: region.colorVar }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between gap-8">
              <div className="max-w-xl">
                <p className="text-white/95 text-lg md:text-2xl font-medium leading-relaxed drop-shadow-2xl">
                  {region.description}
                </p>
              </div>
              <div className="hidden xl:block text-right shrink-0">
                <div className="text-[10px] tracking-[0.3em] uppercase text-white/60 font-bold mb-2">Key Provinces</div>
                <div className="text-white font-serif text-2xl drop-shadow-md">
                  {region.provinces.join(" · ")}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <StatCard
              icon={<CloudRain className="h-6 w-6" />}
              label="Annual Rainfall"
              value={region.rainfall}
              colorVar={region.colorVar}
            />
            <StatCard
              icon={<Layers className="h-6 w-6" />}
              label="Soil Quality"
              value={region.soilQuality || region.soil}
              colorVar={region.colorVar}
            />
            <StatCard
              icon={<MapPin className="h-6 w-6" />}
              label="Coverage"
              value={`Region ${region.roman}`}
              colorVar={region.colorVar}
            />
          </div>

{/* 
          <div className="mt-auto flex items-center justify-center p-8 glass rounded-[2.5rem] h-48 relative overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity rotate-12 scale-150">
               <ZimbabweMap
                activeRegion={region.id}
                showLabels={false}
                interactive={false}
              />
            </div>
            <div className="relative z-10 flex items-center gap-4 text-accent font-serif text-2xl font-bold">
               <MapPin className="h-8 w-8" />
               Geographical Context
            </div>
          </div>
          */}
        </div>

        {/* Right Column: Farming Models */}
        <div className="flex flex-col gap-6 min-w-0 h-full overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] tracking-[0.4em] uppercase font-bold text-muted-foreground/60">
              Agri-Business Models
            </div>
            <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] font-bold text-accent px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
              <Zap className="h-3 w-3" />
              LIVE DATA
            </div>
          </div>
          <div className="flex-1 min-h-0 glass rounded-[3rem] overflow-hidden shadow-2xl">
            <ModelShowcase region={region} />
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  colorVar,
}: {
  icon: React.ReactNode
  label: string
  value: string
  colorVar: string
}) {
  return (
    <div className="glass group relative p-8 rounded-[2.5rem] transition-all hover:scale-105 active:scale-95 overflow-hidden border-white/5 shadow-2xl">
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
        style={{ backgroundColor: colorVar }}
      />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div 
            className="h-12 w-12 rounded-[1.25rem] flex items-center justify-center text-white shadow-xl"
            style={{ backgroundColor: colorVar }}
          >
            {icon}
          </div>
          <div className="text-[10px] tracking-[0.3em] uppercase font-bold text-muted-foreground/60 leading-none">
            {label}
          </div>
        </div>
        <div className="font-serif text-2xl font-bold leading-tight group-hover:text-primary transition-colors text-balance">
          {value}
        </div>
      </div>
    </div>
  )
}
