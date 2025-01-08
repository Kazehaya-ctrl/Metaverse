"use client";

import { useEffect } from "react";

export default function Dashboard() {
	useEffect(() => {
		if (typeof window !== "undefined") {
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
					physics: {
						default: "arcade",
						arcade: {
							gravity: { x: 0, y: 300 },
							debug: false,
						},
					},
					scene: [BootScene, GameScene] as Phaser.Types.Scenes.SceneType[],
				};

				const game = new Phaser.Game(config);

				return () => {
					game.destroy(true);
				};
			})();
		}
	}, []);

	return (
		<>
			<div className="flex items-center justify-center h-screen">
				<div id="phaser-game" className="w-[800px] h-[600px]" />
			</div>
		</>
	);
}
