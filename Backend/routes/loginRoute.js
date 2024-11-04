const express = require("express");
const router = express.Router();

const userModel = require("../models/userModel");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (password && email) {
      let user = await userModel.findOne(req.body);
      if (!user) {
        res.send({ error: "Something went wrong try again" });
      }
      res.send(user);
    }
    } catch (err) {
        console.error(err); // Log the error
        return res.status(500).json({ message: err.message }); // Use 'err' and changed status code to 500
    }
});

module.exports = router;
