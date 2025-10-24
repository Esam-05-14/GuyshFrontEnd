import React from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../data/AuthContext";
export default function UserProfilePage() {
  const {universities } = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const user = location.state?.user ;
  return (
    <div className="min-h-screen bg-gray-50 text-gray-200 flex justify-center items-center p-8">
      <div className="bg-[#193042] rounded-2xl shadow-lg p-8 w-full max-w-3xl border border-gray-700">
        <h1 className="text-2xl font-semibold mb-6 border-b border-gray-600 pb-3 text-center">
          User Profile Information
        </h1>

        <div className="space-y-4 text-gray-200">
          

          {/* English Name */}
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="font-semibold text-gray-400">English Name:</span>
            <span>{user.english_name}</span>
          </div>

          {/* Arabic Name */}
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="font-semibold text-gray-400">Arabic Name:</span>
            <span dir="rtl" className="text-right">{user.arabic_name}</span>
          </div>

          {/* Phone Number */}
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="font-semibold text-gray-400">Phone Number:</span>
            <span>{user.phone_number}</span>
          </div>

          {/* Address */}
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="font-semibold text-gray-400">Address:</span>
            <span className="text-right">{user.address}</span>
          </div>

          {/* RP Number */}
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="font-semibold text-gray-400">RP Number:</span>
            <span>{user.rp_number}</span>
          </div>

          {/* University */}
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="font-semibold text-gray-400">University:</span>
            <span>{user.university || universities.find(u => u.id === user.university)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
