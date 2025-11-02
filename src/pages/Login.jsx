// import { useState , useEffect } from "react";
// import { useAuth } from "../data/AuthContext.jsx";
// import { useNavigate, Link } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();
//   const { login , isLoggedIn } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (isLoggedIn) {
//       navigate("/"); // 👈 redirect home if already logged in
//     }
//   }, [isLoggedIn, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     setLoading(true);
//     setError(""); // clear previous errors

//     try {
//       const success = await login(email, password);

//       if (!success) {
//         setError("Invalid email or password.");
//         return;
//       }

//       navigate("/"); // ✅ successful login
//     } catch (err) {
//       console.error("Login failed:", err.message);
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
//         <h2 className="text-2xl font-bold text-center text-[#193042] mb-6">
//           Login
//         </h2>

//         {error && (
//           <div className="mb-4 text-red-600 bg-red-50 p-3 rounded-lg text-sm text-center">
//             {error}{" "}
//             {error.includes("Invalid") && (
//               <Link
//                 to="/register"
//                 className="text-[#193042] font-medium hover:underline ml-1"
//               >
//                 Register here
//               </Link>
//             )}
//           </div>
//         )}

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               required
//               className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#193042] focus:outline-none"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               required
//               className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#193042] focus:outline-none"
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-2 px-4 rounded-lg font-semibold bg-gray-200 text-[#193042] hover:bg-gray-300 transition disabled:opacity-50"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-500 mt-4">
//           Don’t have an account?{" "}
//           <Link
//             to="/register"
//             className="text-[#193042] font-medium hover:underline"
//           >
//             Register
//           </Link>
//         </p>
//         <p className="text-center text-sm text-gray-500 mt-4">
//         Forgot your password?{" "}
//         <Link
//           to="/forgot-password"
//           className="text-[#193042] font-medium hover:underline"
//         >
//           Reset here
//         </Link>
//       </p>
//       </div>
      
//     </div>
//   );
// }

// export default Login;

import { useState, useEffect } from "react";
import { useAuth } from "../data/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Login() {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();
  const { t, i18n } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    setLoading(true);
    setError("");

    try {
      const success = await login(email, password);
      if (!success) {
        setError(t("login.invalid"));
        return;
      }
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err.message);
      setError(t("login.error"));
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="bg-[#f8f9fa] min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#193042]">{t("login.title")}</h2>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 text-red-600 bg-red-50 p-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("login.email")}
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#193042] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("login.password")}
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#193042] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 rounded-lg font-semibold bg-gray-200 text-[#193042] hover:bg-gray-300 transition disabled:opacity-50"
          >
            {loading ? t("login.loading") : t("login.button")}
          </button>
        </form>

        {/* Links */}
        <div className="text-center text-sm text-gray-600 mt-6 space-y-2">
          <p>
            {t("login.noAccount")}{" "}
            <Link
              to="/register"
              className="text-[#193042] font-medium hover:underline"
            >
              {t("login.register")}
            </Link>
          </p>

          <p>
            {t("login.forgot")}{" "}
            <Link
              to="/forgot-password"
              className="text-[#193042] font-medium hover:underline"
            >
              {t("login.reset")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
