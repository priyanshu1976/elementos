import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export function DiscoverSection() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12">DISCOVER UPCOMING EVENTS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#1A1B35] rounded-2xl p-6 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold mb-4">EXPLORE THE LOCATION</h3>
          <p className="text-gray-400 mb-6">
            Our platform is designed to make it easy for you to find and book events that match your interests and preferences.
            Browse through our extensive collection of events, and filter results by date, location, category, and more.
          </p>
          <button className="bg-[#CCFF00] text-black px-6 md:px-8 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-opacity-90 transition-colors">
            EXPLORE THE LOCATION
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
        <div className="rounded-2xl overflow-hidden">
          <Image
            src="/placeholder.svg"
            alt="Event venue"
            width={600}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default DiscoverSection;