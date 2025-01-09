import { Server } from "socket.io";
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

export default function socketHandler(
	req: NextApiRequest,
	res: NextApiResponseSocket
) {
	if (res.socket.server.io) {
		console.log("Socket.Io already Running");
	} else {
		console.log("Setting up Socket.IO");
	}
}
