import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCampaign, getStats } from "../api/campaign.api";
import StatsCard from "../components/StatsCard";
import "./CampaignDetail.css";

export default function CampaignDetail() {
  const { id } = useParams();

  const [campaign, setCampaign] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const campaignRes = await getCampaign(id);
      const statsRes = await getStats(id);

      setCampaign(campaignRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error("Erreur chargement campagne", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="loading">Chargement...</p>;
  if (!campaign) return <p className="error">Campagne introuvable</p>;

  return (
    <div className="campaign-detail">
      <Link to="/campaigns" className="back-link">
        ← Retour aux campagnes
      </Link>

      <h2>Détails de la campagne</h2>

      
      <div className="campaign-card">
        <div className="row">
          <span>Nom</span>
          <strong>{campaign.name}</strong>
        </div>

        <div className="row">
          <span>Annonceur</span>
          <strong>{campaign.advertiser}</strong>
        </div>

        <div className="row">
          <span>Budget</span>
          <strong>{campaign.budget} €</strong>
        </div>

        <div className="row">
          <span>Status</span>
          <span className={`status ${campaign.status}`}>
            {campaign.status}
          </span>
        </div>

        <div className="row">
          <span>Période</span>
          <strong>
            {new Date(campaign.startDate).toLocaleDateString()} →{" "}
            {new Date(campaign.endDate).toLocaleDateString()}
          </strong>
        </div>
      </div>

      
    </div>
  );
}
