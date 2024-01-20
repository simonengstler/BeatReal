const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const router = express.Router();
const secretKey = "your_secret_key"; // Replace with a secure secret key in a real-world scenario


// Mock database
const users = [
  { id: "user_id_here", username: "exampleUser", password: "examplePassword" },
  { id: "admin", username: "admin", password: "admin" },
];

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.user = user;
    next();
  });
};

// Login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username: user.username, id: user.id }, secretKey);
  res.json({ token, user: { id: user.id, username: user.username } });
});

module.exports = { router, authenticateToken };
