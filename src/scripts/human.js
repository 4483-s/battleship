import Player from './player';
export default function Human() {
  const { gameboard, getSpotInfo, receiveAttack, randomise, forEachSpot } =
    Player();
  const resetBoard = () => gameboard.clearBoard();
  const placeShipCheck = (x, y, length, d, verbose) =>
    gameboard.checkCellAvailabilityForShip(x, y, length, d, verbose);
  const placeShip = (x, y, length, d) => gameboard.placeShip(x, y, length, d);
  const getShipCount = () => gameboard.shipCount;
  return {
    getShipCount,
    getSpotInfo,
    receiveAttack,
    randomise,
    forEachSpot,
    resetBoard,
    placeShipCheck,
    placeShip,
  };
}
