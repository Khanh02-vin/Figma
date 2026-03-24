"use client";

import { useState } from "react";
import { ArrowLeft, Wifi } from "lucide-react";

interface NotificationsSettingsScreenProps {
  onBack: () => void;
}

const initialSettings = [
  { id: "device-status", label: "Device Status Alerts", enabled: true },
  { id: "energy", label: "Energy Consumption Alerts", enabled: true },
  { id: "bill", label: "Bill Reminders", enabled: true },
  { id: "automation", label: "Automation Updates", enabled: false },
  { id: "maintenance", label: "Device Maintenance Reminders", enabled: false },
  { id: "security", label: "Security Alerts", enabled: true },
  { id: "weather", label: "Weather-Based Suggestions", enabled: true },
  { id: "community", label: "Community Updates", enabled: false },
  { id: "invitations", label: "Home Invitations", enabled: true },
  { id: "access", label: "User Access Alerts", enabled: false },
  { id: "support", label: "Customer Support Updates", enabled: false },
  { id: "feedback", label: "Feedback & Updates", enabled: false },
];

export function NotificationsSettingsScreen({ onBack }: NotificationsSettingsScreenProps) {
  const [settings, setSettings] = useState(initialSettings);

  const toggleSetting = (id: string) => {
    setSettings(settings.map(s => 
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ));
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 py-3">
        <span className="text-sm font-medium">9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-1 h-3 bg-foreground rounded-sm" />
            ))}
          </div>
          <Wifi className="w-4 h-4" />
          <div className="w-6 h-3 bg-foreground rounded-sm" />
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center px-4 py-4">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-xl font-bold text-center mr-10">Notifications</h1>
      </div>

      {/* Settings List */}
      <div className="flex-1 px-4 overflow-auto">
        {settings.map((setting) => (
          <div
            key={setting.id}
            className="flex items-center justify-between py-4"
          >
            <span className="font-medium text-foreground">{setting.label}</span>
            <button
              onClick={() => toggleSetting(setting.id)}
              className={`w-12 h-7 rounded-full transition-colors ${
                setting.enabled ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  setting.enabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
