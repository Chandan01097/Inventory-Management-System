import client from "../client";

export const getWelcome = () =>
  client.get("/welcome").then((r) => r.data);

export const getVendors = () =>
  client.get("/vendors").then((r) => r.data);

export const getCategories = () =>
  client.get("/categories").then((r) => r.data);

export const getMaterialTypes = () =>
  client.get("/materialtype").then((r) => r.data);

export const getUnits = () =>
  client.get("/unit").then((r) => r.data);

// Types + Units by Category
export const getUnitsAndTypes = (materialCategoryId) =>
  client
    .post("/getUnitAndTypeList", { materialCategoryId })
    .then((r) => r.data);

// Purchase
export const addPurchase = (purchase) =>
  client.post("/addPurchaseDetail", purchase).then((r) => r.data);

// Report
export const getPurchaseReport = (filters) =>
  client
    .post("/report/controller/getPurchaseDetails", filters)
    .then((r) => r.data);