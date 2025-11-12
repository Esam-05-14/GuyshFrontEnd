// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { Search, Eye, Pencil, Save, XCircle } from "lucide-react";
// import { getBoardMembers_Admin, getBoardMemberById_Admin, updateBoardMember_Admin } from "../../services/authService";
// import { useAuth } from "../../data/AuthContext";

// export default function AdminBoardMembers() {
//   const {language} = useAuth();
//   const { t, i18n } = useTranslation();
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selected, setSelected] = useState(null);
//   const [detailsLoading, setDetailsLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({ name: "", en_position: "", ar_position: "" });
  

//   const isRTL = i18n.language === "ar";

//   useEffect(() => {
//     const fetchMembers = async () => {
//       try {
//         const data = await getBoardMembers_Admin(language);
//         setMembers(data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMembers();
//   }, []);

//   const filtered = members.filter((m) =>
//     m.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleViewDetails = async (id) => {
//     setDetailsLoading(true);
//     try {
//       const data = await getBoardMemberById_Admin(id);
//       setSelected(data);
//       console.log(data);
//       setFormData({
//         name: data.name,
//         en_position: data.translations.en.position,
//         ar_position: data.translations.ar.position,
//       });
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setDetailsLoading(false);
//     }
//   };

//   const handleSave = async () => {
//     try {
//       await updateBoardMember_Admin(selected.id, {
//         name: formData.name,
//         translations: {
//           en: { position: formData.en_position },
//           ar: { position: formData.ar_position },
//         },
//       });
//       alert("Updated successfully");
//       setEditMode(false);
//     } catch (error) {
//       console.error(error);
//       alert("Update failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8" dir={isRTL ? "rtl" : "ltr"}>
//       <h1 className="text-3xl font-bold text-[#193042] mb-6">
//         {t("boardMembers.title", "Board Members Management")}
//       </h1>

