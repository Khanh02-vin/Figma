"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, MoreVertical, Send } from "lucide-react";

interface ChatScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string) => void;
}

interface Message {
  id: string;
  role: "user" | "bobo";
  text: string;
  time: string;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "user",
    text: "Hi Bobo!",
    time: "09:41",
  },
  {
    id: "2",
    role: "bobo",
    text: "Hello there! 👋 How can I assist you today?",
    time: "09:41",
  },
];

const boboResponses: Record<string, string> = {
  "hi bobo!": "Hello there! 👋 How can I assist you today?",
  "i just set up my smartify account. what cool things can i do with it?":
    "Awesome! 🎉 With Smartify, you can control devices, set up automation, manage energy, and more! What are you interested in exploring first?",
  "tell me about automation. how can i set it up?":
    "Great question! 🤖 Automation lets you create rules like 'Turn off lights at 10 PM' or 'Lock doors when I leave'. Head to the Smart tab to create your first scene! 🏠",
};

function BoboAvatar() {
  return (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
      <svg viewBox="0 0 40 40" className="w-full h-full">
        {/* Robot head */}
        <rect x="8" y="10" width="24" height="20" rx="6" fill="white" />
        {/* Eyes */}
        <ellipse cx="15" cy="19" rx="3.5" ry="4" fill="#3B82F6" />
        <ellipse cx="25" cy="19" rx="3.5" ry="4" fill="#3B82F6" />
        <circle cx="15" cy="19" r="2" fill="white" />
        <circle cx="25" cy="19" r="2" fill="white" />
        {/* Mouth */}
        <rect x="16" y="25" width="8" height="2" rx="1" fill="#3B82F6" />
        {/* Ears / Headphones */}
        <rect x="4" y="14" width="5" height="12" rx="2" fill="#3B82F6" />
        <rect x="31" y="14" width="5" height="12" rx="2" fill="#3B82F6" />
      </svg>
    </div>
  );
}

export function ChatScreen({ onBack }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: trimmed,
      time: "09:41",
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const key = trimmed.toLowerCase();
      const replyText = boboResponses[key] ?? `That's interesting! You said: "${trimmed}". What else can I help you with?`;
      const boboMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bobo",
        text: replyText,
        time: "09:41",
      };
      setMessages((prev) => [...prev, boboMsg]);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <button onClick={onBack} className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Chat with Bobo</h1>
        <button className="p-2 -mr-2">
          <MoreVertical className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.role === "bobo" && (
              <div className="flex items-end gap-2 mb-1">
                <BoboAvatar />
                <span className="text-xs text-muted-foreground ml-1">Bobo</span>
              </div>
            )}
            <div
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-white rounded-br-md"
                    : "bg-muted/50 text-foreground rounded-bl-md"
                }`}
              >
                {msg.text}
                <div
                  className={`text-xs mt-1 ${
                    msg.role === "user" ? "text-white/70 text-right" : "text-muted-foreground"
                  }`}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-end gap-2">
            <BoboAvatar />
            <div className="bg-muted/50 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask me anything ..."
            className="flex-1 h-12 px-4 rounded-full bg-muted/30 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center disabled:opacity-40 hover:bg-primary/90 transition-colors flex-shrink-0"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
