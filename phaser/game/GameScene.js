import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
	constructor() {
		super("GameScene");
	}

	create() {
		this.add.image(400, 300, "sky");
		this.add
			.text(400, 550, "Hello, Phaser!", {
				font: "24px Arial",
				color: "#ffffff",
			})
			.setOrigin(0.5);
	}
}
