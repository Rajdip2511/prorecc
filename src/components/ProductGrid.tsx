import type { Product } from "../types/Product"
import { ProductCard } from "./ProductCard"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"

interface ProductGridProps {
  products: Product[]
  isLoading: boolean
  error: string | null
}

export function ProductGrid({ products, isLoading, error }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent/30 border-t-accent mb-6" />
          <div className="absolute inset-0 animate-ping rounded-full h-12 w-12 border-2 border-accent/20" />
        </div>
        <p className="text-muted-foreground text-lg">Analyzing your preferences...</p>
        <p className="text-accent text-sm mt-2">Finding the perfect match</p>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto sharingan-border bg-destructive/10">
        <span className="text-2xl">⚠️</span>
        <AlertTitle className="text-lg">System Error</AlertTitle>
        <AlertDescription className="text-base">{error}</AlertDescription>
      </Alert>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="relative inline-block mb-6">
          <span className="text-8xl text-accent/60 block animate-pulse">⚡</span>
          <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-3">Awaiting Your Command</h3>
        <p className="text-muted-foreground max-w-md mx-auto text-lg leading-relaxed">
          Enter your desires above and witness the power of AI-driven recommendations.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 sm:mb-8 p-3 sm:p-4 rounded-lg bg-card/30 backdrop-blur-sm border border-border/50">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          <span className="text-accent">●</span> Curated Selection
        </h2>
        <div className="text-right">
          <span className="text-xs sm:text-sm text-muted-foreground block">
            {products.length} product{products.length !== 1 ? "s" : ""} discovered
          </span>
          <span className="text-xs text-accent">Precision matched</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}
