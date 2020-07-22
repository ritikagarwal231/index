const http = require("http");
const fs = require("fs");
const path = require("path");
const server = http.createServer((req, res) => {
  //Build filepath
  let filepath = path.join(
    __dirname,
    "",
    req.url === "/" ? "index.html" : req.url
  );
  console.log(filepath);
  //Extension of file
  let extname = path.extname(filepath);
  //Initial content type
  let contentType = "text/html";
  //Check end and set content type
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }
  if (contentType == "text/html" && extname == "") filepath += ".html";

  //Read File
  fs.readFile(filepath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        //Page not found
        fs.readFile(path.join(__dirname, "", "404.html"), (err, content) => {
          res.writeHead(200, { "Content-Type": contentType });
          res.end(content, "utf8");
        });
      } else {
        res.writeHead(500);
        res.end(`server Error : ${err.code}`);
      }
    } else {
      //Sucess
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
