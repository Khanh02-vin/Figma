"use client";

import { useState } from "react";
import {
  Home,
  CheckSquare,
  BarChart3,
  User,
  Plus,
  Mic,
  ChevronDown,
  Wifi,
  Bluetooth,
  MoreVertical,
  Lightbulb,
  Video,
  Zap,
} from "lucide-react";

interface HomeWithDevicesScreenProps {
  onNavigate: (screen: string) => void;
  onShowAddMenu?: () => void;
  onShowSwitchHome?: () => void;
}

const devices = [
  { id: 1, name: "Smart Lamp", room: "Living Room", type: "lamp", connection: "wifi", isOn: true, hasImage: false },
  { id: 2, name: "Smart V1 CCTV", room: "Living Room", type: "cctv", connection: "wifi", isOn: true, hasImage: true },
  { id: 3, name: "Stereo Speaker", room: "Living Room", type: "speaker", connection: "bluetooth", isOn: true, hasImage: false },
  { id: 4, name: "Router", room: "Living Room", type: "router", connection: "wifi", isOn: true, hasImage: false },
  { id: 5, name: "Air Conditioner", room: "Living Room", type: "ac", connection: "bluetooth", isOn: true, hasImage: false },
  { id: 6, name: "Smart Webcam", room: "Living Room", type: "webcam", connection: "wifi", isOn: false, hasImage: false },
  { id: 7, name: "Smart V2 CCTV", room: "Living Room", type: "cctv", connection: "wifi", isOn: false, hasImage: false },
  { id: 8, name: "Smart V3 CCTV", room: "Living Room", type: "cctv", connection: "wifi", isOn: false, hasImage: false },
];

const categories = [
  { icon: Lightbulb, label: "Lightning", count: 12, color: "bg-yellow-50", iconColor: "text-yellow-500" },
  { icon: Video, label: "Cameras", count: 8, color: "bg-pink-50", iconColor: "text-pink-500" },
  { icon: Zap, label: "Electrical", count: 6, color: "bg-red-50", iconColor: "text-red-500" },
];

const rooms = [
  { label: "All Rooms", count: 37 },
  { label: "Living Room", count: 8 },
  { label: "Bedroom", count: 5 },
  { label: "Kitchen", count: 4 },
];

