// import { useEffect, useState } from "react";
// import { useAuth } from "../../data/AuthContext";
// import { getUsers } from "../../services/authService";
// function Users() {
//   const auth = useAuth();
//   const [users, setUsers] = useState([]);

//   useEffect(  () => {
//     const  fetchData = async () =>{ 
//       try{
//         const data = await getUsers();
//         console.log(data);
        
//         setUsers(data);
//       }catch(error){
//         console.log(error);
//       }
//     }
//   fetchData();
//   },[]);


//   return (
//     <div className="bg-[#f8f9fa]  min-h-screen px-8 py-10">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold text-[#193042]">User Management</h1>
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
//             </tr>
//           </thead>
//           <tbody>
//             {users.length > 0 ? (
//               users.map((u, idx) => (
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
                  
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="5"
//                   className="text-center py-6 text-gray-500 italic"
//                 >
//                   No users available.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Users;

import { useEffect, useState } from "react";
import { useAuth } from "../../data/AuthContext";
import { Search, Users as UsersIcon, XCircle } from "lucide-react";
import { getUsers } from "../../services/authService";

function Users() {
  const auth = useAuth();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // New Filters
  const [staffFilter, setStaffFilter] = useState("all"); // all | active | inactive
  const [memberFilter, setMemberFilter] = useState("all"); // all | yes | no

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // APPLY FILTERS + SEARCH
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username?.toLowerCase().includes(searchQuery.toLowerCase());
    // const matchesId =
    //   user.id === searchQuery;
    

    const matchesStatus =
      staffFilter === "all"
        ? true
        : staffFilter === "yes"
        ? user.is_staff === true
        : user.is_staff === false;

    const matchesMember =
      memberFilter === "all"
        ? true
        : memberFilter === "yes"
        ? user.is_member === true
        : user.is_member === false;

    return matchesSearch &&  matchesStatus && matchesMember;
  });

  // RESET FILTERS
  const resetFilters = () => {
    setMemberFilter("all");
    setStaffFilter("all");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#193042] mb-2">
              User Management
            </h1>
            <p className="text-gray-600">
              Manage registered users ({filteredUsers.length})
            </p>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 space-y-4">
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-2 pl-10 focus:ring-2 focus:ring-[#193042] focus:border-transparent outline-none"
            />
          </div>

          {/* FILTERS */}
          <div className="flex flex-wrap gap-3">

            {/* STATUS FILTER */}
            <select
              value={staffFilter}
              onChange={(e) => setStaffFilter(e.target.value)}
              className="border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-[#193042]"
            >
              <option value="all">All Users</option>
              <option value="yes">Staff Users</option>
              <option value="no">UnStaff Users</option>
            </select>

            {/* MEMBER FILTER */}
            <select
              value={memberFilter}
              onChange={(e) => setMemberFilter(e.target.value)}
              className="border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-[#193042]"
            >
              <option value="all">All Members</option>
              <option value="yes">Members</option>
              <option value="no">Non-Members</option>
            </select>

            {/* RESET BUTTON */}
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 bg-red-100 text-red-600 px-3 py-2 rounded-lg hover:bg-red-200 transition"
            >
              <XCircle size={18} /> Reset
            </button>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((u, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-t-4 border-[#193042]"
              >
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#193042] mb-2">
                    ID: {u.id}
                  </h3>
                  <h3 className="text-lg font-bold text-[#193042] mb-2">
                    {u.username}
                  </h3>

                  <div className="space-y-2 text-gray-700">
                    
                    <p>
                      <strong>Member:</strong>{" "}
                      {u.is_member ? (
                        <span className="text-green-600 font-semibold">Yes</span>
                      ) : (
                        <span className="text-gray-500">No</span>
                      )}
                    </p>
                    <p>
                      <strong>Staff:</strong>{" "}
                      {u.is_staff ? (
                        <span className="text-green-600 font-semibold">Yes</span>
                      ) : (
                        <span className="text-gray-500">No</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <UsersIcon className="mx-auto text-gray-300 mb-4" size={64} />
              <p className="text-gray-500 text-lg">No users found</p>
            </div>
          )}
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-[#193042] to-[#254e6f] text-white">
              <tr>
                <th className="py-3 px-10 font-semibold text-center">Id</th>
                <th className="py-3 px-10 font-semibold text-center">Username</th>
                <th className="py-3 px-10 font-semibold text-center">Member</th>
                <th className="py-3 px-10 font-semibold text-center">Staff</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors border-b last:border-0">
                    <td className="py-3 px-6 font-medium">{u.id}</td>
                    <td className="py-3 px-6 font-medium">{u.username}</td>
                    <td className="py-3 px-6 text-center">
                      {u.is_member ? (
                        <span className="text-green-600 font-semibold">Yes</span>
                      ) : (
                        <span className="text-gray-500">No</span>
                      )}
                    </td>

                    <td className="py-3 px-6 text-center">
                      {u.is_superuser ? (
                        <span className="text-green-600 font-semibold">Yes</span>
                      ) : (
                        <span className="text-gray-500">No</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-12">
                    <UsersIcon className="mx-auto text-gray-300 mb-4" size={64} />
                    <p className="text-gray-500 text-lg">No users found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Users;
