const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Public routes
router.post('/', auth, submissionController.createSubmission);

// User routes
router.get('/my-submissions', auth, submissionController.getUserSubmissions);
router.get('/:id', auth, submissionController.getSubmissionById);

// Admin routes
router.get('/', [auth, admin], submissionController.getSubmissions);
router.put('/:id/status', [auth, admin], submissionController.updateSubmissionStatus);
router.post('/:id/review', [auth, admin], submissionController.addReviewerComment);

module.exports = router; 