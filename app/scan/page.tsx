"use client";
import { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";

const QRScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    const success = async (decodedText) => {
      scanner.clear();
      setScanResult(decodedText);

      try {
        const response = await axios.post("/api/verify-token", {
          token: decodedText,
        });

        setVerificationStatus(response.data.verified);
        if (response.data.verified) {
          window.location.href = `/event/${response.data.eventId}`;
        }
      } catch (err) {
        setError("Invalid or expired token");
        console.error("Verification failed:", err);
      }
    };

    scanner.render(success, (error) => {
      console.warn(error);
    });

    return () => {
      scanner.clear();
    };
  }, []);

  return (
    <div className="bg-[#1a1f2e] p-6 rounded-xl max-w-md mx-auto">
      <h2 className="text-[#c5f82a] text-2xl font-bold mb-6 text-center">
        Scan QR Code
      </h2>

      <div
        id="reader"
        className="mb-6 rounded-lg overflow-hidden"
        style={{ background: "#2a2f3e" }}
      />

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-100 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      {verificationStatus && (
        <div className="bg-[#c5f82a]/20 border border-[#c5f82a] text-[#c5f82a] p-4 rounded-lg mb-4">
          Token verified successfully!
        </div>
      )}

      <div className="text-gray-400 text-sm text-center">
        {scanResult ? (
          <p>Processing token...</p>
        ) : (
          <p>Position the QR code within the frame to scan</p>
        )}
      </div>
    </div>
  );
};

export default QRScanner;
