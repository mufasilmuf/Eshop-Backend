module.exports = (app) => {
  const users = require("../controllers/user.control");

  const Authantication = require("../middlewares/auth.js");

  const router = require("express").Router();

  router.post("/users", users.singUp);

  router.post("/auth", Authantication.Auth);

  app.use("/api", router);
};
