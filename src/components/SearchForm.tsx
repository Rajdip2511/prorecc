"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import type { Product } from "../types/Product"
import { products } from "../data/products"
import { getRecommendations } from "../services/geminiApi"
import { validateUserQuery } from "../utils/validation"

interface SearchFormProps {
  onRecommendations: (products: Product[]) => void
  onLoading: (loading: boolean) => void
  onError: (error: string | null) => void
}

export function SearchForm({ onRecommendations, onLoading, onError }: SearchFormProps) {
  const [query, setQuery] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Clear previous error
    onError(null)

    // Validate input
    const validation = validateUserQuery(query)
    if (!validation.isValid) {
      onError(validation.error || "Please enter valid preferences.")
      return
    }

    setIsSubmitting(true)
    onLoading(true)

    try {
      const recommendations = await getRecommendations(query.trim(), products)
      onRecommendations(recommendations)

      // Clear error on success
      onError(null)
    } catch (error) {
      console.error("Error getting recommendations:", error)
      onError(error instanceof Error ? error.message : "Failed to get recommendations. Please try again.")
      // Don't clear recommendations on error, keep previous results
    } finally {
      setIsSubmitting(false)
      onLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mb-12">
      <div className="sharingan-border rounded-xl p-6 bg-card/50 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Describe your perfect product... (e.g., 'Gaming laptop under $1500' or 'Wireless headphones for workouts')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="text-base h-14 bg-input/80 border-border/50 focus:border-accent focus:ring-accent/50 placeholder:text-muted-foreground/70 transition-all duration-300"
              disabled={isSubmitting}
              maxLength={500}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting || !query.trim()}
            className="h-14 px-8 flame-gradient hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 font-semibold"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Analyzing...
              </>
            ) : (
              <>
                <span className="mr-2 text-lg">⚡</span>
                Discover
              </>
            )}
          </Button>
        </form>

        <div className="mt-3 flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            <span className="text-accent">●</span> Powered by Advanced AI
          </div>
          <span
            className={`text-xs transition-colors duration-200 ${
              query.length > 450 ? "text-destructive pulse-red" : "text-muted-foreground"
            }`}
          >
            {query.length}/500
          </span>
        </div>
      </div>
    </div>
  )
}
