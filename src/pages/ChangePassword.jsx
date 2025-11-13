import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { changePassword } from "../services/authService";
import { useAuth } from "../data/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState({ current: "", new: "", confirm: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.new !== form.confirm) {
      setMessage(t("changePassword.errors.mismatch"));
      return;
    }

    setLoading(true);
    try {
      await changePassword(form.current, form.new);
      setMessage(t("changePassword.success"));
      setForm({ current: "", new: "", confirm: "" });
    } catch (err) {
      console.error(err);
      setMessage(t("changePassword.errors.failed"));
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-screen" dir={i18n.dir()}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#193042] mx-auto"></div>
          <button
            className="w-full bg-[#193042] text-white p-2 rounded-lg hover:bg-[#284b68] transition mt-4"
            onClick={() => navigate("/login")}
          >
            {t("changePassword.loginFirst")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      dir={i18n.dir()}
    >
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#193042] mb-6">
          {t("changePassword.title")}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            name="current"
            placeholder={t("changePassword.fields.current")}
            value={form.current}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="password"
            name="new"
            placeholder={t("changePassword.fields.new")}
            value={form.new}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="password"
            name="confirm"
            placeholder={t("changePassword.fields.confirm")}
            value={form.confirm}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#193042] text-white p-2 rounded-lg hover:bg-[#284b68] transition"
          >
            {loading
              ? t("changePassword.loading")
              : t("changePassword.submit")}
          </button>
        </form>
        {message && (
          <p className="text-center mt-4 text-sm text-[#193042]">{message}</p>
        )}
      </div>
    </div>
  );
}

