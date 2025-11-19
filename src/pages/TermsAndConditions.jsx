import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FileText, CheckCircle } from "lucide-react";
import ReactMarkdown from "react-markdown"; 
import { getTerms } from "../services/authService";
import { useAuth } from "../data/AuthContext";

export default function TermsAndConditions() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { language } = useAuth();
  
  const [terms, setTerms] = useState("");
  const [lastUpdated, setLastUpdated] = useState(""); // New state for date
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getTerms(language);
        
        // 1. Extract Content
        if (data && data.content) {
          setTerms(data.content);
        } else if (typeof data === 'string') {
          setTerms(data);
        }

        // 2. Extract Date from metadata
        if (data && data.meta && data.meta.effective_date) {
          setLastUpdated(data.meta.effective_date);
        }

      } catch (error) {
        console.error("Failed to load terms:", error);
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
            <FileText size={40} />
            <h1 className="text-4xl font-bold">
              {t("terms.title") || "Terms & Conditions"}
            </h1>
          </div>
          <p className="text-gray-100 text-lg">
            {t("terms.subtitle") || "Please read these terms carefully before using our services."}
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
                <div className={`text-sm text-gray-500 pb-4 border-b border-gray-200 mb-6 `}>
                  {t("terms.lastUpdated") || "Last Updated"}: <span className="font-semibold text-[#193042]">{lastUpdated}</span>
                </div>
              )}
              

              {/* Markdown Content */}
              <div className={`markdown-content ${isRTL ? "text-right" : "text-left"}`}>
                <ReactMarkdown
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1 className="text-3xl font-bold text-[#193042] mt-8 mb-4 border-b pb-2" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="text-2xl font-bold text-[#193042] mt-6 mb-3 flex items-center gap-2" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="text-xl font-semibold text-[#193042] mt-4 mb-2" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="text-gray-700 leading-relaxed mb-4 text-lg" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="space-y-2 mb-6 list-none" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="space-y-2 mb-6 list-decimal list-inside text-gray-700" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="flex items-start gap-3 text-gray-700">
                        <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                        <span>{props.children}</span>
                      </li>
                    ),
                    a: ({ node, ...props }) => (
                      <a className="text-[#912211] hover:underline font-medium transition-colors" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="font-bold text-[#193042]" {...props} />
                    ),
                  }}
                >
                  {typeof terms === 'string' ? terms : ""}
                </ReactMarkdown>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
// import React, { useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import { FileText } from "lucide-react";
// import { getTerms } from "../services/authService";
// import { useAuth } from "../data/AuthContext";

// export default function TermsAndConditions() {
//   const { t, i18n } = useTranslation();
//   const isRTL = i18n.language === "ar";
//   const {language} = useAuth();
//   const [terms, setTerms] = useState()
  
//   // Array to map through the sections 1 to 13, 15, and 16
//   const sectionNumbers = Array.from({ length: 13 }, (_, i) => i + 1); // [1, 2, ..., 13]
//   const finalSections = [15, 16];
  
//   // Helper to get the translation key for a section
//   const getSectionKey = (num) => `terms.section_${num}`;

//   useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const data = await getTerms(language);
//           setTerms(data);
//         } catch (error) {
//           // console.log(error);
//         }
//       };
//       fetchData();
//     }, []);
  

//   return (
//     <div className="text-3xl align-middle">{terms}</div>
//   )

  // return (
  //   <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir={isRTL ? "rtl" : "ltr"}>
  //     <div className="max-w-4xl mx-auto">
  //       {/* Header */}
  //       <div className="bg-gradient-to-r from-[#193042] to-[#254e6f] rounded-2xl shadow-xl p-8 mb-8 text-white">
  //         <div className={`flex items-center gap-4 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
  //           <FileText size={40} />
  //           <h1 className="text-4xl font-bold">
  //             {t("terms.title")}
  //           </h1>
  //         </div>
  //         <p className="text-gray-100 text-lg">
  //           {t("terms.subtitle")}
  //         </p>
  //       </div>

  //       {/* Content */}
  //       <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
  //         {/* Last Updated - Assuming you keep this feature */}
  //         <div className="text-sm text-gray-500 pb-4 border-b border-gray-200">
  //           {t("terms.lastUpdated")}: {t("terms.updateDate")}
  //         </div>

  //         {/* Dynamic Sections (1 - 13) */}
  //         {sectionNumbers.map((num) => {
  //           const key = getSectionKey(num);
  //           // Check if there are list items for this section (e.g., for Eligibility or Conduct)
  //           const hasListItems = num === 2 || num === 6; 

  //           return (
  //             <section key={num}>
  //               <h2 className="text-2xl font-bold text-[#193042] mb-4 flex items-center gap-2">
  //                 <span className="text-[#912211]">{num}.</span> {t(`${key}.title`)}
  //               </h2>
  //               <p className="text-gray-700 leading-relaxed mb-4">
  //                 {t(`${key}.content`)}
  //               </p>
                
  //               {/* Optional List Items for Section 2 (Eligibility) and 6 (User Conduct) */}
  //               {hasListItems && (
  //                 <ul className="space-y-2 list-disc list-inside px-4">
  //                   {t(`${key}.items`, { returnObjects: true }).map((item, index) => (
  //                     <li key={index} className={`text-gray-700 ${isRTL ? "text-right" : "text-left"}`}>
  //                       <span>{item}</span>
  //                     </li>
  //                   ))}
  //                 </ul>
  //               )}
  //             </section>
  //           );
  //         })}
          
  //         {/* Section 14: Contact Information - Special styling */}
  //         <section id="section-14" className="bg-gray-50 rounded-xl p-6 mt-8">
  //           <h2 className="text-2xl font-bold text-[#193042] mb-4 flex items-center gap-2">
  //             <span className="text-[#912211]">14.</span> {t("terms.section_14.title")}
  //           </h2>
  //           <p className="text-gray-700 mb-2">
  //             {t("terms.section_14.content")}
  //           </p>
  //           <a 
  //             href="mailto:yemitehad.hungary@gmail.com" 
  //             className="text-[#912211] hover:underline font-medium"
  //           >
  //             yemitehad.hungary@gmail.com
  //           </a>
  //         </section>

  //         {/* Dynamic Sections (15 - 16) */}
  //         {finalSections.map((num) => {
  //           const key = getSectionKey(num);
  //           return (
  //             <section key={num}>
  //               <h2 className="text-2xl font-bold text-[#193042] mb-4 flex items-center gap-2">
  //                 <span className="text-[#912211]">{num}.</span> {t(`${key}.title`)}
  //               </h2>
  //               <p className="text-gray-700 leading-relaxed mb-4">
  //                 {t(`${key}.content`)}
  //               </p>
  //             </section>
  //           );
  //         })}

  //       </div>
  //     </div>
  //   </div>
  // );
