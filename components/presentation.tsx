"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Sprout,
  Tractor,
  Wheat,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { regions } from "@/lib/regions"
import { TitleSlide } from "@/components/slides/title-slide"
import { OverviewSlide } from "@/components/slides/overview-slide"
import { RegionSlide } from "@/components/slides/region-slide"
import { ComparisonSlide } from "@/components/slides/comparison-slide"
import { QuestionSlide } from "@/components/slides/question-slide"
import { ThanksSlide } from "@/components/slides/thanks-slide"

const SLIDE_DURATION_MS = 18000 // auto-advance timing for booth kiosk mode

// Rotating ticker messages for the bottom banner — automation that keeps
// the kiosk display feeling alive between visitor interactions.
const TICKER_MESSAGES = [
  "Region I · Tea, coffee, potatoes & premium horticulture thrive in Manicaland",
  "Region II · Maize, tobacco, wheat and soybeans — the backbone of Zimbabwe's food system",
  "Region III · Mix crops with livestock — cotton, sunflower and beef together",
  "Region IV · Small grains save lives — sorghum and millet feed families when rains fail",
  "Region V · Sugar cane, citrus and safari conservancies turn dry land into export revenue",
  "A1 farmers · 5–6 ha plots · Start small, rotate crops, build goats & cattle as savings",
  "A2 farmers · commercial scale · Invest in irrigation, certification and value addition",
]

