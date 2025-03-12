const Ship = require("../src/Ship");

class Gameboard {
  constructor() {
    this.board = Array(100).fill(null); // 10x10 grid represented as a flat array
    this.missedShots = [];
    this.ships = [];
  }

  placeShip(ship, startingCoordinates, orientation) {
    const [x, y] = startingCoordinates;
    const positions = [];

    for (let i = 0; i < ship.length; i++) {
      if (orientation === "horizontal") {
        positions.push(x + i + y * 10); // Calculate flat array index for horizontal placement
      } else if (orientation === "vertical") {
        positions.push(x + (y + i) * 10); // Calculate flat array index for vertical placement
      }
    }

    // Check if all positions are valid and empty
    if (positions.every((pos) => this.board[pos] === null)) {
      positions.forEach((pos) => {
        this.board[pos] = ship; // Place the ship on the board
      });
      this.ships.push(ship); // Add the ship to the ships array
    } else {
      throw new Error("Invalid ship placement");
    }
  }

  receiveAttack(coordinates) {
    const [x, y] = coordinates;
    const index = x + y * 10; // Convert coordinates to flat array index

    if (this.board[index] !== null) {
      // Attack hits a ship
      this.board[index].hit(); // Call the ship's hit method
    } else {
      // Attack misses
      this.missedShots.push(coordinates); // Record missed shot
    }
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk()); // Check if all ships are sunk
  }
}

module.exports = Gameboard;
