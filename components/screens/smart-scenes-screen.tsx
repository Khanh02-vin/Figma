"use client";

import { useState } from "react";
import { Home, CheckSquare, BarChart3, User, Plus, ChevronDown, ChevronRight, FileText, LayoutGrid, Clock, Sun, MapPin, Tag, Briefcase } from "lucide-react";

interface SmartScenesScreenProps {
  onNavigate: (screen: string) => void;
}

const automations = [
  {
    id: 1,
    name: "Turn ON All the Lights",
    tasks: 1,
    triggers: [{ type: "time", color: "bg-green-500" }],
    actions: [{ type: "sun", color: "bg-orange-400" }],
    isOn: true,
  },
  {
    id: 2,
    name: "Go to Office",
    tasks: 2,
    triggers: [{ type: "location", color: "bg-red-500" }, { type: "time", color: "bg-green-500" }],
    actions: [{ type: "time", color: "bg-blue-500" }, { type: "tag", color: "bg-cyan-400" }],
    isOn: true,
  },
  {
    id: 3,
    name: "Energy Saver Mode",
    tasks: 2,
    triggers: [{ type: "briefcase", color: "bg-blue-400" }],
    actions: [{ type: "check", color: "bg-purple-500" }, { type: "circle", color: "bg-red-400" }],
    isOn: false,
  },
  {
    id: 4,
    name: "Work Mode Activate",
    tasks: 1,
    triggers: [{ type: "hand", color: "bg-blue-500" }],
    actions: [{ type: "tag", color: "bg-gray-600" }],
    isOn: true,
  },
  {
    id: 5,
    name: "Night Time Bliss",
    tasks: 2,
    triggers: [{ type: "moon", color: "bg-indigo-500" }],
    actions: [{ type: "lamp", color: "bg-yellow-400" }, { type: "music", color: "bg-green-500" }],
    isOn: false,
  },
];

const tapToRunScenes = [
  { id: "t1", name: "Quick Lights ON", tasks: 1, color: "bg-orange-500", textColor: "text-white", iconType: "sun" },
  { id: "t2", name: "Bedtime Prep", tasks: 2, color: "bg-blue-500", textColor: "text-white", iconType: "moon" },
  { id: "t3", name: "Evening Chill", tasks: 4, color: "bg-green-500", textColor: "text-white", iconType: "sunset" },
  { id: "t4", name: "Boost Productivity", tasks: 1, color: "bg-purple-500", textColor: "text-white", iconType: "chart" },
  { id: "t5", name: "Get Energized", tasks: 3, color: "bg-red-500", textColor: "text-white", iconType: "flame" },
  { id: "t6", name: "Home Office", tasks: 2, color: "bg-teal-500", textColor: "text-white", iconType: "house" },
  { id: "t7", name: "Reading Corner", tasks: 4, color: "bg-yellow-800", textColor: "text-white", iconType: "book" },
  { id: "t8", name: "Outdoor Party", tasks: 3, color: "bg-slate-500", textColor: "text-white", iconType: "party" },
];

