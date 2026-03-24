"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface VoiceAssistantScreenProps {
  onClose: () => void;
  onCommand?: (cmd: string) => void;
}

const WAVEFORM_BARS = 28;
const COLORS = [
  "#F97316", // orange
  "#A855F7", // purple
  "#22C55E", // green
  "#06B6D4", // cyan
  "#3B82F6", // blue
  "#22C55E", // green
  "#F97316", // orange
  "#A855F7", // purple
];

export function VoiceAssistantScreen({ onClose }: VoiceAssistantScreenProps) {
  const [phase, setPhase] = useState<"idle" | "listening" | "responding">("listening");
  const [dots, setDots] = useState(0);
  const animationRef = useRef<number>(0);
  const [bars, setBars] = useState<number[]>(Array(WAVEFORM_BARS).fill(4));
  const [orbRotation, setOrbRotation] = useState(0);

  // Typing dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d + 1) % 4);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Waveform animation
  useEffect(() => {
    let frame = 0;
    const animate = () => {
      frame++;
      setBars(
        Array.from({ length: WAVEFORM_BARS }, (_, i) => {
          const center = WAVEFORM_BARS / 2;
          const dist = Math.abs(i - center) / center;
          const base = 8 + Math.sin(frame * 0.08 + i * 0.5) * 6;
          return Math.max(3, Math.round(base * (1 - dist * 0.4)));
        })
      );
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  // Orb rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setOrbRotation((r) => r + 1.2);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const dotsStr = ".".repeat(dots);

  return (
    <div className="relative flex flex-col h-full bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button onClick={onClose} className="p-2 -ml-2">
          <X className="w-6 h-6 text-muted-foreground" />
        </button>
      </div>

      {/* Listening Text */}
      <div className="text-center px-6 mt-4">
        <p className="text-sm text-muted-foreground tracking-wide">
          We are listening{dotsStr}
        </p>
        <p className="text-base text-muted-foreground mt-1">What do you want to do?</p>

        {/* Suggested command */}
        <div className="mt-6 inline-block">
          <p className="text-lg font-semibold text-foreground italic">
            "Turn on all the lights in the entire room"
          </p>
        </div>
      </div>

      {/* Waveform */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="flex items-center justify-center gap-[3px] w-full max-w-sm">
          {bars.map((height, i) => (
            <div
              key={i}
              className="w-1 rounded-full transition-all duration-75"
              style={{
                height: `${height * 4}px`,
                backgroundColor: COLORS[i % COLORS.length],
                opacity: 0.7 + (height / 20) * 0.3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Glowing Orb */}
      <div className="flex justify-center pb-16">
        <div className="relative w-24 h-24">
          {/* Outer glow rings */}
          <div
            className="absolute inset-0 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)",
              transform: `scale(1.4)`,
            }}
          />
          <div
            className="absolute inset-0 rounded-full opacity-15"
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)",
              transform: `scale(1.7)`,
            }}
          />
          <div
            className="absolute inset-0 rounded-full opacity-10"
            style={{
              background: "radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)",
              transform: `scale(2.1)`,
            }}
          />

          {/* Spinning orb */}
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "radial-gradient(circle at 30% 30%, #60A5FA, #3B82F6 40%, #6366F1 60%, #8B5CF6 80%, #A855F7)",
              boxShadow: "0 0 30px rgba(59,130,246,0.5), 0 0 60px rgba(139,92,246,0.3)",
              transform: `rotate(${orbRotation}deg)`,
              transition: "transform 16ms linear",
            }}
          >
            {/* Inner swirl lines */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              style={{ transform: `rotate(-${orbRotation * 1.5}deg)`, transition: "transform 16ms linear" }}
            >
              <defs>
                <radialGradient id="orbGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#BFDBFE" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* Swirl arcs */}
              <path
                d="M 50 15 A 35 35 0 0 1 85 50"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M 85 50 A 35 35 0 0 1 50 85"
                fill="none"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M 50 85 A 35 35 0 0 1 15 50"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M 15 50 A 35 35 0 0 1 50 15"
                fill="none"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Highlight */}
              <circle cx="38" cy="35" r="6" fill="rgba(255,255,255,0.3)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
