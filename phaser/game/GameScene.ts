import * as Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
	cursors: any;
	platforms: any;
	player: any;
	stars: any;
	score = 0;
	scoreText: any;
	bomb: any;
	gameOver: boolean = false;

	constructor() {
		super("GameScene");
	}

	create() {
		this.add.image(400, 300, "sky");

		this.platforms = this.physics.add.staticGroup();

		this.platforms.create(400, 568, "ground").setScale(2).refreshBody();

		this.platforms.create(600, 400, "ground");
		this.platforms.create(50, 250, "ground");
		this.platforms.create(750, 220, "ground");

		this.player = this.physics.add.sprite(100, 450, "dude");

		this.player.setBounce(0.2);
		this.player.setCollideWorldBounds(true);

		this.anims.create({
			key: "left",
			frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
			frameRate: 20,
			repeat: -1,
		});

		this.anims.create({
			key: "turn",
			frames: [{ key: "dude", frame: 4 }],
			frameRate: 20,
		});

		this.anims.create({
			key: "right",
			frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
			frameRate: 20,
			repeat: -1,
		});

		this.scoreText = this.add.text(16, 16, "score: 0", {
			fontSize: "32px",
			color: "#000",
		});

		this.cursors = this.input.keyboard?.createCursorKeys();

		this.stars = this.physics.add.group({
			key: "star",
			repeat: 11,
			setXY: { x: 12, y: 0, stepX: 70 },
		});

		this.stars.children.iterate(function (child: any) {
			child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
		});

		this.bomb = this.physics.add.group();

		this.physics.add.collider(this.bomb, this.platforms);

		this.physics.add.overlap(this.player, this.bomb, this.hitBomb);

		this.physics.add.collider(this.stars, this.platforms);
		this.physics.add.overlap(
			this.stars,
			this.player,
			this.collectStars,
			() => {},
			this
		);

		this.physics.add.collider(this.player, this.platforms);
	}

	update() {
		if (this.cursors.left.isDown) {
			this.player.setVelocityX(-160);
			this.player.anims.play("left", true);
		} else if (this.cursors.right.isDown) {
			this.player.setVelocityX(160);
			this.player.anims.play("right", true);
		} else {
			this.player.setVelocityX(0);
			this.player.anims.play("turn", true);
		}

		if (this.cursors.up.isDown && this.player.body.touching.down) {
			this.player.setVelocityY(-330);
		}
	}

	collectStars(player: any, stars: any) {
		stars.disableBody(true, true);

		this.score += 10;
		this.scoreText.setText("score: " + this.score);

		if (this.stars.countActive(true) === 0) {
			this.stars.children.iterate((child: any) => {
				child.enableBody(true, child.x, 0, true, true);
			});

			var x =
				player.x < 400
					? Phaser.Math.Between(0, 400)
					: Phaser.Math.Between(400, 800);

			var bomb = this.bomb.create(x, 0, "bomb");
			bomb.setBounce(1);
			bomb.setCollideWorldBounds(true);
			bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
		}
	}

	hitBomb(player: any, bomb: any) {
		this.physics.pause();
		player.setTint(0xff0000);

		player.anims.play("turn");
		this.gameOver = true;
	}
}
