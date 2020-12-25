import Phaser from 'phaser';
import playerImg from '../assets/player.png'
import joystickImg from '../assets/joystick.png'
import bulletImg from '../assets/bullet.png'
import rexvirtualjoystickplugin from '../plugins/rexvirtualjoystickplugin.min.js'
import {client, clientJoin, room} from '../components/client.js';
import {Dev, Hi_Power, Stechkin_APS} from '../components/guns/GunsHandler.js';

var keysDown = 0
var keyListDown = [false, false, false, false]
var currentGun = "Dev"
var BULLET_SPEED = currentGun.speed; //this is incredibly hacky, but it just might work haha
var MAX_PLAYER_SPEED = 1; //even more hacky
// var tempLocation = {'x': NaN, 'y': NaN}

class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bullet')

        this.born = 0
    }

    fire(shooter) {
        this.setRotation(shooter.rotation)

        // Offset the bullet to start a bit right of the shooter
        this.x = shooter.x + (50 * Math.cos(this.rotation))
        this.y = shooter.y + (50 * Math.sin(this.rotation))


        this.setVelocityX(BULLET_SPEED * Math.cos(Math.PI * this.angle / 180))
        this.setVelocityY(BULLET_SPEED * Math.sin(Math.PI * this.angle / 180))

        this.born = 0
    }
}

class GameScene extends Phaser.Scene {


    constructor() {
        super({key: 'gameScene'});
    }

    preload() {
        this.load.image('player', playerImg)
        this.load.image('joystick', joystickImg)
        this.load.image('bullet', bulletImg)

        this.load.plugin('rexvirtualjoystickplugin', rexvirtualjoystickplugin, true)
    }

