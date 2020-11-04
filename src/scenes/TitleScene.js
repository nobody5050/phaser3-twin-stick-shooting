import Phaser from 'phaser';
import GameScene from './GameScene.js';
import discord from '../assets/socialMediaIcons/discordJoinLogo.png';

class TitleScene extends Phaser.Scene {

	constructor() {
		super({key:'titleScene'});
	}

	preload() {
		// this.load.image('background', 'images/background.jpg');
		this.load.image('discordJoinImage', discord)
	}

	create() {
		// var bg = this.add.sprite(0,0,'background');
		// bg.setOrigin(0,0);

		var text = this.add.text(100,100, 'enter test lobby');
		text.setInteractive({ useHandCursor: true });
		text.on('pointerdown', () => this.scene.switch('gameScene'));


		// this.textures.addImage("discordJoinImage", 'src/assets/socialMediaIcons/discordJoinLogo.png')
		var discordIcon = this.add.image(window.innerWidth*0.05, window.innerHeight*0.95, 'discordJoinImage')

	}
}

export default TitleScene;
