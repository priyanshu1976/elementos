import { ArrowRight } from "lucide-react";
import { title } from "process";

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

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12">
        DISCOVER UPCOMING EVENTS
      </h2>
      <div className="flex flex-col gap-y-4">
        {events.map((event, index) => (
          <Card
            desc={event.description}
            title={event.title}
            date={event.date}
            eventName={event.eventName}
            key={index}
          />
        ))}
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-[#1A1B35] rounded-2xl p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold mb-4">{title}</h3>
        <h4 className="mb-1">{date}</h4>
        <p className="text-gray-400 mb-6">{desc}</p>
        <button
          className="bg-[#CCFF00] text-black px-6 md:px-8 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-opacity-90 transition-colors"
          onClick={() => {
            window.location.href = `/register/${eventName}`;
          }}
        >
          Register NOW
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
