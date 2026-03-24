"use client";

import { Briefcase, CheckSquare, Shield, Bell, Clock, ChevronRight } from "lucide-react";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: string) => void;
  onNavigate?: (screen: string) => void;
}

const tasks = [
  {
    type: "control-device",
    icon: Briefcase,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
    title: "Control Single Device",
  },
  {
    type: "select-scene",
    icon: CheckSquare,
    iconColor: "text-green-500",
    iconBg: "bg-green-50",
    title: "Select Smart Scene",
  },
  {
    type: "arm-mode",
    icon: Shield,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-50",
    title: "Change Arm Mode",
  },
  {
    type: "notification",
    icon: Bell,
    iconColor: "text-red-500",
    iconBg: "bg-red-50",
    title: "Send Notification",
  },
  {
    type: "delay",
    icon: Clock,
    iconColor: "text-gray-500",
    iconBg: "bg-gray-100",
    title: "Delay the Action",
  },
];

export function AddTaskModal({ isOpen, onClose, onSelect, onNavigate }: AddTaskModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="absolute inset-0 z-50 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      {/* Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-xl overflow-hidden">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Title */}
        <div className="px-6 pb-4">
          <h2 className="text-lg font-bold text-foreground">Add Task</h2>
        </div>

        {/* Options */}
        <div className="border-t border-border">
          {tasks.map((task, index) => (
            <button
              key={task.type}
              onClick={() => {
                onSelect(task.type);
                onClose();
                if (task.type === "control-device" && onNavigate) {
                  onNavigate("control-single-device");
                } else if (task.type === "select-scene" && onNavigate) {
                  onNavigate("select-smart-scene");
                } else if (task.type === "delay" && onNavigate) {
                  onNavigate("delay-action");
                }
              }}
              className="flex items-center gap-4 w-full px-6 py-4 text-left border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
            >
              <div className={`w-10 h-10 rounded-full ${task.iconBg} flex items-center justify-center flex-shrink-0`}>
                <task.icon className={`w-5 h-5 ${task.iconColor}`} />
              </div>
              <span className="flex-1 font-medium text-gray-900">{task.title}</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
