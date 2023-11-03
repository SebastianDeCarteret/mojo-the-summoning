const { db } = require("../config");
const { User } = require("../../index");

describe("User model tests:", () => {
  beforeAll(async () => {
    await db.sync({ force: true });
  });

  beforeEach(async () => {
    await db.sync({ force: true });
  });

  it("can create a User entry", async () => {
    const response = await User.create({ username: "seb" });
    const user = await User.findByPk(1);
    expect(user.username).toBe(response.username);
  });

  it("can update a User entry", async () => {
    const response = await User.create({ username: "seb" });
    const user = await User.findByPk(1);
    expect(user.username).toBe(response.username);
    await response.update({ username: "bes" });
    const userUpdated = await User.findByPk(1);
    expect(userUpdated.username).toBe(response.username);
  });

  it("can delete a User entry", async () => {
    const response = await User.create({ username: "seb" });
    await response.destroy();
    expect(await User.findAll()).toEqual([]);
  });

  it("User is associated correctly with Deck", async () => {
    const user = await User.create({ username: "seb" });
    const deck = await user.createDeck({
      name: "deck",
      xp: 100,
    });
    const userFound = await User.findByPk(1);
    const userDeck = await userFound.getDeck();
    expect(deck.name).toBe(userDeck.name);
  });
});
