import { getProperty, setProperty } from "./properties.js";

export default class Position {
  #element;
  #width;
  #height;

  constructor(element, x = 0, y = 0) {
    this.#element = element;
    this.#width = 0;
    this.#height = 0;

    this.setPosition(x, y);
  }

  get x() {
    return Math.floor(parseInt(getProperty(this.#element, "--x")));
  }

  get y() {
    return Math.floor(parseInt(getProperty(this.#element, "--y")));
  }

  get endX() {
    return this.x + this.#width;
  }

  get endY() {
    return this.y + this.#height;
  }

  setPosition(x, y) {
    setProperty(this.#element, "--x", `${x}px`);
    setProperty(this.#element, "--y", `${y}px`);
  }

  setSize(width, height) {
    this.#width = width;
    this.#height = height;
  }
}
