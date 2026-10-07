import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import Vendors from "../pages/Vendors";
import Materials from "../pages/Materials";
import PurchaseEntry from "../pages/PurchaseEntry";
import Reports from "../pages/Reports";
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/purchase-entry" element={<PurchaseEntry />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
