function configureCORS(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
}

// sort of a middleware
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

function notFound(res) {
  res.writeHead(200);
  res.end("Not Found");
}

module.export = {
  parseBody,
  notFound,
  configureCORS,
};
