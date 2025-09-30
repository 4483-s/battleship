import Gameboard from './gameboard';
import Player from './player';
export default class Computer extends Player {
  constructor() {
    this.board = new Gameboard();
  }
  async attack(humanGameBoard) {
    const arr = [];
    for (const key in humanGameBoard.board) {
      const c = humanGameBoard.board[key];
      if (!c.discovered) arr.push.c.spot;
    }
    const r = Math.floor(Math.random() * arr.length);
    humanGameBoard.receiveAttack(...arr[r]);
    return await promise();
  }
}

const promise = () => {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve('done');
    }, 1500);
  });
};
