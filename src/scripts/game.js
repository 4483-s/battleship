import Player from './player.js';
import { coin } from './utils.js';
import Computer from './computer.js';

export default function Game() {
  let winner = null;
  let turn = coin();
  let started = false;
  const player = new Player();
  const computer = new Computer();
  const processAttack = (x, y) => {
    const attackResult = computer.gamboard.receiveAttack(x, y);
    if (attackResult === 'hitempty') turn = !turn;
    return attackResult;
  };
  const start = () => {
    started = true;
    return true;
  };

  const getWinner = () => winner;
  const getTurn = () => turn;
  const checkCell = (x, y, length, d) => {
    return computer.gamboard.checkCellAvailabilityForShip(x, y, length, d);
  };
  const placeShip = (x, y, length, d) => {
    const cellIsAvailable = checkCell(x, y, length, d);
    if (cellIsAvailable) {
      player.gamboard.placeShipByHead([x, y], length, d);
      return true;
    }
    return false;
  };
  const randomPlace = () => {
    player.randomnise();
  };
  const reset = () => {
    player.gamboard.clearBoard();
  };
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
