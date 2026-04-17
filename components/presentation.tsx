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

const SLIDE_DURATION_MS = 28000 // auto-advance timing for booth kiosk mode

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
    <div className="min-h-screen w-full flex flex-col bg-background bg-grain selection:bg-primary/20 overflow-hidden relative">
      {/* Cinematic Overlays */}
      <div className="fixed inset-0 pointer-events-none z-[100] vignette opacity-40" aria-hidden />
      <div className="fixed inset-0 pointer-events-none z-[100] bg-topo opacity-[0.03]" aria-hidden />

      {/* Top bar - Hidden on Title Slide for impact */}
      <header className={cn(
        "shrink-0 border-b border-white/5 bg-background/20 backdrop-blur-2xl relative z-50 transition-all duration-1000",
        current === "title" ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      )}>
        <div className="mx-auto max-w-[1600px] px-4 md:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="h-10 w-10 shrink-0 flex items-center justify-center glass rounded-xl">
              <img 
                src="/images/logo.jpg" 
                alt="Ministry of Lands Logo"
                className="max-h-full max-w-full object-contain brightness-0 invert opacity-80"
                loading="eager"
              />
            </div>
            <div className="min-w-0">
              <div className="text-[9px] tracking-[0.4em] uppercase text-accent font-bold leading-none mb-1">
                Ministry of Lands and Rural Development
              </div>
              <div className="text-sm font-serif font-bold tracking-wide">
                Zimbabwe&apos;s <span className="text-primary italic">Natural</span> Regions
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 glass px-4 py-2 rounded-full">
            {slides.map((s, i) => (
              <button
                key={s.key}
                onClick={() => go(i)}
                aria-label={`Go to ${s.label}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  i === index
                    ? "w-8 bg-accent"
                    : "w-2 bg-white/20 hover:bg-white/40",
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setAutoPlay((p) => !p)}
              className={cn(
                "h-9 px-4 rounded-full border text-[10px] font-bold tracking-[0.2em] flex items-center gap-2 transition-all active:scale-95 shadow-xl",
                autoPlay
                  ? "bg-accent text-accent-foreground border-accent"
                  : "glass text-white/60 hover:text-white hover:border-white/20",
              )}
            >
              {autoPlay ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
              AUTO
            </button>

            <button
              onClick={toggleFullscreen}
              className="h-9 w-9 rounded-xl glass flex items-center justify-center text-white/60 hover:text-white transition-all active:scale-95 shadow-xl"
              aria-label="Toggle fullscreen"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Auto-play progress strip */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5 pointer-events-none">
          {autoPlay && (
            <div
              className="h-full bg-accent origin-left transition-transform"
              style={{
                transform: `scaleX(${slideProgress})`,
                width: "100%",
              }}
            />
          )}
        </div>
      </header>

      {/* Slide stage */}
      <main className="flex-1 relative">
        <div
          key={current}
          className="absolute inset-0 animate-cinematic-in"
        >
          {renderSlide()}
        </div>
      </main>

      {/* Footer - Subtle & Cinematic */}
      <footer className={cn(
        "shrink-0 bg-background/20 backdrop-blur-2xl z-50 border-t border-white/5 transition-all duration-1000",
        current === "title" ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
      )}>
        <div className="mx-auto max-w-[1600px] px-4 md:px-8 h-16 flex items-center justify-between gap-4">
          <button
            onClick={() => go(index - 1)}
            disabled={index === 0}
            className="group flex items-center gap-3 px-5 py-2.5 rounded-full glass text-xs font-bold tracking-[0.2em] hover:bg-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed uppercase"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Prev
          </button>

          <div className="hidden md:flex items-center gap-6 glass px-6 py-2.5 rounded-full text-[9px] font-bold tracking-[0.3em] uppercase text-white/40">
            <div className="flex items-center gap-2">
              <Tractor className="h-3 w-3 text-accent" />
              <span>Booth Mode</span>
            </div>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <div className="flex items-center gap-3">
              <span className="flex gap-1.5"><kbd className="opacity-60">←</kbd> <kbd className="opacity-60">→</kbd></span>
              <span className="opacity-40">Navigate</span>
            </div>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <div
              key={tickerIdx}
              className="text-white/60 min-w-0 max-w-sm animate-in fade-in slide-in-from-right-4 duration-500 leading-snug"
            >
              {TICKER_MESSAGES[tickerIdx]}
            </div>
          </div>

          <button
            onClick={() => go(index + 1)}
            disabled={index === slides.length - 1}
            className="group flex items-center gap-3 px-6 py-2.5 rounded-full bg-accent text-accent-foreground text-xs font-bold tracking-[0.2em] hover:scale-105 active:scale-95 transition-all disabled:opacity-20 disabled:cursor-not-allowed uppercase shadow-xl"
          >
            Next
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </footer>
    </div>
  )
}
