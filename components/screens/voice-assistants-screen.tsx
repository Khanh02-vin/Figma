"use client";

import { useState } from "react";
import { ArrowLeft, MoreVertical, X, Wifi } from "lucide-react";

interface VoiceAssistantsScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string) => void;
}

const assistants = [
  {
    id: "google",
    name: "Google Assistant",
    status: "Unlinked",
    icon: (
      <svg viewBox="0 0 48 48" className="w-16 h-16">
        <circle cx="20" cy="24" r="16" fill="#4285F4" />
        <circle cx="32" cy="16" r="6" fill="#EA4335" />
        <circle cx="38" cy="20" r="4" fill="#34A853" />
        <circle cx="32" cy="28" r="8" fill="#FBBC05" />
      </svg>
    ),
  },
  {
    id: "alexa",
    name: "Amazon Alexa",
    status: "Linked",
    icon: (
      <svg viewBox="0 0 48 48" className="w-16 h-16">
        <circle cx="24" cy="24" r="16" fill="none" stroke="#00CAFF" strokeWidth="4" />
        <path d="M24 16 L28 24 L24 32" fill="none" stroke="#00CAFF" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "cortana",
    name: "Microsoft Cortana",
    status: "Linked",
    icon: (
      <svg viewBox="0 0 48 48" className="w-16 h-16">
        <circle cx="24" cy="24" r="16" fill="none" stroke="#00BCF2" strokeWidth="3" />
        <circle cx="24" cy="24" r="10" fill="none" stroke="#7FDBFF" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "bixby",
    name: "Samsung Bixby",
    status: "Unlinked",
    icon: (
      <svg viewBox="0 0 48 48" className="w-16 h-16">
        <defs>
          <linearGradient id="bixby" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00B4DB" />
            <stop offset="100%" stopColor="#0083B0" />
          </linearGradient>
        </defs>
        <rect x="8" y="8" width="32" height="32" rx="8" fill="url(#bixby)" />
        <text x="24" y="32" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">b</text>
      </svg>
    ),
  },
  {
    id: "clova",
    name: "Naver Clova",
    status: "Unlinked",
    icon: (
      <svg viewBox="0 0 48 48" className="w-16 h-16">
        <rect x="8" y="8" width="32" height="32" rx="8" fill="#1EC997" />
        <path d="M18 24 Q24 16 30 24 Q24 32 18 24" fill="white" />
      </svg>
    ),
  },
];

export function VoiceAssistantsScreen({ onBack, onNavigate }: VoiceAssistantsScreenProps) {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showLinkingModal, setShowLinkingModal] = useState(false);
  const [showLinkedModal, setShowLinkedModal] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState<string | null>(null);

  const handleLink = (id: string) => {
    setSelectedAssistant(id);
    if (id === "google") {
      setShowLinkModal(true);
    }
  };

  const handleStartLinking = () => {
    setShowLinkModal(false);
    setShowLinkingModal(true);
    setTimeout(() => {
      setShowLinkingModal(false);
      setShowLinkedModal(true);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 py-3">
        <span className="text-sm font-medium">9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-1 h-3 bg-foreground rounded-sm" />
            ))}
          </div>
          <Wifi className="w-4 h-4" />
          <div className="w-6 h-3 bg-foreground rounded-sm" />
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Voice Assistants</h1>
        <button className="w-10 h-10 flex items-center justify-center">
          <MoreVertical className="w-6 h-6" />
        </button>
      </div>

      {/* Assistants Grid */}
      <div className="flex-1 px-4 overflow-auto">
        <div className="grid grid-cols-2 gap-4">
          {assistants.map((assistant) => (
            <button
              key={assistant.id}
              onClick={() => handleLink(assistant.id)}
              className="bg-white rounded-2xl p-6 flex flex-col items-center gap-3"
            >
              {assistant.icon}
              <span className="font-semibold text-foreground text-sm">{assistant.name}</span>
              <span className="text-muted-foreground text-sm">{assistant.status}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Link to Google Assistant Modal */}
      {showLinkModal && (
        <div className="absolute inset-0 bg-white flex flex-col z-50">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-6 py-3">
            <span className="text-sm font-medium">9:41</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-1 h-3 bg-foreground rounded-sm" />
                ))}
              </div>
              <Wifi className="w-4 h-4" />
              <div className="w-6 h-3 bg-foreground rounded-sm" />
            </div>
          </div>

          {/* Back Button */}
          <div className="px-4 py-4">
            <button onClick={() => setShowLinkModal(false)} className="w-10 h-10 flex items-center justify-center">
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col items-center justify-center px-8">
            {/* Google Assistant Logo */}
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-[#4285F4] rounded-full" />
              <div className="absolute top-4 right-0 w-10 h-10 bg-[#EA4335] rounded-full" />
              <div className="absolute top-2 right-6 w-6 h-6 bg-[#34A853] rounded-full" />
              <div className="absolute bottom-8 right-2 w-12 h-12 bg-[#FBBC05] rounded-full" />
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-4">Google Assistant</h2>
            <p className="text-center text-muted-foreground leading-relaxed">
              Hey Google, meet Smartify! Link these two up and you'll be living the voice-controlled life in no time. Just talk, and your devices will listen.
            </p>
          </div>

          {/* Button */}
          <div className="p-4 border-t border-border">
            <button
              onClick={handleStartLinking}
              className="w-full py-4 bg-primary text-primary-foreground rounded-full font-semibold"
            >
              Link to Google Assistant
            </button>
          </div>
        </div>
      )}

      {/* Linking Modal */}
      {showLinkingModal && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 mx-8 text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-lg">
              Linking your Smartify account<br />to Google Assistant...
            </p>
          </div>
        </div>
      )}

      {/* Linked Success Modal */}
      {showLinkedModal && (
        <div className="absolute inset-0 bg-white flex flex-col z-50">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-6 py-3">
            <span className="text-sm font-medium">9:41</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-1 h-3 bg-foreground rounded-sm" />
                ))}
              </div>
              <Wifi className="w-4 h-4" />
              <div className="w-6 h-3 bg-foreground rounded-sm" />
            </div>
          </div>

          {/* Close Button */}
          <div className="px-4 py-4">
            <button onClick={() => setShowLinkedModal(false)} className="w-10 h-10 flex items-center justify-center">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col items-center justify-center px-8">
            {/* Connected Icons */}
            <div className="flex items-center gap-4 bg-muted rounded-full px-8 py-4 mb-8">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Wifi className="w-6 h-6 text-white" />
              </div>
              <div className="w-8 h-0.5 bg-muted-foreground" />
              <div className="relative">
                <div className="w-10 h-10 bg-[#4285F4] rounded-full" />
                <div className="absolute top-0 right-0 w-4 h-4 bg-[#EA4335] rounded-full" />
                <div className="absolute -top-1 right-2 w-2 h-2 bg-[#34A853] rounded-full" />
                <div className="absolute bottom-2 right-0 w-5 h-5 bg-[#FBBC05] rounded-full" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-4">Linked!</h2>
            <p className="text-center text-muted-foreground leading-relaxed">
              Your Smartify account is now seamlessly linked with Google Assistant. Get ready to experience the ultimate hands-free control.
            </p>
          </div>

          {/* Button */}
          <div className="p-4 border-t border-border">
            <button
              onClick={() => setShowLinkedModal(false)}
              className="w-full py-4 bg-primary text-primary-foreground rounded-full font-semibold"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
