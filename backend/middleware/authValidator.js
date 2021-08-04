const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config.js");
const db = require("../config/db.config.js");

isAuthenticated = (req, res, next) => {
  let bearerHeader = req.headers["authorization"];

  console.log("Headers", req.headers);
  console.log("BearerHeader", bearerHeader);

  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    console.log("Token", bearerToken);
    jwt.verify(bearerToken, authConfig.secret, (err, decoded) => {
      if (err) {
        console.log("Error", err);
        return res.sendStatus(401);
      }
      req.userId = decoded.userId;

      db.user
        .findOne({
          where: {
            id: decoded.userId,
          },
        })
        .then((user) => {
          // Account is valid
          if (user.email !== null) {
            req.user = user;
            next();
          } else {
            res.status(401).send("Account has been deleted");
          }
        })
        .catch((err) => {
          res.sendStatus(403);
        });
    });
  } else {
    // Forbidden
  }
};

module.exports = isAuthenticated;
