import Phaser from 'phaser'
import GameScene from './scenes/GameScene.js';
import TitleScene from './scenes/TitleScene.js';

// Setup variables
var gameScene = new GameScene();
var titleScene = new TitleScene();

//* Game scene */
const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  backgroundColor: '#69A84F',
  width: 1000px,
  height: 1000px,
  physics: {
    default: 'arcade',
  },
  input: {
    activePointers: 3, // 2 is default for mouse + pointer, +1 is required for dual touch
  },
};
var game = new Phaser.Game(config);

// load scenes
game.scene.add('titleScene', titleScene);
game.scene.add("game", gameScene);

// start title
game.scene.start('titleScene');
