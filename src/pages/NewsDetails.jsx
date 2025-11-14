// // import { useParams, useLocation } from "react-router-dom";

// // export default function NewsDetails() {
// //   const { id } = useParams();
// //   const location = useLocation();
// //   const news_ = location.state?.news;

// //   if (!news_) {
// //     return <p className="text-center mt-10 text-gray-500 italic">News not found.</p>;
// //   }

// //   return (
// //     <div className="min-h-screen bg-[#f8f9fa]  py-12 px-4">
// //       <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
// //         {/* Image */}
// //         {news_.image && (
// //           <div className="relative">
// //             <img
// //               src='/public/guysh1.jpg'
// //               alt="news"
// //               className="w-full h-72 object-cover transition-transform duration-500 hover:scale-[1.02]"
// //             />
// //             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
// //               <h1 className="text-2xl font-bold text-white">{news_.title}</h1>
// //             </div>
// //           </div>
// //         )}

// //         {/* Content */}
// //         <div className="p-6">
// //           {/* Meta Info */}
// //           <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
// //             <span>
// //               🗓️ {news_.date || new Date().toLocaleDateString("en-GB")}
// //             </span>
// //             <span>
// //               ✍️ {news_.author || "Admin"}
// //             </span>
// //           </div>

// //           {/* Main Text */}
// //           <div className="text-gray-800 leading-relaxed space-y-4">
// //             {news_.content.split("\n").map((para, idx) => (
// //               <p key={idx}>{para}</p>
// //             ))}
// //           </div>

// //           {/* Divider */}
// //           <hr className="my-6 border-gray-200" />

// //           {/* Footer Links */}
// //           <div className="flex justify-between items-center">
// //             <button
// //               onClick={() => window.history.back()}
// //               className="text-[#193042] font-semibold hover:underline"
// //             >
// //               ← Back to News
// //             </button>

// //             <a
// //               href={news_.source || "/news"}
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               className="text-red-600 hover:underline font-medium"
// //             >
// //               View Original Source ↗
// //             </a>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import { useParams, useLocation } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { getPostsById } from "../services/authService";
// import { useEffect } from "react";
// import { useAuth } from "../data/AuthContext";

// export default function NewsDetails() {
//   const {setPosts , setLoading} = useAuth()
//   const { id } = useParams();
//   const location = useLocation();
//   const { t } = useTranslation();
//   const news_ = location.state?.news;

//   useEffect(() => {
//     if (!news_) {
//       // Only fetch if no state (direct URL access or refresh)
//       async function fetchNews() {
//         try {
//           const data = await getPostsById(id);
//           setPosts(data);
//         } catch (err) {
//           console.error("Error loading news:", err);
//         } finally {
//           setLoading(false);
//         }
//       }
//       fetchNews();
//     }
//   }, [id, news_]);
  

//   return (
//     <div className="min-h-screen bg-[#f8f9fa] py-12 px-4">
//       <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
//         {/* Image */}
//         {news_.image && (
//           <div className="relative">
//             <img
//               src="/public/guysh1.jpg"
//               alt="news"
//               className="w-full h-72 object-cover transition-transform duration-500 hover:scale-[1.02]"
//             />
//             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
//               <h1 className="text-2xl font-bold text-white">{news_.title}</h1>
//             </div>
//           </div>
//         )}

//         {/* Content */}
//         <div className="p-6">
//           {/* Meta Info */}
//           <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
//             <span>
//               🗓️ {news_.date || new Date().toLocaleDateString("en-GB")}
//             </span>
//             <span>
//               ✍️ {news_.author || t("news.admin")}
//             </span>
//           </div>

//           {/* Main Text */}
//           <div className="text-gray-800 leading-relaxed space-y-4">
//             {news_.content.split("\n").map((para, idx) => (
//               <p key={idx}>{para}</p>
//             ))}
//           </div>

//           <hr className="my-6 border-gray-200" />

//           {/* Footer Links */}
//           <div className="flex justify-between items-center">
//             <button
//               onClick={() => window.history.back()}
//               className="text-[#193042] font-semibold hover:underline"
//             >
//               {t("news.backToNews")}
//             </button>

//             <a
//               href={news_.source || "/news"}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-red-600 hover:underline font-medium"
//             >
//               {t("news.viewOriginal")}
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useParams, useLocation } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { getPostsById } from "../services/authService";
// import { useEffect, useState } from "react";
// import { useAuth } from "../data/AuthContext";

// export default function NewsDetails() {
//   const {  setLoading, language } = useAuth();
//   const { id } = useParams();
//   const { t } = useTranslation();

//   // Either use the passed state or start with null
//   const [news, setNews] = useState(null);
//   const [loading, setLocalLoading] = useState(false);

//   useEffect(() => {

//       // Fetch news if not passed through state (direct URL access)
//       async function fetchNews() {
//         try {
//           setLocalLoading(true);
//           const data = await getPostsById(id, language);
//           console.log(data);
          
//           setNews(data);
//         } catch (err) {
//           console.error("Error loading news:", err);
//         } finally {
//           setLocalLoading(false);
//           setLoading(false);
//         }
//       }
//       fetchNews();

