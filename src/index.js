import Phaser from 'phaser'
import GameScene from './scenes/GameScene.js';
import TitleScene from './scenes/TitleScene.js';

// Setup variables
var client = new Colyseus.Client('ws://134.209.68.198:2567');
var gameScene = new GameScene();
var titleScene = new TitleScene();

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
