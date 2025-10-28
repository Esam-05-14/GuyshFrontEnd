import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  guidenceRequest } from "../services/authService";

export default function GuidenceForm() {

  const [formData, setFormData] = useState({
    full_name: "",
    whatsapp_number: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    try {
      await guidenceRequest(formData);
      alert("Form submitted successfully!, Please Check your email");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-[#193042] p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-semibold text-center mb-4">
          Guidence Form
        </h1>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Full Name:</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* WhatsApp Number */}
        <div>
          <label className="block text-sm font-medium mb-2">WhatsApp Number:</label>
          <input
            type="tel"
            name="whatsapp_number"
            value={formData.whatsapp_number}
            onChange={handleChange}
            placeholder="+36201234567"
            pattern="^\+?[0-9\s-]{7,15}$"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="text-sm text-gray-400 mt-1">
            Include your country code (e.g., +36 for Hungary)
          </p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
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
