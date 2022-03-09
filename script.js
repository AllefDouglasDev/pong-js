const BOARD_WIDTH = 500;
const BOARD_HEIGHT = 300;
const PLAYER_WIDTH = BOARD_WIDTH * 0.02;
const PLAYER_HEIGHT = BOARD_HEIGHT * 0.15;
const SQUARE_WIDTH = 16;
const SQUARE_HEIGHT = SQUARE_WIDTH;
const PADDING = 10;
const SPEED = 0.15;
const PLAYER_LEFT_NAME = "Left Player";
const PLAYER_RIGHT_NAME = "Right Player";

const board = document.querySelector(".board");
const square = document.querySelector(".square");
const title = document.querySelector(".title");
const [leftPlayer, rightPlayer] = document.querySelectorAll(".player");

let lastDeltaTime;
let moveSquareDirectionX = 1;
let moveSquareDirectionY = 1;
let moveLeftPlayerDirection = 0;
let moveRightPlayerDirection = 0;

window.addEventListener("keydown", setup, { once: true });

function setup() {
  lastDeltaTime = null;
  title.innerHTML = "";
  setProperty(board, "--width", `${BOARD_WIDTH}px`);
  setProperty(board, "--height", `${BOARD_HEIGHT}px`);

  setProperty(leftPlayer, "--player-width", `${PLAYER_WIDTH}px`);
  setProperty(leftPlayer, "--player-height", `${PLAYER_HEIGHT}px`);
  setProperty(leftPlayer, "--x", `${PADDING}px`);
  setProperty(leftPlayer, "--y", `${PADDING}px`);

  setProperty(rightPlayer, "--player-width", `${PLAYER_WIDTH}px`);
  setProperty(rightPlayer, "--player-height", `${PLAYER_HEIGHT}px`);
  setProperty(rightPlayer, "--x", `${BOARD_WIDTH - PLAYER_WIDTH - 10}px`);
  setProperty(rightPlayer, "--y", `${PADDING}px`);

  setProperty(square, "--square-width", `${SQUARE_WIDTH}px`);
  setProperty(square, "--square-height", `${SQUARE_HEIGHT}px`);
  setProperty(square, "--x", `${BOARD_WIDTH / 3}px`);
  setProperty(square, "--y", `${BOARD_HEIGHT / 3}px`);

  window.requestAnimationFrame(update);
  window.addEventListener("keydown", handleDown);
  window.addEventListener("keyup", handleUp);
}

function update(time) {
  if (lastDeltaTime === null) {
    lastDeltaTime = time;
    window.requestAnimationFrame(update);
    return;
  }

  const delta = time - lastDeltaTime;
  lastDeltaTime = time;

  movePlayers(delta);
  const { isAlive, winner } = moveSquare(delta);

  if (isAlive) {
    window.requestAnimationFrame(update);
  } else {
    title.innerHTML = `Winner: ${winner}<br /> Press any key to restart`;
    window.addEventListener("keydown", setup, { once: true });
  }
}

function handleDown(event) {
  const key = event.key.toUpperCase();

  switch (key) {
    case "ARROWDOWN":
      moveRightPlayerDirection = 1;
      break;
    case "ARROWUP":
      moveRightPlayerDirection = -1;
      break;
    case "S":
      moveLeftPlayerDirection = 1;
      break;
    case "W":
      moveLeftPlayerDirection = -1;
      break;
  }
}

function handleUp(event) {
  const key = event.key.toUpperCase();

  switch (key) {
    case "ARROWDOWN":
      moveRightPlayerDirection = 0;
      break;
    case "ARROWUP":
      moveRightPlayerDirection = 0;
      break;
    case "S":
      moveLeftPlayerDirection = 0;
      break;
    case "W":
      moveLeftPlayerDirection = 0;
      break;
  }
}

function movePlayers(delta) {
  const [, leftPlayerY] = getPosition(leftPlayer);
  const [, rightPlayerY] = getPosition(rightPlayer);

  movePlayer(leftPlayer, moveLeftPlayerDirection, leftPlayerY, delta);
  movePlayer(rightPlayer, moveRightPlayerDirection, rightPlayerY, delta);
}

function movePlayer(player, direction, y, delta) {
  if (direction !== 0) {
    const canMove =
      direction === 1 ? playerCanGoDown(player) : playerCanGoUp(player);

    if (canMove) {
      const moveTo = Math.floor(y + delta * SPEED * direction);
      setProperty(player, "--y", `${moveTo}px`);
    }
  }
}

function playerCanGoUp(player) {
  const [, y] = getPosition(player);
  return y > PADDING;
}

function playerCanGoDown(player) {
  const [, y] = getPosition(player);
  return y + PLAYER_HEIGHT < BOARD_HEIGHT - PADDING;
}

function moveSquare(delta) {
  let isAlive = true;
  let winner = "";
  const [squareX, squareY] = getPosition(square);
  const [leftPlayerX, leftPlayerY] = getPosition(leftPlayer);
  const [rightPlayerX, rightPlayerY] = getPosition(rightPlayer);

  const sameRightPlayerX = squareX + SQUARE_WIDTH >= rightPlayerX;
  const sameRightPlayerY =
    squareY >= rightPlayerY && squareY <= rightPlayerY + PLAYER_HEIGHT;
  const sameLeftPlayerX = squareX <= leftPlayerX + PLAYER_WIDTH;
  const sameLeftPlayerY =
    squareY >= leftPlayerY && squareY <= leftPlayerY + PLAYER_HEIGHT;

  if (sameRightPlayerX && sameRightPlayerY) {
    moveSquareDirectionX = -1;
  } else if (sameLeftPlayerX && sameLeftPlayerY) {
    moveSquareDirectionX = 1;
  } else if (squareX >= BOARD_WIDTH - SQUARE_WIDTH) {
    moveSquareDirectionX = -1;
    isAlive = false;
    winner = PLAYER_LEFT_NAME;
  } else if (squareX <= 0) {
    moveSquareDirectionX = 1;
    isAlive = false;
    winner = PLAYER_RIGHT_NAME;
  }

  if (squareY >= BOARD_HEIGHT - SQUARE_HEIGHT) {
    moveSquareDirectionY = -1;
  }
  if (squareY <= 0) {
    moveSquareDirectionY = 1;
  }

  const moveToX = squareX + delta * SPEED * moveSquareDirectionX;
  const moveToY = squareY + delta * SPEED * moveSquareDirectionY;

  setProperty(square, "--x", `${moveToX}px`);
  setProperty(square, "--y", `${moveToY}px`);

  return { isAlive, winner };
}

function getPosition(element) {
  return [
    Math.floor(parseInt(getProperty(element, "--x"))),
    Math.floor(parseInt(getProperty(element, "--y"))),
  ];
}

function getProperty(element, property) {
  return element.style.getPropertyValue(property);
}

function setProperty(element, property, value) {
  element.style.setProperty(property, value);
}
