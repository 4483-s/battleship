import Gameboard from './gameboard';
export default function Player() {
  const gameboard = new Gameboard();
  const getSpotInfo = (x, y) => {
    const t = gameboard.spots[`${x},${y}`];
    const obj = {};
    obj.ship = !!t.ship;
    obj.spot = t.spot;
    obj.discovered = !!t.discovered;
    obj.hitShip = !!t.hitShip;
    return obj;
  };
  const forEachSpot = callback => {
    for (let i = 0; i < 10; i++)
      for (let j = 0; j < 10; j++) {
        const info = getSpotInfo(i, j);
        callback(info);
      }
  };
  const randomise = () => gameboard.randomPlace();
  const receiveAttack = (x, y) => gameboard.receiveAttack(x, y);
  return {
    gameboard,
    getSpotInfo,
    receiveAttack,
    randomise,
    forEachSpot,
  };
}
