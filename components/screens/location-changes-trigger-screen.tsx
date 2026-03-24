"use client";

import { ArrowLeft, ChevronRight } from "lucide-react";
import { PrimaryButton } from "@/components/smartify";

interface LocationChangesTriggerScreenProps {
  onBack: () => void;
  onArrive?: () => void;
  onLeave?: () => void;
}

export function LocationChangesTriggerScreen({ onBack, onArrive, onLeave }: LocationChangesTriggerScreenProps) {
  const locationOptions = [
    {
      id: "arrive",
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      title: '"Arrive at" a Preset Location',
      description: "Example: When I come home, turn on all the lights in the house.",
    },
    {
      id: "leave",
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
      title: '"Leave" a Preset Location',
      description: "Example: When I leave the house, turn off all devices.",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-white">
        <button onClick={onBack} className="p-1">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">When Location Changes</h1>
        <div className="w-6" />
      </div>

      {/* Content Card */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-4 mt-4 bg-white rounded-2xl overflow-hidden">
          {locationOptions.map((option, index) => (
            <button
              key={option.id}
              onClick={() => {
                if (option.id === "arrive" && onArrive) onArrive();
              }}
              className="flex items-start gap-4 w-full px-4 py-5 text-left border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-full ${option.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                {option.id === "arrive" ? (
                  <svg viewBox="0 0 24 24" className={`w-5 h-5 ${option.iconColor}`} fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 10 4 15 9 20" />
                    <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className={`w-5 h-5 ${option.iconColor}`} fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 10 20 15 15 20" />
                    <path d="M4 4v7a4 4 0 0 0 4 4h12" />
                  </svg>
                )}
              </div>
              {/* Text */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1">{option.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{option.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-white border-t border-gray-100">
        <PrimaryButton onClick={onArrive} className="w-full">
          Continue
        </PrimaryButton>
      </div>
    </div>
  );
}
