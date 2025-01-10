import { ArrowRight } from 'lucide-react'

export function TicketSection() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="max-w-md mb-8 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            DECIDE TO JOIN<br />THE EVENT
          </h2>
          <p className="text-gray-400 mb-6">
            Once you've found an event you're interested in, you can view all the details and information you need, including the event data, time, location, lineup, speakers and agenda.
          </p>
          <button className="bg-[#7B61FF] text-white px-6 md:px-8 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-opacity-90 transition-colors">
            GET TICKET
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
        <div className="relative">
          <div className="w-48 md:w-64 h-24 md:h-32 bg-[#CCFF00] rounded-lg transform rotate-12 flex items-center justify-center text-black text-xl md:text-2xl font-bold">
            TICKET
          </div>
        </div>
      </div>
    </div>
  )
}
export default TicketSection;
