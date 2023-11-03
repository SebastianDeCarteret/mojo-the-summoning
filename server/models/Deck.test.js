const { db } = require("../config");
const { Deck } = require("../../index");

describe("Deck model tests:", () => {
  beforeEach(async () => {
    await db.sync({ force: true });
  });

  it("can create a Deck entry", async () => {
    const response = await Deck.create({ name: "deck", xp: 100 });
    const deck = await Deck.findByPk(1);
    expect(deck.name).toBe(response.name);
    expect(deck.xp).toBe(response.xp);
  });

  it("can update a Deck entry", async () => {
    const response = await Deck.create({ name: "deck", xp: 100 });
    const deck = await Deck.findByPk(1);
    expect(deck.name).toBe(response.name);
    expect(deck.xp).toBe(response.xp);
    await response.update({ name: "kced", xp: 1 });
    const deckUpdated = await Deck.findByPk(1);
    expect(deckUpdated.name).toBe(response.name);
    expect(deckUpdated.xp).toBe(response.xp);
  });

  it("can delete a Deck entry", async () => {
    const response = await Deck.create({ name: "deck", xp: 100 });
    await response.destroy();
    expect(await Deck.findAll()).toEqual([]);
  });

  it("Deck is associated correctly with Card", async () => {
    const deck = await Deck.create({ name: "deck", xp: 100 });
    const card1 = await deck.createCard({
      name: "card1",
      mojo: 1,
      stamina: 1,
      imgUrl: "card1",
    });
    const card2 = await deck.createCard({
      name: "card2",
      mojo: 2,
      stamina: 2,
      imgUrl: "card2",
    });
    const card3 = await deck.createCard({
      name: "card3",
      mojo: 3,
      stamina: 3,
      imgUrl: "card3",
    });
    const deckFound = await Deck.findByPk(1);
    const deckCards = await deckFound.getCards();
    expect(card1.name).toBe(deckCards[0].name);
    expect(card2.name).toBe(deckCards[1].name);
    expect(card3.name).toBe(deckCards[2].name);
  });
});
