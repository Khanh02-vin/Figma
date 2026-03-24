"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, MoreVertical, SkipBack, SkipForward, Pause, Play } from "lucide-react";

interface ControlSpeakerScreenProps {
  onBack: () => void;
}

export function ControlSpeakerScreen({ onBack }: ControlSpeakerScreenProps) {
  const [isOn, setIsOn] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(65);
  const [currentTime, setCurrentTime] = useState(168); // 2:48 in seconds
  const totalTime = 233; // 3:53 in seconds

  // Calculate angle for volume dial
  const volumeProgress = volume / 100;
  const startAngle = 135;
  const arcLength = 270;
  const currentAngle = startAngle + volumeProgress * arcLength;

  useEffect(() => {
    if (isPlaying && currentTime < totalTime) {
      const timer = setInterval(() => {
        setCurrentTime(prev => Math.min(prev + 1, totalTime));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, currentTime, totalTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

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
              <rect x="10" y="14" width="20" height="20" rx="8" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" />
              <ellipse cx="20" cy="12" rx="8" ry="3" fill="#E5E7EB" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Stereo Speaker</p>
            <p className="text-sm text-gray-500">Living Room</p>
          </div>
        </div>
        <div onClick={() => setIsOn(!isOn)}>
          <div className={`w-12 h-7 rounded-full p-0.5 transition-colors ${isOn ? "bg-primary" : "bg-gray-300"}`}>
            <div className={`w-6 h-6 rounded-full bg-white shadow transition-transform ${isOn ? "translate-x-5" : ""}`} />
          </div>
        </div>
      </div>

      {/* Now Playing */}
      <div className="flex items-center justify-center gap-3 mt-6 px-4">
        <div className="w-8 h-8 rounded-full bg-[#1DB954] flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-black">
            <path fill="currentColor" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
        </div>
        <span className="text-gray-700 font-medium">Ed Sheeran - Shape of You</span>
      </div>

      {/* Volume Dial */}
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
              strokeDasharray={`${volumeProgress * 400} 400`}
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
          {/* Volume display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="flex items-start">
              <span className="text-6xl font-light text-gray-900">{volume}</span>
              <span className="text-xl mt-2 text-gray-900">%</span>
            </div>
            <span className="text-gray-500 mt-1">Volume</span>
          </div>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center justify-center gap-8 py-6">
        <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          <SkipBack className="w-5 h-5 text-gray-600" />
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
          <SkipForward className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="px-6 pb-8">
        <div className="relative h-2">
          <div className="absolute inset-0 bg-gray-200 rounded-full" />
          <div 
            className="absolute left-0 top-0 bottom-0 bg-primary rounded-full"
            style={{ width: `${(currentTime / totalTime) * 100}%` }}
          />
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-4 border-primary rounded-full shadow"
            style={{ left: `calc(${(currentTime / totalTime) * 100}% - 8px)` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(totalTime)}</span>
        </div>
      </div>
    </div>
  );
}
