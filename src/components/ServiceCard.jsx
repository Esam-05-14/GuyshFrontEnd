import React from "react";
import { useNavigate } from "react-router-dom";

function ServiceCard({ name, description }) {
  const navigate = useNavigate();

  const imageSrc =
    name === "Airport Pickup"
      ? "/public/airport_pickup.jpeg"
      : "/public/membership.jpeg";

  const handleClick = () => {
    navigate(
      name === "Airport Pickup"
        ? "/services/airport-form"
        : "/services/membership-form"
    );
  };

  return (
    <div
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 
      flex flex-col overflow-hidden w-[260px] sm:w-[300px] cursor-pointer hover:-translate-y-1"
    >
      {/* Image Section */}
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={`${name} service`}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-center text-center p-5 space-y-3">
        <h3 className="text-[#912211] text-xl font-semibold">{name}</h3>
        <p className="text-gray-700 text-sm leading-relaxed">{description}</p>

        <button
          onClick={handleClick}
          className="mt-3 bg-[#193042] hover:bg-[#234c6e] text-white font-medium py-2 px-6 
          rounded-xl shadow-md transition-colors duration-300"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;
