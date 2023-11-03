const { db } = require("../db/config");
const { DataTypes, Model } = require("sequelize");

class User extends Model {}

User.init(
  {
    username: DataTypes.STRING,
  },
  {
    sequelize: db,
    modelName: "User",
  }
);

module.exports = { User };
