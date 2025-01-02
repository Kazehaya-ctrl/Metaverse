import * as Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
	constructor() {
		super("GameScene");
	}

	create() {
		this.add.image(400, 300, "sky");

		var platforms = this.physics.add.staticGroup();

		platforms.create(400, 568, "ground").setScale(2).refreshBody();

		platforms.create(600, 400, "ground");
		platforms.create(50, 250, "ground");
		platforms.create(750, 220, "ground");

		var player = this.physics.add.sprite(100, 450, "dude");

		player.setBounce(0.2);
		player.setCollideWorldBounds(true);

		this.anims.create({
			key: "left",
			frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
			frameRate: 60,
			repeat: -1,
		});

		this.anims.create({
			key: "turn",
			frames: [{ key: "dude", frame: 4 }],
			frameRate: 60,
		});

		this.anims.create({
			key: "right",
			frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
			frameRate: 60,
			repeat: -1,
		});
	}
}
