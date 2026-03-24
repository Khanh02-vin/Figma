"use client";

import { X, Plus, ScanLine } from "lucide-react";

interface AddMenuModalProps {
  onClose: () => void;
  onAddDevice: () => void;
  onScan: () => void;
}

export function AddMenuModal({ onClose, onAddDevice, onScan }: AddMenuModalProps) {
  return (
    <div className="absolute inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      
      {/* Menu */}
      <div className="absolute bottom-28 right-4 bg-white rounded-2xl shadow-xl p-2 min-w-[180px]">
        <button
          onClick={onAddDevice}
          className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors"
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="4" y="6" width="16" height="12" rx="2" />
              <path d="M8 3v3M16 3v3" />
            </svg>
          </div>
          <span className="font-medium text-gray-900">Add Device</span>
        </button>
        <div className="h-px bg-gray-100 mx-4" />
        <button
          onClick={onScan}
          className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors"
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <ScanLine className="w-6 h-6 text-gray-700" />
          </div>
          <span className="font-medium text-gray-900">Scan</span>
        </button>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute bottom-28 right-4 w-14 h-14 rounded-full bg-primary shadow-lg flex items-center justify-center"
        style={{ transform: "translateY(80px)" }}
      >
        <X className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
