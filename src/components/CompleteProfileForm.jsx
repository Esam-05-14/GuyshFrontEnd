// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../data/AuthContext";
// import { createProfile } from "../services/authService";

// export default function CompleteProfileForm() {
//   const navigate = useNavigate();
//   const {universities} = useAuth()
//   const [formData, setFormData] = useState({
//     english_name: "",
//     arabic_name: "",
//     phone_number: "",
//     address: "",
//     rp_number: "",
//     university: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//       e.preventDefault();
//       setLoading(true);
//       setMessage("");
  
//       try {
//         const { data } = await createProfile(formData);
//         setMessage("✅ Profile created successfully!");
//         setFormData(data);
  
//       } catch (err) {
//         console.error("Profile creation failed:", err);
//         setMessage("❌ Failed to create profile. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 shadow-md rounded-lg w-full max-w-lg"
//       >
//         <h2 className="text-2xl font-semibold mb-6 text-center">
//           Complete Your Profile
//         </h2>

//         <div className="grid grid-cols-1 gap-4">
//           <input
//             type="text"
//             name="english_name"
//             placeholder="English Name"
//             className="border p-2 rounded"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="arabic_name"
//             placeholder="Arabic Name"
//             className="border p-2 rounded"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="phone_number"
//             placeholder="Phone Number"
//             className="border p-2 rounded"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="address"
//             placeholder="Address"
//             className="border p-2 rounded"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="rp_number"
//             placeholder="RP Number"
//             className="border p-2 rounded"
//             onChange={handleChange}
//             required
//           />

//           {/* University select */}
//           <select
//             name="university"
//             className="border p-2 rounded"
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select University</option>
//             {
//               universities.map((u,i) => (
//               <option value={i}>{u.name}</option>
//               ))
//             }
//             {/* <option value="1">Eötvös Loránd University (ELTE)</option>
//             <option value="2">University of Debrecen</option>
//             <option value="3">Budapest University of Technology and Economics</option> */}
//           </select>

          
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           {loading ? "Submitting..." : "Submit Profile"}
//         </button>

//         {message && (
//           <p className="text-center text-sm text-gray-600 mt-4">{message}</p>
//         )}
//       </form>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../data/AuthContext";
// import { createProfile } from "../services/authService";

// export default function CompleteProfileForm() {
//   const navigate = useNavigate();
//   const { universities } = useAuth();
//   const [formData, setFormData] = useState({
//     english_name: "",
//     arabic_name: "",
//     phone_number: "",
//     address: "",
//     rp_number: "",
//     university: "",
//   });

//   const [agreeTerms, setAgreeTerms] = useState(false);
//   const [agreePrivacy, setAgreePrivacy] = useState(false);
//   const [showTerms, setShowTerms] = useState(false);
//   const [showPrivacy, setShowPrivacy] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!agreeTerms || !agreePrivacy) {
//       setMessage("❌ Please agree to the Terms and Privacy Policy before submitting.");
//       return;
//     }

//     setLoading(true);
//     setMessage("");

//     try {
//       const { data } = await createProfile(formData);
//       setMessage("✅ Profile created successfully!");
//       setFormData(data);
//     } catch (err) {
//       console.error("Profile creation failed:", err);
//       setMessage("❌ Failed to create profile. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 shadow-md rounded-lg w-full max-w-lg"
//       >
//         <h2 className="text-2xl font-semibold mb-6 text-center">
//           Complete Your Profile
//         </h2>

//         <div className="grid grid-cols-1 gap-4">
//           <input type="text" name="english_name" placeholder="English Name" className="border p-2 rounded" onChange={handleChange} required />
//           <input type="text" name="arabic_name" placeholder="Arabic Name" className="border p-2 rounded" onChange={handleChange} required />
//           <input type="text" name="phone_number" placeholder="Phone Number" className="border p-2 rounded" onChange={handleChange} required />
//           <input type="text" name="address" placeholder="Address" className="border p-2 rounded" onChange={handleChange} required />
//           <input type="text" name="rp_number" placeholder="RP Number" className="border p-2 rounded" onChange={handleChange} required />

//           <select name="university" className="border p-2 rounded" onChange={handleChange} required>
//             <option value="">Select University</option>
//             {universities.map((u, i) => (
//               <option key={i} value={i}>{u.name}</option>
//             ))}
//           </select>

