import { Gameboard } from "./Gameboard.js";
import { Ship } from "./Ship.js";
import { Player } from "./Player.js";

// Initialize players
const player = new Player(true); // Human player
const computer = new Player(false); // Computer player

// Pre-populate gameboards with ships (for now)
function setupGameboard(gameboard) {
  const ship1 = new Ship(3);
  const ship2 = new Ship(4);
  gameboard.placeShip(ship1, [2, 3], "horizontal");
  gameboard.placeShip(ship2, [5, 5], "vertical");
}

setupGameboard(player.gameboard);
setupGameboard(computer.gameboard);

// Render gameboards
function renderGameboard(gameboard, container) {
  container.innerHTML = ""; // Clear the container
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.x = x;
      cell.dataset.y = y;

      const cellState = gameboard.board[x + y * 10];
      if (cellState instanceof Ship) {
        cell.classList.add("ship");
                if (cellState.isSunk()) {
                  cell.classList.add("sunk"); 
                }
      } else if (
        gameboard.missedShots.some((shot) => shot[0] === x && shot[1] === y)
      ) {
        cell.classList.add("miss");
      } else if (cellState === "hit") {
        cell.classList.add("hit");
      }

      container.appendChild(cell);
    }
  }
}

// Render both gameboards
const playerBoardContainer = document.getElementById("player-board");
const computerBoardContainer = document.getElementById("computer-board");
renderGameboard(player.gameboard, playerBoardContainer);
renderGameboard(computer.gameboard, computerBoardContainer);

// Handle player attacks
computerBoardContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("cell")) {
    const x = parseInt(event.target.dataset.x);
    const y = parseInt(event.target.dataset.y);
    player.attack(computer.gameboard, [x, y]);

    // Check if the game is over
    if (computer.gameboard.allShipsSunk()) {
      alert("You win!");
      return;
    }

    // Computer's turn
    computer.attack(player.gameboard);
    if (player.gameboard.allShipsSunk()) {
      alert("You lose!");
      return;
    }

    // Re-render boards
    renderGameboard(player.gameboard, playerBoardContainer);
    renderGameboard(computer.gameboard, computerBoardContainer);
  }
});


// Get UI elements
const shipLengthInput = document.getElementById("ship-length");
const xCoordInput = document.getElementById("x-coord");
const yCoordInput = document.getElementById("y-coord");
const orientationInput = document.getElementById("orientation");
const placeShipButton = document.getElementById("place-ship");
const randomPlaceButton = document.getElementById("random-place");

// reset gameboards 
function resetGameBoards() {
  player.gameboard = new Gameboard();
  computer.gameboard = new Gameboard();
  renderGameboard(player.gameboard, playerBoardContainer);
  renderGameboard(computer.gameboard, computerBoardContainer);
}


// place ship manually
placeShipButton.addEventListener("click", () => {
  const length = parseInt(shipLengthInput.value);
  const x = parseInt(xCoordInput.value);
  const y = parseInt(yCoordInput.value);
  const orientation = orientationInput.value;

  if(isNaN(x) || isNaN(y)) {
    alert("Please enter valid coordinates");
    return;
  }

  // reset gameboard for first placement
  if(player.gameboard.ships.length === 0) {
    resetGameBoards();
  }

  const ship = new Ship(length);
  try {
    // place player's ship
    player.gameboard.placeShip(ship, [x, y], orientation);

    // place the comp's ship of the same length randomly
    let placed = false;
    while(!placed) {
      const comX = Math.floor(Math.random() * 10);
      const comY = Math.floor(Math.random() * 10);
      // const compOrientation = Math.random() < 0.5 ? "horizontal" : "vertical";
      const compOrientation = orientation; // but should have a random coord

      try {
        const compShip = new Ship(length);
        computer.gameboard.placeShip(compShip, [comX, comY], compOrientation);
        placed = true;
      } catch (err){
        console.log(err);
      }
    }

    // re-render both gameboards
    renderGameboard(player.gameboard, playerBoardContainer);
    renderGameboard(computer.gameboard, computerBoardContainer);
  } catch(err) {
    alert(err.message);
  }
});