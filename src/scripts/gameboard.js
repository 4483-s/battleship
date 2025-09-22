import Ship from './ships.js';

const coin = () => !Math.floor(Math.random() * 2);
export default class Gameboard {
  constructor() {
    this.board = this.genBoard();
    this.shipCount = 0;
    this.boardCleaned = true;
  }
  //receive arrays of key, value pair representing coordinates e.g. [1,2], [1,3]
  placeShip(...co) {
    const ship = new Ship();
    ship.length = co.length;
    for (const curr of co) {
      const cell = this.board[`${curr[0]},${curr[1]}`];
      cell.ship = ship;
      cell.getSurroudingCellsOccupied();
    }
    this.shipCount++;
  }
  placeShipByHead(head, length, d) {
    const ship = new Ship();
    ship.length = length;
    let curr = this.board[`${head[0]},${head[1]}`];
    for (let i = 0; i < length; i++) {
      curr.ship = ship;
      if (curr) curr.getSurroudingCellsInavailable();
      curr = curr[d];
    }
    this.shipCount++;
  }
  // if successfully hit, return true
  receiveAttack(x, y) {
    const tar = this.board[`${x},${y}`];
    //if no ship, create a Square object then record attacked
    if (!tar.ship) {
      tar.attacked = true;
      return true;
    }
    //if the square is hit before, return false directly
    else if (tar.attacked) {
      return false;
    } else {
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
      const random = Math.floor(Math.random() * arr.length);
      this.placeShipByHead(arr[random].point, shipLength, d);
    }
  }

  clearBoard() {
    //loop through every Point, make the ship property be null
    for (const key in this.board) {
      if (this.board[key].ship) {
        this.board[key].ship = null;
      }
    }
    this.boardCleaned = true;
  }
  genBoard() {
    return gen();
  }
}
function gen() {
  const obj = {};
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
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
  isAvailableForShip(d, count) {
    let curr = this;
    for (let i = 0; i < count; i++) {
      if (!curr || !curr.available) return false;
      curr = curr[d];
    }
    return true;
  }
  getSurroudingCellsInavailable() {
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
//generate true or false
