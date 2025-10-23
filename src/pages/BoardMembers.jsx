// import { useState } from "react";
// import { useAuth } from "../data/AuthContext";

// function BoardMembers() {
//   const auth = useAuth();
//   const bmembers = auth.boardMembers_A;

//   // Track which user's menu is open
//   const [openMenu, setOpenMenu] = useState(null);

// //   const handleToggleActive = async (user) => {
// //   try {
// //     // Toggle status locally
// //     const updatedUser = { ...user, is_active: !user.is_active };

// //     // Notify backend
// //     const response = await fetch(`http://localhost:8000/api/users/${user.id}/`, {
// //       method: "PUT", // or "PUT" depending on your backend
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: `JWT ${auth.token}`, // only if JWT or similar
// //       },
// //       body: JSON.stringify({ is_active: updatedUser.is_active }),
// //     });

// //     if (!response.ok) {
// //       throw new Error("Failed to update user status");
// //     }

// //     // Update frontend users list
// //     auth.setUsers(
// //       auth.users.map((u) =>
// //         u.username === user.username ? updatedUser : u
// //       )
// //     );

// //     setOpenMenu(null);
// //   } catch (error) {
// //     console.error(error);
// //     alert("Error: Could not update user status.");
// //   }
// // };

//   const handleDelete = (user) => {
//     user.is_active = !user.is_active;
//     setOpenMenu(null);
//   };

//   const handleEdit = (username) => {
//     alert(`Edit user: ${username}`);
//     setOpenMenu(null);
//   };
//   async function getUsersProfilesById(id) {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     throw new Error("No token found. User might not be logged in.");
//   }
//   const response = await fetch(`http://localhost:8000/api/users/admin/profiles/${id}`, {
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `JWT ${token}`,
//       }
//     })

//   if (!response.ok) {
//     throw new Error("unable to get users");
//   }

  
//   const data = await response.json();
//   console.log(data);
//   return data;
// }

//   return (
//     <div className="bg-[#EAEAEA] min-h-screen px-8 py-10">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold text-[#193042]">Board Members Management</h1>
//         <button className="bg-[#193042] text-white py-2 px-6 rounded-md shadow-md hover:bg-[#234b6a] transition-colors">
//           + Add Board Member
//         </button>
//       </div>

//       {/* Users Table */}
//       <div className="overflow-x-auto bg-white rounded-lg shadow-md">
//         <table className="min-w-full text-left border-collapse">
//           <thead className="bg-[#193042] text-white">
//             <tr>
//               <th className="py-3 px-5 border-b border-gray-200">Username</th>
//               <th className="py-3 px-5 border-b border-gray-200">Is Superuser</th>
//               <th className="py-3 px-5 border-b border-gray-200">Is Active</th>
//               <th className="py-3 px-5 border-b border-gray-200">Is Member</th>
//               <th className="py-3 px-5 border-b border-gray-200 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bmembers.length > 0 ? (
//               bmembers.map((u, idx) => (
//                 <tr
//                   key={idx}
//                   className="hover:bg-gray-50 transition-colors border-b last:border-0"
//                 >
//                   <td className="py-3 px-5">{u.username}</td>
//                   <td className="py-3 px-5">
//                     {u.is_superuser ? (
//                       <span className="text-green-600 font-semibold">Yes</span>
//                     ) : (
//                       <span className="text-gray-500">No</span>
//                     )}
//                   </td>
//                   <td className="py-3 px-5">
//                     {u.is_active ? (
//                       <span className="text-green-600 font-semibold">Active</span>
//                     ) : (
//                       <span className="text-red-500 font-semibold">Inactive</span>
//                     )}
//                   </td>
//                   <td className="py-3 px-5">
//                     {u.is_member ? (
//                       <span className="text-green-600 font-semibold">Yes</span>
//                     ) : (
//                       <span className="text-gray-500">No</span>
//                     )}
//                   </td>
//                   <td className="py-3 px-5 text-center relative">
//                     <button
//                       onClick={() =>
//                         setOpenMenu(openMenu === u.username ? null : u.username)
//                       }
//                       className="bg-[#193042] text-white px-4 py-2 rounded-md hover:bg-[#234b6a] transition"
//                     >
//                       Options ▾
//                     </button>

//                     {/* Dropdown menu */}
//                     {openMenu === u.username && (
//                       <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
//                         <button
//                           onClick={() => handleEdit(u.username)}
//                           className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                         >
//                           ✏️ Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(u)}
//                           className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
//                         >
//                           {u.is_active ? '🗑️ Delete' : '✏️ Add'}
//                         </button>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="5"
//                   className="text-center py-6 text-gray-500 italic"
//                 >
//                   No board Members available.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default BoardMembers;
