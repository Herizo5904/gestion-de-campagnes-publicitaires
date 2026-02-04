export default function StatsCard({ stats }) {
  return (
    <div style={{
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      flex: 1
    }}>
      <h3>Statistiques globales</h3>
      <p>Impressions: {stats.impressions}</p>
      <p>Clicks: {stats.clicks}</p>
      <p>CTR: {stats.CTR.toFixed(2)}%</p>
      <p>CPC: {stats.CPC.toFixed(2)}€</p>
    </div>
  );
}
