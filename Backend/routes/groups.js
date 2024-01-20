const express = require('express');
const router = express.Router();
const { authenticateToken } = require('./users');
const { db } = require('../db');

// Display Groups
router.get('/groups', (req, res) => {
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

// Create Group
router.post('/groups', (req, res) => {
  try {
    const { name } = req.body;
    const newGroupRef = db.ref('groups').push({ name, members: [req.user.id] });
    const newGroupId = newGroupRef.key;
    res.status(201).json({ id: newGroupId, name, members: [req.user.id] });
  } catch (error) {
    console.error('Error creating group in Realtime Database', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete Group
router.delete('/groups/:groupId', authenticateToken, (req, res) => {
  const groupId = req.params.groupId;

  try {
    db.ref(`groups/${groupId}`).remove();
    res.status(204).json({ message: 'Group deleted successfully' });
  } catch (error) {
    console.error('Error deleting group from Realtime Database', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Invite to Group
router.post('/groups/:groupId/invite', authenticateToken, (req, res) => {
  const groupId = req.params.groupId;
  const invitedUserId = req.body.userId;

  try {
    // Implement your invitation logic here

    res.json({ message: 'User invited to the group successfully' });
  } catch (error) {
    console.error('Error inviting user to group in Realtime Database', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
