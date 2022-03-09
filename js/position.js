import { getProperty, setProperty } from "./properties.js";

export default class Position {
  #element;

  constructor(element, x = 0, y = 0) {
    this.#element = element;

    this.setPosition(x, y);
  }

  get x() {
    return Math.floor(parseInt(getProperty(this.#element, "--x")));
  }

  get y() {
    return Math.floor(parseInt(getProperty(this.#element, "--y")));
  }

  get position() {
    return { x: this.x, y: this.y };
  }

  setPosition(x, y) {
    setProperty(this.#element, "--x", `${x}px`);
    setProperty(this.#element, "--y", `${y}px`);
  }
}
