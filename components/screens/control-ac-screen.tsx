"use client";

import { useState } from "react";
import { ArrowLeft, MoreVertical, Leaf, Moon, Timer, MoreHorizontal, Wind, Target, ArrowUpDown, Settings2 } from "lucide-react";

interface ControlACScreenProps {
  onBack: () => void;
}

export function ControlACScreen({ onBack }: ControlACScreenProps) {
  const [isOn, setIsOn] = useState(true);
  const [mode, setMode] = useState<"cooling" | "heating" | "purifying">("cooling");
  const [temperature, setTemperature] = useState(20);

  const controls = [
    { icon: Settings2, label: "Mode" },
    { icon: Wind, label: "Wind Speed" },
    { icon: ArrowUpDown, label: "Wind Directi..." },
    { icon: Target, label: "Precision Ai..." },
    { icon: Leaf, label: "Eco" },
    { icon: Moon, label: "Sleep" },
    { icon: Timer, label: "Timer" },
    { icon: MoreHorizontal, label: "More" },
  ];

  // Calculate angle for temperature dial (16-30 range mapped to arc)
  const minTemp = 16;
  const maxTemp = 30;
  const tempRange = maxTemp - minTemp;
  const tempProgress = (temperature - minTemp) / tempRange;
  const startAngle = 135; // Start at bottom-left
  const endAngle = 45; // End at bottom-right (going through top)
  const arcLength = 270; // Total arc degrees
  const currentAngle = startAngle + tempProgress * arcLength;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <button onClick={onBack} className="p-1">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Control Device</h1>
        <button>
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Device Info */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 mx-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <svg viewBox="0 0 40 28" className="w-10 h-7">
              <rect x="2" y="4" width="36" height="20" rx="3" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" />
              <line x1="6" y1="18" x2="34" y2="18" stroke="#D1D5DB" strokeWidth="1" />
              <line x1="6" y1="20" x2="34" y2="20" stroke="#D1D5DB" strokeWidth="1" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Air Conditioner</p>
            <p className="text-sm text-gray-500">Living Room</p>
          </div>
        </div>
        <div onClick={() => setIsOn(!isOn)}>
          <div className={`w-12 h-7 rounded-full p-0.5 transition-colors ${isOn ? "bg-primary" : "bg-gray-300"}`}>
            <div className={`w-6 h-6 rounded-full bg-white shadow transition-transform ${isOn ? "translate-x-5" : ""}`} />
          </div>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="flex mx-4 mt-4 bg-gray-100 rounded-xl p-1">
        {(["cooling", "heating", "purifying"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              mode === m ? "bg-primary text-white" : "text-gray-600"
            }`}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      {/* Temperature Dial */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="relative w-64 h-64">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Background arc */}
            <path
              d="M 30 160 A 85 85 0 1 1 170 160"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Progress arc */}
            <path
              d="M 30 160 A 85 85 0 1 1 170 160"
              fill="none"
              stroke="#4F6BF5"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${tempProgress * 400} 400`}
            />
            {/* Tick marks */}
            {[...Array(15)].map((_, i) => {
              const angle = (135 + i * 18) * (Math.PI / 180);
              const x1 = 100 + 72 * Math.cos(angle);
              const y1 = 100 + 72 * Math.sin(angle);
              const x2 = 100 + 64 * Math.cos(angle);
              const y2 = 100 + 64 * Math.sin(angle);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#D1D5DB"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
          {/* Dial knob */}
          <div 
            className="absolute w-8 h-8 rounded-full bg-white border-4 border-primary shadow-lg"
            style={{ 
              left: `${50 + 42 * Math.cos((currentAngle * Math.PI) / 180)}%`,
              top: `${50 + 42 * Math.sin((currentAngle * Math.PI) / 180)}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
          {/* Temperature display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="flex items-start">
              <span className="text-6xl font-light text-gray-900">{temperature}</span>
              <span className="text-2xl mt-2 text-gray-900">°C</span>
            </div>
            <span className="text-gray-500 mt-1">Temperature</span>
          </div>
          {/* Temperature controls */}
          <button 
            onClick={() => setTemperature(Math.max(minTemp, temperature - 1))}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-2xl text-gray-400"
          >
            -
          </button>
          <button 
            onClick={() => setTemperature(Math.min(maxTemp, temperature + 1))}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-2xl text-gray-400"
          >
            +
          </button>
        </div>
      </div>

      {/* Control Grid */}
      <div className="grid grid-cols-4 gap-2 px-4 py-4">
        {controls.map((ctrl, i) => (
          <button key={i} className="flex flex-col items-center gap-2 py-3">
            <ctrl.icon className="w-6 h-6 text-gray-600" />
            <span className="text-xs text-gray-600 text-center">{ctrl.label}</span>
          </button>
        ))}
      </div>

      {/* Schedule Button */}
      <div className="px-4 pb-6">
        <button className="w-full py-4 bg-primary/10 text-primary font-medium rounded-xl">
          Schedule Automatic ON/OFF & Smart Scene
        </button>
      </div>
    </div>
  );
}
