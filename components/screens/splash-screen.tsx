"use client"

import { SmartifyLogo, LoadingSpinner } from "@/components/smartify"

interface SplashScreenProps {
  onComplete?: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <div className="mobile-container flex flex-col items-center justify-center bg-primary">
      <div className="flex-1 flex flex-col items-center justify-center">
        <SmartifyLogo variant="dark" size="lg" showText />
      </div>
      <div className="pb-20">
        <LoadingSpinner variant="dark" size="md" />
      </div>
    </div>
  )
}
