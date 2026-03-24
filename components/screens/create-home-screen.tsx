"use client";

import { useState } from "react";
import { ArrowLeft, MoreVertical, ChevronRight, Plus, Check } from "lucide-react";

interface CreateHomeScreenProps {
  onBack: () => void;
  onSave?: () => void;
}

const suggestedRooms = [
  { id: 1, name: "Living Room", selected: true },
  { id: 2, name: "Bedroom", selected: true },
  { id: 3, name: "Bathroom", selected: true },
  { id: 4, name: "Kitchen", selected: false },
  { id: 5, name: "Study Room", selected: true },
  { id: 6, name: "Dining Room", selected: false },
];

export function CreateHomeScreen({ onBack, onSave }: CreateHomeScreenProps) {
  const [homeName, setHomeName] = useState("My Rental House");
  const [rooms, setRooms] = useState(suggestedRooms);

  const toggleRoom = (id: number) => {
    setRooms(rooms.map(room => 
      room.id === id ? { ...room, selected: !room.selected } : room
    ));
  };

  return (
    <div className="flex flex-col h-full bg-muted/30">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 py-2">
        <span className="text-sm font-medium">9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-1 h-3 bg-foreground rounded-sm" style={{ height: `${8 + i * 2}px` }} />
            ))}
          </div>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
          </svg>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <rect x="2" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
            <rect x="20" y="10" width="2" height="4" rx="1" fill="currentColor" />
            <rect x="4" y="9" width="14" height="6" rx="1" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <button onClick={onBack} className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold">Create a Home</h1>
        <button className="p-2 -mr-2">
          <MoreVertical className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Home Name Section */}
        <div className="bg-white rounded-2xl p-4 mb-4">
          <p className="font-medium mb-3">Home Name</p>
          <input
            type="text"
            value={homeName}
            onChange={(e) => setHomeName(e.target.value)}
            className="w-full bg-muted rounded-xl px-4 py-4 outline-none"
            placeholder="Enter home name"
          />
          
          <div className="border-t border-border mt-4 pt-4">
            <button className="w-full flex items-center justify-between">
              <span className="font-medium">Location</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Rooms Section */}
        <div className="bg-white rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium">Add Room(s)</span>
            <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="space-y-0">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => toggleRoom(room.id)}
                className="w-full flex items-center justify-between py-4 border-t border-border first:border-t-0"
              >
                <span className="font-medium">{room.name}</span>
                {room.selected && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="p-4 pb-8">
        <button
          onClick={onSave}
          className="w-full py-4 rounded-full bg-primary text-primary-foreground font-semibold"
        >
          Save
        </button>
      </div>
    </div>
  );
}
