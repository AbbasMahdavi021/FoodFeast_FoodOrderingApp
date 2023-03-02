const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const path = require("path");

app.use(cors());
const _dirname = path.dirname("");
const buildPath = path.join(__dirname, "../client/build");

app.use (express.static(buildPath));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html")),
  function(err) {
    if(err) {
      res.status(500).send(err)
    }
  };
});

app.get("/", (req, res) => {
  res.send("Hello! This is the backEnd main page(endpoint).");
});


let test = {
  age : 26,
  msg : "Hi",
}

app.get("/test", (req, res) => {
  res.json(test);

});

app.get("about", (req, res) => {
  res.sendFile("Link to AboutPage"); // TODO: replace path with proper about path!
});

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}...`);
});