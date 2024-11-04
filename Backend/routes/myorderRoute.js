const express = require("express");

const router = express.Router();

const cartModel = require("../models/cartModel");
const userModel = require("../models/userModel");

router.get("/myorder/:userId", async (req, res) => {
  try {
    const orders = await cartModel.find({});
    console.log(orders)
    if (!orders || orders.length === 0) {
      return res.status(404).send({ message: "No orders found" });
    }
    res.send(orders);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

module.exports = router;

