"use client";

import { useState } from "react";
import { ArrowLeft, ChevronRight, Wifi } from "lucide-react";

interface AccountSecurityScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string) => void;
}

export function AccountSecurityScreen({ onBack, onNavigate }: AccountSecurityScreenProps) {
  const [biometricId, setBiometricId] = useState(false);
  const [faceId, setFaceId] = useState(false);
  const [smsAuth, setSmsAuth] = useState(false);
  const [googleAuth, setGoogleAuth] = useState(false);

  const toggleItems = [
    { id: "biometric", label: "Biometric ID", value: biometricId, onChange: setBiometricId },
    { id: "face", label: "Face ID", value: faceId, onChange: setFaceId },
    { id: "sms", label: "SMS Authenticator", value: smsAuth, onChange: setSmsAuth },
    { id: "google", label: "Google Authenticator", value: googleAuth, onChange: setGoogleAuth },
  ];

  const navigationItems = [
    { id: "password", label: "Change Password" },
    { 
      id: "device", 
      label: "Device Management",
      description: "Manage your account on the various devices you own."
    },
    { 
      id: "deactivate", 
      label: "Deactivate Account",
      description: "Temporarily deactivate your account. Easily reactivate when you're ready."
    },
    { 
      id: "delete", 
      label: "Delete Account",
      description: "Permanently remove your account and data. Proceed with caution.",
      danger: true
    },
  ];

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
        <h1 className="flex-1 text-xl font-bold text-center mr-10">Account & Security</h1>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 overflow-auto">
        {/* Toggle Items */}
        {toggleItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-4"
          >
            <span className="font-medium text-foreground">{item.label}</span>
            <button
              onClick={() => item.onChange(!item.value)}
              className={`w-12 h-7 rounded-full transition-colors ${
                item.value ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  item.value ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        ))}

        {/* Navigation Items */}
        {navigationItems.map((item) => (
          <button
            key={item.id}
            className="w-full flex items-center justify-between py-4"
          >
            <div className="flex-1 text-left">
              <span className={`font-medium ${item.danger ? "text-red-500" : "text-foreground"}`}>
                {item.label}
              </span>
              {item.description && (
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              )}
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
}
