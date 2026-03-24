"use client"

import { useState } from "react"
import { ArrowLeft, Check, Plus, Sofa, Bed, Bath, ChefHat, GraduationCap, UtensilsCrossed, TreePine } from "lucide-react"
import { ProgressBar, PrimaryButton } from "@/components/smartify"

interface Room {
  id: string
  name: string
  icon: React.ReactNode
}

const defaultRooms: Room[] = [
  { id: "living", name: "Living Room", icon: <Sofa className="w-8 h-8" /> },
  { id: "bedroom", name: "Bedroom", icon: <Bed className="w-8 h-8" /> },
  { id: "bathroom", name: "Bathroom", icon: <Bath className="w-8 h-8" /> },
  { id: "kitchen", name: "Kitchen", icon: <ChefHat className="w-8 h-8" /> },
  { id: "study", name: "Study Room", icon: <GraduationCap className="w-8 h-8" /> },
  { id: "dining", name: "Dining Room", icon: <UtensilsCrossed className="w-8 h-8" /> },
  { id: "backyard", name: "Backyard", icon: <TreePine className="w-8 h-8" /> },
]

interface AddRoomsScreenProps {
  onBack: () => void
  onContinue: (rooms: string[]) => void
  onSkip: () => void
}

export function AddRoomsScreen({
  onBack,
  onContinue,
  onSkip,
}: AddRoomsScreenProps) {
  const [selectedRooms, setSelectedRooms] = useState<string[]>([
    "living",
    "bedroom",
    "bathroom",
    "kitchen",
    "dining",
    "backyard",
  ])

  const toggleRoom = (roomId: string) => {
    setSelectedRooms((prev) =>
      prev.includes(roomId)
        ? prev.filter((id) => id !== roomId)
        : [...prev, roomId]
    )
  }

  return (
    <div className="mobile-container flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="p-2 -ml-2 text-foreground hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <ProgressBar currentStep={3} totalSteps={4} className="flex-1 mx-4" />
          <span className="text-sm text-muted-foreground font-medium">3 / 4</span>
        </div>

        <h1 className="text-2xl font-bold text-foreground text-center mb-2">
          Add <span className="text-primary">Rooms</span>
        </h1>
        <p className="text-muted-foreground text-center text-sm">
          {"Select the rooms in your house. Don't worry, you can always add more later."}
        </p>
      </div>

      {/* Room grid */}
      <div className="flex-1 px-6 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4 pb-4">
          {defaultRooms.map((room) => {
            const isSelected = selectedRooms.includes(room.id)
            return (
              <button
                key={room.id}
                onClick={() => toggleRoom(room.id)}
                className={`relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-transparent bg-input hover:bg-muted"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="text-primary">{room.icon}</div>
                <span className="text-sm font-medium text-foreground">
                  {room.name}
                </span>
              </button>
            )
          })}
          
          {/* Add Room button */}
          <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-dashed border-primary/30 hover:border-primary/50 transition-all">
            <div className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center">
              <Plus className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">Add Room</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-border bg-background">
        <div className="flex gap-4">
          <PrimaryButton variant="secondary" onClick={onSkip} className="flex-1">
            Skip
          </PrimaryButton>
          <PrimaryButton
            onClick={() => onContinue(selectedRooms)}
            className="flex-1"
          >
            Continue
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}
