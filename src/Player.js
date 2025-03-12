const Gameboard = require("./Gameboard");

class Player {
  constructor(isHuman = true) {
    this.gameboard = new Gameboard(); // each player has a gameboard
    this.isHuman = isHuman; 
    this.previousAttacks = [];
  }

  attack(opponentGameboard, coordinates) {
    if(!this.isHuman) {
      const pos = this._randomCoordinates();
      opponentGameboard.receiveAttack(pos);
    } else {
      opponentGameboard.receiveAttack(coordinates);
    }
  }

  _randomCoordinates() {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10); // random number 0 - 9
      y = Math.floor(Math.random() * 10);
    } while (this.previousAttacks.some(attack => attack[0] === x && attack[1] === y));

    this.previousAttacks.push([x, y]);
    return [x, y];
  }
}

module.exports = Player;
