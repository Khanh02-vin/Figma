"use client";

import { ArrowLeft, ChevronRight, Wifi } from "lucide-react";

interface HelpSupportScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string) => void;
}

const items = [
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact Support" },
  { id: "privacy", label: "Privacy Policy" },
  { id: "terms", label: "Terms of Service" },
  { id: "partner", label: "Partner" },
  { id: "jobs", label: "Job Vacancy" },
  { id: "accessibility", label: "Accessibility" },
  { id: "feedback", label: "Feedback" },
  { id: "about", label: "About us" },
  { id: "rate", label: "Rate us" },
  { id: "website", label: "Visit Our Website" },
  { id: "social", label: "Follow us on Social Media" },
];

export function HelpSupportScreen({ onBack, onNavigate }: HelpSupportScreenProps) {
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
      <div className="flex items-center px-4 py-4">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-xl font-bold text-center mr-10">Help & Support</h1>
      </div>

      {/* Items List */}
      <div className="flex-1 px-4 overflow-auto">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.id === "faq") onNavigate?.("faq");
              if (item.id === "contact") onNavigate?.("contact-support");
            }}
            className="w-full flex items-center justify-between py-5"
          >
            <span className="font-medium text-foreground">{item.label}</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
}
