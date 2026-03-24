"use client";

import { ArrowLeft, Calendar, Check, AlertCircle } from "lucide-react";

interface SmartScenesLogsScreenProps {
  onBack: () => void;
}

const logsData = [
  {
    date: "December, 2024",
    day: 24,
    dayName: "Today, Sunday",
    logs: [
      { id: 1, name: "Turn on the AC", time: "09:41", status: "succeeded" },
      { id: 2, name: "Welcome Home Automation", time: "09:40", status: "failed" },
      { id: 3, name: "Quick Lights ON", time: "09:39", status: "succeeded" },
    ],
  },
  {
    date: "December, 2024",
    day: 23,
    dayName: "Saturday",
    logs: [
      { id: 4, name: "Boost Productivity", time: "10:00", status: "succeeded" },
      { id: 5, name: "Go to Office", time: "09:00", status: "succeeded" },
      { id: 6, name: "Get Energized", time: "08:00", status: "failed" },
    ],
  },
  {
    date: "December, 2024",
    day: 22,
    dayName: "Friday",
    logs: [
      { id: 7, name: "Outdoor Party", time: "19:30", status: "succeeded" },
      { id: 8, name: "Work Mode Activate", time: "08:30", status: "succeeded" },
    ],
  },
];

export function SmartScenesLogsScreen({ onBack }: SmartScenesLogsScreenProps) {
  return (
    <div className="mobile-container flex flex-col bg-white min-h-screen">
      {/* Status Bar */}
      <div className="flex items-center justify-between px-6 pt-3 pb-2">
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
      <div className="flex items-center justify-between px-4 py-3">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-xl font-bold text-foreground">Logs</h1>
        <button className="w-10 h-10 flex items-center justify-center">
          <Calendar className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Logs List */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {logsData.map((dateGroup) => (
          <div key={`${dateGroup.day}-${dateGroup.date}`} className="mb-6">
            {/* Date Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">{dateGroup.day}</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{dateGroup.date}</p>
              </div>
              <p className="text-muted-foreground text-sm">{dateGroup.dayName}</p>
            </div>

            {/* Logs */}
            <div className="space-y-4 pl-16">
              {dateGroup.logs.map((log) => (
                <div key={log.id} className="flex items-start gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      log.status === "succeeded" ? "bg-primary" : "bg-red-500"
                    }`}
                  >
                    {log.status === "succeeded" ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{log.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {log.time} · Processing {log.status === "succeeded" ? "Succeeded" : "Failed"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
