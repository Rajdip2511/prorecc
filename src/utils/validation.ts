/**
 * Validate environment variables
 */
export function validateEnvironment(): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  try {
    const apiKey =
      import.meta.env?.VITE_GEMINI_API_KEY || (typeof process !== "undefined" && process.env?.VITE_GEMINI_API_KEY)

    if (!apiKey) {
      errors.push("VITE_GEMINI_API_KEY is required")
    }
  } catch (error) {
    errors.push("Unable to access environment variables")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Validate user input
 */
export function validateUserQuery(query: string): { isValid: boolean; error?: string } {
  const trimmed = query.trim()

  if (!trimmed) {
    return { isValid: false, error: "Please enter your preferences" }
  }

  if (trimmed.length < 3) {
    return { isValid: false, error: "Please enter at least 3 characters" }
  }

  if (trimmed.length > 500) {
    return { isValid: false, error: "Please keep your query under 500 characters" }
  }

  return { isValid: true }
}
