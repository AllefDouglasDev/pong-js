import {
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  BOARD_HEIGHT,
  BOARD_WIDTH,
  PADDING,
  PLAYER_LEFT_NAME,
  PLAYER_RIGHT_NAME,
  SPEED,
  SQUARE_HEIGHT,
  SQUARE_WIDTH,
} from "./constants.js";
import Board from "./board.js";
import Player from "./player.js";
import { setProperty, getProperty } from "./properties.js";

// const board = document.querySelector(".board");
const board = new Board(BOARD_WIDTH, BOARD_HEIGHT);
const square = document.createElement("div");
square.classList.add("square");
board.appendChild(square);
const title = document.querySelector(".title");

let lastDeltaTime;
let leftPlayer;
let rightPlayer;
let moveSquareDirectionX = 1;
let moveSquareDirectionY = 1;

setup();
// window.addEventListener("keydown", setup, { once: true });

function setup() {
  lastDeltaTime = null;
  title.innerHTML = "";

  leftPlayer = new Player(board, PLAYER_LEFT_NAME);
  leftPlayer.setPosition(PADDING, PADDING);

  rightPlayer = new Player(board, PLAYER_RIGHT_NAME);
  rightPlayer.setPosition(BOARD_WIDTH - PADDING - PLAYER_WIDTH, PADDING);

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

  leftPlayer.move(delta);
  rightPlayer.move(delta);

  const { isAlive, winner } = moveSquare(delta);

  if (isAlive) {
    window.requestAnimationFrame(update);
  } else {
    leftPlayer.remove();
    rightPlayer.remove();
    title.innerHTML = `Winner: ${winner}<br /> Press any key to restart`;
    window.addEventListener("keydown", setup, { once: true });
  }
}

function handleDown(event) {
  const key = event.key.toUpperCase();

  switch (key) {
    case "ARROWDOWN":
      rightPlayer.direction = 1;
      break;
    case "ARROWUP":
      rightPlayer.direction = -1;
      break;
    case "S":
      leftPlayer.direction = 1;
      break;
    case "W":
      leftPlayer.direction = -1;
      break;
  }
}

function handleUp(event) {
  const key = event.key.toUpperCase();

  switch (key) {
    case "ARROWDOWN":
      rightPlayer.direction = 0;
      break;
    case "ARROWUP":
      rightPlayer.direction = 0;
      break;
    case "S":
      leftPlayer.direction = 0;
      break;
    case "W":
      leftPlayer.direction = 0;
      break;
  }
}

function moveSquare(delta) {
  let isAlive = true;
  let winner = "";
  const [squareX, squareY] = getPosition(square);
  const { x: leftPlayerX, y: leftPlayerY } = leftPlayer.position;
  const { x: rightPlayerX, y: rightPlayerY } = rightPlayer.position;

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
    winner = leftPlayer.name;
  } else if (squareX <= 0) {
    moveSquareDirectionX = 1;
    isAlive = false;
    winner = rightPlayer.name;
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
