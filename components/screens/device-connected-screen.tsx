"use client";

import { Check } from "lucide-react";

interface DeviceConnectedScreenProps {
  device: {
    name: string;
    type: "lamp" | "cctv" | "speaker";
  };
  onGoHome: () => void;
  onControlDevice: () => void;
}

export function DeviceConnectedScreen({
  device,
  onGoHome,
  onControlDevice,
}: DeviceConnectedScreenProps) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Success Icon */}
        <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center mb-8">
          <Check className="w-12 h-12 text-white" strokeWidth={3} />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-3">Connected!</h1>
        <p className="text-muted-foreground text-center mb-8">
          You have connected to {device.name}.
        </p>

        {/* Device Image */}
        <div className="w-48 h-48 flex items-center justify-center">
          <DeviceImage type={device.type} />
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 flex gap-4">
        <button
          onClick={onGoHome}
          className="flex-1 py-4 rounded-full border-2 border-primary text-primary font-medium"
        >
          Go to Homepage
        </button>
        <button
          onClick={onControlDevice}
          className="flex-1 py-4 rounded-full bg-primary text-white font-medium"
        >
          Control Device
        </button>
      </div>
    </div>
  );
}

function DeviceImage({ type }: { type: "lamp" | "cctv" | "speaker" }) {
  switch (type) {
    case "lamp":
      return (
        <svg viewBox="0 0 100 130" className="w-32 h-40">
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
        <svg viewBox="0 0 140 140" className="w-40 h-40">
          <rect x="100" y="15" width="20" height="55" fill="#E0E0E0" rx="3" />
          <rect x="95" y="10" width="30" height="10" fill="#BDBDBD" rx="2" />
          <rect x="60" y="50" width="50" height="15" fill="#F5F5F5" rx="3" />
          <ellipse cx="40" cy="70" rx="35" ry="35" fill="#F5F5F5" />
          <ellipse cx="40" cy="70" rx="28" ry="28" fill="#E0E0E0" />
          <circle cx="40" cy="70" r="18" fill="#333" />
          <circle cx="40" cy="70" r="12" fill="#1a1a1a" />
          <circle cx="40" cy="70" r="6" fill="#333" />
          <circle cx="35" cy="65" r="3" fill="#4a4a4a" />
        </svg>
      );
    case "speaker":
      return (
        <svg viewBox="0 0 100 140" className="w-32 h-44">
          <ellipse cx="50" cy="85" rx="40" ry="50" fill="#F5F5F5" />
          <ellipse cx="50" cy="85" rx="37" ry="47" fill="#FAFAFA" />
          <ellipse cx="50" cy="40" rx="32" ry="12" fill="#E8E8E8" />
          <ellipse cx="50" cy="40" rx="27" ry="8" fill="#F0F0F0" />
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse
              key={i}
              cx="50"
              cy={40 + i * 2}
              rx={28 - i * 2}
              ry="1"
              fill="#D0D0D0"
            />
          ))}
        </svg>
      );
  }
}
