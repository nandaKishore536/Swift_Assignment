import http from "http";
import { handleRequest } from "./routes";

const server = http.createServer((req, res) => {
  handleRequest(req, res);
});

server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
