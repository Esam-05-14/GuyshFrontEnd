// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { 
//   FileText, 
//   Edit, 
//   Trash2, 
//   Eye, 
//   Plus,
//   Search,
//   X,
//   Save,
//   Clock,
//   Upload,
//   Image as ImageIcon
// } from "lucide-react";
// import {getPosts, updataPostId_Admin, createPost_Admin, deletePost_Admin, getPostsById} from "../../services/authService";
// import { useAuth } from "../../data/AuthContext";

// export default function AdminPosts() {
//   const { t, i18n } = useTranslation();
//   const isRTL = i18n.language === "ar";
//   const {posts, setPosts, language} = useAuth(); 

//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [editingPost, setEditingPost] = useState(null);
//   const [viewingPost, setViewingPost] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
  
//   // Initialize with the full nested structure to prevent errors when accessing fields
//   const [formData, setFormData] = useState({
//     translations: {
//       en: {
//         title: "",
//         content: ""
//       },
//       ar: {
//         title: "",
//         content: ""
//       }
//     }
//   });
//   const [errors, setErrors] = useState({});

//   // Fetch posts and parse translations
//   useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const data = await getPosts();
//       // Ensure translations are parsed into objects
//       const parsed = data.map(post => {
//         let translationsObject = post.translations;
//         if (typeof post.translations === "string") {
//             try {
//                 translationsObject = JSON.parse(post.translations);
//             } catch (e) {
//                 console.error("Error parsing translations for post:", post.id, e);
//                 translationsObject = { en: {}, ar: {} }; // Fallback to empty structure
//             }
//         }
//         return { ...post, translations: translationsObject };
//       });
//       setPosts(parsed);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   fetchData();
// }, [setPosts]);


//   const filteredPosts = posts.filter(post => {
//     const enTitle = post.translations?.en?.title || "";
//     const arTitle = post.translations?.ar?.title || "";
//     const enContent = post.translations?.en?.content || "";
//     const arContent = post.translations?.ar?.content || "";
    
