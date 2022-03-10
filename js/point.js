import Position from "./position.js";

export default class Point {
  #element;
  #value;
  #position;

  constructor(board, x, y) {
    this.#element = document.createElement("div");
    this.#element.classList.add("point");
    board.appendChild(this.#element);

    this.#value = 0;
    this.#element.innerHTML = 0;

    this.#position = new Position(this.#element, x, y);
  }

  get value() {
    return this.#value;
  }

  increment() {
    this.#value++;
    this.#element.innerHTML = this.#value;
  }

  setPosition(x, y) {
    this.#position.setPosition(x, y);
  }
}
