"use client";

import { useState } from "react";
import { ArrowLeft, GripVertical, Trash2, Check } from "lucide-react";

interface ManageRoomsScreenProps {
  onBack: () => void;
}

const initialRooms = [
  { id: 1, name: "Living Room" },
  { id: 2, name: "Bedroom" },
  { id: 3, name: "Bathroom" },
  { id: 4, name: "Bathroom" },
  { id: 5, name: "Dining Room" },
  { id: 6, name: "Backyard" },
  { id: 7, name: "Bedroom 2" },
];

export function ManageRoomsScreen({ onBack }: ManageRoomsScreenProps) {
  const [rooms, setRooms] = useState(initialRooms);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<{ id: number; name: string } | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [deletedRoomName, setDeletedRoomName] = useState("");

  const handleDeleteClick = (room: { id: number; name: string }) => {
    setSelectedRoom(room);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedRoom) {
      setRooms(rooms.filter((r) => r.id !== selectedRoom.id));
      setDeletedRoomName(selectedRoom.name);
      setShowDeleteModal(false);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    }
  };

  return (
    <div className="flex flex-col h-full bg-muted/30 relative">
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
        <h1 className="text-xl font-semibold">Manage Rooms</h1>
        <div className="w-10" />
      </div>

      {/* Rooms List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="space-y-3">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="flex items-center justify-between bg-white rounded-2xl px-4 py-5"
            >
              <div className="flex items-center gap-3">
                <GripVertical className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">{room.name}</span>
              </div>
              <button
                onClick={() => handleDeleteClick(room)}
                className="p-2 text-red-500"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedRoom && (
        <div className="absolute inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-3xl w-full p-6 animate-slide-up">
            <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-6" />
            <h2 className="text-xl font-semibold text-red-500 text-center mb-4">Delete Room</h2>
            <div className="border-t border-border pt-4">
              <p className="text-center text-lg mb-2">
                Are you sure you want to delete the Room
              </p>
              <p className="text-center text-lg mb-2">
                "{selectedRoom.name}" ?
              </p>
              <p className="text-center text-muted-foreground text-sm mb-6">
                All devices paired and associated with this room will be unpaired after this action.
              </p>
            </div>
            <div className="border-t border-border pt-4 flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-4 rounded-full bg-muted text-foreground font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-4 rounded-full bg-primary text-primary-foreground font-semibold"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="absolute inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-3xl w-full p-6 text-center animate-slide-up">
            <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-6" />
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <p className="text-lg">
              The Room "{deletedRoomName}" has been
            </p>
            <p className="text-lg">successfully deleted!</p>
          </div>
        </div>
      )}
    </div>
  );
}
