import { useState } from "react";
import { useAuth } from "../data/AuthContext";
import { Link } from "react-router-dom";

function UserProfiles() {
  const auth = useAuth();
  const profiles = auth.profiles;

  // Track which user's menu is open
  

  

  return (
    <div className="bg-[#EAEAEA] min-h-screen px-8 py-10">
      {/* Header */}
      

      {/* Users Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-[#193042] text-white">
            <tr>
              <th className="py-3 px-5 border-b border-gray-200">Username</th>
              
              <th className="py-3 px-5 border-b border-gray-200 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {profiles.length > 0 ? (
              profiles.map((u, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 transition-colors border-b last:border-0"
                >
                  <td className="py-3 px-5">{u.english_name}</td>
                  
                  <td className="py-3 px-5 text-center relative">
                    <Link
                      to={`/admin/profiles/${u.id}`}
                      state={{ user: u }}
                      className="bg-[#193042] text-white px-4 py-2 rounded-md hover:bg-[#234b6a] transition inline-block text-center"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No users available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserProfiles;
