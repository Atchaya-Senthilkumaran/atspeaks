const mongoose = require('mongoose');

const fileMetadataSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, default: '' },
    storageType: { type: String, enum: ['cloudinary', 'local'], default: 'local' },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true }
  },
  { _id: false }
);

const internApplicationSchema = new mongoose.Schema(
  {
    applicationId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    position: {
      type: String,
      default: 'Sales & Business Development Intern'
    },
    status: {
      type: String,
      enum: [
        'Submitted',
        'Under Review',
        'Shortlisted',
        'Interview Scheduled',
        'Selected',
        'Rejected'
      ],
      default: 'Submitted',
      index: true
    },

    // Step 1: Personal Information
    personalInfo: {
      fullName: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true, lowercase: true, index: true },
      mobileNumber: { type: String, required: true, trim: true, index: true },
      whatsappNumber: { type: String, required: true, trim: true },
      currentLocation: { type: String, required: true, trim: true },
      age: { type: Number, required: true, min: 15, max: 99 }
    },

    // Step 2: Educational Details
    education: {
      collegeName: { type: String, required: true, trim: true },
      degreeDepartment: { type: String, required: true, trim: true },
      currentYearOfStudy: { type: String, required: true, trim: true },
      graduationYear: { type: String, required: true, trim: true },
      currentlyStudying: { type: String, enum: ['Yes', 'No'], required: true }
    },

    // Step 3: Digital Presence and Social Profiles (Optional)
    socialProfiles: {
      instagramUrl: { type: String, trim: true, default: '' },
      linkedinUrl: { type: String, trim: true, default: '' },
      youtubeUrl: { type: String, trim: true, default: '' },
      facebookUrl: { type: String, trim: true, default: '' },
      portfolioUrl: { type: String, trim: true, default: '' },
      otherProfiles: { type: String, trim: true, default: '' }
    },

    // Step 4: Experience and Skills
    experienceAndSkills: {
      hasPreviousSalesExperience: { type: String, enum: ['Yes', 'No'], required: true },
      previousPromotionDetails: { type: String, required: true, trim: true },
      workedAsAmbassador: { type: String, enum: ['Yes', 'No'], required: true },
      strongestSkills: {
        type: [String],
        validate: {
          validator: (arr) => Array.isArray(arr) && arr.length > 0,
          message: 'Select at least one skill'
        }
      },
      experienceDescription: { type: String, trim: true, default: '' }
    },

    // Step 5: Sales and Business Understanding
    salesAssessment: {
      approachFiftyStudents: { type: String, required: true, trim: true },
      convinceHesitantStudent: { type: String, required: true, trim: true },
      handleFeeObjection: { type: String, required: true, trim: true },
      callComfortLevel: {
        type: String,
        enum: ['Very Comfortable', 'Moderately Comfortable', 'Willing to Learn'],
        required: true
      },
      whyGoodFit: { type: String, required: true, trim: true }
    },

    // Step 6: Availability and Commitment
    availability: {
      hoursPerDay: {
        type: String,
        enum: ['1-2 hours', '2-4 hours', '4-6 hours', '6+ hours'],
        required: true
      },
      daysPerWeek: { type: String, required: true, trim: true },
      preferredDuration: {
        type: String,
        enum: ['1 month', '2 months', '3 months', '6 months'],
        required: true
      },
      earliestJoiningDate: { type: String, required: true, trim: true },
      comfortableIndependent: { type: String, enum: ['Yes', 'No'], required: true },
      comfortablePerformanceBased: { type: String, enum: ['Yes', 'No'], required: true }
    },

    // Step 7: Resume and Declaration
    resume: {
      type: fileMetadataSchema,
      required: true
    },
    certificates: {
      type: fileMetadataSchema,
      default: null
    },
    additionalInfo: {
      type: String,
      trim: true,
      default: ''
    },
    declarations: {
      accurateInfo: { type: Boolean, required: true },
      understandPerformanceBased: { type: Boolean, required: true },
      agreeToContact: { type: Boolean, required: true }
    },

    // Audit / Email status
    adminEmailSent: { type: Boolean, default: false },
    applicantEmailSent: { type: Boolean, default: false },
    submittedAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
);

internApplicationSchema.index({ createdAt: -1 });
internApplicationSchema.index({
  'personalInfo.fullName': 'text',
  'personalInfo.email': 'text',
  applicationId: 'text'
});

module.exports = mongoose.model('InternApplication', internApplicationSchema);
