const EventEmitter = require("events");
const http = require("http");

const myEmitter = new EventEmitter();

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

myEmitter.on("newSale", () => {
  console.log("There is a new sale!");
});

myEmitter.on("newSale", () => {
  console.log("Consumer name: Vay");
});

myEmitter.on("newSale", stock => {
  console.log(`${stock} products sold!`);
});

myEmitter.emit("newSale", 9);

//////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received");
  res.end("Request received");
});

server.on("request", (req, res) => {
  //   res.end("Another Request 😊");
  console.log("Another Request 😊");
});

server.on("close", () => {
  console.log("server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Wating for request...");
});
