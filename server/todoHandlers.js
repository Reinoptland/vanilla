const { loadTodosFromFile, saveTodos } = require("./db");

let todos = loadTodosFromFile();

function deleteTodos(req, res) {
  const { ids } = req.body;

  todos = todos.filter((todo) => !ids.includes(todo.id));

  saveTodos();

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("deleted received");
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

function getTodos(res) {
  res.writeHead(200);
  res.end(JSON.stringify(todos));
}

module.exports = {
  getTodos,
  deleteTodos,
  postTodo,
};
