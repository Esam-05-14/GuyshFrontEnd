import React from "react";
import { useTranslation } from "react-i18next";
import { Users, Award, Scale, Heart, BookOpen, Globe } from "lucide-react";

export default function UnionRulesAndRights() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#193042] to-[#254e6f] rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className={`flex items-center gap-4 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
            <Users size={40} />
            <h1 className="text-4xl font-bold">
              {t("union.title")}
            </h1>
          </div>
          <p className="text-gray-100 text-lg">
            {t("union.subtitle")}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          {/* Last Updated */}
          <div className="text-sm text-gray-500 pb-4 border-b border-gray-200">
            {t("union.lastUpdated")}: {t("union.updateDate")}
          </div>

          {/* Introduction */}
          <section>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              {t("union.introduction")}
            </p>
          </section>

          {/* Student Rights */}
          <section>
            <div className={`flex items-center gap-3 mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className="bg-green-600 p-3 rounded-lg">
                <Award className="text-white" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-[#193042]">
                {t("union.rights.title")}
              </h2>
            </div>
            <div className="space-y-4">
              {t("union.rights.items", { returnObjects: true }).map((item, index) => (
                <div key={index} className="bg-green-50 rounded-lg p-5 border-l-4 border-green-600">
                  <h3 className="font-bold text-green-900 mb-2 text-lg">
                    {item.title}
                  </h3>
                  <p className="text-green-800">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Student Responsibilities */}
          <section>
            <div className={`flex items-center gap-3 mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className="bg-blue-600 p-3 rounded-lg">
                <Scale className="text-white" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-[#193042]">
                {t("union.responsibilities.title")}
              </h2>
            </div>
            <div className="space-y-4">
              {t("union.responsibilities.items", { returnObjects: true }).map((item, index) => (
                <div key={index} className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-600">
                  <h3 className="font-bold text-blue-900 mb-2 text-lg">
                    {item.title}
                  </h3>
                  <p className="text-blue-800">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Union Services */}
          <section>
            <div className={`flex items-center gap-3 mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className="bg-purple-600 p-3 rounded-lg">
                <Heart className="text-white" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-[#193042]">
                {t("union.services.title")}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t("union.services.items", { returnObjects: true }).map((item, index) => (
                <div key={index} className="bg-purple-50 rounded-lg p-5 border border-purple-200">
                  <h3 className="font-bold text-purple-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-purple-800 text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Membership Benefits */}
          <section>
            <div className={`flex items-center gap-3 mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className="bg-orange-600 p-3 rounded-lg">
                <BookOpen className="text-white" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-[#193042]">
                {t("union.benefits.title")}
              </h2>
            </div>
            <ul className="space-y-3">
              {t("union.benefits.items", { returnObjects: true }).map((item, index) => (
                <li key={index} className={`flex items-start gap-3 bg-orange-50 p-4 rounded-lg ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                    {index + 1}
                  </div>
                  <span className="text-gray-700 flex-1">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Code of Conduct */}
          <section>
            <div className={`flex items-center gap-3 mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className="bg-red-600 p-3 rounded-lg">
                <Globe className="text-white" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-[#193042]">
                {t("union.conduct.title")}
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t("union.conduct.content")}
            </p>
            <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-600">
              <ul className="space-y-2">
                {t("union.conduct.items", { returnObjects: true }).map((item, index) => (
                  <li key={index} className={`text-red-900 font-medium ${isRTL ? "text-right" : ""}`}>
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mt-8">
            <h3 className="text-xl font-bold text-[#193042] mb-3">
              {t("union.contact.title")}
            </h3>
            <p className="text-gray-700 mb-2">
              {t("union.contact.content")}
            </p>
            <a 
              href="mailto:yemitehad.hungary@gmail.com" 
              className="text-[#912211] hover:underline font-medium"
            >
              yemitehad.hungary@gmail.com
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}