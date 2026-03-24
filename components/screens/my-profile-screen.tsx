"use client";

import { useState } from "react";
import { ArrowLeft, Mail, ChevronDown, Calendar, Wifi, Pencil } from "lucide-react";

interface MyProfileScreenProps {
  onBack: () => void;
}

export function MyProfileScreen({ onBack }: MyProfileScreenProps) {
  const [name, setName] = useState("Andrew Ainsley");
  const [email] = useState("andrew.ainsley@yourdomain.com");
  const [phone] = useState("+1 111 467 378 399");
  const [gender, setGender] = useState("Male");
  const [birthdate] = useState("12/25/1995");
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);

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
        <h1 className="flex-1 text-xl font-bold text-center mr-10">My Profile</h1>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 overflow-auto">
        {/* Avatar */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Pencil className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Full Name */}
        <div className="mb-6">
          <label className="text-sm font-medium text-foreground mb-2 block">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-4 bg-muted rounded-xl text-foreground outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
          <div className="w-full px-4 py-4 bg-muted rounded-xl flex items-center gap-3">
            <Mail className="w-5 h-5 text-muted-foreground" />
            <span className="text-foreground">{email}</span>
          </div>
        </div>

        {/* Phone Number */}
        <div className="mb-6">
          <label className="text-sm font-medium text-foreground mb-2 block">Phone Number</label>
          <div className="w-full px-4 py-4 bg-muted rounded-xl flex items-center gap-3">
            <span className="text-lg">🇺🇸</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">{phone}</span>
          </div>
        </div>

        {/* Gender */}
        <div className="mb-6 relative">
          <label className="text-sm font-medium text-foreground mb-2 block">Gender</label>
          <button
            onClick={() => setShowGenderDropdown(!showGenderDropdown)}
            className="w-full px-4 py-4 bg-muted rounded-xl flex items-center justify-between"
          >
            <span className="text-foreground">{gender}</span>
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </button>
          {showGenderDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-10 border border-border">
              {["Male", "Female", "Other"].map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    setGender(g);
                    setShowGenderDropdown(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-muted first:rounded-t-xl last:rounded-b-xl"
                >
                  {g}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Birthdate */}
        <div className="mb-6">
          <label className="text-sm font-medium text-foreground mb-2 block">Birthdate</label>
          <div className="w-full px-4 py-4 bg-muted rounded-xl flex items-center justify-between">
            <span className="text-foreground">{birthdate}</span>
            <Calendar className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}
