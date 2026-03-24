"use client";

import { useState } from "react";
import { ArrowLeft, Search, ChevronUp, ChevronDown, Wifi } from "lucide-react";

interface FAQScreenProps {
  onBack: () => void;
}

const categories = ["General", "Account", "Services", "Home"];

const faqs = [
  {
    id: 1,
    question: "What is Smartify?",
    answer: "Smartify is a user-friendly smart home application that enables seamless control and automation of connected devices, enhancing your living experience through innovative technology.",
    category: "General",
  },
  {
    id: 2,
    question: "How do I add a new device?",
    answer: "To add a new device, go to the Home screen and tap the '+' button. Follow the on-screen instructions to scan for nearby devices or enter a manual code.",
    category: "General",
  },
  {
    id: 3,
    question: "How do I create an automation?",
    answer: "Navigate to the Smart Scenes section and tap 'Create Scene'. You can set triggers based on time, location, or device states, and define the actions you want to automate.",
    category: "General",
  },
  {
    id: 4,
    question: "What's the 'Tap-to-Run' feature?",
    answer: "Tap-to-Run allows you to create quick actions that can be triggered with a single tap. It's perfect for frequently used device combinations or scene activations.",
    category: "General",
  },
  {
    id: 5,
    question: "Can I use Smartify offline?",
    answer: "Some basic device controls work offline through local connections, but most features require an internet connection for full functionality.",
    category: "General",
  },
  {
    id: 6,
    question: "How can I reset my password?",
    answer: "Go to Settings > Account & Security > Change Password to reset your password. You'll receive a verification code via email.",
    category: "Account",
  },
];

export function FAQScreen({ onBack }: FAQScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.category === selectedCategory &&
      (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
        <h1 className="flex-1 text-xl font-bold text-center mr-10">FAQ</h1>
      </div>

      {/* Search */}
      <div className="px-4 mb-4">
        <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-4">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-white text-foreground border border-border"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <div className="flex-1 px-4 overflow-auto space-y-3">
        {filteredFaqs.map((faq) => (
          <div key={faq.id} className="bg-white rounded-2xl overflow-hidden">
            <button
              onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
              className="w-full flex items-center justify-between p-5"
            >
              <span className="font-semibold text-foreground text-left">{faq.question}</span>
              {expandedId === faq.id ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0 ml-2" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0 ml-2" />
              )}
            </button>
            {expandedId === faq.id && (
              <>
                <div className="border-t border-border mx-5" />
                <p className="px-5 pb-5 pt-4 text-muted-foreground leading-relaxed">{faq.answer}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
