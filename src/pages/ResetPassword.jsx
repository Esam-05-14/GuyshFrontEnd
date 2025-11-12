import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { resetPassword } from "../services/authService";

export default function ResetPassword() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const isRTL = i18n.language === "ar";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!password || !confirm) {
      return setError(t("resetPassword.errors.required"));
    }

    if (password !== confirm) {
      return setError(t("resetPassword.errors.noMatch"));
    }

    try {
      setLoading(true);
      await resetPassword(uid, token, password);

      setSuccess(t("resetPassword.success"));
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(t("resetPassword.errors.invalidLink"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen bg-gray-100 p-4 ${
        isRTL ? "direction-rtl" : "direction-ltr"
      }`}
      style={{ direction: isRTL ? "rtl" : "ltr" }}
    >
      <div className="bg-white shadow-lg p-6 rounded-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {t("resetPassword.title")}
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        {success && (
          <p className="text-green-600 text-sm mb-3 text-center">{success}</p>
        )}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium">
            {t("resetPassword.newPassword")}
          </label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("resetPassword.newPasswordPlaceholder")}
          />

          <label className="block mb-2 font-medium">
            {t("resetPassword.confirmPassword")}
          </label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded mb-4"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder={t("resetPassword.confirmPasswordPlaceholder")}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? t("resetPassword.loading") : t("resetPassword.button")}
          </button>
        </form>
      </div>
    </div>
  );
}
