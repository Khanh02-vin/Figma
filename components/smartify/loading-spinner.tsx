"use client"

import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  variant?: "light" | "dark"
  className?: string
}

export function LoadingSpinner({
  size = "md",
  variant = "dark",
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  const strokeColor = variant === "light" ? "#4F46E5" : "white"

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <svg
        className="animate-spin-slow"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke={strokeColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="80 40"
          fill="none"
          opacity="0.8"
        />
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke={strokeColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="20 100"
          fill="none"
          opacity="0.3"
        />
      </svg>
    </div>
  )
}
