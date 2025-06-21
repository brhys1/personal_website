"use client"

import dynamic from "next/dynamic"

// Dynamically import the Portfolio component with no SSR
const Portfolio = dynamic(() => import("@/components/portfolio-3d"), {
  ssr: false, // This is important because Three.js needs the window object
})

export default function PortfolioPage() {
  return <Portfolio />
}
