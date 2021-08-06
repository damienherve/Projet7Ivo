const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config.js");
const db = require("../config/db.config.js");

isAdmin = (req, res, next) => {
  if (req.user.role === 1) {
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = isAdmin;
