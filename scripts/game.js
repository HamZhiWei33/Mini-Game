function resetGameStatus() {
  currentRound = 1;
  activePlayer = 0;
  gameIsOver = false;
  gameOverElement.style.display = "none";

  let gameBoardIndex = 0;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
      gameBoardItemElement.textContent = "";
      gameBoardItemElement.classList.remove("disabled");
      gameBoardIndex++;
    }
  }

  let gameFieldElements = document.querySelectorAll("#game-board li");
  for (let i = 0; i < gameFieldElements.length; i++) {
    gameFieldElements[i].textContent = "";
    gameFieldElements[i].classList.remove("disabled");
  }
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert(
      "Please enter custom names for both players before starting the game:)"
    );
    return;
  }
  if (players[0].name === players[1].name) {
    alert("Please enter different names for both players!");
    return;
  }
  resetGameStatus();
  activePlayerNameElement.textContent = players[activePlayer].name;
  gameAreaElement.style.display = "block";
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

// function selectGameField(event) {
//   event.target.textContent = players[activePlayer].symbol;
//   event.target.classList.add("disabled");
//   switchPlayer();
// }

function selectGameField(event) {
  const selectedField = event.target;
  if (selectedField.tagName !== "LI" || gameIsOver) {
    return;
  }

  const selectedColumn = selectedField.dataset.col - 1; //automatically convert to number after deduct 1
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("Please select a valid field!");
    return;
  }

  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1; // 0 for no player, 1 for player 1, 2 for player 2;
  currentRound++;
  const winnerId = checkGameOver();
  if (winnerId !== 0) {
    endGame(winnerId);
  }
  console.log(winnerId);

  switchPlayer();
}

function checkGameOver() {
  // check for horizontal win
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  // check for vertical win
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[1][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }
  // check for diagonal win
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }
  if (
    gameData[0][2] > 0 &&
    gameData[0][2] === gameData[1][1] &&
    gameData[1][1] === gameData[2][0]
  ) {
    return gameData[0][2];
  }

  if (currentRound === 9) {
    return -1; // draw
  }
  return 0; // no winner yet
}
function endGame(winnerId) {
  gameIsOver = true;
  gameOverElement.style.display = "block";
  if (winnerId > 0) {
    gameOverElement.firstElementChild.firstElementChild.textContent =
      players[winnerId - 1].name;
  } else {
    gameOverElement.firstElementChild.textContent = "It's a draw!";
  }
}
