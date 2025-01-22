const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");

  let path = "./views/";

  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      break;
    default:
      res.statusCode = 404;
      path += "404.html";
  }

  fs.readFile(path, (error, data) => {
    if (error) {
      res.end();
    } else {
      res.end(data);
    }
  });
});

server.listen("3000", "localhost", () => {
  console.log("Listening...");
});