export function SmartScenesScreen({ onNavigate }: SmartScenesScreenProps) {
  const navigate = (screen: string) => {
    if (onNavigate) onNavigate(screen);
  };
  const [tab, setTab] = useState<"automation" | "tap-to-run">("automation");
  const [automationStates, setAutomationStates] = useState<Record<number, boolean>>(
    Object.fromEntries(automations.map(a => [a.id, a.isOn]))
  );

  const toggleAutomation = (id: number) => {
    setAutomationStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const SmallBadge = ({ color }: { color: string }) => (
    <div className={`w-6 h-6 rounded-full ${color} flex items-center justify-center flex-shrink-0`}>
      <span className="w-2.5 h-2.5 bg-white rounded-full opacity-80" />
    </div>
  );

  const triggerIcon = (type: string) => {
    if (type === "time") return <Clock className="w-3 h-3 text-white" />;
    if (type === "location") return <MapPin className="w-3 h-3 text-white" />;
    if (type === "briefcase") return <Briefcase className="w-3 h-3 text-white" />;
    if (type === "hand") return <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="currentColor"><path d="M10.5 3a4.5 4.5 0 0 1 4.5 4.5V10l3.5 1.5L21 10V7.5A4.5 4.5 0 0 0 16.5 3H10.5z"/></svg>;
    return <span className="w-3 h-3 bg-white rounded-full opacity-80" />;
  };

  const actionIcon = (type: string) => {
    if (type === "sun") return <Sun className="w-3 h-3 text-white" />;
    if (type === "tag") return <Tag className="w-3 h-3 text-white" />;
    if (type === "lamp") return <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="currentColor"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>;
    if (type === "music") return <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>;
    return <span className="w-3 h-3 bg-white rounded-full opacity-80" />;
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-2 pb-4 bg-white">
        <div className="flex items-center gap-1">
          <span className="text-xl font-bold text-gray-900">My Home</span>
          <ChevronDown className="w-5 h-5 text-gray-600" />
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-gray-600" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center">
            <LayoutGrid className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mx-4 bg-gray-100 rounded-xl p-1">
        <button
          onClick={() => setTab("automation")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            tab === "automation" ? "bg-primary text-white" : "text-gray-600"
          }`}
        >
          Automation
        </button>
        <button
          onClick={() => setTab("tap-to-run")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            tab === "tap-to-run" ? "bg-primary text-white" : "text-gray-600"
          }`}
        >
          Tap-to-Run
        </button>
      </div>

      {/* Content — Automation or Tap-to-Run */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        {tab === "automation" ? (
          /* Automation list */
          <div className="space-y-3">
            {automations.map((automation) => (
              <div key={automation.id} className="bg-white rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">{automation.name}</h3>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{automation.tasks} task{automation.tasks > 1 ? "s" : ""}</p>
                    <div className="flex items-center gap-2">
                      {automation.triggers.map((t, i) => (
                        <div key={`t-${i}`} className={`w-7 h-7 rounded-full ${t.color} flex items-center justify-center`}>
                          {triggerIcon(t.type)}
                        </div>
                      ))}
                      <span className="text-gray-400 mx-1">→</span>
                      {automation.actions.map((a, i) => (
                        <div key={`a-${i}`} className={`w-7 h-7 rounded-full ${a.color} flex items-center justify-center`}>
                          {actionIcon(a.type)}
                        </div>
                      ))}
                      <div className="ml-auto" onClick={() => toggleAutomation(automation.id)}>
                        <div className={`w-12 h-7 rounded-full p-0.5 transition-colors ${automationStates[automation.id] ? "bg-primary" : "bg-gray-300"}`}>
                          <div className={`w-6 h-6 rounded-full bg-white shadow transition-transform ${automationStates[automation.id] ? "translate-x-5" : ""}`} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Tap-to-Run grid */
          <div className="grid grid-cols-2 gap-3">
            {tapToRunScenes.map((scene) => (
              <button
                key={scene.id}
                onClick={() => navigate("create-scene")}
                className={`${scene.color} rounded-2xl p-4 text-left flex flex-col gap-2`}
              >
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  {/* Sun — Quick Lights ON */}
                  {scene.iconType === "sun" && (
                    <svg viewBox="0 0 24 24" className={`w-5 h-5 ${scene.textColor}`} fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="5"/>
                      <line x1="12" y1="1" x2="12" y2="3"/>
                      <line x1="12" y1="21" x2="12" y2="23"/>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                      <line x1="1" y1="12" x2="3" y2="12"/>
                      <line x1="21" y1="12" x2="23" y2="12"/>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                    </svg>
                  )}
                  {/* Moon — Bedtime Prep */}
                  {scene.iconType === "moon" && (
                    <svg viewBox="0 0 24 24" className={`w-5 h-5 ${scene.textColor}`} fill="currentColor">
                      <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.97 5.97 0 0 1-4.27-4.36A6 6 0 0 1 12 3z"/>
                    </svg>
                  )}
                  {/* Sunset — Evening Chill */}
                  {scene.iconType === "sunset" && (
                    <svg viewBox="0 0 24 24" className={`w-5 h-5 ${scene.textColor}`} fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 18a5 5 0 0 0-10 0"/>
                      <line x1="12" y1="2" x2="12" y2="9"/>
                      <line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/>
                      <line x1="2" y1="18" x2="22" y2="18"/>
                      <line x1="18.36" y1="10.22" x2="19.78" y2="11.64"/>
                    </svg>
                  )}
                  {/* Chart — Boost Productivity */}
                  {scene.iconType === "chart" && (
                    <svg viewBox="0 0 24 24" className={`w-5 h-5 ${scene.textColor}`} fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                      <polyline points="17 6 23 6 18 6"/>
                    </svg>
                  )}
                  {/* Flame — Get Energized */}
                  {scene.iconType === "flame" && (
                    <svg viewBox="0 0 24 24" className={`w-5 h-5 ${scene.textColor}`} fill="currentColor">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                    </svg>
                  )}
                  {/* House — Home Office */}
                  {scene.iconType === "house" && (
                    <svg viewBox="0 0 24 24" className={`w-5 h-5 ${scene.textColor}`} fill="currentColor">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    </svg>
                  )}
                  {/* Book — Reading Corner */}
                  {scene.iconType === "book" && (
                    <svg viewBox="0 0 24 24" className={`w-5 h-5 ${scene.textColor}`} fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                    </svg>
                  )}
                  {/* Party — Outdoor Party */}
                  {scene.iconType === "party" && (
                    <svg viewBox="0 0 24 24" className={`w-5 h-5 ${scene.textColor}`} fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5.8 11a7 7 0 0 0 10.4 1.4L20 8l-3-4-4 2-4-2-3 4 3.6 4.6A7 7 0 0 0 5.8 11z"/>
                      <path d="M2 20l3.5-3.5M22 20l-3.5-3.5"/>
                    </svg>
                  )}
                </div>
                <p className={`font-semibold text-sm ${scene.textColor}`}>{scene.name}</p>
                <p className={`text-xs ${scene.textColor} opacity-70`}>{scene.tasks} task{scene.tasks > 1 ? "s" : ""}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Add Button */}
      <button
        onClick={() => navigate("create-scene")}
        className="absolute bottom-24 right-4 w-14 h-14 rounded-full bg-primary shadow-lg flex items-center justify-center"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3">
        <div className="flex justify-between items-center">
          <button onClick={() => navigate("home-dashboard")} className="flex flex-col items-center gap-1">
            <Home className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <CheckSquare className="w-5 h-5 text-primary" fill="currentColor" />
            <span className="text-xs text-primary font-medium">Smart</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <BarChart3 className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Reports</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <User className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Account</span>
          </button>
        </div>
      </div>
    </div>
  );
}
