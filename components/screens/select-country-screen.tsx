"use client"

import { useState } from "react"
import { ArrowLeft, Check } from "lucide-react"
import { ProgressBar, FormInput, PrimaryButton } from "@/components/smartify"

interface Country {
  code: string
  name: string
  flag: string
}

const countries: Country[] = [
  { code: "AF", name: "Afghanistan", flag: "🇦🇫" },
  { code: "AL", name: "Albania", flag: "🇦🇱" },
  { code: "DZ", name: "Algeria", flag: "🇩🇿" },
  { code: "AD", name: "Andorra", flag: "🇦🇩" },
  { code: "AO", name: "Angola", flag: "🇦🇴" },
  { code: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "US", name: "United States of America", flag: "🇺🇸" },
]

interface SelectCountryScreenProps {
  onBack: () => void
  onContinue: (country: Country) => void
  onSkip: () => void
}

export function SelectCountryScreen({
  onBack,
  onContinue,
  onSkip,
}: SelectCountryScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
          <ProgressBar currentStep={1} totalSteps={4} className="flex-1 mx-4" />
          <span className="text-sm text-muted-foreground font-medium">1 / 4</span>
        </div>

        <h1 className="text-2xl font-bold text-foreground text-center mb-2">
          Select <span className="text-primary">Country</span> of Origin
        </h1>
        <p className="text-muted-foreground text-center text-sm mb-6">
          {"Let's start by selecting the country where your smart haven resides."}
        </p>

        {/* Search */}
        <FormInput
          type="search"
          placeholder="Search Country..."
          value={searchQuery}
          onChange={setSearchQuery}
          icon="search"
          showClearButton
        />
      </div>

      {/* Country list */}
      <div className="flex-1 px-6 overflow-y-auto">
        <div className="space-y-3 pb-4">
          {filteredCountries.map((country) => (
            <button
              key={country.code}
              onClick={() => setSelectedCountry(country)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                selectedCountry?.code === country.code
                  ? "border-primary bg-primary/5"
                  : "border-transparent bg-input hover:bg-muted"
              }`}
            >
              <span className="text-3xl">{country.flag}</span>
              <span className="flex-1 text-left font-medium text-foreground">
                {country.name}
              </span>
              {selectedCountry?.code === country.code && (
                <Check className="w-5 h-5 text-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-border bg-background">
        <div className="flex gap-4">
          <PrimaryButton variant="secondary" onClick={onSkip} className="flex-1">
            Skip
          </PrimaryButton>
          <PrimaryButton
            onClick={() => selectedCountry && onContinue(selectedCountry)}
            disabled={!selectedCountry}
            className="flex-1"
          >
            Continue
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}
