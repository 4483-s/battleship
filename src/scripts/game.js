import Player from './player.js';
import Computer from './computer.js';
import { coin } from './utils.js';

function Game() {
  let over;
  let turn = coin();
  const player = new Player(true);
  const computer = new Computer(true);
}
