import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getAirportPickipRequests_Admin,
  getAirportPickipRequestsById_Admin,
  getUsersProfiles_id,
  updataAirportPickipRequestsById_Admin,
} from "../../services/authService";

export default function AdminAirportPickupRequests() {
  const { t, i18n } = useTranslation();
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState("");
  const [updating, setUpdating] = useState(false);
  const [user, setUser] = useState(null);

  const isRTL = i18n.language === "ar";

  // Fetch all requests
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAirportPickipRequests_Admin();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching airport pickup requests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fetch details by ID
  const handleViewDetails = async (id) => {
    setDetailsLoading(true);
    try {
      const data = await getAirportPickipRequestsById_Admin(id);
      // const user_det = await getUsersProfiles_id(id)
      // setUser(user_det)
      // console.log(user_det);
      
      setSelectedRequest(data);
      setStatusUpdate(data.status);
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setDetailsLoading(false);
    }
  };

  // Update request status
  const handleStatusUpdate = async () => {
    if (!selectedRequest) return;

    setUpdating(true);
    try {
      await updataAirportPickipRequestsById_Admin(selectedRequest.id, {
        status: statusUpdate,
      }).then(console.log("Succesfully update")
      ).catch(err => console.log("undble to update")
      );

      // Update in the main list
      setRequests((prev) =>
        prev.map((req) =>
          req.id === selectedRequest.id ? { ...req, status: statusUpdate } : req
        )
      );

      setSelectedRequest((prev) => ({
        ...prev,
        status: statusUpdate,
      }));
    } catch (error) {
      console.error("Error updating request:", error);
      alert(t("Admin_AirportRequests.Failed to update status"));
    } finally {
      setUpdating(false);
    }
  };

  // Status color helper
  const statusColor = (status) => {
    switch (status) {
      case "approved":
        return "text-green-600";
      case "rejected":
        return "text-red-600";
      default:
        return "text-yellow-600";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        {t("Admin_AirportRequests.Loading airport pickup requests...")}
      </div>
    );
  }

  return (
    <div
      className={`p-6 bg-gray-100 min-h-screen ${
        isRTL ? "text-right" : "text-left"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <h1 className="text-2xl font-semibold mb-6 text-[#193042]">
        {t("Admin_AirportRequests.Airport Pickup Requests")}
      </h1>

      {requests.length === 0 ? (
        <p className="text-gray-600">{t("Admin_AirportRequests.No requests found.")}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-[#193042] text-white">
              <tr>
                <th className="py-3 px-4">{t("Admin_AirportRequests.ID")}</th>
                <th className="py-3 px-4">{t("Admin_AirportRequests.User ID")}</th>
                <th className="py-3 px-4">{t("Admin_AirportRequests.Airport")}</th>
                <th className="py-3 px-4">{t("Admin_AirportRequests.Destination")}</th>
                <th className="py-3 px-4">{t("Admin_AirportRequests.Arrival Time")}</th>
                <th className="py-3 px-4">{t("Admin_AirportRequests.Status")}</th>
                <th className="py-3 px-4">{t("Admin_AirportRequests.Actions")}</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{req.id}</td>
                  <td className="py-2 px-4">{req.user}</td>
                  <td className="py-2 px-4">{req.airport}</td>
                  <td className="py-2 px-4">{req.destination}</td>
                  <td className="py-2 px-4">
                    {new Date(req.arrival_time).toLocaleString()}
                  </td>
                  <td className={`py-2 px-4 font-semibold ${statusColor(req.status)}`}>
                    {t(req.status)}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-[#6e9225] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#254e6f] transition"
                      onClick={() => handleViewDetails(req.id)}
                    >
                      {t("Admin_AirportRequests.View Details")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <button
              onClick={() => setSelectedRequest(null)}
              className="absolute top-3 right-4 text-gray-600 text-xl hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4 text-[#193042]">
              {t("Admin_AirportRequests.Request Details")}
            </h2>

            {detailsLoading ? (
              <p>{t("Admin_AirportRequests.Loading details...")}</p>
            ) : (
              <div className="space-y-2">
                <p>
                  <strong>{t("Admin_AirportRequests.Request ID")}:</strong> {selectedRequest.id}
                </p>
                <p>
                  <strong>{t("Admin_AirportRequests.User ID")}:</strong> {selectedRequest.id}
                </p>
                <p>
                  <strong>{t("Admin_AirportRequests.Airport")}:</strong> {selectedRequest.airport}
                </p>
                <p>
                  <strong>{t("Admin_AirportRequests.Destination")}:</strong>{" "}
                  {selectedRequest.destination}
                </p>
                <p>
                  <strong>{t("Admin_AirportRequests.Arrival Time")}:</strong>{" "}
                  {new Date(selectedRequest.arrival_time).toLocaleString()}
                </p>
                <p>
                  <strong>{t("Admin_AirportRequests.In Dormitory")}:</strong>{" "}
                  {selectedRequest.in_dormitory ? t("Yes") : t("No")}
                </p>
                <p>
                  <strong>{t("Admin_AirportRequests.Status")}:</strong>{" "}
                  <span className={statusColor(selectedRequest.status)}>
                    {t(selectedRequest.status)}
                  </span>
                </p>

                {/* Status update dropdown */}
                <div className="mt-4">
                  <label className="font-medium mr-2">
                    {t("Admin_AirportRequests.Change Status")}:
                  </label>
                  <select
                    value={statusUpdate}
                    onChange={(e) => setStatusUpdate(e.target.value)}
                    className="border rounded-md px-3 py-1"
                  >
                    <option value="pending">{t("pending")}</option>
                    <option value="approved">{t("approved")}</option>
                    <option value="rejected">{t("rejected")}</option>
                  </select>
                  <button
                    onClick={handleStatusUpdate}
                    disabled={updating}
                    className="ml-3 bg-[#193042] text-white px-4 py-1 rounded-md hover:bg-[#254e6f] transition disabled:opacity-50"
                  >
                    {updating
                      ? t("Admin_AirportRequests.Updating...")
                      : t("Admin_AirportRequests.Save")}
                  </button>
                </div>

                <p>
                  <strong>{t("Admin_AirportRequests.Created At")}:</strong>{" "}
                  {new Date(selectedRequest.timestamp).toLocaleString()}
                </p>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedRequest(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
              >
                {t("Admin_AirportRequests.Close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
