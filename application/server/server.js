const cors = require("cors");
const path = require("path");
const port = 8080;
const express = require("express");


const authRoutes = require("./routes/auth.js");

const app = express();
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

app.use("/auth", authRoutes);




app.listen(port, () => {
  console.log(`listening on http://localhost:${port}...`);
});
