import { PADDING, PLAYER_HEIGHT, PLAYER_WIDTH, SPEED } from "./constants.js";
import { setProperty, getProperty } from "./properties.js";
import Position from "./position.js";

export default class Player {
  #element;
  #direction;
  #name;
  #board;
  #position;

  constructor(board, name) {
    this.#name = name;
    this.#board = board;
    this.#direction = 0;

    this.#element = document.createElement("div");
    this.#element.classList.add("player");

    this.#position = new Position(this.#element);

    this.#setSize();
    board.appendChild(this.#element);
  }

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position.position;
  }

  set direction(direction) {
    this.#direction = direction;
  }

  get #canMove() {
    return this.#direction === 1 ? this.#checkBottom() : this.#checkTop();
  }

  move(delta) {
    if (this.#direction === 0) return;
    if (!this.#canMove) return;
    const moveTo = Math.floor(
      this.#position.y + delta * SPEED * this.#direction
    );
    this.setPosition(this.#position.x, moveTo);
  }

  setPosition(x, y) {
    this.#position.setPosition(x, y);
  }

  remove() {
    this.#element.remove();
  }

  #checkTop() {
    return this.#position.y > PADDING;
  }

  #checkBottom() {
    return this.#position.y + PLAYER_HEIGHT < this.#board.height - PADDING;
  }

  #setSize() {
    setProperty(this.#element, "--player-width", `${PLAYER_WIDTH}px`);
    setProperty(this.#element, "--player-height", `${PLAYER_HEIGHT}px`);
  }
}
