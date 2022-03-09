import {
  PADDING,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  BOARD_HEIGHT,
  SPEED,
} from "./constants.js";
import { setProperty, getProperty } from "./utils.js";

export default class Player {
  #element;
  #x;
  #y;
  #direction;
  #name;

  constructor(board, name) {
    this.#x = 0;
    this.#y = 0;
    this.#direction = 0;
    this.#name = name;

    this.#element = document.createElement("div");
    this.#element.classList.add("player");
    this.setSize();
    board.appendChild(this.#element);
  }

  get name() {
    return this.#name;
  }

  get position() {
    this.#x = Math.floor(parseInt(getProperty(this.#element, "--x")));
    this.#y = Math.floor(parseInt(getProperty(this.#element, "--y")));

    return { x: this.#x, y: this.#y };
  }

  set direction(direction) {
    this.#direction = direction;
  }

  get #canMove() {
    return this.#direction === 1 ? this.checkBottom() : this.checkTop();
  }

  move(delta) {
    if (this.#direction === 0) return;
    if (!this.#canMove) return;
    const moveTo = Math.floor(this.#y + delta * SPEED * this.#direction);
    this.setPosition(this.#x, moveTo);
  }

  checkTop() {
    return this.position.y > PADDING;
  }

  checkBottom() {
    return this.position.y < BOARD_HEIGHT - PADDING;
  }

  setSize() {
    setProperty(this.#element, "--player-width", `${PLAYER_WIDTH}px`);
    setProperty(this.#element, "--player-height", `${PLAYER_HEIGHT}px`);
  }

  setPosition(x, y) {
    this.#x = x;
    this.#y = y;
    setProperty(this.#element, "--x", `${x}px`);
    setProperty(this.#element, "--y", `${y}px`);
  }

  remove() {
    this.#element.remove();
  }
}
