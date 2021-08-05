const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define("post", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    text: {
      type: DataTypes.STRING,
    },
    claps: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
