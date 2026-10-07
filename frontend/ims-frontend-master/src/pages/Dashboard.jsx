import {
  Building2,
  ClipboardPlus,
  FileBarChart,
  PackageSearch,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const cards = [
    [
      "Vendors",
      "Browse available supplier information",
      Building2,
      "/vendors",
    ],
    [
      "Materials",
      "View categories, types and units",
      PackageSearch,
      "/materials",
    ],
    [
      "New purchase",
      "Record a material purchase",
      ClipboardPlus,
      "/purchase-entry",
    ],
    [
      "Purchase reports",
      "Search purchases by vendor and date",
      FileBarChart,
      "/reports",
    ],
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="hero">
        {/* Left side */}
        <div>
          <p className="eyebrow">INVENTORY OPERATIONS</p>

          <h2>Welcome to your purchasing workspace.</h2>

          <p>
            Manage supplier reference data and record purchases through the
            Inventory Management service.
          </p>
        </div>

        {/* Right side - Create Purchase */}
        <div className="hero-action">
          <Link className="btn primary" to="/purchase-entry">
            Create purchase <span>→</span>
          </Link>
        </div>
      </div>

      {/* Quick Access */}
      <div className="section-title">
        <h3>Quick access</h3>

        <p>
          Use only the data and operations available through your backend
          services.
        </p>
      </div>

      <div className="quick-grid">
        {cards.map(([title, detail, Icon, to]) => (
          <Link className="quick-card" to={to} key={title}>
            <span className="card-icon">
              <Icon size={22} />
            </span>

            <h3>{title}</h3>

            <p>{detail}</p>

            <b>
              Open <span>→</span>
            </b>
          </Link>
        ))}
      </div>
    </>
  );
}