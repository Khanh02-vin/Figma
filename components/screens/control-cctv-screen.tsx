"use client";

import { useState } from "react";
import { ArrowLeft, MoreVertical, Play, Camera, Mic, Video, Image, Lock, Moon, MoreHorizontal, ChevronLeft, ChevronRight, Pause } from "lucide-react";

interface ControlCCTVScreenProps {
  onBack: () => void;
}

export function ControlCCTVScreen({ onBack }: ControlCCTVScreenProps) {
  const [isOn, setIsOn] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const controls = [
    { icon: Play, label: "Playback" },
    { icon: Camera, label: "Snapshot" },
    { icon: Mic, label: "Speak" },
    { icon: Video, label: "Record" },
    { icon: Image, label: "Gallery" },
    { icon: Lock, label: "Private Mo..." },
    { icon: Moon, label: "Night Mode" },
    { icon: MoreHorizontal, label: "More" },
  ];

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
              <circle cx="20" cy="16" r="12" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" />
              <circle cx="20" cy="16" r="6" fill="#1F2937" />
              <rect x="16" y="28" width="8" height="8" fill="#E5E7EB" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Smart V1 CCTV</p>
            <p className="text-sm text-gray-500">Living Room</p>
          </div>
        </div>
        <div onClick={() => setIsOn(!isOn)}>
          <div className={`w-12 h-7 rounded-full p-0.5 transition-colors ${isOn ? "bg-primary" : "bg-gray-300"}`}>
            <div className={`w-6 h-6 rounded-full bg-white shadow transition-transform ${isOn ? "translate-x-5" : ""}`} />
          </div>
        </div>
      </div>

      {/* Live Feed */}
      <div className="mx-4 mt-4 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-100 to-amber-50 relative aspect-video">
        {/* Live indicator */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/30 px-2 py-1 rounded">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-xs text-white font-medium">Live</span>
        </div>
        {/* Control buttons */}
        <div className="absolute bottom-3 right-3 flex gap-2">
          <button className="w-8 h-8 rounded bg-black/30 flex items-center justify-center text-white text-xs">
            HD
          </button>
          <button className="w-8 h-8 rounded bg-black/30 flex items-center justify-center text-white">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          </button>
          <button className="w-8 h-8 rounded bg-black/30 flex items-center justify-center text-white">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
            </svg>
          </button>
        </div>
        {/* Simulated room content */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <span className="text-sm">Live Feed Preview</span>
        </div>
      </div>

      {/* Control Grid */}
      <div className="grid grid-cols-4 gap-2 px-4 py-6 mt-4">
        {controls.map((ctrl, i) => (
          <button key={i} className="flex flex-col items-center gap-2 py-3">
            <ctrl.icon className="w-6 h-6 text-gray-600" />
            <span className="text-xs text-gray-600 text-center">{ctrl.label}</span>
          </button>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Playback Controls */}
      <div className="flex items-center justify-center gap-8 py-6 pb-10">
        <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-16 h-16 rounded-full bg-primary flex items-center justify-center"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" fill="white" />
          ) : (
            <Play className="w-6 h-6 text-white ml-1" fill="white" />
          )}
        </button>
        <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
