"use client";

import { useState } from "react";
import { ArrowLeft, MoreVertical, Plus, X, ChevronRight } from "lucide-react";
import { PrimaryButton } from "@/components/smartify";
import { SceneNameModal } from "./scene-name-modal";
import { StyleModal } from "./style-modal";

interface CreateSceneScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function CreateSceneScreen({ onBack, onNavigate }: CreateSceneScreenProps) {
  const [showStyleModal, setShowStyleModal] = useState(false);
  const [showSceneNameModal, setShowSceneNameModal] = useState(false);
  const [sceneName, setSceneName] = useState("Quick Lights ON");
  const [selectedColor, setSelectedColor] = useState("#FF6B00");
  const [selectedIcon, setSelectedIcon] = useState("sun");

  return (
    <div className="relative flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-white">
        <button onClick={onBack} className="p-1">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Create Scene</h1>
        <button>
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

        {/* IF Section */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="font-bold text-gray-900">If</span>
            <button className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Launch Tap-to-Run item */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              {/* Hand tap icon */}
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2"/>
                <path d="M10 8v4a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V8"/>
                <path d="M18 8v4a2 2 0 0 1-2 2h0"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Launch Tap-to-Run</p>
              <p className="text-sm text-gray-500">One tap to execute commands</p>
            </div>
            <button className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
              <X className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>

        {/* THEN Section */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="font-bold text-gray-900">Then</span>
            <button className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Turn ON All the Lights */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
              {/* Light bulb icon */}
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-orange-500" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm2 14H9v-1h5v1zm1.31-3.26L13 14.45V16h-2v-1.55l-2.31-1.71A5.98 5.98 0 0 0 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5a5.98 5.98 0 0 0-1.69 3.74z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Turn ON All the Lights</p>
              <p className="text-sm text-gray-500">Automation: Enable</p>
            </div>
            <button className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
              <X className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Style Section */}
      <button
        onClick={() => setShowStyleModal(true)}
        className="bg-white flex items-center justify-between px-4 py-4 mx-4 mb-4 rounded-2xl text-left"
      >
        <span className="font-bold text-gray-900">Style</span>
        <div className="flex items-center gap-2">
          {/* Sun icon in orange circle */}
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2">
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
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </button>

      {/* Save Button */}
      <div className="p-4 bg-white border-t border-gray-100">
        <PrimaryButton onClick={() => setShowSceneNameModal(true)} className="w-full">
          Save
        </PrimaryButton>
      </div>

      {/* Style Modal */}
      <StyleModal
        isOpen={showStyleModal}
        onClose={() => setShowStyleModal(false)}
        selectedColor={selectedColor}
        selectedIcon={selectedIcon}
        onColorChange={setSelectedColor}
        onIconChange={setSelectedIcon}
      />

      {/* Scene Name Modal */}
      <SceneNameModal
        isOpen={showSceneNameModal}
        onClose={() => setShowSceneNameModal(false)}
        onSave={(name) => {
          setSceneName(name);
          setShowSceneNameModal(false);
        }}
        initialName={sceneName}
      />
    </div>
  );
}
