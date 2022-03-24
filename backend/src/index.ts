import app from "./utils/app";

const server = app();

server.listen(8001, () => {
	console.log("Server started on port 8001");
});
