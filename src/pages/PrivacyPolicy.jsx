import React from "react";
import { useTranslation } from "react-i18next";
import { Shield, Lock, Eye, Database, UserCheck } from "lucide-react";

export default function PrivacyPolicy() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const sections = [
    { icon: Database, key: "section1" },
    { icon: Eye, key: "section2" },
    { icon: Lock, key: "section3" },
    { icon: UserCheck, key: "section4" },
    { icon: Shield, key: "section5" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#193042] to-[#254e6f] rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className={`flex items-center gap-4 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
            <Shield size={40} />
            <h1 className="text-4xl font-bold">
              {t("privacy.title")}
            </h1>
          </div>
          <p className="text-gray-100 text-lg">
            {t("privacy.subtitle")}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          {/* Last Updated */}
          <div className="text-sm text-gray-500 pb-4 border-b border-gray-200">
            {t("privacy.lastUpdated")}: {t("privacy.updateDate")}
          </div>

          {/* Introduction */}
          <section>
            <p className="text-gray-700 leading-relaxed text-lg">
              {t("privacy.introduction")}
            </p>
          </section>

          {/* Dynamic Sections */}
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <section key={section.key}>
                <div className={`flex items-center gap-3 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="bg-[#193042] p-3 rounded-lg">
                    <Icon className="text-white" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-[#193042]">
                    <span className="text-[#912211]">{index + 1}.</span> {t(`privacy.${section.key}.title`)}
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t(`privacy.${section.key}.content`)}
                </p>
                {t(`privacy.${section.key}.items`, { returnObjects: true }) && 
                 Array.isArray(t(`privacy.${section.key}.items`, { returnObjects: true })) && (
                  <ul className="space-y-2 ml-6">
                    {t(`privacy.${section.key}.items`, { returnObjects: true }).map((item, idx) => (
                      <li key={idx} className={`text-gray-700 list-disc ${isRTL ? "mr-6 ml-0" : ""}`}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          })}

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-[#193042] mb-4 flex items-center gap-2">
              <span className="text-[#912211]">6.</span> {t("privacy.section6.title")}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t("privacy.section6.content")}
            </p>
          </section>

          {/* Contact Section */}
          <section className="bg-gray-50 rounded-xl p-6 mt-8">
            <h3 className="text-xl font-bold text-[#193042] mb-3">
              {t("privacy.contact.title")}
            </h3>
            <p className="text-gray-700 mb-2">
              {t("privacy.contact.content")}
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