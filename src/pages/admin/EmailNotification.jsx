import { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  Mail, 
  Send, 
  Users,
  CheckCircle,
  AlertCircle
} from "lucide-react";
// import { sendEmailNotification } from "../../api/notifications";
import { sendEmail_Admin } from "../../services/authService";

export default function AdminEmailNotification() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  
  const [formData, setFormData] = useState({
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!formData.subject.trim()) newErrors.subject = t("This field is required.");
    if (!formData.message.trim()) newErrors.message = t("This field is required.");
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    setSuccessMessage("");
    setErrorMessage("");
    
    if (!validateForm()) return;

    setSending(true);
    
    try {
      await sendEmail_Admin(formData);
      
    //   // Simulate API call
    //   await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccessMessage(t("emailNotification.successMessage"));
      
      // Clear form
      setFormData({
        subject: "",
        message: ""
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000);
      
    } catch (error) {
      console.error("Error sending email notification:", error);
      setErrorMessage(t("emailNotification.errorMessage"));
      
      // Hide error message after 5 seconds
      setTimeout(() => setErrorMessage(""), 5000);
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    
    // Clear messages when user starts typing
    if (successMessage) setSuccessMessage("");
    if (errorMessage) setErrorMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#193042] to-[#254e6f] rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className={`flex items-center gap-4 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
            <Mail size={40} />
            <h1 className="text-4xl font-bold">
              {t("emailNotification.title")}
            </h1>
          </div>
          <p className="text-gray-100 text-lg">
            {t("emailNotification.subtitle")}
          </p>
        </div>

        {/* Info Card */}
        <div className={`bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
          <Users className="text-blue-600 flex-shrink-0 mt-0.5" size={24} />
          <div className={isRTL ? "text-right" : "text-left"}>
            <p className="text-blue-900 font-medium">
              {t("emailNotification.allUsers")}
            </p>
            <p className="text-blue-700 text-sm mt-1">
              {t("emailNotification.ensureMessage")}
            </p>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className={`bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
            <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={24} />
            <p className="text-green-900 font-medium flex-1">
              {successMessage}
            </p>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className={`bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={24} />
            <p className="text-red-900 font-medium flex-1">
              {errorMessage}
            </p>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Subject Field */}
            <div>
              <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? "text-right" : ""}`}>
                {t("emailNotification.emailSubject")} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={sending}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#193042] focus:border-transparent outline-none transition-all ${
                    errors.subject ? "border-red-500" : "border-gray-300"
                  } ${sending ? "bg-gray-100 cursor-not-allowed" : ""} ${isRTL ? "text-right" : ""}`}
                  placeholder={t("emailNotification.subjectPlaceholder")}
                />
              </div>
              {errors.subject && (
                <p className={`text-red-500 text-sm mt-1 ${isRTL ? "text-right" : ""}`}>
                  {errors.subject}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? "text-right" : ""}`}>
                {t("emailNotification.emailMessage")} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={sending}
                  rows="12"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#193042] focus:border-transparent outline-none transition-all resize-none ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } ${sending ? "bg-gray-100 cursor-not-allowed" : ""} ${isRTL ? "text-right" : ""}`}
                  placeholder={t("emailNotification.messagePlaceholder")}
                />
              </div>
              {errors.message && (
                <p className={`text-red-500 text-sm mt-1 ${isRTL ? "text-right" : ""}`}>
                  {errors.message}
                </p>
              )}
              <p className={`text-gray-500 text-xs mt-2 ${isRTL ? "text-right" : ""}`}>
                {t("emailNotification.characterCount")}: {formData.message.length}
              </p>
            </div>

            {/* Preview Section */}
            {(formData.subject || formData.message) && (
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? "text-right" : ""}`}>
                  {t("emailNotification.preview")}
                </h3>
                <div className="bg-white rounded-lg p-5 border border-gray-200">
                  {formData.subject && (
                    <div className="mb-4">
                      <p className={`text-xs text-gray-500 mb-1 ${isRTL ? "text-right" : ""}`}>
                        {t("emailNotification.subject")}:
                      </p>
                      <p className={`text-base font-semibold text-gray-900 ${isRTL ? "text-right" : ""}`}>
                        {formData.subject}
                      </p>
                    </div>
                  )}
                  {formData.message && (
                    <div>
                      <p className={`text-xs text-gray-500 mb-1 ${isRTL ? "text-right" : ""}`}>
                        {t("emailNotification.message")}:
                      </p>
                      <p className={`text-sm text-gray-700 whitespace-pre-wrap ${isRTL ? "text-right" : ""}`}>
                        {formData.message}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className={`flex gap-3 pt-4 ${isRTL ? "flex-row-reverse" : ""}`}>
              <button
                type="button"
                onClick={() => {
                  setFormData({ subject: "", message: "" });
                  setErrors({});
                  setSuccessMessage("");
                  setErrorMessage("");
                }}
                disabled={sending}
                className={`flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors ${
                  sending ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {t("emailNotification.clearForm")}
              </button>
              <button
                type="submit"
                disabled={sending}
                className={`flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#193042] to-[#254e6f] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 ${
                  sending ? "opacity-50 cursor-not-allowed" : ""
                } ${isRTL ? "flex-row-reverse" : ""}`}
              >
                {sending ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>{t("emailNotification.sending")}</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>{t("emailNotification.sendToAll")}</span>
                  </>
                )}
              </button>
            </div>
          </form>

          
          
        </div>
      </div>
    </div>
  );
}