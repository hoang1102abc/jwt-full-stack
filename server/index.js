//Main starting point of the application
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");

//DB Setup
mongoose.connect("mongodb://localhost:27017/auth", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
mongoose.set("useCreateIndex", true);

//App Setup
//any coming requests will go through morgan and bodyParser
//morgan is a logging framework that log the incoming requests
app.use(morgan("combined"));
app.use(cors());
//bodyParser is a middleware to parse incoming requests into JSON
app.use(bodyParser.json({ type: "*/*" }));
router(app);
//Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listenisng on:", port);