//           {/* ✅ Terms and Privacy checkboxes */}
//           <div className="flex flex-col gap-2 mt-4">
//             <label className="flex items-center space-x-2">
//               <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} required />
//               <span>
//                 I agree to the{" "}
//                 <button type="button" onClick={() => setShowTerms(true)} className="text-blue-600 underline">
//                   Terms and Conditions
//                 </button>
//               </span>
//             </label>

//             <label className="flex items-center space-x-2">
//               <input type="checkbox" checked={agreePrivacy} onChange={(e) => setAgreePrivacy(e.target.checked)} required />
//               <span>
//                 I agree to the{" "}
//                 <button type="button" onClick={() => setShowPrivacy(true)} className="text-blue-600 underline">
//                   Privacy Policy
//                 </button>
//               </span>
//             </label>
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           {loading ? "Submitting..." : "Submit Profile"}
//         </button>

//         {message && <p className="text-center text-sm text-gray-600 mt-4">{message}</p>}

//         {/* ✅ Terms Modal */}
//         {showTerms && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//             <div className="bg-white p-6 rounded-lg shadow-md w-11/12 max-w-2xl overflow-y-auto max-h-[80vh]">
//               <h3 className="text-xl font-semibold mb-3">Terms and Conditions</h3>
//               <p className="text-sm text-gray-700 whitespace-pre-line">
//                 {TERMS_AND_CONDITIONS}
//               </p>
//               <button onClick={() => setShowTerms(false)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//                 Close
//               </button>
//             </div>
//           </div>
//         )}

//         {/* ✅ Privacy Modal */}
//         {showPrivacy && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//             <div className="bg-white p-6 rounded-lg shadow-md w-11/12 max-w-2xl overflow-y-auto max-h-[80vh]">
//               <h3 className="text-xl font-semibold mb-3">Privacy Policy</h3>
//               <p className="text-sm text-gray-700 whitespace-pre-line">
//                 {PRIVACY_POLICY}
//               </p>
//               <button onClick={() => setShowPrivacy(false)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// }

// // ✅ Example Terms & Privacy Content
// const TERMS_AND_CONDITIONS = `
// By creating an account and completing your profile, you agree to:
// 1. Provide accurate and truthful information.
// 2. Use this platform only for lawful and intended purposes.
// 3. Not share your login credentials or impersonate another user.
// 4. Respect the rights and privacy of other users.
// 5. Acknowledge that the platform may update these terms as necessary.

// Failure to comply may result in suspension or termination of your account.
// `;

// const PRIVACY_POLICY = `
// We value your privacy and are committed to protecting your personal information.

// 1. We collect data such as your name, contact details, and university to provide our services.
// 2. Your data will never be sold or shared with unauthorized third parties.
// 3. You have the right to access, modify, or delete your information at any time.
// 4. Cookies and analytics may be used to improve user experience.
// 5. By using this platform, you consent to our data handling practices as described.

// If you have any concerns, please contact our support team.
// `;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../data/AuthContext";
// import { createProfile } from "../services/authService";
// import { useTranslation } from "react-i18next";

// export default function CompleteProfileForm() {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const { universities } = useAuth();

//   const [formData, setFormData] = useState({
//     english_name: "",
//     arabic_name: "",
//     phone_number: "",
//     address: "",
//     rp_number: "",
//     university: "",
//   });

//   const [agreeTerms, setAgreeTerms] = useState(false);
//   const [agreePrivacy, setAgreePrivacy] = useState(false);
//   const [showTerms, setShowTerms] = useState(false);
//   const [showPrivacy, setShowPrivacy] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!agreeTerms || !agreePrivacy) {
//       setMessage(t("profileForm.agreementError"));
//       return;
//     }

//     setLoading(true);
//     setMessage("");

//     try {
//       const { data } = await createProfile(formData);
//       setMessage(t("profileForm.success"));
//       setFormData(data);
//       localStorage.setItem("UserProfile",JSON.stringify(data))
//     } catch (err) {
//       console.error("Profile creation failed:", err);
//       setMessage(t("profileForm.error"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 shadow-md rounded-lg w-full max-w-lg"
//       >
//         <h2 className="text-2xl font-semibold mb-6 text-center">
//           {t("profileForm.title")}
//         </h2>

//         <div className="grid grid-cols-1 gap-4">
//           <input
//             type="text"
//             name="english_name"
//             placeholder={t("profileForm.englishName")}
//             className="border p-2 rounded"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="arabic_name"
//             placeholder={t("profileForm.arabicName")}
//             className="border p-2 rounded"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="phone_number"
//             placeholder={t("profileForm.phone")}
//             className="border p-2 rounded"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="address"
//             placeholder={t("profileForm.address")}
//             className="border p-2 rounded"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="rp_number"
//             placeholder={t("profileForm.rpNumber")}
//             className="border p-2 rounded"
//             onChange={handleChange}
//             required
//           />

