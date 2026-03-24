"use client";

import { useState } from "react";
import { Check, Settings } from "lucide-react";

interface SwitchHomeModalProps {
  onClose: () => void;
  onSelect: (home: string) => void;
  currentHome: string;
}

const homes = [
  "My Home",
  "My Apartment",
  "My Office",
  "My Parents' House",
  "My Garden",
];

export function SwitchHomeModal({ onClose, onSelect, currentHome }: SwitchHomeModalProps) {
  const [selected, setSelected] = useState(currentHome);

  return (
    <div className="absolute inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      
      {/* Menu */}
      <div className="absolute top-20 left-4 right-20 bg-white rounded-2xl shadow-xl overflow-hidden">
        {homes.map((home, index) => (
          <button
            key={home}
            onClick={() => {
              setSelected(home);
              onSelect(home);
            }}
            className="flex items-center gap-3 w-full px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
          >
            {selected === home ? (
              <Check className="w-5 h-5 text-primary" />
            ) : (
              <div className="w-5 h-5" />
            )}
            <span className={`font-medium ${selected === home ? "text-gray-900" : "text-gray-700"}`}>
              {home}
            </span>
          </button>
        ))}
        <button
          onClick={onClose}
          className="flex items-center gap-3 w-full px-4 py-4 hover:bg-gray-50 transition-colors"
        >
          <Settings className="w-5 h-5 text-gray-500" />
          <span className="font-medium text-gray-700">Home Management</span>
        </button>
      </div>
    </div>
  );
}
