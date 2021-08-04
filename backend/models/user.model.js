const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.INTEGER, // 0: User, 1: Admin, ...
      defaultValue: 0,
    },
  });