//   }, [id, setLoading, language]);

//   if (loading || !news) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <p className="text-gray-600 text-lg">{t("news.loading") || "Loading..."}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f8f9fa] py-12 px-4">
//       <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
//         {/* Image */}
//         {news.image && (
//           <div className="relative">
//             <img
//               src={news.image || "/guysh1.jpg"}
//               alt={news.title}
//               className="w-full h-72 object-cover transition-transform duration-500 hover:scale-[1.02]"
//             />
//             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 cursor-pointer">
//               <h1 className="text-2xl font-bold text-white">{news.title}</h1>
//             </div>
//           </div>
//         )}

//         {/* Content */}
//         <div className="p-6">
//           {/* Meta Info */}
//           <div className="flex items-center justify-between text-sm text-gray-500 mb-4 cursor-pointer">
//             <span>🗓️ {news.date || new Date().toLocaleDateString("en-GB")}</span>
//           </div>

//           {/* Main Text */}
//           <div className="text-gray-800 leading-relaxed space-y-4 cursor-pointer">
//             {news.content?.split("\n").map((para, idx) => (
//               <p key={idx}>{para}</p>
//             ))}
//           </div>

//           <hr className="my-6 border-gray-200" />

//           {/* Footer Links */}
//           <div className="flex justify-between items-center">
//             <button
//               onClick={() => window.history.back()}
//               className="text-[#193042] font-semibold hover:underline"
//             >
//               {t("news.backToNews")}
//             </button>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getPostsById } from "../services/authService";
import { useEffect, useState } from "react";
import { useAuth } from "../data/AuthContext";
import { ArrowLeft, Calendar, Clock, Share2, ChevronLeft } from "lucide-react";

export default function NewsDetails() {
  const { setLoading, language } = useAuth();
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  
  const [news, setNews] = useState(null);
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    async function fetchNews() {
      try {
        setLocalLoading(true);
        const data = await getPostsById(id, language);
        setNews(data);
      } catch (err) {
        console.error("Error loading news:", err);
      } finally {
        setLocalLoading(false);
        setLoading(false);
      }
    }
    fetchNews();
  }, [id, setLoading, language]);

  const formatDate = (dateString) => {
    if (!dateString) return new Date().toLocaleDateString();
    const date = new Date(dateString);
    return date.toLocaleDateString(i18n.language === "ar" ? "ar-EG" : "en-GB", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: news.title,
          text: news.content?.substring(0, 100) + '...',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert(t("news.linkCopied", "Link copied to clipboard!"));
    }
  };

  if (localLoading || !news) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#193042] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">{t("news.loading") || "Loading..."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 py-8 px-4 sm:px-6 lg:px-8" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className={`flex items-center gap-2 text-[#193042] font-semibold mb-6 hover:text-[#254e6f] transition-colors group ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <ChevronLeft size={20} className={`group-hover:-translate-x-1 transition-transform ${isRTL ? "rotate-180" : ""}`} />
          <span>{t("news.backToNews", "Back to News")}</span>
        </button>

        {/* Main Content Card */}
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Hero Image */}
          {news.image && (
            <div className="relative h-96 overflow-hidden">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
                  {news.title}
                </h1>
                
                {/* Meta Info */}
                <div className={`flex flex-wrap items-center gap-4 text-white/90 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <Calendar size={18} />
                    <span className="text-sm font-medium">{formatDate(news.created_at || news.date)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Article Content */}
          <div className="p-6 sm:p-8 lg:p-12">
            {/* Title for posts without image */}
            {!news.image && (
              <>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#193042] mb-4">
                  {news.title}
                </h1>
                <div className={`flex flex-wrap items-center gap-4 text-gray-600 mb-8 pb-8 border-b border-gray-200 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <Calendar size={18} />
                    <span className="text-sm font-medium">{formatDate(news.created_at || news.date)}</span>
                  </div>
                  
                </div>
              </>
            )}

            {/* Main Content */}
            <div className="prose prose-lg max-w-none">
              <div className={`text-gray-800 leading-relaxed space-y-6 ${isRTL ? "text-right" : "text-left"}`} style={{ fontSize: '1.125rem', lineHeight: '1.875rem' }}>
                {news.content?.split("\n").map((para, idx) => (
                  para.trim() && <p key={idx} className="mb-6">{para}</p>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="my-10 border-t border-gray-200"></div>

            {/* Footer Actions */}
            <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
              <button
                onClick={() => window.history.back()}
                className={`flex items-center gap-2 text-[#193042] font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <ArrowLeft size={20} className={isRTL ? "rotate-180" : ""} />
                <span>{t("news.backToNews", "Back to News")}</span>
              </button>

              <button
                onClick={handleShare}
                className={`flex items-center gap-2 bg-[#193042] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#254e6f] transition-all duration-200 hover:shadow-lg ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <Share2 size={20} />
                <span>{language === "ar" ? "شارك الخبر": "Share Article"}</span>
              </button>
            </div>
          </div>
        </article>

        
      </div>
    </div>
  );
}