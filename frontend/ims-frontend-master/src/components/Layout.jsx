import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Boxes,
  Building2,
  ClipboardPlus,
  FileBarChart,
  LayoutDashboard,
  Menu,
  PackageSearch,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";
import { useState } from "react";

const nav = [
  ["/", "Dashboard", LayoutDashboard],
  ["/vendors", "Vendors", Building2],
  ["/materials", "Materials", PackageSearch],
  ["/purchase-entry", "Purchase Entry", ClipboardPlus],
  ["/reports", "Purchase Reports", FileBarChart],
];

export default function Layout() {
  const [open, setOpen] = useState(false); // Mobile menu
  const [collapsed, setCollapsed] = useState(false); // Desktop sidebar toggle

  const location = useLocation();

  const title =
    nav.find(([to]) => to === location.pathname)?.[1] ||
    "Inventory Management";

  return (
    <div className={`app-shell ${collapsed ? "sidebar-collapsed" : ""}`}>
      {/* Sidebar */}
      <aside
        className={`sidebar ${open ? "open" : ""} ${
          collapsed ? "collapsed" : ""
        }`}
      >
        {/* Brand */}
        <div className="brand">
          <span className="brand-mark">
            <Boxes size={21} />
          </span>

          {!collapsed && (
            <span>
              Glory Textiles
              <small>INVENTORY SYSTEM</small>
            </span>
          )}

          {/* Desktop Toggle */}
          <button
            className="toggle-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <PanelLeftOpen size={20} />
            ) : (
              <PanelLeftClose size={20} />
            )}
          </button>

          {/* Mobile Close */}
          <button className="close" onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav>
          {nav.map(([to, label, Icon]) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setOpen(false)}
            >
              <Icon size={20} />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="sidebar-note">
            <span className="status-dot" /> Services connected
            <br />
            <small>Inventory Management · :8090</small>
          </div>
        )}
      </aside>

      {/* Main */}
      <main className={collapsed ? "collapsed" : ""}>
        <header>
          {/* Mobile menu button */}
          <button className="menu" onClick={() => setOpen(true)}>
            <Menu />
          </button>

          <div>
            <p className="eyebrow">OPERATIONS</p>
            <h1>{title}</h1>
          </div>

          <div className="header-user">
            IM <span>Inventory Manager</span>
          </div>
        </header>

        <section className="page">
          <Outlet />
        </section>
      </main>
    </div>
  );
}