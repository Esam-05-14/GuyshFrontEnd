// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// // import { getEvents, deleteEvent } from "../../api/events"; // adjust path as needed

// export default function AdminEvents() {
//   const { t } = useTranslation();
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch events
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getEvents();
//         setEvents(data);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm(t("Are you sure you want to delete this event?"))) {
//       try {
//         await deleteEvent(id);
//         setEvents(events.filter((e) => e.id !== id));
//       } catch (error) {
//         console.error("Error deleting event:", error);
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-lg">
//         {t("Loading events...")}
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-semibold mb-6 text-[#193042]">
//         {t("Events Management")}
//       </h1>

//       {events.length === 0 ? (
//         <p className="text-gray-600">{t("No events found.")}</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {events.map((event) => (
//             <div
//               key={event.id}
//               className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between"
//             >
//               <div>
//                 <h2 className="text-lg font-bold text-[#193042]">{event.title}</h2>
//                 <p className="text-sm text-gray-700 mt-2 line-clamp-3">{event.description}</p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   {t("Date")}: {new Date(event.date).toLocaleDateString()}
//                 </p>
//               </div>
//               <div className="mt-4 flex justify-end gap-2">
//                 <Button
//                   variant="outline"
//                   className="text-blue-600 border-blue-600 hover:bg-blue-50"
//                 >
//                   {t("Edit")}
//                 </Button>
//                 <Button
//                   variant="destructive"
//                   onClick={() => handleDelete(event.id)}
//                 >
//                   {t("Delete")}
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Edit, 
  Trash2, 
  Eye, 
  Plus,
  Filter,
  Search,
  X,
  Save
} from "lucide-react";
import { getEvents, updataEventId_Admin, createEvent_Admin, deleteEvent_Admin } from "../../services/authService";


