const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");

app.use(cors());


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