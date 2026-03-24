"use client"

import { cn } from "@/lib/utils"
import { LoadingSpinner } from "./loading-spinner"

interface LoadingModalProps {
  isOpen: boolean
  message?: string
  className?: string
}

export function LoadingModal({
  isOpen,
  message = "Loading...",
  className,
}: LoadingModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      {/* Modal */}
      <div
        className={cn(
          "relative z-10 flex flex-col items-center gap-4 rounded-3xl bg-background px-16 py-10 shadow-xl",
          className
        )}
      >
        <LoadingSpinner variant="light" size="lg" />
        <p className="text-lg font-medium text-foreground">{message}</p>
      </div>
    </div>
  )
}
