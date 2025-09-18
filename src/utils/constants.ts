export const API_CONFIG = {
  GEMINI_ENDPOINT: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
  MAX_RETRIES: 3,
  TIMEOUT_MS: 30000,
  MAX_RECOMMENDATIONS: 8,
  MIN_RECOMMENDATIONS: 3,
} as const

export const ERROR_MESSAGES = {
  NO_API_KEY: "Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.",
  INVALID_API_KEY: "Invalid API key. Please check your VITE_GEMINI_API_KEY.",
  RATE_LIMITED: "Rate limit exceeded. Please try again in a moment.",
  NO_INPUT: "Please enter your preferences to get recommendations.",
  NO_RESULTS: "No matching products found for your preferences. Please try a different search.",
  NETWORK_ERROR: "Failed to connect to recommendation service. Please check your internet connection.",
  GENERIC_ERROR: "Something went wrong. Please try again.",
} as const
