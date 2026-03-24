"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, MoreVertical, Plus, X, Thermometer, Droplet, ChevronRight } from "lucide-react";
import { PrimaryButton } from "@/components/smartify";
import { AddConditionModal } from "./add-condition-modal";
import { AddTaskModal } from "./add-task-modal";
import { SceneNameModal } from "./scene-name-modal";

interface Condition {
  id: number;
  icon: "temperature" | "humidity" | "schedule" | "location";
  label: string;
  value: string;
  location: string;
  iconColor: string;
  iconBg: string;
}

interface Task {
  id: number;
  iconColor: string;
  iconBg: string;
  label: string;
  sublabel: string;
  detail: string;
}

interface TriggerConfigScreenProps {
  onBack: () => void;
  onSave?: () => void;
  onNavigate?: (screen: string) => void;
  initialConditions?: Condition[];
  initialTasks?: Task[];
  showSceneName?: boolean;
  variant?: "automation" | "tap-to-run";
}

export function TriggerConfigScreen({
  onBack,
  onSave,
  onNavigate,
  initialConditions,
  initialTasks,
  showSceneName: initialShowSceneName = false,
  variant = "automation",
}: TriggerConfigScreenProps) {
  const defaultConditionsAutomation: Condition[] = [
    {
      id: 1,
      icon: "schedule",
      label: "Schedule Time",
      value: "21:45 PM",
      location: "Every Day",
      iconColor: "text-green-500",
      iconBg: "bg-green-50",
    },
  ];
  const defaultTasksAutomation: Task[] = [
    {
      id: 1,
      iconColor: "text-gray-500",
      iconBg: "bg-gray-100",
      label: "Delay the Action",
      sublabel: "Delay",
      detail: "15 mins 30 secs",
    },
    {
      id: 2,
      iconColor: "text-orange-500",
      iconBg: "bg-orange-50",
      label: "Turn OFF All the Lights",
      sublabel: "Automation",
      detail: "Enable",
    },
  ];
  const defaultConditionsTapToRun: Condition[] = [
    {
      id: 1,
      icon: "hand",
      label: "Launch Tap-to-Run",
      value: "One tap to execute commands",
      location: "",
      iconColor: "text-blue-500",
      iconBg: "bg-blue-50",
    },
  ];
  const defaultTasksTapToRun: Task[] = [
    {
      id: 1,
      iconColor: "text-orange-500",
      iconBg: "bg-orange-50",
      label: "Turn ON All the Lights",
      sublabel: "Automation",
      detail: "Enable",
    },
  ];

  const defaultConditions = variant === "tap-to-run" ? defaultConditionsTapToRun : defaultConditionsAutomation;
  const defaultTasks = variant === "tap-to-run" ? defaultTasksTapToRun : defaultTasksAutomation;

  const [conditions, setConditions] = useState<Condition[]>(initialConditions ?? defaultConditions);
  const [tasks, setTasks] = useState<Task[]>(initialTasks ?? defaultTasks);
  const [showAddCondition, setShowAddCondition] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showSceneNameModal, setShowSceneNameModal] = useState(initialShowSceneName);
  const [sceneName, setSceneName] = useState("Welcome Home Automation");

  // Read pending task from sessionStorage (set by SelectFunctionScreen / ControlSingleDevice)
  useEffect(() => {
    try {
      const pending = sessionStorage.getItem("pending_task");
      if (pending) {
        const task = JSON.parse(pending) as Task;
        setTasks((prev) => [...prev, task]);
        sessionStorage.removeItem("pending_task");
      }
    } catch (_) {}
  }, []);

  const removeCondition = (id: number) => {
    setConditions((prev) => prev.filter((c) => c.id !== id));
  };

  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const conditionIcon = (icon: Condition["icon"], iconColor: string, iconBg: string) => {
    if (icon === "temperature") {
      return (
        <div className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center`}>
          <Thermometer className={`w-4 h-4 ${iconColor}`} />
        </div>
      );
    }
    if (icon === "humidity") {
      return (
        <div className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center`}>
          <Droplet className={`w-4 h-4 ${iconColor}`} />
        </div>
      );
    }
    if (icon === "schedule") {
      return (
        <div className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center`}>
          <svg viewBox="0 0 24 24" className={`w-4 h-4 ${iconColor}`} fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
      );
    }
    // Location / arrive at — green map pin
    return (
      <div className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center`}>
        <svg viewBox="0 0 24 24" className={`w-4 h-4 ${iconColor}`} fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      </div>
    );
  };

  const taskIcon = (iconColor: string, iconBg: string, label: string) => (
    <div className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center`}>
      {label.toLowerCase().includes("light") ? (
        <svg viewBox="0 0 24 24" className={`w-4 h-4 ${iconColor}`} fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm2 14H9v-1h5v1zm1.31-3.26L13 14.45V16h-2v-1.55l-2.31-1.71A5.98 5.98 0 0 0 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5a5.98 5.98 0 0 0-1.69 3.74z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className={`w-4 h-4 ${iconColor}`} fill="currentColor">
          <rect x="3" y="8" width="18" height="10" rx="2" />
          <line x1="5" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.5" />
          <line x1="5" y1="18" x2="19" y2="18" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )}
    </div>
  );

  return (
    <div className="relative flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-white">
        <button onClick={onBack} className="p-1">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Create Scene</h1>
        <button>
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

        {/* IF Section */}
        <div className="bg-white rounded-2xl overflow-hidden">
          {/* IF Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="font-bold text-gray-900">If</span>
            <button
              onClick={() => setShowAddCondition(true)}
              className="w-7 h-7 rounded-full bg-primary flex items-center justify-center"
            >
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Default text */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <p className="text-sm text-gray-500">When any condition is met</p>
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {/* Conditions */}
          {conditions.map((cond) => (
            <div
              key={cond.id}
              className="flex items-center gap-3 px-4 py-4 border-b border-gray-100"
            >
              {conditionIcon(cond.icon, cond.iconColor, cond.iconBg)}
              <div className="flex-1">
                <p className="font-semibold text-gray-900">
                  {cond.label}: {cond.value}
                </p>
                {cond.location && (
                  <p className="text-sm text-gray-500">{cond.location}</p>
                )}
              </div>
              <button
                onClick={() => removeCondition(cond.id)}
                className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center"
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>

        {/* THEN Section */}
        <div className="bg-white rounded-2xl overflow-hidden">
          {/* THEN Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="font-bold text-gray-900">Then</span>
            <button
              onClick={() => setShowAddTask(true)}
              className="w-7 h-7 rounded-full bg-primary flex items-center justify-center"
            >
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Tasks */}
          {tasks.length > 0 ? (
            <>
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 px-4 py-4 border-b border-gray-100"
                >
                  {taskIcon(task.iconColor, task.iconBg, task.label)}
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{task.label}</p>
                    <p className="text-sm text-gray-500">{task.sublabel}: {task.detail}</p>
                  </div>
                  <button
                    onClick={() => removeTask(task.id)}
                    className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              ))}
              {/* Add Task Button */}
              <button
                onClick={() => setShowAddTask(true)}
                className="flex items-center justify-center gap-2 w-full px-4 py-4 text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Add Task</span>
              </button>
            </>
          ) : (
            /* Empty state */
            <button
              onClick={() => setShowAddTask(true)}
              className="flex items-center justify-center gap-2 w-full px-4 py-6 text-gray-500 hover:bg-gray-50 transition-colors border-2 border-dashed border-gray-200 rounded-xl m-3"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Add Task</span>
            </button>
          )}
        </div>
      </div>

      {/* Style Section */}
      <button className="bg-white rounded-2xl flex items-center justify-between px-4 py-4 w-full text-left">
        <span className="font-bold text-gray-900">Style</span>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
              <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </button>

      {/* Save Button */}
      <div className="p-4 bg-white border-t border-gray-100">
        <PrimaryButton onClick={() => setShowSceneNameModal(true)} className="w-full">
          Save
        </PrimaryButton>
      </div>

      {/* Scene Name Modal */}
      <SceneNameModal
        isOpen={showSceneNameModal}
        onClose={() => setShowSceneNameModal(false)}
        onSave={(name) => {
          setSceneName(name);
          setShowSceneNameModal(false);
          if (onSave) onSave();
        }}
        initialName={sceneName}
      />

      {/* Add Condition Modal */}
      <AddConditionModal
        isOpen={showAddCondition}
        onClose={() => setShowAddCondition(false)}
        onSelect={(type) => {
          setShowAddCondition(false);
          if (type === "weather") {
            setConditions((prev) => [
              ...prev,
              {
                id: Date.now(),
                icon: "temperature",
                label: "Temperature",
                value: "> 25°C",
                location: "New York City",
                iconColor: "text-red-500",
                iconBg: "bg-red-50",
              },
            ]);
          } else if (type === "humidity") {
            setConditions((prev) => [
              ...prev,
              {
                id: Date.now(),
                icon: "humidity",
                label: "Humidity",
                value: "Dry",
                location: "New York City",
                iconColor: "text-blue-500",
                iconBg: "bg-blue-50",
              },
            ]);
          } else if (type === "location") {
            setConditions((prev) => [
              ...prev,
              {
                id: Date.now(),
                icon: "location",
                label: "Arrive at",
                value: "751 7th Ave, New York, 10019, USA",
                location: "",
                iconColor: "text-green-500",
                iconBg: "bg-green-50",
              },
            ]);
          }
        }}
        onNavigate={onNavigate}
      />

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={showAddTask}
        onClose={() => setShowAddTask(false)}
        onSelect={(type) => setShowAddTask(false)}
        onNavigate={onNavigate}
      />
    </div>
  );
}
