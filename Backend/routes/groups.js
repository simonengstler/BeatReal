const express = require("express");
const router = express.Router();
const db = require("../db");

// Display Groups
router.get("/groups", (req, res) => {
  try {
    const { username } = req.query;

    db.ref("groups").once("value", (snapshot) => {
      const groups = snapshot.val();

      // Filter out groups with "deleted": true and where username matches
      const filteredGroups = Object.entries(groups || {})
        .filter(
          ([groupId, group]) =>
            !group.deleted && group.members.includes(username)
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
    const { name, username, description } = req.body;

    // Check if required parameters are provided
    if (!name || !username) {
      return res
        .status(400)
        .json({ message: "name and username are required" });
    }

    const newGroupRef = db
      .ref("groups")
      .push({ name, members: [username], sharedSongs: [], description });
    const newGroupId = newGroupRef.key;
    res
      .status(201)
      .json({ id: newGroupId, name, members: [username], description });
  } catch (error) {
    console.error("Error creating group in Realtime Database", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/groups/:groupId", async (req, res) => {
  const groupId = req.params.groupId;

  try {
    const groupSnapshot = await db.ref(`groups/${groupId}`).once("value");
    const group = groupSnapshot.val();

    // Check if the group exists
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.json(group);
  } catch (error) {
    console.error("Error fetching group from Realtime Database", error);
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

// Invite to Group
router.post("/groups/:groupId/invite", async (req, res) => {
  const groupId = req.params.groupId;
  const invitedUsername = req.body.username;

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
      existingGroup.members.includes(invitedUsername)
    ) {
      return res
        .status(400)
        .json({ message: "User is already a member of the group" });
    }

    // Update the group to add the invited user
    if (!existingGroup.members) {
      existingGroup.members = [];
    }
    existingGroup.members.push(invitedUsername);

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
    const { username, groupId, songLink } = req.body;

    // Check if required parameters are provided
    if (!username || !groupId || !songLink) {
      return res
        .status(400)
        .json({ message: "username, groupId, and songLink are required" });
    }

    // Fetch the existing group
    const groupRef = db.ref(`groups/${groupId}`);
    const existingGroupSnapshot = await groupRef.once("value");
    const existingGroup = existingGroupSnapshot.val();

    // Check if the group exists
    if (!existingGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Update the group to add the shared song with a unique ID
    if (!existingGroup.sharedSongs) {
      existingGroup.sharedSongs = [];
    }

    const newSongRef = groupRef.child("sharedSongs").push(); // Create a new reference with push
    const sharedSongId = newSongRef.key; // Get the unique ID generated by Firebase

    existingGroup.sharedSongs.push({
      sharedSongId,
      timestamp: Date.now(),
      username,
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

// Add Reaction to Shared Song
router.post(
  "/groups/:groupId/shared-songs/:sharedSongId/reactions",
  async (req, res) => {
    const groupId = req.params.groupId;
    const sharedSongId = req.params.sharedSongId;
    const { reaction, username } = req.body;

    try {
      // Fetch the existing group
      const groupRef = db.ref(`groups/${groupId}`);
      const existingGroupSnapshot = await groupRef.once("value");
      const existingGroup = existingGroupSnapshot.val();

      // Check if the group and shared songs exist
      if (!existingGroup || !existingGroup.sharedSongs) {
        return res
          .status(404)
          .json({ message: "Group or shared songs not found" });
      }

      // Find the index of the shared song with the specified ID
      const sharedSongIndex = existingGroup.sharedSongs.findIndex(
        (song) => song.sharedSongId === sharedSongId
      );

      // Check if the shared song with the specified ID exists
      if (sharedSongIndex === -1) {
        return res.status(404).json({ message: "Shared song not found" });
      }

      // Create the reaction object with an automatic timestamp
      const newReaction = { reaction, timestamp: Date.now(), username };

      // Check if the reactions array exists, if not create it
      if (!existingGroup.sharedSongs[sharedSongIndex].reactions) {
        existingGroup.sharedSongs[sharedSongIndex].reactions = [];
      }

      // Add the new reaction to the reactions array
      existingGroup.sharedSongs[sharedSongIndex].reactions.push(newReaction);

      // Update the group with the new reaction
      await groupRef.update(existingGroup);

      // Respond with a consistent structure
      res.json({
        message: "Reaction added successfully",
        updatedGroup: existingGroup,
      });
    } catch (error) {
      console.error(
        "Error adding reaction to shared song in Realtime Database",
        error
      );
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// Endpoint to get the top 5 songs from all groups
router.get("/top-songs", async (req, res) => {
  try {
    const groupsSnapshot = await db.ref("groups").once("value");
    const topSongs = [];

    groupsSnapshot.forEach((groupSnapshot) => {
      const group = groupSnapshot.val();

      // Exclude groups with deleted: true
      if (!group.deleted && group.sharedSongs) {
        group.sharedSongs.forEach((sharedSong) => {
          // Check if the shared song has reactions
          if (sharedSong.reactions && sharedSong.reactions.length > 0) {
            // Add the shared song to the topSongs array with additional information
            topSongs.push({
              groupId: groupSnapshot.key,
              songId: sharedSong.songId,
              songLink: sharedSong.songLink,
              timestamp: sharedSong.timestamp,
              username: sharedSong.username,
              reactionCount: sharedSong.reactions.length,
            });
          }
        });
      }
    });

    // Sort topSongs by the number of reactions (desc) and timestamp (desc)
    topSongs.sort((a, b) => {
      if (b.reactionCount !== a.reactionCount) {
        return b.reactionCount - a.reactionCount;
      }
      return b.timestamp - a.timestamp;
    });

    // Get the top 5 songs
    const top5Songs = topSongs.slice(0, 5);

    res.json({ topSongs: top5Songs });
  } catch (error) {
    console.error("Error fetching top songs from Realtime Database", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
