import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../data/AuthContext";

export default function AboutUs() {
  const { boardMembers } = useAuth();

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-800 flex flex-col items-center">
      

      {/* Hero Section */}
      <section className="relative w-full bg-[#193042] text-white py-20 text-center shadow-md overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#193042] to-[#1a1a1a] opacity-80"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-extrabold mb-4 tracking-wide">
            About Us
          </h1>
          <p className="text-sm sm:text-base leading-relaxed text-gray-200">
            Welcome to our Student Union! We’re dedicated to supporting and
            empowering students across Hungary through collaboration, innovation,
            and cultural unity.
          </p>
        </div>
      </section>

      {/* Board Members Section */}
      <section className="w-full max-w-6xl py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold text-[#a3301e] mb-12">
          Board Members
        </h2>

        {/* President */}
        <div className="flex justify-center mb-16">
          <div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 max-w-sm">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#193042]">
              <img
                src="/manaf.jpg"
                alt="President"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="mt-5 font-semibold text-[#193042] text-base sm:text-lg">
              President
            </h3>
          </div>
        </div>

        {/* Other Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {[
            "General Secretary",
            "Academic Officer",
            "Media Officer",
            "Events Organizer",
            "Financial Manager",
            "Internal Affairs Officer",
            "Deputy Internal Affairs Officer",
          ].map((role) => (
            <div
              key={role}
              className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#193042]">
                <img
                  src="/manaf.jpg"
                  alt={role}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-4 font-medium text-[#193042] text-sm sm:text-base">
                {role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* City Representatives */}
      <section className="w-full max-w-6xl py-16 px-6 text-center bg-gray-100 border-t border-gray-300">
        <h2 className="text-3xl font-semibold text-[#a3301e] mb-12">
          City Representatives
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {["Debrecen", "Budapest", "Pécs"].map((city) => (
            <div
              key={city}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col items-center"
            >
              <h3 className="text-[#912211] text-lg font-semibold mb-6">
                {city}
              </h3>
              <div className="flex justify-center gap-10">
                {["President", "Vice President"].map((role) => (
                  <div key={role} className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#193042]">
                      <img
                        src="/manaf.jpg"
                        alt={role}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="mt-3 text-[#193042] text-sm font-medium">
                      {role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
