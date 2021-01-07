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
  configureCORS(res);

  switch (req.method) {
    case "POST":
      parseBody(req, res, postTodo);
      break;

    case "DELETE":
      parseBody(req, res, deleteTodos);
      break;

    case "GET":
      getTodos(res);
      break;

    default:
      notFound(res);
      break;
  }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

function configureCORS(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
}

function notFound(res) {
  res.writeHead(200);
  res.end("Not Found");
}

function getTodos(res) {
  res.writeHead(200);
  res.end(JSON.stringify(todos));
}

function parseBody(req, res, next) {
  var body = "";
  req.on("data", function (data) {
    body += data;
  });
  req.on("end", function () {
    req.body = JSON.parse(body);

    next(req, res);
  });
}

function deleteTodos(req, res) {
  const { ids } = req.body;

  todos = todos.filter((todo) => !ids.includes(todo.id));

  saveTodos();

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("deleted received");
}

function saveTodos() {
  let data = JSON.stringify(todos);
  fs.writeFileSync("todos.json", data);
}

function postTodo(req, res) {
  const ids = todos.map((todo) => todo.id);
  const newId = Math.max(...ids) + 1;
  // turn into JS object
  // store in memory
  todos = [...todos, { ...req.body, done: false, id: newId }];
  // write it to a file
  saveTodos();

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("post received");
}
