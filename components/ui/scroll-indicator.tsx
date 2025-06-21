"use client"

import { useState, useEffect } from "react"

export function ScrollIndicator({ progress }: { progress: number }) {
    return (
      <div className="fixed right-6 top-1/2 -translate-y-1/2 h-48 w-3 bg-white/30 rounded-full backdrop-blur-sm z-50 md:hidden">
        <div 
          className="w-full bg-blue-600 rounded-full transition-all duration-150"
          style={{ 
            height: `${progress * 100}%`,
            opacity: 0.9
          }} 
        />
      </div>
    )
  }
