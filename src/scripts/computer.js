import Player from './player';
export default function Computer() {
  const { getSpotStatus, randomise, receiveAttack } = Player();
  async function autoAttack(humanGameBoard) {
    const arr = [];
    for (const key in humanGameBoard.spots) {
      const c = humanGameBoard.spots[key];
      if (!c.discovered) arr.push.c.spot;
    }
    const r = Math.floor(Math.random() * arr.length);
    humanGameBoard.receiveAttack(...arr[r]);
    return await promise();
  }
  const promise = () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve('done');
      }, 1500);
    });

  return { getSpotStatus, autoAttack, randomise, receiveAttack };
}
