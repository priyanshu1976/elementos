"use client";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { db } from "@/firebase.config";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

interface TeamMember {
  name: string;
  email: string;
  phone: string;
}

interface FormData {
  teamName: string;
  teamLeader: TeamMember;
  members: TeamMember[];
}

export default function RegistrationForm({
  params,
}: {
  params: Promise<{ event: string }>;
}) {
  const [formData, setFormData] = useState<FormData>({
    teamName: "",
    teamLeader: { name: "", email: "", phone: "" },
    members: Array(4).fill({ name: "", email: "", phone: "" }),
  });

  const [eventCollection, setcollection] = useState("");

  useEffect(() => {
    const initializeCollection = async () => {
      try {
        const { event } = await params;
        setcollection(event);
        console.log(event);
        const eventDocRef = doc(db, event, "metadata");
        const eventDocSnap = await getDoc(eventDocRef);

        if (!eventDocSnap.exists()) {
          await setDoc(eventDocRef, { createdAt: new Date().toISOString() });
          console.log(`Collection "${event}" initialized.`);
        } else {
          console.log(`Collection "${event}" already exists.`);
        }
      } catch (err) {
        console.error("Error initializing collection:", err);
      }
    };

    initializeCollection();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(eventCollection);

    try {
      const teamDocRef = doc(
        collection(db, eventCollection),
        formData.teamName
      );
      await setDoc(teamDocRef, {
        teamName: formData.teamName,
        teamLeader: formData.teamLeader,
        members: formData.members,
        createdAt: new Date().toISOString(),
      });
      console.log("Team data submitted:", formData);
      // Redirect or display success message
    } catch (err) {
      console.error("Error submitting team data:", err);
    }

    const data = {
      service_id: "service_psei7iv",
      template_id: "template_yy37g6c",
      user_id: "r8NHTrOvmhEsYp3bc",
      template_params: {
        team_name: formData.teamLeader.name,
        team_email: formData.teamLeader.email,
        leaderName: formData.teamLeader.name,
        event: (await params).event,
      },
    };

    const response = await axios.post(
      "https://elementos-backend.vercel.app/api/token",
      {
        email: formData.teamLeader.email,
      }
    );

    const token = response.data.token;

    axios
      .post("https://api.emailjs.com/api/v1.0/email/send", data)
      .then(() => {
        console.log("data send for email");
        console.log(response.data);
        window.location.href = `/thanks/${token}`;
        // Sign a JWT with a secret and send it to the next page in parameters
        // Navigate to the event registration page with JWT token
      })
      .catch((err) => {
        console.log("this coderan that means error");
        console.log(err.message);
      });
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
      newMembers[index] = { ...newMembers[index], [field]: value };
      setFormData({ ...formData, members: newMembers });
    } else if (type === "team") {
      setFormData({ ...formData, teamName: value });
    }
  };

  return (
    <div className="bg-primary">
      <div className="bg-[#1a1f2e] p-8 rounded-2xl max-w-[800px] mx-auto">
        <h2 className="text-[#c5f82a] text-2xl mb-8 font-mono">
          TEAM REGISTRATION
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Team Name"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c5f82a]"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange("team", null, "teamName", e.target.value)
              }
            />
            <div className="bg-gray-800/50 p-6 rounded-lg space-y-4">
              <h3 className="text-[#c5f82a] text-lg mb-4">Team Leader</h3>
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c5f82a]"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange("leader", null, "name", e.target.value)
                }
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c5f82a]"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange("leader", null, "email", e.target.value)
                }
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c5f82a]"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange("leader", null, "phone", e.target.value)
                }
              />
            </div>
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="bg-gray-800/50 p-6 rounded-lg space-y-4"
              >
                <h3 className="text-[#c5f82a] text-lg mb-4">
                  Team Member {index + 1}
                </h3>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c5f82a]"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange("member", index, "name", e.target.value)
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c5f82a]"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange("member", index, "email", e.target.value)
                  }
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c5f82a]"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange("member", index, "phone", e.target.value)
                  }
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-[#c5f82a] text-gray-900 py-4 rounded-lg font-semibold text-lg hover:bg-[#d4ff33] transition-colors"
          >
            Register Team
          </button>
        </form>
      </div>
    </div>
  );
}
