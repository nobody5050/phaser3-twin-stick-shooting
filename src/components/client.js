import Phaser from 'phaser';

//var connect = Phaser.add.text(200,200, 'conncect');
let client = new Colyseus.Client("ws://134.209.68.198:2567");
let room;

function clientJoin(serverJoin, instance, connect, name, posX = window.innerWidth*0.05, posY = window.innerHeight*0.05) {
	if (connect === "onStart") {
		client.joinOrCreate(name, {/* options */}).then(room => {
			console.log("joined successfully", room);
			serverJoin = instance.add.text(posX, posY, 'joined server sucessfully');
		}).catch(e => {
			console.error("join error", e);
			serverJoin = instance.add.text(posX, posY, 'join error');
		});
		// try {
		// 	room = client.joinOrCreate(name, {/* options */});
		// 	console.log("joined successfully", room);
		// 	serverJoin = instance.add.text(posX, posY, 'joined server sucessfully');
		//
		// } catch (e) {
		// 	console.error("join error", e);
		// 	serverJoin = instance.add.text(posX, posY, 'join error');
		// }
		return serverJoin
	} else {
		connect.on('pointerdown', () => {
			client.joinOrCreate(name, {/* options */}).then(room => {
				console.log("joined successfully", room);
				serverJoin = instance.add.text(posX, posY, 'joined server sucessfully');
			}).catch(e => {
				console.error("join error", e);
				serverJoin = instance.add.text(posX, posY, 'join error');
			});
			// try {
			// 	room = client.joinOrCreate(name, {/* options */});
			// 	console.log("joined successfully", room);
			// 	serverJoin = instance.add.text(posX, posY, 'joined server sucessfully');
			//
			// } catch (e) {
			// 	console.error("join error", e);
			// 	serverJoin = instance.add.text(posX, posY, 'join error');
			// }
			return serverJoin
		})
	}
}
export { client, clientJoin, room };
