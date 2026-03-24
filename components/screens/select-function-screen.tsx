"use client";

import { useState } from "react";
import { ArrowLeft, MoreVertical } from "lucide-react";
import { PrimaryButton } from "@/components/smartify";

interface SelectFunctionScreenProps {
  onBack: () => void;
  onConfirm?: () => void;
  deviceName?: string;
  deviceRoom?: string;
}

export function SelectFunctionScreen({
  onBack,
  onConfirm,
  deviceName = "Air Conditioner",
  deviceRoom = "Living Room",
}: SelectFunctionScreenProps) {
  const [selected, setSelected] = useState<"on" | "off">("on");

  const handleOK = () => {
    // Save task to sessionStorage for TriggerConfigScreen to pick up
    try {
      sessionStorage.setItem("pending_task", JSON.stringify({
        id: Date.now(),
        iconColor: "text-blue-500",
        iconBg: "bg-blue-50",
        label: deviceName,
        sublabel: deviceRoom,
        detail: `Function: ${selected.toUpperCase()}`,
      }));
    } catch (_) {}
    if (onConfirm) onConfirm();
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-white">
        <button onClick={onBack} className="p-1">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Select Function</h1>
        <button>
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Device Illustration */}
        <div className="w-40 h-40 rounded-full bg-blue-50 flex items-center justify-center mb-6">
          <svg viewBox="0 0 80 60" className="w-24 h-20">
            {/* AC Unit */}
            <rect x="5" y="10" width="70" height="35" rx="4" fill="white" stroke="#3B82F6" strokeWidth="2" />
            <line x1="10" y1="40" x2="70" y2="40" stroke="#DBEAFE" strokeWidth="2" />
            <line x1="10" y1="43" x2="70" y2="43" stroke="#DBEAFE" strokeWidth="2" />
            {/* Air flow lines */}
            <line x1="20" y1="48" x2="15" y2="58" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="35" y1="48" x2="30" y2="58" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="50" y1="48" x2="45" y2="58" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="65" y1="48" x2="60" y2="58" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-1">{deviceName}</h2>
        <p className="text-sm text-gray-500 mb-8">{deviceRoom}</p>

        {/* Divider */}
        <div className="w-full border-t border-gray-200 mb-6" />
        <p className="w-full text-sm font-semibold text-gray-500 mb-4">Function</p>

        {/* Radio Options */}
        <div className="w-full space-y-3">
          <button
            onClick={() => setSelected("on")}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border-2 transition-colors ${
              selected === "on"
                ? "border-primary bg-primary/5"
                : "border-gray-200 bg-white"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                selected === "on" ? "border-primary bg-primary" : "border-gray-300"
              }`}
            >
              {selected === "on" && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
            <span className={`text-base font-medium ${selected === "on" ? "text-primary" : "text-gray-700"}`}>
              ON
            </span>
          </button>

          <button
            onClick={() => setSelected("off")}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border-2 transition-colors ${
              selected === "off"
                ? "border-primary bg-primary/5"
                : "border-gray-200 bg-white"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                selected === "off" ? "border-primary bg-primary" : "border-gray-300"
              }`}
            >
              {selected === "off" && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
            <span className={`text-base font-medium ${selected === "off" ? "text-primary" : "text-gray-700"}`}>
              OFF
            </span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-white border-t border-gray-100">
        <PrimaryButton onClick={handleOK} className="w-full">
          OK
        </PrimaryButton>
      </div>
    </div>
  );
}
