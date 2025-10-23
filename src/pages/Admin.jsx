import { Link } from "react-router-dom";

function Admin() {
  const menuItems = [
    { name: "Users", path: "/admin/users" },
    { name: "User Profiles", path: "/admin/profiles" },
    { name: "Board Members", path: "/admin/board-members" },
    { name: "Email Notifications", path: "/admin/email-notifications" },
    { name: "Membership Requests", path: "/admin/membership-requests" },
    { name: "Airport Pickup Requests", path: "/admin/airport-pickup" },
    { name: "Posts", path: "/news" },
    { name: "Events", path: "/events" },
  ];

  return (
    <div className="bg-[#D9D9D9] min-h-screen flex flex-col items-center py-10">
      <h1 className="text-2xl text-[#912211] mb-8">Admin Panel</h1>

      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl px-6">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="bg-[#193042] text-white py-4 px-6 rounded-md shadow-md flex justify-between items-center hover:bg-[#234b6a] transition"
          >
            <span>{item.name}</span>
            <span className="text-xl">{">"}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Admin;
