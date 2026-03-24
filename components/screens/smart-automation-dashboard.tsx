'use client';

import React, { useState } from 'react';
import { ChevronDown, FileText, Grid3x3, Home, Activity, BarChart3, User, Plus } from 'lucide-react';

interface Scene {
  id: string;
  name: string;
  taskCount: number;
  icon: string;
  color: string;
  bgColor: string;
}

const SmartAutomationDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const scenes: Scene[] = [
    { id: 1, name: 'Quick Lights ON', taskCount: 1, icon: '☀️', color: 'from-orange-400 to-orange-500', bgColor: 'bg-orange-400' },
    { id: 2, name: 'Bedtime Prep', taskCount: 2, icon: '🌙', color: 'from-blue-400 to-blue-500', bgColor: 'bg-blue-400' },
    { id: 3, name: 'Evening Chill', taskCount: 4, icon: '🏔️', color: 'from-green-400 to-green-500', bgColor: 'bg-green-400' },
    { id: 4, name: 'Boost Productivity', taskCount: 1, icon: '📈', color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-500' },
    { id: 5, name: 'Get Energized', taskCount: 3, icon: '🔥', color: 'from-red-500 to-red-600', bgColor: 'bg-red-500' },
    { id: 6, name: 'Home Office', taskCount: 2, icon: '🏠', color: 'from-cyan-400 to-cyan-500', bgColor: 'bg-cyan-400' },
    { id: 7, name: 'Reading Corner', taskCount: 4, icon: '📖', color: 'from-amber-700 to-amber-800', bgColor: 'bg-amber-700' },
    { id: 8, name: 'Outdoor Party', taskCount: 3, icon: '🎉', color: 'from-slate-500 to-slate-600', bgColor: 'bg-slate-500' },
  ];

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'smart', label: 'Smart', icon: Activity },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'account', label: 'Account', icon: User },
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Status Bar */}
      <div className="bg-white px-4 pt-2 pb-4 flex items-center justify-between text-sm font-medium">
        <span className="text-lg font-bold">9:41</span>
        <div className="flex gap-1 items-center">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
          </svg>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1 9h2v2H1V9zm3 0h2v2H4V9zm3 0h2v2H7V9zm3 0h2v2h-2V9zm3 0h2v2h-2V9zm3 0h2v2h-2V9zm3 0h2v2h-2V9zM1 12h2v2H1v-2zm19 0h2v2h-2v-2zM1 15h2v2H1v-2z M23 3v10c0 1.66-1.34 3-3 3h-3v4h-4v-4H7v4H3v-4H1c-1.66 0-3-1.34-3-3V3c0-1.66 1.34-3 3-3h18c1.66 0 3 1.34 3 3z"/>
          </svg>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z"/>
          </svg>
        </div>
      </div>

      {/* Header */}
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">My Home</h1>
          <ChevronDown className="w-6 h-6 text-gray-700" />
        </div>
        <div className="flex gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <FileText className="w-6 h-6" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Grid3x3 className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Tap-to-Run Button */}
      <div className="px-4 pb-6">
        <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-blue-700 transition">
          Tap-to-Run
        </button>
      </div>

      {/* Automation Section */}
      <div className="px-4 pb-4">
        <h2 className="text-2xl font-bold mb-4">Automation</h2>

        {/* Scenes Grid */}
        <div className="grid grid-cols-2 gap-4">
          {scenes.map((scene) => (
            <div
              key={scene.id}
              className={`${scene.bgColor} rounded-3xl p-6 text-white cursor-pointer hover:shadow-lg transition transform hover:scale-105 relative overflow-hidden`}
            >
              {/* Background gradient overlay */}
              <div className="absolute inset-0 opacity-10 bg-black rounded-3xl"></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-between h-40">
                <div className="flex justify-between items-start">
                  <div className="text-5xl">{scene.icon}</div>
                  <ChevronDown className="w-6 h-6 rotate-180 opacity-70" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{scene.name}</h3>
                  <p className="text-sm opacity-90">
                    {scene.taskCount} task{scene.taskCount !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center justify-around py-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center gap-1 p-2"
            >
              <Icon
                className={`w-6 h-6 ${
                  isActive ? 'text-blue-600' : 'text-gray-400'
                }`}
              />
              <span
                className={`text-xs font-medium ${
                  isActive ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-32 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};

export default SmartAutomationDashboard;