//           <select
//             name="university"
//             className="border p-2 rounded"
//             onChange={handleChange}
//             required
//           >
//             <option value="">{t("profileForm.selectUniversity")}</option>
//             {universities.map((u, i) => (
//               <option key={i} value={i}>{u.name}</option>
//             ))}
//           </select>

//           {/* ✅ Agreement checkboxes */}
//           <div className="flex flex-col gap-2 mt-4">
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 checked={agreeTerms}
//                 onChange={(e) => setAgreeTerms(e.target.checked)}
//                 required
//               />
//               <span>
//                 {t("profileForm.agreeTo")}{" "}
//                 <button
//                   type="button"
//                   onClick={navigate('/terms-conditions')}
//                   className="text-blue-600 underline"
//                 >
//                   {t("profileForm.terms")}
//                 </button>
//               </span>
//             </label>

//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 checked={agreePrivacy}
//                 onChange={(e) => setAgreePrivacy(e.target.checked)}
//                 required
//               />
//               <span>
//                 {t("profileForm.agreeTo")}{" "}
//                 <button
//                   type="button"
//                   onClick={navigate('/privacy-policy')}
//                   className="text-blue-600 underline"
//                 >
//                   {t("profileForm.privacy")}
//                 </button>
//               </span>
//             </label>
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           {loading ? t("profileForm.submitting") : t("profileForm.submit")}
//         </button>

//         {message && (
//           <p className="text-center text-sm text-gray-600 mt-4">{message}</p>
//         )}

//         {/* ✅ Terms Modal */}
//         {showTerms && (
//           <Modal title={t("profileForm.terms")} text={t("termsAndConditions")} onClose={() => setShowTerms(false)} />
//         )}

//         {/* ✅ Privacy Modal */}
//         {showPrivacy && (
//           <Modal title={t("profileForm.privacy")} text={t("privacyPolicy")} onClose={() => setShowPrivacy(false)} />
//         )}
//       </form>
//     </div>
//   );
// }

// /* ✅ Reusable modal component */
// function Modal({ title, text, onClose }) {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//       <div className="bg-white p-6 rounded-lg shadow-md w-11/12 max-w-2xl overflow-y-auto max-h-[80vh]">
//         <h3 className="text-xl font-semibold mb-3">{title}</h3>
//         <p className="text-sm text-gray-700 whitespace-pre-line">{text}</p>
//         <button
//           onClick={onClose}
//           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../data/AuthContext";
import { createProfile, getActivateVersions , downloadRules } from "../services/authService";
import { useTranslation } from "react-i18next";

// --- New Version Constant ---
const CONSENT_VERSION = "1.0";

const UNION_REGULATIONS_PDF_URL = "/public/assets/guysh_regulations_1.0.pdf";


// --- New Utility function for date formatting ---




