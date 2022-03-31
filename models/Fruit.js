const log = require("debug")("fruits:models:Fruit")
const mongoose = require("mongoose");

const fruitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    colour: { type: String, required: true },
    readyToEat: Boolean
});

const Fruit = mongoose.model("Fruit", fruitSchema);
log("Fruit model created")

module.exports = Fruit;