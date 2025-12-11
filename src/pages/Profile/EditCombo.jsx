import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getComboByIdService, updateComboService } from "../../Services/comboFetching";
import SubmitButton from "../../components/Buttons/SubmitButton";
import toast from "react-hot-toast";

const EditCombo = () => {
  const { comboId } = useParams();
  const { currentUser, updateViewedProfile, viewedProfile } = useAuth();
  const navigate = useNavigate();

  const [combo, setCombo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    video: null,
    elements: [],
  });

  console.log(viewedProfile)

  // ------------------- Cargar combo -------------------
  useEffect(() => {
    if (!comboId) return;

    const fetchCombo = async () => {
      setLoading(true);
      try {
        const res = await getComboByIdService(comboId);
        console.log(res)
        if (res.success && res.combo) {
          setCombo(res.combo);
          setFormData({
            name: res.combo.name,
            video: res.combo.video,
            elements: res.combo.elements.map(el => ({
              userSkillVariantId: el.userSkillVariantId,
              hold: el.hold,
              reps: el.reps,
            })),
          });
        } else {
          toast.error("Combo no encontrado");
        }
      } catch (error) {
        console.error("Error cargando combo:", error);
        toast.error("Error cargando combo");
      } finally {
        setLoading(false);
      }
    };

    fetchCombo();
  }, [comboId]);

  if (loading) return <p className="text-white text-center mt-10">Cargando...</p>;
  if (!combo) return <p className="text-white text-center mt-10">Combo no encontrado</p>;

  // ------------------- Handlers -------------------
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleVideoChange = (e) => {
    if (e.target.files?.length > 0) {
      setFormData(prev => ({ ...prev, video: e.target.files[0] }));
    }
  };

  const handleElementChange = (index, field, value) => {
    const updated = [...formData.elements];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, elements: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);

      if (formData.video instanceof File) data.append("video", formData.video);
      data.append("elements", JSON.stringify(formData.elements));

      const res = await updateComboService(combo._id, data);

      if (!res.success) throw new Error(res.message || "Error actualizando combo");

      toast.success("Combo actualizado correctamente!");
      updateViewedProfile(res.user);
      navigate(`/profile/${currentUser.username}/combos/${combo._id}`);
    } catch (error) {
      toast.error(error.message || "Error actualizando combo");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Combo</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 p-5 backdrop-blur-md border border-white/20 rounded-2xl space-y-5"
      >
        {/* Nombre */}
        <div>
          <label className="block mb-1 font-semibold">Nombre del combo</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full bg-black/30 border border-gray-700 p-2 rounded-lg"
          />
        </div>

        {/* Video */}
        <div>
          <label className="block mb-1 font-semibold">Video del combo</label>
          <input
            id="video"
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="hidden"
          />
          <label
            htmlFor="video"
            className="px-3 py-1 text-sm bg-purple-600 hover:bg-purple-700 rounded-md cursor-pointer inline-block transition"
          >
            {formData.video instanceof File ? "Cambiar video" : "Seleccionar video"}
          </label>
          {formData.video && (
            <video
              src={formData.video instanceof File ? URL.createObjectURL(formData.video) : formData.video}
              controls
              className="w-full mt-2 rounded-md"
            />
          )}
        </div>

        {/* Elements */}
        <div>
          <label className="block mb-2 font-semibold">Variantes del combo</label>
                {formData.elements.map((el, index) => {
          const comboEl = combo.elements[index]; // Para mostrar skillName / variantName
          return (
            <div key={index} className="bg-black/30 border border-gray-700 p-3 rounded-xl mb-3">
              <h3 className="font-bold mb-1">
                {comboEl.skillName} – {comboEl.variantName}
              </h3>

              {comboEl.hold > 0 && (
                <div className="flex items-center gap-2 mb-1">
                  <label>Hold (s):</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={el.hold}
                    onChange={(e) => handleElementChange(index, "hold", Number(e.target.value))}
                    className="bg-black/30 border border-gray-700 p-1 rounded w-20"
                  />
                </div>
              )}

              {comboEl.reps > 0 && (
                <div className="flex items-center gap-2 mb-1">
                  <label>Reps:</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={el.reps}
                    onChange={(e) => handleElementChange(index, "reps", Number(e.target.value))}
                    className="bg-black/30 border border-gray-700 p-1 rounded w-20"
                  />
                </div>
              )}
            </div>
          );
        })}
        </div>

        <SubmitButton loading={saving} text="Guardar Cambios" />
      </form>
    </div>
  );
};

export default EditCombo;
