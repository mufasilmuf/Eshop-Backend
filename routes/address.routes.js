module.exports = (app) => {
  const address = require("../controllers/address.control");

  const router = require("express").Router();

  router.post("/addresses", address.AddAdress);

  router.get("/addresses", address.findAddress);

  app.use("/api", router);
};
