"use client";

import { ArrowLeft, Wifi } from "lucide-react";

interface LinkedAccountsScreenProps {
  onBack: () => void;
}

const accounts = [
  {
    id: "google",
    name: "Google",
    connected: true,
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    id: "apple",
    name: "Apple",
    connected: true,
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
    ),
  },
  {
    id: "facebook",
    name: "Facebook",
    connected: false,
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10">
        <circle cx="12" cy="12" r="10" fill="#1877F2"/>
        <path d="M16.5 8H14c-.5 0-1 .5-1 1v2h3.5l-.5 3H13v6h-3v-6H8v-3h2V8.5C10 6.5 11.5 5 13.5 5H16.5v3z" fill="white"/>
      </svg>
    ),
  },
  {
    id: "twitter",
    name: "Twitter",
    connected: false,
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#1DA1F2">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
      </svg>
    ),
  },
];

export function LinkedAccountsScreen({ onBack }: LinkedAccountsScreenProps) {
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
        <h1 className="flex-1 text-xl font-bold text-center mr-10">Linked Accounts</h1>
      </div>

      {/* Accounts List */}
      <div className="flex-1 px-4 overflow-auto space-y-3">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4"
          >
            {account.icon}
            <span className="flex-1 font-semibold text-foreground">{account.name}</span>
            <span className={account.connected ? "text-muted-foreground" : "text-primary font-medium"}>
              {account.connected ? "Connected" : "Connect"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
