import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import exp from 'constants'

export function SpeakersSection() {
  const speakers = [
    {
      name: "ESTHER HOWARD",
      role: "UX/UI Designer",
      image: "/placeholder.svg"
    },
    {
      name: "CODY FISHER",
      role: "Brand Designer",
      image: "/placeholder.svg"
    },
    {
      name: "DIANNIE RUSSELL",
      role: "Graphic Designer",
      image: "/placeholder.svg"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12">OUR SPEAKERS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {speakers.map((speaker, index) => (
          <div key={index} className="bg-[#1A1B35] rounded-2xl p-4 md:p-6">
            <div className="mb-4 rounded-xl overflow-hidden">
              <Image
                src={speaker.image}
                alt={speaker.name}
                width={300}
                height={300}
                className="w-full h-[200px] md:h-[300px] object-cover"
              />
            </div>
            <h3 className="text-lg md:text-xl font-bold">{speaker.name}</h3>
            <p className="text-gray-400">{speaker.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
export default SpeakersSection;