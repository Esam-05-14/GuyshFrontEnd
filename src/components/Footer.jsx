// import React from "react";
// import { FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa";
// import { useTranslation } from "react-i18next";

// function Footer() {
//   const { t } = useTranslation();

//   const developers = [
//     { nameKey: "ui_designer", linkedin: "https://www.linkedin.com/in/example-uiux", name:""   },
//     { nameKey: "backend_dev", linkedin: "https://www.linkedin.com/in/example-backend", name:"Salem Ali"  },
//     { nameKey: "frontend_dev", linkedin: "https://www.linkedin.com/in/example-frontend", name:"Esam Al-Shameri" },
//   ];

//   return (
//     <footer className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white py-10 border-t border-gray-600">
//       <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6 md:px-0 w-11/12">

//         {/* Logo + About */}
//         <div className="flex flex-col items-center md:items-start">
//           <img src="/logo.png" alt="Guysh Logo" className="h-16 w-16 mb-3 rounded-full border-2 border-gray-400 hover:scale-110 transition-transform duration-300" />
//           <p className="text-sm text-gray-300 text-center md:text-left leading-relaxed">
//             {t("footer.about_text")}
//           </p>
//         </div>

//         {/* Contact */}
//         <div className="flex flex-col items-center md:items-start">
//           <h3 className="text-xl font-semibold mb-4 text-gray-100">{t("footer.contact_us")}</h3>
//           <a href="mailto:yemitehad.hungary@gmail.com" className="flex gap-3 items-center hover:text-gray-300 transition-colors">
//             <i className="fa-solid fa-envelope text-lg"></i>
//             <p className="text-sm">yemitehad.hungary@gmail.com</p>
//           </a>
//         </div>

//         {/* Social Media */}
//         <div className="flex flex-col items-center md:items-start">
//           <h3 className="text-xl font-semibold mb-4 text-gray-100">{t("footer.follow_us")}</h3>
//           <div className="flex space-x-5">
//             {[
//               { href: "https://www.facebook.com/profile.php?id=61557650207920", icon: <FaFacebook /> },
//               { href: "https://www.youtube.com/@YemenStudentUnion-Hungary", icon: <FaYoutube /> },
//             ].map(({ href, icon }, index) => (
//               <a key={index} href={href} target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-200 hover:text-yellow-400 transition-transform duration-300 hover:scale-125">
//                 {icon}
//               </a>
//             ))}
//           </div>
//         </div>

//         {/* Services */}
//         <div className="flex flex-col items-center md:items-start">
//           <h3 className="text-xl font-semibold mb-4 text-gray-100">{t("footer.services")}</h3>
//           <ul className="space-y-2">
//             <li><a href="/services" className="hover:text-yellow-400 transition-colors">{t("footer.airport_pickup")}</a></li>
//             <li><a href="/services" className="hover:text-yellow-400 transition-colors">{t("footer.join_union")}</a></li>
//           </ul>
//         </div>
//       </div>

//       {/* Developers Section */}
//       <section className="w-full max-w-6xl mx-auto py-10 px-4 text-center">
//   <h2 className="text-2xl font-bold text-gray-100 mb-8">{t("footer.developers")}</h2>
//   <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-6 justify-items-center items-center">
//     {developers.map((dev) => (
//       <a
//         key={dev.nameKey}
//         href={dev.linkedin}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="flex flex-col items-center group"
//       >
//         <label className="text-gray-100">{dev.name}</label>
//         <span className="mt-2 text-sm font-medium text-gray-200 group-hover:text-yellow-400 transition-colors">
//           {t(`footer.developers_names.${dev.nameKey}`)}
//         </span>
//         <FaLinkedin className="mt-1 text-gray-400 group-hover:text-[#0A66C2] transition-colors" />
//       </a>
//     ))}
//   </div>
// </section>


//       {/* Bottom line */}
//       <div className="mt-10 text-center text-gray-400 text-sm border-t border-gray-600 pt-5">
//         © {new Date().getFullYear()} Guysh Hungary. {t("footer.all_rights_reserved")}
//       </div>
//     </footer>
//   );
// }

// export default Footer;


import React from "react";
import { FaFacebook, FaYoutube, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useAuth } from "../data/AuthContext";

function Footer() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const {language} = useAuth()

  const developers = [
    { nameKey: "ui_designer", linkedin: "https://www.linkedin.com/in/aphene/", name: language === 'ar' ? "كارن مرقص" :"Karen Morcos"},
    { nameKey: "backend_dev", linkedin: "https://www.linkedin.com/in/salem-ali-salem-a-582127233/", name: language === 'ar' ? "سالم عبدالعزيز" :"Salem Abdulaziz" },
    { nameKey: "frontend_dev", linkedin: "https://www.linkedin.com/in/esam-alshameri", name: language === 'ar'? "عصام عبدالجليل الشميري":"Esam Al-Shameri" },
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Logo + About */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="Guysh Logo" 
                className="h-14 w-14 rounded-full border-2 border-gray-500 hover:border-yellow-400 transition-all duration-300 shadow-lg" 
              />
              <span className="text-xl font-bold text-gray-100">GUYSH</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {t("footer.about_text")}
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-gray-100 border-b border-gray-600 pb-2">
              {t("footer.contact_us")}
            </h3>
            <a 
              href="mailto:yemitehad.hungary@gmail.com" 
              className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition-colors group"
            >
              <FaEnvelope className="text-lg group-hover:scale-110 transition-transform" />
              <span className="text-sm break-all">yemitehad.hungary@gmail.com</span>
            </a>
          </div>

          {/* Services */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-gray-100 border-b border-gray-600 pb-2">
              {t("footer.services")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/services" 
                  className="text-sm text-gray-300 hover:text-yellow-400 transition-colors inline-block hover:translate-x-1 duration-200"
                >
                  {t("footer.airport_pickup")}
                </a>
              </li>
              <li>
                <a 
                  href="/services" 
                  className="text-sm text-gray-300 hover:text-yellow-400 transition-colors inline-block hover:translate-x-1 duration-200"
                >
                  {t("footer.join_union")}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-gray-100 border-b border-gray-600 pb-2">
              {t("footer.follow_us")}
            </h3>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61557650207920" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 text-gray-200 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-md"
                aria-label="Facebook"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a 
                href="https://www.youtube.com/@YemenStudentUnion-Hungary" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 text-gray-200 hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-md"
                aria-label="YouTube"
              >
                <FaYoutube className="text-xl" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Developers Section */}
      <div className="border-t border-gray-600">
        <div className="container mx-auto px-6 py-10 max-w-7xl">
          <h2 className="text-xl font-semibold text-center text-gray-100 mb-8">
            {t("footer.developers")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {developers.map((dev) => (
              <a
                key={dev.nameKey}
                href={dev.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-all duration-300 group"
              >
                {dev.name && (
                  <span className="text-base font-medium text-gray-100 mb-1">
                    {dev.name}
                  </span>
                )}
                <span className="text-sm text-gray-300 mb-3 text-center">
                  {t(`footer.developers_names.${dev.nameKey}`)}
                </span>
                <FaLinkedin className="text-2xl text-gray-400 group-hover:text-[#0A66C2] transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-600 bg-gray-800/50">
        <div className="container mx-auto px-6 py-4 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Guysh Hungary. {t("footer.all_rights_reserved")}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;