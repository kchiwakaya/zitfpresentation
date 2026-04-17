"use client"

import { regions } from "@/lib/regions"

type Props = {
  activeRegion?: number | null
  onSelect?: (id: number) => void
}

/**
 * Horizontal bar chart showing rainfall ranges across the 5 regions.
 * Built with plain SVG so it scales cleanly at presentation size.
 */
export function RainfallChart({ activeRegion = null, onSelect }: Props) {
  const maxRain = 1400
  const width = 600
  const rowHeight = 54
  const labelWidth = 90
  const chartWidth = width - labelWidth - 60
  const height = regions.length * rowHeight + 40

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        role="img"
        aria-label="Rainfall comparison across Zimbabwe's five natural regions"
      >
        {/* Grid lines */}
        {[0, 350, 700, 1050, 1400].map((v) => {
          const x = labelWidth + (v / maxRain) * chartWidth
          return (
            <g key={v}>
              <line
                x1={x}
                x2={x}
                y1={20}
                y2={height - 20}
                stroke="oklch(0.22 0.04 55 / 0.1)"
                strokeDasharray="2 4"
              />
              <text
                x={x}
                y={height - 5}
                textAnchor="middle"
                style={{
                  fontSize: 10,
                  fill: "var(--muted-foreground)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {v}
              </text>
            </g>
          )
        })}
        <text
          x={labelWidth + chartWidth / 2}
          y={height - 20}
          textAnchor="middle"
          style={{
            fontSize: 10,
            fill: "var(--muted-foreground)",
            fontWeight: 600,
            letterSpacing: "0.08em",
          }}
        >
          ANNUAL RAINFALL (mm)
        </text>

        {/* Bars */}
        {regions.map((r, i) => {
          const y = 20 + i * rowHeight
          const x1 = labelWidth + (r.rainfallMin / maxRain) * chartWidth
          const x2 = labelWidth + (r.rainfallMax / maxRain) * chartWidth
          const isActive = activeRegion === r.id
          const isDimmed = activeRegion !== null && activeRegion !== r.id
          return (
            <g
              key={r.id}
              opacity={isDimmed ? 0.4 : 1}
              className="transition-opacity cursor-pointer"
              onClick={() => onSelect?.(r.id)}
            >
              {/* Label */}
              <text
                x={labelWidth - 12}
                y={y + rowHeight / 2 - 2}
                textAnchor="end"
                dominantBaseline="central"
                className="font-serif"
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  fill: "var(--foreground)",
                }}
              >
                Region {r.roman}
              </text>
              {/* Track */}
              <rect
                x={labelWidth}
                y={y + 14}
                width={chartWidth}
                height={14}
                rx={7}
                fill="oklch(0.22 0.04 55 / 0.06)"
              />
              {/* Range bar */}
              <rect
                x={x1}
                y={y + 14}
                width={Math.max(6, x2 - x1)}
                height={14}
                rx={7}
                fill={r.colorVar}
                stroke={isActive ? "var(--foreground)" : "none"}
                strokeWidth={isActive ? 2 : 0}
              />
              {/* Value label */}
              <text
                x={x2 + 8}
                y={y + 21}
                dominantBaseline="central"
                style={{
                  fontSize: 11,
                  fill: "var(--muted-foreground)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {r.rainfallMin}–{r.rainfallMax}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
