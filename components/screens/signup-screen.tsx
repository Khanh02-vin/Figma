"use client"

import { useState } from "react"
import { ArrowLeft, User } from "lucide-react"
import {
  FormInput,
  SocialButton,
  PrimaryButton,
  LoadingModal,
} from "@/components/smartify"

interface SignUpScreenProps {
  onBack: () => void
  onSignUp: (email: string, password: string) => void
  onSignIn: () => void
  onSocialLogin: (provider: "google" | "apple") => void
}

export function SignUpScreen({
  onBack,
  onSignUp,
  onSignIn,
  onSocialLogin,
}: SignUpScreenProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = () => {
    if (!email || !password || !agreedToTerms) return
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onSignUp(email, password)
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
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold text-foreground">
              Join Smartify Today
            </h1>
            <User className="w-8 h-8 text-primary" />
          </div>
          <p className="text-muted-foreground mb-8">
            Join Smartify, Your Gateway to Smart Living.
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

            {/* Terms checkbox */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAgreedToTerms(!agreedToTerms)}
                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                  agreedToTerms
                    ? "bg-primary border-primary"
                    : "border-primary bg-transparent"
                }`}
              >
                {agreedToTerms && (
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
              <p className="text-sm text-muted-foreground">
                I agree to Smartify{" "}
                <button className="text-primary font-medium">
                  Terms & Conditions
                </button>
                .
              </p>
            </div>

            {/* Sign in link */}
            <div className="text-center">
              <span className="text-muted-foreground text-sm">
                Already have an account?{" "}
              </span>
              <button
                onClick={onSignIn}
                className="text-primary font-medium text-sm"
              >
                Sign in
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
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-background">
          <PrimaryButton
            onClick={handleSubmit}
            disabled={!email || !password || !agreedToTerms}
          >
            Sign up
          </PrimaryButton>
        </div>
      </div>

      <LoadingModal isOpen={isLoading} message="Sign up..." />
    </>
  )
}
