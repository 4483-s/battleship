// constructor for a single spot on the board
export default class Spot {
  constructor(spot) {
    //spot should be an array, e.g. [0,3]
    this.spot = spot;
    this.right = null;
    this.left = null;
    this.top = null;
    this.bottom = null;
    this.ship = null;
    this.available = true;
    this.discovered = false;
    this.hitShip = false;
  }
  isAvailableForShip(d, length, verbose) {
    let curr = this;
    const obj = {};
    obj.spots = [];
    obj.booleanResult = false;
    for (let i = 0; i < length; i++) {
      if (!curr || !curr.available) {
        return verbose ? obj : false;
      }
      obj.spots.push(curr.spot);
      curr = curr[d];
    }
    obj.booleanResult = true;
    return verbose ? obj : true;
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
