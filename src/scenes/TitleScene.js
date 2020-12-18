import Phaser from 'phaser';
import GameScene from './GameScene.js';
import GameOverScene from './GameOverScene.js';
import discord from '../assets/socialMediaIcons/discordJoinLogo.svg';
import patreon from '../assets/socialMediaIcons/patreonJoinLogo.svg';
import {client, clientJoin , room } from "../components/client.js";


class TitleScene extends Phaser.Scene {

	constructor() {
		super({key:'titleScene'});
	}

	preload() {
		this.load.svg('discordJoinImage', discord, { scale: 0.1 })
		this.load.svg('patreonJoinImage', patreon, { scale: 0.5 })

	}

	create() {
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
		simulateGameEnd.setInteractive({ useHandCursor: true });
		simulateGameEnd.on('pointerdown', () => {
			this.scene.switch('gameOverScene')
		})

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
			var discordIcon = this.add.image(30, window.innerHeight - 30, 'discordJoinImage')
			discordIcon.setInteractive({useHandCursor:true})
			discordIcon.on('pointerdown', () => {
				let discordWebsite = window.open('https://discord.gg/mEF8nTF2DX')
			})
			var patreonIcon = this.add.image(60, window.innerHeight - 30, 'patreonJoinImage')
			patreonIcon.setInteractive({useHandCursor:true})
			patreonIcon.on('pointerdown', () => {
				let patreonWebsite = window.open('https://www.patreon.com/dokmiOfficial')
			})


			// var dokmiBoxOutline = this.add.rectangle(window.innerWidth * 0.50, window.innerHeight*0.25, 650, 200, 0xFFFFFF)
			// var dokmiBoxFill = this.add.rectangle(window.innerWidth * 0.50, window.innerHeight*0.25, 640, 190, 0x56ac68)
			// var dokmiText = this.add.text(window.innerWidth*0.25 + 100, window.innerHeight*0.25-60, "DOKMI.IO",{fontSize: 125})
		} else {
			var invalid = this.add.text(window.innerWidth*0.1, window.innerHeight*0.5, "screen size not valid")
		}
	}
}

export default TitleScene;
