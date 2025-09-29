import '../styles/styles.css';
import * as dom from './dom.js';
import startGame from './game.js';
dom.right.classList.add('hide');
dom.exit.classList.add('hide');
function userAttack(e) {}
dom.play.addEventListener('click', e => {
  if (!shipPlaced) {
    showPlaceShipWarnding();
    return;
  }
  startGame();
});
dom.randomise.addEventListener('click', e => {});
dom.reset.addEventListener('click', e => {});
dom.exit.addEventListener('click', e => {});
function initBoardHtml(grid) {
  for (let i = 9; i >= 0; i--)
    for (let j = 0; j < 10; j++) {
      const point = document.createElement('div');
      point.classList.add('empty');
      point.textContent = `${j},${i}`;
      grid.append(point);
    }
}