export function Presentation() {
  const [index, setIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [autoPlay, setAutoPlay] = useState(false)
  const [slideProgress, setSlideProgress] = useState(0)
  const [tickerIdx, setTickerIdx] = useState(0)
  const raf = useRef<number | null>(null)
  const startTs = useRef<number | null>(null)

  const slides = useMemo(
    () => [
      { key: "title", label: "Intro" },
      { key: "overview", label: "Overview" },
      ...regions.map((r) => ({
        key: `region-${r.id}`,
        label: `Region ${r.roman}`,
      })),
      { key: "comparison", label: "Compare" },
      { key: "question", label: "Quiz" },
      { key: "thanks", label: "Thanks" },
    ],
    [],
  )

  const go = useCallback(
    (next: number) => {
      setIndex(Math.max(0, Math.min(slides.length - 1, next)))
      startTs.current = null
      setSlideProgress(0)
    },
    [slides.length],
  )

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement) {
        const tag = e.target.tagName
        if (tag === "INPUT" || tag === "TEXTAREA") return
      }
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault()
        go(index + 1)
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault()
        go(index - 1)
      } else if (e.key === "Home") {
        go(0)
      } else if (e.key === "End") {
        go(slides.length - 1)
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen()
      } else if (e.key === "p" || e.key === "P") {
        setAutoPlay((p) => !p)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [index, slides.length, go])

  // Auto-advance loop (kiosk mode) — uses rAF to drive slide progress
  useEffect(() => {
    if (!autoPlay) {
      if (raf.current !== null) cancelAnimationFrame(raf.current)
      setSlideProgress(0)
      startTs.current = null
      return
    }
    const tick = (ts: number) => {
      if (startTs.current === null) startTs.current = ts
      const elapsed = ts - startTs.current
      const p = Math.min(1, elapsed / SLIDE_DURATION_MS)
      setSlideProgress(p)
      if (p >= 1) {
        setIndex((i) => (i + 1) % slides.length)
        startTs.current = ts
        setSlideProgress(0)
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current)
    }
  }, [autoPlay, slides.length])

  // Rotating ticker — always on, independent of slide auto-play
  useEffect(() => {
    const t = setInterval(() => {
      setTickerIdx((i) => (i + 1) % TICKER_MESSAGES.length)
    }, 6500)
    return () => clearInterval(t)
  }, [])

  // Track fullscreen changes
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener("fullscreenchange", handler)
    return () => document.removeEventListener("fullscreenchange", handler)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }

  const current = slides[index].key

  const renderSlide = () => {
    if (current === "title")
      return (
        <TitleSlide
          onStart={() => go(1)}
          onStartAuto={() => {
            setAutoPlay(true)
            go(1)
          }}
        />
      )
    if (current === "overview") return <OverviewSlide onJumpTo={go} />
    if (current.startsWith("region-")) {
      const id = Number(current.split("-")[1])
      const region = regions.find((r) => r.id === id)!
      return <RegionSlide region={region} />
    }
    if (current === "comparison") return <ComparisonSlide />
    if (current === "question") return <QuestionSlide />
    if (current === "thanks") return <ThanksSlide onRestart={() => go(0)} />
    return null
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-background bg-grain">
      {/* Top bar */}
      <header className="shrink-0 border-b border-border/80 bg-background/80 backdrop-blur-sm relative">
        <div className="mx-auto max-w-[1600px] px-4 md:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
              <Sprout className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground font-semibold leading-none">
                ZITF · Agricultural Presentation
              </div>
              <div className="text-sm font-semibold truncate">
                Zimbabwe&apos;s Five Natural Farming Regions
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {slides.map((s, i) => (
              <button
                key={s.key}
                onClick={() => go(i)}
                aria-label={`Go to ${s.label}`}
                title={s.label}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index
                    ? "w-8 bg-primary"
                    : "w-4 bg-border hover:bg-muted-foreground/40",
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoPlay((p) => !p)}
              className={cn(
                "h-8 px-2.5 rounded-full border text-[11px] font-semibold tracking-wider flex items-center gap-1.5 transition",
                autoPlay
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40",
              )}
              title={autoPlay ? "Pause auto-play (P)" : "Start auto-play (P)"}
            >
              {autoPlay ? (
                <Pause className="h-3 w-3" />
              ) : (
                <Play className="h-3 w-3" />
              )}
              AUTO
            </button>

            <div className="text-xs font-mono text-muted-foreground tabular-nums hidden sm:block">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </div>
            <button
              onClick={toggleFullscreen}
              className="h-8 w-8 rounded-md border border-border hover:border-foreground/40 flex items-center justify-center text-muted-foreground hover:text-foreground transition"
              aria-label="Toggle fullscreen"
              title="Toggle fullscreen (F)"
            >
              {isFullscreen ? (
                <Minimize2 className="h-3.5 w-3.5" />
              ) : (
                <Maximize2 className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Auto-play progress strip (under header) */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-transparent pointer-events-none">
          {autoPlay && (
            <div
              className="h-full bg-primary origin-left transition-transform"
              style={{
                transform: `scaleX(${slideProgress})`,
                width: "100%",
              }}
            />
          )}
        </div>
      </header>

      {/* Slide stage */}
      <main className="flex-1 relative overflow-hidden">
        <div
          key={current}
          className="absolute inset-0 animate-in fade-in slide-in-from-bottom-2 duration-500 overflow-y-auto"
        >
          {renderSlide()}
        </div>
      </main>

      {/* Rotating ticker */}
      <div className="shrink-0 border-t border-border/80 bg-primary/5 overflow-hidden">
        <div className="mx-auto max-w-[1600px] px-4 md:px-6 h-8 flex items-center gap-3">
          <div className="shrink-0 flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.22em] uppercase text-primary">
            <Wheat className="h-3 w-3" />
            Live Tip
          </div>
          <div
            key={tickerIdx}
            className="text-xs text-foreground/80 truncate animate-in fade-in slide-in-from-right-4 duration-500"
          >
            {TICKER_MESSAGES[tickerIdx]}
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <footer className="shrink-0 border-t border-border/80 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-[1600px] px-4 md:px-6 h-14 flex items-center justify-between gap-4">
          <button
            onClick={() => go(index - 1)}
            disabled={index === 0}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border text-sm hover:border-foreground/40 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="text-xs text-muted-foreground font-mono truncate flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1">
              <Tractor className="h-3 w-3" /> Booth Kiosk
            </span>
            <span className="hidden md:inline">·</span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded border border-border bg-card mr-1">
                ←
              </kbd>
              <kbd className="px-1.5 py-0.5 rounded border border-border bg-card mr-2">
                →
              </kbd>
              nav
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded border border-border bg-card">
                P
              </kbd>{" "}
              auto
            </span>
            <span className="hidden md:inline">
              <kbd className="px-1.5 py-0.5 rounded border border-border bg-card">
                F
              </kbd>{" "}
              full
            </span>
          </div>

          <button
            onClick={() => go(index + 1)}
            disabled={index === slides.length - 1}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-sm hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </footer>
    </div>
  )
}
