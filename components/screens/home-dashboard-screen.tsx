"use client";

import { useState } from "react";
import {
  ChevronDown,
  Plus,
  Mic,
  Home,
  CheckSquare,
  BarChart3,
  User,
  MoreVertical,
  Cloud,
  Wind,
  Droplets,
} from "lucide-react";
import { AddMenuModal } from "./add-menu-modal";
import { SwitchHomeModal } from "./switch-home-modal";
import { Wifi, Bluetooth } from "lucide-react";

interface HomeDashboardScreenProps {
  onAddDevice: () => void;
  onScan?: () => void;
  onVoiceAssistant?: () => void;
  onNotifications?: () => void;
  onShowSwitchHome?: (home: string) => void;
  currentHome?: string;
  onNavigate?: (screen: string) => void;
}

const rooms = ["All Rooms", "Living Room", "Bedroom", "Kitchen", "Bathroom"];

const dashboardDevices = [
  { id: 1, name: "Smart Lamp", room: "Living Room", type: "lamp", connection: "wifi", isOn: true },
  { id: 2, name: "Smart V1 CCTV", room: "Living Room", type: "cctv", connection: "wifi", isOn: true, hasLiveImage: true },
  { id: 3, name: "Stereo Speaker", room: "Living Room", type: "speaker", connection: "bluetooth", isOn: true },
  { id: 4, name: "Router", room: "Living Room", type: "router", connection: "wifi", isOn: true },
  { id: 5, name: "Air Conditioner", room: "Living Room", type: "ac", connection: "bluetooth", isOn: true },
  { id: 6, name: "Smart Webcam", room: "Living Room", type: "webcam", connection: "wifi", isOn: false },
  { id: 7, name: "Smart V2 CCTV", room: "Living Room", type: "cctv", connection: "wifi", isOn: false },
  { id: 8, name: "Smart V3 CCTV", room: "Living Room", type: "cctv", connection: "wifi", isOn: false },
];

function DeviceIconSmall({ type }: { type: string }) {
  switch (type) {
    case "lamp":
      return (
        <svg viewBox="0 0 40 40" className="w-10 h-10">
          <ellipse cx="20" cy="8" rx="8" ry="4" fill="#E5E7EB" />
          <path d="M12 8 L16 32 L24 32 L28 8" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" />
          <rect x="15" y="32" width="10" height="4" fill="#9CA3AF" rx="1" />
        </svg>
      );
    case "cctv":
      return (
        <svg viewBox="0 0 40 40" className="w-10 h-10">
          <circle cx="20" cy="20" r="12" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2" />
          <circle cx="20" cy="20" r="6" fill="#1F2937" />
          <circle cx="20" cy="20" r="3" fill="#374151" />
        </svg>
      );
    case "speaker":
      return (
        <svg viewBox="0 0 40 40" className="w-10 h-10">
          <rect x="10" y="12" width="20" height="20" rx="8" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" />
          <ellipse cx="20" cy="10" rx="8" ry="3" fill="#E5E7EB" />
        </svg>
      );
    case "router":
      return (
        <svg viewBox="0 0 40 40" className="w-10 h-10">
          <rect x="8" y="20" width="24" height="12" rx="2" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" />
          <line x1="12" y1="20" x2="12" y2="12" stroke="#9CA3AF" strokeWidth="2" />
          <line x1="20" y1="20" x2="20" y2="8" stroke="#9CA3AF" strokeWidth="2" />
          <line x1="28" y1="20" x2="28" y2="12" stroke="#9CA3AF" strokeWidth="2" />
        </svg>
      );
    case "ac":
      return (
        <svg viewBox="0 0 40 40" className="w-10 h-10">
          <rect x="6" y="14" width="28" height="14" rx="2" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" />
          <line x1="10" y1="24" x2="30" y2="24" stroke="#D1D5DB" strokeWidth="1" />
          <line x1="10" y1="26" x2="30" y2="26" stroke="#D1D5DB" strokeWidth="1" />
        </svg>
      );
    case "webcam":
      return (
        <svg viewBox="0 0 40 40" className="w-10 h-10">
          <circle cx="20" cy="16" r="10" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" />
          <circle cx="20" cy="16" r="5" fill="#1F2937" />
          <rect x="16" y="26" width="8" height="8" fill="#E5E7EB" />
        </svg>
      );
    default:
      return <div className="w-10 h-10 bg-gray-200 rounded-full" />;
  }
}

