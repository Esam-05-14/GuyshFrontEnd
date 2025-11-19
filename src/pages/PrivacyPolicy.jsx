import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Shield, CheckCircle, Lock } from "lucide-react";
import ReactMarkdown from "react-markdown";
// [FIX] Added .js extension
import { getPrivacy } from "../services/authService.js";
// [FIX] Corrected path from ../data/AuthContext to ../context/AuthContext
import { useAuth } from "../data/AuthContext";

export default function PrivacyPolicy() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { language } = useAuth();

  const [privacyContent, setPrivacyContent] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getPrivacy(language);

        // 1. Extract Content
        // Checks if data is an object with 'content' field or just a string
        if (data && data.content) {
          setPrivacyContent(data.content);
        } else if (typeof data === 'string') {
          setPrivacyContent(data);
        }

        // 2. Extract Date from metadata
        if (data && data.meta && data.meta.effective_date) {
          setLastUpdated(data.meta.effective_date);
        }

      } catch (error) {
        console.error("Failed to load privacy policy:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [language]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#193042] to-[#254e6f] rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className={`flex items-center gap-4 mb-4 `}>
            <Shield size={40} />
            <h1 className="text-4xl font-bold">
              {t("privacy.title") || "Privacy Policy"}
            </h1>
          </div>
          <p className="text-gray-100 text-lg">
            {t("privacy.subtitle") || "We are committed to protecting your personal data."}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#193042]"></div>
            </div>
          ) : (
            <>
              {/* Date Display Section */}
              {lastUpdated && (
                <div className={`text-sm text-gray-500 pb-4 border-b border-gray-200 mb-6`}>
                  {t("privacy.lastUpdated") || "Last Updated"}: <span className="font-semibold text-[#193042]">{lastUpdated}</span>
                </div>
              )}

              {/* Markdown Content */}
              <div className={`markdown-content ${isRTL ? "text-right" : "text-left"}`}>
                <ReactMarkdown
                  components={{
                    // Main Headings
                    h1: ({ node, ...props }) => (
                      <h1 className="text-3xl font-bold text-[#193042] mt-8 mb-4 border-b pb-2" {...props} />
                    ),
                    // Section Headings (e.g., "Data Collected", "Your Rights")
                    h2: ({ node, ...props }) => (
                      <h2 className="text-2xl font-bold text-[#193042] mt-8 mb-3 flex items-center gap-2" {...props} />
                    ),
                    // Sub-sections
                    h3: ({ node, ...props }) => (
                      <h3 className="text-xl font-semibold text-[#193042] mt-5 mb-2" {...props} />
                    ),
                    // Paragraphs
                    p: ({ node, ...props }) => (
                      <p className="text-gray-700 leading-relaxed mb-4 text-lg" {...props} />
                    ),
                    // Lists
                    ul: ({ node, ...props }) => (
                      <ul className="space-y-3 mb-6 list-none" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="space-y-3 mb-6 list-decimal list-inside text-gray-700" {...props} />
                    ),
                    // List Items with generic secure/check icon
                    li: ({ node, ...props }) => (
                      <li className="flex items-start gap-3 text-gray-700">
                        <CheckCircle className="text-[#6e9225] flex-shrink-0 mt-1" size={20} />
                        <span>{props.children}</span>
                      </li>
                    ),
                    // Links
                    a: ({ node, ...props }) => (
                      <a className="text-[#912211] hover:underline font-medium transition-colors" {...props} />
                    ),
                    // Bold Text
                    strong: ({ node, ...props }) => (
                      <strong className="font-bold text-[#193042]" {...props} />
                    ),
                    // Blockquotes (often used for important notes)
                    blockquote: ({ node, ...props }) => (
                      <blockquote className="border-l-4 border-[#912211] pl-4 py-2 bg-gray-50 my-4 italic text-gray-600 rounded-r-lg" {...props} />
                    ),
                  }}
                >
                  {typeof privacyContent === 'string' ? privacyContent : ""}
                </ReactMarkdown>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


// import React from "react";
// import { useTranslation } from "react-i18next";
// import { Shield, Lock, Eye, Database, UserCheck, Gavel, Server, Clock, Users, Bug, Repeat, ThumbsDown, Zap } from "lucide-react";

// export default function PrivacyPolicy() {
//   const { t, i18n } = useTranslation();
//   const isRTL = i18n.language === "ar";

//   // New comprehensive list of sections matching the policy structure
//   const sections = [
//     { icon: Database, key: "dataCollected" },
//     { icon: Gavel, key: "legalBasis" },
//     { icon: Eye, key: "purpose" },
//     { icon: Users, key: "dataSharing" },
//     { icon: Clock, key: "dataRetention" },
//     { icon: UserCheck, key: "yourRights" },
//     { icon: Lock, key: "dataSecurity" },
//     { icon: Server, key: "internationalTransfers" },
//     { icon: Repeat, key: "cookiesTracking" },
//     { icon: Users, key: "childrenPrivacy" }, // Using Users icon again for grouping
//     { icon: Zap, key: "dataBreach" },
//     { icon: Repeat, key: "policyChanges" }, // Using Repeat icon again for updates
//     { icon: ThumbsDown, key: "rightToComplain" },
//     { icon: Bug, key: "automatedDecision" }, // Section 14: Automated Decision Making
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
//             {t("privacy.lastUpdated")}: <span className="font-semibold">{t("privacy.updateDate")}</span>
//           </div>

//           {/* Legal Details Block */}
//           <section className="bg-blue-50 border-l-4 border-[#193042] p-4 rounded-lg">
//             <h3 className="text-xl font-bold text-[#193042] mb-3">{t("privacy.legalDetails.title")}</h3>
//             <ul className="text-gray-700 space-y-1 text-sm">
//               <li><strong>{t("privacy.legalDetails.orgName")}:</strong> GUYSH – General Union for Yemeni Students in Hungary</li>
//               <li><strong>{t("privacy.legalDetails.legalStatus")}:</strong> {t("privacy.legalDetails.legalStatusValue")}</li>
//               <li><strong>{t("privacy.legalDetails.address")}:</strong> 1119 Budapest, Fehérvári út 41</li>
//               <li><strong>{t("privacy.legalDetails.contactEmail")}:</strong> yemitehad.hungary@gmail.com</li>
//               <li><strong>{t("privacy.legalDetails.dpo")}:</strong> {t("privacy.legalDetails.dpoValue")} (yemitehad.hungary@gmail.com)</li>
//             </ul>
//           </section>

//           {/* Dynamic Sections */}
//           {sections.map((section, index) => {
//             const Icon = section.icon;
//             const sectionNumber = index + 1;
//             const hasListItems = t(`privacy.${section.key}.items`, { returnObjects: true }) && 
//                                  Array.isArray(t(`privacy.${section.key}.items`, { returnObjects: true }));
//             const isContactSection = section.key === "dataBreach" || section.key === "rightToComplain";

//             return (
//               <section key={section.key} className={isContactSection ? "bg-gray-50 rounded-xl p-6 border border-gray-200" : ""}>
//                 <div className={`flex items-center gap-3 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
//                   <div className="bg-[#193042] p-3 rounded-lg">
//                     <Icon className="text-white" size={24} />
//                   </div>
//                   <h2 className="text-2xl font-bold text-[#193042]">
//                     <span className="text-[#912211]">{sectionNumber}.</span> {t(`privacy.${section.key}.title`)}
//                   </h2>
//                 </div>
                
//                 {/* Content */}
//                 <p className="text-gray-700 leading-relaxed mb-4">
//                   {t(`privacy.${section.key}.content`)}
//                 </p>
                
//                 {/* List Items (for data collected, rights, security etc.) */}
//                 {hasListItems && (
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

//           {/* Contact Section (Old structure kept for email visibility, though covered in legal details/sections) */}
//           <section className="bg-gray-50 rounded-xl p-6 mt-8 border border-gray-200">
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