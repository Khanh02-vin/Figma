"use client";

import { ArrowLeft, MoreVertical, Wifi, Bluetooth, Check } from "lucide-react";
import { PrimaryButton } from "@/components/smartify";

interface ConnectDeviceScreenProps {
  device: {
    name: string;
    type: "lamp" | "cctv" | "speaker";
  };
  onBack: () => void;
  onConnect: () => void;
}

export function ConnectDeviceScreen({
  device,
  onBack,
  onConnect,
}: ConnectDeviceScreenProps) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button onClick={onBack} className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Add Device</h1>
        <button className="p-2 -mr-2">
          <MoreVertical className="w-6 h-6 text-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6">
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

        {device.type === "lamp" && (
          <p className="text-muted-foreground text-center mb-6">
            Turn on the light and confirm whether the light blinks rapidly.
          </p>
        )}

        {/* Device Name */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
            <Check className="w-4 h-4 text-primary" />
          </div>
          <span className="font-medium text-foreground">{device.name}</span>
        </div>

        {/* Device Image */}
        <div className="flex items-center justify-center">
          <div className="w-64 h-64 bg-muted/20 rounded-3xl flex items-center justify-center">
            <DeviceImage type={device.type} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6">
        <PrimaryButton onClick={onConnect} className="max-w-xs mx-auto">
          Connect
        </PrimaryButton>
        <p className="text-center text-muted-foreground mt-4 text-sm">
          Can't connect with your devices?
        </p>
        <button className="block mx-auto text-primary text-sm font-medium mt-1">
          Learn more
        </button>
      </div>
    </div>
  );
}

function DeviceImage({ type }: { type: "lamp" | "cctv" | "speaker" }) {
  switch (type) {
    case "lamp":
      return (
        <svg viewBox="0 0 120 150" className="w-40 h-48">
          {/* Bulb glow */}
          <ellipse cx="60" cy="50" rx="50" ry="45" fill="#FFC107" opacity="0.3" />
          {/* Bulb */}
          <ellipse cx="60" cy="50" rx="40" ry="38" fill="#FFD54F" />
          <ellipse cx="60" cy="50" rx="30" ry="28" fill="#FFECB3" />
          {/* Base */}
          <rect x="45" y="88" width="30" height="25" fill="#9E9E9E" rx="3" />
          <rect x="48" y="90" width="24" height="3" fill="#757575" />
          <rect x="48" y="96" width="24" height="3" fill="#757575" />
          <rect x="48" y="102" width="24" height="3" fill="#757575" />
          <rect x="50" y="113" width="20" height="8" fill="#616161" rx="2" />
        </svg>
      );
    case "cctv":
      return (
        <svg viewBox="0 0 150 150" className="w-48 h-48">
          {/* Mount */}
          <rect x="110" y="20" width="20" height="60" fill="#E0E0E0" rx="3" />
          <rect x="105" y="15" width="30" height="10" fill="#BDBDBD" rx="2" />
          {/* Arm */}
          <rect x="70" y="50" width="50" height="15" fill="#F5F5F5" rx="3" />
          {/* Camera body */}
          <ellipse cx="45" cy="70" rx="35" ry="35" fill="#F5F5F5" />
          <ellipse cx="45" cy="70" rx="28" ry="28" fill="#E0E0E0" />
          {/* Lens */}
          <circle cx="45" cy="70" r="18" fill="#333" />
          <circle cx="45" cy="70" r="12" fill="#1a1a1a" />
          <circle cx="45" cy="70" r="6" fill="#333" />
          <circle cx="40" cy="65" r="3" fill="#4a4a4a" />
        </svg>
      );
    case "speaker":
      return (
        <svg viewBox="0 0 120 160" className="w-36 h-44">
          {/* Body */}
          <ellipse cx="60" cy="100" rx="45" ry="55" fill="#F5F5F5" />
          <ellipse cx="60" cy="100" rx="42" ry="52" fill="#FAFAFA" />
          {/* Top grill */}
          <ellipse cx="60" cy="50" rx="35" ry="12" fill="#E8E8E8" />
          <ellipse cx="60" cy="50" rx="30" ry="8" fill="#F0F0F0" />
          {/* Grill pattern */}
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse
              key={i}
              cx="60"
              cy={50 + i * 2}
              rx={32 - i * 2}
              ry="1"
              fill="#D0D0D0"
            />
          ))}
        </svg>
      );
  }
}
