"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Wifi, Bluetooth, ScanLine } from "lucide-react";
import { PrimaryButton } from "@/components/smartify";

interface AddDeviceNearbyScreenProps {
  onBack: () => void;
  onManualAdd: () => void;
  onConnectAll: () => void;
  onScan: () => void;
}

const devices = [
  { id: 1, name: "Smart Lamp", image: "lamp", position: { x: 15, y: 20 } },
  { id: 2, name: "Smart V1 CCTV", image: "cctv", position: { x: 70, y: 15 } },
  { id: 3, name: "Smart Speaker", image: "speaker", position: { x: 10, y: 60 } },
  { id: 4, name: "Smart Router", image: "router", position: { x: 75, y: 55 } },
  { id: 5, name: "Smart AC", image: "ac", position: { x: 45, y: 85 } },
];

export function AddDeviceNearbyScreen({
  onBack,
  onManualAdd,
  onConnectAll,
  onScan,
}: AddDeviceNearbyScreenProps) {
  const [activeTab, setActiveTab] = useState<"nearby" | "manual">("nearby");
  const [showDevices, setShowDevices] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setShowDevices(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseAnimation((prev) => (prev + 1) % 4);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button onClick={onBack} className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Add Device</h1>
        <button onClick={onScan} className="p-2 -mr-2">
          <ScanLine className="w-6 h-6 text-foreground" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex mx-4 p-1 bg-muted/30 rounded-xl">
        <button
          onClick={() => setActiveTab("nearby")}
          className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "nearby"
              ? "bg-primary text-white"
              : "text-muted-foreground"
          }`}
        >
          Nearby Devices
        </button>
        <button
          onClick={() => {
            setActiveTab("manual");
            onManualAdd();
          }}
          className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "manual"
              ? "bg-primary text-white"
              : "text-muted-foreground"
          }`}
        >
          Add Manual
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6">
        <h2 className="text-xl font-semibold text-foreground text-center mb-2">
          Looking for nearby devices...
        </h2>

        {/* Connection Info */}
        <div className="flex items-center justify-center gap-2 mb-8">
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

        {/* Radar View */}
        <div className="relative w-full aspect-square max-w-xs mx-auto">
          {/* Concentric Circles */}
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`absolute inset-0 rounded-full border transition-opacity duration-500 ${
                pulseAnimation === index
                  ? "border-primary/40"
                  : "border-primary/10"
              }`}
              style={{
                margin: `${index * 20}%`,
              }}
            />
          ))}

          {/* Center User Avatar */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full overflow-hidden border-2 border-primary z-10">
            <div className="w-full h-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <circle cx="20" cy="15" r="8" fill="#D4A574" />
                <ellipse cx="20" cy="35" rx="12" ry="10" fill="#D4A574" />
                <path d="M12 10 Q20 0 28 10 Q28 20 20 22 Q12 20 12 10" fill="#8B6914" />
              </svg>
            </div>
          </div>

          {/* Devices */}
          {showDevices &&
            devices.map((device) => (
              <div
                key={device.id}
                className="absolute w-14 h-14 transition-all duration-700 animate-fade-in"
                style={{
                  left: `${device.position.x}%`,
                  top: `${device.position.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="w-full h-full bg-white rounded-xl shadow-md flex items-center justify-center p-2">
                  <DeviceIcon type={device.image} />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6">
        <PrimaryButton onClick={onConnectAll}>
          Connect to All Devices
        </PrimaryButton>
        <p className="text-center text-muted-foreground mt-4 text-sm">
          Can't find your devices?
        </p>
        <button className="block mx-auto text-primary text-sm font-medium mt-1">
          Learn more
        </button>
      </div>
    </div>
  );
}

function DeviceIcon({ type }: { type: string }) {
  switch (type) {
    case "lamp":
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8">
          <ellipse cx="20" cy="15" rx="12" ry="12" fill="#F5F5F5" stroke="#E0E0E0" />
          <rect x="17" y="27" width="6" height="8" fill="#9E9E9E" rx="1" />
        </svg>
      );
    case "cctv":
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8">
          <circle cx="15" cy="22" r="10" fill="#F5F5F5" stroke="#E0E0E0" />
          <circle cx="15" cy="22" r="5" fill="#333" />
          <rect x="25" y="18" width="12" height="8" fill="#F5F5F5" stroke="#E0E0E0" rx="1" />
        </svg>
      );
    case "speaker":
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8">
          <ellipse cx="20" cy="25" rx="12" ry="14" fill="#F5F5F5" stroke="#E0E0E0" />
          <ellipse cx="20" cy="12" rx="10" ry="3" fill="#E8E8E8" />
        </svg>
      );
    case "router":
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8">
          <rect x="8" y="22" width="24" height="10" fill="#F5F5F5" stroke="#E0E0E0" rx="2" />
          <line x1="12" y1="22" x2="8" y2="10" stroke="#E0E0E0" strokeWidth="2" />
          <line x1="28" y1="22" x2="32" y2="10" stroke="#E0E0E0" strokeWidth="2" />
        </svg>
      );
    case "ac":
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8">
          <rect x="5" y="15" width="30" height="12" fill="#F5F5F5" stroke="#E0E0E0" rx="2" />
          <line x1="8" y1="24" x2="32" y2="24" stroke="#E0E0E0" />
        </svg>
      );
    default:
      return null;
  }
}
