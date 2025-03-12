import { Gameboard } from "./Gameboard.js";
export class Player {
  constructor(isHuman = true) {
    this.gameboard = new Gameboard();
    this.isHuman = isHuman;
    this.previousAttacks = [];
    this.lastHit = null; // Track the last hit
  }

  attack(opponentGameboard, coordinates) {
    if (this.isHuman) {
      opponentGameboard.receiveAttack(coordinates);
    } else {
      // Computer player: target adjacent cells after a hit
      let x, y;
      if (this.lastHit) {
        // Try adjacent cells
        const [lastX, lastY] = this.lastHit;
        const directions = [
          [lastX + 1, lastY],
          [lastX - 1, lastY],
          [lastX, lastY + 1],
          [lastX, lastY - 1],
        ];
        const validDirections = directions.filter(
          ([x, y]) => x >= 0 && x < 10 && y >= 0 && y < 10
        );
        const [targetX, targetY] =
          validDirections[Math.floor(Math.random() * validDirections.length)];
        x = targetX;
        y = targetY;
      } else {
        // Random attack
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      }

      // Record the attack
      this.previousAttacks.push([x, y]);
      opponentGameboard.receiveAttack([x, y]);

      // Update lastHit if the attack was successful
      if (opponentGameboard.board[x + y * 10] === "hit") {
        this.lastHit = [x, y];
      } else {
        this.lastHit = null;
      }
    }
  }
}
