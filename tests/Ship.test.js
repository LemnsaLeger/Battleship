const Ship = require('../src/Ship');

it("returns true if the ship is sunk", () => {
  const ship = new Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

it("returns false if the ship is not sunk", () => {
  const ship = new Ship(2);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});
