"use client";

import { useState } from "react";
import { ArrowLeft, Settings, Shield, RefreshCw, Lock, Star, Calendar } from "lucide-react";

interface NotificationScreenProps {
  onBack: () => void;
}

interface NotificationItem {
  id: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
}

const notifications: NotificationItem[] = [
  {
    id: "1",
    icon: <Shield className="w-5 h-5" />,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    title: "Account Security Alert",
    body: "We've noticed some unusual activity on your account. Please review your recent logins and update your password if necessary.",
    time: "09:41 AM",
    unread: true,
  },
  {
    id: "2",
    icon: <RefreshCw className="w-5 h-5" />,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    title: "System Update Available",
    body: "A new system update is ready for installation. It includes performance improvements and bug fixes.",
    time: "08:46 AM",
    unread: true,
  },
  {
    id: "3",
    icon: <Lock className="w-5 h-5" />,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    title: "Password Reset Successful",
    body: "Your password has been successfully reset. If you didn't request this change, please contact support immediately.",
    time: "20:30 PM",
    unread: false,
  },
  {
    id: "4",
    icon: <Star className="w-5 h-5" />,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    title: "Exciting New Feature",
    body: "We've just launched a new feature that will enhance your user experience. Check it out now!",
    time: "16:29 PM",
    unread: false,
  },
  {
    id: "5",
    icon: <Calendar className="w-5 h-5" />,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-600",
    title: "Event Reminder",
    body: "Reminder: Your scheduled smart scene 'Morning Routine' is set to run at 7:00 AM tomorrow.",
    time: "15:00 PM",
    unread: false,
  },
];

export function NotificationScreen({ onBack }: NotificationScreenProps) {
  const [activeTab, setActiveTab] = useState<"general" | "smart-home">("general");

  const grouped = {
    Today: notifications.filter((n) => n.id === "1" || n.id === "2"),
    Yesterday: notifications.filter((n) => n.id === "3" || n.id === "4" || n.id === "5"),
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <button onClick={onBack} className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Notification</h1>
        <button className="p-2 -mr-2">
          <Settings className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex mx-4 my-3 p-1 bg-muted/30 rounded-xl">
        <button
          onClick={() => setActiveTab("general")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "general"
              ? "bg-primary text-white"
              : "text-muted-foreground"
          }`}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab("smart-home")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "smart-home"
              ? "bg-primary text-white"
              : "text-muted-foreground"
          }`}
        >
          Smart Home
        </button>
      </div>

      {/* Notification List */}
      <div className="flex-1 overflow-y-auto">
        {(["Today", "Yesterday"] as const).map((group) => (
          <div key={group}>
            <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {group}
            </p>
            {grouped[group].map((item) => (
              <button
                key={item.id}
                className="w-full flex items-start gap-3 px-4 py-4 hover:bg-muted/20 transition-colors border-b border-border"
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-full ${item.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <span className={item.iconColor}>{item.icon}</span>
                </div>
                {/* Content */}
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-foreground text-sm">{item.title}</span>
                    {item.unread && (
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
                {/* Time + Chevron */}
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                  <span className="text-muted-foreground">›</span>
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
