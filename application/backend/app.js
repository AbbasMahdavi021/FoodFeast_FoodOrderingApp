const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");

app.use(cors());

app.use(express.json());

// sequlaize and listen on port 8080
const db = require("./models");

// get the path to the about page
const aboutRouter = require("./routes/About");
app.use("/about", aboutRouter);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });
});


