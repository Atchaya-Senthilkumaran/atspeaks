const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: false
  },
  eventKey: {
    type: String,
    trim: true
  },
  eventTitle: {
    type: String,
    required: true
  },
  eventDate: {
    type: String
  },
  eventTime: {
    type: String
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  schoolCollegeWorkplace: {
    type: String,
    required: true
  },
  yearOfStudy: {
    type: String
  },
  heardAboutFrom: {
    type: String,
    required: true
  },
  registrationType: {
    type: String,
    required: true
  },
  transactionId: {
    type: String
  },
  submittedToGoogleForm: {
    type: Boolean,
    default: false
  },
  googleFormSubmissionTime: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
RegistrationSchema.index({ eventId: 1, email: 1 });
RegistrationSchema.index({ eventKey: 1, email: 1 });
RegistrationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Registration', RegistrationSchema);
