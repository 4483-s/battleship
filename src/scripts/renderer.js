import dom from './domel.js';
export default function render(board, domGrid) {
  for (const key in board) {
    const spotObj = board[key];
    const [x, y] = spotObj.spot;
    const targetDomEl = domGrid.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    if (spotObj.hitShip) {
      targetDomEl.classList.add('hitShip');
      targetDomEl.classList.remove('empty');
    } else if (spotObj.discovered) {
      targetDomEl.classList.add('discovered');
      targetDomEl.classList.remove('empty');
    }
  }
}
