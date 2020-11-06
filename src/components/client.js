import phaser from 'phaser'


var connect = phaser.add.text(200,200, 'conncect');
let colyseusClient = new Colyseus.Client("ws://134.209.68.198:2567");
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
