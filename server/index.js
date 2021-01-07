const http = require("http");
const fs = require("fs");

const host = "localhost";
const port = 8000;

// when the app starts up:
// load the todos.json
const buffer = fs.readFileSync("./todos.json");
console.log(buffer);
// turn the buffer into JavaScript Objects
const todos = JSON.parse(buffer);

// JSON.parse -> JSON string (or a buffer) into Java Objects
// JSON.stringify -> JavaScript objects into a JSON string

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end(JSON.stringify(todos));
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
