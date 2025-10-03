import { coin } from './utils.js';
import Computer from './computer.js';
import Human from './human.js';
const renderComputer = new CustomEvent('renderComputer');
const renderHuman = new CustomEvent('renderHuman');
const humansTurnEvent = new CustomEvent('humansTurn');
const computersTurnEvent = new CustomEvent('computersTurn');
const playEvent = new CustomEvent('play');
const uiResetEvent = new CustomEvent('uiReset');
export default function Game() {
  const gameStarted = false;
  const human = Human();
  const computer = Computer();
  const attack = (x, y) => {
    const attackResult = computer.receiveAttack(x, y);
    document.dispatchEvent(renderComputer);
    if (attackResult === 'hitempty') {
      document.dispatchEvent(computersTurnEvent);
      computerAttack();
    }
  };
  const computerAttack = () => {
    const id = setInterval(() => {
      const result = computer.attack(human);
      document.dispatchEvent(renderHuman);
      if (result === 'hitempty') {
        clearInterval(id);
        document.dispatchEvent(humansTurnEvent);
      }
    }, 1500);
  };
  const placeShip = (x, y, length, d) => {
    human.placeShip(x, y, length, d);
    document.dispatchEvent(renderHuman);
    document.dispatchEvent(new CustomEvent('placeShip'));
  };
  const placeShipCheck = (x, y, length, d) => {
    const result = human.placeShipCheck(x, y, length, d, true);
    const e = new CustomEvent('placeShipHover', { detail: result });
    document.dispatchEvent(e);
  };
  const exit = () => {
    document.dispatchEvent(uiResetEvent);
    human.resetBoard();
    computer.randomise();
    gameStarted = false;
  };
  const play = () => {
    if (human.getShipCount() !== 10) {
      document.dispatchEvent(new CustomEvent('playFailed'));
      return;
    }
    document.dispatchEvent(playEvent);
    if (coin()) {
      computerAttack();
    }
  };
  const randomPlace = () => {
    human.randomise();
    document.dispatchEvent(renderHuman);
    document.dispatchEvent(new CustomEvent('randomise'));
  };
  return { play, placeShip, placeShipCheck, attack, exit, randomPlace };
}
