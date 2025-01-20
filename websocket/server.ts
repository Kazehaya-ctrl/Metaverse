import express from "express";
import Server from "socket.io";

const app = express();
const port = 4000;

const server = app.listen(port, () => {
	console.log(`> Backend Running on port ${port}`);
});

const io = new Server(server);
