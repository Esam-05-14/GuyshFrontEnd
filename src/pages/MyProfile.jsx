import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useAuth } from "../data/AuthContext";
import { updateProfile } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function MyProfile() {
  const { myProfile, universities } = useAuth();
  const [formData, setFormData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  // initialize form
  useEffect(() => {
    if (myProfile) {
      setFormData({
        english_name: myProfile.english_name || "",
        arabic_name: myProfile.arabic_name || "",
        phone_number: myProfile.phone_number || "",
        address: myProfile.address || "",
        rp_number: myProfile.rp_number || "",
        university: myProfile.university || "",
      });
    }
  }, [myProfile]);

  if (!formData) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600">
        <h1>Loading profile...</h1>
      </div>
    );
  }

  // handle changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { data } = await updateProfile(formData);
      setMessage("✅ Profile updated successfully!");
      setFormData(data);
      setEditing(false);

    } catch (err) {
      console.error("Profile update failed:", err);
      setMessage("❌ Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex justify-center items-center p-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-3xl border border-gray-200">
        <h1 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-3 text-center text-[#193042]">
          My Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
          {/* English Name (read-only) */}
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              English Name
            </label>
            <input
              type="text"
              name="english_name"
              value={formData.english_name}
              className="w-full border rounded p-2 bg-gray-100"
              readOnly
            />
          </div>

          {/* Arabic Name (read-only) */}
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Arabic Name
            </label>
            <input
              type="text"
              name="arabic_name"
              value={formData.arabic_name}
              className="w-full border rounded p-2 bg-gray-100"
              readOnly
              dir="rtl"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full border rounded p-2 ${
                editing ? "bg-white" : "bg-gray-100"
              }`}
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full border rounded p-2 ${
                editing ? "bg-white" : "bg-gray-100"
              }`}
            />
          </div>

          {/* RP Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              RP Number
            </label>
            <input
              type="text"
              name="rp_number"
              value={formData.rp_number}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full border rounded p-2 ${
                editing ? "bg-white" : "bg-gray-100"
              }`}
            />
          </div>

          {/* University */}
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              University
            </label>
            <select
              name="university"
              value={formData.university}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full border rounded p-2 ${
                editing ? "bg-white" : "bg-gray-100"
              }`}
            >
              <option value="">Select University</option>
              {universities?.map((uni) => (
                <option key={uni.id} value={uni.id}>
                  {uni.name}
                </option>
              ))}
            </select>
          </div>

          {/* Action buttons */}
          <div className="flex justify-between items-center mt-6 relative min-h-[50px]">
            {/* EDIT button (shows only when not editing) */}
            {!editing && (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="bg-[#193042] text-white py-2 px-4 rounded hover:bg-[#284b68] transition-all duration-300 ease-in-out"
              >
                Edit Profile
              </button>
            )}

            {/* SAVE + CANCEL buttons (fade/slide in) */}
            {editing && (
              <div
                className={`flex gap-3 absolute left-0 right-0 justify-between transition-all duration-500 ease-in-out transform ${
                  editing ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                }`}
              >
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-300"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setFormData(myProfile);
                  }}
                  className="text-gray-600 underline hover:text-gray-800 transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </form>

        {!editing && message && (
          <p className="text-center text-sm mt-4 text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
}




// import React from "react";
// import { useParams } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { useAuth } from "../data/AuthContext";
// export default function MyProfile() {

//   const {myProfile} = useAuth() ;
//   const user = myProfile
//   // const user = myProfile;
//   // console.log(user);
  
//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-200 flex justify-center items-center p-8">
//       <div className="bg-[#193042] rounded-2xl shadow-lg p-8 w-full max-w-3xl border border-gray-700">
//         <h1 className="text-2xl font-semibold mb-6 border-b border-gray-600 pb-3 text-center">
//           My Profile
//         </h1>

//         <div className="space-y-4 text-gray-200">
          

//           {/* English Name */}
//           <div className="flex justify-between border-b border-gray-700 pb-2">
//             <span className="font-semibold text-gray-400">English Name:</span>
//             <span>{user.english_name}</span>
//           </div>

//           {/* Arabic Name */}
//           <div className="flex justify-between border-b border-gray-700 pb-2">
//             <span className="font-semibold text-gray-400">Arabic Name:</span>
//             <span dir="rtl" className="text-right">{user.arabic_name}</span>
//           </div>

//           {/* Phone Number */}
//           <div className="flex justify-between border-b border-gray-700 pb-2">
//             <span className="font-semibold text-gray-400">Phone Number:</span>
//             <span>{user.phone_number}</span>
//           </div>

//           {/* Address */}
//           <div className="flex justify-between border-b border-gray-700 pb-2">
//             <span className="font-semibold text-gray-400">Address:</span>
//             <span className="text-right">{user.address}</span>
//           </div>

//           {/* RP Number */}
//           <div className="flex justify-between border-b border-gray-700 pb-2">
//             <span className="font-semibold text-gray-400">RP Number:</span>
//             <span>{user.rp_number}</span>
//           </div>

//           {/* University */}
//           <div className="flex justify-between border-b border-gray-700 pb-2">
//             <span className="font-semibold text-gray-400">University:</span>
//             <span>{user.university || universities.find(u => u.id === user.university)}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
