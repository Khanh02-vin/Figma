"use client";

import { useState } from "react";
import { ArrowLeft, MapPin, ChevronDown } from "lucide-react";
import { PrimaryButton } from "@/components/smartify";

interface SunriseSunsetTriggerScreenProps {
  onBack: () => void;
  onContinue?: () => void;
}

const options = ["Sunset", "Sunrise"] as const;

export function SunriseSunsetTriggerScreen({ onBack, onContinue }: SunriseSunsetTriggerScreenProps) {
  const [selected, setSelected] = useState<string>("Sunset");

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-white">
        <button onClick={onBack} className="p-1">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Sunrise / Sunset</h1>
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

          {/* Options */}
          {options.map((option) => (
            <button
              key={option}
              onClick={() => setSelected(option)}
              className="flex items-center gap-4 w-full px-4 py-4 text-left border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selected === option ? "border-primary bg-primary" : "border-gray-300"
                }`}
              >
                {selected === option && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <span className={`font-medium ${selected === option ? "text-gray-900" : "text-gray-700"}`}>
                {option}
              </span>
            </button>
          ))}
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
