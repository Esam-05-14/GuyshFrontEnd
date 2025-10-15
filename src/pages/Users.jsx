import { useState } from "react";
import { useAuth } from "../data/AuthContext";
function Users() {
  // const [users, setUsers] = useState([
  //   { username: "John_Doe_123456", password: "1234567890", permissions: "All", isActive: "Yes", isMember: "Yes" },
  //   { username: "Jane_Doe_654321", password: "0987654321", permissions: "All", isActive: "Yes", isMember: "No" },
  //   { username: "Mark_Smith_999", password: "123123123", permissions: "Read", isActive: "No", isMember: "Yes" },
  // ]);
  const auth = useAuth()
  const users = auth.users


  const [open, setOpen] = useState(false);


  const handleDelete = (username) => {
    setUsers(users.filter((u) => u.username !== username));
  };

  

  return (
    <div className="bg-[#D9D9D9] min-h-screen px-8 py-10">
      {/* Create button */}
      <div className="flex justify-start mb-6">
        <button className="bg-[#193042] text-white py-2 px-6 rounded-md shadow hover:bg-[#234b6a]">
          Create &gt;
        </button>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-100 text-[#193042] text-left">
              <th className="py-3 px-4 border-b">Usernames</th>
              <th className="py-3 px-4 border-b">Passwords</th>
              <th className="py-3 px-4 border-b">Permissions</th>
              <th className="py-3 px-4 border-b">Is_Active</th>
              <th className="py-3 px-4 border-b">Is_Member</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{u.username}</td>
                <td className="py-3 px-4 border-b">{u.password}</td>
                <td className="py-3 px-4 border-b">{u.permissions}</td>
                <td className="py-3 px-4 border-b">{u.isActive}</td>
                <td className="py-3 px-4 border-b">{u.isMember}</td>
                <td className="py-3 px-4 border-b">
                  <div className="relative inline-block text-left">
                    <button
                      onClick={() => setOpen(!open)}
                      className="bg-[#193042] text-white px-4 py-2 rounded"
                    >
                      Options
                    </button>

                    {open && (
                      <select className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                        <option
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => alert(`Edit ${u.username}`)}
                        >
                          Edit
                        </option>
                        <option
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleDelete(u.username)}
                        >
                          Delete
                        </option>
                      </select>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
