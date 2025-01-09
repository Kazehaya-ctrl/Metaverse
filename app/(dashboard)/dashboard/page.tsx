"use client";

import { useEffect, useRef } from "react";

export default function Dashboard() {
	const gameRef = useRef<Phaser.Game | null>(null);

	useEffect(() => {
		if (typeof window !== "undefined" && !gameRef.current) {
			(async () => {
				const Phaser = await import("phaser");
				const BootScene = (await import("../../../phaser/game/BootScene"))
					.default;
				const GameScene = (await import("../../../phaser/game/GameScene"))
					.default;

				const config: Phaser.Types.Core.GameConfig = {
					type: Phaser.AUTO,
					width: 800,
					height: 600,
					parent: "phaser-game",
					physics: {
						default: "arcade",
						arcade: {
							gravity: { x: 0, y: 300 },
							debug: false,
						},
					},
					scene: [BootScene, GameScene] as Phaser.Types.Scenes.SceneType[],
				};

				gameRef.current = new Phaser.Game(config);
			})();
		}

		return () => {
			if (gameRef.current) {
				gameRef.current.destroy(true);
				gameRef.current = null;
			}
		};
	}, []);

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div
				id="phaser-game"
				className="w-[800px] h-[600px] flex items-center justify-center"
			/>
		</div>
	);
}
