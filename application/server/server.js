const cors = require("cors");
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const axios = require("axios");

const authRoutes = require("./routes/auth.js");
const restaurantRoutes = require("./routes/restaurant.js");
const adminRoutes = require("./routes/admin.js");
const favoritesRoutes = require("./routes/favorites.js");
const enrollRestaurant = require("./routes/enrollRestaurant.js");
const addMenuItem = require("./routes/addMenuItem.js");
const sendEmailRoutes = require("./routes/sendEmail.js");

const session = require("./config/session.js");

const app = express();
app.use(cors());
const server = require("http").createServer(app);
session(app);
app.use(express.json());
app.use(cookieParser());
const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

const orderRoutes = require("./routes/orders.js")(io);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on("joinRestaurantRoom", async (room) => {
    console.log(`Socket ${socket.id} joining room: ${room}`);
    socket.join(room);

    try {
      const restaurantId = room.split("-")[1];
      const response = await axios.get(
        `http://localhost:8080/orders/restaurant/${restaurantId}`
      );
      const orders = response.data;

      for (const order of orders) {
        socket.to(room).emit(`newOrder-${restaurantId}`, order);
        console.log("Emitting order:", order);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  });

  socket.on('send-order', (data, room) => {
    if (room === '') {
      console.log('No room specified');
      return;
    } else {
      console.log(`Sending order to room: ${room}`);
      console.log(`Data: ${JSON.stringify(data)}`);
      io.to(room).emit('receive-order', data);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.use("/auth", authRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/admin", adminRoutes);
app.use("/sendEmail", sendEmailRoutes);
app.use("/favorites", favoritesRoutes);
app.use("/enroll", enrollRestaurant);
app.use("/addMenuItem", addMenuItem);
app.use("/orders", orderRoutes);

//Build//////////////////////////////////////////////////////////////
const _dirname = path.resolve(); // Corrected variable name
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

const port = 8080;
server.listen(port, () => { // Start server with the 'listen' method on the server object
  console.log(`Server is running on port ${port}`);
});
