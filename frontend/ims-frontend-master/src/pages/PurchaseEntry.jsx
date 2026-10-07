import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  addPurchase,
  getCategories,
  getUnitsAndTypes,
  getVendors,
} from "../api/services/inventoryService";
import { errorMessage } from "../api/client";
import { Loading, Notice, PageIntro } from "../components/Ui";

const initial = {
  vendorName: "",
  materialCategoryId: "",
  materialTypeId: "",
  unitId: "",
  brandName: "",
  quantity: "",
  purchaseAmount: "",
  purchaseDate: "",
};

export default function PurchaseEntry() {
  const [form, setForm] = useState(initial),
    [vendors, setVendors] = useState([]),
    [categories, setCategories] = useState([]),
    [details, setDetails] = useState(null),
    [loading, setLoading] = useState(true),
    [detailLoading, setDetailLoading] = useState(false),
    [saving, setSaving] = useState(false),
    [error, setError] = useState(""),
    [success, setSuccess] = useState(null);

  useEffect(() => {
    Promise.all([getVendors(), getCategories()])
      .then(([v, c]) => {
        setVendors(v);
        setCategories(c);
      })
      .catch((e) => setError(errorMessage(e)))
      .finally(() => setLoading(false));
  }, []);

  const update = (key, value) => {
    setForm((f) => ({
      ...f,
      [key]: value,
    }));
  };

  const chooseCategory = async (value) => {
    setDetails(null);
    setSuccess(null);
    setError("");

    setForm((f) => ({
      ...f,
      materialCategoryId: value,
      materialTypeId: "",
      unitId: "",
    }));

    if (!value) return;

    setDetailLoading(true);

    try {
      setDetails(await getUnitsAndTypes(value));
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setDetailLoading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess(null);
    setSaving(true);

    try {
      const response = await addPurchase({
        ...form,

        // Send null when empty so @NotNull validation works
        quantity:
          form.quantity === ""
            ? null
            : Number(form.quantity),

        purchaseAmount:
          form.purchaseAmount === ""
            ? null
            : Number(form.purchaseAmount),
      });

      setSuccess(response);
      setForm(initial);
      setDetails(null);
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setSaving(false);
    }
  };

  const types =
    details?.materialTypeList ||
    details?.materialTypes ||
    details?.typeList ||
    [];

  const units =
    details?.unitList ||
    details?.units ||
    [];

  return (
    <>
      <PageIntro title="Purchase Entry">
        Record a purchase in the order required by the Inventory Management
        workflow.
      </PageIntro>

      {success && (
        <div className="purchase-success">
          <CheckCircle2 size={25} />

          <div>
            <b>
              {success.message ||
                "Purchase recorded successfully."}
            </b>

            <p>
              Generated Transaction ID:{" "}
              <strong>
                {success.purchase?.transactionId ||
                  success.transactionId ||
                  "Not returned by service"}
              </strong>
            </p>
          </div>
        </div>
      )}

      {error && <Notice>{error}</Notice>}

      {loading ? (
        <Loading text="Loading purchase reference data…" />
      ) : (
        <form
          className="purchase-form panel"
          onSubmit={submit}
        >
          {/* Step 1 */}
          <div className="form-step">
            <span>1</span>

            <div>
              <b>Supplier & material</b>

              <small>
                Select the vendor, then choose a material category.
              </small>
            </div>
          </div>

          <div className="form-grid">
            {/* Vendor */}
            <label>
              Vendor

              <select
                value={form.vendorName}
                onChange={(e) =>
                  update("vendorName", e.target.value)
                }
              >
                <option value="">
                  Select vendor
                </option>

                {vendors.map((v) => (
                  <option
                    key={v.vendorId}
                    value={v.vendorName}
                  >
                    {v.vendorName}
                  </option>
                ))}
              </select>
            </label>

            {/* Material Category */}
            <label>
              Material category

              <select
                value={form.materialCategoryId}
                onChange={(e) =>
                  chooseCategory(e.target.value)
                }
              >
                <option value="">
                  Select category
                </option>

                {categories.map((c) => (
                  <option
                    key={c.categoryId}
                    value={c.categoryId}
                  >
                    {c.categoryName}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Step 2 */}
          <div className="form-step">
            <span>2</span>

            <div>
              <b>Purchase details</b>

              <small>
                {detailLoading
                  ? "Loading types and units…"
                  : "Complete the fields using the category-specific options."}
              </small>
            </div>
          </div>

          <div className="form-grid three">
            {/* Material Type */}
            <label>
              Material type

              <select
                disabled={!details || detailLoading}
                value={form.materialTypeId}
                onChange={(e) =>
                  update(
                    "materialTypeId",
                    e.target.value
                  )
                }
              >
                <option value="">
                  Select type
                </option>

                {types.map((t) => (
                  <option
                    key={t.typeId}
                    value={t.typeId}
                  >
                    {t.typeName}
                  </option>
                ))}
              </select>
            </label>

            {/* Unit */}
            <label>
              Unit

              <select
                disabled={!details || detailLoading}
                value={form.unitId}
                onChange={(e) =>
                  update("unitId", e.target.value)
                }
              >
                <option value="">
                  Select unit
                </option>

                {units.map((u) => (
                  <option
                    key={u.unitId}
                    value={u.unitId}
                  >
                    {u.unitName}
                  </option>
                ))}
              </select>
            </label>

            {/* Brand */}
            <label>
              Brand

              <input
                value={form.brandName}
                onChange={(e) =>
                  update("brandName", e.target.value)
                }
                placeholder="Enter brand name"
              />
            </label>

            {/* Quantity */}
            <label>
              Quantity

              <input
                type="number"
                min="0.01"
                step="any"
                value={form.quantity}
                onChange={(e) =>
                  update("quantity", e.target.value)
                }
                placeholder="0"
              />
            </label>

            {/* Purchase Amount */}
            <label>
              Purchase amount

              <input
                type="number"
                min="0.01"
                step="any"
                value={form.purchaseAmount}
                onChange={(e) =>
                  update(
                    "purchaseAmount",
                    e.target.value
                  )
                }
                placeholder="0.00"
              />
            </label>

            {/* Purchase Date */}
            <label>
              Purchase date

              <input
                type="date"
                value={form.purchaseDate}
                onChange={(e) =>
                  update(
                    "purchaseDate",
                    e.target.value
                  )
                }
              />
            </label>
          </div>

          {/* Actions */}
          <div className="form-actions">
            <p>
              Transaction ID is generated by the backend after
              submission.
            </p>

            <button
              className="btn primary"
              disabled={saving || detailLoading}
            >
              {saving
                ? "Adding purchase…"
                : "Add Purchase"}
            </button>
          </div>
        </form>
      )}
    </>
  );
}