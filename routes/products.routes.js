module.exports = (app) => {
  const products = require("../controllers/products.control");

  const router = require("express").Router();

  router.get("/", products.findAllproducts);

  router.get("/categories", products.findAllCategories);

  router.get("/:id", products.findById);

  router.post("/", products.addProducts);

  router.put("/:id", products.updateProductsById);

  router.delete("/:id", products.deleteProductById);

  app.use("/api/products", router);
};
