import Phaser from 'phaser';
import GameScene from './GameScene.js';
import TitleScene from './TitleScene.js';
import {client, clientJoin , room } from "../components/client.js";

class GameOverScene extends Phaser.Scene {

    constructor() {
        super({key: 'gameOverScene'});
    }

    preload() {

    }

    create() {
        var rejoin = this.add.text(100,100,"rejoin")
            .setInteractive({useHandCursor: true})
        var serverJoin
        serverJoin = clientJoin(serverJoin, this, text, "battle")
        rejoin.on('pointerdown', () => {
            this.scene.switch('gameScene')
        });
    }

}

export default GameOverScene;