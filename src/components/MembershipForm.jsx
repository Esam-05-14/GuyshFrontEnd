import React, { useState } from "react";

export default function MembershipForm() {
  const [formData, setFormData] = useState({
    user: "",
  });

  const handleChange = (e) => {
    const { name} = e.target;
    setFormData({
      name
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
         Membership Form
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
