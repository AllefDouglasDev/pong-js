import { setProperty } from "./properties.js";
import {
  SQUARE_WIDTH,
  SQUARE_HEIGHT,
  SPEED,
  SPEED_INCREASE,
} from "./constants.js";
import Position from "./position.js";

export default class Square {
  #element;
  #board;
  #position;
  #directionX;
  #directionY;
  #winner;
  #speed;

  constructor(board) {
    this.#board = board;
    this.#directionX = this.#randomDirection();
    this.#directionY = this.#randomDirection();
    this.#winner = null;
    this.#speed = SPEED;

    this.#element = document.createElement("div");
    this.#element.classList.add("square");
    board.appendChild(this.#element);

    this.#position = new Position(this.#element);
    this.#position.setSize(SQUARE_WIDTH, SQUARE_HEIGHT);
    this.#setSize();
    this.hide();
  }

  get element() {
    return this.#element;
  }

  get winner() {
    return this.#winner;
  }

  update(delta, leftPlayer, rightPlayer) {
    this.#speed += SPEED_INCREASE;

    this.#checkBoundaries(leftPlayer, rightPlayer);
    if (this.#winner != null) return;

    this.#checkPlayersColisions([leftPlayer, rightPlayer]);

    const moveToX = this.#position.x + delta * this.#speed * this.#directionX;
    const moveToY = this.#position.y + delta * this.#speed * this.#directionY;
    this.setPosition(moveToX, moveToY);
  }

  setPosition(x, y) {
    this.#position.setPosition(x, y);
  }

  remove() {
    this.#element.remove();
  }

  reset() {
    this.#winner = null;
    this.#directionX = this.#randomDirection();
    this.#directionY = this.#randomDirection();
    this.#speed = SPEED;
  }

  show() {
    this.#element.classList.add("show");
  }

  hide() {
    this.#element.classList.add("hide");
  }

  #randomDirection() {
    return Math.random() > 0.5 ? 1 : -1;
  }

  #checkPlayersColisions(players) {
    if (players.some((player) => this.#isTouchingPlayer(player))) {
      this.#directionX *= -1;
    }
  }

  #checkBoundaries(leftPlayer, rightPlayer) {
    if (this.#isTouchingLeftWall()) {
      this.#winner = rightPlayer;
      rightPlayer.incrementPoint();
    } else if (this.#isTouchingRightWall()) {
      this.#winner = leftPlayer;
      leftPlayer.incrementPoint();
    }

    if (this.#isTouchingFloor()) {
      this.#directionY = -1;
    } else if (this.#isTouchingRoof()) {
      this.#directionY = 1;
    }
  }

  #isTouchingPlayer(player) {
    return (
      this.#position.x <= player.position.endX &&
      this.#position.endX >= player.position.x &&
      this.#position.y <= player.position.endY &&
      this.#position.endY >= player.position.y
    );
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
