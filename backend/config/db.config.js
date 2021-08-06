const env = require("./env.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.user = require("../models/user.model")(sequelize);
db.post = require("../models/post.model")(sequelize);

// User has many Posts
db.user.hasMany(db.post);
db.post.belongsTo(db.user);

// Posts can have many comments
db.post.hasMany(db.post, { as: "comments" });

db.init = async () => await db.sequelize.sync({ force: true });

module.exports = db;
