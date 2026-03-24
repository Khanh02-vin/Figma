"use client"

import { SmartifyLogo, SocialButton, PrimaryButton } from "@/components/smartify"

interface WelcomeScreenProps {
  onSignUp: () => void
  onSignIn: () => void
  onSocialLogin: (provider: "google" | "apple" | "facebook" | "twitter") => void
}

export function WelcomeScreen({
  onSignUp,
  onSignIn,
  onSocialLogin,
}: WelcomeScreenProps) {
  return (
    <div className="mobile-container flex flex-col bg-background px-6 py-12">
      {/* Logo */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <SmartifyLogo variant="light" size="lg" />
        
        <h1 className="mt-8 text-3xl font-bold text-foreground text-center">
          {"Let's Get Started!"}
        </h1>
        <p className="mt-2 text-muted-foreground text-center">
          {"Let's dive in into your account"}
        </p>
      </div>

      {/* Social login buttons */}
      <div className="space-y-3 mb-8">
        <SocialButton provider="google" onClick={() => onSocialLogin("google")} />
        <SocialButton provider="apple" onClick={() => onSocialLogin("apple")} />
        <SocialButton provider="facebook" onClick={() => onSocialLogin("facebook")} />
        <SocialButton provider="twitter" onClick={() => onSocialLogin("twitter")} />
      </div>

      {/* Sign up / Sign in buttons */}
      <div className="space-y-3 mb-8">
        <PrimaryButton onClick={onSignUp}>Sign up</PrimaryButton>
        <PrimaryButton variant="secondary" onClick={onSignIn}>
          Sign in
        </PrimaryButton>
      </div>

      {/* Footer links */}
      <div className="flex items-center justify-center gap-2 text-sm">
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          Privacy Policy
        </button>
        <span className="text-muted-foreground">·</span>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          Terms of Service
        </button>
      </div>
    </div>
  )
}
