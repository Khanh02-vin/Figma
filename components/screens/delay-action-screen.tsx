"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { PrimaryButton } from "@/components/smartify";

interface DelayActionScreenProps {
  onBack: () => void;
  onContinue?: () => void;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i); // 0-23
const MINUTES = Array.from({ length: 60 }, (_, i) => i); // 0-59
const SECONDS = Array.from({ length: 60 }, (_, i) => i); // 0-59

export function DelayActionScreen({ onBack, onContinue }: DelayActionScreenProps) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(15);
  const [seconds, setSeconds] = useState(30);

  const scrollColumn = (
    value: number,
    onChange: (v: number) => void,
    options: number[],
    label: string
  ) => {
    const currentIndex = options.indexOf(value);

    const go = (dir: number) => {
      const newIndex = Math.max(0, Math.min(options.length - 1, currentIndex + dir));
      onChange(options[newIndex]);
    };

    const prev = currentIndex > 0 ? options[currentIndex - 1] : null;
    const next = currentIndex < options.length - 1 ? options[currentIndex + 1] : null;

    return (
      <div className="flex flex-col items-center gap-1">
        {/* Up arrow */}
        <button
          onClick={() => go(-1)}
          className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-gray-700"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>

        {/* Values */}
        <div className="flex flex-col items-center">
          {prev !== null && (
            <span className="text-sm text-gray-300 h-8 leading-8">{String(prev).padStart(2, "0")}</span>
          )}
          <div className="relative h-12 flex items-center justify-center">
            <span className="text-3xl font-bold text-gray-900">
              {String(value).padStart(2, "0")}
            </span>
            <span className="text-base text-gray-400 ml-1">{label}</span>
          </div>
          {next !== null && (
            <span className="text-sm text-gray-300 h-8 leading-8">{String(next).padStart(2, "0")}</span>
          )}
        </div>

        {/* Down arrow */}
        <button
          onClick={() => go(1)}
          className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-gray-700"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    );
  };

  const formatDelay = () => {
    const parts = [];
    if (hours > 0) parts.push(`${hours} min${hours > 1 ? "s" : ""}`);
    if (minutes > 0) parts.push(`${minutes} min${minutes > 1 ? "s" : ""}`);
    if (seconds > 0) parts.push(`${seconds} secs${seconds > 1 ? "s" : ""}`);
    return parts.length > 0 ? parts.join(" ") : "0 seconds";
  };

  const formatDelayShort = () => {
    const parts = [];
    if (hours > 0) parts.push(`${hours} min${hours > 1 ? "s" : ""}`);
    if (minutes > 0) parts.push(`${minutes} min${minutes > 1 ? "s" : ""}`);
    if (seconds > 0) parts.push(`${seconds} secs`);
    return parts.length > 0 ? parts.join(" ") : "0 seconds";
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-white">
        <button onClick={onBack} className="p-1">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Delay the Action</h1>
        <div className="w-6" />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white rounded-3xl px-8 py-10 shadow-sm mx-4 w-full max-w-sm">
          {/* Column labels */}
          <div className="flex justify-around mb-4 px-4">
            <span className="w-16 text-center text-sm text-gray-400 font-medium">Hours</span>
            <span className="w-16 text-center text-sm text-gray-400 font-medium">Minutes</span>
            <span className="w-16 text-center text-sm text-gray-400 font-medium">Seconds</span>
          </div>

          {/* Picker */}
          <div className="flex items-center justify-around">
            {scrollColumn(hours, setHours, HOURS, "h")}
            <span className="text-3xl font-bold text-gray-300 -mt-8">:</span>
            {scrollColumn(minutes, setMinutes, MINUTES, "m")}
            <span className="text-3xl font-bold text-gray-300 -mt-8">:</span>
            {scrollColumn(seconds, setSeconds, SECONDS, "s")}
          </div>

          {/* Preview */}
          <p className="text-center text-sm text-muted-foreground mt-6">{formatDelay()}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-white border-t border-gray-100">
        <PrimaryButton
          onClick={() => {
            try {
              sessionStorage.setItem("pending_task", JSON.stringify({
                id: Date.now(),
                iconColor: "text-gray-500",
                iconBg: "bg-gray-100",
                label: "Delay the Action",
                sublabel: "Delay",
                detail: formatDelayShort(),
              }));
            } catch (_) {}
            if (onContinue) onContinue();
          }}
          className="w-full"
        >
          Continue
        </PrimaryButton>
      </div>
    </div>
  );
}
