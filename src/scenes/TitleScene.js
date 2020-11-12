import Phaser from 'phaser';
import GameScene from './GameScene.js';
import discord from '../assets/socialMediaIcons/discordJoinLogo.svg';
//remove for now
//import client from '../index.js'
import {client, clientJoin , room } from "../components/client.js";

//import Colyseus from "colyseus.js";
//let colyseusClient = new Colyseus.Client("ws://134.209.68.198:2567");

class TitleScene extends Phaser.Scene {

	constructor() {
		super({key:'titleScene'});
	}

	preload() {
		// this.load.image('background', 'images/background.jpg');
		this.load.image('discordJoinImage', discord, { scale: 0.005 })
	}

	create() {
		// var bg = this.add.sprite(0,0,'background');
		// bg.setOrigin(0,0);
		var lobbyJoin;
		lobbyJoin = clientJoin(lobbyJoin, this, "onStart", "lobby", window.innerWidth*0.95, window.innerHeight*0.05)


		var serverJoin;

		var text = this.add.text(100,100, 'enter test lobby');
		text.setInteractive({ useHandCursor: true });
		serverJoin = clientJoin(serverJoin, this, text, "battle")
		text.on('pointerdown', () => {
			this.scene.switch('gameScene')
		});
		var simulateGameEnd = this.add.text(100, 150, 'simulate game end')
		simulateGameEnd.on('pointerdown', () => {
			this.scene.switch('gameOverScene')
		})

		// var connect = this.add.text(200,200, 'conncect');
		// connect.setInteractive({useHandCursor: true});
		// serverJoin = clientJoin(serverJoin, this, connect, "battle")

		// this.textures.addImage("discordJoinImage", 'src/assets/socialMediaIcons/discordJoinLogo.png')

		/*
		Window needs to be greater than:
			currently 700px tall
			and 1000 px wide, might change in the future
		 */
		let valid = true;
		if (window.innerHeight < 700) {
			console.log("page not tall enough")
			valid = false
		}
		if (window.innerWidth < 700) {
			console.log("page not wide enough")
			valid = false
		}
		if (valid) {
			var discordIcon = this.add.image(window.innerWidth * 0.05, window.innerHeight * 0.95, 'discordJoinImage').setDisplaySize(20, 30)

			var dokmiBoxOutline = this.add.rectangle(window.innerWidth * 0.25, 300, window.innerWidth * 0.5, 200, "white")
			var dokmiBoxOutline = this.add.rectangle(window.innerWidth * 0.25 + 5, 295, window.innerWidth * 0.5 - 10, 190, "#56ac68")
		} else {
			var invalid = this.add.text(window.innerWidth*0.1, window.innerHeight*0.5, "screen size not valid")
		}
	}
}

export default TitleScene;
