import Phaser from 'phaser';

//var connect = Phaser.add.text(200,200, 'conncect');
let client = new Colyseus.Client("ws://134.209.68.198:2567");
connect.setInteractive({useHandCursor: true});
function clientJoin(serverJoin, instance, connect) {
	connect.on('pointerdown', () => {
		try {
			const room = client.joinOrCreate("battle", {/* options */});
			console.log("joined successfully", room);
			serverJoin = instance.add.text(window.innerWidth*0.05,window.innerHeight*0.05, 'joined server sucessfully');

		} catch (e) {
			console.error("join error", e);
			serverJoin = instance.add.text(window.innerWidth*0.05,window.innerHeight*0.05, 'join error');
		}
		return serverJoin
	})
}
export { client, clientJoin };
