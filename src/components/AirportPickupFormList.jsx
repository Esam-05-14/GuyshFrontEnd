// src/pages/AirportPickupFormList.jsx
import React, { useEffect, useState } from "react";
import { getMyAirportPickupForms } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function AirportPickupFormList() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchForms() {
      try {
        const data = await getMyAirportPickupForms();
        setForms(data);
      } catch (err) {
        setError("Failed to load your requests. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchForms();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-10 text-gray-600 animate-pulse">
        Loading your requests...
      </div>
    );

  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-[#193042] mb-6 text-center">
        My Airport Pickup Requests
      </h1>

      {forms.length === 0 ? (
        <div className="text-center text-gray-600">
          You haven’t made any pickup requests yet.
          <button
            onClick={() => navigate("/services/airport-form")}
            className="ml-2 text-blue-600 underline hover:text-blue-800"
          >
            Create one now
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
                  Arrival:{" "}
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
                    navigate(`/my-airport-forms/${form.id}/edit`, {
                      state: { form },
                    })
                  }
                  className="text-sm text-blue-600 underline hover:text-blue-800"
                >
                  View / Edit
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
      {status}
    </span>
  );
}
