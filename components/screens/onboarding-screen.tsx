"use client"

import { useState } from "react"
import Image from "next/image"
import { PrimaryButton, PageIndicator } from "@/components/smartify"

interface OnboardingSlide {
  image: string
  title: string
  description: string
}

const slides: OnboardingSlide[] = [
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2_Light_walkthrough%201-UduSycaCmr5FhzkOwy6vmAiSWXudrE.png",
    title: "Empower Your Home, Simplify Your Life",
    description:
      "Transform your living space into a smarter, more connected home with Smartify. All at your fingertips.",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3_Light_walkthrough%202-1HiWczl5vJU4B3DJTrmCyawGk0vmNi.png",
    title: "Effortless Control, Automate, & Secure",
    description:
      "Smartify empowers you to control your devices, & automate your routines. Embrace a world where your home adapts to your needs",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4_Light_walkthrough%203-TW0eyFWADkJ5RAyTrmtOzacE5l7jrI.png",
    title: "Efficiency that Saves, Comfort that Lasts.",
    description:
      "Take control of your home's energy usage, set preferences, and enjoy a space that adapts to your needs while saving power.",
  },
]

interface OnboardingScreenProps {
  onComplete: () => void
  onSkip: () => void
}

export function OnboardingScreen({ onComplete, onSkip }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleContinue = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      onComplete()
    }
  }

  const slide = slides[currentSlide]
  const isLastSlide = currentSlide === slides.length - 1

  return (
    <div className="mobile-container flex flex-col bg-primary">
      {/* Phone mockup area */}
      <div className="relative flex-1 flex items-end justify-center pt-8 pb-4">
        <div className="relative w-64 h-[420px]">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-contain object-bottom"
            priority
          />
        </div>
      </div>

      {/* Content area */}
      <div className="bg-background rounded-t-[2rem] px-6 pt-8 pb-8">
        <h2 className="text-2xl font-bold text-foreground text-center mb-4 text-balance">
          {slide.title}
        </h2>
        <p className="text-muted-foreground text-center text-sm leading-relaxed mb-6 text-pretty">
          {slide.description}
        </p>

        <PageIndicator
          total={slides.length}
          current={currentSlide}
          className="mb-8"
        />

        {/* Buttons */}
        <div className="flex gap-4">
          <PrimaryButton variant="secondary" onClick={onSkip} className="flex-1">
            Skip
          </PrimaryButton>
          <PrimaryButton onClick={handleContinue} className="flex-1">
            {isLastSlide ? "Let's Get Started" : "Continue"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}
