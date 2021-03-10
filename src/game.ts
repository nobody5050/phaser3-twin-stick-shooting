import 'phaser';
import { GameConfig } from './config';

export class Game extends phaser.Game {
  constructor(config: phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener('load', () => {
  const game = new Game(GameConfig);
});
