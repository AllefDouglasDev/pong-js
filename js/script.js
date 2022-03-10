import {
  PLAYER_WIDTH,
  BOARD_HEIGHT,
  BOARD_WIDTH,
  PADDING,
  PLAYER_LEFT_NAME,
  PLAYER_RIGHT_NAME,
} from "./constants.js";
import Board from "./board.js";
import Square from "./square.js";
import Player from "./player.js";

// const board = new Board(BOARD_WIDTH, BOARD_HEIGHT);
// let square;
// let leftPlayer;
// let rightPlayer;
// const title = document.querySelector(".title");

// let lastDeltaTime;

// // setup();
// window.addEventListener("keydown", setup, { once: true });

// function setup() {
//   lastDeltaTime = null;
//   title.innerHTML = "";

//   square = new Square(board);
//   leftPlayer = new Player(board, PLAYER_LEFT_NAME);
//   rightPlayer = new Player(board, PLAYER_RIGHT_NAME);

//   leftPlayer.setPosition(PADDING, PADDING);
//   rightPlayer.setPosition(BOARD_WIDTH - PADDING - PLAYER_WIDTH, PADDING);
//   square.setPosition(board.width / 2, board.height / 2);

//   window.requestAnimationFrame(update);
//   window.addEventListener("keydown", handleDown);
//   window.addEventListener("keyup", handleUp);
// }

// function update(time) {
//   if (lastDeltaTime === null) {
//     lastDeltaTime = time;
//     window.requestAnimationFrame(update);
//     return;
//   }

//   const delta = time - lastDeltaTime;
//   lastDeltaTime = time;

//   leftPlayer.move(delta);
//   rightPlayer.move(delta);

//   const winner = square.move(delta, leftPlayer, rightPlayer);

//   if (winner !== null) {
//     leftPlayer.remove();
//     rightPlayer.remove();
//     square.remove();
//     title.innerHTML = `Winner: ${winner.name}<br /> Press any key to restart`;
//     window.addEventListener("keydown", setup, { once: true });
//     return;
//   }

//   window.requestAnimationFrame(update);
// }

// function handleDown(event) {
//   const key = event.key.toUpperCase();

//   switch (key) {
//     case "ARROWDOWN":
//       rightPlayer.direction = 1;
//       break;
//     case "ARROWUP":
//       rightPlayer.direction = -1;
//       break;
//     case "S":
//       leftPlayer.direction = 1;
//       break;
//     case "W":
//       leftPlayer.direction = -1;
//       break;
//   }
// }

// function handleUp(event) {
//   const key = event.key.toUpperCase();

//   switch (key) {
//     case "ARROWDOWN":
//       rightPlayer.direction = 0;
//       break;
//     case "ARROWUP":
//       rightPlayer.direction = 0;
//       break;
//     case "S":
//       leftPlayer.direction = 0;
//       break;
//     case "W":
//       leftPlayer.direction = 0;
//       break;
//   }
// }

class Game {
  board;
  rightPlayer;
  leftPlayer;
  square;
  lastDeltaTime;
  title;

  constructor() {
    this.lastDeltaTime = null;
    this.board = new Board(BOARD_WIDTH, BOARD_HEIGHT);

    window.addEventListener("keydown", this.setup, { once: true });
  }

  setup = () => {
    this.lastDeltaTime = null;
    this.setTitle("");

    this.square = new Square(this.board);
    this.leftPlayer = new Player(this.board, PLAYER_LEFT_NAME);
    this.rightPlayer = new Player(this.board, PLAYER_RIGHT_NAME);

    this.leftPlayer.setPosition(PADDING, PADDING);
    this.rightPlayer.setPosition(BOARD_WIDTH - PADDING - PLAYER_WIDTH, PADDING);
    this.square.setPosition(this.board.width / 2, this.board.height / 2);

    window.requestAnimationFrame(this.update);
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  };

  update = (time) => {
    if (this.lastDeltaTime === null) {
      this.lastDeltaTime = time;
      window.requestAnimationFrame(this.update);
      return;
    }

    const delta = time - this.lastDeltaTime;
    this.lastDeltaTime = time;

    this.leftPlayer.move(delta);
    this.rightPlayer.move(delta);

    const winner = this.square.move(delta, this.leftPlayer, this.rightPlayer);

    if (winner !== null) {
      this.finishGame(winner);
      return;
    }

    window.requestAnimationFrame(this.update);
  };

  finishGame = (winner) => {
    this.leftPlayer.remove();
    this.rightPlayer.remove();
    this.square.remove();
    this.setTitle(`Winner: ${winner.name}<br /> Press any key to restart`);
    window.addEventListener("keydown", this.setup, { once: true });
  };

  handleKeyUp = (event) => {
    const key = event.key.toUpperCase();

    switch (key) {
      case "ARROWDOWN":
        this.rightPlayer.direction = 0;
        break;
      case "ARROWUP":
        this.rightPlayer.direction = 0;
        break;
      case "S":
        this.leftPlayer.direction = 0;
        break;
      case "W":
        this.leftPlayer.direction = 0;
        break;
    }
  };

  handleKeyDown = (event) => {
    const key = event.key.toUpperCase();

    switch (key) {
      case "ARROWDOWN":
        this.rightPlayer.direction = 1;
        break;
      case "ARROWUP":
        this.rightPlayer.direction = -1;
        break;
      case "S":
        this.leftPlayer.direction = 1;
        break;
      case "W":
        this.leftPlayer.direction = -1;
        break;
    }
  };

  setTitle = (text) => {
    if (this.title == null) {
      this.title = document.querySelector(".title");
    }
    this.title.innerHTML = text;
  };
}

new Game();
