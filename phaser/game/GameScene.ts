import * as Phaser from "phaser";

let player: Phaser.GameObjects.Sprite;
let cursors: Phaser.Types.Input.Keyboard.CursorKeys;

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

	player.setScale(0.02);

	cursors = this.input.keyboard!.createCursorKeys();
}

export function update(this: Phaser.Scene) {
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
}
