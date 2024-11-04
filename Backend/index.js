const express = require("express");
const db = require("./models/db"); // Ensure the DB connection is established here
const cors = require("cors");
const app = express();
const itemsRoute = require("./routes/itemsRoute");
const signupRoute = require("./routes/signupRoute");
const loginRoute = require("./routes/loginRoute");
const cartRoute = require("./routes/cartRoute");
const myorderRoute = require("./routes/myorderRoute");
// const menuModel = require("./models/menuModel");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/items", itemsRoute); // Adjusted the base path for clarity
app.use("/api/user", signupRoute); // Adjusted the base path for clarity
app.use("/api/user", loginRoute); // Adjusted the base path for clarity
app.use("/api/cart", cartRoute); // Adjusted the base path for clarity
app.use("/api/cart", myorderRoute); // Adjusted the base path for clarity

// app.get("/", (req, res) => {
//   res.send("Server is working");
// });

// app.post("/create", async (req, res) => {
//   try {
//     // Validate incoming data (you can use a library like Joi or express-validator)
//     const { name, variants, price, category, image, desc } = req.body;

//     // Example validation (you can expand this as needed)
//     if (!name || !price || !category) {
//       return res.status(400).send({ error: "Name, price, and category are required." });
//     }

//     // Create a new menu item
//     const menu = new menuModel({
//       name,
//       variants,
//       price,
//       category,
//       image,
//       desc,
//     });

//     // Save the menu item to the database
//     await menu.save();

//     // Send back the created menu item with a 201 status code
//     res.status(201).send(menu);
//   } catch (error) {
//     console.error("Error creating menu item:", error);
//     res.status(500).send({ error: "An error occurred while creating the menu item." });
//   }
// });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));
