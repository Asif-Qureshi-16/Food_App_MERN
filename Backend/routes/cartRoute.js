const express = require("express");
const router = express.Router();

const cartModel = require("../models/cartModel");
const userModel = require("../models/userModel");

router.post("/checkout", async (req, res) => {
  try {
    // Destructure email and cartItems from the request body
    const { email, cartItems } = req.body;

    // Find the user by their email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Loop through the cart items and create a new cart entry for each item
    const createdCarts = await Promise.all(
      cartItems.map(async (item) => {
        return await cartModel.create({
          user: user._id,
          itemId: item.id, // Adjust field names as needed
          itemName: item.name,
          itemQuantity: item.quantity,
          itemPrice: item.price,
          totalPrice: item.quantity * item.price, // Calculate total price
        });
      })
    );

    // Associate the created cart items with the user
    user.carts.push(...createdCarts.map(cart => cart._id));
    await user.save();

    // Send a success response
    res.status(200).json({ message: "Order successfully created", carts: createdCarts });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: "An error occurred", error });
  }
});

module.exports = router;
