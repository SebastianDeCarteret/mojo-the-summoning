const { User } = require("./server/models/User");
const { Deck } = require("./server/models/Deck");
const { Card } = require("./server/models/Card");
const { Attack } = require("./server/models/Attack");

// assosiations here
Deck.hasOne(User);
User.belongsTo(Deck);

Deck.hasMany(Card);
Card.belongsTo(Deck);

Card.belongsToMany(Attack, { through: "card-attack" });
Attack.belongsToMany(Card, { through: "card-attack" });

module.exports = { User, Deck, Card, Attack };
