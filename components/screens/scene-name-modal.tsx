"use client";

import { useState } from "react";

interface SceneNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  initialName?: string;
}

export function SceneNameModal({
  isOpen,
  onClose,
  onSave,
  initialName = "Welcome Home Automation",
}: SceneNameModalProps) {
  const [name, setName] = useState(initialName);

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
          <h2 className="text-lg font-bold text-foreground">Scene Name</h2>
        </div>

        {/* Input */}
        <div className="px-6 pb-8">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-lg text-gray-900 placeholder-gray-400"
            placeholder="Enter scene name"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 px-6 pb-8">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 rounded-full bg-indigo-50 text-primary font-semibold hover:bg-indigo-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (name.trim()) {
                onSave(name.trim());
                onClose();
              }
            }}
            className="flex-1 py-3.5 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
