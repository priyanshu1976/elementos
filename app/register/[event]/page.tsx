"use client";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { db } from "@/firebase.config";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";

interface TeamMember {
  name: string;
  email: string;
  phone: string;
}

interface FormData {
  teamName: string;
  teamLeader: TeamMember;
  members: (TeamMember | null)[];
}

export default function RegistrationForm({
  params,
}: {
  params: Promise<{ event: string }>;
}) {
  const [formData, setFormData] = useState<FormData>({
    teamName: "",
    teamLeader: { name: "", email: "", phone: "" },
    members: Array(4).fill(null),
  });

  const [eventCollection, setCollection] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const initializeCollection = async () => {
      try {
        const { event } = await params;
        setCollection(event);
        const eventDocRef = doc(db, event, "metadata");
        const eventDocSnap = await getDoc(eventDocRef);

        if (!eventDocSnap.exists()) {
          await setDoc(eventDocRef, { createdAt: new Date().toISOString() });
        }
      } catch (err) {
        console.error("Error initializing collection:", err);
      }
    };

    initializeCollection();
  }, [params]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const validMembers = formData.members.filter(
        (member): member is TeamMember =>
          member !== null &&
          member.name !== "" &&
          member.email !== "" &&
          member.phone !== ""
      );

      const dataToSave = {
        teamName: formData.teamName,
        teamLeader: formData.teamLeader,
        members: validMembers,
        createdAt: new Date().toISOString(),
      };

      const teamDocRef = doc(
        collection(db, eventCollection),
        formData.teamName
      );
      await setDoc(teamDocRef, dataToSave);

      const emailData = {
        service_id: "service_psei7iv",
        template_id: "template_yy37g6c",
        user_id: "r8NHTrOvmhEsYp3bc",
        template_params: {
          team_name: formData.teamLeader.name,
          team_email: formData.teamLeader.email,
        },
      };

      const response = await axios.post(
        "https://elementos-backend.vercel.app/api/token",
        { email: formData.teamLeader.email }
      );

      await axios.post(
        "https://api.emailjs.com/api/v1.0/email/send",
        emailData
      );

      window.location.href = `/thanks/${response.data.token}`;
    } catch (err) {
      console.error("Error during submission:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    type: "leader" | "member" | "team",
    index: number | null,
    field: keyof TeamMember | "teamName",
    value: string
  ) => {
    if (type === "leader" && field !== "teamName") {
      setFormData({
        ...formData,
        teamLeader: { ...formData.teamLeader, [field]: value },
      });
    } else if (type === "member" && index !== null) {
      const newMembers = [...formData.members];
      if (!newMembers[index]) {
        newMembers[index] = { name: "", email: "", phone: "" };
      }
      newMembers[index] = {
        ...(newMembers[index] as TeamMember),
        [field]: value,
      };
      if (
        !value &&
        !Object.values(newMembers[index] as TeamMember).some((v) => v)
      ) {
        newMembers[index] = null;
      }
      setFormData({ ...formData, members: newMembers });
    } else if (type === "team") {
      setFormData({ ...formData, teamName: value });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#FF0F5B]/10 to-black">
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,15,91,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,15,91,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-[800px] mx-auto pt-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-black/60 backdrop-blur-xl border border-[#FF0F5B]/30 p-8 rounded-2xl shadow-2xl">
          <h2 className="text-[#FF0F5B] text-3xl mb-8 font-mono text-center tracking-wider">
            PLAYER REGISTRATION
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Squad Name"
                required
                className="w-full bg-black/50 text-white px-4 py-3 rounded-lg border border-[#FF0F5B]/30 focus:outline-none focus:border-[#FF0F5B] focus:ring-1 focus:ring-[#FF0F5B] transition-colors placeholder:text-gray-500"
                onChange={(e) =>
                  handleChange("team", null, "teamName", e.target.value)
                }
              />

              <div className="bg-black/40 border border-[#FF0F5B]/20 p-6 rounded-lg space-y-4">
                <h3 className="text-[#FF0F5B] text-xl font-mono">
                  SQUAD LEADER
                </h3>
                {["name", "email", "phone"].map((field) => (
                  <input
                    key={field}
                    type={
                      field === "email"
                        ? "email"
                        : field === "phone"
                        ? "tel"
                        : "text"
                    }
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    required
                    className="w-full bg-black/50 text-white px-4 py-3 rounded-lg border border-[#FF0F5B]/30 focus:outline-none focus:border-[#FF0F5B] focus:ring-1 focus:ring-[#FF0F5B] transition-colors placeholder:text-gray-500"
                    onChange={(e) =>
                      handleChange(
                        "leader",
                        null,
                        field as keyof TeamMember,
                        e.target.value
                      )
                    }
                  />
                ))}
              </div>

              {[0, 1, 2, 3].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black/40 border border-[#FF0F5B]/20 p-6 rounded-lg space-y-4"
                >
                  <h3 className="text-[#FF0F5B] text-xl font-mono flex justify-between items-center">
                    <span>PLAYER {index + 1}</span>
                    <span className="text-sm opacity-70">(Optional)</span>
                  </h3>
                  {["name", "email", "phone"].map((field) => (
                    <input
                      key={field}
                      type={
                        field === "email"
                          ? "email"
                          : field === "phone"
                          ? "tel"
                          : "text"
                      }
                      placeholder={
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }
                      className="w-full bg-black/50 text-white px-4 py-3 rounded-lg border border-[#FF0F5B]/30 focus:outline-none focus:border-[#FF0F5B] focus:ring-1 focus:ring-[#FF0F5B] transition-colors placeholder:text-gray-500"
                      onChange={(e) =>
                        handleChange(
                          "member",
                          index,
                          field as keyof TeamMember,
                          e.target.value
                        )
                      }
                    />
                  ))}
                </motion.div>
              ))}
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full relative group disabled:opacity-50"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF0F5B] to-[#FF0F5B]/50 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-200" />
              <div className="relative w-full bg-black px-4 py-4 rounded-lg font-mono text-lg tracking-wider text-white group-hover:text-[#FF0F5B] transition-colors border border-[#FF0F5B]/30 group-hover:border-[#FF0F5B]">
                {isSubmitting ? "PROCESSING..." : "ENTER THE GAME"}
              </div>
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