export default function AdminEvents() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, upcoming, past
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [viewingEvent, setViewingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    event_date: "",
    location: ""
  });
  const [errors, setErrors] = useState({});

  // Fetch events
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEvents();
        // Mock data for demonstration
        // const data = [
        //   {
        //     id: 1,
        //     title: "Welcome Ceremony 2024",
        //     content: "Annual welcome ceremony for new students. Join us for an evening of celebration and networking. We will have special guests, cultural performances, and refreshments.",
        //     event_date: "2024-09-15T18:00:00",
        //     location: "Main Hall, Building A"
        //   },
        //   {
        //     id: 2,
        //     title: "Career Fair 2025",
        //     content: "Connect with top employers and explore career opportunities in various fields. Over 50 companies will be present.",
        //     event_date: "2025-12-10T10:00:00",
        //     location: "University Campus Center"
        //   },
        //   {
        //     id: 3,
        //     title: "Cultural Night",
        //     content: "Experience diverse cultures through food, music, and performances from students around the world.",
        //     event_date: "2024-10-20T19:00:00",
        //     location: "Student Theater"
        //   }
        // ];
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const isEventPast = (eventDate) => {
    return new Date(eventDate) < new Date();
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === "upcoming") {
      return !isEventPast(event.event_date) && matchesSearch;
    } else if (filter === "past") {
      return isEventPast(event.event_date) && matchesSearch;
    }
    return matchesSearch;
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = t("This field is required.");
    if (!formData.content.trim()) newErrors.content = t("This field is required.");
    if (!formData.event_date) newErrors.event_date = t("This field is required.");
    if (!formData.location.trim()) newErrors.location = t("This field is required.");
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      if (editingEvent) {
        await updataEventId_Admin(editingEvent.id, formData);
        setEvents(events.map(ev => 
          ev.id === editingEvent.id ? { ...ev, ...formData } : ev
        ));
        alert(t("Event updated successfully!"));
      } else {
        const newEvent = await createEvent_Admin(formData);
        // const newEvent = { 
        //   id: Date.now(), 
        //   ...formData 
        // };
        setEvents([newEvent, ...events]);
        alert(t("Event created successfully!"));
      }
      
      handleCloseModal();
    } catch (error) {
      console.error("Error saving event:", error);
      alert(t("Error saving event. Please try again."));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(t("Are you sure you want to delete this event?"))) {
      try {
        await deleteEvent_Admin(id);
        setEvents(events.filter((e) => e.id !== id));
        alert(t("Event deleted successfully!"));
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      content: event.content,
      event_date: event.event_date,
      location: event.location
    });
    setErrors({});
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingEvent(null);
    setFormData({
      title: "",
      content: "",
      event_date: "",
      location: ""
    });
    setErrors({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingEvent(null);
    setFormData({
      title: "",
      content: "",
      event_date: "",
      location: ""
    });
    setErrors({});
  };

  const handleView = (event) => {
    setViewingEvent(event);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#193042] mx-auto"></div>
          <p className="mt-4 text-gray-600">{t("Loading events...")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
          <h1 className="text-3xl font-bold text-[#193042]">
            {t("Events Management")}
          </h1>
          <button
            onClick={handleAddNew}
            className={`flex items-center gap-2 bg-gradient-to-r from-[#193042] to-[#254e6f] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <Plus size={20} />
            <span>{t("Add New Event")}</span>
          </button>
        </div>

        {/* Filters and Search */}
        <div className={`bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-4 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
          {/* Search */}
          <div className="flex-1 relative">
            <Search className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRTL ? "right-3" : "left-3"}`} size={20} />
            <input
              type="text"
              placeholder={t("Search events...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full border border-gray-300 rounded-lg py-2 focus:ring-2 focus:ring-[#193042] focus:border-transparent outline-none ${isRTL ? "pr-10 text-right" : "pl-10"}`}
            />
          </div>

          {/* Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === "all"
                  ? "bg-[#193042] text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t("All")}
            </button>
            <button
              onClick={() => setFilter("upcoming")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === "upcoming"
                  ? "bg-[#193042] text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t("Upcoming")}
            </button>
            <button
              onClick={() => setFilter("past")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === "past"
                  ? "bg-[#193042] text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t("Past")}
            </button>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Calendar className="mx-auto text-gray-300 mb-4" size={64} />
            <p className="text-gray-500 text-lg">{t("No events found.")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-t-4 ${
                  isEventPast(event.event_date) ? "border-gray-400" : "border-[#193042]"
                }`}
              >
                {/* Event Status Badge */}
                <div className="px-6 pt-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    isEventPast(event.event_date)
                      ? "bg-gray-100 text-gray-600"
                      : "bg-green-100 text-green-700"
                  }`}>
                    {isEventPast(event.event_date) ? t("Past Event") : t("Upcoming")}
                  </span>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#193042] mb-3 line-clamp-2">
                    {event.title}
                  </h2>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {event.content}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className={`flex items-center gap-2 text-sm text-gray-500 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <Calendar size={16} />
                      <span>{new Date(event.event_date).toLocaleDateString()}</span>
                    </div>
                    <div className={`flex items-center gap-2 text-sm text-gray-500 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <Clock size={16} />
                      <span>{new Date(event.event_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className={`flex items-center gap-2 text-sm text-gray-500 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <MapPin size={16} />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className={`flex gap-2 pt-4 border-t border-gray-100 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <button
                      onClick={() => handleView(event)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Eye size={16} />
                      <span className="text-sm font-medium">{t("View")}</span>
                    </button>
                    <button
                      onClick={() => handleEdit(event)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Edit size={16} />
                      <span className="text-sm font-medium">{t("Edit")}</span>
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={16} />
                      <span className="text-sm font-medium">{t("Delete")}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className={`flex items-center justify-between p-6 border-b border-gray-200 ${isRTL ? "flex-row-reverse" : ""}`}>
              <h2 className="text-2xl font-bold text-[#193042]">
                {editingEvent ? t("Edit Event") : t("Create New Event")}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Title */}
              <div>
                <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? "text-right" : ""}`}>
                  {t("Event Title")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#193042] focus:border-transparent outline-none transition-all ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  } ${isRTL ? "text-right" : ""}`}
                  placeholder={t("Enter event title")}
                />
                {errors.title && (
                  <p className={`text-red-500 text-sm mt-1 ${isRTL ? "text-right" : ""}`}>{errors.title}</p>
                )}
              </div>

              {/* Content */}
              <div>
                <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? "text-right" : ""}`}>
                  {t("Event Description")} <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#193042] focus:border-transparent outline-none transition-all resize-none ${
                    errors.content ? "border-red-500" : "border-gray-300"
                  } ${isRTL ? "text-right" : ""}`}
                  placeholder={t("Enter event description")}
                />
                {errors.content && (
                  <p className={`text-red-500 text-sm mt-1 ${isRTL ? "text-right" : ""}`}>{errors.content}</p>
                )}
              </div>

              {/* Date and Time */}
              <div>
                <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? "text-right" : ""}`}>
                  {t("Event Date & Time")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="event_date"
                  value={formData.event_date}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#193042] focus:border-transparent outline-none transition-all ${
                    errors.event_date ? "border-red-500" : "border-gray-300"
                  } ${isRTL ? "text-right" : ""}`}
                />
                {errors.event_date && (
                  <p className={`text-red-500 text-sm mt-1 ${isRTL ? "text-right" : ""}`}>{errors.event_date}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? "text-right" : ""}`}>
                  {t("Location")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#193042] focus:border-transparent outline-none transition-all ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  } ${isRTL ? "text-right" : ""}`}
                  placeholder={t("Enter event location")}
                />
                {errors.location && (
                  <p className={`text-red-500 text-sm mt-1 ${isRTL ? "text-right" : ""}`}>{errors.location}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className={`flex gap-3 pt-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  {t("Cancel")}
                </button>
                <button
                  type="submit"
                  className={`flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#193042] to-[#254e6f] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <Save size={20} />
                  <span>{editingEvent ? t("Update Event") : t("Create Event")}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Event Modal */}
      {viewingEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className={`flex items-center justify-between p-6 border-b border-gray-200 ${isRTL ? "flex-row-reverse" : ""}`}>
              <h2 className="text-2xl font-bold text-[#193042]">
                {t("Event Details")}
              </h2>
              <button
                onClick={() => setViewingEvent(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${
                  isEventPast(viewingEvent.event_date)
                    ? "bg-gray-100 text-gray-600"
                    : "bg-green-100 text-green-700"
                }`}>
                  {isEventPast(viewingEvent.event_date) ? t("Past Event") : t("Upcoming Event")}
                </span>
                
                <h3 className="text-2xl font-bold text-[#193042] mb-4">
                  {viewingEvent.title}
                </h3>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  {viewingEvent.content}
                </p>

                <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                  <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <Calendar className="text-[#193042]" size={20} />
                    <span className="text-gray-700">
                      {new Date(viewingEvent.event_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <Clock className="text-[#193042]" size={20} />
                    <span className="text-gray-700">
                      {new Date(viewingEvent.event_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <MapPin className="text-[#193042]" size={20} />
                    <span className="text-gray-700">{viewingEvent.location}</span>
                  </div>
                </div>
              </div>

              <div className={`flex gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                <button
                  onClick={() => {
                    setViewingEvent(null);
                    handleEdit(viewingEvent);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition-colors"
                >
                  <Edit size={20} />
                  <span>{t("Edit Event")}</span>
                </button>
                <button
                  onClick={() => setViewingEvent(null)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  {t("Close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}