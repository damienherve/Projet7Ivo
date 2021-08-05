var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

require("./routes/auth.routes")(app);
require("./routes/users.routes")(app);
require("./routes/posts.routes")(app);

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:4200",
};

app.use(cors(corsOptions));

// Create a Server
var server = app.listen(8080, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});

const db = require("./config/db.config.js");

db.sequelize.sync().then(() => {
  console.log("DB synchronized");
});
