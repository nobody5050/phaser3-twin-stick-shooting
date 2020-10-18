import Phaser from 'phaser'
import GameScene from './scenes/GameScene.js';

// Our game scene
var gameScene = new GameScene();


//* Game scene */
const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  backgroundColor: '#56ac68',
  width: 1920,
  height: 1080,
  physics: {
    default: 'arcade',
  },
  input: {
    activePointers: 3, // 2 is default for mouse + pointer, +1 is required for dual touch
  },
};
var game = new Phaser.Game(config);

// load scenes
game.scene.add("game", gameScene);

// start title
game.scene.start('gameScene');