//     return enTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
//               arTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
//               enContent.toLowerCase().includes(searchQuery.toLowerCase()) ||
//               arContent.toLowerCase().includes(searchQuery.toLowerCase());
//   });

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.translations.en.title.trim()) {
//       newErrors.enTitle = t("This field is required.");
//     }
//     if (!formData.translations.en.content.trim()) {
//       newErrors.enContent = t("This field is required.");
//     }
//     if (!formData.translations.ar.title.trim()) {
//       newErrors.arTitle = t("This field is required.");
//     }
//     if (!formData.translations.ar.content.trim()) {
//       newErrors.arContent = t("This field is required.");
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;

//     try {
//       const formDataToSend = new FormData();
      
//       // Add translations as JSON string
//       formDataToSend.append('translations', JSON.stringify(formData.translations));
      
//       // Add image if selected
//       if (imageFile) {
//         formDataToSend.append('image', imageFile);
//       }

//       if (editingPost) {
//         await updataPostId_Admin(editingPost.id, formDataToSend);
        
//         // Update local state and reflect the new image URL if uploaded
//         const updatedPosts = posts.map(post => 
//           post.id === editingPost.id 
//             ? { 
//                 ...post, 
//                 translations: formData.translations,
//                 // Use URL.createObjectURL for immediate preview, or fall back to existing
//                 image: imageFile ? URL.createObjectURL(imageFile) : post.image, 
//                 updated_at: new Date().toISOString() 
//               } 
//             : post
//         );
//         setPosts(updatedPosts);
//         alert(t("Post updated successfully!"));
//       } else {
//         const newPost = await createPost_Admin(formDataToSend);
//         // Ensure new post's translations are stored as objects in local state
//         let newTranslations = newPost.translations;
//         if (typeof newTranslations === 'string') {
//             try { newTranslations = JSON.parse(newTranslations); } catch(e) { /* silent fail */ }
//         }
//         setPosts([{ ...newPost, translations: newTranslations }, ...posts]);
//         alert(t("Post created successfully!"));
//       }
      
//       handleCloseModal();
//     } catch (error) {
//       console.error("Error saving post:", error);
//       alert(t("Error saving post. Please try again."));
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm(t("Are you sure you want to delete this post?"))) {
//       try {
//         await deletePost_Admin(id);
//         setPosts(posts.filter((p) => p.id !== id));
//         alert(t("Post deleted successfully!"));
//       } catch (error) {
//         console.error("Error deleting post:", error);
//       }
//     }
//   };

//   // const handleEdit = (event) => {
//   //   setEditingEvent(event);
//   //   setFormData({
//   //     title: event.title,
//   //     content: event.content,
//   //     event_date: event.event_date,
//   //     location: event.location
//   //   });
//   //   setImagePreview(event.image || null);
//   //   setImageFile(null);
//   //   setErrors({});
//   //   setShowModal(true);
//   // };

//   // FIX 1: Explicitly set nested properties for pre-population
//   const handleEdit = async (post) => {
//     const data = await getPostsById(post.id);
//     // console.log(data);
    
//     setEditingPost(post);
    
//     // Explicitly set the nested translation properties from the post object
//     setFormData({
//       translations: {
//         en: {
//           title: data?.translations?.en.title ,
//           content: data?.translations?.en.content 
//         },
//         ar: {
//           title: data?.translations?.ar.title ,
//           content: data?.translations?.ar.content
//         }
//       }
//     });
    
//     setImagePreview(data.image || null);
//     setImageFile(null);
//     setErrors({});
//     setShowModal(true);
//   };

//   const handleAddNew = () => {
//     setEditingPost(null);
//     setFormData({
//       translations: {
//         en: { title: "", content: "" },
//         ar: { title: "", content: "" }
//       }
//     });
//     setImagePreview(null);
//     setImageFile(null);
//     setErrors({});
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setEditingPost(null);
//     setFormData({
//       translations: {
//         en: { title: "", content: "" },
//         ar: { title: "", content: "" }
//       }
//     });
//     setImagePreview(null);
//     setImageFile(null);
//     setErrors({});
//   };

//   const handleView = (post) => {
//     // Post should already be parsed in useEffect, so we set it directly
//     setViewingPost(post);
//   };


//   const handleChange = (lang, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       translations: {
//         ...prev.translations,
//         [lang]: {
//           ...prev.translations[lang],
//           [field]: value
//         }
//       }
//     }));
    
//     // Clear error when user starts typing
//     const errorKey = `${lang}${field.charAt(0).toUpperCase() + field.slice(1)}`;
//     if (errors[errorKey]) {
//       setErrors(prev => {
//         const newErrors = { ...prev };
//         delete newErrors[errorKey];
//         return newErrors;
//       });
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return t("Unknown date");
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return t("Invalid date");
//     return date.toLocaleString(i18n.language === "ar" ? "ar-EG" : "en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };


//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#193042] mx-auto"></div>
//           <p className="mt-4 text-gray-600">{t("Loading posts...")}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8" dir={isRTL ? "rtl" : "ltr"}>
//       <div className="max-w-7xl mx-auto">
//         {/* Header and Search (omitted for brevity) */}
        
//         <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
//           <h1 className="text-3xl font-bold text-[#193042]">
//             {t("Posts Management")}
//           </h1>
//           <button
//             onClick={handleAddNew}
//             className={`flex items-center gap-2 bg-gradient-to-r from-[#193042] to-[#254e6f] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 ${isRTL ? "flex-row-reverse" : ""}`}
//           >
//             <Plus size={20} />
//             <span>{t("Add New Post")}</span>
//           </button>
//         </div>

//         {/* Search */}
//         <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
//           <div className="relative">
//             <Search className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRTL ? "right-3" : "left-3"}`} size={20} />
//             <input
//               type="text"
//               placeholder={t("Search posts...")}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className={`w-full border border-gray-300 rounded-lg py-3 focus:ring-2 focus:ring-[#193042] focus:border-transparent outline-none ${isRTL ? "pr-10 text-right" : "pl-10"}`}
//             />
//           </div>
//         </div>

//         {/* Posts Grid */}
//         {filteredPosts.length === 0 ? (
//           <div className="bg-white rounded-xl shadow-sm p-12 text-center">
//             <FileText className="mx-auto text-gray-300 mb-4" size={64} />
//             <p className="text-gray-500 text-lg">{t("No posts found.")}</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredPosts.map((post) => (
//               <div
//                 key={post.id}
//                 className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-t-4 border-[#193042]"
//               >
//                 {post.image && (
//                   <div className="h-48 overflow-hidden">
//                     <img 
//                       src={post.image} 
//                       alt={post.translations?.[language]?.title || ""} 
//                       className="w-full h-full object-cover"
//                       // FIX 2: Added onerror fallback for images
//                       onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/e5e7eb/7b8393?text=No+Image'; }}
//                     />
//                   </div>
//                 )}
//                 <div className="p-6">
//                   <div className="flex items-start justify-between mb-3">
//                     <h2 className="text-xl font-bold text-[#193042] line-clamp-2 flex-1">
//                       {/* FIX 2: Use optional chaining to safely access title */}
                      
//                       {post.translations?.[language]?.title || post.translations?.en?.title || t("Untitled")}
//                     </h2>
//                   </div>
                  
//                   <p className="text-gray-600 text-sm mb-4 line-clamp-3">
//                     {/* FIX 2: Use optional chaining to safely access content */}
//                     {/* {post.translations?.[language]?.content || post.translations?.en?.content || t("No content available.")} */}
//                   </p>

//                   <div className={`flex items-center gap-2 text-xs text-gray-500 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
//                     <Clock size={14} />
//                     <span>{formatDate(post.timestamp)}</span>
//                   </div>

//                   {/* Actions */}
//                   <div className={`flex gap-2 pt-4 border-t border-gray-100 ${isRTL ? "flex-row-reverse" : ""}`}>
//                     <button
//                       onClick={() => handleView(post)}
//                       className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//                     >
//                       <Eye size={16} />
//                       <span className="text-sm font-medium">{t("View")}</span>
//                     </button>
//                     <button
//                       onClick={() => handleEdit(post)}
//                       className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
//                     >
//                       <Edit size={16} />
//                       <span className="text-sm font-medium">{t("Edit")}</span>
//                     </button>
//                     <button
//                       onClick={() => handleDelete(post.id)}
//                       className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
//                     >
//                       <Trash2 size={16} />
//                       <span className="text-sm font-medium">{t("Delete")}</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Create/Edit Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//             {/* Modal Header */}
//             <div className={`flex items-center justify-between p-6 border-b border-gray-200 ${isRTL ? "flex-row-reverse" : ""}`}>
//               <h2 className="text-2xl font-bold text-[#193042]">
//                 {editingPost ? t("Edit Post") : t("Create New Post")}
//               </h2>
//               <button
//                 onClick={handleCloseModal}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             {/* Modal Form */}
//             <form onSubmit={handleSubmit} className="p-6 space-y-6">
//               {/* Image Upload */}
//               <div>
//                 <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? "text-right" : ""}`}>
//                   {t("Post Image")} <span className="text-gray-500 text-xs">({t("Optional")})</span>
//                 </label>
//                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#193042] transition-colors">
//                   {imagePreview ? (
//                     <div className="relative">
//                       <img 
//                         src={imagePreview} 
//                         alt="Preview" 
//                         className="max-h-48 mx-auto rounded-lg"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setImagePreview(null);
//                           setImageFile(null);
//                         }}
//                         className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
//                       >
//                         <X size={16} />
//                       </button>
//                     </div>
//                   ) : (
//                     <div>
//                       <ImageIcon className="mx-auto text-gray-400 mb-2" size={48} />
//                       <p className="text-gray-600 mb-2">{t("Click to upload or drag and drop")}</p>
//                       <p className="text-xs text-gray-500">{t("PNG, JPG, GIF up to 5MB")}</p>
//                     </div>
//                   )}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className="hidden"
//                     id="image-upload"
//                   />
//                   {!imagePreview && (
//                     <label
//                       htmlFor="image-upload"
//                       className="mt-4 inline-flex items-center gap-2 bg-[#193042] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#254e6f] transition-colors"
//                     >
//                       <Upload size={18} />
//                       <span>{t("Choose Image")}</span>
//                     </label>
//                   )}
//                 </div>
//               </div>

//               {/* English Fields */}
//               <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
//                 <h3 className="text-lg font-bold text-blue-900 mb-4">
//                   {t("English Content")}
//                 </h3>
                
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       {t("Title (English)")} <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       // FIX 1: Access value from formData.translations.en.title
//                       value={formData.translations.en.title}
//                       onChange={(e) => handleChange('en', 'title', e.target.value)}
//                       className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
//                         errors.enTitle ? "border-red-500" : "border-gray-300"
//                       }`}
//                       placeholder="Enter English title"
//                     />
//                     {errors.enTitle && (
//                       <p className="text-red-500 text-sm mt-1">{errors.enTitle}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       {t("Content (English)")} <span className="text-red-500">*</span>
//                     </label>
//                     <textarea
//                       // FIX 1: Access value from formData.translations.en.content
//                       value={formData.translations.en.content}
//                       onChange={(e) => handleChange('en', 'content', e.target.value)}
//                       rows="6"
//                       className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none ${
//                         errors.enContent ? "border-red-500" : "border-gray-300"
//                       }`}
//                       placeholder="Enter English content"
//                     />
//                     {errors.enContent && (
//                       <p className="text-red-500 text-sm mt-1">{errors.enContent}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Arabic Fields */}
//               <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
//                 <h3 className="text-lg font-bold text-green-900 mb-4" dir="rtl">
//                   {t("Arabic Content")}
//                 </h3>
                
//                 <div className="space-y-4" dir="rtl">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">
//                       {t("Title (Arabic)")} <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       // FIX 1: Access value from formData.translations.ar.title
//                       value={formData.translations.ar.title}
//                       onChange={(e) => handleChange('ar', 'title', e.target.value)}
//                       className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-right ${
//                         errors.arTitle ? "border-red-500" : "border-gray-300"
//                       }`}
//                       placeholder="أدخل العنوان بالعربية"
//                     />
//                     {errors.arTitle && (
//                       <p className="text-red-500 text-sm mt-1 text-right">{errors.arTitle}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">
//                       {t("Content (Arabic)")} <span className="text-red-500">*</span>
//                     </label>
//                     <textarea
//                       // FIX 1: Access value from formData.translations.ar.content
//                       value={formData.translations.ar.content}
//                       onChange={(e) => handleChange('ar', 'content', e.target.value)}
//                       rows="6"
//                       className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none text-right ${
//                         errors.arContent ? "border-red-500" : "border-gray-300"
//                       }`}
//                       placeholder="أدخل المحتوى بالعربية"
//                     />
//                     {errors.arContent && (
//                       <p className="text-red-500 text-sm mt-1 text-right">{errors.arContent}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className={`flex gap-3 pt-4 ${isRTL ? "flex-row-reverse" : ""}`}>
//                 <button
//                   type="button"
//                   onClick={handleCloseModal}
//                   className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
//                 >
//                   {t("Cancel")}
//                 </button>
//                 <button
//                   type="submit"
//                   className={`flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#193042] to-[#254e6f] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 ${isRTL ? "flex-row-reverse" : ""}`}
//                 >
//                   <Save size={20} />
//                   <span>{editingPost ? t("Update Post") : t("Create Post")}</span>
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* View Post Modal */}
//       {viewingPost && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
//             {/* Modal Header */}
//             <div className={`flex items-center justify-between p-6 border-b border-gray-200 ${isRTL ? "flex-row-reverse" : ""}`}>
//               <h2 className="text-2xl font-bold text-[#193042]">
//                 {t("Post Details")}
//               </h2>
//               <button
//                 onClick={() => setViewingPost(null)}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             {/* Modal Content */}
//             <div className="p-6 space-y-6">
//               {viewingPost.image && (
//                 <div className="rounded-lg overflow-hidden">
//                   <img 
//                     src={viewingPost.image} 
//                     alt={viewingPost.translations?.[i18n.language]?.title || ""} 
//                     className="w-full h-auto"
//                   />
//                 </div>
//               )}
              
