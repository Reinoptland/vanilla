const http = require("http");
const fs = require("fs");

const host = "localhost";
const port = 8000;

// when the app starts up:
// load the todos.json
const buffer = fs.readFileSync("./todos.json");
console.log(buffer);
// turn the buffer into JavaScript Objects
let todos = JSON.parse(buffer);

// JSON.parse -> JSON string (or a buffer) into Java Objects
// JSON.stringify -> JavaScript objects into a JSON string

const requestListener = function (req, res) {
  //   console.log("WHAT ARE WE GETTING:", req);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method == "POST") {
    var body = "";
    req.on("data", function (data) {
      body += data;
    });
    req.on("end", function () {
      const ids = todos.map((todo) => todo.id);
      const newId = Math.max(...ids) + 1;
      // turn into JS object
      const newTodo = JSON.parse(body);
      // store in memory
      todos = [...todos, { ...newTodo, done: false, id: newId }];
      // write it to a file
      let data = JSON.stringify(todos);
      fs.writeFileSync("todos.json", data);

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("post received");
    });
  } else if (req.method === "GET") {
    res.writeHead(200);
    res.end(JSON.stringify(todos));
  } else {
    res.writeHead(200);
    res.end("Not Found");
  }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
