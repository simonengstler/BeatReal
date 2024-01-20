const express = require("express");
const router = express.Router();
const db = require("../db");

// Display Groups
router.get("/groups", (req, res) => {
  try {
    const { userId } = req.query

    db.ref("groups").once("value", (snapshot) => {
      const groups = snapshot.val();

      console.log(groups);

      // Filter out groups with "deleted": true and where userId matches
      const filteredGroups = Object.entries(groups || {})
        .filter(
          ([groupId, group]) => !group.deleted && group.members.includes(userId)
        )
        .reduce((acc, [groupId, group]) => {
          acc[groupId] = group;
          return acc;
        }, {});

      res.json(filteredGroups);
    });
  } catch (error) {
    console.error("Error fetching groups from Realtime Database", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Create Group
router.post("/groups", (req, res) => {
  try {
    const { name, userId } = req.body;

    console.log(req.body)

    // Check if required parameters are provided
    if (!name || !userId) {
      return res.status(400).json({ message: "name and userId are required" });
    }

    const newGroupRef = db.ref("groups").push({ name, members: [userId] });
    const newGroupId = newGroupRef.key;
    res.status(201).json({ id: newGroupId, name, members: [userId] });
  } catch (error) {
    console.error("Error creating group in Realtime Database", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete Group
router.delete("/groups/:groupId", async (req, res) => {
  const groupId = req.params.groupId;

  try {
    // Fetch the existing group
    const groupRef = db.ref(`groups/${groupId}`);
    const existingGroupSnapshot = await groupRef.once("value");
    const existingGroup = existingGroupSnapshot.val();

    // Check if the group exists
    if (!existingGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Update the group to mark it as deleted
    await groupRef.update({ deleted: true });

    res.status(204).json({ message: "Group marked as deleted successfully" });
  } catch (error) {
    console.error("Error deleting group from Realtime Database", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Irretrievably delete Group
router.delete("/groups/:groupId", async (req, res) => {
  const groupId = req.params.groupId;

  try {
    // Fetch the existing group
    const groupRef = db.ref(`groups/${groupId}`);
    const existingGroupSnapshot = await groupRef.once("value");
    const existingGroup = existingGroupSnapshot.val();

    // Check if the group exists
    if (!existingGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Update the group to mark it as deleted
    await groupRef.remove();

    res.status(204).json({ message: "Group marked as deleted successfully" });
  } catch (error) {
    console.error("Error deleting group from Realtime Database", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Invite to Group
router.post("/groups/:groupId/invite", async (req, res) => {
  const groupId = req.params.groupId;
  const invitedUserId = req.body.userId;

  try {
    // Fetch the existing group
    const groupRef = db.ref(`groups/${groupId}`);
    const existingGroupSnapshot = await groupRef.once("value");
    const existingGroup = existingGroupSnapshot.val();

    // Check if the group exists
    if (!existingGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if the invited user is already a member
    if (
      existingGroup.members &&
      existingGroup.members.includes(invitedUserId)
    ) {
      return res
        .status(400)
        .json({ message: "User is already a member of the group" });
    }

    // Update the group to add the invited user
    if (!existingGroup.members) {
      existingGroup.members = [];
    }
    existingGroup.members.push(invitedUserId);

    // Save the updated group
    await groupRef.update(existingGroup);

    res.json({
      message: "User invited to the group successfully",
      updatedGroup: existingGroup,
    });
  } catch (error) {
    console.error("Error inviting user to group in Realtime Database", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Share Song in Group
router.post("/groups/share-song", async (req, res) => {
  try {
    const { userId, groupId, songLink } = req.body;

    // Check if required parameters are provided
    if (!userId || !groupId || !songLink) {
      return res.status(400).json({ message: "userId, groupId, and songLink are required" });
    }

    // Fetch the existing group
    const groupRef = db.ref(`groups/${groupId}`);
    const existingGroupSnapshot = await groupRef.once("value");
    const existingGroup = existingGroupSnapshot.val();

    // Check if the group exists
    if (!existingGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Update the group to add the shared song
    if (!existingGroup.sharedSongs) {
      existingGroup.sharedSongs = [];
    }

    existingGroup.sharedSongs.push({
      timestamp: Date.now(),
      userId,
      songLink,
    });

    // Save the updated group
    await groupRef.update(existingGroup);

    res.json({
      message: "Song shared in the group successfully",
      updatedGroup: existingGroup,
    });
  } catch (error) {
    console.error("Error sharing song in group in Realtime Database", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
