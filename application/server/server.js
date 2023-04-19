const cors = require("cors");
const path = require("path");
const port = 8080;
const express = require("express");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.js");
const restaurantRoutes = require("./routes/restaurant.js");
const adminRoutes = require("./routes/admin.js");
const favoritesRoutes = require("./routes/favorites.js");
const enrollRestaurant = require("./routes/enrollRestaurant.js");
const addMenuItem = require("./routes/addMenuItem.js");
const orderRoutes = require("./routes/orders.js");


const session = require("./config/session.js");

const app = express();
session(app);
app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use("/auth", authRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/admin", adminRoutes);
app.use('/favorites', favoritesRoutes);
app.use('/enroll', enrollRestaurant);
app.use('/addMenuItem', addMenuItem);
app.use('/orders', orderRoutes);




//Build//////////////////////////////////////////////////////////////
const _dirname = path.dirname("");
const buildPath = path.join(__dirname, "../client/build");

app.use(express.static(buildPath));

app.get(
  [
    "/",
    "/login",
    "/register",
    "/about",
    "/map",
    "/enroll",
    "/driver",
    "/cart",
    "/adminlogin",
  ],
  function (req, res) {
    res.sendFile(
      path.join(__dirname, "../client/build/index.html"),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  }
);
//Build//////////////////////////////////////////////////////////////


app.listen(port, () => {
  console.log(`listening on http://localhost:${port}...`);
});
