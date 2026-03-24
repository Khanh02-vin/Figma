"use client";

import { useState, useRef } from "react";
import { ArrowLeft, MapPin, ChevronDown, ChevronRight } from "lucide-react";
import { PrimaryButton } from "@/components/smartify";

interface ScheduleTimeTriggerScreenProps {
  onBack: () => void;
  onContinue?: () => void;
}

const REPEAT_OPTIONS = ["Every Day", "Weekdays", "Weekends", "Once", "Custom"];

function ClockPicker({
  mode,
  value,
  onChange,
}: {
  mode: "hour" | "minute";
  value: number;
  onChange: (v: number) => void;
}) {
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const outerRadius = size / 2 - 10;
  const innerRadius = outerRadius - 28;

  // Hour numbers: outer ring 1-12, inner ring 00,13-23
  const hours12 = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const hours24 = [0, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

  const numToAngle = (num: number) => {
    // 12 or 0 at top (270° in SVG coords)
    const idx = num === 12 ? 0 : num === 0 ? 0 : num;
    return (idx * 30 - 90) * (Math.PI / 180);
  };

  const isSelectedHour = (num: number) => {
    if (mode === "hour") return value === num || value === (num === 12 ? 0 : num);
    return false;
  };

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - cx;
    const y = e.clientY - rect.top - cy;
    const angle = Math.atan2(y, x);
    // Convert to degrees, 0 at top
    let degrees = (angle * 180) / Math.PI + 90;
    if (degrees < 0) degrees += 360;

    if (mode === "hour") {
      // Determine if inner or outer based on distance from center
      const dist = Math.sqrt(x * x + y * y);
      if (dist < innerRadius + 14) {
        // Inner ring: 0, 13-23
        const innerStep = 360 / 12;
        let idx = Math.round(degrees / innerStep) % 12;
        if (idx === 0) idx = 12;
        const num = hours24[idx % 12];
        onChange(num);
      } else {
        // Outer ring: 1-12
        const step = 360 / 12;
        let idx = Math.round(degrees / step) % 12;
        const num = hours12[idx % 12];
        onChange(num);
      }
    } else {
      // Minute: 0-59 in 5-min steps
      const step = 360 / 12;
      let idx = Math.round(degrees / step) % 12;
      onChange(idx * 5);
    }
  };

  const getHourAngle = (num: number) => {
    if (num === 0) return numToAngle(12);
    return numToAngle(num);
  };

  const getMinuteAngle = (min: number) => (min / 5) * 30 - 90;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="w-full max-w-[260px] cursor-pointer select-none"
      onClick={handleClick}
    >
      {/* Outer circle */}
      <circle cx={cx} cy={cy} r={outerRadius} fill="none" stroke="#E5E7EB" strokeWidth="2" />

      {/* Center dot */}
      <circle cx={cx} cy={cy} r={4} fill="#4F46E5" />

      {/* Hour numbers (outer ring 1-12) */}
      {hours12.map((num, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x = cx + (outerRadius - 18) * Math.cos(angle);
        const y = cy + (outerRadius - 18) * Math.sin(angle);
        const isSelected = mode === "hour" && (value === num || value === (num === 12 ? 0 : num));
        return (
          <g key={`h-${num}`}>
            {isSelected && (
              <circle cx={x} cy={y} r={16} fill="#4F46E5" />
            )}
            <text
              x={x}
              y={y + 5}
              textAnchor="middle"
              className={`text-xs font-semibold ${isSelected ? "fill-white" : "fill-gray-500"}`}
            >
              {num}
            </text>
          </g>
        );
      })}

      {/* Inner ring numbers (0, 13-23) */}
      {hours24.map((num, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x = cx + (innerRadius + 14) * Math.cos(angle);
        const y = cy + (innerRadius + 14) * Math.sin(angle);
        const isSelected = mode === "hour" && value === num;
        return (
          <g key={`i-${num}`}>
            {isSelected && (
              <circle cx={x} cy={y} r={14} fill="#4F46E5" />
            )}
            <text
              x={x}
              y={y + 4}
              textAnchor="middle"
              className={`text-[10px] font-medium ${isSelected ? "fill-white" : "fill-gray-400"}`}
            >
              {String(num).padStart(2, "0")}
            </text>
          </g>
        );
      })}

      {/* Minute tick marks */}
      {mode === "minute" && [...Array(12)].map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x1 = cx + (outerRadius - 6) * Math.cos(angle);
        const y1 = cy + (outerRadius - 6) * Math.sin(angle);
        const x2 = cx + (outerRadius - 12) * Math.cos(angle);
        const y2 = cy + (outerRadius - 12) * Math.sin(angle);
        const isSelected = value === i * 5;
        return (
          <g key={`m-${i}`}>
            {isSelected && (
              <>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" />
                <circle cx={x2} cy={y2} r={14} fill="#4F46E5" />
                <text x={x2} y={y2 + 4} textAnchor="middle" className="text-xs font-semibold fill-white">
                  {String(i * 5).padStart(2, "0")}
                </text>
              </>
            )}
          </g>
        );
      })}

      {/* Hour hand */}
      {mode === "hour" && (
        <line
          x1={cx}
          y1={cy}
          x2={cx + (outerRadius - 40) * Math.cos(getHourAngle(value === 0 ? 12 : value))}
          y2={cy + (outerRadius - 40) * Math.sin(getHourAngle(value === 0 ? 12 : value))}
          stroke="#4F46E5"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      )}

      {/* Minute hand */}
      <line
        x1={cx}
        y1={cy}
        x2={cx + (outerRadius - 30) * Math.cos(getMinuteAngle(value))}
        y2={cy + (outerRadius - 30) * Math.sin(getMinuteAngle(value))}
        stroke="#4F46E5"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ScheduleTimeTriggerScreen({ onBack, onContinue }: ScheduleTimeTriggerScreenProps) {
  const [repeat, setRepeat] = useState("Every Day");
  const [mode, setMode] = useState<"hour" | "minute">("hour");
  const [hour, setHour] = useState(21);
  const [minute, setMinute] = useState(45);

  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const ampm = hour >= 12 ? "PM" : "AM";

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-white">
        <button onClick={onBack} className="p-1">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Schedule Time</h1>
        <div className="w-6" />
      </div>

      {/* Content Card */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-4 mt-4 bg-white rounded-2xl overflow-hidden">
          {/* Repeat */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="17 1 21 5 17 9" />
                <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                <polyline points="7 23 3 19 7 15" />
                <path d="M21 13v2a4 4 0 0 1-4 4H3" />
              </svg>
              <span className="text-sm text-gray-500">Repeat</span>
            </div>
            <button className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-900">{repeat}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Mode Tabs: Hour / Minute */}
          <div className="flex mx-4 my-4 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setMode("hour")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "hour" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
              }`}
            >
              Hour
            </button>
            <button
              onClick={() => setMode("minute")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "minute" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
              }`}
            >
              Minute
            </button>
          </div>

          {/* Time Display */}
          <div className="px-6 pb-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="bg-gray-100 rounded-xl px-5 py-2 text-center">
                <span className={`text-2xl font-bold ${mode === "hour" ? "text-primary" : "text-gray-400"}`}>
                  {String(displayHour).padStart(2, "0")}
                </span>
              </div>
              <span className="text-2xl font-bold text-gray-300">:</span>
              <div className="bg-gray-100 rounded-xl px-5 py-2 text-center">
                <span className={`text-2xl font-bold ${mode === "minute" ? "text-primary" : "text-gray-400"}`}>
                  {String(minute).padStart(2, "0")}
                </span>
              </div>
              <span className="text-lg font-medium text-gray-400 ml-1">{ampm}</span>
            </div>

            {/* Clock Picker */}
            <div className="flex justify-center">
              <ClockPicker
                mode={mode}
                value={mode === "hour" ? hour : minute}
                onChange={mode === "hour" ? setHour : setMinute}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-white border-t border-gray-100">
        <PrimaryButton onClick={onContinue} className="w-full">
          Continue
        </PrimaryButton>
      </div>
    </div>
  );
}
