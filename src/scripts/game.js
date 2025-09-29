import Player from './player.js';
import { coin } from './utils.js';

export default function Game() {
  //player1 will always get represented as 0, player2 is 1
  //turn = true means player2 should get attacked
  let winner = null;
  let turn = coin();
  let started = false;
  const player1 = new Player(true);
  const player2 = new Player(true);
  const processAttack = (attackedPlayer, x, y) => {
    if (!!attackedPlayer === turn) return 'wrongplayer';
    const targetPlayer = attackedPlayer ? player2 : player1;
    const attackResult = targetPlayer.gamboard.receiveAttack(x, y);
    if (attackResult === 'hitempty') turn = !turn;
    if (targetPlayer.gamboard.isDestroyed()) winner = attackedPlayer ? 0 : 1;
    return attackResult;
  };
  const start = () => (started = true);

  const getWinner = () => winner;
  const getTurn = () => turn;
  const checkCell = (player, x, y, length, d) => {
    const targetPlayer = player ? player2 : player1;
    return targetPlayer.gamboard.checkCellAvailabilityForShip(x, y, length, d);
  };
  const placeShip = (player, x, y, length, d) => {
    const targetPlayer = player ? player2 : player1;
    if (checkCell(player, x, y, length, d)) {
      targetPlayer.gamboard.placeShipByHead([x, y], length, d);
    }
  };
  function randomPlace(player) {
    const targetPlayer = player ? player2 : player1;
    targetPlayer.gamboard.randomPlace();
  }
  //
  return {
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
