"use client"

import { cn } from "@/lib/utils"
import { regions } from "@/lib/regions"

type Props = {
  activeRegion?: number | null
  onSelect?: (id: number) => void
  className?: string
  interactive?: boolean
  showLabels?: boolean
}

/**
 * ZIMBABWE "TEAPOT" OUTLINE
 * Accurate tracing of the borders to ensure the iconic shape is recognizable.
 */
const ZIM_OUTLINE =
  "M 50 130 " +       // Victoria Falls (Top of handle)
  "L 110 100 " +      // Upper Zambezi
  "Q 180 50, 260 80 " + // Lake Kariba curve
  "L 330 30 " +       // Kanyemba (NE tip)
  "L 360 110 " +      // Eastern border starts
  "L 430 190 " +      // Mutare (The "Spout" tip)
  "L 380 250 " +      // Chipinge curve
  "L 280 320 " +      // Beitbridge (Bottom)
  "L 160 290 " +      // Shashe River area
  "L 60 230 " +       // Plumtree (Bottom of handle)
  "L 40 180 " +       // Western border
  "Z"

const REGION_SHAPES = [
  // Region IV: The Base layer (Semi-arid)
  { id: 4, d: "M 0 0 H 500 V 400 H 0 Z" },

  // Region III: The Midveld Crescent
  {
    id: 3,
    d: "M 120 160 Q 220 110, 350 150 Q 380 200, 300 280 Q 180 260, 120 160 Z"
  },

  // Region II: The Highveld Core (Harare region)
  {
    id: 2,
    d: "M 210 120 Q 280 80, 360 110 L 370 190 Q 280 220, 210 120 Z"
  },

  // Region V: North (Zambezi Valley)
  {
    id: 5,
    d: "M 50 130 L 330 30 L 360 100 L 110 140 Z"
  },

  // Region V: South (Lowveld)
  {
    id: 5,
    d: "M 220 300 L 280 320 L 400 240 L 300 250 Z"
  },

  // Region I: Eastern Highlands (Thin strip)
  {
    id: 1,
    d: "M 365 110 L 430 190 L 385 245 L 355 240 L 345 120 Z"
  }
]

const CITIES = [
  { name: "Harare", x: 295, y: 125, anchor: "start" as const },
  { name: "Bulawayo", x: 155, y: 220, anchor: "end" as const },
  { name: "Mutare", x: 400, y: 180, anchor: "start" as const },
  { name: "Vic Falls", x: 65, y: 135, anchor: "start" as const },
  { name: "Beitbridge", x: 280, y: 310, anchor: "middle" as const },
]

export function ZimbabweMap({
  activeRegion = null,
  onSelect,
  className,
  interactive = true,
  showLabels = true,
}: Props) {
  return (
    <div className={cn("relative w-full aspect-[450/350]", className)}>
      <svg
        viewBox="0 0 450 350"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full select-none"
      >
        <defs>
          <clipPath id="zim-clip">
            <path d={ZIM_OUTLINE} />
          </clipPath>
        </defs>

        {/* Background Silhouette */}
        <path d={ZIM_OUTLINE} fill="var(--muted)" />

        {/* Painted Regions */}
        <g clipPath="url(#zim-clip)">
          {REGION_SHAPES.map((shape, idx) => {
            const region = regions.find((r) => r.id === shape.id)
            if (!region) return null
            const isActive = activeRegion === shape.id
            const isDimmed = activeRegion !== null && !isActive

            return (
              <path
                key={`shape-${idx}`}
                d={shape.d}
                fill={region.colorVar}
                className="transition-opacity duration-300"
                style={{ opacity: isDimmed ? 0.2 : 1 }}
              />
            )
          })}
        </g>

        {/* Border */}
        <path
          d={ZIM_OUTLINE}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-foreground/30"
        />

        {/* Interactive Layer (Transparent hits) */}
        {interactive && (
          <g clipPath="url(#zim-clip)">
            {REGION_SHAPES.map((shape, idx) => (
              <path
                key={`hit-${idx}`}
                d={shape.d}
                fill="transparent"
                className="cursor-pointer hover:fill-white/10 transition-colors"
                onClick={() => onSelect?.(shape.id)}
              />
            ))}
          </g>
        )}

        {/* City Markers */}
        {showLabels && (
          <g className="pointer-events-none">
            {CITIES.map((city) => (
              <g key={city.name}>
                <circle cx={city.x} cy={city.y} r="2.5" fill="currentColor" stroke="white" strokeWidth="1" />
                <text
                  x={city.x + (city.anchor === "start" ? 6 : -6)}
                  y={city.y + 3}
                  fontSize="9"
                  textAnchor={city.anchor}
                  className="fill-foreground font-semibold"
                >
                  {city.name}
                </text>
              </g>
            ))}
          </g>
        )}
      </svg>
    </div>
  )
}