export default class Gameboard {
  constructor(size) {
    this.size = size;
    this.board = {};
    this.ships = {};
  }
  receiveAttack(x, y) {
    if (board[`${x}${y}`]) return;
  }
}
class Coordinate {}
const isValidCoordinate = (x, y, size) =>
  x >= 0 && x < size && y >= 0 && y < size;

//
// Gameboards should be able to place ships at specific coordinates by calling the ship factory or class.
// Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
// Gameboards should keep track of missed attacks so they can display them properly.
// Gameboards should be able to report whether or not all of their ships have been sunk.
