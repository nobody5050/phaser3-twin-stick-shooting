class GameScene extends Phaser.Scene {

	constructor() {
		super({key : 'gameScene'});
	}

	preload() {
		
	}

	create() {
	   

	}

	update(time, delta) {
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
			this.player.setVelocityX(speed * Math.cos(Math.PI * this.movementJoyStick.angle / 180))
			this.player.setVelocityY(speed * Math.sin(Math.PI * this.movementJoyStick.angle / 180))
		} else {
			// Stop moving
			this.player.setVelocityX(0)
			this.player.setVelocityY(0)
		}
	}
	
	end() {
		
	}

}

export default GameScene;
