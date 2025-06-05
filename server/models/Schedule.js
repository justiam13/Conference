const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
    min: 1
  },
  events: [{
    time: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    location: {
      type: String,
      trim: true
    },
    speakers: [{
      name: {
        type: String,
        required: true,
        trim: true
      },
      title: String,
      organization: String
    }],
    type: {
      type: String,
      enum: ['keynote', 'session', 'break', 'workshop', 'panel'],
      required: true
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
scheduleSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Schedule', scheduleSchema); 