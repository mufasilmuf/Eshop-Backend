module.exports = (app) => {
  const orders = require("../controllers/order.control");

  const router = require("express").Router();

  router.post("/orders", orders.createOrder);

  app.use("/api", router);
};
