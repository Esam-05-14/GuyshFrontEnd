// // import React from 'react'
// // import { data, Link } from 'react-router-dom'
// // import NewsCard from '../components/NewsCard'
// // import { useAuth } from '../data/AuthContext'





// // function News() {
// //   const news = useAuth().posts;

// //   return (
// //     <div className='bg-[#f8f9fa]  flex flex-col items-center justify-center w-full'>

// //       <div className="w-full px-20 mt-20">
// //         <h1 className="text-3xl  text-[#a3301e] my-7">News</h1>
// //       </div>
// //       <div className='flex flex-col w-full px-20 gap-10 mt-5 mb-10 justify-items-center'>
// //         {news.map(n => (
// //           <Link key={n.id} to={`/news/${n.id}`}
// //           state={{news : n}}
// //           >
// //             <NewsCard
// //               title={n.title}
// //               content={n.content}
// //               date={Date(n.date).toString().slice(0, 15)}
// //               src={n.image}
// //             />
// //           </Link>
// //         ))}
// //       </div>

// //     </div>
// //   )
// // }

// // export default News

// import React from "react";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import NewsCard from "../components/NewsCard";
// import { useAuth } from "../data/AuthContext";
// import { useEffect, useState } from "react";
// import { getPosts } from "../services/authService";

// function News() {
//   const { t, i18n } = useTranslation();
//   const { posts: news , setPosts,language } = useAuth();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const data = await getPosts(language);
//           setPosts(data);
//         } catch (error) {
//           console.error("Error fetching posts:", error);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchData();
//     }, [language]);

//   return (
//     <div
//       className="bg-[#f8f9fa] flex flex-col items-center justify-center w-full"
//       dir={i18n.dir()}
//     >
//       {/* Header */}
//       <div
//         className={`w-full px-6 sm:px-12 lg:px-20 mt-20 ${
//           i18n.dir() === "rtl" ? "text-right" : "text-left"
//         }`}
//       >
//         <h1 className="text-3xl text-[#a3301e] my-7 font-bold">
//           {t("news.title")}
//         </h1>
//       </div>

//       {/* News List */}
//       <div className="flex flex-col w-full px-6 sm:px-12 lg:px-20 gap-10 mt-5 mb-10 justify-items-center">
//         {news && news.length > 0 ? (
//           news.map((n) => (
//             <Link key={n.id} to={`/news/${n.id}`} state={{ news: n }}>
//               <NewsCard
//                 title={n.title}
//                 content={n.content}
//                 date={Date(n.date).toString().slice(0, 15)}
//                 src={n.image || "/guysh2.jpg"}
//               />
//             </Link>
//           ))
//         ) : (
//           <p className="text-center text-gray-600">{t("news.no_posts")}</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default News;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NewsCard from "../components/NewsCard";
import { useAuth } from "../data/AuthContext";
import { getPosts } from "../services/authService";

function News() {
  const { t, i18n } = useTranslation();
  const {  language } = useAuth();
  const [loading, setLoading] = useState(true);
  const [news , setNews] = useState([])

  const formatDate = (dateString) => {
    if (!dateString) return new Date().toLocaleDateString();
    const date = new Date(dateString);
    return date.toLocaleDateString(i18n.language === "ar" ? "ar-EG" : "en-GB", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };



  // 🔹 Refetch posts when language changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getPosts(language);
        setNews(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  return (
    <div
      className="bg-[#f8f9fa] flex flex-col items-center justify-center w-full"
      dir={i18n.dir()}
    >
      {/* Header */}
      <div
        className={`w-full px-6 sm:px-12 lg:px-20 mt-20 ${
          i18n.dir() === "rtl" ? "text-right" : "text-left"
        }`}
      >
        <h1 className="text-3xl text-[#a3301e] my-7 font-bold">
          {t("news.title")}
        </h1>
      </div>

      {/* News List */}
      <div className="flex flex-col w-full px-6 sm:px-12 lg:px-20 gap-10 mt-5 mb-10 justify-items-center">
        {loading ? (
          <p className="text-center text-gray-500">{t("loading")}</p>
        ) : news && news.length > 0 ? (
          news.map((n) => (
            <Link key={n.id} to={`/news/${n.id}`} >
              <NewsCard
                title={n.title}
                content={n.content}
                date={formatDate(n.date)}
                src={n.image || "/guysh2.jpg"}
              />
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-600">{t("news.no_posts")}</p>
        )}
      </div>
    </div>
  );
}

export default News;
