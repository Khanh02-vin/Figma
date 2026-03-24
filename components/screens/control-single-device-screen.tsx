"use client";

import { useState } from "react";
import { ArrowLeft, MoreVertical, ChevronRight, Wifi, Bluetooth } from "lucide-react";

interface ControlSingleDeviceScreenProps {
  onBack: () => void;
}

const categories = [
  { label: "Lightning", icon: "bulb", color: "bg-yellow-50", textColor: "text-orange-500", count: "12 lights" },
  { label: "Cameras", icon: "camera", color: "bg-purple-50", textColor: "text-purple-500", count: "8 cameras" },
  { label: "Electrical", icon: "plug", color: "bg-red-50", textColor: "text-red-500", count: "6 devices" },
];

const devices = [
  { name: "Smart Lamp", room: "Living Room", type: "lamp", connection: "wifi" },
  { name: "Smart V1 CCTV", room: "Living Room", type: "cctv", connection: "wifi" },
  { name: "Stereo Speaker", room: "Living Room", type: "speaker", connection: "bluetooth" },
  { name: "Router", room: "Living Room", type: "router", connection: "wifi" },
  { name: "Air Conditioner", room: "Living Room", type: "ac", connection: "bluetooth" },
  { name: "Smart Webcam", room: "Living Room", type: "webcam", connection: "wifi" },
  { name: "Smart V2 CCTV", room: "Living Room", type: "cctv", connection: "wifi" },
];

function DeviceIcon({ type }: { type: string }) {
  switch (type) {
    case "lamp":
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8">
          <ellipse cx="20" cy="8" rx="8" ry="4" fill="#E5E7EB" />
          <path d="M12 8 L16 32 L24 32 L28 8" fill="white" stroke="#E5E7EB" strokeWidth="1" />
          <rect x="15" y="32" width="10" height="4" fill="#9CA3AF" rx="1" />
        </svg>
      );
    case "cctv":
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8">
          <circle cx="20" cy="20" r="12" fill="white" stroke="#E5E7EB" strokeWidth="1" />
          <circle cx="20" cy="20" r="6" fill="#1F2937" />
        </svg>
      );
    case "speaker":
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8">
          <rect x="10" y="12" width="20" height="20" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1" />
          <ellipse cx="20" cy="10" rx="8" ry="3" fill="#E5E7EB" />
        </svg>
      );
    case "router":
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8">
          <rect x="8" y="20" width="24" height="12" rx="2" fill="white" stroke="#E5E7EB" strokeWidth="1" />
          <line x1="12" y1="20" x2="12" y2="12" stroke="#9CA3AF" strokeWidth="2" />
          <line x1="20" y1="20" x2="20" y2="8" stroke="#9CA3AF" strokeWidth="2" />
          <line x1="28" y1="20" x2="28" y2="12" stroke="#9CA3AF" strokeWidth="2" />
        </svg>
      );
    case "ac":
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8">
          <rect x="6" y="14" width="28" height="14" rx="2" fill="white" stroke="#E5E7EB" strokeWidth="1" />
          <line x1="10" y1="24" x2="30" y2="24" stroke="#D1D5DB" strokeWidth="1" />
          <line x1="10" y1="26" x2="30" y2="26" stroke="#D1D5DB" strokeWidth="1" />
        </svg>
      );
    case "webcam":
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8">
          <circle cx="20" cy="16" r="10" fill="white" stroke="#E5E7EB" strokeWidth="1" />
          <circle cx="20" cy="16" r="5" fill="#1F2937" />
          <rect x="16" y="26" width="8" height="8" fill="#E5E7EB" />
        </svg>
      );
    default:
      return <div className="w-8 h-8 bg-gray-200 rounded-full" />;
  }
}

export function ControlSingleDeviceScreen({ onBack }: ControlSingleDeviceScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState("All Rooms");
  const [selectedRoom, setSelectedRoom] = useState("Living Room");

  const rooms = [
    { label: "All Rooms", count: 37 },
    { label: "Living Room", count: 8 },
    { label: "Bedroom", count: 5 },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-white">
        <button onClick={onBack} className="p-1">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Control Single Device</h1>
        <button>
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Category Cards */}
        <div className="flex gap-3 px-4 py-4 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setSelectedCategory(cat.label)}
              className={`flex-shrink-0 flex flex-col items-center gap-1 px-4 py-3 rounded-xl ${cat.color} min-w-[90px]`}
            >
              <div className={`w-8 h-8 flex items-center justify-center ${cat.textColor}`}>
                {cat.label === "Lightning" && (
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm2 14H9v-1h5v1zm1.31-3.26L13 14.45V16H11v-1.55l-2.31-1.71A5.98 5.98 0 0 0 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5a5.98 5.98 0 0 0-1.69 3.74z"/>
                  </svg>
                )}
                {cat.label === "Cameras" && (
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                    <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z"/>
                  </svg>
                )}
                {cat.label === "Electrical" && (
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                    <path d="M16 6V4h-3V2h-2v2H8V2H6v2H3v3h1l1 12.5V22h3v-3.5l1-1V22h3v-3.5l1-1V9h1V6h-2zm-3 10.5L12 19l-1-2.5L11 14h2l.5 2.5.5-2.5h2l-2 2.5z"/>
                  </svg>
                )}
              </div>
              <span className="text-xs font-medium text-gray-900">{cat.label}</span>
              <span className="text-xs text-gray-500">{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Room Tabs */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
          {rooms.map((room) => (
            <button
              key={room.label}
              onClick={() => setSelectedRoom(room.label)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedRoom === room.label
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 border border-gray-200"
              }`}
            >
              {room.label} ({room.count})
            </button>
          ))}
        </div>

        {/* Device List */}
        <div className="bg-white mx-4 rounded-2xl overflow-hidden">
          {devices.map((device, index) => (
            <button
              key={device.name + index}
              onClick={onBack}
              className="flex items-center gap-3 w-full px-4 py-4 text-left border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
            >
              <DeviceIcon type={device.type} />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{device.name}</p>
                <p className="text-sm text-gray-500">{device.room}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
