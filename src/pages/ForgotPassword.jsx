import React, { useState } from "react";
import { requestPasswordReset } from "../services/authService";
import { useTranslation } from "react-i18next";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await requestPasswordReset(email);
      setMessage("📧 Check your email for a password reset link.");
    } catch (err) {
      console.error(err);
      setMessage("❌ Could not send reset link. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#193042] mb-6">
          {t('forgot.title')}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder={t('forgot.placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#193042] text-white p-2 rounded-lg hover:bg-[#284b68] transition"
          >
            {loading ? t('forgot.sending') : t('forgot.resend')}
          </button>
        </form>
        {message && <p className="text-center mt-4 text-sm">{message}</p>}
      </div>
    </div>
  );
}
