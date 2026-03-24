"use client";

import { useState } from "react";

interface StyleModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedColor: string;
  selectedIcon: string;
  onColorChange: (color: string) => void;
  onIconChange: (icon: string) => void;
}

// 20 colors matching the screenshot
const COLORS = [
  // Row 1
  { hex: "#3B82F6", label: "Blue" },
  { hex: "#EF4444", label: "Red" },
  { hex: "#EC4899", label: "Pink" },
  { hex: "#8B5CF6", label: "Purple" },
  // Row 2
  { hex: "#6366F1", label: "Indigo" },
  { hex: "#2563EB", label: "Royal Blue" },
  { hex: "#0EA5E9", label: "Sky Blue" },
  { hex: "#06B6D4", label: "Cyan" },
  // Row 3
  { hex: "#14B8A6", label: "Teal" },
  { hex: "#059669", label: "Forest Green" },
  { hex: "#22C55E", label: "Green" },
  { hex: "#84CC16", label: "Lime" },
  // Row 4
  { hex: "#A3E635", label: "Yellow Green" },
  { hex: "#FACC15", label: "Yellow" },
  { hex: "#F59E0B", label: "Amber" },
  { hex: "#FF6B00", label: "Orange" }, // selected
  // Row 5
  { hex: "#F97316", label: "Red Orange" },
  { hex: "#92400E", label: "Brown" },
  { hex: "#64748B", label: "Slate" },
  { hex: "rainbow", label: "Rainbow" },
];

// 30 icons in a 5-col x 6-row grid
const ICONS = [
  // Row 1
  { id: "hand", label: "Hand" },
  { id: "sun", label: "Sun" },
  { id: "sunset", label: "Sunset" },
  { id: "alarm", label: "Alarm" },
  { id: "hourglass", label: "Hourglass" },
  // Row 2
  { id: "droplet", label: "Droplet" },
  { id: "wind", label: "Wind" },
  { id: "thermometer", label: "Thermometer" },
  { id: "tag", label: "Tag" },
  { id: "door-right", label: "Door Right" },
  // Row 3
  { id: "door-left", label: "Door Left" },
  { id: "moon", label: "Moon" },
  { id: "flame", label: "Flame" },
  { id: "book", label: "Book" },
  { id: "party", label: "Party" },
  // Row 4
  { id: "pin", label: "Pin" },
  { id: "clock", label: "Clock" },
  { id: "briefcase", label: "Briefcase" },
  { id: "shield", label: "Shield" },
  { id: "bell", label: "Bell" },
  // Row 5
  { id: "plant", label: "Plant" },
  { id: "dollar", label: "Dollar" },
  { id: "play", label: "Play" },
  { id: "gear", label: "Gear" },
  { id: "cart", label: "Cart" },
  // Row 6
  { id: "bag", label: "Bag" },
  { id: "gamepad", label: "Gamepad" },
  { id: "camera", label: "Camera" },
  { id: "mail", label: "Mail" },
  { id: "heart", label: "Heart" },
];

