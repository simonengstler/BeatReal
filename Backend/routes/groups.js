const express = require('express');
const router = express.Router();
const { authenticateToken } = require('./users');
const mongoose = require('mongoose');
const { db } = require('../db');

const groupSchema = new mongoose.Schema({
  name: String,
  members: [String],
}, { timestamps: true });

const Group = mongoose.model('Group', groupSchema);

// Display Groups
router.get('/groups', authenticateToken, (req, res) => {
  try {
    db.ref('groups').once('value', snapshot => {
      const groups = snapshot.val();
      res.json(groups);
    });
  } catch (error) {
    console.error('Error fetching groups from Realtime Database', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Display Groups
router.get('/groups', authenticateToken, async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    console.error('Error fetching groups from MongoDB', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create Group
router.post('/groups', authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;
    const newGroup = new Group({ name, members: [req.user.id] });

    await newGroup.save();

    res.status(201).json(newGroup);
  } catch (error) {
    console.error('Error creating group in MongoDB', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete Group
router.delete('/groups/:groupId', authenticateToken, async (req, res) => {
  const groupId = req.params.groupId;

  try {
    const result = await Group.deleteOne({ _id: groupId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Group not found' });
    }

    res.status(204).json({ message: 'Group deleted successfully' });
  } catch (error) {
    console.error('Error deleting group in MongoDB', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Invite to Group
router.post('/groups/:groupId/invite', authenticateToken, async (req, res) => {
  const groupId = req.params.groupId;
  const invitedUserId = req.body.userId;

  try {
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Check if the user is a member of the group (or add your own authorization logic)
    if (!group.members.includes(req.user.id)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Add the invited user to the group (assuming invitedUserId is valid)
    group.members.push(invitedUserId);
    await group.save();

    res.json({ message: 'User invited to the group successfully' });
  } catch (error) {
    console.error('Error inviting user to group in MongoDB', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
