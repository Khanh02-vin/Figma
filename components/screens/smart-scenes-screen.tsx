"use client";

import { useState } from "react";
import { Home, CheckSquare, BarChart3, User, Plus, ChevronDown, ChevronRight, FileText, LayoutGrid } from "lucide-react";

interface SmartScenesScreenProps {
  onNavigate: (screen: string) => void;
}

const tapToRunScenes = [
  { id: "t1", name: "Quick Lights ON", tasks: 1, color: "bg-orange-500", iconType: "sun" },
  { id: "t2", name: "Bedtime Prep", tasks: 2, color: "bg-blue-500", iconType: "moon" },
  { id: "t3", name: "Evening Chill", tasks: 4, color: "bg-green-500", iconType: "sunset" },
  { id: "t4", name: "Boost Productivity", tasks: 1, color: "bg-purple-600", iconType: "chart" },
  { id: "t5", name: "Get Energized", tasks: 3, color: "bg-red-500", iconType: "flame" },
  { id: "t6", name: "Home Office", tasks: 2, color: "bg-cyan-500", iconType: "house" },
  { id: "t7", name: "Reading Corner", tasks: 4, color: "bg-amber-800", iconType: "book" },
  { id: "t8", name: "Outdoor Party", tasks: 3, color: "bg-slate-500", iconType: "party" },
];

const automations = [
  { id: 1, name: "Turn ON All the Lights", tasks: 1, isOn: true },
  { id: 2, name: "Go to Office", tasks: 2, isOn: true },
  { id: 3, name: "Energy Saver Mode", tasks: 2, isOn: false },
  { id: 4, name: "Work Mode Activate", tasks: 1, isOn: true },
  { id: 5, name: "Night Time Bliss", tasks: 2, isOn: false },
];

function SceneIcon({ type }: { type: string }) {
  switch (type) {
    case "sun":
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      );
    case "moon":
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
          <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.97 5.97 0 0 1-4.27-4.36A6 6 0 0 1 12 3z" />
        </svg>
      );
    case "sunset":
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 18a5 5 0 0 0-10 0" />
          <line x1="12" y1="9" x2="12" y2="2" />
          <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
          <line x1="1" y1="18" x2="23" y2="18" />
          <line x1="18.36" y1="10.22" x2="19.78" y2="11.64" />
        </svg>
      );
    case "chart":
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );
    case "flame":
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
          <path d="M12 2c0 0-4 6-4 10a4 4 0 0 0 8 0c0-4-4-10-4-10z" />
        </svg>
      );
    case "house":
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      );
    case "book":
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      );
    case "party":
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    default:
      return null;
  }
}

export function SmartScenesScreen({ onNavigate }: SmartScenesScreenProps) {
  const [tab, setTab] = useState<"automation" | "tap-to-run">("tap-to-run");
  const [automationStates, setAutomationStates] = useState<Record<number, boolean>>(
    Object.fromEntries(automations.map((a) => [a.id, a.isOn]))
  );
  const [clickedScene, setClickedScene] = useState<string | null>(null);

  const handleSceneClick = (sceneId: string) => {
    setClickedScene(sceneId);
    setTimeout(() => setClickedScene(null), 1500);
  };

  const toggleAutomation = (id: number) => {
    setAutomationStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="mobile-container flex flex-col bg-muted min-h-screen relative">
      {/* Status Bar */}
      <div className="flex items-center justify-between px-6 pt-3 pb-2 bg-white">
        <span className="text-sm font-semibold">9:41</span>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <rect x="1" y="6" width="3" height="12" rx="1" />
            <rect x="6" y="4" width="3" height="14" rx="1" />
            <rect x="11" y="2" width="3" height="16" rx="1" />
            <rect x="16" y="4" width="3" height="14" rx="1" />
          </svg>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C7.5 3 3.75 5.5 2 9c1.75 3.5 5.5 6 10 6s8.25-2.5 10-6c-1.75-3.5-5.5-6-10-6z" />
          </svg>
          <div className="w-6 h-3 bg-foreground rounded-sm relative">
            <div className="absolute right-0 top-0.5 bottom-0.5 w-4 bg-foreground rounded-sm" />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white">
        <div className="flex items-center gap-1">
          <span className="text-xl font-bold text-foreground">My Home</span>
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate("smart-scenes-logs")}
            className="w-10 h-10 flex items-center justify-center"
          >
            <FileText className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={() => onNavigate("manage-smart-scenes")}
            className="w-10 h-10 flex items-center justify-center"
          >
            <LayoutGrid className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mx-4 mt-2 bg-muted rounded-xl p-1">
        <button
          onClick={() => setTab("automation")}
          className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-colors ${
            tab === "automation" ? "bg-primary text-white" : "text-muted-foreground"
          }`}
        >
          Automation
        </button>
        <button
          onClick={() => setTab("tap-to-run")}
          className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-colors ${
            tab === "tap-to-run" ? "bg-primary text-white" : "text-muted-foreground"
          }`}
        >
          Tap-to-Run
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-28">
        {tab === "tap-to-run" ? (
          <div className="grid grid-cols-2 gap-3">
            {tapToRunScenes.map((scene) => (
              <button
                key={scene.id}
                onClick={() => handleSceneClick(scene.id)}
                className={`${scene.color} rounded-2xl p-4 text-left relative overflow-hidden transition-transform active:scale-95`}
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center">
                    <SceneIcon type={scene.iconType} />
                  </div>
                  {clickedScene === scene.id ? (
                    <div className="w-8 h-8 rounded-full border-2 border-white/50 border-t-white animate-spin" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-white/70" />
                  )}
                </div>
                <p className="font-semibold text-white">{scene.name}</p>
                <p className="text-sm text-white/70">
                  {scene.tasks} task{scene.tasks > 1 ? "s" : ""}
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {automations.map((automation) => (
              <div key={automation.id} className="bg-white rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-foreground">{automation.name}</h3>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {automation.tasks} task{automation.tasks > 1 ? "s" : ""}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleAutomation(automation.id)}
                    className="ml-4"
                  >
                    <div
                      className={`w-12 h-7 rounded-full p-0.5 transition-colors ${
                        automationStates[automation.id] ? "bg-primary" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full bg-white shadow transition-transform ${
                          automationStates[automation.id] ? "translate-x-5" : ""
                        }`}
                      />
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Button */}
      <button
        onClick={() => onNavigate("create-scene")}
        className="absolute bottom-24 right-4 w-14 h-14 rounded-full bg-primary shadow-lg flex items-center justify-center"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-3">
        <div className="flex justify-between items-center">
          <button
            onClick={() => onNavigate("home-dashboard")}
            className="flex flex-col items-center gap-1"
          >
            <Home className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <CheckSquare className="w-5 h-5 text-primary" fill="currentColor" />
            <span className="text-xs text-primary font-medium">Smart</span>
          </button>
          <button
            onClick={() => onNavigate("reports")}
            className="flex flex-col items-center gap-1"
          >
            <BarChart3 className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Reports</span>
          </button>
          <button
            onClick={() => onNavigate("account-settings")}
            className="flex flex-col items-center gap-1"
          >
            <User className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Account</span>
          </button>
        </div>
      </div>
    </div>
  );
}
