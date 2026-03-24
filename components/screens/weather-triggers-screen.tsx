"use client";

import { ArrowLeft, ChevronRight, Thermometer, Droplet, Sun, Sunrise, Wind } from "lucide-react";

interface WeatherTriggersScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string) => void;
}

const weatherOptions = [
  {
    icon: Thermometer,
    iconColor: "text-red-500",
    iconBg: "bg-red-50",
    title: "Temperature",
    screen: "temperature-trigger",
  },
  {
    icon: Droplet,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
    title: "Humidity",
    screen: "humidity-trigger",
  },
  {
    icon: Sun,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
    title: "Weather",
    screen: "weather-trigger",
  },
  {
    icon: Sunrise,
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-50",
    title: "Sunrise / Sunset",
    screen: "sunrise-sunset-trigger",
  },
  {
    icon: Wind,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-50",
    title: "Wind Speed",
    screen: "wind-speed-trigger",
  },
];

export function WeatherTriggersScreen({ onBack, onNavigate }: WeatherTriggersScreenProps) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-white">
        <button onClick={onBack} className="p-1">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">When Weather Changes</h1>
        <div className="w-6" />
      </div>

      {/* Options List */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-4 my-4 bg-white rounded-2xl overflow-hidden">
          {weatherOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                if (option.screen && onNavigate) {
                  onNavigate(option.screen);
                }
              }}
              className="flex items-center gap-4 w-full px-4 py-5 text-left border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
            >
              <div className={`w-10 h-10 rounded-full ${option.iconBg} flex items-center justify-center`}>
                <option.icon className={`w-5 h-5 ${option.iconColor}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{option.title}</h3>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
