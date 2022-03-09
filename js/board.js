import { setProperty } from "./properties.js";

export default class Board {
  #element;
  #width;
  #height;

  constructor(width, height) {
    this.#width = width;
    this.#height = height;

    this.#element = document.createElement("div");
    this.#element.classList.add("board");
    document.body.appendChild(this.#element);

    this.#setSize();
    this.#createSeparator();
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  appendChild(element) {
    this.#element.appendChild(element);
  }

  #createSeparator() {
    const separator = document.createElement("div");
    separator.classList.add("separator");
    this.appendChild(separator);
  }

  #setSize() {
    setProperty(this.#element, "--width", `${this.#width}px`);
    setProperty(this.#element, "--height", `${this.#height}px`);
  }
}
