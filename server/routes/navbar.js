const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Get navbar items
router.get('/', async (req, res) => {
  try {
    // For now, return static navbar items
    // Later, you can store these in the database
    const navbarItems = [
      { title: 'Home', path: '/' },
      { title: 'CFP', path: '/cfp' },
      { title: 'Schedule', path: '/schedule' },
      { title: 'Contact', path: '/contact' }
    ];
    res.json(navbarItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update navbar items (admin only)
router.put('/', [auth, admin], async (req, res) => {
  try {
    // Later, implement database storage for navbar items
    res.json({ message: 'Navbar items updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 