"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, MoreVertical, Wifi, Bluetooth, Check, ScanLine } from "lucide-react";
import { LoadingModal } from "@/components/smartify/loading-modal";

interface ConnectingDeviceScreenProps {
  device: {
    name: string;
    type: "lamp" | "cctv" | "speaker";
  };
  onBack: () => void;
  onConnected: () => void;
  showTabs?: boolean;
}

export function ConnectingDeviceScreen({
  device,
  onBack,
  onConnected,
  showTabs = false,
}: ConnectingDeviceScreenProps) {
  const [progress, setProgress] = useState(0);
  const [processingDevice, setProcessingDevice] = useState(false);

  // Show processing modal briefly on mount
  useEffect(() => {
    setProcessingDevice(true);
    const timer = setTimeout(() => setProcessingDevice(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onConnected, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onConnected]);

  const strokeDasharray = 2 * Math.PI * 120;
  const strokeDashoffset = strokeDasharray - (progress / 100) * strokeDasharray;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button onClick={onBack} className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">
          {showTabs ? "Add Device" : "Device Detected"}
        </h1>
        <button className="p-2 -mr-2">
          {showTabs ? (
            <ScanLine className="w-6 h-6 text-foreground" />
          ) : (
            <MoreVertical className="w-6 h-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Tabs (optional) */}
      {showTabs && (
        <div className="flex mx-4 p-1 bg-muted/30 rounded-xl">
          <button className="flex-1 py-3 rounded-lg text-sm font-medium bg-primary text-white">
            Nearby Devices
          </button>
          <button className="flex-1 py-3 rounded-lg text-sm font-medium text-muted-foreground">
            Add Manual
          </button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 px-6 py-4">
        <h2 className="text-xl font-semibold text-foreground text-center mb-2">
          Connect to device
        </h2>

        {/* Connection Info */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Wifi className="w-4 h-4 text-primary" />
          </div>
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Bluetooth className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm text-muted-foreground">
            Turn on your Wifi & Bluetooth to connect
          </span>
        </div>

        {/* Device Name */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
            <Check className="w-4 h-4 text-primary" />
          </div>
          <span className="font-medium text-foreground">{device.name}</span>
        </div>

        {/* Progress Circle with Device */}
        <div className="flex items-center justify-center">
          <div className="relative w-64 h-64">
            {/* Background circle */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="120"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="6"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                fill="none"
                stroke="#4F5BD5"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-100"
              />
            </svg>

            {/* Device Image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <DeviceImage type={device.type} />
            </div>
          </div>
        </div>

        {/* Progress Text */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground mb-2">Connecting...</p>
          <p className="text-4xl font-bold text-primary">{progress}%</p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6">
        <p className="text-center text-muted-foreground text-sm">
          Can't connect with your devices?
        </p>
        <button className="block mx-auto text-primary text-sm font-medium mt-1">
          Learn more
        </button>
      </div>

      {/* Processing Device Modal */}
      <LoadingModal
        isOpen={processingDevice}
        message="Processing Device..."
      />
    </div>
  );
}

function DeviceImage({ type }: { type: "lamp" | "cctv" | "speaker" }) {
  switch (type) {
    case "lamp":
      return (
        <svg viewBox="0 0 100 130" className="w-28 h-36">
          <ellipse cx="50" cy="40" rx="35" ry="32" fill="#F5F5F5" />
          <ellipse cx="50" cy="40" rx="28" ry="25" fill="#FAFAFA" />
          <rect x="40" y="72" width="20" height="20" fill="#9E9E9E" rx="2" />
          <rect x="42" y="74" width="16" height="2" fill="#757575" />
          <rect x="42" y="78" width="16" height="2" fill="#757575" />
          <rect x="42" y="82" width="16" height="2" fill="#757575" />
          <rect x="44" y="92" width="12" height="6" fill="#616161" rx="1" />
        </svg>
      );
    case "cctv":
      return (
        <svg viewBox="0 0 130 130" className="w-36 h-36">
          <rect x="95" y="15" width="18" height="50" fill="#E0E0E0" rx="2" />
          <rect x="90" y="10" width="28" height="8" fill="#BDBDBD" rx="1" />
          <rect x="60" y="45" width="45" height="12" fill="#F5F5F5" rx="2" />
          <ellipse cx="40" cy="65" rx="32" ry="32" fill="#F5F5F5" />
          <ellipse cx="40" cy="65" rx="26" ry="26" fill="#E0E0E0" />
          <circle cx="40" cy="65" r="16" fill="#333" />
          <circle cx="40" cy="65" r="10" fill="#1a1a1a" />
          <circle cx="40" cy="65" r="5" fill="#333" />
          <circle cx="36" cy="61" r="2" fill="#4a4a4a" />
        </svg>
      );
    case "speaker":
      return (
        <svg viewBox="0 0 100 130" className="w-28 h-36">
          <ellipse cx="50" cy="80" rx="38" ry="45" fill="#F5F5F5" />
          <ellipse cx="50" cy="80" rx="35" ry="42" fill="#FAFAFA" />
          <ellipse cx="50" cy="40" rx="30" ry="10" fill="#E8E8E8" />
          <ellipse cx="50" cy="40" rx="25" ry="6" fill="#F0F0F0" />
        </svg>
      );
  }
}
