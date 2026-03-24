"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";

interface OtpScreenProps {
  onBack: () => void;
  onVerify: () => void;
}

export function OtpScreen({ onBack, onVerify }: OtpScreenProps) {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [countdown, setCountdown] = useState(56);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 3) {
      setActiveIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      setTimeout(() => onVerify(), 500);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      setActiveIndex(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleNumpadClick = (num: string) => {
    if (num === "backspace") {
      const lastFilledIndex = otp.findLastIndex((digit) => digit !== "");
      if (lastFilledIndex >= 0) {
        const newOtp = [...otp];
        newOtp[lastFilledIndex] = "";
        setOtp(newOtp);
        setActiveIndex(lastFilledIndex);
        inputRefs.current[lastFilledIndex]?.focus();
      }
    } else if (num !== "*") {
      const firstEmptyIndex = otp.findIndex((digit) => digit === "");
      if (firstEmptyIndex >= 0) {
        handleInputChange(firstEmptyIndex, num);
      }
    }
  };

  const handleResend = () => {
    if (countdown === 0) {
      setCountdown(60);
      setOtp(["", "", "", ""]);
      setActiveIndex(0);
      inputRefs.current[0]?.focus();
    }
  };

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
          Enter OTP Code
        </h1>
        <p className="text-muted-foreground mb-8">
          Please check your email inbox for a message from Smartify. Enter the
          one-time verification code below.
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-4 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onFocus={() => setActiveIndex(index)}
              className={`w-16 h-20 text-center text-3xl font-semibold rounded-xl border-2 transition-all ${
                activeIndex === index
                  ? "border-primary bg-primary/5"
                  : "border-border bg-muted/30"
              }`}
            />
          ))}
        </div>

        {/* Countdown */}
        <p className="text-center text-muted-foreground mb-2">
          You can resend the code in{" "}
          <span className="text-primary font-medium">{countdown}</span> seconds
        </p>

        <button
          onClick={handleResend}
          disabled={countdown > 0}
          className={`block mx-auto text-sm ${
            countdown > 0
              ? "text-muted-foreground/50 cursor-not-allowed"
              : "text-primary"
          }`}
        >
          Resend code
        </button>
      </div>

      {/* Numpad */}
      <div className="bg-muted/30 p-4">
        <div className="grid grid-cols-3 gap-2">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "backspace"].map(
            (num) => (
              <button
                key={num}
                onClick={() => handleNumpadClick(num)}
                className="h-14 text-2xl font-medium rounded-lg hover:bg-muted transition-colors"
              >
                {num === "backspace" ? (
                  <svg
                    className="w-6 h-6 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414-6.414a2 2 0 011.414-.586H19a2 2 0 012 2v10a2 2 0 01-2 2h-8.172a2 2 0 01-1.414-.586L3 12z"
                    />
                  </svg>
                ) : (
                  num
                )}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
