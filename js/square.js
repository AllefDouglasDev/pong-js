import { setProperty, getProperty } from "./properties.js";
import { SQUARE_WIDTH, SQUARE_HEIGHT, SPEED } from "./constants.js";
import Position from "./position.js";

export default class Square {
  #element;
  #board;
  #position;
  #directionX;
  #directionY;
  #winner;

  constructor(board) {
    this.#board = board;
    this.#directionX = 1;
    this.#directionY = 1;
    this.#winner = null;

    this.#element = document.createElement("div");
    this.#element.classList.add("square");
    board.appendChild(this.#element);

    this.#position = new Position(this.#element);
    this.#position.setSize(SQUARE_WIDTH, SQUARE_HEIGHT);
    this.#setSize();
  }

  get element() {
    return this.#element;
  }

  get winner() {
    return this.#winner;
  }

  update(delta, leftPlayer, rightPlayer) {
    if (this.#isTouchingLeftWall()) {
      this.#winner = rightPlayer;
      return;
    } else if (this.#isTouchingRightWall()) {
      this.#winner = leftPlayer;
      return;
    }

    if (this.#isTouchingLeftPlayer(leftPlayer)) {
      this.#directionX = 1;
    } else if (this.#isTouchingRightPlayer(rightPlayer)) {
      this.#directionX = -1;
    }

    if (this.#isTouchingFloor()) {
      this.#directionY = -1;
    } else if (this.#isTouchingRoof()) {
      this.#directionY = 1;
    }

    const moveToX = Math.floor(
      this.#position.x + delta * SPEED * this.#directionX
    );
    const moveToY = Math.floor(
      this.#position.y + delta * SPEED * this.#directionY
    );

    this.setPosition(moveToX, moveToY);
  }

  setPosition(x, y) {
    this.#position.setPosition(x, y);
  }

  remove() {
    this.#element.remove();
  }

  #isTouchingLeftPlayer(player) {
    const sameX = this.#position.x == player.position.endX;
    const sameY =
      (this.#position.y >= player.position.y &&
        this.#position.y <= player.position.endY) ||
      (this.#position.endY >= player.position.y &&
        this.#position.endY <= player.position.endY);

    return sameX && sameY;
  }

  #isTouchingRightPlayer(player) {
    const sameX = this.#position.endX == player.position.x;
    const sameY =
      (this.#position.y >= player.position.y &&
        this.#position.y <= player.position.endY) ||
      (this.#position.endY >= player.position.y &&
        this.#position.endY <= player.position.endY);

    return sameX && sameY;
  }

  #isTouchingLeftWall() {
    return this.#position.x <= 0;
  }

  #isTouchingRightWall() {
    return this.#position.endX >= this.#board.width;
  }

  #isTouchingRoof() {
    return this.#position.y <= 0;
  }

  #isTouchingFloor() {
    return this.#position.endY >= this.#board.height;
  }

  #setSize() {
    setProperty(this.#element, "--square-width", `${SQUARE_WIDTH}px`);
    setProperty(this.#element, "--square-height", `${SQUARE_HEIGHT}px`);
  }
}
