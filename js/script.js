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
  title;
  board;
  square;
  leftPlayer;
  rightPlayer;
  lastDeltaTime;

  constructor() {
    this.lastDeltaTime = null;

    this.board = new Board(BOARD_WIDTH, BOARD_HEIGHT);
    this.square = new Square(this.board);
    this.leftPlayer = new Player(this.board, PLAYER_LEFT_NAME);
    this.rightPlayer = new Player(this.board, PLAYER_RIGHT_NAME);

    this.leftPlayer.setPointPosition(BOARD_WIDTH * 0.25, PADDING);
    this.rightPlayer.setPointPosition(BOARD_WIDTH * 0.75, PADDING);

    window.addEventListener("keydown", this.setup, { once: true });
  }

  setup = () => {
    this.lastDeltaTime = null;
    this.setTitle("");

    this.leftPlayer.setPosition(PADDING, this.board.height / 2);
    this.rightPlayer.setPosition(
      this.board.width - PADDING - PLAYER_WIDTH,
      this.board.height / 2
    );
    this.square.setPosition(this.board.width / 2, this.board.height / 2);

    this.leftPlayer.show();
    this.rightPlayer.show();
    this.square.show();

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
      this.restartGame();
      return;
    }

    window.requestAnimationFrame(this.update);
  };

  restartGame = (event) => {
    this.square.reset();

    this.setup();
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
