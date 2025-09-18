"use client"

import type React from "react"

interface EnvironmentCheckProps {
  children: React.ReactNode
}

export function EnvironmentCheck({ children }: EnvironmentCheckProps) {
  return <>{children}</>
}
