import { useEffect, useState } from "react";
import { getCampaigns } from "../api/campaign.api";
import "./Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await getCampaigns();
      const campaigns = res.data;

      let impressions = 0;
      let clicks = 0;
      let budget = 0;

      campaigns.forEach(c => {
        impressions += c.impressions || 0;
        clicks += c.clicks || 0;
        budget += c.budget || 0;
      });

      const CTR = impressions === 0 ? 0 : (clicks / impressions) * 100;
      const CPC = clicks === 0 ? 0 : budget / clicks;

      const totalCampaigns = campaigns.length;
      const activeCampaigns = campaigns.filter(c => c.status === "active").length;
      const pausedCampaigns = campaigns.filter(c => c.status === "paused").length;

      setStats({
        impressions,
        clicks,
        CTR,
        CPC,
        totalCampaigns,
        activeCampaigns,
        pausedCampaigns
      });
    } catch (err) {
      console.error("Erreur chargement stats :", err);
    }
  };

  if (!stats) return <p>Chargement...</p>;

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div className="stats-grid">
        <StatCard title="Total campagnes" value={stats.totalCampaigns} />
        <StatCard title="Actives" value={stats.activeCampaigns} />
        <StatCard title="En pause" value={stats.pausedCampaigns} />
        <StatCard title="Impressions" value={stats.impressions} />
        <StatCard title="Clics" value={stats.clicks} />
        <StatCard title="CTR (%)" value={stats.CTR.toFixed(2)} />
        <StatCard title="CPC (€)" value={stats.CPC.toFixed(2)} />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <p className="stat-title">{title}</p>
      <p className="stat-value">{value}</p>
    </div>
  );
}
