"use client";

import { useState } from "react";
import { ArrowLeft, MoreVertical, Sun, Circle } from "lucide-react";

interface ControlLampScreenProps {
  onBack: () => void;
}

export function ControlLampScreen({ onBack }: ControlLampScreenProps) {
  const [isOn, setIsOn] = useState(true);
  const [mode, setMode] = useState<"white" | "color" | "scene">("white");
  const [brightness, setBrightness] = useState(85);
  const [saturation, setSaturation] = useState(64);
  const [colorPosition, setColorPosition] = useState({ angle: 45 }); // Position on color wheel

  // Color temperature arc colors for white mode
  const warmColor = "#FCD34D";
  const coolColor = "#C7D2FE";

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
            <svg viewBox="0 0 40 40" className="w-8 h-8">
              <ellipse cx="20" cy="8" rx="6" ry="3" fill="#E5E7EB" />
              <path d="M14 8 L17 28 L23 28 L26 8" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1" />
              <rect x="16" y="28" width="8" height="3" fill="#9CA3AF" rx="1" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Smart Lamp</p>
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
        {(["white", "color", "scene"] as const).map((m) => (
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

      {/* Control Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {mode === "white" ? (
          // White Mode - Color Temperature Arc
          <div className="relative w-64 h-64">
            {/* Arc Background */}
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs>
                <linearGradient id="tempGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={warmColor} />
                  <stop offset="100%" stopColor={coolColor} />
                </linearGradient>
              </defs>
              {/* Background arc */}
              <path
                d="M 30 150 A 85 85 0 1 1 170 150"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="16"
                strokeLinecap="round"
              />
              {/* Colored arc */}
              <path
                d="M 30 150 A 85 85 0 1 1 170 150"
                fill="none"
                stroke="url(#tempGradient)"
                strokeWidth="16"
                strokeLinecap="round"
              />
              {/* Tick marks */}
              {[...Array(13)].map((_, i) => {
                const angle = (180 + i * 15) * (Math.PI / 180);
                const x1 = 100 + 70 * Math.cos(angle);
                const y1 = 100 + 70 * Math.sin(angle);
                const x2 = 100 + 60 * Math.cos(angle);
                const y2 = 100 + 60 * Math.sin(angle);
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
            {/* Warm indicator */}
            <div 
              className="absolute w-6 h-6 rounded-full border-2 border-white bg-transparent"
              style={{ left: "10%", top: "65%" }}
            />
            {/* Bulb in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 60 80" className="w-16 h-20">
                <ellipse cx="30" cy="12" rx="12" ry="6" fill="#E5E7EB" />
                <path d="M18 12 L22 60 L38 60 L42 12" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1" />
                <rect x="20" y="60" width="20" height="8" fill="#9CA3AF" rx="2" />
              </svg>
            </div>
          </div>
        ) : mode === "color" ? (
          // Color Mode - Color Wheel
          <div className="relative w-64 h-64">
            {/* Color Wheel */}
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs>
                <linearGradient id="colorWheel">
                  <stop offset="0%" stopColor="#FF0000" />
                  <stop offset="17%" stopColor="#FF00FF" />
                  <stop offset="33%" stopColor="#0000FF" />
                  <stop offset="50%" stopColor="#00FFFF" />
                  <stop offset="67%" stopColor="#00FF00" />
                  <stop offset="83%" stopColor="#FFFF00" />
                  <stop offset="100%" stopColor="#FF0000" />
                </linearGradient>
              </defs>
              {/* Outer color ring */}
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="url(#colorWheel)"
                strokeWidth="30"
                style={{
                  background: "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)",
                }}
              />
              {/* Create conic gradient effect with multiple arcs */}
              {[...Array(360)].map((_, i) => {
                const hue = i;
                return (
                  <line
                    key={i}
                    x1={100 + 75 * Math.cos((i * Math.PI) / 180)}
                    y1={100 + 75 * Math.sin((i * Math.PI) / 180)}
                    x2={100 + 95 * Math.cos((i * Math.PI) / 180)}
                    y2={100 + 95 * Math.sin((i * Math.PI) / 180)}
                    stroke={`hsl(${hue}, 100%, 50%)`}
                    strokeWidth="2"
                  />
                );
              })}
              {/* Inner white circle */}
              <circle cx="100" cy="100" r="55" fill="white" />
              {/* Tick marks */}
              {[...Array(16)].map((_, i) => {
                const angle = (i * 22.5) * (Math.PI / 180);
                const x1 = 100 + 58 * Math.cos(angle);
                const y1 = 100 + 58 * Math.sin(angle);
                const x2 = 100 + 52 * Math.cos(angle);
                const y2 = 100 + 52 * Math.sin(angle);
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
            {/* Color selector */}
            <div 
              className="absolute w-8 h-8 rounded-full border-4 border-white shadow-lg bg-blue-500"
              style={{ 
                right: "8%", 
                top: "30%",
              }}
            />
            {/* Bulb in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 50 70" className="w-12 h-16">
                <ellipse cx="25" cy="10" rx="10" ry="5" fill="#E5E7EB" />
                <path d="M15 10 L18 50 L32 50 L35 10" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1" />
                <rect x="16" y="50" width="18" height="6" fill="#9CA3AF" rx="2" />
              </svg>
            </div>
          </div>
        ) : (
          // Scene Mode placeholder
          <div className="text-center text-gray-500">
            <p>Scene presets coming soon</p>
          </div>
        )}
      </div>

      {/* Sliders */}
      <div className="px-6 pb-6 space-y-4">
        {/* Brightness Slider */}
        <div className="flex items-center gap-4">
          <Sun className="w-5 h-5 text-gray-400" />
          <div className="flex-1 relative h-2">
            <div className="absolute inset-0 bg-gray-200 rounded-full" />
            <div 
              className="absolute left-0 top-0 bottom-0 bg-primary rounded-full"
              style={{ width: `${brightness}%` }}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-4 border-primary rounded-full shadow"
              style={{ left: `calc(${brightness}% - 10px)` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-700 w-10">{brightness}%</span>
        </div>

        {mode === "color" && (
          // Saturation Slider
          <div className="flex items-center gap-4">
            <Circle className="w-5 h-5 text-gray-400" />
            <div className="flex-1 relative h-2">
              <div className="absolute inset-0 bg-gray-200 rounded-full" />
              <div 
                className="absolute left-0 top-0 bottom-0 bg-primary rounded-full"
                style={{ width: `${saturation}%` }}
              />
              <input
                type="range"
                min="0"
                max="100"
                value={saturation}
                onChange={(e) => setSaturation(Number(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
              />
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-4 border-primary rounded-full shadow"
                style={{ left: `calc(${saturation}% - 10px)` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-700 w-10">{saturation}%</span>
          </div>
        )}
      </div>

      {/* Schedule Button */}
      <div className="px-4 pb-6">
        <button className="w-full py-4 bg-primary/10 text-primary font-medium rounded-xl">
          Schedule Automatic ON/OFF
        </button>
      </div>
    </div>
  );
}
