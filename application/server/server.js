const cors = require("cors");
const path = require("path");
const port = 8080;
const express = require("express");
const cookieParser = require("cookie-parser");


const authRoutes = require("./routes/auth.js");
const restaurantRoutes = require("./routes/restaurant.js");
const session = require("./config/session.js");


const app = express();
app.use(cors());
app.use(express.json());
session(app);
app.use(cookieParser());


//Build//////////////////////////////////////////////////////////////
const _dirname = path.dirname("");
const buildPath = path.join(__dirname, "../client/build");

app.use (express.static(buildPath));

app.get([

  '/', '/login', '/register', '/about', '/map', '/enroll', '/driver', '/cart'

], function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
//Build//////////////////////////////////////////////////////////////


app.use("/auth", authRoutes);
app.use("/restaurants", restaurantRoutes);


app.listen(port, () => {
  console.log(`listening on http://localhost:${port}...`);
});
