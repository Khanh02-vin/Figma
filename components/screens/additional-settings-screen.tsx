"use client";

import { ArrowLeft, ChevronRight, Wifi } from "lucide-react";

interface AdditionalSettingsScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string) => void;
}

const settings = [
  { id: "temp", label: "Temperature Units", value: "Celsius" },
  { id: "cache", label: "Clear Cache", value: "15.6 MB" },
  { id: "experimental", label: "Experimental Features", value: null },
  { id: "permissions", label: "System Permissions", value: null },
  { id: "legal", label: "Legal Information", value: null },
  { id: "updates", label: "Check for Updates", value: null },
];

export function AdditionalSettingsScreen({ onBack, onNavigate }: AdditionalSettingsScreenProps) {
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
        <h1 className="flex-1 text-xl font-bold text-center mr-10">Additional Settings</h1>
      </div>

      {/* Settings List */}
      <div className="flex-1 px-4 overflow-auto">
        {settings.map((setting) => (
          <button
            key={setting.id}
            className="w-full flex items-center justify-between py-5"
          >
            <span className="font-medium text-foreground">{setting.label}</span>
            <div className="flex items-center gap-2">
              {setting.value && (
                <span className="text-muted-foreground">{setting.value}</span>
              )}
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
