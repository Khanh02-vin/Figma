"use client";

import { useState } from "react";
import { ArrowLeft, MoreVertical, Wifi } from "lucide-react";

interface LightningScreenProps {
  onBack: () => void;
}

interface LightDevice {
  id: string;
  name: string;
  room: string;
  isOn: boolean;
  type: "bulb" | "tube";
}

const initialDevices: LightDevice[] = [
  { id: "1", name: "Smart Lamp", room: "Living Room", isOn: true, type: "bulb" },
  { id: "2", name: "Smart Lamp", room: "Bedroom", isOn: false, type: "bulb" },
  { id: "3", name: "Lamp", room: "Bathroom", isOn: true, type: "tube" },
  { id: "4", name: "Smart Lamp", room: "Toilet", isOn: true, type: "bulb" },
  { id: "5", name: "Lamp", room: "Bedroom", isOn: true, type: "tube" },
  { id: "6", name: "Smart Lamp", room: "Kitchen", isOn: true, type: "bulb" },
  { id: "7", name: "Smart Lamp", room: "Dining Room", isOn: false, type: "bulb" },
  { id: "8", name: "Lamp", room: "Backyard", isOn: true, type: "tube" },
];

function BulbIcon({ isOn, type }: { isOn: boolean; type: "bulb" | "tube" }) {
  const color = isOn ? "#F59E0B" : "#9CA3AF";
  const glow = isOn ? "filter: drop-shadow(0 0 4px #F59E0B);" : "";

  if (type === "tube") {
    return (
      <svg viewBox="0 0 40 40" className="w-10 h-10" style={{ filter: isOn ? "drop-shadow(0 0 6px #F59E0B)" : "none" }}>
        <rect x="8" y="16" width="24" height="8" rx="4" fill={color} />
        <rect x="10" y="18" width="20" height="4" rx="2" fill={isOn ? "#FCD34D" : "#D1D5DB"} />
        <rect x="17" y="24" width="6" height="4" rx="1" fill="#9CA3AF" />
        <rect x="15" y="28" width="10" height="3" rx="1" fill="#6B7280" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 40 40" className="w-10 h-10" style={{ filter: isOn ? "drop-shadow(0 0 6px #F59E0B)" : "none" }}>
      {/* Bulb */}
      <ellipse cx="20" cy="16" rx="10" ry="10" fill={color} />
      {isOn && <ellipse cx="20" cy="16" rx="7" ry="7" fill="#FCD34D" opacity="0.7" />}
      {/* Base */}
      <rect x="16" y="26" width="8" height="2" rx="1" fill="#9CA3AF" />
      <rect x="16" y="28" width="8" height="2" rx="1" fill="#9CA3AF" />
      <rect x="17" y="30" width="6" height="3" rx="1" fill="#6B7280" />
      {/* Filament */}
      {isOn && (
        <path d="M17 14 Q20 10 23 14" fill="none" stroke="#FEF3C7" strokeWidth="1.5" strokeLinecap="round" />
      )}
    </svg>
  );
}

export function LightningScreen({ onBack }: LightningScreenProps) {
  const [devices, setDevices] = useState(initialDevices);

  const toggle = (id: string) => {
    setDevices((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isOn: !d.isOn } : d))
    );
  };

  return (
    <div className="flex flex-col h-full bg-muted/20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white">
        <button onClick={onBack} className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">
          Lightning ({devices.filter((d) => d.isOn).length})
        </h1>
        <button className="p-2 -mr-2">
          <MoreVertical className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {devices.map((device) => (
            <div
              key={device.id}
              className="bg-white rounded-2xl p-4 flex flex-col gap-3"
            >
              {/* Icon */}
              <div className="flex items-center justify-between">
                <BulbIcon isOn={device.isOn} type={device.type} />
                {/* Toggle */}
                <button onClick={() => toggle(device.id)}>
                  <div
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
                      device.isOn ? "bg-primary" : "bg-gray-300"
                    }`}
                  >
                      <div
                        className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                          device.isOn ? "translate-x-5" : ""
                        }`}
                      />
                  </div>
                </button>
              </div>

              {/* Info */}
              <div>
                <p className="font-semibold text-foreground text-sm">{device.name}</p>
                <p className="text-xs text-muted-foreground">{device.room}</p>
              </div>

              {/* Connection tag */}
              <div className="flex items-center gap-1">
                <Wifi className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Wi-Fi</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
