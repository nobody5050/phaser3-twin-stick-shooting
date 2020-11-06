import Phaser from 'phaser';
import GameScene from './GameScene.js';
import discord from '../assets/socialMediaIcons/discordJoinLogo.svg';
//remove for now
//import client from '../index.js'
import {client, clientJoin  } from "../components/client.js";

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
		var serverJoin;

		var text = this.add.text(100,100, 'enter test lobby');
		text.setInteractive({ useHandCursor: true });
		text.on('pointerdown', () => {
			
			this.scene.switch('gameScene')

		});

		var connect = this.add.text(200,200, 'conncect');
		connect.setInteractive({useHandCursor: true});
		connect.on('pointerdown', () => {
			try {
				const room = client.joinOrCreate("battle", {/* options */});
				console.log("joined successfully", room);
				serverJoin = this.add.text(window.innerWidth*0.05,window.innerHeight*0.05, 'joined server sucessfully');

			} catch (e) {
				console.error("join error", e);
				serverJoin = this.add.text(window.innerWidth*0.05,window.innerHeight*0.05, 'join error');
			}
		})

		// this.textures.addImage("discordJoinImage", 'src/assets/socialMediaIcons/discordJoinLogo.png')
		var discordIcon = this.add.image(window.innerWidth*0.05, window.innerHeight*0.95, 'discordJoinImage')

	}
}

export default TitleScene;
