import Phaser from 'phaser';


let client = new Colyseus.Client("dokmi-server.heroku.com");
let room;

function clientJoin(serverJoin, instance, connect, name, posX = window.innerWidth * 0.5, posY = window.innerHeight * 0.5) {
    if (connect === "onStart") {
        client.joinOrCreate(name, {/* options */}).then(room => {
            console.log("joined successfully", room);
            serverJoin = instance.add.text(posX, posY, 'joined server sucessfully');
        }).catch(e => {
            console.error("join error", e);
            serverJoin = instance.add.text(posX, posY, 'join error');
        });
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
            return serverJoin
        })
    }
}

export {client, clientJoin, room};
