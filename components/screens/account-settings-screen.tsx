"use client";

import {
  ChevronDown,
  ChevronRight,
  Home,
  CheckSquare,
  BarChart3,
  User,
  Mic,
  Bell,
  Shield,
  ArrowUpDown,
  Eye,
  Settings,
  LineChart,
  HelpCircle,
  LogOut,
  Scan,
  MoreVertical,
} from "lucide-react";

interface AccountSettingsScreenProps {
  onNavigate?: (screen: string) => void;
}

const generalSettings = [
  { id: "home-management", label: "Home Management", icon: Home },
  { id: "voice", label: "Voice Assistants", icon: Mic },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Account & Security", icon: Shield },
  { id: "linked", label: "Linked Accounts", icon: ArrowUpDown },
  { id: "appearance", label: "App Appearance", icon: Eye },
  { id: "additional", label: "Additional Settings", icon: Settings },
];

const supportSettings = [
  { id: "data", label: "Data & Analytics", icon: LineChart },
  { id: "help", label: "Help & Support", icon: HelpCircle },
];

export function AccountSettingsScreen({ onNavigate }: AccountSettingsScreenProps) {
  return (
    <div className="mobile-container flex flex-col bg-muted min-h-screen relative">
      {/* Status Bar */}
      <div className="flex items-center justify-between px-6 pt-3 pb-2 bg-white">
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
      <div className="flex items-center justify-between px-4 py-3 bg-white">
        <div className="flex items-center gap-1">
          <span className="text-xl font-bold text-foreground">My Home</span>
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center">
            <Scan className="w-5 h-5 text-foreground" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center">
            <MoreVertical className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <button
        onClick={() => onNavigate?.("profile")}
        className="mx-4 mt-4 bg-white rounded-2xl p-4 flex items-center gap-4"
      >
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
          alt="Profile"
          className="w-14 h-14 rounded-full object-cover"
        />
        <div className="flex-1">
          <p className="font-semibold text-foreground text-lg">Andrew Ainsley</p>
          <p className="text-sm text-muted-foreground">andrew.ainsley@yourdomain.com</p>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </button>

      {/* General Section */}
      <div className="mx-4 mt-4">
        <p className="text-sm text-muted-foreground mb-2 px-1">General</p>
        <div className="bg-white rounded-2xl overflow-hidden">
          {generalSettings.map((setting, index) => (
            <button
              key={setting.id}
              onClick={() => onNavigate?.(setting.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 ${
                index !== generalSettings.length - 1 ? "border-b border-muted" : ""
              }`}
            >
              <setting.icon className="w-5 h-5 text-foreground" />
              <span className="flex-1 text-left font-medium text-foreground">{setting.label}</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      {/* Support Section */}
      <div className="mx-4 mt-4">
        <p className="text-sm text-muted-foreground mb-2 px-1">Support</p>
        <div className="bg-white rounded-2xl overflow-hidden">
          {supportSettings.map((setting, index) => (
            <button
              key={setting.id}
              onClick={() => onNavigate?.(setting.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 ${
                index !== supportSettings.length - 1 ? "border-b border-muted" : ""
              }`}
            >
              <setting.icon className="w-5 h-5 text-foreground" />
              <span className="flex-1 text-left font-medium text-foreground">{setting.label}</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <button className="mx-4 mt-4 flex items-center gap-4 px-5 py-4 mb-24">
        <LogOut className="w-5 h-5 text-red-500" />
        <span className="font-medium text-red-500">Logout</span>
      </button>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-3">
        <div className="flex justify-between items-center">
          <button
            onClick={() => onNavigate?.("home-dashboard")}
            className="flex flex-col items-center gap-1"
          >
            <Home className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Home</span>
          </button>
          <button
            onClick={() => onNavigate?.("smart-scenes")}
            className="flex flex-col items-center gap-1"
          >
            <CheckSquare className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Smart</span>
          </button>
          <button
            onClick={() => onNavigate?.("reports")}
            className="flex flex-col items-center gap-1"
          >
            <BarChart3 className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Reports</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <User className="w-5 h-5 text-primary" fill="currentColor" />
            <span className="text-xs text-primary font-medium">Account</span>
          </button>
        </div>
      </div>
    </div>
  );
}
