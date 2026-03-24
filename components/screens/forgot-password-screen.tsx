"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { FormInput, PrimaryButton } from "@/components/smartify"

interface ForgotPasswordScreenProps {
  onBack: () => void
  onSendOTP: (email: string) => void
}

export function ForgotPasswordScreen({
  onBack,
  onSendOTP,
}: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState("")

  const handleSubmit = () => {
    if (!email) return
    onSendOTP(email)
  }

  return (
    <div className="mobile-container flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-foreground hover:bg-muted rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Forgot Your Password? <span className="inline-block">🔑</span>
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          {"We've got you covered. Enter your registered email to reset your password. We will send an OTP code to your email for the next steps."}
        </p>

        <FormInput
          type="email"
          label="Your Registered Email"
          placeholder="Email"
          value={email}
          onChange={setEmail}
          icon="email"
        />
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-border bg-background">
        <PrimaryButton onClick={handleSubmit} disabled={!email}>
          Send OTP Code
        </PrimaryButton>
      </div>
    </div>
  )
}
