const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(__dirname, '../uploads/');
    require('fs').mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// File filter for PDFs only
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    // Log the incorrect file type
    console.log('Attempted file upload with invalid type:', file.mimetype);
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Handle preflight OPTIONS requests for the submission route
router.options('/', cors()); // Use cors() specifically for OPTIONS on this route

// Public routes
router.post('/', 
  (req, res, next) => { console.log('>> Submissions POST route hit'); next(); },
  auth, 
  (req, res, next) => { console.log('>> Auth middleware passed'); next(); },
  upload.single('paper'), 
  (req, res, next) => { console.log('>> Multer upload middleware passed'); console.log('Uploaded file:', req.file); console.log('Body data:', req.body); next(); },
  submissionController.createSubmission
);

// User routes
router.get('/my-submissions', auth, submissionController.getUserSubmissions);
router.get('/:id', auth, submissionController.getSubmissionById);

// Admin routes
router.get('/', [auth, admin], submissionController.getSubmissions);
router.put('/:id/status', [auth, admin], submissionController.updateSubmissionStatus);
router.post('/:id/review', [auth, admin], submissionController.addReviewerComment);

module.exports = router; 