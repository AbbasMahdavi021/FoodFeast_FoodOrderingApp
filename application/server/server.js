const cors = require("cors");
const path = require("path");
const port = 8080;
const express = require("express");


const authRoutes = require("./routes/auth.js");
const restaurantRoutes = require("./routes/restaurant.js");


const app = express();
app.use(cors());
app.use(express.json());


//Build//////////////////////////////////////////////////////////////
const _dirname = path.dirname("");
const buildPath = path.join(__dirname, "../client/build");

app.use (express.static(buildPath));

app.get('/about', function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html")),
  function(err) {
    if(err) {
      res.status(500).send(err)
    }
  };
});
//Build//////////////////////////////////////////////////////////////


app.use("/auth", authRoutes);
app.use("/restaurants", restaurantRoutes);


app.listen(port, () => {
  console.log(`listening on http://localhost:${port}...`);
});
