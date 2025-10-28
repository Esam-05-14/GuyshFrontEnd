import { useLocation, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";


export default function EventDetails() {
  const { id } = useParams();
  const { t } = useTranslation();
  const location = useLocation();
  const event = location.state?.event;

  const formatted_date = dayjs(event.event_date).format("dddd, MMMM D, YYYY h:mm A");

  if (!event)
    return (
      <p className="text-center mt-10 text-gray-500 italic">{t("events.eventNotFound")}</p>
    );

  return (
    <div className="min-h-screen bg-[#F3F4F6] py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Event Image */}
        <div className="relative">
          <img
            src={event.image || "/guysh1.jpg"}
            alt="event image"
            className="w-full h-72 object-cover transition-transform duration-500 hover:scale-[1.02]"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <h1 className="text-2xl font-bold text-white">{event.title}</h1>
          </div>
        </div>

        {/* Event Details */}
        <div className="p-6">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 mb-4">
            <span>📅 {formatted_date|| "Date not specified"}</span>
            <span>📍 {event.location || "Location not provided"}</span>
          </div>

          {/* Main Content */}
          <div className="text-gray-800 leading-relaxed space-y-4">
            {event.content
              ? event.content.split("\n").map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))
              : "No description available for this event."}
          </div>

          {/* Divider */}
          <hr className="my-6 border-gray-200" />

          {/* Footer */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => window.history.back()}
              className="text-[#193042] font-semibold hover:underline"
            >
              {t("events.backToEvents")}
            </button>

            {event.source && (
              <a
                href={event.source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:underline font-medium"
              >
                View Event Page ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
