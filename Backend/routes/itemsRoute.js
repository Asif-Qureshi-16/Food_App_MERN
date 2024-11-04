const express = require("express");

const router = express.Router();

const menuModel = require("../models/menuModel");

router.get("/getAllItem", async (req, res) => {
  try {
    const items = await menuModel.find({});
    res.send(items);
  } catch (err) {
    console.error(err); // Log the error
    return res.status(500).json({ message: err.message }); // Use 'err' and changed status code to 500
  }
});

module.exports = router;
