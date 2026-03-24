"use client";

import { ArrowLeft, MoreVertical } from "lucide-react";
import { PrimaryButton } from "@/components/smartify";

interface ArriveAtLocationScreenProps {
  onBack: () => void;
  onConfirm?: () => void;
}

export function ArriveAtLocationScreen({ onBack, onConfirm }: ArriveAtLocationScreenProps) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-white">
        <button onClick={onBack} className="p-1">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Arrive at</h1>
        <button>
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Map View */}
      <div className="relative flex-1 bg-gray-200 overflow-hidden">
        {/* Stylized map background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200">
          {/* Grid lines to simulate map */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-px bg-gray-300/50"
              style={{ top: `${i * 5}%` }}
            />
          ))}
          {[...Array(12)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-px bg-gray-300/50"
              style={{ left: `${i * 8.33}%` }}
            />
          ))}
        </div>

        {/* Location pin */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Outer pulse ring */}
          <div className="absolute w-48 h-48 rounded-full bg-blue-200/30 animate-ping" />
          {/* Middle ring */}
          <div className="absolute w-32 h-32 rounded-full bg-blue-200/40" />
          {/* Blue pin circle */}
          <div className="relative w-20 h-20 rounded-full bg-white border-4 border-blue-500 flex items-center justify-center overflow-hidden">
            {/* Person photo placeholder */}
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-12 h-12">
                <circle cx="20" cy="15" r="8" fill="#3B82F6" opacity="0.4" />
                <circle cx="20" cy="35" r="14" fill="#3B82F6" opacity="0.3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Map labels (random street names) */}
        <div className="absolute top-6 left-4 text-xs text-gray-400 font-medium">Market St</div>
        <div className="absolute top-12 right-4 text-xs text-gray-400 font-medium">Twin Peaks</div>
        <div className="absolute top-24 left-8 text-xs text-gray-400 font-medium">Hoffman Ave</div>
        <div className="absolute bottom-24 right-6 text-xs text-gray-400 font-medium">24th St</div>
        <div className="absolute bottom-16 left-6 text-xs text-gray-400 font-medium">Crown Ct</div>
      </div>

      {/* Address Details */}
      <div className="bg-white px-4 py-4 border-t border-gray-200">
        <p className="text-sm font-semibold text-gray-500 mb-2">Address Details</p>
        <div className="bg-gray-100 rounded-xl px-4 py-3">
          <p className="text-sm font-medium text-gray-900">701 7th Ave, New York, 10036, USA</p>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="p-4 bg-white border-t border-gray-100">
        <PrimaryButton onClick={onConfirm} className="w-full">
          Confirm
        </PrimaryButton>
      </div>
    </div>
  );
}
