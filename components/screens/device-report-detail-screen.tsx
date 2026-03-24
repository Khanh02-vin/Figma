"use client";

import { ArrowLeft, MoreVertical } from "lucide-react";

interface DeviceReportDetailScreenProps {
  onBack: () => void;
}

const deviceData = [
  { id: 1, name: "Smart Lamp", room: "Living Room", kWh: 16.82, cost: 2.52 },
  { id: 2, name: "Smart Lamp", room: "Living Room", kWh: 12.34, cost: 1.85 },
  { id: 3, name: "Smart Lamp", room: "Bedroom", kWh: 14.67, cost: 2.2 },
  { id: 4, name: "Smart Lamp", room: "Bedroom", kWh: 18.52, cost: 2.78 },
  { id: 5, name: "Smart Lamp", room: "Bathroom", kWh: 13.21, cost: 1.98 },
  { id: 6, name: "Smart Lamp", room: "Bathroom", kWh: 15.89, cost: 2.38 },
  { id: 7, name: "Smart Lamp", room: "Kitchen", kWh: 10.53, cost: 1.58 },
  { id: 8, name: "Smart Lamp", room: "Kitchen", kWh: 8.47, cost: 1.27 },
  { id: 9, name: "Smart Lamp", room: "Dining Room", kWh: 17.13, cost: 2.57 },
  { id: 10, name: "Smart Lamp", room: "Dining Room", kWh: 10.98, cost: 1.65 },
  { id: 11, name: "Smart Lamp", room: "Backyard", kWh: 10.02, cost: 1.5 },
  { id: 12, name: "Smart Lamp", room: "Backyard", kWh: 7.43, cost: 1.11 },
];

function LampIcon() {
  return (
    <svg viewBox="0 0 40 40" className="w-10 h-10">
      <ellipse cx="20" cy="8" rx="8" ry="4" fill="#E5E7EB" />
      <path d="M12 8 L16 32 L24 32 L28 8" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" />
      <rect x="15" y="32" width="10" height="4" fill="#9CA3AF" rx="1" />
    </svg>
  );
}

export function DeviceReportDetailScreen({ onBack }: DeviceReportDetailScreenProps) {
  return (
    <div className="mobile-container flex flex-col bg-muted min-h-screen">
      {/* Status Bar */}
      <div className="flex items-center justify-between px-6 pt-3 pb-2 bg-white">
        <span className="text-sm font-semibold">9:41</span>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <rect x="1" y="6" width="3" height="12" rx="1" />
            <rect x="6" y="4" width="3" height="14" rx="1" />
            <rect x="11" y="2" width="3" height="16" rx="1" />
            <rect x="16" y="4" width="3" height="14" rx="1" />
          </svg>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C7.5 3 3.75 5.5 2 9c1.75 3.5 5.5 6 10 6s8.25-2.5 10-6c-1.75-3.5-5.5-6-10-6z" />
          </svg>
          <div className="w-6 h-3 bg-foreground rounded-sm relative">
            <div className="absolute right-0 top-0.5 bottom-0.5 w-4 bg-foreground rounded-sm" />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-xl font-bold text-foreground">Smart Lamp (12)</h1>
        <button className="w-10 h-10 flex items-center justify-center">
          <MoreVertical className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Device Grid */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          {deviceData.map((device) => (
            <div key={device.id} className="bg-white rounded-2xl p-4">
              <div className="flex items-start justify-between mb-3">
                <LampIcon />
                <div className="text-right">
                  <p className="font-bold text-foreground">
                    {device.kWh} <span className="text-sm font-normal text-muted-foreground">kWh</span>
                  </p>
                  <p className="text-sm text-muted-foreground">${device.cost.toFixed(2)}</p>
                </div>
              </div>
              <p className="font-semibold text-foreground">{device.name}</p>
              <p className="text-sm text-muted-foreground">{device.room}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
