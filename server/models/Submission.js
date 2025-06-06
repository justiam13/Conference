const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  abstract: { type: String, required: true },
  keywords: { type: String },
  category: { type: String },
  paperFile: { type: String }, // Path to uploaded PDF
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, default: 'submitted' },
  reviewerComments: [
    {
      reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      comment: String,
      rating: Number
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema); 