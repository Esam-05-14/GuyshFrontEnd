import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  UserCheck,
  UserX,
  Clock,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Filter
} from "lucide-react";
// import { getMembershipRequests, getMembershipRequestById, updateMembershipRequestStatus } from "../../services/authService";
import { getMembershipRequestsById_Admin, getMembershipRequests_Admin, updataMembershipRequestsById_Admin } from "../../services/authService";
export default function AdminMembershipRequests() {
  const { t, i18n } = useTranslation();
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState("");
  const [updating, setUpdating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const isRTL = i18n.language === "ar";

  // Fetch all membership requests
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMembershipRequests_Admin();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching membership requests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter requests
  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.id.toString().includes(searchQuery) ||
                         request.user.toString().includes(searchQuery);
    
    const matchesStatus = 
      statusFilter === "all" ? true :
      statusFilter === request.status;
    
    return matchesSearch && matchesStatus;
  });

  // Fetch details by ID
  const handleViewDetails = async (id) => {
    setDetailsLoading(true);
    try {
      const data = await getMembershipRequestsById_Admin(id);
      //const data = requests.find(req => req.id === id);
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
      await updataMembershipRequestsById_Admin(selectedRequest.id, { status: statusUpdate });
      
      console.log("Successfully updated");

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

      alert(t("membershipRequests.statusUpdated"));
    } catch (error) {
      console.error("Error updating request:", error);
      alert(t("membershipRequests.updateFailed"));
    } finally {
      setUpdating(false);
    }
  };

  // Status color helper
  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle size={16} />;
      case "rejected":
        return <XCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#193042] mx-auto"></div>
          <p className="mt-4 text-gray-600">{t("membershipRequests.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#193042] mb-2">
            {t("membershipRequests.title")}
          </h1>
          <p className="text-gray-600">
            {t("membershipRequests.subtitle")} ({filteredRequests.length} {t("membershipRequests.requests")})
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className={`bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-4 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
          {/* Search */}
          <div className="flex-1 relative">
            <Search className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRTL ? "right-3" : "left-3"}`} size={20} />
            <input
              type="text"
              placeholder={t("membershipRequests.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full border border-gray-300 rounded-lg py-2 focus:ring-2 focus:ring-[#193042] focus:border-transparent outline-none ${isRTL ? "pr-10 text-right" : "pl-10"}`}
            />
          </div>

          {/* Status Filter */}
          <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                statusFilter === "all"
                  ? "bg-[#193042] text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t("membershipRequests.all")}
            </button>
            <button
              onClick={() => setStatusFilter("pending")}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                statusFilter === "pending"
                  ? "bg-yellow-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Clock size={18} />
              <span className="hidden sm:inline">{t("membershipRequests.pending")}</span>
            </button>
            <button
              onClick={() => setStatusFilter("approved")}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                statusFilter === "approved"
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <CheckCircle size={18} />
              <span className="hidden sm:inline">{t("membershipRequests.approved")}</span>
            </button>
            <button
              onClick={() => setStatusFilter("rejected")}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                statusFilter === "rejected"
                  ? "bg-red-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <XCircle size={18} />
              <span className="hidden sm:inline">{t("membershipRequests.rejected")}</span>
            </button>
          </div>
        </div>

        {/* Requests Table - Desktop */}
        {filteredRequests.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <UserCheck className="mx-auto text-gray-300 mb-4" size={64} />
            <p className="text-gray-500 text-lg">{t("membershipRequests.noRequests")}</p>
          </div>
        ) : (
          <>
            {/* Desktop View */}
            <div className="hidden lg:block overflow-x-auto bg-white rounded-xl shadow-md">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-[#193042] to-[#254e6f] text-white">
                  <tr>
                    <th className={`py-4 px-6 font-semibold ${isRTL ? "text-right" : "text-left"}`}>
                      {t("membershipRequests.requestId")}
                    </th>
                    <th className={`py-4 px-6 font-semibold ${isRTL ? "text-right" : "text-left"}`}>
                      {t("membershipRequests.userId")}
                    </th>
                    <th className={`py-4 px-6 font-semibold ${isRTL ? "text-right" : "text-left"}`}>
                      {t("membershipRequests.submittedAt")}
                    </th>
                    <th className="py-4 px-6 font-semibold text-center">
                      {t("membershipRequests.status")}
                    </th>
                    <th className="py-4 px-6 font-semibold text-center">
                      {t("membershipRequests.actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((req) => (
                    <tr key={req.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className={`py-4 px-6 font-semibold text-[#193042] ${isRTL ? "text-right" : "text-left"}`}>
                        #{req.id}
                      </td>
                      <td className={`py-4 px-6 text-gray-700 ${isRTL ? "text-right" : "text-left"}`}>
                        {t("membershipRequests.user")} #{req.user}
                      </td>
                      <td className={`py-4 px-6 text-gray-700 ${isRTL ? "text-right" : "text-left"}`}>
                        {formatDate(req.timestamp)}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(req.status)}`}>
                          {getStatusIcon(req.status)}
                          {t(`membershipRequests.${req.status}`)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleViewDetails(req.id)}
                          className="inline-flex items-center gap-2 bg-[#193042] text-white px-4 py-2 rounded-lg hover:bg-[#254e6f] transition-colors font-medium"
                        >
                          <Eye size={18} />
                          <span>{t("membershipRequests.viewDetails")}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile/Tablet View */}
            <div className="lg:hidden space-y-4">
              {filteredRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-t-4 border-[#193042]"
                >
                  <div className="p-5">
                    <div className={`flex items-start justify-between mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <div className={isRTL ? "text-right" : "text-left"}>
                        <h3 className="text-lg font-bold text-[#193042] mb-1">
                          {t("membershipRequests.request")} #{req.id}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {t("membershipRequests.user")} #{req.user}
                        </p>
                      </div>
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(req.status)}`}>
                        {getStatusIcon(req.status)}
                        {t(`membershipRequests.${req.status}`)}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className={`flex items-center gap-2 text-sm text-gray-600 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <Clock size={16} className="text-gray-400" />
                        <span>{formatDate(req.timestamp)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleViewDetails(req.id)}
                      className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#193042] to-[#254e6f] text-white px-4 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <Eye size={18} />
                      <span>{t("membershipRequests.viewDetails")}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className={`flex items-center justify-between p-6 border-b border-gray-200 ${isRTL ? "flex-row-reverse" : ""}`}>
              <h2 className="text-2xl font-bold text-[#193042]">
                {t("membershipRequests.requestDetails")}
              </h2>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {detailsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#193042] mx-auto mb-4"></div>
                  <p className="text-gray-600">{t("membershipRequests.loadingDetails")}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Request Info */}
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                      {t("membershipRequests.requestInformation")}
                    </h3>
                    <div className="space-y-3">
                      <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                        <span className="text-gray-600">{t("membershipRequests.requestId")}:</span>
                        <span className="font-semibold text-[#193042]">#{selectedRequest.id}</span>
                      </div>
                      <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                        <span className="text-gray-600">{t("membershipRequests.username")}:</span>
                        <span className="font-semibold">{selectedRequest.english_name}</span>
                      </div>
                      <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                        <span className="text-gray-600">{t("membershipRequests.submittedAt")}:</span>
                        <span className="font-semibold">{formatDate(selectedRequest.timestamp)}</span>
                      </div>
                      <div className={`flex justify-between items-center ${isRTL ? "flex-row-reverse" : ""}`}>
                        <span className="text-gray-600">{t("membershipRequests.currentStatus")}:</span>
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedRequest.status)}`}>
                          {getStatusIcon(selectedRequest.status)}
                          {t(`membershipRequests.${selectedRequest.status}`)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Update Section */}
                  <div className="bg-blue-50 rounded-xl p-5 border-2 border-blue-200">
                    <h3 className={`text-lg font-semibold text-blue-900 mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                      {t("membershipRequests.updateStatus")}
                    </h3>
                    <div className={`flex flex-col sm:flex-row gap-3 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
                      <select
                        value={statusUpdate}
                        onChange={(e) => setStatusUpdate(e.target.value)}
                        className={`flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#193042] focus:border-transparent outline-none ${isRTL ? "text-right" : ""}`}
                      >
                        <option value="pending">{t("membershipRequests.pending")}</option>
                        <option value="approved">{t("membershipRequests.approved")}</option>
                        <option value="rejected">{t("membershipRequests.rejected")}</option>
                      </select>
                      <button
                        onClick={handleStatusUpdate}
                        disabled={updating || statusUpdate === selectedRequest.status}
                        className={`flex items-center justify-center gap-2 bg-gradient-to-r from-[#193042] to-[#254e6f] text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${isRTL ? "flex-row-reverse" : ""}`}
                      >
                        {updating ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>{t("membershipRequests.updating")}</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle size={20} />
                            <span>{t("membershipRequests.save")}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className={`flex gap-3 mt-6 ${isRTL ? "flex-row-reverse" : ""}`}>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  {t("membershipRequests.close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}