import { useEffect, useState } from "react";
import { getCampaigns, updateStatus } from "../api/campaign.api";
import { Link } from "react-router-dom";
import "./CampaignList.css";

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [filter, setFilter] = useState("all");

  const load = async () => {
    const res = await getCampaigns();
    setCampaigns(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleStatus = async (id, status) => {
    const newStatus = status === "active" ? "paused" : "active";
    await updateStatus(id, newStatus);
    load();
  };

  const filteredCampaigns = campaigns.filter((c) => {
    if (filter === "all") return true;
    return c.status === filter;
  });

  return (
    <div className="campaign-list">
      <div className="header">
        <h2>Campagnes</h2>
        <Link to="/campaigns/new" className="btn primary">
          + Nouvelle campagne
        </Link>
      </div>

      
      <div className="filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          Toutes
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          Actives
        </button>
        <button
          className={filter === "paused" ? "active" : ""}
          onClick={() => setFilter("paused")}
        >
          En pause
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredCampaigns.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>

              <td>
                <span className={`status ${c.status}`}>{c.status}</span>
              </td>

              <td>
                <div className="actions">
                  <button
                    className="btn"
                    onClick={() => toggleStatus(c._id, c.status)}
                  >
                    {c.status === "active" ? "Pause" : "Activer"}
                  </button>

                  <Link to={`/campaigns/${c._id}`} className="btn outline">
                    Voir
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