    create() {

        var w = this.input.keyboard.addKey('W');
        var a = this.input.keyboard.addKey('A');
        var s = this.input.keyboard.addKey('S');
        var d = this.input.keyboard.addKey('D');

        // Create player
        this.player = this.physics.add.sprite(200, 200, 'player')
        this.player.setCollideWorldBounds(true)
        this.player.setOrigin(0.5, 0.5) // Set origin for bullet fire start
        this.player.setScale(.4)

        // Create movement joystick
        this.movementJoyStick = this.plugins.get('rexvirtualjoystickplugin').add(this.scene, {
            x: window.innerWidth * 0.1,
            y: window.innerHeight * 0.8,
            radius: 40,
            forceMin: 0,
            base: this.add.circle(0, 0, 60, 0x888888).setDepth(100).setAlpha(0.25),
            thumb: this.add.image(0, 0, 'joystick').setDisplaySize(80, 80).setDepth(100).setAlpha(0.5),
        }).on('update', () => {
        }, this)

        // Create shooting joystick
        this.shootJoyStick = this.plugins.get('rexvirtualjoystickplugin').add(this.scene, {
            x: window.innerWidth * 0.9,
            y: window.innerHeight * 0.8,
            radius: 20,
            forceMin: 0,
            base: this.add.circle(0, 0, 60, 0x888888, 0.5).setDepth(100).setAlpha(0.25),
            thumb: this.add.image(0, 0, 'joystick').setDisplaySize(80, 80).setDepth(100).setAlpha(0.5),
        }).on('update', () => {
        }, this)

        // Move joysticks dynamically based on pointer-down
        this.input.on('pointerdown', (pointer) => {
            if (pointer.x <= this.cameras.main.width * 0.4) {
                this.movementJoyStick.base.setPosition(pointer.x, pointer.y).setAlpha(0.5)
                this.movementJoyStick.thumb.setPosition(pointer.x, pointer.y).setAlpha(1)
            }
            if (pointer.x >= this.cameras.main.width * 0.6) {
                this.shootJoyStick.base.setPosition(pointer.x, pointer.y).setAlpha(0.5)
                this.shootJoyStick.thumb.setPosition(pointer.x, pointer.y).setAlpha(1)
            }
        })

        // Add transparency to joysticks on pointer-up
        this.input.on('pointerup', (pointer) => {
            if (!this.movementJoyStick.force) {
                this.movementJoyStick.base.setAlpha(0.25)
                this.movementJoyStick.thumb.setAlpha(0.5)
                this.movementJoyStick.base.setPosition(window.innerWidth * 0.1, window.innerHeight * 0.8)
                this.movementJoyStick.thumb.setPosition(window.innerWidth * 0.1, window.innerHeight * 0.8)
            }
            if (!this.shootJoyStick.force) {
                this.shootJoyStick.base.setAlpha(0.25)
                this.shootJoyStick.thumb.setAlpha(0.5)
                this.shootJoyStick.base.setPosition(window.innerWidth * 0.9, window.innerHeight * 0.8)
                this.shootJoyStick.thumb.setPosition(window.innerWidth * 0.9, window.innerHeight * 0.8)
            }
        })

        w.on('down', function (event) {
            keysDown += 1;
            keyListDown[0] = true;

            move()
        })
        w.on('up', function (event) {
            keysDown -= 1;
            keyListDown[0] = false;
            // let movement = sendMoveRequests(this.player,"keyboard")
            // this.player.setVelocityX(movement.x)
            // this.player.setVelocityY(movement.y)
            move()
        })
        a.on('down', function (event) {
            keysDown += 1;
            keyListDown[1] = true;
            // let movement = sendMoveRequests(this.player,"keyboard")
            // this.player.setVelocityX(movement.x)
            // this.player.setVelocityY(movement.y)
            move()
        })

        a.on('up', function (event) {
            keysDown -= 1;
            keyListDown[1] = false;
            // let movement = sendMoveRequests(this.player,"keyboard")
            // this.player.setVelocityX(movement.x)
            // this.player.setVelocityY(movement.y)
            move()
        })
        s.on('down', function (event) {
            keysDown += 1;
            keyListDown[2] = true;
            // let movement = sendMoveRequests(this.player,"keyboard")
            // this.player.setVelocityX(movement.x)
            // this.player.setVelocityY(movement.y)
            move()
        })

        s.on('up', function (event) {
            keysDown -= 1;
            keyListDown[2] = false;
            // let movement = sendMoveRequests(this.player,"keyboard")
            // this.player.setVelocityX(movement.x)
            // this.player.setVelocityY(movement.y)
            move()
        })
        d.on('down', function (event) {
            keysDown += 1;
            keyListDown[3] = true;
            // let movement = sendMoveRequests(this.player,"keyboard")
            // this.player.setVelocityX(movement.x)
            // this.player.setVelocityY(movement.y)
            move()
        })

        d.on('up', function (event) {
            keysDown -= 1;
            keyListDown[3] = false;
            // let movement = sendMoveRequests(this.player,"keyboard")
            // this.player.setVelocityX(movement.x)
            // this.player.setVelocityY(movement.y)
            move()
        })

        function move() {
            let movement = sendMoveRequests(this.player, "keyboard")
            this.player.setVelocityX(movement.x)
            this.player.setVelocityY(movement.y)

        }

        this.bullets = this.physics.add.group({classType: Bullet, runChildUpdate: true})
        this.bulletCooldown = 0
    }

    update(time, delta) {

        this.born += delta
        if (this.born > 1500) {
            this.destroy()
        }

        if (this.bulletCooldown > 0) {
            // Reduce bullet cooldown
            this.bulletCooldown -= delta
        }

        if (this.shootJoyStick.force) {
            // Rotate according to joystick
            this.player.setAngle(this.shootJoyStick.angle)

            // Fire bullet according to joystick
            if (this.shootJoyStick.force >= this.shootJoyStick.radius && this.bulletCooldown <= 0) {
                const bullet = this.bullets.get().setActive(true).setVisible(true)
                bullet.fire(this.player)

                this.bulletCooldown = 100
            }
        }

        if (this.movementJoyStick.force) {
            // Calculate speed based on joystick force
            let speedMultiplier = (this.movementJoyStick.force < this.movementJoyStick.radius) ? this.movementJoyStick.force / this.movementJoyStick.radius : 1
            let speed = MAX_PLAYER_SPEED * speedMultiplier

            // Move player according to movement joystick
            console.log("p/180MA " + Math.PI * this.movementJoyStick.angle / 180)
            console.log("pMA " + Math.PI * this.movementJoyStick.angle)
            console.log("MA " + this.movementJoyStick.angle)

            let movement = sendMoveRequests(this.player, "joystick", speed, this.movementJoyStick.angle)
            this.player.setVelocityX(movement.x)
            this.player.setVelocityY(movement.y)
            // this.player.setVelocityX(speed * Math.cos(Math.PI * this.movementJoyStick.angle / 180))
            // this.player.setVelocityY(speed * Math.sin(Math.PI * this.movementJoyStick.angle / 180))
        } else {
            // Stop moving

            let movement = sendMoveRequests(this.player, "keyboard")

            if (movement.x == 0 && movement.y == 0) {

            } else {

                this.player.setVelocityX(movement.x)
                this.player.setVelocityY(movement.y)
            }
        }

        if (keysDown < 0) {
            console.log("keys up extra error")
            keysDown = 0
        }
    }
}