export function HomeWithDevicesScreen({ onNavigate, onShowAddMenu, onShowSwitchHome }: HomeWithDevicesScreenProps) {
  const [selectedRoom, setSelectedRoom] = useState("Living Room");
  const [deviceStates, setDeviceStates] = useState<Record<number, boolean>>(
    Object.fromEntries(devices.map(d => [d.id, d.isOn]))
  );

  const toggleDevice = (id: number) => {
    setDeviceStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const DeviceIcon = ({ type }: { type: string }) => {
    switch (type) {
      case "lamp":
        return (
          <div className="w-12 h-12 flex items-center justify-center">
            <svg viewBox="0 0 40 40" className="w-10 h-10">
              <ellipse cx="20" cy="8" rx="8" ry="4" fill="#E5E7EB" />
              <path d="M12 8 L16 32 L24 32 L28 8" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" />
              <rect x="15" y="32" width="10" height="4" fill="#9CA3AF" rx="1" />
            </svg>
          </div>
        );
      case "cctv":
        return (
          <div className="w-12 h-12 flex items-center justify-center">
            <svg viewBox="0 0 40 40" className="w-10 h-10">
              <circle cx="20" cy="20" r="12" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2" />
              <circle cx="20" cy="20" r="6" fill="#1F2937" />
              <circle cx="20" cy="20" r="3" fill="#374151" />
            </svg>
          </div>
        );
      case "speaker":
        return (
          <div className="w-12 h-12 flex items-center justify-center">
            <svg viewBox="0 0 40 40" className="w-10 h-10">
              <rect x="10" y="12" width="20" height="20" rx="8" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" />
              <ellipse cx="20" cy="10" rx="8" ry="3" fill="#E5E7EB" />
            </svg>
          </div>
        );
      case "router":
        return (
          <div className="w-12 h-12 flex items-center justify-center">
            <svg viewBox="0 0 40 40" className="w-10 h-10">
              <rect x="8" y="20" width="24" height="12" rx="2" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" />
              <line x1="12" y1="20" x2="12" y2="12" stroke="#9CA3AF" strokeWidth="2" />
              <line x1="20" y1="20" x2="20" y2="8" stroke="#9CA3AF" strokeWidth="2" />
              <line x1="28" y1="20" x2="28" y2="12" stroke="#9CA3AF" strokeWidth="2" />
            </svg>
          </div>
        );
      case "ac":
        return (
          <div className="w-12 h-12 flex items-center justify-center">
            <svg viewBox="0 0 40 40" className="w-10 h-10">
              <rect x="6" y="14" width="28" height="14" rx="2" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" />
              <line x1="10" y1="24" x2="30" y2="24" stroke="#D1D5DB" strokeWidth="1" />
              <line x1="10" y1="26" x2="30" y2="26" stroke="#D1D5DB" strokeWidth="1" />
            </svg>
          </div>
        );
      case "webcam":
        return (
          <div className="w-12 h-12 flex items-center justify-center">
            <svg viewBox="0 0 40 40" className="w-10 h-10">
              <circle cx="20" cy="16" r="10" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" />
              <circle cx="20" cy="16" r="5" fill="#1F2937" />
              <rect x="16" y="26" width="8" height="8" fill="#E5E7EB" />
            </svg>
          </div>
        );
      default:
        return <div className="w-12 h-12 bg-gray-200 rounded-full" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-2 pb-4 bg-white">
        <button onClick={onShowSwitchHome} className="flex items-center gap-1">
          <span className="text-xl font-bold text-gray-900">My Home</span>
          <ChevronDown className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate("chatbot")}
            className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary">
              <circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.1" />
              <circle cx="9" cy="10" r="1.5" fill="currentColor" />
              <circle cx="15" cy="10" r="1.5" fill="currentColor" />
              <path d="M8 14 Q12 18 16 14" stroke="currentColor" fill="none" strokeWidth="1.5" />
            </svg>
          </button>
          <button 
            onClick={() => onNavigate("notifications")}
            className="w-10 h-10 rounded-full border-2 border-orange-400 flex items-center justify-center relative"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-orange-500">
              <path d="M12 2 C8 2 5 5 5 9 L5 14 L3 16 L3 17 L21 17 L21 16 L19 14 L19 9 C19 5 16 2 12 2" fill="currentColor" />
              <circle cx="12" cy="20" r="2" fill="currentColor" />
            </svg>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Weather Card */}
        <div className="mx-4 mb-4 p-4 bg-primary rounded-2xl text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-start">
              <span className="text-4xl font-light">20</span>
              <span className="text-lg mt-1">°C</span>
            </div>
            <p className="text-sm opacity-90 mt-1">New York City, USA</p>
            <p className="text-sm opacity-90">Today Cloudy</p>
            <div className="flex gap-4 mt-3 text-xs opacity-80">
              <span className="flex items-center gap-1">
                <span className="text-green-300">AQI</span> 92
              </span>
              <span className="flex items-center gap-1">
                <span>💧</span> 78.2%
              </span>
              <span className="flex items-center gap-1">
                <span>💨</span> 2.0 m/s
              </span>
            </div>
          </div>
          <div className="absolute right-2 top-2">
            <svg viewBox="0 0 80 60" className="w-24 h-20">
              <circle cx="55" cy="35" r="18" fill="#FCD34D" />
              <ellipse cx="40" cy="40" rx="25" ry="15" fill="white" opacity="0.9" />
              <ellipse cx="30" cy="42" rx="18" ry="12" fill="white" />
            </svg>
          </div>
        </div>

        {/* Category Cards */}
        <div className="flex gap-3 px-4 mb-4 overflow-x-auto pb-2">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => onNavigate(cat.label.toLowerCase())}
              className={`flex-shrink-0 ${cat.color} rounded-xl p-3 min-w-[100px]`}
            >
              <cat.icon className={`w-6 h-6 ${cat.iconColor} mb-2`} />
              <p className="text-sm font-medium text-gray-900">{cat.label}</p>
              <p className="text-xs text-gray-500">{cat.count} {cat.label === "Lightning" ? "lights" : cat.label === "Cameras" ? "cameras" : "devices"}</p>
            </button>
          ))}
        </div>

        {/* All Devices Section */}
        <div className="px-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">All Devices</h2>
            <button>
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Room Filter */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
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

          {/* Devices Grid */}
          <div className="grid grid-cols-2 gap-3">
            {devices.map((device) => (
              <div
                key={device.id}
                className="bg-white rounded-xl p-3 relative overflow-hidden"
                onClick={() => onNavigate(`control-${device.type}`)}
              >
                {device.hasImage ? (
                  <div className="relative h-24 -mx-3 -mt-3 mb-2 bg-gradient-to-br from-amber-100 to-amber-50 rounded-t-xl overflow-hidden">
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
                    <p className="absolute bottom-2 left-2 text-xs text-white font-medium">{device.name}</p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-2">
                      <DeviceIcon type={device.type} />
                      <div 
                        onClick={(e) => { e.stopPropagation(); toggleDevice(device.id); }}
                      >
                        <div className={`w-11 h-6 rounded-full p-0.5 transition-colors ${deviceStates[device.id] ? "bg-primary" : "bg-gray-300"}`}>
                          <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${deviceStates[device.id] ? "translate-x-5" : ""}`} />
                        </div>
                      </div>
                    </div>
                    <p className="font-medium text-gray-900 text-sm">{device.name}</p>
                  </>
                )}
                {!device.hasImage && (
                  <div className="flex items-center gap-1 mt-1">
                    {device.connection === "wifi" ? (
                      <Wifi className="w-3 h-3 text-gray-400" />
                    ) : (
                      <Bluetooth className="w-3 h-3 text-gray-400" />
                    )}
                    <span className="text-xs text-gray-400">{device.connection === "wifi" ? "Wi-Fi" : "Bluetooth"}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute bottom-24 right-4 flex flex-col gap-3">
        <button 
          onClick={() => onNavigate("voice-assistant")}
          className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center"
        >
          <Mic className="w-5 h-5 text-primary" />
        </button>
        <button 
          onClick={onShowAddMenu}
          className="w-14 h-14 rounded-full bg-primary shadow-lg flex items-center justify-center"
        >
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3">
        <div className="flex justify-between items-center">
          <button className="flex flex-col items-center gap-1">
            <Home className="w-5 h-5 text-primary" />
            <span className="text-xs text-primary font-medium">Home</span>
          </button>
          <button onClick={() => onNavigate("smart-scenes")} className="flex flex-col items-center gap-1">
            <CheckSquare className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Smart</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <BarChart3 className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Reports</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <User className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Account</span>
          </button>
        </div>
      </div>
    </div>
  );
}