export default function CompleteProfileForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { universities, versions, setMyProfile } = useAuth();

  const [formData, setFormData] = useState({
    english_name: "",
    arabic_name: "",
    phone_number: "",
    address: "",
    rp_number: "",
    university: "",
  });

  // Updated state for multiple agreements
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeUnion, setAgreeUnion] = useState(false);     // NEW
  const [agreeData, setAgreeData] = useState(false);      // NEW
  
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  // NEW state for Union Regulations
  const [showUnion, setShowUnion] = useState(false);
  // NEW state for Data Processing
  const [showData, setShowData] = useState(false); 
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // const handleOpenRegulations = (e) => {
  //   e.preventDefault(); // Prevents default button behavior if any
  //   window.open(UNION_REGULATIONS_PDF_URL, '_blank');
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDownload = async () =>{
      try{
        await downloadRules()
      }catch(err){
        // console.log(err);
        
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check all required consent checkboxes
    if (!agreeTerms || !agreePrivacy || !agreeUnion || !agreeData) {
      setMessage(t("profileForm.agreementError"));
      return;
    }

    setLoading(true);
    setMessage("");

    // Construct the data payload including the new consent fields
    const payload = {
      ...formData,
      // Consent fields
      consent_privacy_policy: agreePrivacy,
      consent_privacy_policy_version: versions.privacy_policy_version,
      consent_terms_and_conditions: agreeTerms,
      consent_terms_and_conditions_version: versions.terms_of_service_version,
      consent_union_regulations: agreeUnion,
      consent_union_regulations_version: versions.regulations_version,
      consent_data_processing: agreeData,
      // Automatic fields
      consent_data_processing_version: CONSENT_VERSION,
      //consent_date: getFormattedConsentDate(), // Submits current date/time
    };

    try {
      const data = await createProfile(payload);
      setMessage(t("profileForm.success"));

      localStorage.setItem("UserProfile",JSON.stringify(data));
      
      setMyProfile(data);
      navigate('/my-profile'); 
    } catch (err) {
      console.error("Profile creation failed:", err);
      // You should check err.response.data for specific server errors if possible
      setMessage(t("profileForm.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-md rounded-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {t("profileForm.title")}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="english_name"
            placeholder={t("profileForm.englishName")}
            className="border p-2 rounded"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="arabic_name"
            placeholder={t("profileForm.arabicName")}
            className="border p-2 rounded"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone_number"
            placeholder={t("profileForm.phone")}
            className="border p-2 rounded"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder={t("profileForm.address")}
            className="border p-2 rounded"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="rp_number"
            placeholder={t("profileForm.rpNumber")}
            className="border p-2 rounded"
            onChange={handleChange}
            required
          />

          <select
            name="university"
            className="border p-2 rounded"
            onChange={handleChange}
            required
          >
            <option value="">{t("profileForm.selectUniversity")}</option>
            {universities.map((u, i) => (
              // NOTE: Assuming the university value should be the ID/index from the universities array
              <option key={u.id || i} value={u.id || i}>{u.name}</option> 
            ))}
          </select>

          {/* Agreement checkboxes (Updated) */}
          <div className="flex flex-col gap-2 mt-4">
            {/* Terms and Conditions */}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required // Enforce checking before submission
              />
              <span>
                {t("profileForm.agreeTo")}{" "}
                <button
                  type="button"
                  // Changed navigation to modal display for better UX flow
                  onClick={() => navigate('/terms-conditions')} 
                  className="text-blue-600 underline"
                >
                  {t("profileForm.terms")}
                </button>
              </span>
            </label>

            {/* Privacy Policy */}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={agreePrivacy}
                onChange={(e) => setAgreePrivacy(e.target.checked)}
                required // Enforce checking before submission
              />
              <span>
                {t("profileForm.agreeTo")}{" "}
                <button
                  type="button"
                  // Changed navigation to modal display for better UX flow
                  onClick={() => navigate('/privacy-policy')}
                  className="text-blue-600 underline"
                >
                  {t("profileForm.privacy")}
                </button>
              </span>
            </label>
            
            {/* NEW: Union Regulations */}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={agreeUnion}
                onChange={(e) => setAgreeUnion(e.target.checked)}
                required // Enforce checking before submission
              />
              <span>
                {t("profileForm.agreeTo")}{" "}
                <button
                  onClick={handleDownload}
                  className="text-blue-600 underline"
                  
                >
                  {t("profileForm.unionRegulations")}
                </button>
              </span>
            </label>

            {/* NEW: Data Processing */}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={agreeData}
                onChange={(e) => setAgreeData(e.target.checked)}
                required // Enforce checking before submission
              />
              <span>
                {t("profileForm.agreeTo")}{" "}
                <button
                  type="button"
                  onClick={() => setShowData(true)} 
                  className="text-blue-600 underline"
                >
                  {t("profileForm.dataProcessing", "Data Processing")}
                </button>
              </span>
            </label>
            
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? t("profileForm.submitting") : t("profileForm.submit")}
        </button>

        {message && (
          <p className="text-center text-sm text-gray-600 mt-4">{message}</p>
        )}

        {/* Modals for viewing policies */}
        {showTerms && (
          <Modal title={t("profileForm.terms")} text={t("termsAndConditions")} onClose={() => setShowTerms(false)} />
        )}
        {showPrivacy && (
          <Modal title={t("profileForm.privacy")} text={t("privacyPolicy")} onClose={() => setShowPrivacy(false)} />
        )}
        
        {showData && (
          <Modal title={t("profileForm.dataProcessing", "Data Processing")} text={t("dataProcessingText", "Data Processing text goes here.")} onClose={() => setShowData(false)} />
        )}
      </form>
    </div>
  );
}

/* Reusable modal component (kept as is) */
function Modal({ title, text, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-11/12 max-w-2xl overflow-y-auto max-h-[80vh]">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-sm text-gray-700 whitespace-pre-line">{text}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}