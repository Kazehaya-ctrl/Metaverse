import express, { Request, Response } from "express";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { playerDetailSchema } from "../../components/interfaces";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
app.use(cors());
const players: Record<string, playerDetailSchema> = {};

const server = app.listen(port, () => {
	console.log(`> Backend Running on port ${port}`);
});

app.get("/", (req: Request, res: Response) => {
	res.json({
		msg: "Backend Running",
	});
});

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	console.log(`Connection established ${socket.id}`);
	console.log(players);
	players[socket.id] = {
		x: Math.random() * 1000,
		y: Math.random() * 1000,
		id: socket.id,
	};

	socket.on("addNewPlayer", () => {
		socket.broadcast.emit("newPlayer", players[socket.id]);
	});

	socket.on("demandCurrentPlayers", () => {
		socket.emit("currentPlayers", players);
	});

	socket.on("playerMoved", (playerDetail: playerDetailSchema) => {
		console.log(
			`${[playerDetail.id]} Coordinate x: ${playerDetail.x} y: ${
				playerDetail.y
			} `
		);
		for (let key in players) {
			if (key == playerDetail.id) {
				players[playerDetail.id] = {
					x: playerDetail.x,
					y: playerDetail.y,
					id: playerDetail.id,
				};
			}
			socket.broadcast.emit("playerPosition", playerDetail);
		}
	});

	socket.on("disconnect", () => {
		console.log(`Player Disconnected ${socket.id}`);
		delete players[socket.id];
		io.emit("playerDisconnect", socket.id);
	});
});
