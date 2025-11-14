import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyEmail } from "../services/authService";
import { useTranslation } from "react-i18next";
import { 
  CheckCircle, 
  XCircle, 
  Loader2,
  Home,
  Mail
} from "lucide-react";

export default function VarifyEmail() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function verify() {
      try {
        await verifyEmail(uid, token);
        setStatus("success");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    }
    verify();
  }, [uid, token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 p-4" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-md w-full">
        {/* Loading State */}
        {status === "loading" && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
                <Loader2 className="text-blue-600 animate-spin" size={40} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t("guidanceVerify.loading")}
            </h2>
            <p className="text-gray-600">
              {t("guidanceVerify.loadingMessage")}
            </p>
            <div className="mt-6">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Success State */}
        {status === "success" && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center transform transition-all duration-500 scale-100">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 animate-bounce">
                <CheckCircle className="text-green-600" size={40} />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-green-600 mb-3">
              {t("guidanceVerify.success")}
            </h2>
            <p className="text-gray-700 text-lg mb-2">
              {t("guidanceVerify.message")}
            </p>
            <p className="text-gray-600 mb-8">
              {t("guidanceVerify.thankYou")}
            </p>
            
            {/* Success Icon Animation */}
            <div className="mb-8">
              <div className="flex items-center justify-center gap-2 text-green-600">
                <Mail size={24} />
                <div className="h-1 w-12 bg-green-600 rounded-full"></div>
                <CheckCircle size={24} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => navigate("/")}
                className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#193042] to-[#254e6f] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <Home size={20} />
                <span>{t("guidanceVerify.goHome")}</span>
              </button>
            </div>
          </div>
        )}

        {/* Error State */}
        {status === "error" && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
                <XCircle className="text-red-600" size={40} />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-red-600 mb-3">
              {t("guidanceVerify.error")}
            </h2>
            <p className="text-gray-700 text-lg mb-2">
              {t("guidanceVerify.invalid")}
            </p>
            <p className="text-gray-600 mb-8">
              {t("guidanceVerify.errorMessage")}
            </p>

            {/* Error Details */}
            <div className="bg-red-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-800">
                {t("guidanceVerify.possibleReasons")}:
              </p>
              <ul className={`text-sm text-red-700 mt-2 space-y-1 ${isRTL ? "text-right" : "text-left"}`}>
                <li>• {t("guidanceVerify.reason1")}</li>
                <li>• {t("guidanceVerify.reason2")}</li>
                <li>• {t("guidanceVerify.reason3")}</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => navigate("/")}
                className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#193042] to-[#254e6f] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <Home size={20} />
                <span>{t("guidanceVerify.goHome")}</span>
              </button>
              <button
                onClick={() => navigate("/contact")}
                className={`w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <Mail size={20} />
                <span>{t("guidanceVerify.contactSupport")}</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            {t("guidanceVerify.footer")}
          </p>
        </div>
      </div>
    </div>
  );
}