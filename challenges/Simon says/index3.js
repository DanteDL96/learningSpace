const strictButton = document.querySelector('#strict');
const onButton = document.querySelector('#on');
const startButton = document.querySelector('#start');
const topLeft = document.querySelector('#topleft');
const topRight = document.querySelector('#topright');
const bottomLeft = document.querySelector('#bottomleft');
const bottomRight = document.querySelector('#bottomright');
const turnCounter = document.querySelector('#turn');

const initGameState = () => ({
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
});

let gameSetUp = initGameState();

const updateState = (state, newState) => ({ ...state, ...newState });

const toggleStrictMode = () => {
  const strict = strictButton.checked;
  gameSetUp = updateState(gameSetUp, { strict });
};

const togglePower = () => {
  const on = onButton.checked;
  gameSetUp = updateState(gameSetUp, { on });
  if (!gameSetUp.on) {
    turnCounter.innerHTML = '';
    clearColor();
    clearInterval(gameSetUp.intervalId);
  } else {
    turnCounter.innerHTML = '-';
  }
};

const startGame = () => {
  if (gameSetUp.on || gameSetUp.win) {
    play();
  }
};

strictButton.addEventListener('change', toggleStrictMode);
onButton.addEventListener('click', togglePower);
startButton.addEventListener('click', startGame);

const play = () => {
  gameSetUp = initGameState();
  gameSetUp.order = Array.from(
    { length: 20 },
    () => Math.floor(Math.random() * 4) + 1
  );
  gameSetUp.compTurn = true;
  gameSetUp.intervalId = setInterval(gameTurn, 800);
};

const gameTurn = () => {
  gameSetUp.on = false;

  if (gameSetUp.flash === gameSetUp.turn) {
    clearInterval(gameSetUp.intervalId);
    gameSetUp.compTurn = false;
    clearColor();
    gameSetUp.on = true;
  }

  if (gameSetUp.compTurn) {
    clearColor();
    setTimeout(() => {
      switch (gameSetUp.order[gameSetUp.flash]) {
        case 1:
          one();
          break;
        case 2:
          two();
          break;
        case 3:
          three();
          break;
        case 4:
          four();
          break;
        default:
          break;
      }
      gameSetUp.flash++;
    }, 200);
  }
};

const clearColor = () => {
  topLeft.style.backgroundColor = 'darkgreen';
  topRight.style.backgroundColor = 'darkred';
  bottomLeft.style.backgroundColor = 'goldenrod';
  bottomRight.style.backgroundColor = 'darkblue';
};

const flashColor = () => {
  topLeft.style.backgroundColor = 'lightgreen';
  topRight.style.backgroundColor = 'tomato';
  bottomLeft.style.backgroundColor = 'yellow';
  bottomRight.style.backgroundColor = 'lightblue';
};

const handleClick = (index) => {
  if (gameSetUp.on) {
    gameSetUp.playerOrder.push(index);
    check();
    switch (index) {
      case 1:
        one();
        break;
      case 2:
        two();
        break;
      case 3:
        three();
        break;
      case 4:
        four();
        break;
      default:
        break;
    }
    if (!gameSetUp.win) {
      setTimeout(() => clearColor(), 300);
    }
  }
};

topLeft.addEventListener('click', () => handleClick(1));
topRight.addEventListener('click', () => handleClick(2));
bottomLeft.addEventListener('click', () => handleClick(3));
bottomRight.addEventListener('click', () => handleClick(4));

const check = () => {
  if (
    gameSetUp.playerOrder[gameSetUp.playerOrder.length - 1] !==
    gameSetUp.order[gameSetUp.playerOrder.length - 1]
  ) {
    gameSetUp.good = false;
  }

  if (
    gameSetUp.playerOrder.length === gameSetUp.order.length &&
    gameSetUp.good
  ) {
    winGame();
  }

  if (!gameSetUp.good) {
    flashColor();
    turnCounter.innerHTML = 'NO!';
    setTimeout(() => {
      turnCounter.innerHTML = gameSetUp.turn;
      clearColor();

      if (gameSetUp.strict) {
        play();
      } else {
        gameSetUp.compTurn = true;
        gameSetUp.flash = 0;
        gameSetUp.playerOrder = [];
        gameSetUp.good = true;
        gameSetUp.intervalId = setInterval(gameTurn, 800);
      }
    }, 800);
    gameSetUp.noise = false;
  }

  if (
    gameSetUp.turn === gameSetUp.playerOrder.length &&
    gameSetUp.good &&
    !gameSetUp.win
  ) {
    gameSetUp.turn++;
    gameSetUp.playerOrder = [];
    gameSetUp.compTurn = true;
    gameSetUp.flash = 0;
    turnCounter.innerHTML = gameSetUp.turn;
    gameSetUp.intervalId = setInterval(gameTurn, 800);
  }
};

const winGame = () => {
  flashColor();
  turnCounter.innerHTML = 'WIN!';
  gameSetUp.on = false;
  gameSetUp.win = true;
};

const one = () => {
  if (gameSetUp.noise) {
    let audio = document.getElementById('clip1');
    audio.play();
  }
  gameSetUp.noise = true;
  topLeft.style.backgroundColor = 'lightgreen';
};

const two = () => {
  if (gameSetUp.noise) {
    let audio = document.getElementById('clip2');
    audio.play();
  }
  gameSetUp.noise = true;
  topRight.style.backgroundColor = 'tomato';
};

const three = () => {
  if (gameSetUp.noise) {
    let audio = document.getElementById('clip3');
    audio.play();
  }
  gameSetUp.noise = true;
  bottomLeft.style.backgroundColor = 'yellow';
};

const four = () => {
  if (gameSetUp.noise) {
    let audio = document.getElementById('clip4');
    audio.play();
  }
  gameSetUp.noise = true;
  bottomRight.style.backgroundColor = 'lightskyblue';
};
