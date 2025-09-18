"use client"

import { useState, useCallback } from "react"

interface ErrorState {
  error: string | null
  isError: boolean
}

export function useErrorHandler() {
  const [errorState, setErrorState] = useState<ErrorState>({
    error: null,
    isError: false,
  })

  const setError = useCallback((error: string | null) => {
    setErrorState({
      error,
      isError: error !== null,
    })
  }, [])

  const clearError = useCallback(() => {
    setErrorState({
      error: null,
      isError: false,
    })
  }, [])

  const handleError = useCallback(
    (error: unknown) => {
      console.error("Error occurred:", error)

      if (error instanceof Error) {
        setError(error.message)
      } else if (typeof error === "string") {
        setError(error)
      } else {
        setError("An unexpected error occurred")
      }
    },
    [setError],
  )

  return {
    error: errorState.error,
    isError: errorState.isError,
    setError,
    clearError,
    handleError,
  }
}
