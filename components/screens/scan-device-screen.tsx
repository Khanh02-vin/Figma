"use client";

import { X, MoreVertical, Minus, User } from "lucide-react";

interface ScanDeviceScreenProps {
  onClose: () => void;
  onManualEntry: () => void;
}

export function ScanDeviceScreen({ onClose, onManualEntry }: ScanDeviceScreenProps) {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-amber-100/80 to-amber-200/80 relative overflow-hidden">
      {/* Background blur effect */}
      <div className="absolute inset-0 backdrop-blur-sm" />

      {/* Header */}
      <div className="relative flex items-center justify-between p-4 z-10">
        <button onClick={onClose} className="p-2 -ml-2">
          <X className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Scan Device</h1>
        <button className="p-2 -mr-2">
          <MoreVertical className="w-6 h-6 text-foreground" />
        </button>
      </div>

      {/* Scanner Area */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="relative w-72 h-72">
          {/* Scanner Frame Corners */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-white rounded-tl-3xl" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-white rounded-tr-3xl" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-white rounded-bl-3xl" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-white rounded-br-3xl" />

          {/* Device Preview (Speaker) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-48 relative">
              <svg viewBox="0 0 100 120" className="w-full h-full">
                <ellipse cx="50" cy="70" rx="35" ry="45" fill="#F5F5F5" stroke="#E8E8E8" strokeWidth="2" />
                <ellipse cx="50" cy="30" rx="28" ry="10" fill="#E8E8E8" />
              </svg>
            </div>
          </div>

          {/* QR Code Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-white/90 p-2 rounded">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* QR Code pattern */}
                <rect x="0" y="0" width="30" height="30" fill="#000" />
                <rect x="5" y="5" width="20" height="20" fill="#fff" />
                <rect x="10" y="10" width="10" height="10" fill="#000" />
                
                <rect x="70" y="0" width="30" height="30" fill="#000" />
                <rect x="75" y="5" width="20" height="20" fill="#fff" />
                <rect x="80" y="10" width="10" height="10" fill="#000" />
                
                <rect x="0" y="70" width="30" height="30" fill="#000" />
                <rect x="5" y="75" width="20" height="20" fill="#fff" />
                <rect x="10" y="80" width="10" height="10" fill="#000" />
                
                {/* Data pattern */}
                <rect x="40" y="5" width="5" height="5" fill="#000" />
                <rect x="50" y="5" width="5" height="5" fill="#000" />
                <rect x="35" y="15" width="5" height="5" fill="#000" />
                <rect x="45" y="15" width="5" height="5" fill="#000" />
                <rect x="55" y="15" width="5" height="5" fill="#000" />
                
                <rect x="5" y="40" width="5" height="5" fill="#000" />
                <rect x="15" y="40" width="5" height="5" fill="#000" />
                <rect x="5" y="50" width="5" height="5" fill="#000" />
                <rect x="20" y="50" width="5" height="5" fill="#000" />
                
                <rect x="75" y="40" width="5" height="5" fill="#000" />
                <rect x="85" y="40" width="5" height="5" fill="#000" />
                <rect x="80" y="50" width="5" height="5" fill="#000" />
                <rect x="90" y="55" width="5" height="5" fill="#000" />
                
                <rect x="40" y="40" width="20" height="20" fill="#000" />
                <rect x="45" y="45" width="10" height="10" fill="#fff" />
                
                <rect x="35" y="75" width="5" height="5" fill="#000" />
                <rect x="45" y="80" width="5" height="5" fill="#000" />
                <rect x="55" y="75" width="5" height="5" fill="#000" />
                <rect x="40" y="90" width="5" height="5" fill="#000" />
                <rect x="55" y="90" width="5" height="5" fill="#000" />
                
                <rect x="75" y="75" width="5" height="5" fill="#000" />
                <rect x="85" y="80" width="5" height="5" fill="#000" />
                <rect x="80" y="90" width="5" height="5" fill="#000" />
              </svg>
            </div>
          </div>

          {/* Scan Line Animation */}
          <div className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 p-6 pb-8">
        <p className="text-center text-foreground/80 mb-4">
          Can't scan the QR code?
        </p>
        <button
          onClick={onManualEntry}
          className="w-full py-4 bg-foreground/20 backdrop-blur-sm rounded-full text-foreground font-medium"
        >
          Enter setup code manually
        </button>

        {/* Bottom Controls */}
        <div className="flex items-center justify-center gap-8 mt-6">
          <button className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center">
            <Minus className="w-5 h-5 text-foreground" />
          </button>
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center relative">
            <div className="w-14 h-14 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
          <button className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center">
            <User className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0%, 100% {
            top: 10%;
            opacity: 0;
          }
          50% {
            top: 90%;
            opacity: 1;
          }
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
