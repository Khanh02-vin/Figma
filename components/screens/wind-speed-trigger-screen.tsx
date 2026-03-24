"use client";

import { useState } from "react";
import { ArrowLeft, MapPin, ChevronDown } from "lucide-react";
import { PrimaryButton } from "@/components/smartify";

interface WindSpeedTriggerScreenProps {
  onBack: () => void;
  onContinue?: () => void;
}

export function WindSpeedTriggerScreen({ onBack, onContinue }: WindSpeedTriggerScreenProps) {
  const [windSpeed, setWindSpeed] = useState(45);
  const [comparison, setComparison] = useState<"<" | "=" | ">">(">");

  const minSpeed = 0;
  const maxSpeed = 62;
  const speedPercent = ((windSpeed - minSpeed) / (maxSpeed - minSpeed)) * 100;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-white">
        <button onClick={onBack} className="p-1">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Wind Speed</h1>
        <div className="w-6" />
      </div>

      {/* Content Card */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-4 mt-4 bg-white rounded-2xl overflow-hidden">
          {/* Location */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">Location</span>
            </div>
            <button className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-900">New York City</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Comparison Toggle */}
          <div className="flex mx-4 my-4 bg-gray-100 rounded-xl p-1">
            {(["<", "=", ">"] as const).map((op) => (
              <button
                key={op}
                onClick={() => setComparison(op)}
                className={`flex-1 py-2.5 rounded-lg text-base font-medium transition-colors flex items-center justify-center ${
                  comparison === op ? "bg-primary text-white" : "text-gray-500"
                }`}
              >
                {op}
              </button>
            ))}
          </div>

          {/* Wind Speed Display */}
          <div className="px-6 pb-6">
            <div className="text-center mb-6">
              <div className="flex items-start justify-center">
                <span className="text-7xl font-light text-gray-900">{windSpeed}</span>
                <span className="text-3xl mt-2 text-gray-900">m/s</span>
              </div>
            </div>

            {/* Slider */}
            <div className="relative h-2 mb-2">
              <div className="absolute inset-0 bg-gray-200 rounded-full" />
              <div
                className="absolute left-0 top-0 bottom-0 bg-primary rounded-full"
                style={{ width: `${speedPercent}%` }}
              />
              <input
                type="range"
                min={minSpeed}
                max={maxSpeed}
                value={windSpeed}
                onChange={(e) => setWindSpeed(Number(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
              />
              {/* Thumb */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-primary rounded-full shadow"
                style={{ left: `calc(${speedPercent}% - 12px)` }}
              />
            </div>

            {/* Labels */}
            <div className="flex justify-between text-xs text-gray-400">
              <span>0 m/s</span>
              <span>62 m/s</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-white border-t border-gray-100">
        <PrimaryButton onClick={onContinue} className="w-full">
          Continue
        </PrimaryButton>
      </div>
    </div>
  );
}
