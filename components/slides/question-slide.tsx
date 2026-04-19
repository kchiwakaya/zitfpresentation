"use client"

import { useState } from "react"
import { regions } from "@/lib/regions"
import { HelpCircle, Check, X, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

type Question = {
  prompt: string
  answerId: number
  hint: string
}

const questions: Question[] = [
  {
    prompt: "Which region is Zimbabwe's main tea and coffee belt?",
    answerId: 1,
    hint: "Highest rainfall, deep red loams.",
  },
  {
    prompt: "Which region is known as the maize 'breadbasket'?",
    answerId: 2,
    hint: "700–1050 mm rainfall, sandy loams around Harare.",
  },
  {
    prompt:
      "Where does large-scale irrigated sugar cane production dominate?",
    answerId: 5,
    hint: "The hot, dry southern Lowveld — Chiredzi and Triangle.",
  },
  {
    prompt:
      "Which region best suits sorghum, pearl millet, and extensive cattle ranching?",
    answerId: 4,
    hint: "Semi-arid Matabeleland.",
  },
]

export function QuestionSlide() {
  const [qIndex, setQIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [showHint, setShowHint] = useState(false)

  const q = questions[qIndex]
  const isCorrect = picked === q.answerId

  const next = () => {
    setPicked(null)
    setShowHint(false)
    setQIndex((i) => (i + 1) % questions.length)
  }

  const reset = () => {
    setPicked(null)
    setShowHint(false)
  }

  return (
    <div className="h-full w-full p-8 lg:p-12 flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">
          <HelpCircle className="h-3.5 w-3.5" />
          Question {qIndex + 1} of {questions.length}
        </div>
        <div className="flex items-center gap-2">
          {picked !== null && (
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </button>
          )}
          <button
            onClick={next}
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-border hover:border-foreground/40 transition"
          >
            Next question →
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl md:text-5xl font-semibold text-balance leading-tight">
          {q.prompt}
        </h2>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-3 w-full">
          {regions.map((r) => {
            const isPicked = picked === r.id
            const showAsCorrect = picked !== null && r.id === q.answerId
            const showAsWrong = isPicked && !isCorrect

            return (
              <button
                key={r.id}
                onClick={() => picked === null && setPicked(r.id)}
                disabled={picked !== null}
                className={cn(
                  "group relative rounded-[2rem] border transition-all overflow-hidden",
                  "disabled:cursor-default shadow-xl",
                  picked === null && "hover:scale-[1.05] hover:shadow-2xl",
                  isPicked && showAsCorrect && "border-green-500/50 ring-2 ring-green-500/20",
                  showAsWrong && "border-red-500/50 ring-2 ring-red-500/20",
                  !isPicked &&
                    !showAsCorrect &&
                    "border-white/10 glass hover:border-white/20",
                  picked !== null && !isPicked && !showAsCorrect && "opacity-30 grayscale-[0.5]",
                )}
                style={{
                  backgroundColor: isPicked
                    ? `${r.colorVar}`
                    : "var(--card)",
                  color: isPicked ? "white" : "inherit",
                }}
              >
                <div className="p-5 flex flex-col h-full justify-between relative z-10">
                <div
                  className="font-serif text-3xl font-bold"
                  style={{ color: isPicked ? "white" : r.colorVar }}
                >
                  {r.roman}
                </div>
                <div
                  className={cn(
                    "text-[10px] sm:text-xs mt-1 font-medium leading-tight",
                    isPicked ? "text-white/90" : "text-muted-foreground",
                  )}
                >
                  {r.name.replace("The ", "")}
                </div>

                {showAsCorrect && (
                  <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-green-600 flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  </div>
                )}
                {showAsWrong && (
                  <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-red-500 flex items-center justify-center">
                    <X className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  </div>
                )}
                </div>
              </button>
            )
          })}
        </div>

        <div className="mt-8 min-h-[3rem]">
          {picked !== null ? (
            <div
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
                isCorrect
                  ? "bg-green-600/10 text-green-700"
                  : "bg-red-500/10 text-red-700",
              )}
            >
              {isCorrect ? "✓ Correct!" : "Not quite —"} {q.hint}
            </div>
          ) : (
            <button
              onClick={() => setShowHint((s) => !s)}
              className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
            >
              {showHint ? q.hint : "Need a hint?"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
