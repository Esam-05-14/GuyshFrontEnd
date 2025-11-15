// src/pages/AirportPickupFormList.jsx
import React, { useEffect, useState } from "react";
import { getMyAirportPickupForms } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../data/AuthContext";
import { useTranslation } from "react-i18next";

export default function AirportPickupFormList() {
  const { t } = useTranslation();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isLoggedIn, activeAirport } = useAuth();

  const navigate = useNavigate();
  if(activeAirport === false){
    return (
      <AccessMessage
        title={t("airport_form.not_available")}
        message={t("airport_form.access.not_available")}
        buttonText={t("airport_form.access.go_home")}
        onButtonClick={() => navigate("/")}
      />
    );
  }

  if (!isLoggedIn) {
    return (
      <AccessMessage
        title={t("airport_form.access.login_required_title")}
        message={t("airport_form.access.login_required_msg")}
        buttonText={t("airport_form.access.go_login")}
        onButtonClick={() => navigate("/login")}
      />
    );
  }

  if (!user.roles?.is_active) {
    return (
      <AccessMessage
        title={t("airport_form.access.account_pending_title")}
        message={t("airport_form.access.account_pending_msg")}
        buttonText={t("airport_form.access.back_home")}
        onButtonClick={() => navigate("/")}
      />
    );
  }

  if (user.roles?.is_member) {
    return (
      <AccessMessage
        title={t("airport_form.access.service_unavailable_title")}
        message={t("airport_form.access.service_unavailable_msg")}
        buttonText={t("airport_form.access.go_home")}
        onButtonClick={() => navigate("/")}
      />
    );
  }

  useEffect(() => {
    async function fetchForms() {
      try {
        const data = await getMyAirportPickupForms();
        const withIds = data.map((f, i) => ({ ...f, id: i + 1 }));
        setForms(withIds);
      } catch (err) {
        setError(t("airport_form.list.load_error"));
      } finally {
        setLoading(false);
      }
    }
    fetchForms();
  }, [t]);

  if (loading)
    return (
      <div className="text-center mt-10 text-gray-600 animate-pulse">
        {t("airport_form.list.loading")}
      </div>
    );

  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-[#193042] mb-6 text-center">
        {t("airport_form.list.title")}
      </h1>

      {forms.length === 0 ? (
        <div className="text-center text-gray-600">
          {t("airport_form.list.no_requests")}
          <button
            onClick={() => navigate("/services/airport-form")}
            className="ml-2 text-blue-600 underline hover:text-blue-800"
          >
            {t("airport_form.list.create_one")}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {forms.map((form) => (
            <div
              key={form.id}
              className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium text-gray-800">
                  {form.airport} → {form.destination}
                </h3>
                <p className="text-sm text-gray-600">
                  {t("airport_form.list.arrival")}{" "}
                  {new Date(form.arrival_time).toLocaleString("en-GB", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <StatusBadge status={form.status} />
                <button
                  onClick={() =>
                    navigate(`/my-airport-forms/edit/${form.id}`, {
                      state: { form },
                    })
                  }
                  className="text-sm text-blue-600 underline hover:text-blue-800"
                >
                  {t("airport_form.list.view_edit")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const { t } = useTranslation();
  const map = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
        map[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {t(`airport_form.status.${status}`)}
    </span>
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


// // src/pages/AirportPickupFormList.jsx
// import React, { useEffect, useState } from "react";
// import { getMyAirportPickupForms } from "../services/authService";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../data/AuthContext";

// export default function AirportPickupFormList() {
//   const [forms, setForms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { user, isLoggedIn } = useAuth();
  
//   const navigate = useNavigate();
  
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
//         buttonText="Go to Home"
//         onButtonClick={() => navigate("/")}
//       />
//     );
//   }

//   useEffect(() => {
//     async function fetchForms() {
//       try {
//         const data = await getMyAirportPickupForms();
//         const withIds = data.map((f, i) => ({ ...f, id: i + 1 }));

//         setForms(withIds);
//       } catch (err) {
//         setError("Failed to load your requests. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchForms();
//   }, []);
  
  

//   if (loading)
//     return (
//       <div className="text-center mt-10 text-gray-600 animate-pulse">
//         Loading your requests...
//       </div>
//     );

//   if (error)
//     return <p className="text-center mt-10 text-red-500">{error}</p>;

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-2xl font-semibold text-[#193042] mb-6 text-center">
//         My Airport Pickup Requests
//       </h1>

//       {forms.length === 0 ? (
//         <div className="text-center text-gray-600">
//           You haven’t made any pickup requests yet.
//           <button
//             onClick={() => navigate("/services/airport-form")}
//             className="ml-2 text-blue-600 underline hover:text-blue-800"
//           >
//             Create one now
//           </button>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {forms.map((form) => (
//             <div
//               key={form.id}
//               className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 flex justify-between items-center"
//             >
//               <div>
//                 <h3 className="font-medium text-gray-800">
//                   {form.airport} → {form.destination}
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   Arrival:{" "}
//                   {new Date(form.arrival_time).toLocaleString("en-GB", {
//                     dateStyle: "medium",
//                     timeStyle: "short",
//                   })}
//                 </p>
//               </div>

//               <div className="flex flex-col items-end gap-2">
//                 <StatusBadge status={form.status} />
//                 <button
//                   onClick={() =>
//                     navigate(`/my-airport-forms/edit/${form.id}`, {
//                       state: { form },
//                     })
//                   }
//                   className="text-sm text-blue-600 underline hover:text-blue-800"
//                 >
//                   View / Edit
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// function StatusBadge({ status }) {
//   const map = {
//     pending: "bg-yellow-100 text-yellow-800",
//     approved: "bg-green-100 text-green-800",
//     rejected: "bg-red-100 text-red-800",
//   };
//   return (
//     <span
//       className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
//         map[status] || "bg-gray-100 text-gray-700"
//       }`}
//     >
//       {status}
//     </span>
//   );
// }
// function AccessMessage({ title, message, buttonText, onButtonClick }) {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-4">
//       <div className="bg-white shadow-md rounded-xl p-8 text-center max-w-md">
//         <h2 className="text-2xl font-bold text-[#193042] mb-3">{title}</h2>
//         <p className="text-gray-600 mb-6">{message}</p>
//         <button
//           onClick={onButtonClick}
//           className="bg-[#193042] text-white px-6 py-2 rounded-lg hover:bg-[#102130] transition"
//         >
//           {buttonText}
//         </button>
//       </div>
//     </div>
//   );
// }
