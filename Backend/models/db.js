const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/foodApp");

var db = mongoose.connection;

db.on("connected", () => {
  console.log("MongoDB Connected");
});

db.on("error", () => {
  console.log("MongoDB Connection Error");
});

module.exports = mongoose;
