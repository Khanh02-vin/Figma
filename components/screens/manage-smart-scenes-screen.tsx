"use client";

import { useState } from "react";
import { ArrowLeft, MoreVertical, GripVertical, Trash2, Check } from "lucide-react";

interface ManageSmartScenesScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string) => void;
}

const automationScenes = [
  { id: 1, name: "Turn on the AC" },
  { id: 2, name: "Welcome Home Automation" },
  { id: 3, name: "Bedtime Bliss Automation" },
  { id: 4, name: "Turn ON All the Lights" },
  { id: 5, name: "Go to Office" },
  { id: 6, name: "Energy Saver Mode" },
  { id: 7, name: "Work Mode Activate" },
  { id: 8, name: "Night Time Bliss" },
];

const tapToRunScenes = [
  { id: 1, name: "Bedtime Prep" },
  { id: 2, name: "Evening Chill" },
  { id: 3, name: "Boost Productivity" },
  { id: 4, name: "Get Energized" },
  { id: 5, name: "Home Office" },
  { id: 6, name: "Reading Corner" },
  { id: 7, name: "Outdoor Party" },
];

export function ManageSmartScenesScreen({ onBack, onNavigate }: ManageSmartScenesScreenProps) {
  const [tab, setTab] = useState<"automation" | "tap-to-run">("automation");
  const [scenes, setScenes] = useState(automationScenes);
  const [tapScenes, setTapScenes] = useState(tapToRunScenes);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sceneToDelete, setSceneToDelete] = useState<{ id: number; name: string } | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [deletedSceneName, setDeletedSceneName] = useState("");
  const [draggingId, setDraggingId] = useState<number | null>(null);

  const handleDelete = (scene: { id: number; name: string }) => {
    setSceneToDelete(scene);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (sceneToDelete) {
      setDeletedSceneName(sceneToDelete.name);
      if (tab === "automation") {
        setScenes(scenes.filter((s) => s.id !== sceneToDelete.id));
      } else {
        setTapScenes(tapScenes.filter((s) => s.id !== sceneToDelete.id));
      }
      setShowDeleteModal(false);
      setSceneToDelete(null);
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
    }
  };

  const currentScenes = tab === "automation" ? scenes : tapScenes;

  return (
    <div className="mobile-container flex flex-col bg-muted min-h-screen relative">
      {/* Status Bar */}
      <div className="flex items-center justify-between px-6 pt-3 pb-2">
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
      <div className="flex items-center justify-between px-4 py-3">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-xl font-bold text-foreground">Manage Smart Scenes</h1>
        <button className="w-10 h-10 flex items-center justify-center">
          <MoreVertical className="w-6 h-6 text-foreground" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex mx-4 bg-muted rounded-xl p-1">
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

      {/* Scene List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {currentScenes.map((scene) => (
          <div
            key={scene.id}
            className={`bg-white rounded-2xl px-4 py-4 flex items-center gap-3 transition-all ${
              draggingId === scene.id ? "shadow-lg scale-[1.02]" : ""
            }`}
          >
            <button
              onMouseDown={() => setDraggingId(scene.id)}
              onMouseUp={() => setDraggingId(null)}
              onTouchStart={() => setDraggingId(scene.id)}
              onTouchEnd={() => setDraggingId(null)}
              className="touch-none"
            >
              <GripVertical className="w-5 h-5 text-muted-foreground" />
            </button>
            <span className="flex-1 font-medium text-foreground">{scene.name}</span>
            <button
              onClick={() => handleDelete(scene)}
              className="w-10 h-10 flex items-center justify-center"
            >
              <Trash2 className="w-5 h-5 text-red-500" />
            </button>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && sceneToDelete && (
        <div className="absolute inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-3xl w-full p-6 animate-slide-up">
            <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-6" />
            <h2 className="text-xl font-bold text-red-500 text-center mb-4">Delete Smart Scene</h2>
            <div className="border-t border-muted mb-6" />
            <p className="text-center text-foreground mb-6">
              Are you sure you want to delete the scene{" "}
              <span className="font-semibold">{`"${sceneToDelete.name}"`}</span> ?
            </p>
            <div className="border-t border-muted mb-6" />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSceneToDelete(null);
                }}
                className="flex-1 py-4 rounded-full bg-muted text-primary font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-4 rounded-full bg-primary text-white font-semibold"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="absolute inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-3xl w-full p-6 animate-slide-up">
            <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-6" />
            <div className="flex flex-col items-center py-6">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <p className="text-center text-foreground">
                Scene {`"${deletedSceneName}"`} successfully deleted!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
