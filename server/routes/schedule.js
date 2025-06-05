const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Get schedule for a specific day
router.get('/:day', async (req, res) => {
  try {
    const schedule = await Schedule.findOne({ day: req.params.day });
    
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found for this day' });
    }
    
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all schedules
router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.find().sort({ day: 1 });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new schedule (admin only)
router.post('/', [auth, admin], async (req, res) => {
  try {
    const schedule = new Schedule(req.body);
    const savedSchedule = await schedule.save();
    res.status(201).json(savedSchedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update schedule (admin only)
router.put('/:id', [auth, admin], async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    
    Object.assign(schedule, req.body);
    const updatedSchedule = await schedule.save();
    res.json(updatedSchedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete schedule (admin only)
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    
    await schedule.remove();
    res.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 