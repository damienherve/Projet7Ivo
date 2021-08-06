isAuthenticated = require("../middleware/authValidator");
isAdmin = require("../middleware/adminValidator");

module.exports = function (app) {
  const Users = require("../controllers/user.controller.js");

  app.get("/api/users", isAuthenticated, isAdmin, Users.findAll);
  app.delete("/api/user/:id", isAuthenticated, isAdmin, Users.delete);
};
