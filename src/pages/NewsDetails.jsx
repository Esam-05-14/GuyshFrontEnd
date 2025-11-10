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

import { useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getPostsById } from "../services/authService";
import { useEffect, useState } from "react";
import { useAuth } from "../data/AuthContext";

export default function NewsDetails() {
  const { setPosts, setLoading } = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const { t } = useTranslation();

  // Either use the passed state or start with null
  const [news, setNews] = useState(location.state?.news || null);
  const [loading, setLocalLoading] = useState(!location.state?.news);

  useEffect(() => {
    if (!news) {
      // Fetch news if not passed through state (direct URL access)
      async function fetchNews() {
        try {
          setLocalLoading(true);
          const data = await getPostsById(id);
          setNews(data);
          //setPosts(data); // update global context if needed
        } catch (err) {
          console.error("Error loading news:", err);
        } finally {
          setLocalLoading(false);
          setLoading(false);
        }
      }
      fetchNews();
    }
  }, [id, news, setPosts, setLoading]);

  if (loading || !news) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-600 text-lg">{t("news.loading") || "Loading..."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Image */}
        {news.image && (
          <div className="relative">
            <img
              src={news.image || "/guysh1.jpg"}
              alt={news.title}
              className="w-full h-72 object-cover transition-transform duration-500 hover:scale-[1.02]"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 cursor-pointer">
              <h1 className="text-2xl font-bold text-white">{news.title}</h1>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4 cursor-pointer">
            <span>🗓️ {news.date || new Date().toLocaleDateString("en-GB")}</span>
            <span>✍️ {news.author || t("news.admin")}</span>
          </div>

          {/* Main Text */}
          <div className="text-gray-800 leading-relaxed space-y-4 cursor-pointer">
            {news.content?.split("\n").map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          <hr className="my-6 border-gray-200" />

          {/* Footer Links */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => window.history.back()}
              className="text-[#193042] font-semibold hover:underline"
            >
              {t("news.backToNews")}
            </button>

            <a
              href={news.source || "/news"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:underline font-medium"
            >
              {t("news.viewOriginal")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
