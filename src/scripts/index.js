import '../styles/styles.css';
import * as dom from './domel.js';
import Game from './game.js';
stopPlayingActions();
function onHoverColor(x, y, length, d) {
  const result = game.placeShipPreview(x, y, length, d, true);
  const av = result.booleanResult;
  result.spots.forEach(v => {
    const t = dom.player1Grid.querySelector(
      `[data-x="${v[0]}"][data-y="${v[1]}"]`,
    );
    t.classList.add('tmp');
  });
}
function rmTmpColor() {
  const tmpColored = dom.player1Grid.querySelectorAll('.tmp');
  if (!tmpColored.length) return;
  tmpColored.forEach(v => v.classList.remove('tmp'));
}
function startPlayingActions() {
  dom.right.classList.remove('hide');
  dom.exit.classList.remove('hide');
  dom.play.classList.add('hide');
  dom.reset.classList.add('hide');
  dom.randomise.classList.add('hide');
}
function stopPlayingActions() {
  dom.right.classList.add('hide');
  dom.exit.classList.add('hide');
  dom.play.classList.remove('hide');
  dom.reset.classList.remove('hide');
  dom.randomise.classList.remove('hide');
}
let selectedShip = null;
initDomBoard(dom.player1Grid);
initDomBoard(dom.player2Grid);
function shipNotPlacedWarning() {
  dom.msg.textContent = 'asdfasdf';
}
let game = Game();
document.addEventListener('keypress', e => {
  if (e.key === 'escape') {
    selectedShip = null;
  }
});
dom.shipBox.addEventListener('click', e => {
  if (!e.target.classList.contains('ship')) return;
});
dom.randomise.addEventListener('click', e => {
  game.randomPlace();
});
dom.play.addEventListener('click', () => {
  const suc = game.start();
  if (suc) shipNotPlacedWarning();
  else {
    // startRender();
    startPlayingActions();
  }
});
dom.exit.addEventListener('click', () => {
  game.exit();
  endRender();
});
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
