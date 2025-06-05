const Submission = require('../models/Submission');
const User = require('../models/User');

// Get all submissions (admin only)
exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate('submittedBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get submission by ID
exports.getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate('submittedBy', 'name email')
      .populate('reviewerComments.reviewer', 'name');
    
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    
    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new submission
exports.createSubmission = async (req, res) => {
  try {
    const submission = new Submission({
      ...req.body,
      submittedBy: req.user._id // Assuming user is authenticated
    });
    
    const savedSubmission = await submission.save();
    res.status(201).json(savedSubmission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update submission status (admin only)
exports.updateSubmissionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const submission = await Submission.findById(req.params.id);
    
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    
    submission.status = status;
    const updatedSubmission = await submission.save();
    res.json(updatedSubmission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add reviewer comment (admin only)
exports.addReviewerComment = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    
    submission.reviewerComments.push({
      reviewer: req.user._id,
      comment: req.body.comment,
      rating: req.body.rating
    });
    
    const updatedSubmission = await submission.save();
    res.json(updatedSubmission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get user's submissions
exports.getUserSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ submittedBy: req.user._id })
      .sort({ createdAt: -1 });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 