"use client";
import { useParams } from "next/navigation";

export default function ThanksPage() {
  const params = useParams<{ token: string }>();

  return (
    <div className="bg-[#1a1f2e] min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-xl">
        <div className="mb-8">
          <svg
            className="w-24 h-24 mx-auto text-[#c5f82a]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <div className="mb-8">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${params.token}`}
            alt="Registration QR Code"
            width={150}
            height={150}
            className="mx-auto rounded-lg"
          />
        </div>

        <h1 className="text-[#c5f82a] text-4xl font-bold mb-4">
          Registration Complete!
        </h1>

        <p className="text-gray-300 text-xl mb-8">
          Thank you for registering your team. We&apos;ve sent a confirmation
          email with further details.
        </p>

        <div className="space-y-4">
          <button className="w-full bg-[#c5f82a] text-gray-900 py-4 rounded-lg font-semibold text-lg hover:bg-[#d4ff33] transition-colors">
            View Event Details
          </button>

          <button
            className="w-full bg-gray-800 text-[#c5f82a] py-4 rounded-lg font-semibold text-lg hover:bg-gray-700 transition-colors"
            onClick={() => (window.location.href = "/")}
          >
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
