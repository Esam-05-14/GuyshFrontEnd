import React, { useState } from "react";
import { airportPickupRequest } from "../services/authService";
import { useAuth } from "../data/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function AirportPickupForm() {

  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  
  const [formData, setFormData] = useState({
    status: "pending",
    airport: "",
    destination: "",
    date: "",
    time: "",
    in_dormitory: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine date + time into ISO datetime format expected by backend
    const arrival_time = `${formData.date}T${formData.time}:00Z`;

    const requestBody = {
      status: formData.status,
      airport: formData.airport,
      destination: formData.destination,
      arrival_time,
      in_dormitory: formData.in_dormitory,
    };

    console.log("Request Body:", requestBody);

    try {
      await airportPickupRequest(requestBody);
      alert("Airport pickup request submitted successfully!");
    } catch (error) {
      console.error("Error submitting airport pickup request:", error);
      alert("Failed to submit airport pickup request. Please try again.");
    }
  };

  
  if (!isLoggedIn) {
    return (
      <AccessMessage
        title="Login Required"
        message="You need to log in to access the Airport Pickup Request form."
        buttonText="Go to Login"
        onButtonClick={() => navigate("/login")}
      />
    );
  }

  if (!user.roles?.is_active) {
    return (
      <AccessMessage
        title="Account Pending Activation"
        message="Your account is not yet active. Once your registration is approved, you can request an airport pickup."
        buttonText="Back to Home"
        onButtonClick={() => navigate("/")}
      />
    );
  }

  if (user.roles?.is_member) {
    return (
      <AccessMessage
        title="Service Not Available"
        message="This service is available only for new incoming students who are not yet members."
        buttonText="Go to Home"
        onButtonClick={() => navigate("/")}
      />
    );
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-[#193042] p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-semibold text-center mb-4">
          Add Airport Pickup Form
        </h1>

        {/* Airport */}
        <div>
          <label className="block text-sm font-medium mb-2">Airport:</label>
          <select
            name="airport"
            value={formData.airport}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select airport</option>
            <option value="BUD">Budapest Airport</option>
            <option value="DEB">Debrecen Airport</option>
          </select>
        </div>

        {/* Destination */}
        <div>
          <label className="block text-sm font-medium mb-2">Destination:</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Enter destination"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Arrival Time */}
        <div>
          <label className="block text-sm font-medium mb-2">Arrival time:</label>
          <div className="flex gap-3">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="flex-1 p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="flex-1 p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Note: You are 2 hours ahead of server time.
          </p>
        </div>

        {/* In Dormitory */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="in_dormitory"
            checked={formData.in_dormitory}
            onChange={handleChange}
            className="w-4 h-4 accent-blue-500"
          />
          <label className="text-sm">In dormitory</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-medium"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

function AccessMessage({ title, message, buttonText, onButtonClick }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 text-center max-w-md">
        <h2 className="text-2xl font-bold text-[#193042] mb-3">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onButtonClick}
          className="bg-[#193042] text-white px-6 py-2 rounded-lg hover:bg-[#102130] transition"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}


// import React, { useEffect, useState } from "react";
// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import { createAirportPickupForm, updateAirportPickupForm, getAirportPickupForm } from "../services/authService";
// import { useAuth } from "../data/AuthContext";

// function blankForm() {
//   return {
//     status: "pending",
//     airport: "",
//     destination: "",
//     date: "",
//     time: "",
//     in_dormitory: false,
//   };
// }

// export default function AirportPickupFormEdit() {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const initial = location.state?.form || null;
//   const { user, isLoggedIn } = useAuth();


//   const [form, setForm] = useState(initial ? mapServerToForm(initial) : blankForm());
//   const [loading, setLoading] = useState(!initial && !!id);
//   const [submitting, setSubmitting] = useState(false);

  
//   useEffect(() => {
//     if (id && !initial) {
//       getAirportPickupForm(id).then(f => { setForm(mapServerToForm(f)); setLoading(false);} ).catch(()=>setLoading(false));
//     }
//   }, [id, initial]);

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     const payload = {
//       status: form.status, // usually "pending"
//       airport: form.airport,
//       destination: form.destination,
//       arrival_time: `${form.date}T${form.time}:00Z`,
//       in_dormitory: form.in_dormitory
//     };
//     try {
//       if (id) {
//         await updateAirportPickupForm(id, payload);
//         alert("Updated");
//       } else {
//         await createAirportPickupForm(payload);
//         alert("Created");
//       }
//       navigate('/my-airport-forms');
//     } catch(err) {
//       alert(err.message || "Failed");
//     } finally { setSubmitting(false); }
//   };

//   if (!isLoggedIn) {
//     return (
//       <AccessMessage
//         title="Login Required"
//         message="You need to log in to access the Airport Pickup Request form."
//         buttonText="Go to Login"
//         onButtonClick={() => navigate("/login")}
//       />
//     );
//   }

//   if (!user.roles?.is_active) {
//     return (
//       <AccessMessage
//         title="Account Pending Activation"
//         message="Your account is not yet active. Once your registration is approved, you can request an airport pickup."
//         buttonText="Back to Home"
//         onButtonClick={() => navigate("/")}
//       />
//     );
//   }

//   if (user.roles?.is_member) {
//     return (
//       <AccessMessage
//         title="Service Not Available"
//         message="This service is available only for new incoming students who are not yet members."
//         buttonText="Go to Dashboard"
//         onButtonClick={() => navigate("/dashboard")}
//       />
//     );
//   }
// return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-[#193042] p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
//       >
//         <h1 className="text-2xl font-semibold text-center mb-4">
//           Add Airport Pickup Form
//         </h1>

//         {/* Airport */}
//         <div>
//           <label className="block text-sm font-medium mb-2">Airport:</label>
//           <select
//             name="airport"
//             value={formData.airport}
//             onChange={handleChange}
//             className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           >
//             <option value="">Select airport</option>
//             <option value="BUD">Budapest Airport</option>
//             <option value="DEB">Debrecen Airport</option>
//           </select>
//         </div>

//         {/* Destination */}
//         <div>
//           <label className="block text-sm font-medium mb-2">Destination:</label>
//           <input
//             type="text"
//             name="destination"
//             value={formData.destination}
//             onChange={handleChange}
//             placeholder="Enter destination"
//             className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         {/* Arrival Time */}
//         <div>
//           <label className="block text-sm font-medium mb-2">Arrival time:</label>
//           <div className="flex gap-3">
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               className="flex-1 p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//             <input
//               type="time"
//               name="time"
//               value={formData.time}
//               onChange={handleChange}
//               className="flex-1 p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <p className="text-sm text-gray-400 mt-1">
//             Note: You are 2 hours ahead of server time.
//           </p>
//         </div>

//         {/* In Dormitory */}
//         <div className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             name="in_dormitory"
//             checked={formData.in_dormitory}
//             onChange={handleChange}
//             className="w-4 h-4 accent-blue-500"
//           />
//           <label className="text-sm">In dormitory</label>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-medium"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
  
//   // render form similar to earlier
// }
