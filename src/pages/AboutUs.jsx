import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../data/AuthContext";
function AboutUs() {
  const auth = useAuth();
  const boardMembers = auth.boardMembers;
  return (
    <div className="bg-[#D9D9D9] flex flex-col items-center w-full py-10">

      {/* Title & Description */}
      <div className="max-w-4xl text-center">
        <h1 className="text-3xl text-[#a3301e] mb-4">Title</h1>
        <p className="text-sm text-[#193042]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tristique pulvinar justo...
        </p>
      </div>

      {/* Board Members */}
      <div className="mt-12 flex flex-col items-center">
        <h2 className="text-[#912211] text-xl mb-8">Board Members</h2>

        {/* President */}
        <div className="bg-[#193042] w-24 h-24 rounded-full flex items-center justify-center overflow-hidden">
          <img 
            src="../public/manaf.jpg" 
            alt="President" 
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-[#193042] mt-2 text-center text-sm">President</p>

        

        {/* Officers row */}
        <div className="flex flex-wrap justify-center gap-6 mt-10 max-w-4xl mx-auto">
        {[
          "General Secretary",
          "Academic Officer",
          "Media Officer",
          "Events Organizer",
          "Financial Manager",
          "Internal Affairs Officer",
          "Deputy Internal Affairs Officer",
        ].map((role) => (
          <div key={role} className="flex flex-col items-center text-center">
            <div className="w-20 h-28 bg-[#193042] rounded-[50%] overflow-hidden flex items-center justify-center">
              <img
                src="../public/manaf.jpg"
                alt={role}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[#193042] mt-2 text-xs sm:text-sm font-medium max-w-[100px] leading-tight">
              {role}
            </p>
          </div>
        ))}
      </div>

      </div>

      {/* Cities Section */}
      <div className="grid grid-cols-3 gap-8 mt-16">
      {["Debrecen", "Budapest", "Pecs"].map((city) => (
        <div key={city} className="border-2 border-[#193042] p-6 flex flex-col items-center rounded-lg">
          {/* City name */}
          <h3 className="text-[#912211] text-lg mb-6 font-semibold">{city}</h3>

          {/* Profiles */}
          <div className="flex items-center justify-center space-x-4">
            {/* President */}
            <div className="flex flex-col items-center">
              <div className="bg-[#193042] w-20 h-28 rounded-[50%] overflow-hidden flex items-center justify-center">
                <img
                  src="../public/manaf.jpg"
                  alt="President"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#193042] mt-2 text-xs font-medium text-center">President</p>
            </div>

            {/* Vice President */}
            <div className="flex flex-col items-center">
              <div className="bg-[#193042] w-12 h-16 rounded-[50%] overflow-hidden flex items-center justify-center">
                <img
                  src="../public/manaf.jpg"
                  alt="Vice President"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#193042] mt-2 text-[11px] font-medium text-center leading-tight">
                Vice President
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>


      {/* Developers */}
      <div className="mt-16 flex flex-col items-center">
        <h2 className="text-[#912211] text-xl mb-8">Developers</h2>
        <div className="flex gap-12">
          {[
            { name: "UI/UX" },
            { name: "Backend" },
            { name: "Frontend" },
          ].map((dev) => (
            <div>
            <div
              key={dev.name}
              className="bg-[#193042] w-20 h-28 rounded-[50%] overflow-hidden flex items-center justify-center text-white text-xs text-center"
            >
              <img src="../public/manaf.jpg" alt=""   className="w-full h-full object-cover"/>
            </div>
            <p className="text-[#193042] mt-2 text-[11px] font-medium text-center leading-tight">
              {dev.name}
            </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
