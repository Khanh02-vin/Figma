"use client";

import { useState } from "react";
import { ArrowLeft, Mail, Check } from "lucide-react";

interface AddMemberScreenProps {
  onBack: () => void;
}

export function AddMemberScreen({ onBack }: AddMemberScreenProps) {
  const [activeTab, setActiveTab] = useState<"email" | "qr">("email");
  const [email, setEmail] = useState("sarah.wilona@yourdomain.com");
  const [selectedRole, setSelectedRole] = useState<"admin" | "member">("member");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const invitationCode = "F6Z9K4X7";

  const handleSendInvite = () => {
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const recentPeople = [
    { name: "Jenny Wilson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", platform: "whatsapp" },
    { name: "Kristin Watson", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face", platform: "facebook" },
    { name: "Clinton Mcclure", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", platform: "instagram" },
    { name: "Sarah Wilona", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", platform: "whatsapp" },
  ];

  const socialMedia = [
    { name: "WhatsApp", color: "bg-green-500", icon: "wa" },
    { name: "Facebook", color: "bg-blue-600", icon: "fb" },
    { name: "Instagram", color: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500", icon: "ig" },
    { name: "Telegram", color: "bg-blue-400", icon: "tg" },
  ];

  return (
    <div className="flex flex-col h-full bg-muted/30 relative">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 py-2">
        <span className="text-sm font-medium">9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-1 h-3 bg-foreground rounded-sm" style={{ height: `${8 + i * 2}px` }} />
            ))}
          </div>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
          </svg>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <rect x="2" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
            <rect x="20" y="10" width="2" height="4" rx="1" fill="currentColor" />
            <rect x="4" y="9" width="14" height="6" rx="1" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <button onClick={onBack} className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold">Add Member</h1>
        <div className="w-10" />
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex bg-muted rounded-full p-1">
          <button
            onClick={() => setActiveTab("email")}
            className={`flex-1 py-3 rounded-full font-medium transition-colors ${
              activeTab === "email" ? "bg-primary text-primary-foreground" : "text-foreground"
            }`}
          >
            Invite via Email
          </button>
          <button
            onClick={() => setActiveTab("qr")}
            className={`flex-1 py-3 rounded-full font-medium transition-colors ${
              activeTab === "qr" ? "bg-primary text-primary-foreground" : "text-foreground"
            }`}
          >
            Invite via QR Code
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {activeTab === "email" ? (
          <div className="bg-white rounded-2xl p-4">
            <p className="font-medium mb-3">Email</p>
            <div className="flex items-center gap-3 bg-muted rounded-xl px-4 py-3 mb-6">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent outline-none"
                placeholder="Enter email address"
              />
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-muted-foreground text-sm">Select Role</span>
              <div className="flex-1 border-t border-border" />
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setSelectedRole("admin")}
                className="w-full flex items-start gap-3 text-left"
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                  selectedRole === "admin" ? "border-primary" : "border-muted-foreground"
                }`}>
                  {selectedRole === "admin" && <div className="w-3 h-3 rounded-full bg-primary" />}
                </div>
                <div>
                  <p className="font-semibold">Admin</p>
                  <p className="text-sm text-muted-foreground">
                    Manage devices & rooms, manage members, & manage smart scenes
                  </p>
                </div>
              </button>

              <button
                onClick={() => setSelectedRole("member")}
                className="w-full flex items-start gap-3 text-left"
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                  selectedRole === "member" ? "border-primary" : "border-muted-foreground"
                }`}>
                  {selectedRole === "member" && <div className="w-3 h-3 rounded-full bg-primary" />}
                </div>
                <div>
                  <p className="font-semibold">Member</p>
                  <p className="text-sm text-muted-foreground">Use devices, use smart scenes</p>
                </div>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* QR Code */}
            <div className="bg-white rounded-2xl p-6 mb-4">
              <div className="aspect-square bg-white flex items-center justify-center mb-4">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <rect fill="white" width="200" height="200"/>
                  {/* QR Code pattern - simplified representation */}
                  <rect x="20" y="20" width="40" height="40" fill="black"/>
                  <rect x="25" y="25" width="30" height="30" fill="white"/>
                  <rect x="30" y="30" width="20" height="20" fill="black"/>
                  
                  <rect x="140" y="20" width="40" height="40" fill="black"/>
                  <rect x="145" y="25" width="30" height="30" fill="white"/>
                  <rect x="150" y="30" width="20" height="20" fill="black"/>
                  
                  <rect x="20" y="140" width="40" height="40" fill="black"/>
                  <rect x="25" y="145" width="30" height="30" fill="white"/>
                  <rect x="30" y="150" width="20" height="20" fill="black"/>
                  
                  {/* Random QR pattern */}
                  {Array.from({ length: 15 }).map((_, i) => (
                    <g key={i}>
                      <rect x={70 + (i % 5) * 12} y={20 + Math.floor(i / 5) * 12} width="10" height="10" fill="black"/>
                      <rect x={20 + (i % 4) * 12} y={70 + Math.floor(i / 4) * 12} width="10" height="10" fill="black"/>
                      <rect x={70 + (i % 6) * 10} y={70 + Math.floor(i / 6) * 10} width="8" height="8" fill="black"/>
                      <rect x={130 + (i % 3) * 12} y={70 + Math.floor(i / 3) * 12} width="10" height="10" fill="black"/>
                      <rect x={70 + (i % 5) * 12} y={130 + Math.floor(i / 5) * 12} width="10" height="10" fill="black"/>
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            {/* Invitation Code */}
            <div className="bg-white rounded-2xl p-4 mb-4 text-center">
              <p className="text-2xl font-bold tracking-wider">{invitationCode}</p>
              <p className="text-muted-foreground text-sm">Invitation Code</p>
            </div>

            {/* Role Selection */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-muted-foreground text-sm">Select Role</span>
              <div className="flex-1 border-t border-border" />
            </div>

            <div className="space-y-4 mb-4">
              <button
                onClick={() => setSelectedRole("admin")}
                className="w-full flex items-start gap-3 text-left"
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                  selectedRole === "admin" ? "border-primary" : "border-muted-foreground"
                }`}>
                  {selectedRole === "admin" && <div className="w-3 h-3 rounded-full bg-primary" />}
                </div>
                <div>
                  <p className="font-semibold">Admin</p>
                  <p className="text-sm text-muted-foreground">
                    Manage devices & rooms, manage members, & manage smart scenes
                  </p>
                </div>
              </button>

              <button
                onClick={() => setSelectedRole("member")}
                className="w-full flex items-start gap-3 text-left"
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                  selectedRole === "member" ? "border-primary" : "border-muted-foreground"
                }`}>
                  {selectedRole === "member" && <div className="w-3 h-3 rounded-full bg-primary" />}
                </div>
                <div>
                  <p className="font-semibold">Member</p>
                  <p className="text-sm text-muted-foreground">Use devices, use smart scenes</p>
                </div>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Bottom Button */}
      <div className="p-4 pb-8">
        <button
          onClick={activeTab === "email" ? handleSendInvite : () => setShowShareModal(true)}
          className="w-full py-4 rounded-full bg-primary text-primary-foreground font-semibold"
        >
          {activeTab === "email" ? "Send Invite" : "Share Invite"}
        </button>
      </div>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="absolute inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-3xl w-full p-6 text-center animate-slide-up">
            <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-6" />
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <p className="text-lg">An invitation has been sent to</p>
            <p className="text-lg">"{email}"</p>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="absolute inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-3xl w-full p-6 animate-slide-up">
            <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-center mb-6">Share</h2>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-muted-foreground text-sm">Recent people</span>
              <div className="flex-1 border-t border-border" />
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 mb-4">
              {recentPeople.map((person, index) => (
                <button key={index} className="flex flex-col items-center min-w-[72px]">
                  <div className="relative mb-2">
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${
                      person.platform === "whatsapp" ? "bg-green-500" :
                      person.platform === "facebook" ? "bg-blue-600" : "bg-gradient-to-br from-purple-500 to-orange-500"
                    }`}>
                      <span className="text-white text-xs">
                        {person.platform === "whatsapp" ? "W" : person.platform === "facebook" ? "f" : "ig"}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-center">{person.name.split(" ")[0]}</span>
                  <span className="text-xs text-center">{person.name.split(" ")[1]}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-muted-foreground text-sm">Social media</span>
              <div className="flex-1 border-t border-border" />
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4">
              {socialMedia.map((social, index) => (
                <button key={index} className="flex flex-col items-center min-w-[72px]">
                  <div className={`w-14 h-14 rounded-2xl ${social.color} flex items-center justify-center mb-2`}>
                    <span className="text-white text-lg font-bold">
                      {social.icon === "wa" ? "W" : social.icon === "fb" ? "f" : social.icon === "ig" ? "ig" : "T"}
                    </span>
                  </div>
                  <span className="text-xs">{social.name}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowShareModal(false)}
              className="w-full py-3 text-muted-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
