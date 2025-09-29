import Ship from './ships.js';
import { coin } from './utils.js';
export default class Gameboard {
  constructor(init) {
    this.board = init ? this.init() : null;
    this.shipCount = 0;
    this.boardCleaned = true;
    this.shipPoints = {};
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
  // placeShip(...co) {
  //   //receive arrays of key, value pair representing coordinates e.g. [1,2], [1,3]
  //   const ship = new Ship(co.length);
  //   for (const curr of co) {
  //     const cell = this.board[`${curr[0]},${curr[1]}`];
  //     cell.ship = ship;
  //     cell.getSurroudingCellsUnavailable();
  //   }
  //   this.shipCount++;
  //   this.boardCleaned = true;
  // }
  placeShipByHead(head, length, d) {
    //receives a head point, e.g. [4, 3], ship length, and direction
    const ship = new Ship(length);
    ship.dir = d === 'right' ? 'h' : 'v';
    let curr = this.board[`${head[0]},${head[1]}`];
    for (let i = 0; i < length; i++) {
      curr.ship = ship;
      if (curr) curr.getSurroudingCellsUnavailable();
      curr = curr[d];
    }
    this.boardCleaned = true;
    this.shipCount++;
  }
  // if successfully hit, return true
  receiveAttack(x, y) {
    const tar = this.board[`${x},${y}`];
    if (tar.attacked) return 'failed';
    if (!tar.ship) {
      tar.attacked = true;
      return 'hitempty';
    } else {
      tar.ship.hit();
      tar.attacked = true;
      if (tar.ship.isSunk()) this.shipCount--;
      return 'hitship';
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
    //find the points having the 'available' property false
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
      this.placeShipByHead(arr[random].point, shipLength, d);
    }
    this.shipCount = arrForShips.length;
  }

  clearBoard() {
    for (const key in this.board) {
      this.board[key].ship = null;
      this.board[key].available = true;
    }
    this.shipCount = 0;
    this.boardCleaned = true;
  }
  init() {
    //inditialise the board
    return gen();
  }
}
// function for returning clean board object with empty Point objects, the keys are strings of x,y representing their coordinates
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
// constructor for a single point on the board
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
