import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import {
  getPurchaseReport,
  getVendors,
} from "../api/services/inventoryService";
import { errorMessage } from "../api/client";
import { Empty, Loading, Notice, PageIntro } from "../components/Ui";

export default function Reports() {
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({
    vendorName: "",
    fromDate: "",
    toDate: "",
  });

  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getVendors()
      .then(setVendors)
      .catch((e) => setError(errorMessage(e)))
      .finally(() => setLoading(false));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSearching(true);

    try {
      const data = await getPurchaseReport(form);
      setItems(data);
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setSearching(false);
    }
  };

  // Download report as CSV
  const downloadCSV = () => {
    if (!items || items.length === 0) return;

    const headers = [
      "Transaction ID",
      "Vendor / Supplier",
      "Brand / Material",
      "Quantity",
      "Total Amount",
      "Purchase Date",
      "Status",
    ];

    const rows = items.map((p) => [
      p.transactionId || "",
      p.vendorName || "",
      p.brandName || "",
      p.quantity ?? "",
      p.purchaseAmount ?? "",
      p.purchaseDate || "",
      p.status || "",
    ]);

    const escapeCSV = (value) => {
      const stringValue = String(value);

      if (
        stringValue.includes(",") ||
        stringValue.includes('"') ||
        stringValue.includes("\n")
      ) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }

      return stringValue;
    };

    const csvContent = [
      headers.map(escapeCSV).join(","),
      ...rows.map((row) => row.map(escapeCSV).join(",")),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;

    const vendor = form.vendorName
      ? form.vendorName.replace(/[^a-z0-9]/gi, "_")
      : "vendor";

    link.download = `purchase_report_${vendor}_${form.fromDate}_${form.toDate}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <>
      <PageIntro title="Purchase Reports">
        Generate a report for a vendor and date range using the Inventory
        Management report service.
      </PageIntro>

      {/* Filter Form */}
      <form className="panel report-filter" onSubmit={submit}>
        <label>
          Vendor
          <select
            required
            value={form.vendorName}
            onChange={(e) =>
              setForm({ ...form, vendorName: e.target.value })
            }
            disabled={loading}
          >
            <option value="">
              {loading ? "Loading vendors..." : "Select vendor"}
            </option>

            {vendors.map((v) => (
              <option key={v.vendorId} value={v.vendorName}>
                {v.vendorName}
              </option>
            ))}
          </select>
        </label>

        <label>
          From Date
          <input
            type="date"
            required
            value={form.fromDate}
            onChange={(e) =>
              setForm({ ...form, fromDate: e.target.value })
            }
          />
        </label>

        <label>
          To Date
          <input
            type="date"
            required
            value={form.toDate}
            onChange={(e) =>
              setForm({ ...form, toDate: e.target.value })
            }
          />
        </label>

        <button
          className="btn primary"
          disabled={searching || loading}
        >
          {searching ? "Generating..." : "Generate Report"}
        </button>
      </form>

      {error && <Notice>{error}</Notice>}

      {searching ? (
        <Loading text="Generating purchase report..." />
      ) : (
        items && (
          <div className="panel">
            <div className="table-heading">
              <div>
                <h3>Matching Purchases</h3>
                <p>
                  {items.length} record
                  {items.length === 1 ? "" : "s"} returned
                </p>
              </div>

              <button
                type="button"
                className="btn primary"
                onClick={downloadCSV}
                disabled={items.length === 0}
              >
                <Download size={18} />
                Download CSV
              </button>
            </div>

            {items.length === 0 ? (
              <Empty>No purchases matched the selected filters.</Empty>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>TRANSACTION ID</th>
                      <th>VENDOR / SUPPLIER</th>
                      <th>BRAND / MATERIAL</th>
                      <th>QUANTITY</th>
                      <th>TOTAL AMOUNT</th>
                      <th>PURCHASE DATE</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>

                  <tbody>
                    {items.map((p, i) => (
                      <tr key={p.purchaseId || p.transactionId || i}>
                        <td>
                          <b>{p.transactionId || "—"}</b>
                        </td>

                        <td>{p.vendorName || "—"}</td>

                        <td>{p.brandName || "—"}</td>

                        <td>{p.quantity ?? "—"}</td>

                        <td>
                          <b>₹ {p.purchaseAmount ?? "—"}</b>
                        </td>

                        <td>{p.purchaseDate || "—"}</td>

                        <td>
                          <span className="badge">
                            {p.status || "—"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )
      )}
    </>
  );
}