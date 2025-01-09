import { Server as HttpServer } from "http";
import { Server as SocketIoServer } from "socket.io";
import { NextApiRequest, NextApiResponse } from "next";

type NextApiResponseSocket = NextApiResponse & {
	socket: {
		server: HttpServer & {
			io?: SocketIoServer;
		};
	};
};

export const socketHandler = (
	req: NextApiRequest,
	res: NextApiResponseSocket
) => {
	if (res.socket.server.io) {
		console.log("Socket.Io already Running");
	} else {
		console.log("Setting up Socket.IO");
		const io = new SocketIoServer(res.socket.server, {
			path: "/api/socket",
			addTrailingSlash: false,
			cors: {
				origin: "*",
				methods: ["GET", "POST"],
			},
		});

		res.socket.server.io = io;

		io.on("connection", (socket) => {
			console.log("User Connected: " + socket.id);

			socket.on("message", (data) => {
				console.log(data);
				io.emit("message", `Hello server ${data}`);
			});

			socket.on("disconnect", () => {
				console.log(`${socket.id} is disconnected`);
			});
		});
		res.end();
	}
};
