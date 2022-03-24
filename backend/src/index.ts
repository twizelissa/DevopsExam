import app from "./utils/app";

const server = app();

server.listen(4001, () => {
	console.log("Server started on port 8001");
});
