import React, { useState } from "react";

export default function AirportPickupForm() {
  const [formData, setFormData] = useState({
    user: "",
    airport: "",
    destination: "",
    date: "",
    time: "",
    inDormitory: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Form submitted! Check console for data.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-semibold text-center mb-4">
          Add Airport Pickup Form
        </h1>

        {/* User */}
        <div>
          <label className="block text-sm font-medium mb-2">User:</label>
          <input
            type="text"
            name="user"
            value={formData.user}
            onChange={handleChange}
            placeholder="Enter user name"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Airport */}
        <div>
          <label className="block text-sm font-medium mb-2">Airport:</label>
          <select
            name="airport"
            value={formData.airport}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select airport</option>
            <option value="Budapest Airport">Budapest Airport</option>
            <option value="Debrecen Airport">Debrecen Airport</option>
          </select>
        </div>

        {/* Destination */}
        <div>
          <label className="block text-sm font-medium mb-2">Destination:</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Enter destination"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Arrival Time */}
        <div>
          <label className="block text-sm font-medium mb-2">Arrival time:</label>
          <div className="flex gap-3">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="flex-1 p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="flex-1 p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Note: You are 2 hours ahead of server time.
          </p>
        </div>

        {/* In Dormitory */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="inDormitory"
            checked={formData.inDormitory}
            onChange={handleChange}
            className="w-4 h-4 accent-blue-500"
          />
          <label className="text-sm">In dormitory</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-medium"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
