import Player from './player';
export default function Computer() {
  const { getSpotInfo, receiveAttack, randomise, forEachSpot } = Player();
  function attack(humanObj) {
    const arr = [];
    humanObj.forEachSpot(v => {
      if (v.discovered) arr.push(v.spot);
    });
    const r = Math.floor(Math.random() * arr.length);
    return humanObj.receiveAttack(...arr[r]);
  }
  return {
    getSpotInfo,
    receiveAttack,
    randomise,
    forEachSpot,
    attack,
  };
}
//
