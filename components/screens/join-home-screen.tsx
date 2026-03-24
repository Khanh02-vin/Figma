"use client";

import { useState } from "react";
import { ArrowLeft, X, MoreVertical, Home, Image, User } from "lucide-react";

interface JoinHomeScreenProps {
  onBack: () => void;
  onJoin?: () => void;
}

export function JoinHomeScreen({ onBack, onJoin }: JoinHomeScreenProps) {
  const [mode, setMode] = useState<"qr" | "code">("qr");
  const [invitationCode, setInvitationCode] = useState("G2V5B0X9");

  return (
    <div className="flex flex-col h-full relative">
      {mode === "qr" ? (
        // QR Scanner Mode
        <div 
          className="flex flex-col h-full"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=800&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Status Bar */}
          <div className="relative z-10 flex justify-between items-center px-6 py-2 text-white">
            <span className="text-sm font-medium">9:41</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-1 h-3 bg-white rounded-sm" style={{ height: `${8 + i * 2}px` }} />
                ))}
              </div>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white">
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
              </svg>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="white">
                <rect x="2" y="7" width="18" height="10" rx="2" stroke="white" strokeWidth="2" fill="none" />
                <rect x="20" y="10" width="2" height="4" rx="1" fill="white" />
                <rect x="4" y="9" width="14" height="6" rx="1" fill="white" />
              </svg>
            </div>
          </div>

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between px-4 py-4">
            <button onClick={onBack} className="p-2 -ml-2 text-white">
              <X className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-white">Join a Home</h1>
            <button className="p-2 -mr-2 text-white">
              <MoreVertical className="w-6 h-6" />
            </button>
          </div>

          {/* QR Scanner Frame */}
          <div className="relative z-10 flex-1 flex items-center justify-center px-8">
            <div className="relative w-full aspect-square max-w-xs">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-white rounded-tl-3xl" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-white rounded-tr-3xl" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-white rounded-bl-3xl" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-white rounded-br-3xl" />

              {/* QR Code in center */}
              <div className="absolute inset-4 bg-white rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full h-full p-4">
                  <rect fill="white" width="200" height="200"/>
                  <rect x="20" y="20" width="40" height="40" fill="black"/>
                  <rect x="25" y="25" width="30" height="30" fill="white"/>
                  <rect x="30" y="30" width="20" height="20" fill="black"/>
                  
                  <rect x="140" y="20" width="40" height="40" fill="black"/>
                  <rect x="145" y="25" width="30" height="30" fill="white"/>
                  <rect x="150" y="30" width="20" height="20" fill="black"/>
                  
                  <rect x="20" y="140" width="40" height="40" fill="black"/>
                  <rect x="25" y="145" width="30" height="30" fill="white"/>
                  <rect x="30" y="150" width="20" height="20" fill="black"/>
                  
                  {Array.from({ length: 20 }).map((_, i) => (
                    <rect 
                      key={i}
                      x={70 + (i % 6) * 15} 
                      y={20 + Math.floor(i / 6) * 15} 
                      width="12" 
                      height="12" 
                      fill={Math.random() > 0.5 ? "black" : "white"}
                    />
                  ))}
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="relative z-10 p-6 text-center text-white">
            <p className="text-white/80 mb-4">{"Can't scan the QR code?"}</p>
            <button
              onClick={() => setMode("code")}
              className="w-full py-4 rounded-full bg-white/20 backdrop-blur text-white font-medium"
            >
              Enter the Invitation Code
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="relative z-10 flex items-center justify-around py-6 px-8">
            <button className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <Image className="w-6 h-6 text-white" />
            </button>
            <div className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/30" />
            </div>
            <button className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      ) : (
        // Code Input Mode
        <div className="flex flex-col h-full bg-muted/30">
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
            <button onClick={() => setMode("qr")} className="p-2 -ml-2">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">Join a Home</h1>
            <button className="p-2 -mr-2">
              <MoreVertical className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 px-4 pb-4">
            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <Home className="w-10 h-10 text-primary" />
              </div>
              
              <h2 className="text-xl font-semibold mb-2">Enter the Invitation Code</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Please contact the home Administrator to get the invitation code.
              </p>

              <input
                type="text"
                value={invitationCode}
                onChange={(e) => setInvitationCode(e.target.value.toUpperCase())}
                className="w-full bg-muted rounded-xl px-4 py-4 text-center text-xl font-bold tracking-widest outline-none"
                placeholder="XXXXXXXX"
                maxLength={8}
              />
            </div>
          </div>

          {/* Join Button */}
          <div className="p-4">
            <button
              onClick={onJoin}
              className="w-full py-4 rounded-full bg-primary text-primary-foreground font-semibold"
            >
              Join
            </button>
          </div>

          {/* Mock Keyboard */}
          <div className="bg-muted p-2">
            <div className="grid grid-cols-10 gap-1 mb-1">
              {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
                <button key={key} className="bg-white rounded-lg py-3 text-sm font-medium shadow-sm">
                  {key}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-9 gap-1 mb-1 px-4">
              {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => (
                <button key={key} className="bg-white rounded-lg py-3 text-sm font-medium shadow-sm">
                  {key}
                </button>
              ))}
            </div>
            <div className="flex gap-1">
              <button className="bg-muted-foreground/20 rounded-lg py-3 px-4 text-sm font-medium">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"/>
                </svg>
              </button>
              <div className="flex-1 grid grid-cols-7 gap-1">
                {["Z", "X", "C", "V", "B", "N", "M"].map((key) => (
                  <button key={key} className="bg-white rounded-lg py-3 text-sm font-medium shadow-sm">
                    {key}
                  </button>
                ))}
              </div>
              <button className="bg-muted-foreground/20 rounded-lg py-3 px-4 text-sm font-medium">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z"/>
                </svg>
              </button>
            </div>
            <div className="flex gap-1 mt-1">
              <button className="bg-muted-foreground/20 rounded-lg py-3 px-6 text-sm font-medium">123</button>
              <button className="flex-1 bg-white rounded-lg py-3 text-sm font-medium shadow-sm">space</button>
              <button className="bg-primary rounded-lg py-3 px-6 text-sm font-medium text-white">Go</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
