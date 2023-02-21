const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");

app.use(cors());


app.get("/", (req, res) => {
  res.send("Hello World!");
});

let test = {
    field1 : 26,
    f2 : "Hii",
}

app.get("/test", (req, res) => {
    res.json(test);

  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
