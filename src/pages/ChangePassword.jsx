import React, { useState } from "react";
import { changePassword } from "../services/authService";
import { useAuth } from "../data/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [form, setForm] = useState({ current: "", new: "", confirm: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const {isLoggedIn} = useAuth();
  const navigate = useNavigate()

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.new !== form.confirm) {
      setMessage("❌ New passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await changePassword(form.current, form.new);
      setMessage("✅ Password changed successfully!");
      setForm({ current: "", new: "", confirm: "" });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to change password. Please check your current one.");
    } finally {
      setLoading(false);
    }
  };
   if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#193042] mx-auto"></div>
          <button className="w-full bg-[#193042] text-white p-2 rounded-lg hover:bg-[#284b68] transition" onClick={() => navigate('/login')}>Login First</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#193042] mb-6">
          Change Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            name="current"
            placeholder="Current Password"
            value={form.current}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="password"
            name="new"
            placeholder="New Password"
            value={form.new}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="password"
            name="confirm"
            placeholder="Confirm New Password"
            value={form.confirm}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#193042] text-white p-2 rounded-lg hover:bg-[#284b68] transition"
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
        {message && <p className="text-center mt-4 text-sm">{message}</p>}
      </div>
    </div>
  );
}
