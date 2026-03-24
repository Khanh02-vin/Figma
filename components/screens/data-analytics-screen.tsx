"use client";

import { ArrowLeft, ChevronRight, Wifi } from "lucide-react";

interface DataAnalyticsScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string) => void;
}

const settings = [
  { 
    id: "usage", 
    label: "Data Usage",
    description: "Control how your data is used for analytics. Customize your preferences."
  },
  { 
    id: "ads", 
    label: "Ad Preferences",
    description: "Manage ad personalization settings. Tailor your ad experience."
  },
  { 
    id: "download", 
    label: "Download My Data",
    description: "Request a copy of your data. Your information, your control."
  },
];

export function DataAnalyticsScreen({ onBack, onNavigate }: DataAnalyticsScreenProps) {
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
        <h1 className="flex-1 text-xl font-bold text-center mr-10">Data & Analytics</h1>
      </div>

      {/* Settings List */}
      <div className="flex-1 px-4 overflow-auto">
        {settings.map((setting) => (
          <button
            key={setting.id}
            className="w-full flex items-center justify-between py-4"
          >
            <div className="flex-1 text-left">
              <span className="font-semibold text-foreground">{setting.label}</span>
              <p className="text-sm text-muted-foreground mt-1">{setting.description}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground ml-4" />
          </button>
        ))}
      </div>
    </div>
  );
}
