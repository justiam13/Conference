const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Here you would typically:
    // 1. Save the message to the database
    // 2. Send an email notification
    // 3. Send an auto-reply to the user

    // For now, just return success
    res.status(201).json({
      message: 'Message received successfully',
      data: { name, email, subject, message }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all contact messages (admin only)
router.get('/', [auth, admin], async (req, res) => {
  try {
    // Here you would fetch messages from the database
    res.json({ message: 'Contact messages retrieved successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 