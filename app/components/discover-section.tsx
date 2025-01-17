import { useState, useEffect, useCallback, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export function DiscoverSection() {
  const events = [
    {
      title: "F1 Car Racing",
      description: "A fun and competitive buggy racing event.",
      date: "February 1",
      eventName: "f1CarRacing",
      rulebook: "/rulebooks/f1-racing-rulebook.pdf"
    },
    {
      title: "Robotothon",
      description:
        "An overnight robotics competition where teams build and program robots to solve challenges - a first-time event at Thapar Institute.",
      date: "February 1",
      eventName: "robotothon",
      rulebook: "/rulebooks/robotothon-rulebook.pdf"
    }
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })])
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
    if (!emblaApi) return undefined
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
    <section id="events" className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF2D78]/5 to-transparent" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 5 }, (_, i) => {
          const left = `${((i + 1) * 20) % 100}%`;
          const top = `${((i + 1) * 17) % 100}%`;
          const delay = `${(i + 1) * 0.5}s`;
          
          return (
            <div
              key={i}
              className="absolute animate-float-random"
              style={{
                left,
                top,
                animationDelay: delay
              }}
            >
              <div className={`w-8 h-8 ${i % 2 === 0 ? 'bg-[#FF2D78]' : 'bg-[#00FFD1]'} opacity-10 rounded-full blur-sm`} />
            </div>
          );
        })}
      </div>

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
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-5xl font-black text-center mb-12 text-white">
          <span className="text-[#FF2D78]">Discover</span> Our Events
        </h2>
        
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {events.map((event, index) => (
                <div className="flex-[0_0_100%] min-w-0 px-4" key={index}>
                  <Card
                    title={event.title}
                    date={event.date}
                    desc={event.description}
                    eventName={event.eventName}
                    rulebook={event.rulebook}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#FF2D78]/10 hover:bg-[#FF2D78]/20 p-4 rounded-full backdrop-blur-sm transition-all duration-300 z-10"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#FF2D78]/10 hover:bg-[#FF2D78]/20 p-4 rounded-full backdrop-blur-sm transition-all duration-300 z-10"
          >
            <ArrowRight className="w-6 h-6 text-white" />
          </button>

          {/* Dots navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === selectedIndex 
                    ? 'bg-[#FF2D78] w-6' 
                    : 'bg-white/20 hover:bg-white/40'
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DiscoverSection;

function Card({
  title,
  date,
  desc,
  eventName,
  rulebook,
}: {
  title: string;
  date: string;
  desc: string;
  eventName: string;
  rulebook: string;
}) {
  const router = useRouter();
  const shouldShowButtons = !["openingCeremony", "preEvent", "closingCeremony"].includes(eventName);

  return (
    <div className="bg-[#1A1B35]/80 backdrop-blur-lg rounded-3xl p-10 md:p-16 max-w-5xl mx-auto border-4 border-[#FF2D78] relative overflow-hidden shadow-[0_0_30px_rgba(255,45,120,0.4)] hover:shadow-[0_0_50px_rgba(255,45,120,0.6)] transition-all duration-500 group">
      <div className="absolute -top-4 -right-4 transform rotate-12 z-20">
        <div className="relative">
          <div className="absolute inset-0 bg-[#FF2D78] blur-xl opacity-50 rounded-full" />
          <div className="relative bg-[#FF2D78] text-white w-32 h-32 rounded-full border-2 border-white/20 flex flex-col items-center justify-center">
            <span className="font-black text-4xl leading-none mb-1">{date.split(' ')[1]}</span>
            <span className="font-bold text-sm uppercase">{date.split(' ')[0]}</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-[#FF2D78]/5 via-transparent to-[#00FFD1]/5" />
      <div className="absolute inset-0 opacity-20 bg-black/20 mix-blend-overlay" />
      
      <div className="space-y-8 relative z-10">
        <h3 className="text-4xl md:text-6xl font-black text-white font-['Roboto_Mono'] group-hover:text-[#FF2D78] transition-colors duration-300 leading-tight">
          {title}
          <div className="absolute -inset-x-6 -inset-y-3 bg-[#FF2D78]/10 blur-xl -z-10 group-hover:bg-[#FF2D78]/20 transition-all duration-300" />
        </h3>
        
        <p className="text-[#00FFD1] text-xl md:text-2xl opacity-90 group-hover:opacity-100 transition-opacity duration-300 font-medium border-l-4 border-[#00FFD1] pl-6">
          {desc}
        </p>
        
        {shouldShowButtons && (
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => router.push(`/register/${eventName}`)}
              className="group/btn relative w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-[#FF2D78] transform skew-x-6 rounded-xl transition-all duration-300 group-hover/btn:bg-[#00FFD1] blur-lg opacity-50" />
              <div className="relative bg-[#FF2D78] text-white text-3xl font-black px-12 py-6 rounded-xl transform -skew-x-6 transition-all duration-300 group-hover/btn:bg-[#00FFD1] group-hover/btn:text-black group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 flex items-center justify-center gap-4 border-2 border-white/20">
                ENTER GAME
                <ArrowRight className="h-8 w-8 group-hover/btn:translate-x-2 transition-transform" />
              </div>
            </button>

            <a
              href={rulebook}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-[#00FFD1] transform skew-x-6 rounded-xl transition-all duration-300 group-hover/btn:bg-[#FF2D78] blur-lg opacity-50" />
              <div className="relative bg-[#00FFD1] text-black text-3xl font-black px-12 py-6 rounded-xl transform -skew-x-6 transition-all duration-300 group-hover/btn:bg-[#FF2D78] group-hover/btn:text-white group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 flex items-center justify-center gap-4 border-2 border-white/20">
                RULEBOOK
                <svg 
                  className="h-8 w-8 group-hover/btn:translate-y-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
            </a>
          </div>
        )}
      </div>

      <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-[#FF2D78]/20" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-[#00FFD1]/20" />
      
      <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden opacity-10">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-white/50 w-full"
            style={{
              transform: `rotate(45deg) translateY(${i * 8}px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}