import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCampaign } from "../api/campaign.api";
import "./CampaignCreate.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CampaignCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    advertiser: "",
    budget: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCampaign({
        ...form,
        budget: Number(form.budget),
      });
      toast.success(" Campagne créée avec succès !", {
      autoClose: 2000,
      onClose: () => navigate("/"), 
    });
    } catch (err) {
      console.error("Erreur création campagne", err);
      toast.error(" Impossible de créer la campagne !", { autoClose: 2000 });
    }
  };

  return (
    <div className="container">
      <h2>Créer une campagne</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom de la campagne :</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Annonceur :</label>
          <input
            type="text"
            name="advertiser"
            value={form.advertiser}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Budget (€) :</label>
          <input
            type="number"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date de début :</label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date de fin :</label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Créer la campagne
        </button>
      </form>
      <ToastContainer position="top-right" newestOnTop />
    </div>
  );
}
