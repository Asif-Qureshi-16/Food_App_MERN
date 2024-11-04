const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true, // If each cart must have an associated user
  },
  itemId: String, // Or `itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'item' }` if referencing an item
  itemName: String,
  itemQuantity: Number, // Changed to Number
  itemPrice: Number,
  totalPrice: Number,
});

module.exports = mongoose.model("Cart", cartSchema);
