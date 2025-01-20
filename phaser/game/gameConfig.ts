import Phaser from "phaser";
import { preload, create, update } from "./GameScene";

export const gameConfig: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 1000,
	height: 1000,
	parent: "metaverse",
	scene: { preload, create, update },
};
