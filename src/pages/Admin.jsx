import { Link } from "react-router-dom";
import { useAuth } from "../data/AuthContext";

function Admin() {
  const {user} = useAuth();

  const isAdmin = user?.roles?.is_superuser;
  const superItems = [
    { name: "Users", path: "/admin/users" },
    { name: "User Profiles", path: "/admin/profiles" },
    { name: "Board Members", path: "/admin/board-members" },
    { name: "Email Notifications", path: "/admin/email-notifications" },
    { name: "Membership Requests", path: "/admin/membership-requests" },
    { name: "Airport Pickup Requests", path: "/admin/airport-pickup" },
    { name: "Posts", path: "/admin/news" },
    { name: "Events", path: "/admin/events" },
  ];
  const officerItems = [
    { name: "Email Notifications", path: "/admin/email-notifications" },
    { name: "Posts", path: "/admin/news" },
    { name: "Events", path: "/admin/events" },
  ];

  return (
    <div className="bg-[#D9D9D9] min-h-screen flex flex-col items-center py-10">
      <h1 className="text-2xl text-[#912211] mb-8">Admin Panel</h1>

      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl px-6">
        {isAdmin ?  superItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="bg-[#193042] text-white py-4 px-6 rounded-md shadow-md flex justify-between items-center hover:bg-[#234b6a] transition"
          >
            <span>{item.name}</span>
            <span className="text-xl">{">"}</span>
          </Link>
        )) : 
        officerItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="bg-[#193042] text-white py-4 px-6 rounded-md shadow-md flex justify-between items-center hover:bg-[#234b6a] transition"
          >
            <span>{item.name}</span>
            <span className="text-xl">{">"}</span>
          </Link>
        ))
        }
      </div>
    </div>
  );
}

export default Admin;
