"use client"

import { cn } from "@/lib/utils"

interface PageIndicatorProps {
  total: number
  current: number
  className?: string
}

export function PageIndicator({ total, current, className }: PageIndicatorProps) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-2 rounded-full transition-all duration-300",
            index === current
              ? "w-8 bg-primary"
              : "w-2 bg-muted-foreground/30"
          )}
        />
      ))}
    </div>
  )
}
