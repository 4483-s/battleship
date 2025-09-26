import Gameboard from './gameboard.js';
// it('gameboard',()=>{
//
// })
// for (const k in n.board) {
//   const cur =
//   console.log(n.board[k].point);
// }
function logGend() {
  const n = new Gameboard(true);
  n.randomPlace(4, 3, 3, 2, 2, 2, 1, 1, 1, 1);
  const arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push(new Array(10));
  }
  for (const k in n.board) {
    const cur = n.board[k];
    const [x, y] = cur.point;
    // console.log(`${cur.point}: ${cur.ship ? cur.ship.length : 'noship'}`);
    if (cur.ship) arr[y][x] = cur.ship.length;
    else arr[y][x] = '.';
    // arr[y][x] = cur.ship ? cur.ship.length : 'n';
  }
  arr.reverse();

  console.log(arr.map(v => v.join(' ')));
}
function loop(n) {
  for (let i = 0; i < n; i++) {
    logGend();
  }
}
loop(19);
