"use client";

import { useState } from "react";
import { ArrowLeft, MoreVertical, Wifi, Bluetooth } from "lucide-react";

interface CategoryDevicesScreenProps {
  category: "lightning" | "cameras";
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

const lightningDevices = [
  { id: 1, name: "Smart Lamp", room: "Living Room", type: "bulb", isOn: true },
  { id: 2, name: "Lamp", room: "Bedroom", type: "tube", isOn: true },
  { id: 3, name: "Smart Lamp", room: "Bedroom", type: "bulb", isOn: false },
  { id: 4, name: "Smart Lamp", room: "Kitchen", type: "bulb", isOn: true },
  { id: 5, name: "Lamp", room: "Bathroom", type: "tube", isOn: true },
  { id: 6, name: "Smart Lamp", room: "Dining Room", type: "bulb", isOn: false },
  { id: 7, name: "Smart Lamp", room: "Toilet", type: "bulb", isOn: false },
  { id: 8, name: "Lamp", room: "Backyard", type: "bulb", isOn: true },
];

const cameraDevices = [
  { id: 1, name: "Smart V1 CCTV", room: "Living Room", hasLive: true, isOn: true },
  { id: 2, name: "Smart V2 CCTV", room: "Bedroom", hasLive: true, isOn: true },
  { id: 3, name: "Smart V3 CCTV", room: "Kitchen", hasLive: true, isOn: true },
  { id: 4, name: "Smart V1 CCTV", room: "Bathroom", hasLive: true, isOn: true },
  { id: 5, name: "Smart Webcam", room: "Toilet", hasLive: false, isOn: false },
  { id: 6, name: "Smart V1 CCTV", room: "Dining Room", hasLive: false, isOn: false },
  { id: 7, name: "Smart V2 CCTV", room: "Backyard", hasLive: false, isOn: false },
  { id: 8, name: "Smart V3 CCTV", room: "Backyard", hasLive: false, isOn: false },
];

export function CategoryDevicesScreen({ category, onBack, onNavigate }: CategoryDevicesScreenProps) {
  const devices = category === "lightning" ? lightningDevices : cameraDevices;
  const [deviceStates, setDeviceStates] = useState<Record<number, boolean>>(
    Object.fromEntries(devices.map(d => [d.id, d.isOn]))
  );

  const toggleDevice = (id: number) => {
    setDeviceStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const LampIcon = ({ type }: { type: string }) => (
    <div className="w-14 h-14 flex items-center justify-center">
      {type === "bulb" ? (
        <svg viewBox="0 0 40 40" className="w-12 h-12">
          <ellipse cx="20" cy="8" rx="8" ry="4" fill="#E5E7EB" />
          <path d="M12 8 L16 30 L24 30 L28 8" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1" />
          <rect x="15" y="30" width="10" height="4" fill="#9CA3AF" rx="1" />
        </svg>
      ) : (
        <svg viewBox="0 0 40 40" className="w-12 h-12">
          <rect x="16" y="4" width="8" height="28" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1" rx="2" />
          <rect x="14" y="32" width="12" height="4" fill="#9CA3AF" rx="1" />
        </svg>
      )}
    </div>
  );

  const CameraIcon = ({ type }: { type: string }) => (
    <div className="w-14 h-14 flex items-center justify-center">
      {type === "webcam" ? (
        <svg viewBox="0 0 40 40" className="w-12 h-12">
          <circle cx="20" cy="14" r="10" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" />
          <circle cx="20" cy="14" r="5" fill="#1F2937" />
          <rect x="16" y="24" width="8" height="10" fill="#E5E7EB" />
          <rect x="12" y="34" width="16" height="3" fill="#D1D5DB" rx="1" />
        </svg>
      ) : type === "v1" ? (
        <svg viewBox="0 0 40 40" className="w-12 h-12">
          <circle cx="20" cy="16" r="12" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" />
          <circle cx="20" cy="16" r="6" fill="#1F2937" />
          <rect x="16" y="28" width="8" height="8" fill="#E5E7EB" />
        </svg>
      ) : type === "v2" ? (
        <svg viewBox="0 0 40 40" className="w-12 h-12">
          <rect x="6" y="16" width="28" height="14" rx="4" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" />
          <circle cx="14" cy="23" r="4" fill="#1F2937" />
          <rect x="14" y="30" width="12" height="6" fill="#E5E7EB" />
        </svg>
      ) : (
        <svg viewBox="0 0 40 40" className="w-12 h-12">
          <rect x="4" y="14" width="24" height="12" rx="2" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" />
          <circle cx="16" cy="20" r="4" fill="#1F2937" />
          <polygon points="28,16 36,12 36,28 28,24" fill="#E5E7EB" />
        </svg>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-white">
        <button onClick={onBack} className="p-1">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">
          {category === "lightning" ? "Lightning" : "Cameras"} ({devices.length})
        </h1>
        <button>
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Devices Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {devices.map((device) => (
            <div
              key={device.id}
              className="bg-white rounded-xl overflow-hidden"
              onClick={() => onNavigate(category === "lightning" ? "control-lamp" : "control-cctv")}
            >
              {category === "cameras" && (device as any).hasLive && deviceStates[device.id] ? (
                <div className="relative h-28 bg-gradient-to-br from-amber-100 to-amber-50">
                  <span className="absolute top-2 left-2 flex items-center gap-1 text-xs text-white bg-black/50 px-2 py-0.5 rounded">
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                    Live
                  </span>
                  <div 
                    className="absolute top-2 right-2"
                    onClick={(e) => { e.stopPropagation(); toggleDevice(device.id); }}
                  >
                    <div className={`w-11 h-6 rounded-full p-0.5 transition-colors ${deviceStates[device.id] ? "bg-primary" : "bg-gray-300"}`}>
                      <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${deviceStates[device.id] ? "translate-x-5" : ""}`} />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 text-white">
                    <p className="text-sm font-medium">{device.name}</p>
                    <p className="text-xs opacity-80">{device.room}</p>
                  </div>
                </div>
              ) : (
                <div className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    {category === "lightning" ? (
                      <LampIcon type={(device as any).type} />
                    ) : (
                      <CameraIcon type={device.name.includes("V1") ? "v1" : device.name.includes("V2") ? "v2" : device.name.includes("V3") ? "v3" : "webcam"} />
                    )}
                    <div onClick={(e) => { e.stopPropagation(); toggleDevice(device.id); }}>
                      <div className={`w-11 h-6 rounded-full p-0.5 transition-colors ${deviceStates[device.id] ? "bg-primary" : "bg-gray-300"}`}>
                        <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${deviceStates[device.id] ? "translate-x-5" : ""}`} />
                      </div>
                    </div>
                  </div>
                  <p className="font-medium text-gray-900">{device.name}</p>
                  <p className="text-sm text-gray-500 mb-2">{device.room}</p>
                  <div className="flex items-center gap-1">
                    <Wifi className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">Wi-Fi</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
