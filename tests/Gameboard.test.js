const Gameboard = require("../src/Gameboard");

describe("Gameboard", () => {
  it("creates a gameboard", () => {
    const gameboard = new Gameboard();
    expect(gameboard).toBeDefined();
  });
});


it("places a ship at specific coordinates", () => {
  const gameboard = new Gameboard();
  const ship = { length: 3 }; // mocking a ship object
  gameboard.placeShip(ship, [2, 3], "horizontal");
  expect(gameboard.ships).toContain(ship);
});

it("records a hit on a ship", () => {
  const gameboard = new Gameboard();
  const ship = { length: 3, hit: jest.fn() }; // Mocking(imitating) ship with a hit method
  gameboard.placeShip(ship, [2, 3], "horizontal");
  gameboard.receiveAttack([2, 3]);
  expect(ship.hit).toHaveBeenCalled();
});

it("records a missed attack", () => {
  const gameboard = new Gameboard();
  gameboard.receiveAttack([5, 5]);
  expect(gameboard.missedShots).toContainEqual([5, 5]);
});

it("tracks missed attacks", () => {
  const gameboard = new Gameboard();
  gameboard.receiveAttack([1, 1]);
  gameboard.receiveAttack([2, 2]);
  expect(gameboard.missedShots).toEqual([
    [1, 1],
    [2, 2],
  ]);
});

it("reports if all ships are sunk", () => {
  const gameboard = new Gameboard();
  const ship1 = { length: 2, isSunk: () => true }; // Mock sunk ship
  const ship2 = { length: 3, isSunk: () => true }; // Mock sunk ship
  gameboard.placeShip(ship1, [0, 0], "horizontal");
  gameboard.placeShip(ship2, [4, 4], "vertical");
  expect(gameboard.allShipsSunk()).toBe(true);
});