/*
keyboard
0 is right
90 is up
180 is left
270 is down
then *-1
 */
function sendMoveRequests(className, type, speed = 1, angle = 0,) { //includes actually moving
    // let speed, angle;
    if (type == "keyboard") {
        // speed = 1;

        if (keyListDown[0] == true && keyListDown[1] == true && keyListDown[2] == true && keyListDown[3] == true) {
            speed = 0;
            angle = 0;
        } else if (keyListDown[0] == false && keyListDown[1] == true && keyListDown[2] == false && keyListDown[3] == true) {
            angle = 0;
            speed = 0;
        } else if (keyListDown[0] == true && keyListDown[1] == false && keyListDown[2] == true && keyListDown[3] == false) {
            angle = 0;
            speed = 0;
        } else if (keyListDown[0] == false && keyListDown[1] == true && keyListDown[2] == true && keyListDown[3] == true) {
            angle = 270;
        } else if (keyListDown[0] == true && keyListDown[1] == true && keyListDown[2] == false && keyListDown[3] == true) {
            angle = 90;
        } else if (keyListDown[0] == true && keyListDown[1] == false && keyListDown[2] == true && keyListDown[3] == true) {
            angle = 0;
        } else if (keyListDown[0] == true && keyListDown[1] == true && keyListDown[2] == true && keyListDown[3] == false) {
            angle = 180;
        } else if (keyListDown[0] == false && keyListDown[1] == false && keyListDown[2] == true && keyListDown[3] == false) {
            angle = 270;
        } else if (keyListDown[0] == true && keyListDown[1] == false && keyListDown[2] == false && keyListDown[3] == false) {
            angle = 90;
        } else if (keyListDown[0] == false && keyListDown[1] == false && keyListDown[2] == false && keyListDown[3] == true) {
            angle = 0;
        } else if (keyListDown[0] == false && keyListDown[1] == true && keyListDown[2] == false && keyListDown[3] == false) {
            angle = 180;
        } else if (keyListDown[0] == true && keyListDown[1] == true && keyListDown[2] == false && keyListDown[3] == false) {
            angle = 135;
        } else if (keyListDown[0] == false && keyListDown[1] == true && keyListDown[2] == true && keyListDown[3] == false) {
            angle = 225;
        } else if (keyListDown[0] == false && keyListDown[1] == false && keyListDown[2] == true && keyListDown[3] == true) {
            angle = 305;
        } else if (keyListDown[0] == true && keyListDown[1] == false && keyListDown[2] == false && keyListDown[3] == true) {
            angle = 45;
        }
        angle *= -1

    } else if (type == "joystick") {
//nothing i think needs to happen
    }
    // console.log("This: " + className)
    // console.log(speed + "speed")
    // console.log(angle + "angle")
    let x = speed * Math.cos(Math.PI * angle / 180)
    let y = speed * Math.sin(Math.PI * angle / 180)

    return {'x': x, 'y': y};

    // room.send("move", {speed: speed, angle: angle})
    // ^reenable once server online
}

function sendFireRequests(angle) {
    //maybe add logic later


    // room.send("fire", {angle:angle})
    // ^reenable once server online
}

export default GameScene;
