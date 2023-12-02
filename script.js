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
//State variables
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

// Function to reset the board state, current player turn, and board
const boardReset = function (strikethrough) {
  // Reset state variables
  state = ["", "", "", "", "", "", "", "", ""];
  playerOneTurn = true;
  turns = 0;

  // Reset Board
  board.querySelectorAll(".grid-box").forEach((box) => {
    box.querySelector(".X").classList.add("hidden");
    box.querySelector(".O").classList.add("hidden");
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
  const active = playerOneTurn ? "X" : "O";
  const inactive = !playerOneTurn ? "X" : "O";
  const activeTarget = e.target
    .closest(".grid-box")
    .querySelector(`.${active}`);
  const inactiveTarget = e.target
    .closest(".grid-box")
    .querySelector(`.${inactive}`);

  // Check if the clicked square has already been selected
  if (
    activeTarget.classList[1] === "hidden" &&
    inactiveTarget.classList[1] === "hidden"
  ) {
    playerOneTurn = !playerOneTurn;
    activeTarget.classList.remove("hidden");
    state[squareNum - 1] = active;
    turns++;

    const [isWin, strikethrough] = isWinner();
    //Check if the current board state has a winner
    if (isWin) {
      strikethrough.classList.remove("hidden");
      setTimeout(() => {
        alert(`Player ${active} Wins!`);
        boardReset(strikethrough);
      }, 100);
    } else if (turns === 9)
      setTimeout(() => {
        alert(`Tie Game!`);
        boardReset(strikethrough);
      }, 100);
  }
};

// Listen for the click event on the board and feed the event into the callback clickEvent function
board.addEventListener("click", (e) => clickEvent(e));
