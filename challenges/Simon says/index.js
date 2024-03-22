let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

let gameSetUp = {
  order: [],
  playerOrder: [],
  flash: null,
  turn: null,
  good: null,
  compTurn: null,
  intervalId: null,
  strict: false,
  noise: true,
  on: false,
  win: null,
};

console.log(gameSetUp);

const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

strictButton.addEventListener("change", (event) => {
  strictButton.checked === true ? (strict = true) : (strict = false);
});

onButton.addEventListener("click", (event) => {
  onButton.checked === true
    ? ((on = true), (turnCounter.innerHTML = "-"))
    : ((on = false),
      (turnCounter.innerHTML = ""),
      clearColor(),
      clearInterval(intervalId));
});

startButton.addEventListener("click", (event) => {
  if (on || win) play();
  // on || (win && play()); doesn not work cause of editor
});

let setupReset = (SetUp) => {
  SetUp.win = false;
  SetUp.order = [];
  SetUp.playerOrder = [];
  SetUp.flash = 0;
  SetUp.intervalId = 0;
  SetUp.turn = 1;
  SetUp.turnCounter.innerHTML = 1;
  SetUp.good = true;
};

function play() {
  setupReset(
    gameSetUp[
      (win, order, playerOrder, flash, intervalId, turn, turnCounter, good)
    ]
  );

  for (let i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true;
  //need to clear this somewhat inside this function's scope or it'll cause a memory loop
  intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
  on = false;
  flash == turn
    ? (clearInterval(intervalId), (compTurn = false), clearColor(), (on = true))
    : undefined;

  if (compTurn) {
    toggleColor(true); // Added parentheses here
    setTimeout(() => {
      segmentNumber(order[flash]);
      flash++;
    }, 200);
  }
}

const segmentProperties = [
  { clip: "clip1", bckgColor: "lightgreen" },
  { clip: "clip2", bckgColor: "tomato" },
  { clip: "clip3", bckgColor: "yellow" },
  { clip: "clip4", bckgColor: "lightskyblue" },
];

function segmentNumber(number) {
  switch (true) {
    case number === 0:
      topLeft.style.backgroundColor = segmentProperties[number].bckgColor;
      break;
    case number === 1:
      topRight.style.backgroundColor = segmentProperties[number].bckgColor;
      break;
    case number === 2:
      bottomLeft.style.backgroundColor = segmentProperties[number].bckgColor;
      break;
    case number === 3:
      bottomRight.style.backgroundColor = segmentProperties[number].bckgColor;
      break;
    default:
      break;
  }

  let audio = document.getElementById(segmentProperties[number].clip);
  noise ? audio.play() : undefined;
  noise = true;
}

function toggleColor(mode) {
  topLeft.style.backgroundColor =
    mode == true ? "darkgreen" : segmentProperties[0].bckgColor;
  topRight.style.backgroundColor =
    mode == true ? "darkred" : segmentProperties[1].bckgColor;
  bottomLeft.style.backgroundColor =
    mode == true ? "goldenrod" : segmentProperties[2].bckgColor;
  bottomRight.style.backgroundColor =
    mode == true ? "darkblue" : segmentProperties[3].bckgColor;
}

function controlColor(index) {
  if (on) {
    playerOrder.push(index);
    check();
    segmentNumber(index - 1);
    !win && setTimeout(() => clearColor(), 300);
  }
}

[topLeft, topRight, bottomLeft, bottomRight].forEach((location, index) =>
  location.addEventListener("click", () => controlColor(index + 1))
);

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;

  if (playerOrder.length == order.length && good) winGame();

  if (good == false) {
    toggleColor(false);
    turnCounter.innerHTML = "NO!";
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      toggleColor(true);

      if (strict) play();
      else {
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);
    noise = false;
  }

  if (turn == playerOrder.length && good && !win) {
    turn++;
    compTurn = true;
    flash = 0;
    playerOrder = [];
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }
}
function winGame() {
  toggleColor(false);
  turnCounter.innerHTML = "WIN!";
  on = false;
  win = true;
}
