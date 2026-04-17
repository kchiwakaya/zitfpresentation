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
 * Focused Zimbabwe outline
 * Hand-traced silhouette emphasizing:
 * - Zambezi / Victoria Falls indentation (NW)
 * - Lake Kariba curvature (north-central)
 * - NE Kanyemba corner
 * - Eastern Highlands "spout" around Mutare
 * - Smooth southern tip at Beitbridge
 */
const ZIM_OUTLINE =
  "M 54 126 " +                                      // Vic Falls area (NW)
  "C 78 106, 110 92, 160 86 " +                      // Zambezi approach
  "C 200 82, 240 86, 280 100 " +                     // Lake Kariba arc
  "C 300 108, 320 96, 345 100 " +                    // NE corner (Kanyemba)
  "C 360 106, 380 120, 392 150 " +                   // curve toward Mutare
  "C 400 170, 410 190, 405 210 " +                   // rising into Eastern Highlands
  "C 395 230, 380 245, 365 255 " +                   // eastern foothills
  "C 340 280, 310 300, 275 318 " +                   // southern approach
  "C 240 335, 200 338, 170 320 " +                   // Shashe / Plumtree curve
  "C 130 300, 100 260, 80 210 " +                    // western inward curve
  "C 68 170, 58 150, 54 126 Z"                       // back to Vic Falls

export function ZimbabweMap({
  activeRegion = null,
  onSelect,
  className,
  interactive = true,
  showLabels = true,
}: Props) {
  return (
    <div className={cn("relative w-full aspect-[520/380]", className)}>
      <svg
        viewBox="0 0 520 380"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <clipPath id="zim-clip">
            <path d={ZIM_OUTLINE} />
          </clipPath>

          <linearGradient id="zim-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.02)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.04)" />
          </linearGradient>

          <filter id="zim-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#000" floodOpacity="0.12" />
          </filter>
        </defs>

        <path
          d={ZIM_OUTLINE}
          fill="var(--muted)"
          filter="url(#zim-shadow)"
        />

        <g clipPath="url(#zim-clip)">
          <rect x="0" y="0" width="520" height="380" fill="url(#zim-grad)" />
        </g>

        <path
          d={ZIM_OUTLINE}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-foreground/60"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {interactive && (
          <path
            d={ZIM_OUTLINE}
            fill="transparent"
            className="cursor-pointer"
            onClick={() => onSelect?.(0)}
            aria-label="Zimbabwe silhouette"
          />
        )}

        {showLabels && (
          <g className="pointer-events-none">
            <g>
              <circle cx={270} cy={135} r={3} fill="currentColor" stroke="white" strokeWidth={1} />
              <text x={278} y={139} fontSize={10} textAnchor="start" className="fill-foreground font-semibold">Harare</text>
            </g>

            <g>
              <circle cx={150} cy={255} r={3} fill="currentColor" stroke="white" strokeWidth={1} />
              <text x={142} y={259} fontSize={10} textAnchor="end" className="fill-foreground font-semibold">Bulawayo</text>
            </g>

            <g>
              <circle cx={392} cy={175} r={3} fill="currentColor" stroke="white" strokeWidth={1} />
              <text x={400} y={179} fontSize={10} textAnchor="start" className="fill-foreground font-semibold">Mutare</text>
            </g>

            <g>
              <circle cx={58} cy={125} r={3} fill="currentColor" stroke="white" strokeWidth={1} />
              <text x={66} y={129} fontSize={10} textAnchor="start" className="fill-foreground font-semibold">Vic Falls</text>
            </g>

            <g>
              <circle cx={275} cy={320} r={3} fill="currentColor" stroke="white" strokeWidth={1} />
              <text x={275} y={326} fontSize={10} textAnchor="middle" className="fill-foreground font-semibold">Beitbridge</text>
            </g>
          </g>
        )}
      </svg>
    </div>
  )
}
