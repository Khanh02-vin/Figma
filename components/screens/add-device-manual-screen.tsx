"use client";

import { useState } from "react";
import { ArrowLeft, ScanLine } from "lucide-react";

interface AddDeviceManualScreenProps {
  onBack: () => void;
  onNearbyDevices: () => void;
  onSelectDevice: (device: Device) => void;
  onScan: () => void;
}

interface Device {
  id: string;
  name: string;
  category: string;
  image: string;
}

const categories = ["Popular", "Lightning", "Camera", "Electrical", "Security", "Entertainment"];

const devices: Device[] = [
  { id: "1", name: "Smart V1 CCTV", category: "Camera", image: "cctv-v1" },
  { id: "2", name: "Smart Webcam", category: "Camera", image: "webcam" },
  { id: "3", name: "Smart V2 CCTV", category: "Camera", image: "cctv-v2" },
  { id: "4", name: "Smart Lamp", category: "Lightning", image: "lamp" },
  { id: "5", name: "Smart Speaker", category: "Entertainment", image: "speaker" },
  { id: "6", name: "Smart Router", category: "Electrical", image: "router" },
];

export function AddDeviceManualScreen({
  onBack,
  onNearbyDevices,
  onSelectDevice,
  onScan,
}: AddDeviceManualScreenProps) {
  const [activeTab, setActiveTab] = useState<"nearby" | "manual">("manual");
  const [selectedCategory, setSelectedCategory] = useState("Popular");

  const filteredDevices =
    selectedCategory === "Popular"
      ? devices
      : devices.filter((d) => d.category === selectedCategory);

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
          onClick={() => {
            setActiveTab("nearby");
            onNearbyDevices();
          }}
          className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "nearby"
              ? "bg-primary text-white"
              : "text-muted-foreground"
          }`}
        >
          Nearby Devices
        </button>
        <button
          onClick={() => setActiveTab("manual")}
          className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "manual"
              ? "bg-primary text-white"
              : "text-muted-foreground"
          }`}
        >
          Add Manual
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 px-4 py-4 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? "bg-primary text-white"
                : "bg-muted/50 text-muted-foreground border border-border"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Device Grid */}
      <div className="flex-1 px-4 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {filteredDevices.map((device) => (
            <button
              key={device.id}
              onClick={() => onSelectDevice(device)}
              className="bg-muted/30 rounded-2xl p-4 flex flex-col items-center hover:bg-muted/50 transition-colors"
            >
              <div className="w-full aspect-square flex items-center justify-center mb-3">
                <DeviceImage type={device.image} />
              </div>
              <span className="text-sm font-medium text-foreground text-center">
                {device.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function DeviceImage({ type }: { type: string }) {
  const baseClass = "w-24 h-24";

  switch (type) {
    case "cctv-v1":
      return (
        <svg viewBox="0 0 100 100" className={baseClass}>
          <ellipse cx="40" cy="60" rx="30" ry="30" fill="#F5F5F5" />
          <circle cx="40" cy="60" r="18" fill="#333" />
          <circle cx="40" cy="60" r="8" fill="#1a1a1a" />
          <rect x="65" y="40" width="25" height="20" fill="#F5F5F5" rx="3" />
          <rect x="85" y="35" width="8" height="30" fill="#E0E0E0" rx="2" />
        </svg>
      );
    case "webcam":
      return (
        <svg viewBox="0 0 100 100" className={baseClass}>
          <ellipse cx="50" cy="50" rx="30" ry="28" fill="#F5F5F5" />
          <circle cx="50" cy="45" r="15" fill="#333" />
          <circle cx="50" cy="45" r="6" fill="#1a1a1a" />
          <ellipse cx="50" cy="78" rx="15" ry="8" fill="#E0E0E0" />
        </svg>
      );
    case "cctv-v2":
      return (
        <svg viewBox="0 0 100 100" className={baseClass}>
          <rect x="20" y="35" width="50" height="35" fill="#F5F5F5" rx="5" />
          <circle cx="45" cy="52" r="12" fill="#333" />
          <rect x="70" y="40" width="20" height="10" fill="#E0E0E0" rx="2" />
          <rect x="85" y="30" width="5" height="45" fill="#D0D0D0" rx="2" />
        </svg>
      );
    case "lamp":
      return (
        <svg viewBox="0 0 100 100" className={baseClass}>
          <ellipse cx="50" cy="40" rx="30" ry="30" fill="#F5F5F5" stroke="#E8E8E8" strokeWidth="2" />
          <rect x="42" y="70" width="16" height="20" fill="#9E9E9E" rx="3" />
          <rect x="38" y="88" width="24" height="5" fill="#757575" rx="2" />
        </svg>
      );
    case "speaker":
      return (
        <svg viewBox="0 0 100 100" className={baseClass}>
          <ellipse cx="50" cy="60" rx="28" ry="35" fill="#F5F5F5" stroke="#E8E8E8" strokeWidth="2" />
          <ellipse cx="50" cy="30" rx="22" ry="8" fill="#E8E8E8" />
        </svg>
      );
    case "router":
      return (
        <svg viewBox="0 0 100 100" className={baseClass}>
          <rect x="15" y="50" width="70" height="25" fill="#F5F5F5" stroke="#E8E8E8" strokeWidth="2" rx="5" />
          <line x1="25" y1="50" x2="15" y2="25" stroke="#E0E0E0" strokeWidth="3" />
          <line x1="75" y1="50" x2="85" y2="25" stroke="#E0E0E0" strokeWidth="3" />
          <circle cx="15" cy="25" r="3" fill="#E0E0E0" />
          <circle cx="85" cy="25" r="3" fill="#E0E0E0" />
        </svg>
      );
    default:
      return null;
  }
}
