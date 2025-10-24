import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../data/AuthContext";
import { createProfile } from "../services/authService";

export default function CompleteProfileForm() {
  const navigate = useNavigate();
  const {universities} = useAuth()
  const [formData, setFormData] = useState({
    english_name: "",
    arabic_name: "",
    phone_number: "",
    address: "",
    rp_number: "",
    university: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setMessage("");
  
      try {
        const { data } = await createProfile(formData);
        setMessage("✅ Profile created successfully!");
        setFormData(data);
  
      } catch (err) {
        console.error("Profile creation failed:", err);
        setMessage("❌ Failed to create profile. Please try again.");
      } finally {
        setLoading(false);
      }
    }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-md rounded-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Complete Your Profile
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="english_name"
            placeholder="English Name"
            className="border p-2 rounded"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="arabic_name"
            placeholder="Arabic Name"
            className="border p-2 rounded"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            className="border p-2 rounded"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="border p-2 rounded"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="rp_number"
            placeholder="RP Number"
            className="border p-2 rounded"
            onChange={handleChange}
            required
          />

          {/* University select */}
          <select
            name="university"
            className="border p-2 rounded"
            onChange={handleChange}
            required
          >
            <option value="">Select University</option>
            {
              universities.map((u,i) => (
              <option value={i}>{u.name}</option>
              ))
            }
            {/* <option value="1">Eötvös Loránd University (ELTE)</option>
            <option value="2">University of Debrecen</option>
            <option value="3">Budapest University of Technology and Economics</option> */}
          </select>

          
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Submitting..." : "Submit Profile"}
        </button>

        {message && (
          <p className="text-center text-sm text-gray-600 mt-4">{message}</p>
        )}
      </form>
    </div>
  );
}
