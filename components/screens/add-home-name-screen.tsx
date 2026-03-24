"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { ProgressBar, PrimaryButton } from "@/components/smartify"

interface AddHomeNameScreenProps {
  onBack: () => void
  onContinue: (homeName: string) => void
  onSkip: () => void
}

export function AddHomeNameScreen({
  onBack,
  onContinue,
  onSkip,
}: AddHomeNameScreenProps) {
  const [homeName, setHomeName] = useState("My Home")

  return (
    <div className="mobile-container flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="p-2 -ml-2 text-foreground hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <ProgressBar currentStep={2} totalSteps={4} className="flex-1 mx-4" />
          <span className="text-sm text-muted-foreground font-medium">2 / 4</span>
        </div>

        <h1 className="text-2xl font-bold text-foreground text-center mb-2">
          Add <span className="text-primary">Home</span> Name
        </h1>
        <p className="text-muted-foreground text-center text-sm mb-8">
          Every smart home needs a name. What would you like to call yours?
        </p>

        {/* Input */}
        <div className="bg-input rounded-2xl px-4 py-4">
          <input
            type="text"
            value={homeName}
            onChange={(e) => setHomeName(e.target.value)}
            placeholder="Enter home name"
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
          />
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer */}
      <div className="p-6 border-t border-border bg-background">
        <div className="flex gap-4">
          <PrimaryButton variant="secondary" onClick={onSkip} className="flex-1">
            Skip
          </PrimaryButton>
          <PrimaryButton
            onClick={() => onContinue(homeName)}
            disabled={!homeName.trim()}
            className="flex-1"
          >
            Continue
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}
