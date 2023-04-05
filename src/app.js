const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
app.use(cors(
    // {
    //     origin: process.env.FONTEND_URL || "https://laborhutt.com"
    // }
));
app.use(express.json({limit: "50mb"}));
app.use("/public", express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false, limit: "50mb"}));

const mongoURL = process.env.MONGO_URL;
console.log("mongo url from env : " + mongoURL);
mongoose.set("strictQuery", true);
mongoose.connect(mongoURL);

app.use("/users", require("./routes/users"));

module.exports = server;
