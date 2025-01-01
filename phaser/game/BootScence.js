import Phaser from "phaser";

export default class BootScene extends Phaser.Scene {
	preload() {
		this.load.image("sky", "../../public/assets/sky.png");
		this.load.image("ground", "../../public/assets/platform.png");
		this.load.image("star", "../../public/assets/star.png");
		this.load.image("bomb", "../../public/assets/bomb.png");

		this.load.spritesheet("dude", "../../public/assets/dude.png", {
			frameWidth: 32,
			frameHeight: 48,
		});
	}

	create() {}
}
