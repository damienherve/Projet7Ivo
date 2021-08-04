isAuthenticated = require("../middleware/authValidator");

module.exports = function (app) {
  const Users = require("../controllers/user.controller.js");

  app.get("/api/users", isAuthenticated, Users.findAll);
  //app.get("/api/user/:id", Users.findAll);
  app.delete("/api/user/:id", isAuthenticated, Users.delete);
};
