module.exports = (app) => {
  const address = require("../controllers/address.control");

  //middleware for the token Verification...
  const verifyToken = require("../middlewares/auth");

  const router = require("express").Router();

  router.post("/addresses", address.AddAdress);

  app.use("/api", router);
};
