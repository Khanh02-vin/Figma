"use client"

import { useState } from "react"
import { ArrowLeft, MapPin } from "lucide-react"
import { ProgressBar, PrimaryButton } from "@/components/smartify"

interface SetLocationScreenProps {
  onBack: () => void
  onContinue: (address: string) => void
  onSkip: () => void
}

export function SetLocationScreen({
  onBack,
  onContinue,
  onSkip,
}: SetLocationScreenProps) {
  const [showPermissionModal, setShowPermissionModal] = useState(true)
  const [address, setAddress] = useState("")
  const [locationEnabled, setLocationEnabled] = useState(false)

  const handleEnableLocation = () => {
    // Simulate getting location
    setLocationEnabled(true)
    setAddress("701 7th Ave, New York, 10036, USA")
    setShowPermissionModal(false)
  }

  return (
    <>
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
            <ProgressBar currentStep={4} totalSteps={4} className="flex-1 mx-4" />
            <span className="text-sm text-muted-foreground font-medium">4 / 4</span>
          </div>

          <h1 className="text-2xl font-bold text-foreground text-center mb-2">
            Set Home <span className="text-primary">Location</span>
          </h1>
          <p className="text-muted-foreground text-center text-sm">
            {"Pin your home's location to enhance location-based features. Privacy is our priority."}
          </p>
        </div>

        {/* Map area */}
        <div className="flex-1 px-6">
          <div className="relative w-full h-64 bg-muted rounded-2xl overflow-hidden mb-6">
            {/* Simple map placeholder with grid lines */}
            <div className="absolute inset-0 opacity-30">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#888" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            
            {/* Location pin */}
            {locationEnabled && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <div className="w-4 h-4 rounded-full bg-white" />
                  </div>
                  <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-primary -mt-1" />
                </div>
              </div>
            )}
            
            {/* Street labels */}
            <div className="absolute inset-0 text-xs text-muted-foreground/60 font-medium">
              <span className="absolute top-8 left-4 rotate-[-30deg]">Clayton St</span>
              <span className="absolute top-20 right-8 rotate-[45deg]">Market St</span>
              <span className="absolute bottom-16 left-8">Twin Peaks</span>
              <span className="absolute bottom-8 right-4">23rd St</span>
            </div>
          </div>

          {/* Address input */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Address Details
            </label>
            <div className="bg-input rounded-2xl px-4 py-4">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-background">
          <div className="flex gap-4">
            <PrimaryButton variant="secondary" onClick={onSkip} className="flex-1">
              Skip
            </PrimaryButton>
            <PrimaryButton
              onClick={() => onContinue(address)}
              disabled={!address.trim()}
              className="flex-1"
            >
              Continue
            </PrimaryButton>
          </div>
        </div>
      </div>

      {/* Permission Modal */}
      {showPermissionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-sm bg-background rounded-3xl p-8 shadow-xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                Enable Location
              </h2>
              <p className="text-muted-foreground text-sm mb-8">
                Please activate the location feature, so we can find your home address.
              </p>
              <div className="w-full space-y-3">
                <PrimaryButton onClick={handleEnableLocation}>
                  Enable Location
                </PrimaryButton>
                <PrimaryButton
                  variant="secondary"
                  onClick={() => setShowPermissionModal(false)}
                >
                  Not Now
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
