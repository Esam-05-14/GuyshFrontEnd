import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function CardSmall({ title, content, date, image, link }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <div
      onClick={() => navigate(link || "#")}
      className="cursor-pointer flex flex-col w-64 h-80 bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
    >
      {/* Image Section */}
      <div className="w-full h-40 bg-gray-200">
        <img
          src={image || "/default-news.jpg"}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between flex-1 p-4">
        <div>
          <h3 className="text-lg font-semibold text-[#193042] mb-1 line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-3">{content}</p>
        </div>

        <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
          <span>{date}</span>
          <button className="text-[#a3301e] font-medium hover:underline">
            {t("cardSmall.readMore")}
          </button>
        </div>
      </div>
    </div>
  );
}
