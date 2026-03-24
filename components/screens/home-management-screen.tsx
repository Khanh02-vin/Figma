"use client";

import { ArrowLeft, MoreVertical, ChevronRight } from "lucide-react";

interface HomeManagementScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string) => void;
  onSelectHome?: (homeName: string) => void;
}

const homes = [
  { id: 1, name: "My Home" },
  { id: 2, name: "My Apartment" },
  { id: 3, name: "My Office" },
  { id: 4, name: "My Parents' House" },
  { id: 5, name: "My Garden" },
  { id: 6, name: "My Rental House" },
];

export function HomeManagementScreen({ onBack, onNavigate, onSelectHome }: HomeManagementScreenProps) {
  return (
    <div className="mobile-container flex flex-col bg-muted min-h-screen">
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
        <h1 className="text-xl font-bold text-foreground">Home Management</h1>
        <button className="w-10 h-10 flex items-center justify-center">
          <MoreVertical className="w-6 h-6 text-foreground" />
        </button>
      </div>

      {/* Home List */}
      <div className="mx-4 mt-4 bg-white rounded-2xl overflow-hidden">
        {homes.map((home, index) => (
          <button
            key={home.id}
            onClick={() => onSelectHome?.(home.name)}
            className={`w-full flex items-center justify-between px-5 py-5 ${
              index !== homes.length - 1 ? "border-b border-muted" : ""
            }`}
          >
            <span className="font-medium text-foreground">{home.name}</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Bottom Buttons */}
      <div className="mt-auto px-4 pb-8 space-y-3">
        <button
          onClick={() => onNavigate?.("create-home")}
          className="w-full py-4 rounded-full bg-primary text-white font-semibold"
        >
          Create a Home
        </button>
        <button
          onClick={() => onNavigate?.("join-home")}
          className="w-full py-4 rounded-full border-2 border-primary text-primary font-semibold bg-white"
        >
          Join a Home
        </button>
      </div>
    </div>
  );
}
