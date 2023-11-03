const { db } = require("../config");
const { DataTypes, Model } = require("sequelize");

class Attack extends Model {}

Attack.init(
  {
    title: DataTypes.STRING,
    mojoCost: DataTypes.INTEGER,
    staminaCost: DataTypes.INTEGER,
  },
  {
    sequelize: db,
    modelName: "Attack",
  }
);

module.exports = { Attack };
