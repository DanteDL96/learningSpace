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
  flash,
  turn,
  good,
  compTurn,
  intervalId,
  strict: false,
  noise: true,
  on: false,
  win,
};
console.log(gameSetUp);
const turnCounter = document.querySelector('#turn');
const topLeft = document.querySelector('#topleft');
const topRight = document.querySelector('#topright');
const bottomLeft = document.querySelector('#bottomleft');
const bottomRight = document.querySelector('#bottomright');
const strictButton = document.querySelector('#strict');
const onButton = document.querySelector('#on');
const startButton = document.querySelector('#start');

strictButton.addEventListener('change', (event) => {
  strictButton.checked === true ? (strict = true) : (strict = false);
});

onButton.addEventListener('click', (event) => {
  onButton.checked === true
    ? ((on = true), (turnCounter.innerHTML = '-'))
    : ((on = false),
      (turnCounter.innerHTML = ''),
      clearColor(),
      clearInterval(intervalId));
});

startButton.addEventListener('click', (event) => {
  if (on || win) {
    play();
  } // on || (win && play()); doesn not work cause of editor
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
  intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
  on = false;
  flash == turn
    ? (clearInterval(intervalId), (compTurn = false), clearColor(), (on = true))
    : undefined;

  if (compTurn) {
    clearColor(); // Added parentheses here
    setTimeout(() => {
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++;
    }, 200);
  }
}
function one() {
  let audioOne = document.getElementById('clip1');
  noise ? audioOne.play() : undefined;
  noise = true;
  topLeft.style.backgroundColor = 'lightgreen';
}
function two() {
  let audioTwo = document.getElementById('clip2');
  noise ? audioTwo.play() : undefined;
  noise = true;
  topRight.style.backgroundColor = 'tomato';
}
function three() {
  let audioThree = document.getElementById('clip3');
  noise ? audioThree.play() : undefined;
  noise = true;
  bottomLeft.style.backgroundColor = 'yellow';
}
function four() {
  let audioFour = document.getElementById('clip4');
  noise ? audioFour.play() : undefined;
  noise = true;
  bottomRight.style.backgroundColor = 'lightskyblue';
}
function clearColor() {
  topLeft.style.backgroundColor = 'darkgreen';
  topRight.style.backgroundColor = 'darkred';
  bottomLeft.style.backgroundColor = 'goldenrod';
  bottomRight.style.backgroundColor = 'darkblue';
}

function flashColor() {
  topLeft.style.backgroundColor = 'lightgreen';
  topRight.style.backgroundColor = 'tomato';
  bottomLeft.style.backgroundColor = 'yellow'; // Corrected typo here
  bottomRight.style.backgroundColor = 'lightblue';
}
topLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});
topRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});
bottomLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});
bottomRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;

  if (playerOrder.length == order.length && good) {
    winGame();
  }

  if (good == false) {
    flashColor();
    turnCounter.innerHTML = 'NO!';
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();

      if (strict) {
        play();
      } else {
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
  flashColor();
  turnCounter.innerHTML = 'WIN!';
  on = false;
  win = true;
}
