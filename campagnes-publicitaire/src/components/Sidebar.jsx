import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <h2>AdManager</h2>
      <nav>
        <Link className={location.pathname === "/" ? "active" : ""} to="/">
          Dashboard
        </Link>
        <Link className={location.pathname === "/campaigns" ? "active" : ""} to="/campaigns">
          Liste des campagnes
        </Link>
        <Link className={location.pathname === "/campaigns/new" ? "active" : ""} to="/campaigns/new">
          Créer Campagne
        </Link>
      </nav>
    </div>
  );
}
