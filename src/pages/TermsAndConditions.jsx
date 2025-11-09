import React from "react";
import { useTranslation } from "react-i18next";
import { FileText, CheckCircle } from "lucide-react";

export default function TermsAndConditions() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#193042] to-[#254e6f] rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className={`flex items-center gap-4 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
            <FileText size={40} />
            <h1 className="text-4xl font-bold">
              {t("terms.title")}
            </h1>
          </div>
          <p className="text-gray-100 text-lg">
            {t("terms.subtitle")}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          {/* Last Updated */}
          <div className="text-sm text-gray-500 pb-4 border-b border-gray-200">
            {t("terms.lastUpdated")}: {t("terms.updateDate")}
          </div>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-[#193042] mb-4 flex items-center gap-2">
              <span className="text-[#912211]">1.</span> {t("terms.section1.title")}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t("terms.section1.content")}
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-[#193042] mb-4 flex items-center gap-2">
              <span className="text-[#912211]">2.</span> {t("terms.section2.title")}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t("terms.section2.content")}
            </p>
            <ul className="space-y-2">
              {t("terms.section2.items", { returnObjects: true }).map((item, index) => (
                <li key={index} className={`flex items-start gap-3 text-gray-700 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-[#193042] mb-4 flex items-center gap-2">
              <span className="text-[#912211]">3.</span> {t("terms.section3.title")}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t("terms.section3.content")}
            </p>
            <ul className="space-y-2">
              {t("terms.section3.items", { returnObjects: true }).map((item, index) => (
                <li key={index} className={`flex items-start gap-3 text-gray-700 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-[#193042] mb-4 flex items-center gap-2">
              <span className="text-[#912211]">4.</span> {t("terms.section4.title")}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t("terms.section4.content")}
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-[#193042] mb-4 flex items-center gap-2">
              <span className="text-[#912211]">5.</span> {t("terms.section5.title")}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t("terms.section5.content")}
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-[#193042] mb-4 flex items-center gap-2">
              <span className="text-[#912211]">6.</span> {t("terms.section6.title")}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t("terms.section6.content")}
            </p>
          </section>

          {/* Contact Section */}
          <section className="bg-gray-50 rounded-xl p-6 mt-8">
            <h3 className="text-xl font-bold text-[#193042] mb-3">
              {t("terms.contact.title")}
            </h3>
            <p className="text-gray-700 mb-2">
              {t("terms.contact.content")}
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