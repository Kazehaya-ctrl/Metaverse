"use client";

import * as Phaser from "phaser";
import { useEffect } from "react";
import socket from "@/components/utils/socket";

export default function Game() {
	useEffect(() => {
		let game: Phaser.Game;
		const initializeGame = async () => {
			const Phaser = await import("phaser");
			const { gameConfig } = await import("@/phaser/game/gameConfig");
			game = new Phaser.Game(gameConfig);
			socket.emit("demandPlayers");
			socket.emit("addNewPlayer");
		};
		initializeGame();

		return () => {
			game.destroy(true);
			socket.disconnect();
		};
	}, []);
	return (
		<div className="flex flex-col items-center justify-center">
			<div id="metaverse" className="text-center"></div>
		</div>
	);
}
