import React from "react";
import {
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white py-10 border-t border-gray-600">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6 md:px-0 w-11/12">

        {/* Logo + About */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src="/logo.png"
            alt="Guysh Logo"
            className="h-16 w-16 mb-3 rounded-full border-2 border-gray-400 hover:scale-110 transition-transform duration-300"
          />
          <p className="text-sm text-gray-300 text-center md:text-left leading-relaxed">
            Guysh Hungary — connecting and supporting Yemeni students in Hungary
            through community, events, and guidance.
          </p>
        </div>

        {/* Contact */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold mb-4 text-gray-100">
            Contact Us
          </h3>
          <a
            href="mailto:yemitehad.hungary@gmail.com"
            className="flex gap-3 items-center hover:text-gray-300 transition-colors"
          >
            <i className="fa-solid fa-envelope text-lg"></i>
            <p className="text-sm">yemitehad.hungary@gmail.com</p>
          </a>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold mb-4 text-gray-100">
            Follow Us
          </h3>
          <div className="flex space-x-5">
            {[
              {
                href: "https://www.facebook.com/profile.php?id=61557650207920",
                icon: <FaFacebook />,
              },
              {
                href: "https://www.youtube.com/@YemenStudentUnion-Hungary",
                icon: <FaYoutube />,
              },
            ].map(({ href, icon }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-200 hover:text-yellow-400 transition-transform duration-300 hover:scale-125"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold mb-4 text-gray-100">
            Our Services
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/services"
                className="hover:text-yellow-400 transition-colors"
              >
                Airport Packup
              </a>
            </li>
            <li>
              <a
                href="/services"
                className="hover:text-yellow-400 transition-colors"
              >
                Join The Union
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-10 text-center text-gray-400 text-sm border-t border-gray-600 pt-5">
        © {new Date().getFullYear()} Guysh Hungary. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