//               <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
//                 <h3 className="text-2xl font-bold text-[#193042] mb-3">
//                   {/* FIX 2: Use optional chaining to safely access title in view modal */}
//                   {viewingPost.translations?.[language]?.title || viewingPost.translations?.en?.title || t("Untitled")}
//                 </h3>
                
//                 <div className={`flex items-center gap-2 text-sm text-gray-500 mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
//                   <Clock size={16} />
//                   <span>{formatDate(viewingPost.timestamp)}</span>
//                 </div>
                
//                 <div className="prose max-w-none">
//                   <p className={`text-gray-700 leading-relaxed whitespace-pre-wrap ${i18n.language === 'ar' ? 'text-right' : ''}`}>
//                     {/* FIX 2: Use optional chaining to safely access content in view modal */}
//                     {viewingPost.translations?.[i18n.language]?.content || viewingPost.translations?.en?.content || t("No content available.")}
//                   </p>
//                 </div>
//               </div>

//               <div className={`flex gap-3 pt-4 border-t border-gray-100 ${isRTL ? "flex-row-reverse" : ""}`}>
//                 <button
//                   onClick={() => {
//                     setViewingPost(null);
//                     handleEdit(viewingPost);
//                   }}
//                   className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition-colors"
//                 >
//                   <Edit size={20} />
//                   <span>{t("Edit Post")}</span>
//                 </button>
//                 <button
//                   onClick={() => setViewingPost(null)}
//                   className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
//                 >
//                   {t("Close")}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  FileText, 
  Edit, 
  Trash2, 
  Eye, 
  Plus,
  Search,
  X,
  Save,
  Clock,
  Upload,
  Image as ImageIcon
} from "lucide-react";
import {
  updataPostId_Admin, 
  createPost_Admin, 
  deletePost_Admin, 
} from "../../services/authService";
import { useAuth } from "../../data/AuthContext";

