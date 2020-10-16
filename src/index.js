import Phaser from 'phaser'
import GameScene from './gameScene.js';

// Our game scene
var gameScene = new GameScene();


//* Game scene */
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
};
var game = new Phaser.Game(config);

// load scenes
game.scene.add("game", gameScene);

// start title
game.scene.start('gameScene');
