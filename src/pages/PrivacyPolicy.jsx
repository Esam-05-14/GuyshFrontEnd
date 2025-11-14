// import React from "react";
// import { useTranslation } from "react-i18next";
// import { Shield, Lock, Eye, Database, UserCheck } from "lucide-react";

// export default function PrivacyPolicy() {
//   const { t, i18n } = useTranslation();
//   const isRTL = i18n.language === "ar";

//   const sections = [
//     { icon: Database, key: "section1" },
//     { icon: Eye, key: "section2" },
//     { icon: Lock, key: "section3" },
//     { icon: UserCheck, key: "section4" },
//     { icon: Shield, key: "section5" }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir={isRTL ? "rtl" : "ltr"}>
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-[#193042] to-[#254e6f] rounded-2xl shadow-xl p-8 mb-8 text-white">
//           <div className={`flex items-center gap-4 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
//             <Shield size={40} />
//             <h1 className="text-4xl font-bold">
//               {t("privacy.title")}
//             </h1>
//           </div>
//           <p className="text-gray-100 text-lg">
//             {t("privacy.subtitle")}
//           </p>
//         </div>

//         {/* Content */}
//         <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
//           {/* Last Updated */}
//           <div className="text-sm text-gray-500 pb-4 border-b border-gray-200">
//             {t("privacy.lastUpdated")}: {t("privacy.updateDate")}
//           </div>

//           {/* Introduction */}
//           <section>
//             <p className="text-gray-700 leading-relaxed text-lg">
//               {t("privacy.introduction")}
//             </p>
//           </section>

//           {/* Dynamic Sections */}
//           {sections.map((section, index) => {
//             const Icon = section.icon;
//             return (
//               <section key={section.key}>
//                 <div className={`flex items-center gap-3 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
//                   <div className="bg-[#193042] p-3 rounded-lg">
//                     <Icon className="text-white" size={24} />
//                   </div>
//                   <h2 className="text-2xl font-bold text-[#193042]">
//                     <span className="text-[#912211]">{index + 1}.</span> {t(`privacy.${section.key}.title`)}
//                   </h2>
//                 </div>
//                 <p className="text-gray-700 leading-relaxed mb-4">
//                   {t(`privacy.${section.key}.content`)}
//                 </p>
//                 {t(`privacy.${section.key}.items`, { returnObjects: true }) && 
//                  Array.isArray(t(`privacy.${section.key}.items`, { returnObjects: true })) && (
//                   <ul className="space-y-2 ml-6">
//                     {t(`privacy.${section.key}.items`, { returnObjects: true }).map((item, idx) => (
//                       <li key={idx} className={`text-gray-700 list-disc ${isRTL ? "mr-6 ml-0" : ""}`}>
//                         {item}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </section>
//             );
//           })}

//           {/* Section 6 */}
//           <section>
//             <h2 className="text-2xl font-bold text-[#193042] mb-4 flex items-center gap-2">
//               <span className="text-[#912211]">6.</span> {t("privacy.section6.title")}
//             </h2>
//             <p className="text-gray-700 leading-relaxed">
//               {t("privacy.section6.content")}
//             </p>
//           </section>

//           {/* Contact Section */}
//           <section className="bg-gray-50 rounded-xl p-6 mt-8">
//             <h3 className="text-xl font-bold text-[#193042] mb-3">
//               {t("privacy.contact.title")}
//             </h3>
//             <p className="text-gray-700 mb-2">
//               {t("privacy.contact.content")}
//             </p>
//             <a 
//               href="mailto:yemitehad.hungary@gmail.com" 
//               className="text-[#912211] hover:underline font-medium"
//             >
//               yemitehad.hungary@gmail.com
//             </a>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { useTranslation } from "react-i18next";
import { Shield, Lock, Eye, Database, UserCheck, Gavel, Server, Clock, Users, Bug, Repeat, ThumbsDown, Zap } from "lucide-react";

export default function PrivacyPolicy() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  // New comprehensive list of sections matching the policy structure
  const sections = [
    { icon: Database, key: "dataCollected" },
    { icon: Gavel, key: "legalBasis" },
    { icon: Eye, key: "purpose" },
    { icon: Users, key: "dataSharing" },
    { icon: Clock, key: "dataRetention" },
    { icon: UserCheck, key: "yourRights" },
    { icon: Lock, key: "dataSecurity" },
    { icon: Server, key: "internationalTransfers" },
    { icon: Repeat, key: "cookiesTracking" },
    { icon: Users, key: "childrenPrivacy" }, // Using Users icon again for grouping
    { icon: Zap, key: "dataBreach" },
    { icon: Repeat, key: "policyChanges" }, // Using Repeat icon again for updates
    { icon: ThumbsDown, key: "rightToComplain" },
    { icon: Bug, key: "automatedDecision" }, // Section 14: Automated Decision Making
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
            {t("privacy.lastUpdated")}: <span className="font-semibold">{t("privacy.updateDate")}</span>
          </div>

          {/* Legal Details Block */}
          <section className="bg-blue-50 border-l-4 border-[#193042] p-4 rounded-lg">
            <h3 className="text-xl font-bold text-[#193042] mb-3">{t("privacy.legalDetails.title")}</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li><strong>{t("privacy.legalDetails.orgName")}:</strong> GUYSH – General Union for Yemeni Students in Hungary</li>
              <li><strong>{t("privacy.legalDetails.legalStatus")}:</strong> {t("privacy.legalDetails.legalStatusValue")}</li>
              <li><strong>{t("privacy.legalDetails.address")}:</strong> 1119 Budapest, Fehérvári út 41</li>
              <li><strong>{t("privacy.legalDetails.contactEmail")}:</strong> yemitehad.hungary@gmail.com</li>
              <li><strong>{t("privacy.legalDetails.dpo")}:</strong> {t("privacy.legalDetails.dpoValue")} (yemitehad.hungary@gmail.com)</li>
            </ul>
          </section>

          {/* Dynamic Sections */}
          {sections.map((section, index) => {
            const Icon = section.icon;
            const sectionNumber = index + 1;
            const hasListItems = t(`privacy.${section.key}.items`, { returnObjects: true }) && 
                                 Array.isArray(t(`privacy.${section.key}.items`, { returnObjects: true }));
            const isContactSection = section.key === "dataBreach" || section.key === "rightToComplain";

            return (
              <section key={section.key} className={isContactSection ? "bg-gray-50 rounded-xl p-6 border border-gray-200" : ""}>
                <div className={`flex items-center gap-3 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="bg-[#193042] p-3 rounded-lg">
                    <Icon className="text-white" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-[#193042]">
                    <span className="text-[#912211]">{sectionNumber}.</span> {t(`privacy.${section.key}.title`)}
                  </h2>
                </div>
                
                {/* Content */}
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t(`privacy.${section.key}.content`)}
                </p>
                
                {/* List Items (for data collected, rights, security etc.) */}
                {hasListItems && (
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

          {/* Contact Section (Old structure kept for email visibility, though covered in legal details/sections) */}
          <section className="bg-gray-50 rounded-xl p-6 mt-8 border border-gray-200">
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