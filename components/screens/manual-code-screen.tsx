"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { PrimaryButton } from "@/components/smartify";
import { LoadingModal } from "@/components/smartify/loading-modal";

interface ManualCodeScreenProps {
  onBack: () => void;
  onContinue: () => void;
}

export function ManualCodeScreen({ onBack, onContinue }: ManualCodeScreenProps) {
  const [code, setCode] = useState("K7C0L6S2NX");
  const [processingDevice, setProcessingDevice] = useState(false);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center p-4">
        <button onClick={onBack} className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Enter setup code manually
        </h1>
        <p className="text-muted-foreground mb-8">
          Only applies to material devices only. Find the setup code on the
          device, packaging, or manual.
        </p>

        {/* Code Input */}
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className="w-full h-14 px-4 rounded-xl bg-muted/30 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-lg font-mono tracking-wider"
          placeholder="Enter setup code"
        />
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-border">
        <PrimaryButton
          onClick={() => {
            setProcessingDevice(true);
            setTimeout(() => {
              setProcessingDevice(false);
              onContinue();
            }, 2000);
          }}
          disabled={code.length < 6}
        >
          Continue
        </PrimaryButton>
      </div>

      {/* Processing Device Modal */}
      <LoadingModal
        isOpen={processingDevice}
        message="Processing Device..."
      />
    </div>
  );
}
