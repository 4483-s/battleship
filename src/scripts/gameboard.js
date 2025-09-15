export default class Gameboard {
  constructor(size) {
    this.size = size;
    this.board = {};
    this.ships = {};
  }
  #ckeckIsVertical(start, end) {
    return start[0] === end[0];
  }
  placeShip(start, end) {
    const isVertical = this.#ckeckIsVertical(start, end);
    // const shipLength = Math.abs(
    //   isVertical ? start[1] - end[1] : start[0] - end[0],
    // );
    const ship = new Ship();
    this.ships[ship.id] = ship;
    let shipLength = 0;
    if (isVertical) {
      const x = start[0];
      const sorted = [start, end].sort((a, b) => a[1] - b[1]);
      for (let i = sorted[0][1]; i <= sorted[1][1]; i++) {
        this.board[`${x}${i}`] = ship.id;
        shipLength++;
      }
    } else {
      const y = start[1];
      const sorted = [start, end].sort((a, b) => a[0] - b[0]);
      for (let i = sorted[0][0]; i <= sorted[1][0]; i++) {
        this.board[`${y}${i}`] = ship.id;
        shipLength++;
      }
    }
    ship.length = shipLength;
  }
  receiveAttack(x, y) {
    if (board[`${x}${y}`]) return;
  }
}
const isValidCoordinate = (x, y, size) =>
  x >= 0 && x < size && y >= 0 && y < size;

//
// Gameboards should be able to place ships at specific coordinates by calling the ship factory or class.
// Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
// Gameboards should keep track of missed attacks so they can display them properly.
// Gameboards should be able to report whether or not all of their ships have been sunk.
