const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let editedPlayer = 0; //
let activePlayer = 0;
let currentRound = 1;
let gameIsOver = false; // flag to check if game is over

const players = [
  {
    name: "",
    symbol: "X",
  },
  { name: "", symbol: "O" },
]; // Array to store player data

const playerConfigOverlayElement = document.getElementById("config-overlay");
const backdropElement = document.getElementById("backdrop");
const formElement = document.querySelector("form");
const errorsOutputElement = document.getElementById("config-error");

const editPlayer1BtnElement = document.getElementById("edit-player1-btn");
const editPlayer2BtnElement = document.getElementById("edit-player2-btn");

const cancelConfigBtn = document.getElementById("cancel-config-btn");

// game
const gameStartBtnElement = document.getElementById("start-game-btn");
const gameAreaElement = document.getElementById("active-game");
// const gameFieldElements = document.querySelectorAll("#game-board li");
const gameBoardElement = document.getElementById("game-board"); //alternative way
const activePlayerNameElement = document.getElementById("active-player-name");
const gameOverElement = document.getElementById("game-over");

// Function to open the player configuration modal
editPlayer1BtnElement.addEventListener("click", openPlayerConfig);
editPlayer2BtnElement.addEventListener("click", openPlayerConfig);

cancelConfigBtn.addEventListener("click", closePlayerConfig);
backdropElement.addEventListener("click", closePlayerConfig);
formElement.addEventListener("submit", savePlayerConfig);

// game
gameStartBtnElement.addEventListener("click", startNewGame);
// for (const gameFieldElement of gameFieldElements) {
//   gameFieldElement.addEventListener("click", selectGameField);
// }
gameBoardElement.addEventListener("click", selectGameField); // alternative way
