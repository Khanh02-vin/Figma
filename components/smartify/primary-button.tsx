"use client"

import { cn } from "@/lib/utils"

interface PrimaryButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary"
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: "button" | "submit"
}

export function PrimaryButton({
  children,
  variant = "primary",
  onClick,
  disabled = false,
  className,
  type = "button",
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full rounded-full py-4 text-base font-semibold transition-all active:scale-[0.98]",
        variant === "primary" &&
          "bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50",
        variant === "secondary" &&
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        className
      )}
    >
      {children}
    </button>
  )
}
