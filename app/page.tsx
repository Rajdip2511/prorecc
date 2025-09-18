"use client"

import { useState, useEffect } from "react"
import { SearchForm } from "../src/components/SearchForm"
import { ProductGrid } from "../src/components/ProductGrid"
import { Footer } from "../src/components/Footer"
import { ErrorBoundary } from "../src/components/ErrorBoundary"
import { EnvironmentCheck } from "../src/components/EnvironmentCheck"
import { NetworkStatus } from "../src/components/NetworkStatus"
import { products } from "../src/data/products"
import type { Product } from "../src/types/Product"

export default function Page() {
  const [recommendations, setRecommendations] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showingRecommendations, setShowingRecommendations] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const featuredProducts = [
      products.find((p) => p.id === "1"), // iPhone 15
      products.find((p) => p.id === "5"), // MacBook Air M3
      products.find((p) => p.id === "11"), // Sony WH-1000XM5
      products.find((p) => p.id === "16"), // Nintendo Switch OLED
      products.find((p) => p.id === "9"), // iPad Pro
      products.find((p) => p.id === "14"), // Apple Watch Series 9
    ].filter(Boolean) as Product[]

    setRecommendations(featuredProducts)
  }, [])

  const handleRecommendations = (products: Product[]) => {
    setRecommendations(products)
    setShowingRecommendations(true)
    setSelectedCategory(null)
  }

  const handleLoading = (loading: boolean) => {
    setIsLoading(loading)
  }

  const handleError = (error: string | null) => {
    setError(error)
  }

  const handleCategorySelect = (category: string) => {
    const categoryProducts = products.filter((p) => p.category === category)
    setRecommendations(categoryProducts)
    setSelectedCategory(category)
    setShowingRecommendations(false)
    setError(null)
  }

  const showFeaturedProducts = () => {
    const featuredProducts = [
      products.find((p) => p.id === "1"),
      products.find((p) => p.id === "5"),
      products.find((p) => p.id === "11"),
      products.find((p) => p.id === "16"),
      products.find((p) => p.id === "9"),
      products.find((p) => p.id === "14"),
    ].filter(Boolean) as Product[]

    setRecommendations(featuredProducts)
    setShowingRecommendations(false)
    setSelectedCategory(null)
    setError(null)
  }

  return (
    <ErrorBoundary>
      <EnvironmentCheck>
        <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card opacity-50" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(190,18,60,0.1),transparent_50%)]" />

          <NetworkStatus />

          <main className="flex-1 relative z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              <header className="text-center mb-8 sm:mb-12">
                <div className="relative inline-block">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4 relative">
                    <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
                      ProRecc
                    </span>
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent to-primary rounded-lg blur opacity-20 animate-pulse" />
                  </h1>
                </div>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
                  Harness the power of AI to discover products that match your desires.
                  <span className="text-accent font-semibold"> Precision. Power. Perfection.</span>
                </p>
              </header>

              <div className="mb-12 sm:mb-16">
                <div className="text-center mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      AI-Powered Product Discovery
                    </span>
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto px-4">
                    Describe what you're looking for and let our AI find the perfect products for you.
                  </p>
                </div>

                <SearchForm onRecommendations={handleRecommendations} onLoading={handleLoading} onError={handleError} />
              </div>

              <div className="mb-12 sm:mb-16">
                <div className="text-center mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                    <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                      {showingRecommendations
                        ? "AI Recommendations"
                        : selectedCategory
                          ? `${selectedCategory} Products`
                          : "Featured Products"}
                    </span>
                  </h2>
                  {(showingRecommendations || selectedCategory) && (
                    <button
                      onClick={showFeaturedProducts}
                      className="px-4 sm:px-6 py-2 bg-card border border-border rounded-lg text-foreground hover:bg-accent/10 hover:border-accent transition-all duration-300 font-medium mt-4 text-sm sm:text-base"
                    >
                      {selectedCategory ? "Back to Featured" : "View Featured Products"}
                    </button>
                  )}
                </div>

                {!showingRecommendations && !selectedCategory && (
                  <p className="text-muted-foreground mb-6 sm:mb-8 text-center max-w-2xl mx-auto px-4">
                    Discover our handpicked selection of premium products across smartphones, laptops, gaming, and more.
                  </p>
                )}

                {selectedCategory && (
                  <p className="text-muted-foreground mb-6 sm:mb-8 text-center max-w-2xl mx-auto px-4">
                    Explore our complete collection of {selectedCategory.toLowerCase()} with the latest technology and
                    best prices.
                  </p>
                )}
              </div>

              <ProductGrid products={recommendations} isLoading={isLoading} error={error} />

              {!showingRecommendations && !selectedCategory && !isLoading && (
                <div className="mt-12 sm:mt-16">
                  <h3 className="text-xl sm:text-2xl font-bold text-center text-foreground mb-6 sm:mb-8">
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Shop by Category
                    </span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                    {["Smartphones", "Laptops", "Gaming", "Headphones", "Guns"].map((category) => (
                      <div
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                        className="group p-4 sm:p-6 bg-card border border-border rounded-lg hover:border-accent transition-all duration-300 cursor-pointer hover:bg-accent/5"
                      >
                        <div className="text-center">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-background rounded opacity-80" />
                          </div>
                          <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors text-sm sm:text-base">
                            {category}
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                            {products.filter((p) => p.category === category).length} products
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </main>

          <Footer />
        </div>
      </EnvironmentCheck>
    </ErrorBoundary>
  )
}
