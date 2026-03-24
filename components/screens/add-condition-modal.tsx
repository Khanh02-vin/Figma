"use client";

import { Hand, Sun, MapPin, Clock, Briefcase, Shield, Bell, Info, ChevronRight } from "lucide-react";

interface AddConditionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: string) => void;
  onNavigate?: (screen: string) => void;
}

const conditions = [
  {
    type: "tap-to-run",
    icon: Hand,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
    title: "Tap-to-Run",
    hasInfo: true,
  },
  {
    type: "weather",
    icon: Sun,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
    title: "When Weather Changes",
  },
  {
    type: "location",
    icon: MapPin,
    iconColor: "text-red-500",
    iconBg: "bg-red-50",
    title: "When Location Changes",
  },
  {
    type: "schedule",
    icon: Clock,
    iconColor: "text-green-500",
    iconBg: "bg-green-50",
    title: "Schedule Time",
  },
  {
    type: "device-status",
    icon: Briefcase,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-50",
    title: "When Device Status Changes",
  },
  {
    type: "arm-mode",
    icon: Shield,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-50",
    title: "Change Arm Mode",
  },
  {
    type: "alarm",
    icon: Bell,
    iconColor: "text-red-500",
    iconBg: "bg-red-50",
    title: "When Alarm Triggered",
  },
];

export function AddConditionModal({ isOpen, onClose, onSelect, onNavigate }: AddConditionModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="absolute inset-0 z-50 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      {/* Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-xl overflow-hidden">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Title */}
        <div className="px-6 pb-4">
          <h2 className="text-lg font-bold text-foreground">Add Condition</h2>
        </div>

        {/* Options */}
        <div className="border-t border-border">
          {conditions.map((cond, index) => (
            <button
              key={cond.type}
              onClick={() => {
                onSelect(cond.type);
                onClose();
                if (cond.type === "weather" && onNavigate) {
                  onNavigate("weather-triggers");
                } else if (cond.type === "location" && onNavigate) {
                  onNavigate("location-changes");
                } else if (cond.type === "schedule" && onNavigate) {
                  onNavigate("schedule-time-trigger");
                }
              }}
              className="flex items-center gap-4 w-full px-6 py-4 text-left border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
            >
              <div className={`w-10 h-10 rounded-full ${cond.iconBg} flex items-center justify-center flex-shrink-0`}>
                <cond.icon className={`w-5 h-5 ${cond.iconColor}`} />
              </div>
              <span className={`flex-1 ${cond.title === "Tap-to-Run" ? "text-gray-400" : "text-gray-900 font-medium"}`}>
                {cond.title}
              </span>
              {cond.hasInfo ? (
                <Info className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
