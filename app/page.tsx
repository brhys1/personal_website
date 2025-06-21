'use client'

import Link from 'next/link'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 text-center">
        Rhys Burman
      </h1>
      <p className="text-xl md:text-2xl text-white/90 mb-12 text-center max-w-2xl">
        Data Scientist & Sustainability Expert
      </p>
      <nav className="flex gap-6">
        <Link 
          href="/portfolio-3d" 
          className="px-6 py-3 bg-white/90 rounded-full shadow-lg text-blue-600 font-semibold hover:bg-white transition-colors"
        >
          View 3D Portfolio
        </Link>
        {/* Add more navigation links here as needed */}
      </nav>
    </div>
  )
}
