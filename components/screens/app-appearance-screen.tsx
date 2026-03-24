"use client";

import { useState } from "react";
import { ArrowLeft, ChevronRight, Wifi } from "lucide-react";

interface AppAppearanceScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string) => void;
}

export function AppAppearanceScreen({ onBack, onNavigate }: AppAppearanceScreenProps) {
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showLanguageScreen, setShowLanguageScreen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("Light");
  const [selectedLanguage, setSelectedLanguage] = useState("English (US)");

  const themes = ["System Default", "Light", "Dark"];

  const languages = [
    { code: "en-US", name: "English (US)", flag: "🇺🇸" },
    { code: "en-UK", name: "English (UK)", flag: "🇬🇧" },
    { code: "zh", name: "Mandarin", flag: "🇨🇳" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "hi", name: "Hindi", flag: "🇮🇳" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "ar", name: "Arabic", flag: "🇦🇪" },
    { code: "ru", name: "Russian", flag: "🇷🇺" },
    { code: "ja", name: "Japanese", flag: "🇯🇵" },
  ];

  if (showLanguageScreen) {
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
          <button onClick={() => setShowLanguageScreen(false)} className="w-10 h-10 flex items-center justify-center">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="flex-1 text-xl font-bold text-center mr-10">App Language</h1>
        </div>

        {/* Languages List */}
        <div className="flex-1 px-4 overflow-auto space-y-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setSelectedLanguage(lang.name);
                setShowLanguageScreen(false);
              }}
              className={`w-full flex items-center gap-4 bg-white rounded-2xl px-5 py-4 ${
                selectedLanguage === lang.name ? "ring-2 ring-primary" : ""
              }`}
            >
              <div className="w-14 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-muted text-2xl">
                {lang.flag}
              </div>
              <span className="flex-1 font-semibold text-foreground text-left">{lang.name}</span>
              {selectedLanguage === lang.name && (
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

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
        <h1 className="flex-1 text-xl font-bold text-center mr-10">App Appearance</h1>
      </div>

      {/* Settings List */}
      <div className="flex-1 px-4 overflow-auto">
        <button
          onClick={() => setShowThemeModal(true)}
          className="w-full flex items-center justify-between py-5"
        >
          <span className="font-medium text-foreground">Theme</span>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">{selectedTheme}</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </button>

        <button
          onClick={() => setShowLanguageScreen(true)}
          className="w-full flex items-center justify-between py-5"
        >
          <span className="font-medium text-foreground">App Language</span>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">{selectedLanguage}</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </button>
      </div>

      {/* Theme Modal */}
      {showThemeModal && (
        <div className="absolute inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-3xl w-full p-6 animate-slide-up">
            <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-6" />
            <h2 className="text-xl font-bold text-foreground text-center mb-4">Choose Theme</h2>
            <div className="border-t border-border pt-4 space-y-4">
              {themes.map((theme) => (
                <button
                  key={theme}
                  onClick={() => setSelectedTheme(theme)}
                  className="w-full flex items-center gap-4 py-2"
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedTheme === theme ? "border-primary" : "border-muted-foreground"
                  }`}>
                    {selectedTheme === theme && (
                      <div className="w-3 h-3 bg-primary rounded-full" />
                    )}
                  </div>
                  <span className="font-medium text-foreground">{theme}</span>
                </button>
              ))}
            </div>
            <div className="border-t border-border pt-4 mt-4 flex gap-3">
              <button
                onClick={() => setShowThemeModal(false)}
                className="flex-1 py-4 rounded-full bg-muted text-foreground font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowThemeModal(false)}
                className="flex-1 py-4 rounded-full bg-primary text-primary-foreground font-semibold"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
