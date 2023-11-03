const { db } = require("../config");
const { Card } = require("../../index");

describe("Card model tests:", () => {
  beforeEach(async () => {
    await db.sync({ force: true });
  });

  it("can create a Card entry", async () => {
    const response = await Card.create({
      name: "card1",
      mojo: 1,
      stamina: 1,
      imgUrl: "card1",
    });
    const card = await Card.findByPk(1);
    expect(card.name).toBe(response.name);
    expect(card.mojo).toBe(response.mojo);
    expect(card.stamina).toBe(response.stamina);
    expect(card.imgUrl).toBe(response.imgUrl);
  });
  it("can update a Card entry", async () => {
    const response = await Card.create({
      name: "card1",
      mojo: 1,
      stamina: 1,
      imgUrl: "card1",
    });
    const card = await Card.findByPk(1);
    expect(card.name).toBe(response.name);
    expect(card.mojo).toBe(response.mojo);
    expect(card.stamina).toBe(response.stamina);
    expect(card.imgUrl).toBe(response.imgUrl);
    await response.update({
      name: "card2",
      mojo: 2,
      stamina: 2,
      imgUrl: "card2",
    });
    const cardUpdated = await Card.findByPk(1);
    expect(cardUpdated.name).toBe(response.name);
    expect(cardUpdated.mojo).toBe(response.mojo);
    expect(cardUpdated.stamina).toBe(response.stamina);
    expect(cardUpdated.imgUrl).toBe(response.imgUrl);
  });

  it("can delete a Card entry", async () => {
    const response = await Card.create({
      name: "card1",
      mojo: 1,
      stamina: 1,
      imgUrl: "card1",
    });
    await response.destroy();
    expect(await Card.findAll()).toEqual([]);
  });

  it("Card is associated correctly with Attack", async () => {
    const card1 = await Card.create({
      name: "card1",
      mojo: 1,
      stamina: 1,
      imgUrl: "card1",
    });
    const card2 = await Card.create({
      name: "card2",
      mojo: 2,
      stamina: 2,
      imgUrl: "card2",
    });

    // card 1 attacks:
    const c1Attack1 = await card1.createAttack({
      title: "attack1",
      mojoCost: 1,
      staminaCost: 1,
    });
    const c1Attack2 = await card1.createAttack({
      title: "attack2",
      mojoCost: 2,
      staminaCost: 2,
    });

    const card1Found = await Card.findByPk(1);
    const card1Attacks = await card1Found.getAttacks();
    expect(card1Attacks[0].title).toBe(c1Attack1.title);
    expect(card1Attacks[1].title).toBe(c1Attack2.title);

    // card 2 attacks:
    const c2Attack1 = await card2.createAttack({
      title: "attack3",
      mojoCost: 3,
      staminaCost: 3,
    });

    const card2Found = await Card.findByPk(2);
    const card2Attacks = await card2Found.getAttacks();
    expect(card2Attacks[0].title).toBe(c2Attack1.title);
  });
});
