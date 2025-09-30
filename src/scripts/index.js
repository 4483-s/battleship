import '../styles/styles.css';
import * as dom from './domel.js';
import Game from './game.js';
dom.right.classList.add('hide');
dom.exit.classList.add('hide');
//generate board
for (let i = 9; i >= 0; i--)
  for (let j = 0; j < 10; j++) {
    const point = document.createElement('div');
    point.classList.add('empty');
    point.setAttribute('data-x', j);
    point.setAttribute('data-y', i);
    grid.append(point);
  }
//
let game = Game();
function userAttack(e) {}
dom.play.addEventListener('click', e => {
  if (!shipPlaced) {
    showPlaceShipWarnding();
    return;
  }
});
dom.randomise.addEventListener('click', e => {});
dom.reset.addEventListener('click', e => {
  game.reset(0);
});
dom.exit.addEventListener('click', e => {
  game = Game();
});
