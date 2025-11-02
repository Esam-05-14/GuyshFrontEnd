import React, { useEffect } from "react";
import PictureSlider from "../components/PictureSlider";
import CardSmall from "../components/CardSmall";
import { useTranslation } from "react-i18next";
import { useAuth } from "../data/AuthContext"; // assuming news comes from context or API

function MainPage() {
  const { t, i18n } = useTranslation();
  const { posts: news} = useAuth(); // Example: replace with your actual source of news

  // RTL / LTR auto handling
  useEffect(() => {
    document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  // Take only latest 6 news items for cards
  const latestNews = news?.slice(0, 6) || [];

  return (
    <div className="bg-[#f8f9fa] flex flex-col items-center w-full text-gray-800">
      {/* Hero Section */}
      <section className="relative w-full flex justify-center mt-16">
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
                  image='/guysh1.jpg'
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

      {/* Decorative Divider */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#a3301e]/40 to-transparent mb-10"></div>
    </div>
  );
}

export default MainPage;
