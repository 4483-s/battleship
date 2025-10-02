import { coin } from './utils.js';
import Computer from './computer.js';

import Human from './human.js';

export default function Game() {
  let winner = null;
  let status = 'preparing';
  const human = Human();
  const computer = Computer();
  let turn = coin();
  computer.randomise();
  const humanAttack = (x, y) => {
    const attackResult = computer.receiveAttack(x, y);
    if (attackResult === 'hitempty') turn = !turn;
    return;
  };
  const computerAttack = () => computer.attack(human);
  const start = () => {
    if (human.getShipCount() === 10) {
      status = 'started';
      return true;
    }
    return false;
  };
  const getWinner = () => winner;
  const placeShip = (x, y, length, d) => human.placeShip(x, y, length, d);
  const placeShipPreview = (x, y, length, d, verbose) =>
    human.placeShipCheck(x, y, length, d, verbose);
  const randomPlace = () => human.randomise();
  const reset = () => human.resetBoard();
  const getStatus = () => status;
  const exit = () => {
    human.resetBoard();
    computer.randomise();
    status = 'preparing';
  };
  // const shipIsplaced = () => human.getShipCount() === 10;
  const forEachHumanSpot = v => human.forEachSpot(v);
  const forEachComputerSpot = v => computer.forEachSpot(v);
  return {
    // shipIsplaced,
    computerAttack,
    forEachHumanSpot,
    forEachComputerSpot,
    exit,
    placeShipPreview,
    getStatus,
    reset,
    placeShip,
    humanAttack,
    start,
    getWinner,
    randomPlace,
  };
}
const wait = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve('done');
    }, 1500);
  });
