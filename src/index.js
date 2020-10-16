import Phaser from 'phaser'
import GameScene from './scenes/GameScene.js';

// Our game scene
var gameScene = new GameScene();


//* Game scene */
const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  backgroundColor: '#56ac68',
  width: '100%',
  height: '100%',
  physics: {
    default: 'arcade',
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
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
