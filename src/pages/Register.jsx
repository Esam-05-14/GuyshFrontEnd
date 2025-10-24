import { useContext, useState } from "react";
import { useAuth } from "../data/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../services/authService.js";
function Register() {
    const navigate = useNavigate();
    

    
    const handleSubmit = async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      const username = e.target.username.value;
        try {
            console.log("Attempting register with", username);
            
            const res = await registerRequest(email, password , username);
            console.log(res);
            alert("A verification email has been sent to your inbox.");
            if (res) navigate('/membership-form');
            // navigate('/');
            // redirect to home or dashboard
            
        } catch (error) {
            console.log("Register failed: " + error.message);
        }
    
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-[#193042] mb-6">Join the Union</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="username"
              name="username"
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#193042] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#193042] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#193042] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg font-semibold bg-gray-200 text-[#193042] hover:bg-gray-300 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;


 const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerRequest(email);
      alert("A verification email has been sent to your inbox.");
      navigate("/verify-email");
    } catch (err) {
      setError("Registration failed: " + err.message);
    }
  };