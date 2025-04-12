function openPlayerConfig(event) {
  // const selectedPlayer = event.target.dataset.playerid;
  editedPlayer = +event.target.dataset.playerid; // + converts string to number, +"1" to 1
  playerConfigOverlayElement.style.display = "block";
  backdropElement.style.display = "block";
}

function closePlayerConfig() {
  playerConfigOverlayElement.style.display = "none";
  backdropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error");
  errorsOutputElement.textContent = "";
  formElement.firstElementChild.lastElementChild.value = "";
}

function savePlayerConfig(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const enteredPlayerName = formData.get("playername").trim();

  // empty string is considered falsy in JS
  if (!enteredPlayerName) {
    //if (enteredPlayerName === "") {
    event.target.firstElementChild.classList.add("error");
    errorsOutputElement.textContent = "Please enter a valid name!";
    return;
  }

  const updatePlayerDataElement = document.getElementById(
    "player-" + editedPlayer + "-data"
  );
  // update the second child of the parent element
  updatePlayerDataElement.children[1].textContent = enteredPlayerName;

  // if (editedPlayer === 1) {
  //   players[0].name = enteredPlayerName;
  // } else if (editedPlayer === 2) {
  //   players[1].name = enteredPlayerName;
  // }
  players[editedPlayer - 1].name = enteredPlayerName; // 0 for player 1, 1 for player 2
  closePlayerConfig();
}
