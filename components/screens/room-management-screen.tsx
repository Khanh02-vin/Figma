"use client";

import { useState } from "react";
import { ArrowLeft, LayoutGrid, ChevronRight } from "lucide-react";

interface RoomManagementScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string) => void;
}

const initialRooms = [
  { id: 1, name: "Living Room" },
  { id: 2, name: "Bedroom" },
  { id: 3, name: "Bathroom" },
  { id: 4, name: "Kitchen" },
  { id: 5, name: "Dining Room" },
  { id: 6, name: "Backyard" },
];

const suggestedRooms = [
  "Study Room",
  "Kids' Room",
  "Library",
  "Balcony",
  "Workshop",
  "Rooftop",
];

export function RoomManagementScreen({ onBack, onNavigate }: RoomManagementScreenProps) {
  const [rooms, setRooms] = useState(initialRooms);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");

  const handleAddRoom = () => {
    if (newRoomName.trim()) {
      setRooms([...rooms, { id: rooms.length + 1, name: newRoomName.trim() }]);
      setNewRoomName("");
      setShowAddModal(false);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setNewRoomName(suggestion);
  };

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
        <h1 className="text-xl font-bold text-foreground">Room Management</h1>
        <button className="w-10 h-10 flex items-center justify-center">
          <LayoutGrid className="w-6 h-6 text-foreground" />
        </button>
      </div>

      {/* Room List */}
      <div className="mx-4 mt-4 bg-white rounded-2xl overflow-hidden">
        {rooms.map((room, index) => (
          <button
            key={room.id}
            className={`w-full flex items-center justify-between px-5 py-5 ${
              index !== rooms.length - 1 ? "border-b border-muted" : ""
            }`}
          >
            <span className="font-medium text-foreground">{room.name}</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Add Room Button */}
      <div className="mx-4 mt-auto mb-8">
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full py-4 rounded-full border-2 border-primary text-primary font-semibold bg-white"
        >
          Add Room
        </button>
      </div>

      {/* Add Room Modal */}
      {showAddModal && (
        <div className="absolute inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-3xl w-full p-6 animate-slide-up">
            <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-6" />
            <h2 className="text-xl font-bold text-foreground text-center mb-4">Add Room</h2>
            <div className="border-t border-muted mb-6" />
            <input
              type="text"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              className="w-full px-4 py-4 bg-muted rounded-xl text-foreground outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter room name"
            />
            <div className="flex flex-wrap gap-2 mt-4">
              {suggestedRooms.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSelectSuggestion(suggestion)}
                  className="px-4 py-2 rounded-full border border-muted text-muted-foreground text-sm hover:border-primary hover:text-primary transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <div className="border-t border-muted my-6" />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewRoomName("");
                }}
                className="flex-1 py-4 rounded-full bg-muted text-primary font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRoom}
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
