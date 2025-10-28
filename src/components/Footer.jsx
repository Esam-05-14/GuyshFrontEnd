import React from "react";
import { FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  const developers = [
    { nameKey: "ui_designer", linkedin: "https://www.linkedin.com/in/example-uiux", img: "/manaf.jpg" },
    { nameKey: "backend_dev", linkedin: "https://www.linkedin.com/in/example-backend", img: "/manaf.jpg" },
    { nameKey: "frontend_dev", linkedin: "https://www.linkedin.com/in/example-frontend", img: "/manaf.jpg" },
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white py-10 border-t border-gray-600">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6 md:px-0 w-11/12">

        {/* Logo + About */}
        <div className="flex flex-col items-center md:items-start">
          <img src="/logo.png" alt="Guysh Logo" className="h-16 w-16 mb-3 rounded-full border-2 border-gray-400 hover:scale-110 transition-transform duration-300" />
          <p className="text-sm text-gray-300 text-center md:text-left leading-relaxed">
            {t("footer.about_text")}
          </p>
        </div>

        {/* Contact */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold mb-4 text-gray-100">{t("footer.contact_us")}</h3>
          <a href="mailto:yemitehad.hungary@gmail.com" className="flex gap-3 items-center hover:text-gray-300 transition-colors">
            <i className="fa-solid fa-envelope text-lg"></i>
            <p className="text-sm">yemitehad.hungary@gmail.com</p>
          </a>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold mb-4 text-gray-100">{t("footer.follow_us")}</h3>
          <div className="flex space-x-5">
            {[
              { href: "https://www.facebook.com/profile.php?id=61557650207920", icon: <FaFacebook /> },
              { href: "https://www.youtube.com/@YemenStudentUnion-Hungary", icon: <FaYoutube /> },
            ].map(({ href, icon }, index) => (
              <a key={index} href={href} target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-200 hover:text-yellow-400 transition-transform duration-300 hover:scale-125">
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold mb-4 text-gray-100">{t("footer.services")}</h3>
          <ul className="space-y-2">
            <li><a href="/services" className="hover:text-yellow-400 transition-colors">{t("footer.airport_pickup")}</a></li>
            <li><a href="/services" className="hover:text-yellow-400 transition-colors">{t("footer.join_union")}</a></li>
          </ul>
        </div>
      </div>

      {/* Developers Section */}
      <section className="w-full max-w-6xl mx-auto py-10 px-4 text-center">
  <h2 className="text-2xl font-bold text-gray-100 mb-8">{t("footer.developers")}</h2>
  <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-6 justify-items-center items-center">
    {developers.map((dev) => (
      <a
        key={dev.nameKey}
        href={dev.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center group"
      >
        <div className="w-16 h-16  rounded-full overflow-hidden border-2 border-[#193042] shadow hover:shadow-lg transition-shadow duration-300">
          <img
            src={dev.img}
            alt={t(`footer.developers_names.${dev.nameKey}`)}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="mt-2 text-sm font-medium text-gray-200 group-hover:text-yellow-400 transition-colors">
          {t(`footer.developers_names.${dev.nameKey}`)}
        </span>
        <FaLinkedin className="mt-1 text-gray-400 group-hover:text-[#0A66C2] transition-colors" />
      </a>
    ))}
  </div>
</section>


      {/* Bottom line */}
      <div className="mt-10 text-center text-gray-400 text-sm border-t border-gray-600 pt-5">
        © {new Date().getFullYear()} Guysh Hungary. {t("footer.all_rights_reserved")}
      </div>
    </footer>
  );
}

export default Footer;
