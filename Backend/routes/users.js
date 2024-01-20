const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/users", async (req, res) => {
  try {
    const { username, userId } = req.body;

    // Check if required parameters are provided
    if (!username || !userId) {
      return res
        .status(400)
        .json({ message: "username and userId are required" });
    }

    // Check if the username already exists
    const usernameExists = await isUsernameExists(username);
    if (usernameExists) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // Create a new user
    db.ref("users").push({ username, userId });

    res.status(201).json({ id: userId, username });
  } catch (error) {
    console.error("Error creating user in Realtime Database", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Function to check if the username already exists
async function isUsernameExists(username) {
  const usersSnapshot = await db
    .ref("users")
    .orderByChild("username")
    .equalTo(username)
    .once("value");
  return usersSnapshot.exists();
}

// Endpoint to fetch all users
router.get("/users", async (req, res) => {
  try {
    const usersSnapshot = await db.ref("users").once("value");
    const users = [];

    usersSnapshot.forEach((userSnapshot) => {
      const user = userSnapshot.val();
      users.push({ id: user.userId, username: user.username });
    });

    res.json({ users });
  } catch (error) {
    console.error("Error fetching users from Realtime Database", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const userSnapshot = await db
      .ref(`users`)
      .orderByChild("userId")
      .equalTo(userId)
      .once("value");
    const user = userSnapshot.val();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ id: userId, username: user.username });
  } catch (error) {
    console.error("Error fetching user from Realtime Database", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
