import type { Product } from "../types/Product"

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string
      }>
    }
  }>
}

interface GeminiRequest {
  contents: Array<{
    parts: Array<{
      text: string
    }>
  }>
  generationConfig: {
    temperature: number
    topK: number
    topP: number
    maxOutputTokens: number
  }
}

/**
 * Get product recommendations from Gemini API based on user query
 */
export async function getRecommendations(userQuery: string, availableProducts: Product[]): Promise<Product[]> {
  const apiKey = "AIzaSyBO9LzNfMvvxx6xok2aqJA3vPnE8XGfdzM"

  if (!apiKey) {
    throw new Error("Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.")
  }

  // Create the prompt for Gemini
  const prompt = createRecommendationPrompt(userQuery, availableProducts)

  const requestBody: GeminiRequest = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.3,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048,
    },
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      },
    )

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid API key. Please check your VITE_GEMINI_API_KEY.")
      } else if (response.status === 403) {
        throw new Error("API access denied. Please verify your Gemini API key permissions.")
      } else if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again in a moment.")
      } else {
        throw new Error(`API request failed with status ${response.status}`)
      }
    }

    const data: GeminiResponse = await response.json()

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("No recommendations received from AI.")
    }

    const aiResponse = data.candidates[0].content.parts[0].text
    return parseRecommendations(aiResponse, availableProducts)
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Failed to connect to recommendation service.")
  }
}

/**
 * Create a structured prompt for the Gemini API
 */
function createRecommendationPrompt(userQuery: string, products: Product[]): string {
  const productList = products
    .map(
      (p) => `ID: ${p.id}, Name: ${p.name}, Price: $${p.price}, Category: ${p.category}, Description: ${p.description}`,
    )
    .join("\n")

  return `You are a product recommendation expert for an e-commerce store. Based on the user's preferences, recommend the most suitable products from the available inventory ONLY.

User Query: "${userQuery}"

Available Products in Inventory:
${productList}

Instructions:
1. Analyze the user's preferences carefully (budget, category, features, etc.)
2. ONLY recommend products that are actually available in the inventory above
3. If the user asks for products that don't exist in our inventory, respond with exactly: "NO_PRODUCTS_AVAILABLE"
4. If you find suitable matches, select 3-8 most relevant products that best match their needs
5. Consider price range, category preferences, and specific features mentioned
6. Prioritize products that offer the best value for their stated requirements

Response Format:
- If suitable products found: Return ONLY a JSON array of product IDs (as strings) in order of relevance. Example: ["1", "5", "12"]
- If no suitable products found: Return exactly "NO_PRODUCTS_AVAILABLE"

Do not include any explanation or additional text - just the JSON array or the NO_PRODUCTS_AVAILABLE message.`
}

/**
 * Parse the AI response and return matching products
 */
function parseRecommendations(aiResponse: string, availableProducts: Product[]): Product[] {
  try {
    // Clean the response to extract content
    const cleanResponse = aiResponse.trim()

    if (cleanResponse.includes("NO_PRODUCTS_AVAILABLE")) {
      throw new Error(
        "Sorry, we don't have that product yet. Please try searching for something else from our available categories: Smartphones, Laptops, Gaming, or Headphones.",
      )
    }

    let productIds: string[]

    // Try to parse as JSON
    try {
      productIds = JSON.parse(cleanResponse)
    } catch {
      // If JSON parsing fails, try to extract IDs from the text
      const idMatches = cleanResponse.match(/["'](\d+)["']/g)
      if (idMatches) {
        productIds = idMatches.map((match) => match.replace(/["']/g, ""))
      } else {
        throw new Error(
          "Sorry, we don't have that product yet. Please try searching for something else from our available categories: Smartphones, Laptops, Gaming, or Headphones.",
        )
      }
    }

    if (!Array.isArray(productIds)) {
      throw new Error(
        "Sorry, we don't have that product yet. Please try searching for something else from our available categories: Smartphones, Laptops, Gaming, or Headphones.",
      )
    }

    // Filter and return matching products
    const recommendations = productIds
      .map((id) => availableProducts.find((p) => p.id === id))
      .filter((product): product is Product => product !== undefined)

    if (recommendations.length === 0) {
      throw new Error(
        "Sorry, we don't have that product yet. Please try searching for something else from our available categories: Smartphones, Laptops, Gaming, or Headphones.",
      )
    }

    return recommendations
  } catch (error) {
    console.error("Error parsing recommendations:", error)

    if (error instanceof Error) {
      throw error
    }
    throw new Error(
      "Sorry, we don't have that product yet. Please try searching for something else from our available categories: Smartphones, Laptops, Gaming, or Headphones.",
    )
  }
}
