// src/pages/AirportPickupFormEdit.jsx
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  getAirportPickupForm,
  createAirportPickupForm,
  updateAirportPickupForm,
} from "../services/authService";

export default function AirportPickupFormEdit() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const existingForm = location.state?.form || null;

  const [form, setForm] = useState(
    existingForm
      ? mapServerToForm(existingForm)
      : {
          airport: "",
          destination: "",
          date: "",
          time: "",
          in_dormitory: false,
          status: "pending",
        }
  );
  const [loading, setLoading] = useState(!!id && !existingForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const isEditing = !!id;
  const readOnly = form.status === "approved";

  useEffect(() => {
    if (id && !existingForm) {
      (async () => {
        try {
          const data = await getAirportPickupForm(id);
          setForm(mapServerToForm(data));
        } catch {
          setError("Failed to load form details.");
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id, existingForm]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload = {
      status: form.status,
      airport: form.airport,
      destination: form.destination,
      arrival_time: `${form.date}T${form.time}:00Z`,
      in_dormitory: form.in_dormitory,
    };

    try {
      if (isEditing) {
        await updateAirportPickupForm(id, payload);
        alert("Form updated successfully!");
      } else {
        await createAirportPickupForm(payload);
        alert("Form submitted successfully!");
      }
      navigate("/my-airport-forms");
    } catch (err) {
      setError(err.message || "Submission failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-md mt-6">
      <h2 className="text-xl font-semibold text-[#193042] mb-4 text-center">
        {isEditing ? "Edit Pickup Request" : "Create Pickup Request"}
      </h2>

      {readOnly && (
        <p className="text-sm text-green-700 text-center mb-4">
          This request has been approved and can no longer be modified.
        </p>
      )}

      {error && (
        <div className="mb-4 text-red-600 bg-red-50 p-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Airport
          </label>
          <input
            name="airport"
            value={form.airport}
            onChange={handleChange}
            disabled={readOnly}
            required
            className="w-full mt-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Destination
          </label>
          <input
            name="destination"
            value={form.destination}
            onChange={handleChange}
            disabled={readOnly}
            required
            className="w-full mt-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Arrival Date
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              disabled={readOnly}
              required
              className="w-full mt-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Arrival Time
            </label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              disabled={readOnly}
              required
              className="w-full mt-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="in_dormitory"
            checked={form.in_dormitory}
            onChange={handleChange}
            disabled={readOnly}
          />
          <span className="text-sm text-gray-700">
            Already living in dormitory
          </span>
        </label>

        {!readOnly && (
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-2 rounded-md text-white font-semibold transition-all duration-300 ${
              submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#193042] hover:bg-[#284b68]"
            }`}
          >
            {submitting ? "Saving..." : "Save Changes"}
          </button>
        )}
      </form>
    </div>
  );
}

function mapServerToForm(f) {
  const [date, time] = f.arrival_time
    ? f.arrival_time.split("T")
    : ["", ""];
  return {
    airport: f.airport,
    destination: f.destination,
    date,
    time: time ? time.slice(0, 5) : "",
    in_dormitory: f.in_dormitory,
    status: f.status,
  };
}