function IconSVG({ id, className }: { id: string; className?: string }) {
  const cls = `w-6 h-6 ${className || "text-gray-700"}`;

  switch (id) {
    case "hand":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><path d="M14 2h-5a2 2 0 0 0-2 2v2h7V4c0-1.1.9-2 2-2zm-2 8c0-1.1-.9-2-2-2s-2 .9-2 2v4c0 1.1.9 2 2 2s2-.9 2-2v-4zm8-2c0-1.1-.9-2-2-2s-2 .9-2 2v4c0 1.1.9 2 2 2s2-.9 2-2v-4z"/></svg>;
    case "sun":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><circle cx="12" cy="12" r="5"/><circle cx="12" cy="1" r="1"/><circle cx="12" cy="23" r="1"/><circle cx="4.22" cy="4.22" r="1"/><circle cx="19.78" cy="19.78" r="1"/><circle cx="1" cy="12" r="1"/><circle cx="23" cy="12" r="1"/><circle cx="4.22" cy="19.78" r="1"/><circle cx="19.78" cy="4.22" r="1"/></svg>;
    case "sunset":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><path d="M17 19c2.76-1.2 4.7-3.87 4.7-7 0-4.42-3.58-8-8-8s-8 3.58-8 8c0 3.13 1.94 5.8 4.7 7m-5-11c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5zm14 2h-2v2h2v-2zm0-4h-2v2h2v-2z"/></svg>;
    case "alarm":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2"/></svg>;
    case "hourglass":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><path d="M5 8h14V4H5v4zm0 12h14v-4H5v4zm7-8l5-6V2H7v6l5 6z"/></svg>;
    case "droplet":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>;
    case "wind":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>;
    case "thermometer":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><path d="M14.5 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z"/></svg>;
    case "tag":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" fillRule="evenodd"/><circle cx="7" cy="7" r="1"/></svg>;
    case "door-right":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><circle cx="16" cy="13" r="1"/></svg>;
    case "door-left":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><rect x="3" y="2" width="18" height="20" rx="2" fill="currentColor"/><rect x="9" y="10" width="6" height="1" fill="white"/><rect x="9" y="14" width="6" height="1" fill="white"/></svg>;
    case "moon":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.97 5.97 0 0 1-4.27-4.36A6 6 0 0 1 12 3z"/></svg>;
    case "flame":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>;
    case "book":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
    case "party":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><path d="M5.8 11a7 7 0 0 0 10.4 1.4L20 8l-3-4-4 2-4-2-3 4 3.6 4.6A7 7 0 0 0 5.8 11z"/><line x1="2" y1="20" x2="5.5" y2="16.5" stroke="currentColor" strokeWidth="2"/><line x1="22" y1="20" x2="18.5" y2="16.5" stroke="currentColor" strokeWidth="2"/></svg>;
    case "pin":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3" fill="white"/></svg>;
    case "clock":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14" stroke="white" strokeWidth="2" fill="none"/></svg>;
    case "briefcase":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="currentColor" strokeWidth="2" fill="none"/></svg>;
    case "shield":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10" stroke="white" strokeWidth="2" fill="none"/></svg>;
    case "bell":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
    case "plant":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><path d="M7 20h10M12 20v-8M12 12C12 8 8 4 4 4c0 4 4 8 8 8z M12 12c0-4 4-8 8-8-1 4-4 8-8 8z"/></svg>;
    case "dollar":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" strokeWidth="2"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" fill="none"/></svg>;
    case "play":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="white"/></svg>;
    case "gear":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
    case "cart":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>;
    case "bag":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2"/><path d="M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="2" fill="none"/></svg>;
    case "gamepad":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><line x1="6" y1="12" x2="10" y2="12" stroke="currentColor" strokeWidth="2"/><line x1="8" y1="10" x2="8" y2="14" stroke="currentColor" strokeWidth="2"/><line x1="15" y1="13" x2="15.01" y2="13" stroke="currentColor" strokeWidth="2"/><line x1="18" y1="11" x2="18.01" y2="11" stroke="currentColor" strokeWidth="2"/><rect x="2" y="6" width="20" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/></svg>;
    case "camera":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><polygon points="23 7 16 12 23 17 23 7" fill="white"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>;
    case "mail":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6" stroke="white" strokeWidth="2" fill="none"/></svg>;
    case "heart":
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
    default:
      return <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>;
  }
}

export function StyleModal({
  isOpen,
  onClose,
  selectedColor,
  selectedIcon,
  onColorChange,
  onIconChange,
}: StyleModalProps) {
  const [activeTab, setActiveTab] = useState<"color" | "icon">("color");
  const [tempColor, setTempColor] = useState(selectedColor);
  const [tempIcon, setTempIcon] = useState(selectedIcon);

  if (!isOpen) return null;

  const handleOK = () => {
    onColorChange(tempColor);
    onIconChange(tempIcon);
    onClose();
  };

  const handleCancel = () => {
    setTempColor(selectedColor);
    setTempIcon(selectedIcon);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="absolute inset-0 z-50 bg-black/30 backdrop-blur-sm" onClick={handleCancel} />

      {/* Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Title */}
        <div className="px-6 pb-3">
          <h2 className="text-lg font-bold text-gray-900 text-center">Style</h2>
        </div>

        {/* Tabs */}
        <div className="flex mx-5 mb-4 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setActiveTab("color")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "color"
                ? "bg-primary text-white"
                : "text-gray-600"
            }`}
          >
            Color
          </button>
          <button
            onClick={() => setActiveTab("icon")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "icon"
                ? "bg-primary text-white"
                : "text-gray-600"
            }`}
          >
            Icon
          </button>
        </div>

        {/* Content */}
        <div className="px-5 pb-6 max-h-72 overflow-y-auto">
          {activeTab === "color" ? (
            /* Color Grid: 4 cols x 5 rows */
            <div className="grid grid-cols-4 gap-3">
              {COLORS.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => setTempColor(color.hex)}
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto"
                  style={
                    color.hex === "rainbow"
                      ? {
                          background:
                            "conic-gradient(red, orange, yellow, green, blue, violet, red)",
                        }
                      : { backgroundColor: color.hex }
                  }
                  aria-label={color.label}
                >
                  {tempColor === color.hex && (
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          ) : (
            /* Icon Grid: 5 cols x 6 rows */
            <div className="grid grid-cols-5 gap-2">
              {ICONS.map((icon) => (
                <button
                  key={icon.id}
                  onClick={() => setTempIcon(icon.id)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    tempIcon === icon.id
                      ? "bg-orange-500 ring-2 ring-orange-300"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  aria-label={icon.label}
                >
                  <IconSVG id={icon.id} className={tempIcon === icon.id ? "text-white" : "text-gray-500"} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="flex gap-3 px-5 pb-8">
          <button
            onClick={handleCancel}
            className="flex-1 py-3.5 rounded-xl bg-indigo-50 text-primary font-medium hover:bg-indigo-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleOK}
            className="flex-1 py-3.5 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </>
  );
}
