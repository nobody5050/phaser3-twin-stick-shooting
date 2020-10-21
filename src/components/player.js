// Create player
this.player = this.physics.add.sprite(200, 200, 'player')
this.player.setCollideWorldBounds(true)
this.player.setOrigin(0.5, 0.5) // Set origin for bullet fire start
this.player.setScale(.4)
