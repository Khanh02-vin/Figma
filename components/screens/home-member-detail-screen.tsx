"use client";

import { useState } from "react";
import { ArrowLeft, MoreVertical, ChevronRight, Check } from "lucide-react";

interface HomeMemberDetailScreenProps {
  onBack: () => void;
  member?: {
    name: string;
    email: string;
    role: string;
    avatar: string;
  };
}

export function HomeMemberDetailScreen({ onBack, member }: HomeMemberDetailScreenProps) {
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const currentMember = member || {
    name: "Robert Hawkins",
    email: "robert.hawkins@yourdomain.com",
    role: "Member",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  };

  const handleRemove = () => {
    setShowRemoveModal(false);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      onBack();
    }, 2000);
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
        <h1 className="text-xl font-semibold">Home Member</h1>
        <button className="p-2 -mr-2">
          <MoreVertical className="w-6 h-6" />
        </button>
      </div>

      {/* Member Info Card */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-2xl p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 ring-4 ring-violet-200">
              <img
                src={currentMember.avatar}
                alt={currentMember.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold">{currentMember.name}</h2>
            <p className="text-muted-foreground">{currentMember.email}</p>
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Role</span>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>{currentMember.role}</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Remove Member Button */}
      <div className="px-4">
        <button
          onClick={() => setShowRemoveModal(true)}
          className="w-full py-4 rounded-full border-2 border-red-500 text-red-500 font-semibold"
        >
          Remove Member
        </button>
      </div>

      {/* Remove Confirmation Modal */}
      {showRemoveModal && (
        <div className="absolute inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-3xl w-full p-6 animate-slide-up">
            <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-6" />
            <h2 className="text-xl font-semibold text-red-500 text-center mb-4">Remove Member</h2>
            <div className="border-t border-border pt-4">
              <p className="text-center text-lg mb-6">
                Are you sure you want to remove
                <br />
                "{currentMember.name}" ?
              </p>
            </div>
            <div className="border-t border-border pt-4 flex gap-3">
              <button
                onClick={() => setShowRemoveModal(false)}
                className="flex-1 py-4 rounded-full bg-muted text-foreground font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleRemove}
                className="flex-1 py-4 rounded-full bg-primary text-primary-foreground font-semibold"
              >
                Yes, Remove
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
            <p className="text-lg">"{currentMember.name}" has been removed!</p>
          </div>
        </div>
      )}
    </div>
  );
}
