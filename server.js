require("dotenv").config();
const log = require("debug")("fruits:server");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const methodOverride = require("method-override")
const fruitsController = require("./controllers/fruits.js");

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {}, () => {
    log("connected to mongodb");
});
const app = express();
const PORT = process.env.PORT

app.use(morgan("tiny"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use("/fruits", fruitsController);

app.get("/", (req, res) => {
  res.send("Hello World");
});


app.listen(PORT, () => {
  log("express started on " + PORT);
});
