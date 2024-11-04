const express = require("express");

const router = express.Router();

const userModel = require("../models/userModel");

router.post("/signup", async (req, res) => {
  try {
    const {name, age, email, password} = req.body;
    const user = await userModel.create({
      name: name,
      age: age,
      email: email,
      password: password,
    });
    res.send(user);
  } catch (err) {
    console.error(err); // Log the error
    return res.status(500).json({ message: err.message }); // Use 'err' and changed status code to 500
  }
});

module.exports = router;
