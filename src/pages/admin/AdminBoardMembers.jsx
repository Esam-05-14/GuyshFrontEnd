

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
  // Renamed 'name' to 'profile_id' for the dropdown selection
  // Added 'profile_name' to store the actual name for API calls (in create/edit)
  const [formData, setFormData] = useState({ 
    profile_id: "", 
    profile_name: "", // Holds the selected English Name
    en_position: "", 
    ar_position: "" 
  });

  const isRTL = i18n.language === "ar";


  // Helper function to check for the user profile ID and name
  const findUser = (id) => {
    return profiles.find(p => p.id === parseInt(id));
  };
  
  // Helper function for filtering
  const toLowerCase = (str) => String(str).toLowerCase();

  useEffect(() => {
    const fetchData = async () =>{ 
      try{
        const data = await getUsersProfiles();
        setProfiles(data);
      }catch(error){
        console.error("Error fetching user profiles:", error);
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
      console.error("Error fetching board members:", error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = members.filter((m) =>
    toLowerCase(m.name).includes(toLowerCase(searchQuery))
  );

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
      
      // FIX 2: Initialize formData with previous values for Edit Mode
      setFormData({
        // Find the profile ID corresponding to the fetched member name
        profile_id: profiles.find(p => p.english_name === data.name)?.id || "",
        profile_name: data.name,
        en_position: data.translations.en.position, // Keep previous EN position visible
        ar_position: data.translations.ar.position, // Keep previous AR position visible
      });
      setImagePreview(data.profile_photo || null);
      setImageFile(null);
    } catch (error) {
      console.error("Error fetching member details:", error);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();

      // Use the selected ID from formData.profile_id or resolve the name from the input field
      let userId = formData.profile_id;
      let userName = formData.profile_name;
      
      // If the user didn't use the dropdown (only possible in Edit Mode for name field)
      if (!userId && formData.profile_name) {
         const userObj = profiles.find(u => toLowerCase(u.english_name) === toLowerCase(formData.profile_name));
         if (userObj) {
            userId = userObj.id;
            userName = userObj.english_name;
         }
      }

      if (!userId) {
        alert(t("boardMembers.userNotFound", "User not found in profiles"));
        return;
      }

      formDataToSend.append("user_profile", userId);
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
              // Use the resolved name
              name: userName,
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
      console.error("Error saving member:", error);
      alert(t("boardMembers.updateFailed", "Update failed"));
    }
  };

  const handleCreate = async () => {
    try {
      const formDataToSend = new FormData();

      // Use the selected ID from formData.profile_id
      const userId = formData.profile_id;
      const userName = formData.profile_name;

      if (!userId) {
        alert(t("boardMembers.userNotFound", "Please select a user profile."));
        return;
      }

      formDataToSend.append("user_profile", userId);
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
      setMembers([{...newMember, name: userName}, ...members]); // Add the name to local state for display

      alert(t("boardMembers.createSuccess", "Member created successfully"));
      setShowCreateModal(false);
      setFormData({ profile_id: "", profile_name: "", en_position: "", ar_position: "" });
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error creating member:", error);
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
        console.error("Error deleting member:", error);
        alert(t("boardMembers.deleteFailed", "Failed to delete member"));
      }
    }
  };
  
  // Custom Handler for the Create Modal Select to correctly handle ID and Name
  const handleProfileSelectChange = (e) => {
    const selectedId = e.target.value;
    const selectedProfile = findUser(selectedId);
    
    setFormData({
      ...formData,
      profile_id: selectedId,
      profile_name: selectedProfile?.english_name || "",
    });
  };

  // Custom Handler for the Edit Modal Text Input
  const handleNameInputChange = (e) => {
    const newName = e.target.value;
    const userObj = profiles.find(p => toLowerCase(p.english_name) === toLowerCase(newName));
    
    setFormData({ 
      ...formData, 
      profile_name: newName, 
      profile_id: userObj ? userObj.id : "" // Update ID if a matching profile is found
    });
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
            setFormData({ profile_id: "", profile_name: "", en_position: "", ar_position: "" });
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

      {/* Table (omitted for brevity) */}
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
                      {/* Image Upload (same as before) */}
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

                      {/* Name Input - Changed to input field to keep existing name visible */}
                      <div>
                        <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? "text-right" : ""}`}>
                          {t("boardMembers.name", "Name")}
                        </label>
                        <input
                          type="text"
                          // Use formData.profile_name to display the name
                          value={formData.profile_name} 
                          // Custom handler for edit mode
                          onChange={handleNameInputChange}
                          className={`w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#193042] focus:border-transparent outline-none ${isRTL ? "text-right" : ""}`}
                        />
                      </div>

                      {/* Position (EN) Input - Value uses formData.en_position */}
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

                      {/* Position (AR) Input - Value uses formData.ar_position */}
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
              {/* Image Upload (same as before) */}
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

              {/* Profile Select - FIX 1: Use profile_id for value and a correct handler */}
              <div>
                <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? "text-right" : ""}`}>
                  {t("boardMembers.name", "Name")}
                </label>
                <select
                  // Use profile_id for binding the selected value
                  value={formData.profile_id} 
                  // Use the custom handler
                  onChange={handleProfileSelectChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#193042]"
                >
                  <option value="">{t("boardMembers.chooseProfile", "Choose a profile...")}</option>
                  {profiles.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.english_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Position (EN) Input - Value uses formData.en_position */}
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

              {/* Position (AR) Input - Value uses formData.ar_position */}
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