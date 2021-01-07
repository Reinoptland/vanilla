const fs = require("fs");

function loadTodosFromFile() {
  const buffer = fs.readFileSync("./todos.json");
  return JSON.parse(buffer);
}

function saveTodos() {
  let data = JSON.stringify(todos);
  fs.writeFileSync("todos.json", data);
}

module.exports = {
  loadTodosFromFile,
  saveTodos,
};
