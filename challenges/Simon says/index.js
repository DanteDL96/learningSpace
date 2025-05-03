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
  turnCounter: [],
};
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
      clearInterval(gameSetUp.intervalId));
});

startButton.addEventListener('click', (event) => {
  if (on || win) {
    play();
  } // on || (win && play()); doesn not work cause of editor
});

function setupReset(SetUp) {
  SetUp.win = false;
  SetUp.order = [];
  SetUp.playerOrder = [];
  SetUp.flash = 0;
  SetUp.intervalId = 0;
  SetUp.turn = 1;
  turnCounter.innerHTML = 1; // Set the innerHTML of turnCounter directly
  SetUp.good = true;
}

function play() {
  setupReset(gameSetUp); //calls the function and passes the properties
  for (let i = 0; i < 20; i++) {
    gameSetUp.order.push(Math.floor(Math.random() * 4) + 1); // Access order from gameSetUp
  }
  gameSetUp.compTurn = true; // Access compTurn from gameSetUp
  gameSetUp.intervalId = setInterval(gameTurn, 800); // Access intervalId from gameSetUp
}
let segmentProperties = [
  { id: 'clip1', clip: 'clip1', bckgColor: 'lightgreen' },
  { id: 'clip2', clip: 'clip2', bckgColor: 'tomato' },
  { id: 'clip3', clip: 'clip3', bckgColor: 'yellow' },
  { id: 'clip4', clip: 'clip4', bckgColor: 'lightskyblue' },
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
  let audio = document.getElementById(
    segmentProperties[number].clip ? segmentProperties[number].clip : null
  );
  gameSetUp.noise ? audio.play() : undefined;
  gameSetUp.noise = true;
}
function toggleColor(mode) {
  topLeft.style.backgroundColor =
    mode == true ? 'darkgreen' : segmentProperties[0].bckgColor;
  topRight.style.backgroundColor =
    mode == true ? 'darkred' : segmentProperties[1].bckgColor;
  bottomLeft.style.backgroundColor =
    mode == true ? 'goldenrod' : segmentProperties[2].bckgColor;
  bottomRight.style.backgroundColor =
    mode == true ? 'darkblue' : segmentProperties[3].bckgColor;
}
function controlColor(index) {
  if (gameSetUp.on) {
    gameSetUp.playerOrder.push(index);
    check();
    segmentNumber(index - 1);
    !gameSetUp.win && setTimeout(() => clearColor(), 300);
  }
}

[topLeft, topRight, bottomLeft, bottomRight].forEach((location, index) =>
  location.addEventListener('click', () => controlColor(index + 1))
);

function check() {
  if (
    gameSetUp.playerOrder[gameSetUp.playerOrder.length - 1] !==
    gameSetUp.order[gameSetUp.playerOrder.length - 1]
  )
    gameSetUp.good = false;

  if (
    gameSetUp.playerOrder.length == gameSetUp.order.length &&
    gameSetUp.good
  ) {
    winGame();
  }

  if (gameSetUp.good == false) {
    toggleColor(false);
    gameSetUp.turnCounter.innerHTML = 'NO!';
    setTimeout(() => {
      gameSetUp.turnCounter.innerHTML = turn;
      toggleColor(true);

      if (gameSetUp.strict) play();
      else {
        gameSetUp.compTurn = true;
        gameSetUp.flash = 0;
        gameSetUp.playerOrder = [];
        gameSetUp.good = true;
        gameSetUp.intervalId = setInterval(gameTurn, 800);
      }
    }, 800);
    noise = false;
  }

  if (
    gameSetUp.turn == gameSetUp.playerOrder.length &&
    gameSetUp.good &&
    !gameSetUp.win
  ) {
    gameSetUp.turn++;
    gameSetUp.compTurn = true;
    gameSetUp.flash = 0;
    gameSetUp.playerOrder = [];
    gameSetUp.turnCounter.innerHTML = turn;
    gameSetUp.intervalId = setInterval(gameTurn, 800);
  }
}

function gameTurn() {
  gameSetUp.flash == gameSetUp.turn
    ? (clearInterval(gameSetUp.intervalId),
      (gameSetUp.compTurn = false),
      clearColor(),
      (gameSetUp.on = true))
    : undefined;

  if (gameSetUp.compTurn) {
    toggleColor(true); // Added parentheses here
    setTimeout(() => {
      segmentNumber(gameSetUp.order[gameSetUp.flash]);
      gameSetUp.flash++;
    }, 200);
  }
}

function clearColor() {
  topLeft.style.backgroundColor = 'darkgreen';
  topRight.style.backgroundColor = 'darkred';
  bottomLeft.style.backgroundColor = 'goldenrod';
  bottomRight.style.backgroundColor = 'darkblue';
}

// function flashColor() {
//   topLeft.style.backgroundColor = 'lightgreen';
//   topRight.style.backgroundColor = 'tomato';
//   bottomLeft.style.backgroundColor = 'yellow'; // Corrected typo here
//   bottomRight.style.backgroundColor = 'lightblue';
// }

function winGame() {
  toggleColor(false);
  gameSetUp.turnCounter.innerHTML = 'WIN!';
  gameSetUp.on = false;
  gameSetUp.win = true;
}
