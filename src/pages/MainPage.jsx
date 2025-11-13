// // import React, { useEffect } from "react";
// // import PictureSlider from "../components/PictureSlider";
// // import CardSmall from "../components/CardSmall";
// // import { useTranslation } from "react-i18next";
// // import { useAuth } from "../data/AuthContext"; // assuming news comes from context or API

// // function MainPage() {
// //   const { t, i18n } = useTranslation();
// //   const { posts: news} = useAuth(); 

// //   // RTL / LTR auto handling
// //   useEffect(() => {
// //     document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
// //   }, [i18n.language]);

// //   // Take only latest 6 news items for cards
// //   const latestNews = news?.slice(0, 6) || [];

// //   return (
// //     <div className="bg-[#f8f9fa] flex flex-col items-center w-full text-gray-800">
// //       {/* Hero Section */}
// //       <section className="relative w-full flex justify-center mt-16">
// //         <div className="absolute inset-0 from-[#193042]/30 to-transparent pointer-events-none" />
// //         <PictureSlider />
// //       </section>

// //       {/* Introduction */}
// //       <section className="w-full max-w-6xl px-6 md:px-12 mt-20 text-center">
// //         <h3 className="text-4xl font-bold text-[#a3301e] mb-6 tracking-wide relative inline-block after:content-[''] after:block after:w-20 after:h-[3px] after:bg-[#a3301e] after:mx-auto after:mt-2">
// //           {t("mainPage.welcomeTitle")}
// //         </h3>
// //         <p className="text-base sm:text-lg leading-relaxed text-[#193042] max-w-3xl mx-auto">
// //           {t("mainPage.welcomeText")}
// //         </p>
// //       </section>

// //       {/* Services / Activities */}
// //       <section className="w-full max-w-6xl px-6 md:px-12 mt-16 mb-24">
// //         <h3 className="text-3xl font-semibold text-[#a3301e] mb-8 text-center">
// //           {t("mainPage.servicesTitle")}
// //         </h3>

// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
// //           {latestNews.length > 0 ? (
// //             latestNews.map((item, i) => (
// //               <div
// //                 key={i}
// //                 className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
// //               >
// //                 <CardSmall
// //                   title={item.title}
// //                   image='/guysh1.jpg'
// //                   date={item.date}
// //                   content={item.content}
// //                   link={`/news/${item.id}`}
// //                 />
// //               </div>
// //             ))
// //           ) : (
// //             <p className="text-gray-500 text-center col-span-3">
// //               {t("mainPage.noNews")}
// //             </p>
// //           )}
// //         </div>
// //       </section>

// //       {/* Decorative Divider */}
// //       <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#a3301e]/40 to-transparent mb-10"></div>
// //     </div>
// //   );
// // }

// // export default MainPage;

// import React, { useEffect } from "react";
// import PictureSlider from "../components/PictureSlider";
// import CardSmall from "../components/CardSmall";
// import { useTranslation } from "react-i18next";
// import { useAuth } from "../data/AuthContext";
// import logo from "../../public/logo.png/"

// function MainPage() {
//   const { t, i18n } = useTranslation();
//   const { posts: news } = useAuth();

//   useEffect(() => {
//     document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
//   }, [i18n.language]);

//   const latestNews = news?.slice(0, 6) || [];

//   const logoMeaning = [
//     { letter: "G", word: t("General"), meaning: t("Represents unity and inclusiveness among all students.") },
//     { letter: "U", word: t("Union"), meaning: t("Symbolizes collaboration, solidarity, and shared goals.") },
//     { letter: "Y", word: t("Yemeni"), meaning: t("Reflects our national identity, heritage, and pride.") },
//     { letter: "S", word: t("Students"), meaning: t("Focuses on the academic and personal growth of every student.") },
//     { letter: "H", word: t("Hungary"), meaning: t("Acknowledges our host country and the bridge of friendship we share.") },
//   ];
//   logoMeaning.reverse()

//   return (
//     <div className="bg-[#f8f9fa] flex flex-col items-center w-full text-gray-800">
      
//       {/* Logo Meaning Section */}
//       <section className="w-full max-w-6xl px-6 md:px-12 mt-20 mb-8 text-center">
//         <img
//           src={logo}
//           alt="GUYSH Logo"
//           className="w-48 sm:w-56 mx-auto mb-6 drop-shadow-md"
//         />
//         <h2 className="text-3xl font-bold text-[#193042] mb-4">
//           {t("General Union for Yemeni Academic Students – Hungary")}
//         </h2>
//         <p className="text-gray-600 text-base sm:text-lg mb-10">
//           {t("Each letter in GUYSH reflects our vision, values, and unity.")}
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
//           {logoMeaning.map((item, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-2xl shadow-md p-5 transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
//             >
//               <h3 className="text-[#a3301e] text-4xl font-extrabold mb-2">{item.letter}</h3>
//               <h4 className="text-lg font-semibold text-[#193042] mb-1">{item.word}</h4>
//               <p className="text-sm text-gray-600">{item.meaning}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Hero Section */}
//       <section className="relative w-full flex justify-center mt-8">
//         <div className="absolute inset-0 from-[#193042]/30 to-transparent pointer-events-none" />
//         <PictureSlider />
//       </section>

