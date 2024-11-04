const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
    name: String,
    variants: String,
    price: Number,
    category: String,
    image: String,
    desc: String,
  }, { timestamps: true }); // Optional: adds createdAt and updatedAt fields
  
module.exports = mongoose.model("menu", menuSchema);
