import React from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../data/AuthContext";
import { getBoardMembers } from "../services/authService";
import { useState, useEffect } from "react";

export default function AboutUs() {
  const {  language } = useAuth();
  const { t, i18n } = useTranslation();
  const [boardMembers, setBoardMembers] = useState([]);
    
    useEffect(  () => {
        const  fetchData = async () =>{ 
          try{
            const data = await getBoardMembers(language);
            setBoardMembers(data);
          }catch(error){
            console.log(error);
          }
        }
      fetchData();
    },[language]);


  if (!boardMembers || boardMembers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        {t("loading")}
      </div>
    );
  }

  const president = boardMembers.filter((m) => m.position === "President" || m.position === "رئيس الاتحاد")[0];
  const budapest = boardMembers.filter((m) => m.position?.includes("Budapest") || m.position?.includes("بودابست"));
  const debrecen = boardMembers.filter((m) => m.position?.includes("Debrecen") || m.position?.includes("دبرتسن"));
  const pecs = boardMembers.filter((m) => m.position?.includes("Pécs") || m.position?.includes("بيتش"));
  const others = boardMembers.filter((m) => m!==president && !budapest.includes(m) && !debrecen.includes(m) && !pecs.includes(m));
// console.log(others);


  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center">
      

      {/* Hero Section */}
      <section className="relative w-full bg-gray-100 text-gray-700 py-24 text-center shadow-md overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b  opacity-80"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-extrabold mb-8 tracking-wide">{t("about_title")}</h1>
          <p className="text-lg md:text-xl leading-relaxed text-gray-600">
            {t("about_paragraph")}
          </p>
        </div>
      </section>

      {/* Board Members */}
      <section className="w-full max-w-6xl py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold text-[#a3301e] mb-12">{t("board_members")}</h2>
        {president && (
          <div className="flex justify-center mb-16">
            <div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 max-w-sm">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#193042]">
                <img src={president.profile_photo || "/manaf.jpg"} alt="President" className="w-full h-full object-cover" />
              </div>
              <h3 className="mt-5 font-semibold text-[#193042] text-lg">{president.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{president.position}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {others.map((m) => (
            <div key={m.name} className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#193042]">
                <img src={m.profile_photo || "/manaf.jpg"} alt={m.position} className="w-full h-full object-cover" />
              </div>
              <p className="mt-4 font-medium text-[#193042] text-base">{m.name}</p>
              <p className="text-xs text-gray-500">{m.position}</p>
            </div>
          ))}
        </div>
      </section>

      {/* City Representatives */}
      <section className="w-full max-w-6xl py-16 px-6 text-center bg-gray-100 border-t border-gray-300">
        <h2 className="text-3xl font-semibold text-[#a3301e] mb-12">{t("city_representatives")}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <CityCard title={t("cities.budapest")} members={budapest} />
          <CityCard title={t("cities.debrecen")} members={debrecen} />
          <CityCard title={t("cities.pecs")} members={pecs} />

        </div>
      </section>
    </div>
  );
}

function CityCard({ title, members  }) {
  const { t } = useTranslation();
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col items-center">
      <h3 className="text-[#912211] text-lg font-semibold mb-6">{title}</h3>
      {members.length > 0 ? (
        <div className="flex justify-center gap-10 flex-wrap">
          {members.map((m) => (
            <div key={m.name} className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#193042]">
                <img src={m.profile_photo || "/manaf.jpg"} alt={m.position} className="w-full h-full object-cover" />
              </div>
              <p className="mt-3 text-[#193042] text-sm font-medium">{m.name}</p>
              <p className="text-xs text-gray-500">{m.position}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm italic">{t("no_representatives")}</p>
      )}
    </div>
  );
}
