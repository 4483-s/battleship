import Gameboard from './gameboard';
export default class Player {
  constructor(initBoard) {
    this.gamboard = new Gameboard(initBoard);
  }
  randomnise() {
    this.gamboard.randomPlace();
  }
}
