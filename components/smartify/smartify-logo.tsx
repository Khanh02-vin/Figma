"use client"

import { cn } from "@/lib/utils"

interface SmartifyLogoProps {
  variant?: "light" | "dark"
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
}

export function SmartifyLogo({
  variant = "dark",
  size = "md",
  showText = false,
  className,
}: SmartifyLogoProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-24 h-24",
  }

  const textSizeClasses = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-4xl",
  }

  const iconColor = variant === "light" ? "#4F46E5" : "white"
  const bgColor = variant === "light" ? "#4F46E5" : "white"
  const textColor = variant === "light" ? "text-foreground" : "text-white"

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div
        className={cn(
          "relative flex items-center justify-center rounded-2xl",
          sizeClasses[size]
        )}
        style={{ backgroundColor: variant === "light" ? bgColor : "transparent" }}
      >
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn("w-full h-full", variant === "dark" && "drop-shadow-lg")}
        >
          {/* House shape */}
          <path
            d="M40 8L12 32V68C12 70.2091 13.7909 72 16 72H64C66.2091 72 68 70.2091 68 68V32L40 8Z"
            fill={variant === "dark" ? "white" : bgColor}
            rx="8"
          />
          {/* WiFi waves */}
          <path
            d="M40 36C45.5228 36 50 40.4772 50 46"
            stroke={variant === "dark" ? "#4F46E5" : "white"}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M40 44C42.2091 44 44 45.7909 44 48"
            stroke={variant === "dark" ? "#4F46E5" : "white"}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M40 28C50.4934 28 59 36.5066 59 47"
            stroke={variant === "dark" ? "#4F46E5" : "white"}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <circle
            cx="40"
            cy="52"
            r="4"
            fill={variant === "dark" ? "#4F46E5" : "white"}
          />
        </svg>
      </div>
      {showText && (
        <span className={cn("font-semibold tracking-tight", textSizeClasses[size], textColor)}>
          Smartify
        </span>
      )}
    </div>
  )
}
