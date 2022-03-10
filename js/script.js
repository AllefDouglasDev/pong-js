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

    this.leftPlayer.update(delta);
    this.rightPlayer.update(delta);
    this.square.update(delta, this.leftPlayer, this.rightPlayer);

    if (this.square.winner !== null) {
      this.finishGame();
      return;
    }

    window.requestAnimationFrame(this.update);
  };

  finishGame = () => {
    this.setTitle(
      `Winner: ${this.square.winner.name}<br /> Press "SPACE" to restart`
    );

    this.leftPlayer.remove();
    this.rightPlayer.remove();
    this.square.remove();

    window.addEventListener("keydown", this.restartGame, { once: true });
  };

  restartGame = (event) => {
    if (event.code === "Space") {
      this.setup();
    } else {
      window.addEventListener("keydown", this.restartGame, { once: true });
    }
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
