import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export function DiscoverSection() {
  const events = [
    {
      title: "Pre-Event Activities: Flashmob and Logo Reveal",
      description:
        "A flashmob to create excitement and a logo reveal to officially announce the event.",
      date: "January 30",
      eventName: "preEvent",
    },
    {
      title: "Opening Ceremony",
      description:
        "Includes a lighting ceremony by President Hemdutt Joshi Sir, welcome speech, and a guest speaker session.",
      date: "January 31",
      eventName: "openingCeremony",
    },
    {
      title: "UI/UX Event",
      description: "An online event focusing on UI/UX design.",
      date: "January 31",
      eventName: "uiux",
    },
    {
      title: "Prompt vs Prompt",
      description:
        "Participants compete by responding to given prompts with creativity or logic.",
      date: "February 1",
      eventName: "promptVsPrompt",
    },
    {
      title: "Electronics Competition",
      description: "A competition testing skills in electronics.",
      date: "February 1",
      eventName: "electronics",
    },
    {
      title: "Hackathon/Case Study",
      description:
        "An overnight event where teams solve a problem or develop a solution, ending at 8:00 AM the next day.",
      date: "February 1",
      eventName: "hackathon",
    },
    {
      title: "Bug Bounty",
      description: "A competitive event focused on finding and fixing bugs.",
      date: "February 2",
      eventName: "bugBounty",
    },
    {
      title: "Buggy Racing",
      description: "A fun and competitive buggy racing event.",
      date: "February 2",
      eventName: "buggyRacing",
    },
    {
      title: "Closing Ceremony",
      description:
        "Includes a quiz, prize distribution, event highlights, and a closing speech.",
      date: "February 2",
      eventName: "closingCeremony",
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const characterRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    
    return () => {
      if (emblaApi) emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (characterRef.current) {
      const { left, top } = characterRef.current.getBoundingClientRect()
      const x = e.clientX - left - 50
      const y = e.clientY - top - 50
      setMousePosition({ x, y })
    }
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return (
    <div className="w-full relative overflow-hidden" id="event">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF2D78]/5 to-transparent" />
      
      {/* Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-random"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            <div className={`w-8 h-8 ${i % 2 === 0 ? 'bg-[#FF2D78]' : 'bg-[#00FFD1]'} opacity-10 rounded-full blur-sm`} />
          </div>
        ))}
      </div>

      {/* Squid Game Character */}
      <div 
        ref={characterRef}
        className="fixed bottom-8 right-8 z-50"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div 
          className="w-[100px] h-[100px] relative transition-all duration-300 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
          }}
        >
          <Image
            src="/squichar.png"
            alt="Squid Game Character"
            width={100}
            height={100}
            className={`animate-float transform-gpu transition-all duration-300 ${
              isHovering ? 'scale-110 brightness-110' : ''
            }`}
            priority
          />
          {/* Character Glow Effect */}
          <div className={`absolute inset-0 bg-[#FF2D78] rounded-full blur-xl opacity-0 transition-opacity duration-300 ${
            isHovering ? 'opacity-20' : ''
          }`} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-16 relative">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-12 text-[#FF2D78] font-['Roboto_Mono'] text-center relative">
          <span className="relative">
            ENTER THE EVENTS
            <div className="absolute -inset-x-6 -inset-y-3 bg-[#FF2D78]/10 blur-xl -z-10" />
          </span>
        </h2>
      </div>
      
      <div className="relative">
        {/* Carousel Container */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {events.map((event, index) => (
              <div className="flex-[0_0_100%] min-w-0" key={index}>
                <div className="container mx-auto px-4">
                  <Card
                    desc={event.description}
                    title={event.title}
                    date={event.date}
                    eventName={event.eventName}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="container mx-auto px-4 relative">
          <button
            className="absolute left-8 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 p-3 rounded-full"
            onClick={scrollPrev}
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <button
            className="absolute right-8 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 p-3 rounded-full"
            onClick={scrollNext}
          >
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-4">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === selectedIndex ? 'bg-[#CCFF00] w-6' : 'bg-gray-400'
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DiscoverSection;

function Card({
  title,
  date,
  desc,
  eventName,
}: {
  title: string;
  date: string;
  desc: string;
  eventName: string;
}) {
  const router = useRouter();

  return (
    <div className="bg-[#1A1B35] rounded-2xl p-8 md:p-12 max-w-4xl mx-auto border-2 border-[#FF2D78] relative overflow-hidden shadow-[0_0_15px_rgba(255,45,120,0.3)] hover:shadow-[0_0_30px_rgba(255,45,120,0.5)] transition-all duration-500 group">
      {/* Enhanced geometric shapes */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border-4 border-[#00FFD1] opacity-20 group-hover:scale-150 group-hover:rotate-180 transition-all duration-700" />
      <div className="absolute -bottom-4 -left-4 w-16 h-16 rotate-45 border-4 border-[#FF2D78] opacity-20 group-hover:scale-150 group-hover:-rotate-180 transition-all duration-700" />
      
      {/* Content */}
      <div className="space-y-4 relative z-10">
        <div className="inline-block px-4 py-1 rounded-full bg-[#FF2D78]/10 text-[#FF2D78] border border-[#FF2D78]/30 backdrop-blur-sm group-hover:bg-[#FF2D78]/20 transition-all duration-300">
          {date}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white font-['Roboto_Mono'] group-hover:text-[#FF2D78] transition-colors duration-300">{title}</h3>
        <p className="text-[#00FFD1] text-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300">{desc}</p>
        
        {/* Enhanced button */}
        <button
          className="group/btn bg-[#FF2D78] text-white px-8 py-4 rounded-lg font-bold flex items-center gap-2 hover:bg-[#00FFD1] hover:text-black transition-all duration-300 mt-6 border-2 border-transparent hover:border-[#FF2D78] relative overflow-hidden"
          onClick={() => {
            router.push(`/register/${eventName}`);
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
          <span className="relative z-10">ENTER GAME</span>
          <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform relative z-10" />
        </button>
      </div>
    </div>
  );
}
