"use client";
import * as Phaser from "phaser";
import { getSocket } from "@/components/utils/socket";
import { playerDetailSchema } from "@/components/interfaces";

let player: Phaser.GameObjects.Sprite;
let players: Record<string, Phaser.GameObjects.Sprite> = {};
let cursors: Phaser.Types.Input.Keyboard.CursorKeys;
const socket = getSocket();

export function preload(this: Phaser.Scene) {
	this.load.image("background", "/assets/sky.png");
	this.load.image("player", "/assets/dude.png");
}

export function create(this: Phaser.Scene) {
	const background = this.add.image(
		this.scale.width / 2,
		this.scale.height / 2,
		"background"
	);

	background.displayWidth = this.sys.game.config.width as number;
	background.displayHeight = this.sys.game.config.height as number;

	player = this.add.sprite(
		Math.random() * this.scale.width,
		Math.random() * this.scale.height,
		"player"
	);

	cursors = this.input.keyboard!.createCursorKeys();

	socket.on("getPlayers", (playersList: Record<string, playerDetailSchema>) => {
		console.log("currentPlayer hit", playersList);

		for (let key in players) {
			players[key].destroy();
			delete players[key];
		}

		Object.entries(playersList).forEach(([key, playerData]) => {
			if (key !== socket.id) {
				addPlayer(this, key, playerData);
			}
		});

		console.log("Current player count:", Object.keys(players).length);
	});

	socket.on("newPlayer", (playerDetail: playerDetailSchema) => {
		if (playerDetail.id != socket.id) {
			console.log("newPlayer hit" + socket.id);
			addPlayer(this, playerDetail.id!, playerDetail);
		}
	});

	socket.on("playerPosition", (playerDetail: playerDetailSchema) => {
		console.log(playerDetail);
		if (players[playerDetail.id!] && playerDetail.id != socket.id) {
			players[playerDetail.id!].x = playerDetail.x;
			players[playerDetail.id!].y = playerDetail.y;
		}
		console.log(players[playerDetail.id!]);
	});

	socket.on("playerDisconnect", (id: string) => {
		if (players[id]) {
			players[id].destroy();
			delete players[id];
		}
	});
}

function addPlayer(
	scene: Phaser.Scene,
	id: string,
	playerPosition: playerDetailSchema
) {
	players[id] = scene.add.sprite(playerPosition.x, playerPosition.y, "player");
}

export function update(this: Phaser.Scene) {
	if (!cursors || !player) return;
	let moved: boolean = false;

	const speed = 200;
	if (cursors.left.isDown) {
		player.x -= (speed * this.game.loop.delta) / 1000;
		moved = true;
	}
	if (cursors.right.isDown) {
		player.x += (speed * this.game.loop.delta) / 1000;
		moved = true;
	}
	if (cursors.up.isDown) {
		player.y -= (speed * this.game.loop.delta) / 1000;
		moved = true;
	}
	if (cursors.down.isDown) {
		player.y += (speed * this.game.loop.delta) / 1000;
		moved = true;
	}

	if (moved) {
		let playerDetail: playerDetailSchema = {
			x: player.x,
			y: player.y,
			id: socket.id,
		};
		socket.emit("playerMoved", playerDetail);
	}
}
