const { postTodo, deleteTodos, getTodos } = require("./todoHandlers");
const { parseBody, notFound, configureCORS } = require("./utils");

const http = require("http");

const host = "localhost";
const port = 8000;

const requestListener = function (req, res) {
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
