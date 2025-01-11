import Image from 'next/image'
import { FaLinkedin } from 'react-icons/fa'

export function SpeakersSection() {
  const speakers = [
    {
      name: "YASH AWIDRA",
      role: "Software Engineer@Mercedes-Benz | 200K+ @LinkedIn | Career & LinkedIn Coach | Stand-up comedian",
      description: "A multifaceted professional, he excels as a Software Engineer at Mercedes-Benz, a Career & LinkedIn Coach, and a passionate advocate for personal branding. Also a Stand-up Comedian, Teacher, Public Speaker, and Author, he shares valuable insights on career growth and personal development with humor and authenticity.",
      image: "/yash.jpg",
      linkedin: "https://www.linkedin.com/in/yash-awidra-63a4b21a6/"
    },
    {
      name: "VIKRAM GAUR",
      role: "LinkedIn Top Voice '24 | Google Cloud Facilitator | SDE @ EY",
      description: "Vikram Gaur is a LinkedIn Top Voice 2024, SDE at EY, and a Google Cloud Certified Engineer, blending expertise in cloud computing with a passion for tech communities. As a Google Cloud Facilitator and active member of GDG Indore and GirlScript Ireland, he inspires and empowers developers worldwide.",
      image: "/vikram.jpg",
      linkedin: "https://www.linkedin.com/in/vikram-gaur-0252aa185/"
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
  
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white">
          Meet Our <span className="text-blue-500 ">Speakers</span>
        </h2>
        <p className="text-gray-400 mt-2 text-lg">
          Learn from the best in the industry, with a touch of humor and expertise.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 justify-center items-center max-w-5xl mx-auto">
        {speakers.map((speaker, index) => (
          <div
            key={index}
            className="relative bg-gradient-to-r from-[#1A1B35] to-[#25274D] rounded-2xl p-6 flex flex-col items-center shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <div className="absolute -top-4 right-4 bg-yellow-400 text-gray-900 font-bold px-3 py-1 rounded-full text-xs shadow-md">
              Featured
            </div>
            <div className="mb-4 rounded-full overflow-hidden border-4 border-blue-500 shadow-md">
              <Image
                src={speaker.image}
                alt={speaker.name}
                width={150}
                height={150}
                className="w-[150px] h-[150px] object-cover rounded-full hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="text-center mt-4">
              <h3 className="text-2xl font-semibold text-white hover:text-blue-400 transition-colors">
                {speaker.name}
              </h3>
              <p className="text-blue-300 text-sm font-medium">{speaker.role}</p>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                {speaker.description}
              </p>
            </div>
            <a
              href={speaker.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 mt-6 bg-blue-500 text-white px-5 py-2 rounded-full text-sm font-medium shadow-md hover:bg-blue-400 hover:shadow-lg transition-all"
            >
              <FaLinkedin className="text-lg" />
              <span>Connect on LinkedIn</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SpeakersSection;
