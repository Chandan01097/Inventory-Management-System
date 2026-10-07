import { useEffect, useState } from "react";
import { Building2 } from "lucide-react";
import { getVendors } from "../api/services/inventoryService";
import { errorMessage } from "../api/client";
import { Empty, Loading, Notice, PageIntro } from "../components/Ui";
export default function Vendors() {
  const [data, setData] = useState([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState("");
  useEffect(() => {
    getVendors()
      .then(setData)
      .catch((e) => setError(errorMessage(e)))
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <PageIntro title="Vendors">
        Supplier information is read from the Inventory Management service.
      </PageIntro>
      <div className="panel">
        {loading ? (
          <Loading text="Loading vendors…" />
        ) : error ? (
          <Notice>{error}</Notice>
        ) : data.length === 0 ? (
          <Empty>No vendors are available.</Empty>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Contact person</th>
                  <th>Phone</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {data.map((v) => (
                  <tr key={v.vendorId}>
                    <td>
                      <div className="vendor-name">
                        <span>
                          <Building2 size={17} />
                        </span>
                        <div>
                          <b>{v.vendorName}</b>
                          <small>ID: {v.vendorId}</small>
                        </div>
                      </div>
                    </td>
                    <td>{v.contactPerson || "—"}</td>
                    <td>{v.contactNumber || "—"}</td>
                    <td>{v.vendorAddress || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
