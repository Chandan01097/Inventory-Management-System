import { useEffect, useState } from "react";
import { Layers3 } from "lucide-react";

import {
  getCategories,
  getUnitsAndTypes,
} from "../api/services/inventoryService";

import { errorMessage } from "../api/client";
import {
  Empty,
  Loading,
  Notice,
  PageIntro,
} from "../components/Ui";

export default function Materials() {
  const [categories, setCategories] = useState([]);
  const [categoryMaterials, setCategoryMaterials] = useState([]);

  const [tab, setTab] = useState("categories");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = async () => {
    setLoading(true);
    setError("");

    try {
      // Get all categories
      const categoriesData = await getCategories();

      /*
       * Remove duplicate categories using categoryName
       */
      const uniqueCategoryNames = [
        ...new Set(
          (categoriesData || [])
            .map((category) => category.categoryName)
            .filter(Boolean)
        ),
      ];

      const uniqueCategories = uniqueCategoryNames.map(
        (categoryName) =>
          (categoriesData || []).find(
            (category) =>
              category.categoryName === categoryName
          )
      );

      setCategories(uniqueCategories);

      /*
       * Get types and units for every category
       */
      const results = await Promise.all(
        uniqueCategories.map(async (category) => {
          const result = await getUnitsAndTypes(
            category.categoryId
          );

          return {
            categoryId: category.categoryId,
            categoryName: category.categoryName,
            materialTypeList:
              result?.materialTypeList || [],
            unitList:
              result?.unitList || [],
          };
        })
      );

      /*
       * Remove duplicate type names and unit names
       * separately for each category.
       */
      const formattedCategoryMaterials = results.map(
        (category) => {
          // Unique material type names for this category
          const uniqueTypeNames = [
            ...new Set(
              category.materialTypeList
                .map((type) => type.typeName)
                .filter(Boolean)
            ),
          ];

          // Unique unit names for this category
          const uniqueUnitNames = [
            ...new Set(
              category.unitList
                .map((unit) => unit.unitName)
                .filter(Boolean)
            ),
          ];

          return {
            categoryId: category.categoryId,
            categoryName: category.categoryName,
            materialTypes: uniqueTypeNames,
            units: uniqueUnitNames,
          };
        }
      );

      setCategoryMaterials(
        formattedCategoryMaterials
      );
    } catch (e) {
      console.error(
        "Materials loading error:",
        e
      );

      setError(errorMessage(e));
      setCategories([]);
      setCategoryMaterials([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageIntro title="Materials">
        Material information used by purchase entry.
      </PageIntro>

      {/* ================= TABS ================= */}

      <div className="material-tabs">
        <button
          type="button"
          className={
            tab === "categories"
              ? "active"
              : ""
          }
          onClick={() =>
            setTab("categories")
          }
        >
          Categories
        </button>

        <button
          type="button"
          className={
            tab === "types"
              ? "active"
              : ""
          }
          onClick={() =>
            setTab("types")
          }
        >
          Material Types
        </button>

        <button
          type="button"
          className={
            tab === "units"
              ? "active"
              : ""
          }
          onClick={() =>
            setTab("units")
          }
        >
          Units
        </button>
      </div>

      {/* ================= ERROR ================= */}

      {error && <Notice>{error}</Notice>}

      {/* ================= LOADING ================= */}

      {loading ? (
        <Loading text="Loading materials..." />
      ) : (
        <div className="panel">

          {/* ================= CATEGORIES ================= */}

          {tab === "categories" && (
            <>
              <h3>
                <Layers3 size={18} />
                Categories
              </h3>

              {categories.length > 0 ? (
                <div className="material-list">
                  {categories.map(
                    (category) => (
                      <span
                        key={category.categoryId}
                      >
                        {category.categoryName}
                      </span>
                    )
                  )}
                </div>
              ) : (
                <Empty>
                  No categories found.
                </Empty>
              )}
            </>
          )}

          {/* ================= MATERIAL TYPES ================= */}

          {tab === "types" && (
            <>
              <h3>
                <Layers3 size={18} />
                Material Types by Category
              </h3>

              {categoryMaterials.length > 0 ? (
                <div className="material-category-list">
                  {categoryMaterials.map(
                    (category) => (
                      <div
                        className="material-category"
                        key={category.categoryId}
                      >
                        <h4>
                          {category.categoryName}
                        </h4>

                        {category.materialTypes
                          .length > 0 ? (
                          <div className="material-list">
                            {category.materialTypes.map(
                              (typeName) => (
                                <span
                                  key={`${category.categoryId}-${typeName}`}
                                >
                                  {typeName}
                                </span>
                              )
                            )}
                          </div>
                        ) : (
                          <Empty>
                            No material types found
                            for this category.
                          </Empty>
                        )}
                      </div>
                    )
                  )}
                </div>
              ) : (
                <Empty>
                  No material types found.
                </Empty>
              )}
            </>
          )}

          {/* ================= UNITS ================= */}

          {tab === "units" && (
            <>
              <h3>
                <Layers3 size={18} />
                Units by Category
              </h3>

              {categoryMaterials.length > 0 ? (
                <div className="material-category-list">
                  {categoryMaterials.map(
                    (category) => (
                      <div
                        className="material-category"
                        key={category.categoryId}
                      >
                        <h4>
                          {category.categoryName}
                        </h4>

                        {category.units.length > 0 ? (
                          <div className="material-list">
                            {category.units.map(
                              (unitName) => (
                                <span
                                  key={`${category.categoryId}-${unitName}`}
                                >
                                  {unitName}
                                </span>
                              )
                            )}
                          </div>
                        ) : (
                          <Empty>
                            No units found for
                            this category.
                          </Empty>
                        )}
                      </div>
                    )
                  )}
                </div>
              ) : (
                <Empty>
                  No units found.
                </Empty>
              )}
            </>
          )}

        </div>
      )}
    </>
  );
}
