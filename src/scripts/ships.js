class Ship {
  constructor(length) {
    this.length = length;
    this.sunk = false;
    this.hits = 0;
    this.id = crypto.randomUUID();
    this.dir = null;
  }
  hit() {
    this.hits++;
  }
  isSunk() {
    return this.length === this.hits;
  }
}
