const { db } = require("../db/config");
const { DataTypes, Model } = require("sequelize");

class Deck extends Model {}

Deck.init(
  {
    name: DataTypes.STRING,
    xp: DataTypes.INTEGER,
  },
  {
    sequelize: db,
    modelName: "Deck",
  }
);

module.exports = { Deck };