//       <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex gap-4">
//         <div className="flex-1 relative">
//           <Search className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" size={20} />
//           <input
//             type="text"
//             placeholder={t("boardMembers.search", "Search by name...")}
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full border border-gray-300 rounded-lg py-2 pl-10 focus:ring-2 focus:ring-[#193042]"
//           />
//         </div>
//       </div>

//       {loading ? (
//         <div className="text-center py-10">Loading...</div>
//       ) : (
//         <div className="bg-white rounded-xl shadow-md overflow-x-auto">
//           <table className="min-w-full">
//             <thead className="bg-[#193042] text-white">
//               <tr>
//                 <th className="py-4 px-6 text-left">ID</th>
//                 <th className="py-4 px-6 text-left">Name</th>
//                 <th className="py-4 px-6 text-left">Position</th>
//                 <th className="py-4 px-6 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map((m) => (
//                 <tr key={m.id} className="border-b hover:bg-gray-50">
//                   <td className="py-4 px-6 font-semibold">#{m.id}</td>
//                   <td className="py-4 px-6">{m.name}</td>
//                   <td className="py-4 px-6">{m.translations[i18n.language]?.position}</td>
//                   <td className="py-4 px-6 text-center">
//                     <button
//                       onClick={() => handleViewDetails(m.id)}
//                       className="inline-flex items-center gap-2 bg-[#193042] text-white px-4 py-2 rounded-lg hover:bg-[#254e6f]"
//                     >
//                       <Eye size={18} />
//                       {t("boardMembers.view", "View")}
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {selected && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl max-w-xl w-full shadow-xl p-6">
//             <div className="flex justify-between mb-4">
//               <h2 className="text-2xl font-bold text-[#193042]">
//                 {t("boardMembers.details", "Member Details")}
//               </h2>
//               <button onClick={() => setSelected(null)} className="p-2">
//                 <XCircle size={26} />
//               </button>
//             </div>

//             {detailsLoading ? (
//               <div className="text-center py-10">Loading...</div>
//             ) : (
//               <div className="space-y-4">
//                 {!editMode ? (
//                   <>
//                     <p><strong>Name:</strong> {selected.name}</p>
//                     <p><strong>EN Position:</strong> {selected.translations.en.position}</p>
//                     <p><strong>AR Position:</strong> {selected.translations.ar.position}</p>

//                     <button
//                       onClick={() => setEditMode(true)}
//                       className="mt-4 w-full bg-[#193042] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#254e6f]"
//                     >
//                       <Pencil size={20} /> Edit
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <div className="space-y-2">
//                       <label className="block">Name</label>
//                       <input
//                         type="text"
//                         value={formData.name}
//                         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                         className="w-full border px-3 py-2 rounded-lg"
//                       />

//                       <label className="block mt-3">Position (EN)</label>
//                       <input
//                         type="text"
//                         value={formData.en_position}
//                         onChange={(e) => setFormData({ ...formData, en_position: e.target.value })}
//                         className="w-full border px-3 py-2 rounded-lg"
//                       />

//                       <label className="block mt-3">Position (AR)</label>
//                       <input
//                         type="text"
//                         value={formData.ar_position}
//                         onChange={(e) => setFormData({ ...formData, ar_position: e.target.value })}
//                         className="w-full border px-3 py-2 rounded-lg text-right"
//                       />
//                     </div>

//                     <button
//                       onClick={handleSave}
//                       className="mt-4 w-full bg-green-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-green-700"
//                     >
//                       <Save size={20} /> Save
//                     </button>
//                   </>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, Eye, Pencil, Save, XCircle, Trash2, Upload, Image as ImageIcon, Plus, X } from "lucide-react";
import { getBoardMembers_Admin, getBoardMemberById_Admin, updateBoardMember_Admin, deleteBoardMember_Admin, createBoardMember_Admin, getUsersProfiles } from "../../services/authService";
import { useAuth } from "../../data/AuthContext";

export default function AdminBoardMembers() {
  const {language} = useAuth();
  const [profiles , setProfiles] = useState([]);
  const { t, i18n } = useTranslation();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({ 
    name: "", 
    en_position: "", 
    ar_position: "" 
  });

  const isRTL = i18n.language === "ar";


    useEffect(() => {
    const  fetchData = async () =>{ 
          try{
            const data = await getUsersProfiles();
            setProfiles(data);
          }catch(error){
            console.log(error);
          }
        }
      fetchData();
      fetchMembers();
  }, []);
 

  const fetchMembers = async () => {
    try {
      const data = await getBoardMembers_Admin(language);
      setMembers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = members.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const id_needed = (name) => {
    const n = profiles.filter(u => toLowerCase(u.english_name).includes(toLowerCase(name)))
    return n;
  } 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleViewDetails = async (id) => {
    setDetailsLoading(true);
    try {
      const data = await getBoardMemberById_Admin(id);
      setSelected(data);
      setFormData({
        name: data.name,
        translations : {
          ar: {position : data.translations.ar.position},
          en: {position : data.translations.en.position},
        }
        
      });
      setImagePreview(data.profile_photo || null);
      setImageFile(null);
    } catch (error) {
      console.error(error);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleSave = async () => {
  try {
    const formDataToSend = new FormData();

    // Get the user ID based on the selected name
    const userObj = profiles.find(u => u.english_name.toLowerCase().includes(formData.name.toLowerCase()));
    if (!userObj) {
      alert(t("boardMembers.userNotFound", "User not found in profiles"));
      return;
    }

    formDataToSend.append("user_profile", userObj.id);
    formDataToSend.append(
      "translations",
      JSON.stringify({
        ar: { position: formData.ar_position },
        en: { position: formData.en_position },
      })
    );

    if (imageFile) {
      formDataToSend.append("profile_photo", imageFile);
    }

    await updateBoardMember_Admin(selected.id, formDataToSend);

    // Update local state
    const updatedMembers = members.map((m) =>
      m.id === selected.id
        ? {
            ...m,
            name: formData.name,
            translations: {
              en: { position: formData.en_position },
              ar: { position: formData.ar_position },
            },
            profile_photo: imageFile
              ? URL.createObjectURL(imageFile)
              : m.profile_photo,
          }
        : m
    );

    setMembers(updatedMembers);
    alert(t("boardMembers.updateSuccess", "Updated successfully"));
    setEditMode(false);
    setSelected(null);
    setImageFile(null);
    setImagePreview(null);
  } catch (error) {
    console.error(error);
    alert(t("boardMembers.updateFailed", "Update failed"));
  }
};

  const handleCreate = async () => {
  try {
    const formDataToSend = new FormData();

    // Get user by name to get ID
    const userObj = profiles.find(u => u.english_name.toLowerCase().includes(formData.name.toLowerCase()));
    if (!userObj) {
      alert(t("boardMembers.userNotFound", "User not found in profiles"));
      return;
    }

    formDataToSend.append("user_profile", userObj.id);
    formDataToSend.append(
      "translations",
      JSON.stringify({
        ar: { position: formData.ar_position },
        en: { position: formData.en_position },
      })
    );

    if (imageFile) {
      formDataToSend.append("profile_photo", imageFile);
    }

    const newMember = await createBoardMember_Admin(formDataToSend);
    setMembers([newMember, ...members]);

    alert(t("boardMembers.createSuccess", "Member created successfully"));
    setShowCreateModal(false);
    setFormData({ name: "", en_position: "", ar_position: "" });
    setImageFile(null);
    setImagePreview(null);
  } catch (error) {
    console.error(error);
    alert(t("boardMembers.createFailed", "Failed to create member"));
  }
};


  const handleDelete = async (id) => {
    if (window.confirm(t("boardMembers.confirmDelete", "Are you sure you want to delete this member?"))) {
      try {
        await deleteBoardMember_Admin(id);
        setMembers(members.filter(m => m.id !== id));
        setSelected(null);
        alert(t("boardMembers.deleteSuccess", "Member deleted successfully"));
      } catch (error) {
        console.error(error);
        alert(t("boardMembers.deleteFailed", "Failed to delete member"));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
        <h1 className="text-3xl font-bold text-[#193042]">
          {t("boardMembers.title", "Board Members Management")}
        </h1>
        <button
          onClick={() => {
            setShowCreateModal(true);
            setFormData({ name: "", en_position: "", ar_position: "" });
            setImageFile(null);
            setImagePreview(null);
          }}
          className={`flex items-center gap-2 bg-gradient-to-r from-[#193042] to-[#254e6f] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <Plus size={20} />
          <span>{t("boardMembers.addNew", "Add New Member")}</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="relative">
          <Search className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRTL ? "right-3" : "left-3"}`} size={20} />
          <input
            type="text"
            placeholder={t("boardMembers.search", "Search by name...")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full border border-gray-300 rounded-lg py-2 focus:ring-2 focus:ring-[#193042] focus:border-transparent outline-none ${isRTL ? "pr-10 text-right" : "pl-10"}`}
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#193042] mx-auto"></div>
            <p className="mt-4 text-gray-600">{t("boardMembers.loading", "Loading...")}</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-[#193042] to-[#254e6f] text-white">
              <tr>
                <th className={`py-4 px-6 font-semibold ${isRTL ? "text-right" : "text-left"}`}>
                  {t("boardMembers.id", "ID")}
                </th>
                <th className={`py-4 px-6 font-semibold ${isRTL ? "text-right" : "text-left"}`}>
                  {t("boardMembers.photo", "Photo")}
                </th>
                <th className={`py-4 px-6 font-semibold ${isRTL ? "text-right" : "text-left"}`}>
                  {t("boardMembers.name", "Name")}
                </th>
                <th className={`py-4 px-6 font-semibold ${isRTL ? "text-right" : "text-left"}`}>
                  {t("boardMembers.position", "Position")}
                </th>
                <th className="py-4 px-6 font-semibold text-center">
                  {t("boardMembers.actions", "Actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className={`py-4 px-6 font-semibold text-[#193042] ${isRTL ? "text-right" : "text-left"}`}>
                    #{m.id}
                  </td>
                  <td className={`py-4 px-6 ${isRTL ? "text-right" : "text-left"}`}>
                    {m.profile_photo ? (
                      <img src={m.profile_photo} alt={m.name} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">No Photo</span>
                      </div>
                    )}
                  </td>
                  <td className={`py-4 px-6 ${isRTL ? "text-right" : "text-left"}`}>{m.name}</td>
                  <td className={`py-4 px-6 ${isRTL ? "text-right" : "text-left"}`}>
                    {m.translations[i18n.language]?.position}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleViewDetails(m.id)}
                        className="inline-flex items-center gap-2 bg-[#193042] text-white px-4 py-2 rounded-lg hover:bg-[#254e6f] transition-colors"
                      >
                        <Eye size={18} />
                        <span>{t("boardMembers.view", "View")}</span>
                      </button>
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Trash2 size={18} />
                        <span>{t("boardMembers.delete", "Delete")}</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View/Edit Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className={`flex justify-between items-center p-6 border-b border-gray-200 ${isRTL ? "flex-row-reverse" : ""}`}>
              <h2 className="text-2xl font-bold text-[#193042]">
                {editMode ? t("boardMembers.edit", "Edit Member") : t("boardMembers.details", "Member Details")}
              </h2>
              <button onClick={() => {
                setSelected(null);
                setEditMode(false);
                setImageFile(null);
                setImagePreview(null);
              }} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <XCircle size={24} />
              </button>
            </div>

            <div className="p-6">
              {detailsLoading ? (
                <div className="text-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#193042] mx-auto"></div>
                  <p className="mt-4 text-gray-600">{t("boardMembers.loading", "Loading...")}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {!editMode ? (
                    <>
                      {selected.profile_photo && (
                        <div className="flex justify-center mb-4">
                          <img src={selected.profile_photo} alt={selected.name} className="w-32 h-32 rounded-full object-cover border-4 border-[#193042]" />
                        </div>
                      )}
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <p className="text-gray-700"><strong className="text-gray-900">{t("boardMembers.name", "Name")}:</strong> {selected.name}</p>
                        <p className="text-gray-700"><strong className="text-gray-900">{t("boardMembers.positionEn", "Position (EN)")}:</strong> {selected.translations.en.position}</p>
                        <p className="text-gray-700"><strong className="text-gray-900">{t("boardMembers.positionAr", "Position (AR)")}:</strong> {selected.translations.ar.position}</p>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setEditMode(true)}
                          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                          <Pencil size={20} />
                          <span>{t("boardMembers.edit", "Edit")}</span>
                        </button>
                        <button
                          onClick={() => handleDelete(selected.id)}
                          className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                        >
                          <Trash2 size={20} />
                          <span>{t("boardMembers.delete", "Delete")}</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Image Upload */}
                      <div>
                        <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? "text-right" : ""}`}>
                          {t("boardMembers.photo", "Profile Photo")}
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#193042] transition-colors">
                          {imagePreview ? (
                            <div className="relative inline-block">
                              <img 
                                src={imagePreview} 
                                alt="Preview" 
                                className="w-32 h-32 rounded-full object-cover mx-auto"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setImagePreview(null);
                                  setImageFile(null);
                                }}
                                className="absolute -top-2 -right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ) : (
                            <div>
                              <ImageIcon className="mx-auto text-gray-400 mb-2" size={48} />
                              <p className="text-gray-600 mb-2">{t("boardMembers.uploadPhoto", "Click to upload photo")}</p>
                            </div>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="profile-photo-upload"
                          />
                          {!imagePreview && (
                            <label
                              htmlFor="profile-photo-upload"
                              className="mt-4 inline-flex items-center gap-2 bg-[#193042] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#254e6f] transition-colors"
                            >
                              <Upload size={18} />
                              <span>{t("boardMembers.choosePhoto", "Choose Photo")}</span>
                            </label>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? "text-right" : ""}`}>
                          {t("boardMembers.name", "Name")}
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#193042] focus:border-transparent outline-none ${isRTL ? "text-right" : ""}`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t("boardMembers.positionEn", "Position (EN)")}
                        </label>
                        <input
                          type="text"
                          value={formData.en_position}
                          onChange={(e) => setFormData({ ...formData, en_position: e.target.value })}
                          className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#193042] focus:border-transparent outline-none"
                        />
                      </div>

                      <div dir="rtl">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">
                          {t("boardMembers.positionAr", "Position (AR)")}
                        </label>
                        <input
                          type="text"
                          value={formData.ar_position}
                          onChange={(e) => setFormData({ ...formData, ar_position: e.target.value })}
                          className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#193042] focus:border-transparent outline-none text-right"
                        />
                      </div>

                      <button
                        onClick={handleSave}
                        className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                      >
                        <Save size={20} />
                        <span>{t("boardMembers.save", "Save Changes")}</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className={`flex justify-between items-center p-6 border-b border-gray-200 ${isRTL ? "flex-row-reverse" : ""}`}>
              <h2 className="text-2xl font-bold text-[#193042]">
                {t("boardMembers.addNew", "Add New Member")}
              </h2>
              <button onClick={() => {
                setShowCreateModal(false);
                setImageFile(null);
                setImagePreview(null);
              }} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <XCircle size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Image Upload */}
              <div>
                <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? "text-right" : ""}`}>
                  {t("boardMembers.photo", "Profile Photo")}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#193042] transition-colors">
                  {imagePreview ? (
                    <div className="relative inline-block">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-32 h-32 rounded-full object-cover mx-auto"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setImageFile(null);
                        }}
                        className="absolute -top-2 -right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <ImageIcon className="mx-auto text-gray-400 mb-2" size={48} />
                      <p className="text-gray-600 mb-2">{t("boardMembers.uploadPhoto", "Click to upload photo")}</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="create-profile-photo-upload"
                  />
                  {!imagePreview && (
                    <label
                      htmlFor="create-profile-photo-upload"
                      className="mt-4 inline-flex items-center gap-2 bg-[#193042] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#254e6f] transition-colors"
                    >
                      <Upload size={18} />
                      <span>{t("boardMembers.choosePhoto", "Choose Photo")}</span>
                    </label>
                  )}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? "text-right" : ""}`}>
                  {t("boardMembers.name", "Name")}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#193042] focus:border-transparent outline-none ${isRTL ? "text-right" : ""}`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t("boardMembers.positionEn", "Position (EN)")}
                </label>
                <input
                  type="text"
                  value={formData.en_position}
                  onChange={(e) => setFormData({ ...formData, en_position: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#193042] focus:border-transparent outline-none"
                />
              </div>

              <div dir="rtl">
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">
                  {t("boardMembers.positionAr", "Position (AR)")}
                </label>
                <input
                  type="text"
                  value={formData.ar_position}
                  onChange={(e) => setFormData({ ...formData, ar_position: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#193042] focus:border-transparent outline-none text-right"
                />
              </div>

              <button
                onClick={handleCreate}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#193042] to-[#254e6f] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
              >
                <Plus size={20} />
                <span>{t("boardMembers.create", "Create Member")}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}