export function HomeDashboardScreen({
  onAddDevice,
  onScan,
  onVoiceAssistant,
  onNotifications,
  onShowSwitchHome,
  onNavigate,
  currentHome = "My Home",
}: HomeDashboardScreenProps) {
  const [selectedRoom, setSelectedRoom] = useState("Living Room");
  const [activeTab, setActiveTab] = useState("home");
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showSwitchHome, setShowSwitchHome] = useState(false);

  return (
    <div className="flex flex-col h-full bg-muted/20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white">
        <button
          onClick={() => setShowSwitchHome(true)}
          className="flex items-center gap-2"
        >
          <span className="text-xl font-bold text-foreground">{currentHome}</span>
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </button>
        <div className="flex items-center gap-2">
          {/* Robot / Chat Icon */}
          <button
            onClick={() => {
              if (onNavigate) onNavigate("chat");
              else if (onVoiceAssistant) onVoiceAssistant();
            }}
            className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="currentColor">
                <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
                <circle cx="9" cy="10" r="1.5" fill="currentColor" />
                <circle cx="15" cy="10" r="1.5" fill="currentColor" />
                <path d="M8 14c0 0 2 2 4 2s4-2 4-2" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
          </button>
          {/* Notification */}
          <button
            onClick={onNotifications}
            className="w-12 h-12 rounded-full border border-border flex items-center justify-center relative"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </div>

      {/* Weather Card */}
      <div className="mx-4 mt-4 p-5 bg-primary rounded-2xl text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-20 h-20 border border-white/30 rotate-45" />
          <div className="absolute bottom-4 right-20 w-16 h-16 border border-white/30 rotate-12" />
        </div>
        
        <div className="relative flex justify-between items-start">
          <div>
            <div className="flex items-start">
              <span className="text-5xl font-light">20</span>
              <span className="text-xl mt-1">°C</span>
            </div>
            <p className="text-white/90 mt-1">New York City, USA</p>
            <p className="text-white/80 text-sm">Today Cloudy</p>
            <div className="flex items-center gap-4 mt-3 text-sm text-white/80">
              <span className="flex items-center gap-1">
                <Wind className="w-4 h-4" />
                AQI 92
              </span>
              <span className="flex items-center gap-1">
                <Droplets className="w-4 h-4" />
                78.2%
              </span>
              <span className="flex items-center gap-1">
                <Cloud className="w-4 h-4" />
                2.0 m/s
              </span>
            </div>
          </div>
          {/* Weather Icon */}
          <div className="w-24 h-24">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Cloud */}
              <ellipse cx="50" cy="60" rx="35" ry="25" fill="white" opacity="0.9" />
              <ellipse cx="35" cy="55" rx="20" ry="18" fill="white" opacity="0.9" />
              <ellipse cx="65" cy="55" rx="22" ry="20" fill="white" opacity="0.9" />
              {/* Sun */}
              <circle cx="70" cy="35" r="18" fill="#FFB347" />
              <circle cx="70" cy="35" r="14" fill="#FFCC66" />
            </svg>
          </div>
        </div>
      </div>

      {/* All Devices Section */}
      <div className="flex-1 mt-6 bg-white rounded-t-3xl">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold text-foreground">All Devices</h2>
          <button>
            <MoreVertical className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Room Tabs */}
        <div className="flex gap-2 px-4 overflow-x-auto pb-4">
          {rooms.map((room) => (
            <button
              key={room}
              onClick={() => setSelectedRoom(room)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedRoom === room
                  ? "bg-primary text-white"
                  : "bg-muted/50 text-muted-foreground border border-border"
              }`}
            >
              {room}
            </button>
          ))}
        </div>

        {/* Category quick links */}
        <div className="flex gap-3 px-4 overflow-x-auto pb-4">
          {[
            { label: "Lightning", color: "bg-yellow-50", textColor: "text-yellow-600", nav: "lightning" },
            { label: "Cameras", color: "bg-purple-50", textColor: "text-purple-600", nav: "cameras" },
            { label: "Electrical", color: "bg-red-50", textColor: "text-red-500", nav: "" },
          ].map((cat) => (
            <button
              key={cat.label}
              onClick={() => cat.nav && onNavigate && onNavigate(cat.nav)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl ${cat.color} ${cat.textColor} text-sm font-medium`}
            >
              <span className="w-2 h-2 rounded-full bg-current" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Devices Grid */}
        <div className="grid grid-cols-2 gap-3 px-4 pb-6">
          {dashboardDevices.map((device) => (
            <div
              key={device.id}
              className="bg-white rounded-xl p-3 cursor-pointer active:bg-gray-50"
              onClick={() => onNavigate && onNavigate(`control-${device.type}`)}
            >
              <div className="flex justify-between items-start mb-2">
                <DeviceIconSmall type={device.type} />
                {/* Toggle */}
                <button onClick={(e) => e.stopPropagation()}>
                  <div className={`w-11 h-6 rounded-full p-0.5 transition-colors ${device.isOn ? "bg-primary" : "bg-gray-300"}`}>
                    <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${device.isOn ? "translate-x-5" : ""}`} />
                  </div>
                </button>
              </div>
              <p className="font-semibold text-foreground text-sm">{device.name}</p>
              <div className="flex items-center gap-1 mt-1">
                {device.connection === "wifi" ? (
                  <Wifi className="w-3 h-3 text-muted-foreground" />
                ) : (
                  <Bluetooth className="w-3 h-3 text-muted-foreground" />
                )}
                <span className="text-xs text-muted-foreground capitalize">{device.connection === "wifi" ? "Wi-Fi" : "Bluetooth"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute bottom-24 right-4 flex flex-col gap-3">
        <button
          onClick={onVoiceAssistant}
          className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center border border-border"
        >
          <Mic className="w-6 h-6 text-primary" />
        </button>
        <button
          onClick={() => setShowAddMenu(true)}
          className="w-14 h-14 rounded-full bg-primary shadow-lg flex items-center justify-center"
        >
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Add Menu Modal */}
      {showAddMenu && (
        <AddMenuModal
          onClose={() => setShowAddMenu(false)}
          onAddDevice={() => {
            setShowAddMenu(false);
            onAddDevice();
          }}
          onScan={() => {
            setShowAddMenu(false);
            if (onScan) onScan();
          }}
        />
      )}

      {/* Switch Home Modal */}
      {showSwitchHome && (
        <SwitchHomeModal
          onClose={() => setShowSwitchHome(false)}
          onSelect={(home) => {
            setShowSwitchHome(false);
            if (onShowSwitchHome) onShowSwitchHome(home);
          }}
          currentHome={currentHome}
        />
      )}

      {/* Bottom Navigation */}
      <div className="flex items-center justify-around py-4 bg-white border-t border-border">
        {[
          { id: "home", icon: Home, label: "Home", screen: "home-dashboard" },
          { id: "smart", icon: CheckSquare, label: "Smart", screen: "smart-scenes" },
          { id: "reports", icon: BarChart3, label: "Reports", screen: "reports" },
          { id: "account", icon: User, label: "Account", screen: "account-settings" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              if (tab.id === "home") return; // already on home
              if (onNavigate) onNavigate(tab.screen);
            }}
            className={`flex flex-col items-center gap-1 ${
              tab.id === "home" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {tab.id === "home" && (
              <div className="w-1 h-1 rounded-full bg-primary mb-0.5" />
            )}
            <tab.icon className="w-6 h-6" />
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
