import Player from './player';
export class Computer extends Player {
  constructor(initBoard, smart) {
    super(initBoard);
    this.smart = smart;
  }
}
