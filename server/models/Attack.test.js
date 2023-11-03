const { db } = require("../config");
const { Attack } = require("../../index");

describe("Attack model tests:", () => {
  beforeEach(async () => {
    await db.sync({ force: true });
  });

  it("can create an Attack entry", async () => {
    const response = await Attack.create({
      title: "attack1",
      mojoCost: 1,
      staminaCost: 1,
    });
    const attack = await Attack.findByPk(1);
    expect(attack.title).toBe(response.title);
    expect(attack.mojoCost).toBe(response.mojoCost);
    expect(attack.staminaCost).toBe(response.staminaCost);
  });
  it("can update an Attack entry", async () => {
    const response = await Attack.create({
      title: "attack1",
      mojoCost: 1,
      staminaCost: 1,
    });
    const attack = await Attack.findByPk(1);
    expect(attack.title).toBe(response.title);
    expect(attack.mojoCost).toBe(response.mojoCost);
    expect(attack.staminaCost).toBe(response.staminaCost);
    await response.update({ mojoCost: 5 });
    const attackUpdated = await Attack.findByPk(1);
    expect(attackUpdated.title).toBe(response.title);
    expect(attackUpdated.mojoCost).toBe(response.mojoCost);
    expect(attackUpdated.staminaCost).toBe(response.staminaCost);
  });

  it("can delete an Attack entry", async () => {
    const response = await Attack.create({
      title: "attack1",
      mojoCost: 1,
      staminaCost: 1,
    });
    await response.destroy();
    expect(await Attack.findAll()).toEqual([]);
  });

  it("Attack is associated correctly with Card", async () => {
    const attack1 = await Attack.create({
      title: "attack1",
      mojoCost: 1,
      staminaCost: 1,
    });
    const attack2 = await Attack.create({
      title: "attack2",
      mojoCost: 2,
      staminaCost: 2,
    });

    // attack 1 cards:
    const a1Card1 = await attack1.createCard({
      name: "card1",
      mojo: 1,
      stamina: 1,
      imgUrl: "card1",
    });
    const a1Card2 = await attack1.createCard({
      name: "card2",
      mojo: 2,
      stamina: 2,
      imgUrl: "card2",
    });

    const attack1Found = await Attack.findByPk(1);
    const attack1Cards = await attack1Found.getCards();
    expect(attack1Cards[0].name).toBe(a1Card1.name);
    expect(attack1Cards[1].name).toBe(a1Card2.name);

    // attack 2 cards:
    const a2Card1 = await attack2.createCard({
      name: "card1",
      mojo: 1,
      stamina: 1,
      imgUrl: "card1",
    });

    const attack2Found = await Attack.findByPk(1);
    const attack2Cards = await attack2Found.getCards();
    expect(attack2Cards[0].name).toBe(a2Card1.name);
  });
});
