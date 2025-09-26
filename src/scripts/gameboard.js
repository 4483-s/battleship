import Ship from './ships.js';
import { coin } from './utils.js';
export default class Gameboard {
  constructor(init) {
    this.board = init ? this.init() : null;
    this.shipCount = 0;
    this.boardCleaned = true;
    this.shipPoints = {};
  }
  isDefeated() {
    return !this.shipCount;
  }

  placeShip(...co) {
    //receive arrays of key, value pair representing coordinates e.g. [1,2], [1,3]
    const ship = new Ship(co.length);
    for (const curr of co) {
      const cell = this.board[`${curr[0]},${curr[1]}`];
      cell.ship = ship;
      cell.getSurroudingCellsUnavailable();
    }
    this.shipCount++;
  }
  placeShipByHead(head, length, d) {
    const ship = new Ship(length);
    ship.dir = d === 'right' ? 'h' : 'v';
    let curr = this.board[`${head[0]},${head[1]}`];
    for (let i = 0; i < length; i++) {
      curr.ship = ship;
      if (curr) curr.getSurroudingCellsUnavailable();
      curr = curr[d];
    }
    this.shipCount++;
  }
  // if successfully hit, return true
  receiveAttack(x, y) {
    const tar = this.board[`${x},${y}`];

    if (!tar.ship) {
      //responds towards emptyCell
      tar.attacked = true;
      return true;
    }
    //if the square is hit before, return false directly
    else if (tar.attacked) return false;
    else {
      tar.ship.hit();
      tar.attacked = true;
      if (tar.ship.isSunk()) this.shipCount--;
      return true;
    }
  }
  getEmptyCells() {
    const arr = [];
    for (const key in this.board) {
      if (!this.board[key].ship) arr.push(this.board[key]);
    }
    return arr;
  }
  getAvailableCell() {
    const arr = [];
    for (const key in this.board)
      if (this.board[key].available) arr.push(this.board[key]);
    return arr;
  }
  getAvailableCellForShip(d, len) {
    const emptyCells = this.getAvailableCell();
    return emptyCells.filter(v => v.isAvailableForShip(d, len));
  }
  randomPlace(...arr) {
    if (!this.boardCleaned) this.clearBoard();
    this.boardCleaned = false;
    arr.sort((a, b) => b - a);
    for (const shipLength of arr) {
      const d = coin() ? 'right' : 'bottom';
      const arr = this.getAvailableCellForShip(d, shipLength);
      if (!arr.length)
        throw new Error(
          'Failed to randomise ships, try adjusting you settings.',
        );
      const random = Math.floor(Math.random() * arr.length);
      this.placeShipByHead(arr[random].point, shipLength, d);
    }
  }

  clearBoard() {
    //loop through every Point, make the ship property be null
    for (const key in this.board)
      if (this.board[key].ship) this.board[key].ship = null;
    this.boardCleaned = true;
  }
  init() {
    return gen();
  }
}
function gen(w = 10, h = 10) {
  const obj = {};
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      const point = `${i},${j}`;
      obj[point] = new Point([i, j]);
    }
  }
  for (const key in obj) {
    const current = obj[key];
    const [x, y] = obj[key].point;
    const right = obj[`${x + 1},${y}`];
    const left = obj[`${x - 1},${y}`];
    const top = obj[`${x},${y + 1}`];
    const bottom = obj[`${x},${y - 1}`];
    if (right) current.right = right;
    if (left) current.left = left;
    if (top) current.top = top;
    if (bottom) current.bottom = bottom;
  }
  return obj;
}
class Point {
  constructor(point) {
    //point should be an array, e.g. [0,3]
    this.point = point;
    this.right = null;
    this.left = null;
    this.top = null;
    this.bottom = null;
    this.ship = null;
    this.attacked = false;
    this.available = true;
  }
  isAvailableForShip(d, length) {
    let curr = this;
    for (let i = 0; i < length; i++) {
      if (!curr || !curr.available) return false;
      curr = curr[d];
    }
    return true;
  }
  getSurroudingCellsUnavailable() {
    this.available = false;
    if (this.right) this.right.available = false;
    if (this.left) this.left.available = false;

    if (this.bottom) {
      const t = this.bottom;
      t.available = false;
      if (t.left) t.left.available = false;
      if (t.right) t.right.available = false;
    }
    if (this.top) {
      const t = this.top;
      t.available = false;
      if (t.left) t.left.available = false;
      if (t.right) t.right.available = false;
    }
  }
}
