"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

// Define the types for form data
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

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    teamName: "",
    teamLeader: { name: "", email: "", phone: "" },
    members: Array(4).fill({ name: "", email: "", phone: "" }),
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      service_id: "service_psei7iv",
      template_id: "template_yy37g6c",
      user_id: "r8NHTrOvmhEsYp3bc",
      template_params: {
        team_name: formData.teamLeader.name,
        team_email: formData.teamLeader.email,
      },
    };

    // db mei store karke token return kar diya

    axios
      .post("https://api.emailjs.com/api/v1.0/email/send", data)
      .then(() => {
        console.log("data send for email");
        // Sign a JWT with a secret and send it to the next page in parameters
        // Navigate to the event registration page with JWT token
        const token: string = "eoirhoiuefbiu";
        window.location.href = `/thanks/${token}`;
      })
      .catch((err) => {
        console.log("this coderan that means error");
        console.log(err.message);
      });

    console.log("Form submitted:", formData);
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