export default function AdminPosts() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  
  // 1. Consume global state from AuthContext
  const { posts: globalPosts, setPosts: setGlobalPosts, language } = useAuth(); 

  // 2. Create local state for parsed posts and loading
  const [parsedPosts, setParsedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [viewingPost, setViewingPost] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [formData, setFormData] = useState({
    translations: {
      en: { title: "", content: "" },
      ar: { title: "", content: "" }
    }
  });
  const [errors, setErrors] = useState({});

  // 3. UseEffect to parse global posts into local state
  // 3. UseEffect to parse global posts into local state
useEffect(() => {
  setLoading(true);
  
  if (!globalPosts) {
    setParsedPosts([]); // Ensure it's an array
    setLoading(false);
    return;
  }

  const parsed = globalPosts.map(post => {
    let translationsObject;

    if (typeof post.translations === "string") {
      try {
        translationsObject = JSON.parse(post.translations);
      } catch (e) {
        console.error("Error parsing translations for post:", post.id, e);
        translationsObject = null; // Set to null on parse error
      }
    } else {
      translationsObject = post.translations; // Assign whatever it is (object, null, undefined)
    }

    // --- THIS IS THE FIX ---
    // Ensure translationsObject is an object, or default to an empty one.
    const safeTranslations = translationsObject || {};
    // -----------------------

    return { 
      ...post, 
      translations: {
        // Now safely access from safeTranslations
        en: safeTranslations.en || { title: '', content: '' }, 
        ar: safeTranslations.ar || { title: '', content: '' }
      }
    };
  });

  setParsedPosts(parsed);
  setLoading(false);
}, [globalPosts]);

// 4. Filter against the local parsedPosts
const filteredPosts = parsedPosts.filter(post => {
  // Use optional chaining (?.) for safety
  const enTitle = post.translations?.en?.title || "";
  const arTitle = post.translations?.ar?.title || "";
  const enContent = post.translations?.en?.content || "";
  const arContent = post.translations?.ar?.content || "";
  
  return enTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
         arTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
         enContent.toLowerCase().includes(searchQuery.toLowerCase()) ||
         arContent.toLowerCase().includes(searchQuery.toLowerCase());
});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.translations.en.title.trim()) newErrors.enTitle = t("This field is required.");
    if (!formData.translations.en.content.trim()) newErrors.enContent = t("This field is required.");
    if (!formData.translations.ar.title.trim()) newErrors.arTitle = t("This field is required.");
    if (!formData.translations.ar.content.trim()) newErrors.arContent = t("This field is required.");
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // 5. Refined handleSubmit (Data Integrity)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('translations', JSON.stringify(formData.translations));
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      let newOrUpdatedPost; // This will hold the result from the API

      if (editingPost) {
        // Assume API returns the full, updated post object (with new image URL)
        newOrUpdatedPost = await updataPostId_Admin(editingPost.id, formDataToSend);
        alert(t("Post updated successfully!"));
      } else {
        // Assume API returns the full, created post object
        newOrUpdatedPost = await createPost_Admin(formDataToSend);
        alert(t("Post created successfully!"));
      }
      
      // Update the *global* state. 
      // The local 'parsedPosts' will update automatically via its useEffect.
      if (editingPost) {
        setGlobalPosts(globalPosts.map(p => 
          p.id === newOrUpdatedPost.id ? newOrUpdatedPost : p
        ));
      } else {
        setGlobalPosts([newOrUpdatedPost, ...globalPosts]);
      }
      
      handleCloseModal();
    } catch (error) {
      console.error("Error saving post:", error);
      alert(t("Error saving post. Please try again."));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(t("Are you sure you want to delete this post?"))) {
      try {
        await deletePost_Admin(id);
        // Update global state, which will trigger local re-parse
        setGlobalPosts(globalPosts.filter((p) => p.id !== id));
        alert(t("Post deleted successfully!"));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  // 6. Refined handleEdit (No API call)
  // 6. Refined handleEdit (No API call)
const handleEdit = (post) => {
  setEditingPost(post);
  
  // Use optional chaining (?.) to safely populate the form
  setFormData({
    translations: {
      en: {
        title: post.translations?.en?.title || "",
        content: post.translations?.en?.content || ""
      },
      ar: {
        title: post.translations?.ar?.title || "",
        content: post.translations?.ar?.content || ""
      }
    }
  });
  
  setImagePreview(post.image || null);
  setImageFile(null);
  setErrors({});
  setShowModal(true);
};

  const handleAddNew = () => {
    setEditingPost(null);
    setFormData({
      translations: {
        en: { title: "", content: "" },
        ar: { title: "", content: "" }
      }
    });
    setImagePreview(null);
    setImageFile(null);
    setErrors({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPost(null);
    // Reset form data
    setFormData({
      translations: {
        en: { title: "", content: "" },
        ar: { title: "", content: "" }
      }
    });
    setImagePreview(null);
    setImageFile(null);
    setErrors({});
  };

  const handleView = (post) => {
    setViewingPost(post);
  };

  const handleChange = (lang, field, value) => {
    setFormData(prev => ({
      ...prev,
      translations: {
        ...prev.translations,
        [lang]: {
          ...prev.translations[lang],
          [field]: value
        }
      }
    }));
    
    const errorKey = `${lang}${field.charAt(0).toUpperCase() + field.slice(1)}`;
    if (errors[errorKey]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return t("Unknown date");
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return t("Invalid date");
    return date.toLocaleString(i18n.language === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#193042] mx-auto"></div>
          <p className="mt-4 text-gray-600">{t("Loading posts...")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header and Add Button */}
        <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
          <h1 className="text-3xl font-bold text-[#193042]">
            {t("Posts Management")}
          </h1>
          <button
            onClick={handleAddNew}
            className={`flex items-center gap-2 bg-gradient-to-r from-[#193042] to-[#254e6f] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <Plus size={20} />
            <span>{t("Add New Post")}</span>
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="relative">
            <Search className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRTL ? "right-3" : "left-3"}`} size={20} />
            <input
              type="text"
              placeholder={t("Search posts...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full border border-gray-300 rounded-lg py-3 focus:ring-2 focus:ring-[#193042] focus:border-transparent outline-none ${isRTL ? "pr-10 text-right" : "pl-10"}`}
            />
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <FileText className="mx-auto text-gray-300 mb-4" size={64} />
            <p className="text-gray-500 text-lg">{t("No posts found.")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-t-4 border-[#193042]"
              >
                {post.image && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.translations?.[language]?.title || ""} 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/e5e7eb/7b8393?text=No+Image'; }}
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="text-xl font-bold text-[#193042] line-clamp-2 flex-1">
                      {post.translations?.[language]?.title || post.translations?.en?.title || t("Untitled")}
                    </h2>
                  </div>
                  
                  {/* 7. UI FIX: Uncommented content */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.translations?.[language]?.content || post.translations?.en?.content || t("No content available.")}
                  </p>

                  <div className={`flex items-center gap-2 text-xs text-gray-500 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <Clock size={14} />
                    <span>{formatDate(post.timestamp)}</span>
                  </div>

                  {/* Actions */}
                  <div className={`flex gap-2 pt-4 border-t border-gray-100 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <button
                      onClick={() => handleView(post)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Eye size={16} />
                      <span className="text-sm font-medium">{t("View")}</span>
                    </button>
                    <button
                      onClick={() => handleEdit(post)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Edit size={16} />
                      <span className="text-sm font-medium">{t("Edit")}</span>
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={16} />
                      <span className="text-sm font-medium">{t("Delete")}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className={`flex items-center justify-between p-6 border-b border-gray-200 ${isRTL ? "flex-row-reverse" : ""}`}>
              <h2 className="text-2xl font-bold text-[#193042]">
                {editingPost ? t("Edit Post") : t("Create New Post")}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Image Upload */}
              <div>
                <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? "text-right" : ""}`}>
                  {t("Post Image")} <span className="text-gray-500 text-xs">({t("Optional")})</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#193042] transition-colors">
                  {imagePreview ? (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="max-h-48 mx-auto rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setImageFile(null);
                        }}
                        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <ImageIcon className="mx-auto text-gray-400 mb-2" size={48} />
                      <p className="text-gray-600 mb-2">{t("Click to upload or drag and drop")}</p>
                      <p className="text-xs text-gray-500">{t("PNG, JPG, GIF up to 5MB")}</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  {!imagePreview && (
                    <label
                      htmlFor="image-upload"
                      className="mt-4 inline-flex items-center gap-2 bg-[#193042] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#254e6f] transition-colors"
                    >
                      <Upload size={18} />
                      <span>{t("Choose Image")}</span>
                    </label>
                  )}
                </div>
              </div>

              {/* English Fields */}
              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="text-lg font-bold text-blue-900 mb-4">
                  {t("English Content")}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("Title (English)")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.translations.en.title}
                      onChange={(e) => handleChange('en', 'title', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                        errors.enTitle ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter English title"
                    />
                    {errors.enTitle && (
                      <p className="text-red-500 text-sm mt-1">{errors.enTitle}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("Content (English)")} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.translations.en.content}
                      onChange={(e) => handleChange('en', 'content', e.target.value)}
                      rows="6"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none ${
                        errors.enContent ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter English content"
                    />
                    {errors.enContent && (
                      <p className="text-red-500 text-sm mt-1">{errors.enContent}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Arabic Fields */}
              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                <h3 className="text-lg font-bold text-green-900 mb-4" dir="rtl">
                  {t("Arabic Content")}
                </h3>
                <div className="space-y-4" dir="rtl">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">
                      {t("Title (Arabic)")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.translations.ar.title}
                      onChange={(e) => handleChange('ar', 'title', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-right ${
                        errors.arTitle ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="أدخل العنوان بالعربية"
                    />
                    {errors.arTitle && (
                      <p className="text-red-500 text-sm mt-1 text-right">{errors.arTitle}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">
                      {t("Content (Arabic)")} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.translations.ar.content}
                      onChange={(e) => handleChange('ar', 'content', e.target.value)}
                      rows="6"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none text-right ${
                        errors.arContent ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="أدخل المحتوى بالعربية"
                    />
                    {errors.arContent && (
                      <p className="text-red-500 text-sm mt-1 text-right">{errors.arContent}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className={`flex gap-3 pt-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  {t("Cancel")}
                </button>
                <button
                  type="submit"
                  className={`flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#193042] to-[#254e6f] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <Save size={20} />
                  <span>{editingPost ? t("Update Post") : t("Create Post")}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Post Modal */}
      {viewingPost && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className={`flex items-center justify-between p-6 border-b border-gray-200 ${isRTL ? "flex-row-reverse" : ""}`}>
              <h2 className="text-2xl font-bold text-[#193042]">
                {t("Post Details")}
              </h2>
              <button
                onClick={() => setViewingPost(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {viewingPost.image && (
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={viewingPost.image} 
                    alt={viewingPost.translations?.[i18n.language]?.title || ""} 
                    className="w-full h-auto"
                  />
                </div>
              )}
              
              <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
                <h3 className="text-2xl font-bold text-[#193042] mb-3">
                  {viewingPost && (viewingPost.translations?.[language]?.title || viewingPost.translations?.en?.title || t("Untitled"))}
                </h3>
                
                <div className={`flex items-center gap-2 text-sm text-gray-500 mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <Clock size={16} />
                  <span>{formatDate(viewingPost.timestamp)}</span>
                </div>
                
                <div className="prose max-w-none">
                  <p className={`text-gray-700 leading-relaxed whitespace-pre-wrap ${i18n.language === 'ar' ? 'text-right' : ''}`}>
                    {viewingPost && (viewingPost.translations?.[i18n.language]?.content || viewingPost.translations?.en?.content || t("No content available."))}
                  </p>
                </div>
              </div>

              <div className={`flex gap-3 pt-4 border-t border-gray-100 ${isRTL ? "flex-row-reverse" : ""}`}>
                <button
                  onClick={() => {
                    setViewingPost(null);
                    handleEdit(viewingPost);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition-colors"
                >
                  <Edit size={20} />
                  <span>{t("Edit Post")}</span>
                </button>
                <button
                  onClick={() => setViewingPost(null)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  {t("Close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}