//       {/* Introduction */}
//       <section className="w-full max-w-6xl px-6 md:px-12 mt-20 text-center">
//         <h3 className="text-4xl font-bold text-[#a3301e] mb-6 tracking-wide relative inline-block after:content-[''] after:block after:w-20 after:h-[3px] after:bg-[#a3301e] after:mx-auto after:mt-2">
//           {t("mainPage.welcomeTitle")}
//         </h3>
//         <p className="text-base sm:text-lg leading-relaxed text-[#193042] max-w-3xl mx-auto">
//           {t("mainPage.welcomeText")}
//         </p>
//       </section>

//       {/* Services / Activities */}
//       <section className="w-full max-w-6xl px-6 md:px-12 mt-16 mb-24">
//         <h3 className="text-3xl font-semibold text-[#a3301e] mb-8 text-center">
//           {t("mainPage.servicesTitle")}
//         </h3>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
//           {latestNews.length > 0 ? (
//             latestNews.map((item, i) => (
//               <div
//                 key={i}
//                 className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
//               >
//                 <CardSmall
//                   title={item.title}
//                   image="/guysh1.jpg"
//                   date={item.date}
//                   content={item.content}
//                   link={`/news/${item.id}`}
//                 />
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 text-center col-span-3">
//               {t("mainPage.noNews")}
//             </p>
//           )}
//         </div>
//       </section>

//       <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#a3301e]/40 to-transparent mb-10"></div>
//     </div>
//   );
// }

// export default MainPage;
import React, { useEffect } from "react";
import PictureSlider from "../components/PictureSlider";
import CardSmall from "../components/CardSmall";
import { useTranslation } from "react-i18next";
import { useAuth } from "../data/AuthContext";
import logo from "/logo.png"; // works in Vite or CRA if logo.png is in public/

function MainPage() {
  const { t, i18n } = useTranslation();
  const { posts: news } = useAuth();

  useEffect(() => {
    document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const latestNews = news?.slice(0, 6) || [];

  

  // reverse order for Arabic for right-to-left flow
  if (i18n.language === "ar") logoMeaning.reverse();

  return (
    <div className="bg-[#f8f9fa] flex flex-col items-center w-full text-gray-800">
      {/* Logo Meaning Section */}
      <section className="w-full max-w-6xl px-6 md:px-12 mt-20 mb-8 text-center">
        <img
          src={logo}
          alt="GUYSH Logo"
          className="w-48 sm:w-56 mx-auto mb-6 drop-shadow-md"
        />
        <h2 className="text-3xl font-bold text-[#193042] mb-4">
          {t("logoMeaning.heading")}
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mb-10">
          {t("logoMeaning.description")}
        </p>

        
      </section>

      {/* Hero Section */}
      <section className="relative w-full flex justify-center mt-8">
        <div className="absolute inset-0 from-[#193042]/30 to-transparent pointer-events-none" />
        <PictureSlider />
      </section>

      {/* Introduction */}
      <section className="w-full max-w-6xl px-6 md:px-12 mt-20 text-center">
        <h3 className="text-4xl font-bold text-[#a3301e] mb-6 tracking-wide relative inline-block after:content-[''] after:block after:w-20 after:h-[3px] after:bg-[#a3301e] after:mx-auto after:mt-2">
          {t("mainPage.welcomeTitle")}
        </h3>
        <p className="text-base sm:text-lg leading-relaxed text-[#193042] max-w-3xl mx-auto">
          {t("mainPage.welcomeText")}
        </p>
      </section>

      {/* Services / Activities */}
      <section className="w-full max-w-6xl px-6 md:px-12 mt-16 mb-24">
        <h3 className="text-3xl font-semibold text-[#a3301e] mb-8 text-center">
          {t("mainPage.servicesTitle")}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
          {latestNews.length > 0 ? (
            latestNews.map((item, i) => (
              <div
                key={i}
                className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <CardSmall
                  title={item.title}
                  image="/guysh1.jpg"
                  date={item.date}
                  content={item.content}
                  link={`/news/${item.id}`}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">
              {t("mainPage.noNews")}
            </p>
          )}
        </div>
      </section>

      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#a3301e]/40 to-transparent mb-10"></div>
    </div>
  );
}

export default MainPage;
