"use client";

import { useState } from "react";
import { ArrowLeft, MoreVertical, Wifi } from "lucide-react";

interface CamerasScreenProps {
  onBack: () => void;
  onSelectCamera?: (camera: string) => void;
}

interface CameraDevice {
  id: string;
  name: string;
  room: string;
  isOn: boolean;
  isLive: boolean;
  iconType: "spherical" | "dome" | "bullet" | "box";
  liveImage?: string; // placeholder for a real image
}

const cameras: CameraDevice[] = [
  {
    id: "1",
    name: "Smart V1 CCTV",
    room: "Living Room",
    isOn: true,
    isLive: true,
    iconType: "spherical",
    liveImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=240&fit=crop",
  },
  {
    id: "2",
    name: "Smart V2 CCTV",
    room: "Bedroom",
    isOn: true,
    isLive: true,
    iconType: "spherical",
    liveImage: "https://images.unsplash.com/photo-1610462275440-4ea0976f46f2?w=400&h=240&fit=crop",
  },
  {
    id: "3",
    name: "Smart V3 CCTV",
    room: "Kitchen",
    isOn: true,
    isLive: true,
    iconType: "spherical",
    liveImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=240&fit=crop",
  },
  {
    id: "4",
    name: "Smart V1 CCTV",
    room: "Bathroom",
    isOn: true,
    isLive: true,
    iconType: "spherical",
    liveImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=240&fit=crop",
  },
  {
    id: "5",
    name: "Smart Webcam",
    room: "Toilet",
    isOn: false,
    isLive: false,
    iconType: "spherical",
  },
  {
    id: "6",
    name: "Smart V1 CCTV",
    room: "Dining Room",
    isOn: false,
    isLive: false,
    iconType: "dome",
  },
  {
    id: "7",
    name: "Smart V2 CCTV",
    room: "Backyard",
    isOn: false,
    isLive: false,
    iconType: "bullet",
  },
  {
    id: "8",
    name: "Smart V3 CCTV",
    room: "Backyard",
    isOn: false,
    isLive: false,
    iconType: "box",
  },
];

function CameraIcon({ type, isOn }: { type: CameraDevice["iconType"]; isOn: boolean }) {
  const color = isOn ? "#3B82F6" : "#9CA3AF";

  if (type === "spherical") {
    return (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <circle cx="20" cy="18" r="12" fill={color} opacity="0.15" />
        <circle cx="20" cy="18" r="10" fill={color} opacity="0.3" />
        <circle cx="20" cy="18" r="8" fill={color} />
        <circle cx="20" cy="18" r="4" fill="white" />
        <circle cx="20" cy="18" r="2" fill={color} />
        <rect x="17" y="28" width="6" height="6" rx="1" fill={color} opacity="0.6" />
        <rect x="15" y="33" width="10" height="2" rx="1" fill={color} opacity="0.4" />
      </svg>
    );
  }
  if (type === "dome") {
    return (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <ellipse cx="20" cy="22" rx="14" ry="8" fill={color} opacity="0.3" />
        <path d="M6 22 Q6 12 20 12 Q34 12 34 22" fill={color} opacity="0.6" />
        <circle cx="20" cy="22" r="5" fill={color} />
        <circle cx="20" cy="22" r="2.5" fill="white" />
      </svg>
    );
  }
  if (type === "bullet") {
    return (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect x="12" y="16" width="20" height="12" rx="3" fill={color} />
        <rect x="28" y="18" width="8" height="8" rx="1" fill={color} opacity="0.7" />
        <circle cx="20" cy="22" r="3" fill="white" />
        <rect x="17" y="28" width="6" height="4" rx="1" fill={color} opacity="0.5" />
      </svg>
    );
  }
  // box
  return (
    <svg viewBox="0 0 40 40" className="w-10 h-10">
      <rect x="10" y="14" width="20" height="14" rx="2" fill={color} />
      <rect x="18" y="8" width="4" height="8" rx="1" fill={color} opacity="0.6" />
      <circle cx="20" cy="21" r="4" fill="white" />
      <circle cx="20" cy="21" r="2" fill={color} />
      <rect x="14" y="28" width="12" height="3" rx="1" fill={color} opacity="0.5" />
    </svg>
  );
}

export function CamerasScreen({ onBack }: CamerasScreenProps) {
  const [devices, setDevices] = useState(cameras);

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
          Cameras ({devices.length})
        </h1>
        <button className="p-2 -mr-2">
          <MoreVertical className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {devices.map((cam) => (
            <div
              key={cam.id}
              className="bg-white rounded-2xl overflow-hidden"
            >
              {cam.isOn && cam.liveImage ? (
                /* Live camera view */
                <div className="relative h-28 -mx-0 -mt-0">
                  <img
                    src={cam.liveImage}
                    alt={cam.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  {/* Live badge */}
                  <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded text-xs text-white">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    Live
                  </div>
                  {/* Toggle */}
                  <div className="absolute top-2 right-2" onClick={() => toggle(cam.id)}>
                    <div className={`w-10 h-6 rounded-full p-0.5 transition-colors ${cam.isOn ? "bg-primary" : "bg-gray-300"}`}>
                      <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${cam.isOn ? "translate-x-4" : ""}`} />
                    </div>
                  </div>
                  {/* Label */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <p className="text-xs font-medium text-white">{cam.name}</p>
                    <p className="text-xs text-white/70">{cam.room}</p>
                  </div>
                </div>
              ) : (
                /* Inactive camera icon */
                <div className="p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <CameraIcon type={cam.iconType} isOn={cam.isOn} />
                    <button onClick={() => toggle(cam.id)}>
                      <div className={`w-10 h-6 rounded-full p-0.5 transition-colors ${cam.isOn ? "bg-primary" : "bg-gray-300"}`}>
                        <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${cam.isOn ? "translate-x-4" : ""}`} />
                      </div>
                    </button>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{cam.name}</p>
                    <p className="text-xs text-muted-foreground">{cam.room}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wifi className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Wi-Fi</span>
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
