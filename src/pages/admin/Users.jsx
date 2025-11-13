import { useEffect, useState } from "react";
import { useAuth } from "../../data/AuthContext";
import { getUsers } from "../../services/authService";
function Users() {
  const auth = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(  () => {
    const  fetchData = async () =>{ 
      try{
        const data = await getUsers();
        console.log(data);
        
        setUsers(data);
      }catch(error){
        console.log(error);
      }
    }
  fetchData();
  },[]);


  return (
    <div className="bg-[#f8f9fa]  min-h-screen px-8 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#193042]">User Management</h1>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-[#193042] text-white">
            <tr>
              <th className="py-3 px-5 border-b border-gray-200">Username</th>
              <th className="py-3 px-5 border-b border-gray-200">Is Superuser</th>
              <th className="py-3 px-5 border-b border-gray-200">Is Active</th>
              <th className="py-3 px-5 border-b border-gray-200">Is Member</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 transition-colors border-b last:border-0"
                >
                  <td className="py-3 px-5">{u.username}</td>
                  <td className="py-3 px-5">
                    {u.is_superuser ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-gray-500">No</span>
                    )}
                  </td>
                  <td className="py-3 px-5">
                    {u.is_active ? (
                      <span className="text-green-600 font-semibold">Active</span>
                    ) : (
                      <span className="text-red-500 font-semibold">Inactive</span>
                    )}
                  </td>
                  <td className="py-3 px-5">
                    {u.is_member ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-gray-500">No</span>
                    )}
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

export default Users;
