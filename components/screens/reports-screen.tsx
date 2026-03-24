"use client";

import { useState } from "react";
import {
  ChevronDown,
  Home,
  CheckSquare,
  BarChart3,
  User,
  MoreVertical,
  Calendar,
  Zap,
  Plug,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

interface ReportsScreenProps {
  onNavigate?: (screen: string) => void;
}

const dateRangeOptions = [
  "Today",
  "This Week",
  "Last month",
  "Last 3 months",
  "Last 6 months",
  "This year",
  "Last year",
  "All time",
  "Custom range..",
];

const devices = [
  {
    id: 1,
    name: "Smart Lamp",
    count: 12,
    kWh: 184.69,
    cost: 27.7,
    icon: "lamp",
  },
  {
    id: 2,
    name: "Smart V1 CCTV",
    count: 3,
    kWh: 125.73,
    cost: 18.86,
    icon: "cctv",
  },
  {
    id: 3,
    name: "Smart Speaker",
    count: 5,
    kWh: 106.45,
    cost: 15.97,
    icon: "speaker",
  },
  {
    id: 4,
    name: "Smart Plug",
    count: 8,
    kWh: 98.24,
    cost: 14.74,
    icon: "plug",
  },
];

const chartData = [
  { month: "Jul", value: 45 },
  { month: "Aug", value: 60 },
  { month: "Sept", value: 75 },
  { month: "Oct", value: 90 },
  { month: "Nov", value: 70 },
  { month: "Dec", value: 55 },
];

function DeviceIcon({ type }: { type: string }) {
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
    case "plug":
      return (
        <svg viewBox="0 0 40 40" className="w-10 h-10">
          <rect x="10" y="15" width="20" height="15" rx="3" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" />
          <rect x="14" y="10" width="4" height="8" rx="1" fill="#9CA3AF" />
          <rect x="22" y="10" width="4" height="8" rx="1" fill="#9CA3AF" />
        </svg>
      );
    default:
      return <div className="w-10 h-10 bg-gray-200 rounded-full" />;
  }
}

export function ReportsScreen({ onNavigate }: ReportsScreenProps) {
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState("Last 6 Months");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(11); // December
  const [selectedYear, setSelectedYear] = useState(2024);
  const [hoveredBar, setHoveredBar] = useState<number | null>(3); // Default to Oct

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Convert to Monday-based
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
    const days = [];
    
    // Previous month days
    const prevMonthDays = getDaysInMonth(selectedMonth - 1, selectedYear);
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, isCurrentMonth: false });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }
    
    return days;
  };

  const maxValue = Math.max(...chartData.map(d => d.value));

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
          <button
            onClick={() => setShowCalendar(true)}
            className="w-10 h-10 flex items-center justify-center"
          >
            <Calendar className="w-5 h-5 text-foreground" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center">
            <MoreVertical className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Usage Cards */}
      <div className="flex gap-3 px-4 py-4">
        <div className="flex-1 bg-white rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-orange-400 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">This month</p>
              <p className="text-xl font-bold text-foreground">
                825.40 <span className="text-sm font-normal text-muted-foreground">kWh</span>
              </p>
              <p className="text-sm text-muted-foreground">$123.81</p>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <Plug className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Previous month</p>
              <p className="text-xl font-bold text-foreground">
                958.75 <span className="text-sm font-normal text-muted-foreground">kWh</span>
              </p>
              <p className="text-sm text-muted-foreground">$143.81</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="mx-4 bg-white rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Statistics</h3>
          <button
            onClick={() => setShowDateDropdown(!showDateDropdown)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-muted"
          >
            <span className="text-sm text-foreground">{selectedDateRange}</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        
        {/* Bar Chart */}
        <div className="relative h-48 mt-6">
          <div className="flex items-end justify-between h-full gap-2">
            {chartData.map((data, index) => (
              <div
                key={data.month}
                className="flex flex-col items-center flex-1 relative"
                onMouseEnter={() => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Tooltip */}
                {hoveredBar === index && (
                  <div className="absolute -top-8 bg-primary text-white px-2 py-1 rounded-lg text-xs whitespace-nowrap z-10">
                    {(data.value * 8.7).toFixed(2)} kWh
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary" />
                  </div>
                )}
                <div
                  className="w-full rounded-t-lg bg-primary/70 transition-all duration-200"
                  style={{ height: `${(data.value / maxValue) * 100}%` }}
                />
                <span className="text-xs text-muted-foreground mt-2">{data.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Devices Section */}
      <div className="mx-4 mt-4 pb-24">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Devices</h3>
          <button>
            <MoreVertical className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {devices.map((device) => (
            <button
              key={device.id}
              onClick={() => onNavigate?.("device-report-detail")}
              className="bg-white rounded-2xl p-4 text-left"
            >
              <div className="flex items-start justify-between mb-2">
                <DeviceIcon type={device.icon} />
                <div className="text-right">
                  <p className="font-bold text-foreground">{device.kWh} <span className="text-sm font-normal text-muted-foreground">kWh</span></p>
                  <p className="text-sm text-muted-foreground">${device.cost.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{device.name}</p>
                  <p className="text-sm text-muted-foreground">{device.count} devices</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Date Range Dropdown */}
      {showDateDropdown && (
        <div className="absolute top-48 right-4 bg-white rounded-2xl shadow-xl border border-muted overflow-hidden z-50">
          {dateRangeOptions.map((option) => (
            <button
              key={option}
              onClick={() => {
                if (option === "Custom range..") {
                  setShowCalendar(true);
                } else {
                  setSelectedDateRange(option);
                }
                setShowDateDropdown(false);
              }}
              className="w-full px-5 py-3 text-left hover:bg-muted/50 transition-colors border-b border-muted last:border-none"
            >
              <span className={`text-foreground ${selectedDateRange === option ? "font-semibold" : ""}`}>
                {option}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Calendar Modal */}
      {showCalendar && (
        <div className="absolute inset-0 bg-black/50 flex items-start justify-center pt-20 z-50">
          <div className="bg-white rounded-2xl w-[90%] max-w-sm p-4">
            <h3 className="text-lg font-bold text-foreground text-center mb-4">Select Custom Date</h3>
            
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => {
                  if (selectedMonth === 0) {
                    setSelectedMonth(11);
                    setSelectedYear(selectedYear - 1);
                  } else {
                    setSelectedMonth(selectedMonth - 1);
                  }
                }}
              >
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </button>
              <span className="font-semibold text-foreground">
                {months[selectedMonth]} {selectedYear}
              </span>
              <button
                onClick={() => {
                  if (selectedMonth === 11) {
                    setSelectedMonth(0);
                    setSelectedYear(selectedYear + 1);
                  } else {
                    setSelectedMonth(selectedMonth + 1);
                  }
                }}
              >
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map((day) => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {renderCalendar().map((dayInfo, index) => (
                <button
                  key={index}
                  onClick={() => setShowCalendar(false)}
                  className={`py-3 text-center text-sm rounded-lg transition-colors ${
                    dayInfo.isCurrentMonth
                      ? "text-foreground hover:bg-primary/10"
                      : "text-muted-foreground/50"
                  }`}
                >
                  {dayInfo.day}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

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
          <button className="flex flex-col items-center gap-1">
            <BarChart3 className="w-5 h-5 text-red-500" />
            <span className="text-xs text-red-500 font-medium">Reports</span>
          </button>
          <button
            onClick={() => onNavigate?.("account-settings")}
            className="flex flex-col items-center gap-1"
          >
            <User className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Account</span>
          </button>
        </div>
      </div>
    </div>
  );
}
