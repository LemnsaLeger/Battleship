# Battleship

Welcome to the Battleship Game! This is a classic implementation of the Battleship board game from the <b>TheOdinProject</b> learning curriculum, built using JavaScript, HTML, and CSS. The game features a <b>Smart Computer Algorithm</b> that makes the computer player more challenging by targeting adjacent cells after a hit.

## Features
<li>Single-Player Mode: Play against a smart computer opponent.</li>

<li>Smart Computer Algorithm: The computer targets adjacent cells after a hit, making it more challenging.</li>

<li>Interactive Gameplay: Place your ships manually or randomly, and attack the computer’s board to sink their ships.</li>

## How to Play

<ol>
<li>Place Your Ships:</li>

Choose the ship length, coordinates, and orientation (horizontal or vertical) to place your ships manually.

Alternatively, click "Place Ships Randomly" to auto-place your ships.

<li>Start the Game:</li>

Once your ships are placed, click "Start Game" to begin.

<li>Attack the Computer’s Board:</li>

Click on the computer’s gameboard to attack a cell.

The computer will automatically attack your board after your turn.

<li>Win the Game:</li>

Sink all the computer’s ships before they sink yours to win!
</ol>

## Installation
Clone the Repository:

<i>git clone https://github.com/your-username/battleship.git</i>

cd battleship
Install Dependencies:

This project uses Node.js and http-server to serve the files locally.

Install http-server globally:

npm install -g http-server

Run the Project:

Start the local server:

http-server
Open your browser and go to:

Copy
http://127.0.0.1:8080


## Project Structure

battleship/
├── src/
│   ├── Ship.js          # Ship class
│   ├── Gameboard.js     # Gameboard class
│   ├── Player.js        # Player class
│   └── game.js          # Main game logic
├── index.html           # HTML file for the UI
├── styles.css           # CSS file for styling
├── package.json         # Node.js dependencies
└── README.md            # This file

## Future Ehancements

Drag-and-Drop Ship Placement: Allow players to drag and drop ships onto the gameboard for a more interactive experience.

Two-Player Mode: Add a mode where two players can take turns by passing the device.

Improved UI: Add animations, sound effects, and a more polished design.
