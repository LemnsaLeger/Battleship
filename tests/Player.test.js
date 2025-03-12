const Player = require("../src/Player");

describe("Player", () => {
  it("creates a player with a gameboard", () => {
    const player = new Player();
    expect(player.gameboard).toBeDefined();
  });
});

it("player can attack the opponent's gameboard", () => {
  const player1 = new Player();
  const player2 = new Player();
  player1.attack(player2.gameboard, [2, 3]);
  expect(player2.gameboard.missedShots).toContainEqual([2, 3]);
});

it("computer player makes random attacks", () => {
  const player1 = new Player(false); // Computer player
  const player2 = new Player();
  player1.attack(player2.gameboard); // No coordinates provided for computer
  expect(player2.gameboard.missedShots.length).toBe(1);
});