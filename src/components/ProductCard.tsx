import type { Product } from "../types/Product"
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card className="h-full flex flex-col uchiha-glow sharingan-border bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-all duration-500 group overflow-hidden">
      <div className="aspect-[4/3] sm:aspect-[3/2] overflow-hidden rounded-t-lg relative">
        <img
          src={product.image || "/placeholder.svg?height=200&width=300&query=futuristic product"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardHeader className="flex-1 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <CardTitle className="text-lg sm:text-xl leading-tight font-bold text-foreground group-hover:text-accent transition-colors duration-300 line-clamp-2">
            {product.name}
          </CardTitle>
          <Badge
            variant="secondary"
            className="shrink-0 bg-accent/20 text-accent border-accent/30 font-semibold text-xs"
          >
            {product.category}
          </Badge>
        </div>

        <div className="text-2xl sm:text-3xl font-bold mb-3">
          <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            {formatPrice(product.price)}
          </span>
        </div>

        <CardDescription className="text-xs sm:text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 line-clamp-3">
          {product.description}
        </CardDescription>

        <div className="mt-3 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </CardHeader>
    </Card>
  )
}
