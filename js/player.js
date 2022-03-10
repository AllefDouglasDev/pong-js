import { PADDING, PLAYER_HEIGHT, PLAYER_WIDTH, SPEED } from "./constants.js";
import { setProperty } from "./properties.js";
import Position from "./position.js";
import Point from "./point.js";

export default class Player {
  #name;
  #board;
  #point;
  #element;
  #position;
  #direction;

  constructor(board, name) {
    this.#name = name;
    this.#board = board;
    this.#direction = 0;
    this.#point = new Point(board);

    this.#element = document.createElement("div");
    this.#element.classList.add("player");
    board.appendChild(this.#element);

    this.#position = new Position(this.#element);
    this.#position.setSize(PLAYER_WIDTH, PLAYER_HEIGHT);
    this.#setSize();
    this.hide();
  }

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }

  get width() {
    return PLAYER_WIDTH;
  }

  get height() {
    return PLAYER_HEIGHT;
  }

  set direction(direction) {
    this.#direction = direction;
  }

  update(delta) {
    if (this.#canMove() == false) return;
    const moveTo = Math.floor(
      this.#position.y + delta * SPEED * this.#direction
    );
    this.setPosition(this.#position.x, moveTo);
  }

  remove() {
    this.#element.remove();
  }

  incrementPoint() {
    this.#point.increment();
  }

  setPosition(x, y) {
    this.#position.setPosition(x, y);
  }

  setPointPosition(x, y) {
    this.#point.setPosition(x, y);
  }

  show() {
    this.#element.classList.add("show");
  }

  hide() {
    this.#element.classList.add("hide");
  }

  #canMove() {
    if (this.#direction === 0) return false;
    return this.#direction === 1 ? this.#checkBottom() : this.#checkTop();
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
