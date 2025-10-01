import Player from './player.js';
import { coin } from './utils.js';
import Computer from './computer.js';

export default function Game() {
  let winner = null;
  let turn = coin();
  let started = false;
  const player = Player();
  const computer = Computer();
  const processAttack = (x, y) => {
    const attackResult = computer.receiveAttack(x, y);
    if (attackResult === 'hitempty') turn = !turn;
    return attackResult;
  };
  const start = () => {
    started = true;
    return true;
  };

  const getWinner = () => winner;
  const getTurn = () => turn;
  const placeShip = (x, y, length, d) => {
    const cellIsAvailable = checkCell(x, y, length, d);
    if (cellIsAvailable) {
      player.gameboard.placeShipByHead([x, y], length, d);
      return true;
    }
    return false;
  };
  const randomPlace = () => player.randomise();
  const reset = () => player.resetBoard();
  //
  return {
    reset,
    placeShip,
    processAttack,
    start,
    getWinner,
    getTurn,
    randomPlace,
    checkCell,
    get started() {
      return started;
    },
  };
}
