/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: server.js
 * Created on: 03/23
 * Author(s): Abbas M., Jed G.
 * Contact: amahdavi2@sfsu.edu
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: This server sets up an Express app with CORS, session, and routes for 
 *    authentication, restaurants, admin, drivers, email, favorites, and orders. 
 * 
 *    It also establishes a Socket.IO connection for real-time communication between clients and the server. 
 *    The server listens on port 8080 and serves the React client's build files.
 * 
 */

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
const menuRoutes = require("./routes/addMenuItem.js");
const sendEmailRoutes = require("./routes/sendEmail.js");
const cartRoutes = require('./routes/cart.js');
const driverRoutes = require('./routes/driver.js');

const session = require("./config/session.js");
const adminMW = require("./middleware/authMW.js");

const app = express();
app.use(cors());
const server = require("http").createServer(app);
session(app);
app.use(express.json());
app.use(cookieParser());
const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000", "http://35.160.127.228/"],
  },
});





//////////////// Socket IO //////////////////////////////////////////////
const orderRoutes = require("./routes/orders.js")(io);

io.on('connection', (socket) => {
  socket.on('joinDriverRoom', async (room, userId) => {
    console.log(`Socket ${socket.id} joining room: ${room} (driverId: ${userId})`);
    socket.join(room);
  });
  
  socket.on('acceptOrder', (order, driverId) => {
    const driverRoom = `driver-${driverId}`;
    console.log(`Sending order to driver room: ${driverRoom}`);
    io.to(driverRoom).emit('newOrderForDriver', order);
  });
  

  socket.on("joinRestaurantRoom", async (room) => {
    console.log(`Socket ${socket.id} joining room: ${room}`);
    socket.join(room);

    try {
      const restaurantId = room.split("-")[1];
      const response = await axios.get(
        `/orders/restaurant/${restaurantId}`
      );
      const orders = response.data;

      for (const order of orders) {
        socket.to(room).emit(`newOrder-${restaurantId}`, order);
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
      console.log(`Data: ${JSON.stringify(data)}, Room: ${room}`);
      io.to(room).emit('receive-order', data);
    }
  });
  

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
//////////////// Socket IO //////////////////////////////////////////////





app.use("/auth", authRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/admin", adminMW, adminRoutes);
app.use("/driver", driverRoutes);
app.use("/sendEmail", sendEmailRoutes);
app.use("/favorites", favoritesRoutes);
app.use("/enroll", enrollRestaurant);
app.use("/menu", menuRoutes);
app.use("/orders", orderRoutes);
app.use("/cart", cartRoutes);



//Build//////////////////////////////////////////////////////////////
const _dirname = path.resolve();
const buildPath = path.join(__dirname, "../client/build");

app.use(express.static(buildPath));

app.get(
  [
    "/",
    "/login",
    "/register",
    "/about",
    "/map",
    "/browse",
    "browse/:name/:id",

    "/driver",
    "/enroll",
    "/thankyouforenrolling",
    "/restaurantDashboard",
    "restaurantOrders",
    "/cart",
    "/campusmap",
    "/menuentry/:restaurantId",

    "/admin",
    "/adminlogin",
    "/:name/:id"
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
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});