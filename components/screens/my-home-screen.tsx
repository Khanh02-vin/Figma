"use client";

import { useState } from "react";
import { ArrowLeft, MoreVertical, ChevronRight, Plus } from "lucide-react";

interface MyHomeScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string) => void;
}

const members = [
  {
    id: 1,
    name: "Andrew Ainsley",
    email: "andrew.ainsley@yourdom...",
    role: "Owner",
    isYou: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Jenny Wilson",
    email: "jenny.wilson@yourdomain....",
    role: "Admin",
    isYou: false,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Robert Hawkins",
    email: "robert.hawkins@yourdo...",
    role: "Member",
    isYou: false,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
];

export function MyHomeScreen({ onBack, onNavigate }: MyHomeScreenProps) {
  const [showEditNameModal, setShowEditNameModal] = useState(false);
  const [homeName, setHomeName] = useState("My Home");
  const [editingName, setEditingName] = useState("My Home");

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
        <h1 className="text-xl font-bold text-foreground">{homeName}</h1>
        <button className="w-10 h-10 flex items-center justify-center">
          <MoreVertical className="w-6 h-6 text-foreground" />
        </button>
      </div>

      {/* Home Details Card */}
      <div className="mx-4 mt-4 bg-white rounded-2xl overflow-hidden">
        <button
          onClick={() => {
            setEditingName(homeName);
            setShowEditNameModal(true);
          }}
          className="w-full flex items-center justify-between px-5 py-5 border-b border-muted"
        >
          <span className="font-medium text-foreground">Home Name</span>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">{homeName}</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </button>
        <button
          onClick={() => onNavigate?.("room-management")}
          className="w-full flex items-center justify-between px-5 py-5 border-b border-muted"
        >
          <span className="font-medium text-foreground">Room Management</span>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">6 Room(s)</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </button>
        <button
          onClick={() => onNavigate?.("device-management")}
          className="w-full flex items-center justify-between px-5 py-5 border-b border-muted"
        >
          <span className="font-medium text-foreground">Device Management</span>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">37 Device(s)</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </button>
        <button className="w-full flex items-center justify-between px-5 py-5">
          <span className="font-medium text-foreground">Location</span>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">701 7th Ave...</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </button>
      </div>

      {/* Home Members Card */}
      <div className="mx-4 mt-4 bg-white rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-muted">
          <span className="font-semibold text-foreground">Home Members (4)</span>
          <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>
        {members.map((member, index) => (
          <button
            key={member.id}
            className={`w-full flex items-center gap-4 px-5 py-4 ${
              index !== members.length - 1 ? "border-b border-muted" : ""
            }`}
          >
            <img
              src={member.avatar}
              alt={member.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 text-left">
              <p className="font-semibold text-foreground">
                {member.name}
                {member.isYou && <span className="text-muted-foreground font-normal"> (You)</span>}
              </p>
              <p className="text-sm text-muted-foreground">{member.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">{member.role}</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </button>
        ))}
      </div>

      {/* Delete Home Button */}
      <div className="mx-4 mt-4 mb-8">
        <button className="w-full py-4 rounded-full border-2 border-red-500 text-red-500 font-semibold bg-white">
          Delete Home
        </button>
      </div>

      {/* Edit Name Modal */}
      {showEditNameModal && (
        <div className="absolute inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-3xl w-full p-6 animate-slide-up">
            <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-6" />
            <h2 className="text-xl font-bold text-foreground text-center mb-4">Home Name</h2>
            <div className="border-t border-muted mb-6" />
            <input
              type="text"
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              className="w-full px-4 py-4 bg-muted rounded-xl text-foreground outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter home name"
            />
            <div className="border-t border-muted my-6" />
            <div className="flex gap-3">
              <button
                onClick={() => setShowEditNameModal(false)}
                className="flex-1 py-4 rounded-full bg-muted text-primary font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setHomeName(editingName);
                  setShowEditNameModal(false);
                }}
                className="flex-1 py-4 rounded-full bg-primary text-white font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
