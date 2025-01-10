'use client'

import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  const [countdown, setCountdown] = useState({ hours: 23, minutes: 4, seconds: 47 })

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div className="max-w-2xl mb-8 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
            BOOK <span className="inline-block bg-[#7B61FF] p-2 rounded-lg mx-2"><span className="text-[#CCFF00]">AND</span></span> EXPLORE
            <br />
            UPCOMING <ArrowRight className="inline h-8 w-8 md:h-12 md:w-12 text-[#CCFF00]" /> EVENTS
          </h1>
          <p className="text-gray-400 mb-8">
            Welcome to EventX, the ultimate destination for discovering and booking upcoming events.
          </p>
          <div className="flex gap-4 md:gap-8 mb-8">
            <div>
              <div className="text-2xl md:text-4xl font-bold">{countdown.hours}</div>
              <div className="text-sm md:text-base text-gray-400">HOURS</div>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-bold">{countdown.minutes}</div>
              <div className="text-sm md:text-base text-gray-400">MINUTES</div>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-bold">{countdown.seconds}</div>
              <div className="text-sm md:text-base text-gray-400">SECONDS</div>
            </div>
          </div>
          <button className="bg-[#CCFF00] text-black px-6 md:px-8 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-opacity-90 transition-colors">
            Book Your Seat for EventX
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
        <div className="qr-code w-full md:w-auto">
          {/* Add QR code image here */}
        </div>
      </div>
    </div>
  )
}

export default Hero;
