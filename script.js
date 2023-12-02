////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL SCOPE
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DOM selection
const board = document.querySelector(".board");
const sRowOne = document.querySelector(".strike-row-1");
const sRowTwo = document.querySelector(".strike-row-2");
const sRowThree = document.querySelector(".strike-row-3");
const sColOne = document.querySelector(".strike-col-1");
const sColTwo = document.querySelector(".strike-col-2");
const sColThree = document.querySelector(".strike-col-3");
const sDiagOne = document.querySelector(".strike-diag-1");
const sDiagTwo = document.querySelector(".strike-diag-2");
const charSelect = document.querySelector(".character-select");
const header1 = document.querySelector(".p1-header");
const header2 = document.querySelector(".p2-header");
const selectionScreen = document.querySelector(".selection-screen");
//State variables
let player1 = "";
let player2 = "";
let playerOneTurn = true;
let state = ["", "", "", "", "", "", "", "", ""];
let turns = 0;

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HELPER FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to check if there is a winner in the current board state, if so return the correct strike
const isWinner = function () {
  if (state[0] === state[1] && state[0] === state[2] && state[0] !== "")
    return [true, sRowOne];
  else if (state[3] === state[4] && state[3] === state[5] && state[3] !== "")
    return [true, sRowTwo];
  else if (state[6] === state[7] && state[6] === state[8] && state[6] !== "")
    return [true, sRowThree];
  else if (state[0] === state[3] && state[0] === state[6] && state[0] !== "")
    return [true, sColOne];
  else if (state[1] === state[4] && state[1] === state[7] && state[1] !== "")
    return [true, sColTwo];
  else if (state[2] === state[5] && state[2] === state[8] && state[2] !== "")
    return [true, sColThree];
  else if (state[0] === state[4] && state[0] === state[8] && state[0] !== "")
    return [true, sDiagOne];
  else if (state[2] === state[4] && state[2] === state[6] && state[2] !== "")
    return [true, sDiagTwo];
  else return [false, sColOne];
};

const selectionScreenReset = function () {
  board.classList.add("hidden");
  selectionScreen.classList.remove("hidden");
  header1.classList.remove("hidden");
  header2.classList.add("hidden");
};

// Function to reset the board state, current player turn, and board
const boardReset = function (strikethrough) {
  // Reset state variables
  state = ["", "", "", "", "", "", "", "", ""];
  playerOneTurn = true;
  turns = 0;

  // Reset Selection Screen
  selectionScreenReset();

  // Reset Board
  board.querySelectorAll(".grid-box").forEach((box) => {
    console.log(box.children);
    if (box.children.length > 0) box.removeChild(box.children[0]);
  });
  strikethrough.classList.add("hidden");
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MAIN FUNCTION (CALLBACK AND EVENT HANDLER)
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Callback function that handles the click event
const clickEvent = function (e) {
  // Local Scoped variables
  const squareNum = +e.target.closest(".grid-box").classList[0].slice(-1);
  const active = playerOneTurn ? player1 : player2;

  const imgPlayer1 = document.createElement("img");
  imgPlayer1.src = `./Assets/${player1}.PNG`;

  const imgPlayer2 = document.createElement("img");
  imgPlayer2.src = `./Assets/${player2}.PNG`;

  const activeImg = playerOneTurn ? imgPlayer1 : imgPlayer2;

  const activeTarget = e.target.closest(".grid-box");

  console.log(activeTarget);
  // Check if the clicked square has already been selected
  if (
    !(state[squareNum - 1] === player1) &&
    !(state[squareNum - 1] === player2)
  ) {
    playerOneTurn = !playerOneTurn;
    activeTarget.appendChild(activeImg);
    state[squareNum - 1] = active;
    turns++;

    const [isWin, strikethrough] = isWinner();
    //Check if the current board state has a winner
    if (isWin) {
      strikethrough.classList.remove("hidden");
      setTimeout(() => {
        alert(`${active} Wins!`);
        boardReset(strikethrough);
      }, 100);
    } else if (turns === 9)
      setTimeout(() => {
        alert(`Tie Game!`);
        boardReset(strikethrough);
      }, 100);
  }
  console.log(state);
};

const selectEvent = function (e) {
  if (header1.classList[1] === "hidden") {
    player2 = e.target.alt;
    selectionScreen.classList.add("hidden");
    board.classList.remove("hidden");
    return;
  }
  player1 = e.target.alt;
  header1.classList.add("hidden");
  header2.classList.remove("hidden");
};

// Listen for the click event on the board and feed the event into the callback clickEvent function
board.addEventListener("click", (e) => clickEvent(e));

charSelect.addEventListener("click", (e) => selectEvent(e));
