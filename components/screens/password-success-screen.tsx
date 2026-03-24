"use client";

import { Check } from "lucide-react";
import { PrimaryButton } from "@/components/smartify";

interface PasswordSuccessScreenProps {
  onGoHome: () => void;
}

export function PasswordSuccessScreen({ onGoHome }: PasswordSuccessScreenProps) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Success Icon */}
        <div className="w-28 h-28 rounded-full bg-primary flex items-center justify-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center relative">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
            {/* Phone frame decoration */}
            <div className="absolute top-2 w-8 h-1 bg-muted rounded-full" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-3">
          You're All Set!
        </h1>
        <p className="text-muted-foreground text-center">
          Your password has been successfully changed.
        </p>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-border">
        <PrimaryButton onClick={onGoHome}>Go to Homepage</PrimaryButton>
      </div>
    </div>
  );
}
