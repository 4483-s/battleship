import Gameboard from './gameboard';
export default function Player() {
  const gameboard = new Gameboard();
  const getSpotStatus = (x, y) => {
    const t = gameboard.spots[`${x},${y}`];
    const obj = {};
    obj.ship = !!t.ship;
    obj.discovered = !!t.discovered;
    obj.hitShip = !!t.hitShip;
    return obj;
  };
  const randomise = () => gameboard.randomPlace();
  const resetBoard = () => gameboard.clearBoard();
  const receiveAttack = (x, y) => gameboard.receiveAttack(x, y);
  const placeShipCheck = (x, y, length, d) =>
    gameboard.checkCellAvailabilityForShip(x, y, length, d);
  const placeShip = (head, length, d) => gameboard.placeShipByHead;
  return {
    getSpotStatus,
    randomise,
    receiveAttack,
    resetBoard,
    placeShipCheck,
  };
}
