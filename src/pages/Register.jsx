import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../services/authService.js";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setLoading(true);

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const username = e.target.username.value.trim();

    try {
      console.log("Attempting register with", username);
      const res= await registerRequest(email, password, username);

      // if (status === 400) {
      //   setError("Username or email already exists. Please try another.");
      //   return;
      // }

      if (res) {
        alert("A verification email has been sent to your inbox.");
        navigate("/");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Register failed:", err);
      setError("Username or email already exists. Please try another.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-[#193042] mb-6">
          Join the Union
        </h2>

        {/* Error message (only shown if there's an error) */}
        {error && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg text-center">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#193042] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#193042] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#193042] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300 text-[#193042]"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
