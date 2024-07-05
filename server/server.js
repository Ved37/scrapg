const express = require("express");
const app = express();

// const cors=require('cors');

app.use(express.json());
// app.use(cors());
require("dotenv").config();
const dbconfig = require("./config/dbconfig"); //this all literally means importing
const port = process.env.PORT || 5000;

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:5000");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

const usersRoute = require("./routes/usersRoute");
const productsRoute = require("./routes/productsRoute");
const bidsRoute = require("./routes/bidsRoute");
const notificationsRoute = require("./routes/notificationsRoute");
app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);
app.use("/api/bids", bidsRoute);
app.use("/api/notifications", notificationsRoute);
// deployment config
const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
app.listen(port, () => {
  console.log(`Node/Express JS Server started on port ${port}`);
});
