import '../styles/styles.css';
import * as dom from './domel.js';
import Game from './game.js';
initDomBoard(dom.player1Grid);
initDomBoard(dom.player2Grid);
let selectedShip = null;
let game = Game();
document.addEventListener('play', e => {
  dom.right.classList.remove('hide');
  dom.exit.classList.remove('hide');
  dom.play.classList.add('hide');
  dom.randomise.classList.add('hide');
});
document.addEventListener('renderHuman', e => {});
document.addEventListener('renderComputer', e => {});
document.addEventListener('humansTurn', e => {});
document.addEventListener('computersTurn', e => {});
document.addEventListener('placeShipHover', e => {});
document.addEventListener('uiReset', e => {});
document.addEventListener('placeShip', e => {});
document.addEventListener('randomise', e => {});
document.addEventListener('keypress', e => {
  if (e.key === 'escape') {
    selectedShip.target.classList.remove('selected');
    selectedShip = null;
  }
});
dom.shipBox.addEventListener('click', e => {
  if (!e.target.classList.contains('ship')) return;
  const length = e.target.getAttribute('length');
  const d = 'right';
  e.target.classList.add('selected');
  selectedShip = { length, d, target: e.target };
});
//
dom.randomise.addEventListener('click', e => game.randomPlace());
dom.play.addEventListener('click', () => game.play());
dom.exit.addEventListener('click', () => game.exit());
//
//
//
//
//
//
//
//
//
function initDomBoard(grid) {
  for (let i = 9; i >= 0; i--)
    for (let j = 0; j < 10; j++) {
      const point = document.createElement('div');
      point.classList.add('empty');
      point.setAttribute('data-x', j);
      point.setAttribute('data-y', i);
      grid.append(point);
    }
}
