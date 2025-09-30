import Gameboard from './gameboard';
export default class Player {
  constructor() {
    this.gamboard = new Gameboard();
  }
  randomnise() {
    this.gamboard.randomPlace();
  }
}
