"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, MoreVertical } from "lucide-react";
import { PrimaryButton } from "@/components/smartify";

interface SelectSmartSceneScreenProps {
  onBack: () => void;
  onConfirm?: () => void;
}

interface Scene {
  id: string;
  name: string;
  sublabel: string;
  color: string;
  textColor: string;
  isAutomation?: boolean;
}

const automationScenes: Scene[] = [
  { id: "1", name: "Turn ON All the Lights", sublabel: "Start", color: "bg-white", textColor: "text-gray-900", isAutomation: true },
  { id: "2", name: "Go to Office", sublabel: "Stop", color: "bg-white", textColor: "text-gray-900", isAutomation: true },
  { id: "3", name: "Energy Saver Mode", sublabel: "Stop", color: "bg-white", textColor: "text-gray-900", isAutomation: true },
  { id: "4", name: "Work Mode Activate", sublabel: "Stop", color: "bg-white", textColor: "text-gray-900", isAutomation: true },
  { id: "5", name: "Movie Night Magic", sublabel: "Stop", color: "bg-white", textColor: "text-gray-900", isAutomation: true },
  { id: "6", name: "Guests Arriving", sublabel: "Stop", color: "bg-white", textColor: "text-gray-900", isAutomation: true },
];

const tapToRunScenes: Scene[] = [
  { id: "t1", name: "Bedtime Prep", sublabel: "2 tasks", color: "bg-blue-500", textColor: "text-white" },
  { id: "t2", name: "Evening Chill", sublabel: "4 tasks", color: "bg-green-500", textColor: "text-white" },
  { id: "t3", name: "Boost Productivity", sublabel: "1 task", color: "bg-purple-500", textColor: "text-white" },
  { id: "t4", name: "Get Energized", sublabel: "3 tasks", color: "bg-orange-500", textColor: "text-white" },
  { id: "t5", name: "Home Office", sublabel: "2 tasks", color: "bg-cyan-500", textColor: "text-white" },
  { id: "t6", name: "Reading Corner", sublabel: "4 tasks", color: "bg-yellow-700", textColor: "text-white" },
  { id: "t7", name: "Outdoor Party", sublabel: "3 tasks", color: "bg-gray-500", textColor: "text-white" },
];

export function SelectSmartSceneScreen({ onBack, onConfirm }: SelectSmartSceneScreenProps) {
  const [tab, setTab] = useState<"automation" | "tap-to-run">("tap-to-run");
  const [selected, setSelected] = useState<string>("");

  // Set default selection
  useEffect(() => {
    if (tab === "tap-to-run" && !selected) setSelected("t1");
    if (tab === "automation" && !selected) setSelected("1");
  }, [tab]);

  const scenes = tab === "automation" ? automationScenes : tapToRunScenes;
  const selectedScene = scenes.find((s) => s.id === selected);

  const handleOK = () => {
    if (selectedScene) {
      try {
        sessionStorage.setItem("pending_task", JSON.stringify({
          id: Date.now(),
          iconColor: "text-green-500",
          iconBg: "bg-green-50",
          label: selectedScene.name,
          sublabel: selectedScene.sublabel,
          detail: `${selectedScene.isAutomation ? "Automation" : "Tap-to-Run"}: ${selectedScene.sublabel}`,
        }));
      } catch (_) {}
    }
    if (onConfirm) onConfirm();
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-white">
        <button onClick={onBack} className="p-1">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Select Smart Scene</h1>
        <button>
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex mx-4 mt-4 bg-gray-100 rounded-xl p-1">
        <button
          onClick={() => { setTab("automation"); setSelected("1"); }}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            tab === "automation" ? "bg-primary text-white" : "text-gray-600"
          }`}
        >
          Automation
        </button>
        <button
          onClick={() => { setTab("tap-to-run"); setSelected("t1"); }}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            tab === "tap-to-run" ? "bg-primary text-white" : "text-gray-600"
          }`}
        >
          Tap-to-Run
        </button>
      </div>

      {/* Scene List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {tab === "tap-to-run" ? (
          /* Tap-to-Run: colored cards with icons */
          scenes.map((scene) => (
            <button
              key={scene.id}
              onClick={() => setSelected(scene.id)}
              className={`w-full rounded-2xl px-5 py-4 flex items-center justify-between ${scene.color} ${scene.textColor}`}
            >
              <div className="flex items-center gap-3">
                {/* Scene icon */}
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  {scene.name.includes("Bedtime") && (
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                      <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.97 5.97 0 0 1-4.27-4.36A6 6 0 0 1 12 3z"/>
                    </svg>
                  )}
                  {scene.name.includes("Evening") && (
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                      <path d="M12 2L6 8h12L12 2zm0 20l6-6H6l6 6zm0-8l-6-6h12l-6 6z"/>
                    </svg>
                  )}
                  {scene.name.includes("Boost") && (
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                      <polyline points="17 6 23 6 18 6"/>
                    </svg>
                  )}
                  {scene.name.includes("Energized") && (
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c3.94.49 7 3.85 7 7.93s-3.05 7.44-7 7.93V4.07z"/>
                    </svg>
                  )}
                  {scene.name.includes("Office") && (
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    </svg>
                  )}
                  {scene.name.includes("Reading") && (
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                      <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                      <polyline points="18 2 18 22 6 22 6 2"/>
                    </svg>
                  )}
                  {scene.name.includes("Outdoor") && (
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                      <path d="M17 3H7a2 2 0 0 0-2 2v16l7-3 7 3V5a2 2 0 0 0-2-2z"/>
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-left">{scene.name}</p>
                  <p className="text-sm opacity-80 text-left">{scene.sublabel}</p>
                </div>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selected === scene.id ? "border-white bg-white" : "border-white/50"
                }`}
              >
                {selected === scene.id && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
              </div>
            </button>
          ))
        ) : (
          /* Automation: white card style */
          scenes.map((scene) => (
            <button
              key={scene.id}
              onClick={() => setSelected(scene.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 bg-white rounded-2xl border-2 transition-colors ${
                selected === scene.id ? "border-primary" : "border-transparent"
              }`}
            >
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-900">{scene.name}</p>
                <p className="text-sm text-gray-500">{scene.sublabel}</p>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selected === scene.id ? "border-primary bg-primary" : "border-gray-300"
                }`}
              >
                {selected === scene.id && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
              </div>
            </button>
          ))
        )}
      </div>

      {/* OK Button */}
      <div className="p-4 bg-white border-t border-gray-100">
        <PrimaryButton onClick={handleOK} className="w-full">
          OK
        </PrimaryButton>
      </div>
    </div>
  );
}
