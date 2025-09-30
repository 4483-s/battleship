import Ship from './ship.js';
import Spot from './spot.js';
import { coin } from './utils.js';
export default class Gameboard {
  constructor() {
    this.board = gen();
    this.shipCount = 0;
    this.boardCleaned = true;
  }
  isDestroyed() {
    return !this.shipCount;
  }
  checkCellAvailability(x, y) {
    const tar = this.board[`${x},${y}`];
    return tar.available;
  }
  checkCellAvailabilityForShip(x, y, length, d) {
    const tar = this.board[`${x},${y}`];
    return tar.isAvailableForShip(d, length);
  }
  placeShipByHead(head, length, d) {
    //receives a head spot, e.g. [4, 3], ship length, and direction
    const ship = new Ship(length);
    ship.dir = d === 'right' ? 'h' : 'v';
    let curr = this.board[`${head[0]},${head[1]}`];
    for (let i = 0; i < length; i++) {
      curr.ship = ship;
      curr.getSurroudingCellsUnavailable();
      curr = curr[d];
    }
    this.boardCleaned = true;
    this.shipCount++;
  }
  // if successfully hit, return true
  receiveAttack(x, y) {
    const tar = this.board[`${x},${y}`];
    if (tar.discovered) return 'failed';
    if (!tar.ship) {
      tar.discovered = true;
      return 'hitempty';
    } else {
      tar.ship.hit();
      tar.discovered = true;
      tar.hitShip = true;
      const fourSurroundings = [
        tar.topRight,
        tar.topLeft,
        tar.bottomRight,
        tar.bottomLeft,
      ];
      for (v of fourSurroundings) if (v) v.discovered = true;
      if (tar.ship.isSunk()) this.shipCount--;
      return 'hitship';
    }
  }
  getAvailableCell() {
    //find the spots having the 'available' property true
    const arr = [];
    for (const key in this.board)
      if (this.board[key].available) arr.push(this.board[key]);
    return arr;
  }
  getAvailableCellForShip(d, length) {
    const emptyCells = this.getAvailableCell();
    return emptyCells.filter(v => v.isAvailableForShip(d, length));
  }
  randomPlace(...arrForShips) {
    //this function takes an array of ships, represented by their length, e.g. [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]
    // then place these ship on the board
    if (arrForShips.length) arrForShips = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    if (!this.boardCleaned) this.clearBoard();
    this.boardCleaned = false;
    arrForShips.sort((a, b) => b - a);
    for (const shipLength of arrForShips) {
      const d = coin() ? 'right' : 'bottom';
      const arr = this.getAvailableCellForShip(d, shipLength);
      if (!arr.length)
        throw new Error(
          'Failed to randomise ships, try adjusting you settings.',
        );
      const random = Math.floor(Math.random() * arr.length);
      this.placeShipByHead(arr[random].spot, shipLength, d);
    }
    this.shipCount = arrForShips.length;
  }

  clearBoard() {
    for (const key in this.board) {
      this.board[key].ship = null;
      this.board[key].available = true;
      this.board[key].hitShip = true;
    }
    this.shipCount = 0;
    this.boardCleaned = true;
  }
}
//
//
//
//
//
//
//
function gen(w = 10, h = 10) {
  const obj = {};
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      const spot = `${i},${j}`;
      obj[spot] = new Spot([i, j]);
    }
  }
  for (const key in obj) {
    const c = obj[key];
    const [x, y] = obj[key].spot;
    const right = obj[`${x + 1},${y}`];
    const left = obj[`${x - 1},${y}`];
    const top = obj[`${x},${y + 1}`];
    const bottom = obj[`${x},${y - 1}`];
    if (right) c.right = right;
    if (left) c.left = left;
    if (top) c.top = top;
    if (bottom) c.bottom = bottom;
  }
  for (const key in obj) {
    const c = obj[key];
    c.topRight = c.top ? c.top.right : null;
    c.topLeft = c.top ? c.top.left : null;
    c.bottomRight = c.bottom ? c.bototm.right : null;
    c.bottomLeft = c.bottom ? c.bottom.left : null;
  }
  return obj;
}
