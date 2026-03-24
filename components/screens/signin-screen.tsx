"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import {
  FormInput,
  SocialButton,
  PrimaryButton,
  LoadingModal,
} from "@/components/smartify"

interface SignInScreenProps {
  onBack: () => void
  onSignIn: (email: string, password: string) => void
  onForgotPassword: () => void
  onSocialLogin: (provider: "google" | "apple" | "facebook") => void
}

export function SignInScreen({
  onBack,
  onSignIn,
  onForgotPassword,
  onSocialLogin,
}: SignInScreenProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = () => {
    if (!email || !password) return
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onSignIn(email, password)
    }, 2000)
  }

  return (
    <>
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
        <div className="flex-1 px-6 overflow-y-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome Back! <span className="inline-block">👋</span>
          </h1>
          <p className="text-muted-foreground mb-8">
            Your Smart Home, Your Rules.
          </p>

          {/* Form */}
          <div className="space-y-6">
            <FormInput
              type="email"
              label="Email"
              placeholder="Email"
              value={email}
              onChange={setEmail}
              icon="email"
            />

            <FormInput
              type="password"
              label="Password"
              placeholder="Password"
              value={password}
              onChange={setPassword}
              icon="password"
            />

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                    rememberMe
                      ? "bg-primary border-primary"
                      : "border-primary bg-transparent"
                  }`}
                >
                  {rememberMe && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
                <span className="text-sm text-foreground">Remember me</span>
              </div>
              <button
                onClick={onForgotPassword}
                className="text-primary font-medium text-sm"
              >
                Forgot Password?
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-muted-foreground text-sm">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Social buttons */}
            <div className="space-y-3">
              <SocialButton
                provider="google"
                onClick={() => onSocialLogin("google")}
              />
              <SocialButton
                provider="apple"
                onClick={() => onSocialLogin("apple")}
              />
              <SocialButton
                provider="facebook"
                onClick={() => onSocialLogin("facebook")}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-background">
          <PrimaryButton onClick={handleSubmit} disabled={!email || !password}>
            Sign in
          </PrimaryButton>
        </div>
      </div>

      <LoadingModal isOpen={isLoading} message="Sign in..." />
    </>
  )
}
