import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, Eye, Pencil, Save, XCircle } from "lucide-react";
// import {
//   getBoardMembers_Admin,
//   getBoardMemberById_Admin,
//   updateBoardMember_Admin,
// } from "../../services/boardMembersService";
import { getBoardMembers_Admin, getBoardMemberById_Admin, updateBoardMember_Admin } from "../../services/authService";
import { useAuth } from "../../data/AuthContext";

export default function AdminBoardMembers() {
  const {language} = useAuth();
  const { t, i18n } = useTranslation();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", en_position: "", ar_position: "" });

  const isRTL = i18n.language === "ar";

  useEffect(() => {
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
    fetchMembers();
  }, []);

  const filtered = members.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = async (id) => {
    setDetailsLoading(true);
    try {
      const data = await getBoardMemberById_Admin(id);
      setSelected(data);
      console.log(data);
      setFormData({
        name: data.name,
        en_position: data.translations.en.position,
        ar_position: data.translations.ar.position,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await updateBoardMember_Admin(selected.id, {
        name: formData.name,
        translations: {
          en: { position: formData.en_position },
          ar: { position: formData.ar_position },
        },
      });
      alert("Updated successfully");
      setEditMode(false);
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8" dir={isRTL ? "rtl" : "ltr"}>
      <h1 className="text-3xl font-bold text-[#193042] mb-6">
        {t("boardMembers.title", "Board Members Management")}
      </h1>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={t("boardMembers.search", "Search by name...")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 pl-10 focus:ring-2 focus:ring-[#193042]"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#193042] text-white">
              <tr>
                <th className="py-4 px-6 text-left">ID</th>
                <th className="py-4 px-6 text-left">Name</th>
                <th className="py-4 px-6 text-left">Position</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6 font-semibold">#{m.id}</td>
                  <td className="py-4 px-6">{m.name}</td>
                  <td className="py-4 px-6">{m.translations[i18n.language]?.position}</td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => handleViewDetails(m.id)}
                      className="inline-flex items-center gap-2 bg-[#193042] text-white px-4 py-2 rounded-lg hover:bg-[#254e6f]"
                    >
                      <Eye size={18} />
                      {t("boardMembers.view", "View")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-xl p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-bold text-[#193042]">
                {t("boardMembers.details", "Member Details")}
              </h2>
              <button onClick={() => setSelected(null)} className="p-2">
                <XCircle size={26} />
              </button>
            </div>

            {detailsLoading ? (
              <div className="text-center py-10">Loading...</div>
            ) : (
              <div className="space-y-4">
                {!editMode ? (
                  <>
                    <p><strong>Name:</strong> {selected.name}</p>
                    <p><strong>EN Position:</strong> {selected.translations.en.position}</p>
                    <p><strong>AR Position:</strong> {selected.translations.ar.position}</p>

                    <button
                      onClick={() => setEditMode(true)}
                      className="mt-4 w-full bg-[#193042] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#254e6f]"
                    >
                      <Pencil size={20} /> Edit
                    </button>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="block">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border px-3 py-2 rounded-lg"
                      />

                      <label className="block mt-3">Position (EN)</label>
                      <input
                        type="text"
                        value={formData.en_position}
                        onChange={(e) => setFormData({ ...formData, en_position: e.target.value })}
                        className="w-full border px-3 py-2 rounded-lg"
                      />

                      <label className="block mt-3">Position (AR)</label>
                      <input
                        type="text"
                        value={formData.ar_position}
                        onChange={(e) => setFormData({ ...formData, ar_position: e.target.value })}
                        className="w-full border px-3 py-2 rounded-lg text-right"
                      />
                    </div>

                    <button
                      onClick={handleSave}
                      className="mt-4 w-full bg-green-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-green-700"
                    >
                      <Save size={20} /> Save
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
