"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Mail, Lock, Eye, EyeOff, Search, X } from "lucide-react"

interface FormInputProps {
  type?: "email" | "password" | "text" | "search"
  label?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  icon?: "email" | "password" | "search" | "none"
  showClearButton?: boolean
  className?: string
}

export function FormInput({
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  icon = "none",
  showClearButton = false,
  className,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const inputType = type === "password" && showPassword ? "text" : type

  const IconComponent = {
    email: Mail,
    password: Lock,
    search: Search,
    none: null,
  }[icon]

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}
      <div
        className={cn(
          "flex items-center gap-3 rounded-2xl bg-input px-4 py-3.5 transition-all",
          isFocused && "ring-2 ring-primary/20"
        )}
      >
        {IconComponent && (
          <IconComponent className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        )}
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? (
              <Eye className="w-5 h-5" />
            ) : (
              <EyeOff className="w-5 h-5" />
            )}
          </button>
        )}
        {showClearButton && value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
}
