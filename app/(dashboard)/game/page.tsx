"use client";

import * as Phaser from "phaser";
import { useEffect } from "react";
import { io } from "socket.io-client";

export default function Game() {
	useEffect(() => {
		let game: Phaser.Game;
		const initializeGame = async () => {
			const Phaser = await import("phaser");
			const { gameConfig } = await import("@/phaser/game/gameConfig");
			game = new Phaser.Game(gameConfig);

			const socket = io("ws://localhost:4000");
			socket.on("connect", () => {
				socket.emit("demandPlayers");
				socket.emit("addNewPlayer");
			});
		};
		initializeGame();

		return () => {
			if (game) {
				game.destroy(true);
			}
			const socket = io("ws://localhost:4000");
			socket.disconnect();
		};
	}, []);
	return (
		<div className="flex flex-col items-center justify-center">
			<div id="metaverse" className="text-center"></div>
		</div>
	);
}
