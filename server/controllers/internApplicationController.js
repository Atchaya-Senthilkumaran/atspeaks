const crypto = require('crypto');
const fs = require('fs');
const mongoose = require('mongoose');
const InternApplication = require('../models/InternApplication');
const {
  uploadApplicationFile,
  getLocalFilePath,
  getSignedCloudinaryUrl
} = require('../services/cloudinaryService');
const {
  sendRecruitmentTeamNotification,
  sendApplicantConfirmation
} = require('../services/internEmailService');
const { signAdminToken } = require('../middleware/adminAuth');

const ALLOWED_STATUSES = [
  'Submitted',
  'Under Review',
  'Shortlisted',
  'Interview Scheduled',
  'Selected',
  'Rejected'
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s()-]{8,18}$/;

const normalizeDigits = (val = '') => String(val).replace(/\D/g, '');

const generateApplicationId = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const rand = crypto.randomBytes(2).toString('hex').toUpperCase();
  return `ATS-SI-${y}${m}${d}-${rand}`;
};

const parseJsonField = (raw, fallback) => {
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  }
  return raw ?? fallback;
};

const sanitizeString = (val = '', maxLen = 2000) =>
  String(val || '').trim().slice(0, maxLen);

// POST /api/intern-applications
exports.submitApplication = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database is currently unavailable. Please try again in a moment.'
      });
    }

    const personalInfo = parseJsonField(req.body.personalInfo, {});
    const education = parseJsonField(req.body.education, {});
    const socialProfiles = parseJsonField(req.body.socialProfiles, {});
    const experienceAndSkills = parseJsonField(req.body.experienceAndSkills, {});
    const salesAssessment = parseJsonField(req.body.salesAssessment, {});
    const availability = parseJsonField(req.body.availability, {});
    const declarations = parseJsonField(req.body.declarations, {});
    const additionalInfo = sanitizeString(req.body.additionalInfo, 3000);

    // Step 1 validation
    const fullName = sanitizeString(personalInfo.fullName, 120);
    const email = sanitizeString(personalInfo.email, 160).toLowerCase();
    const mobileNumber = sanitizeString(personalInfo.mobileNumber, 25);
    const whatsappNumber = sanitizeString(personalInfo.whatsappNumber, 25);
    const currentLocation = sanitizeString(personalInfo.currentLocation, 160);
    const age = Number(personalInfo.age);

    if (!fullName || !email || !mobileNumber || !whatsappNumber || !currentLocation || !age) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required personal information fields.'
      });
    }
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.'
      });
    }
    const mobileDigits = normalizeDigits(mobileNumber);
    const whatsappDigits = normalizeDigits(whatsappNumber);
    if (!PHONE_REGEX.test(mobileNumber) || mobileDigits.length < 10 || mobileDigits.length > 15) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid 10-15 digit mobile number.'
      });
    }
    if (!PHONE_REGEX.test(whatsappNumber) || whatsappDigits.length < 10 || whatsappDigits.length > 15) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid 10-15 digit WhatsApp number.'
      });
    }
    if (Number.isNaN(age) || age < 15 || age > 99) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid age between 15 and 99.'
      });
    }

    // Step 2 validation
    const collegeName = sanitizeString(education.collegeName, 200);
    const degreeDepartment = sanitizeString(education.degreeDepartment, 200);
    const currentYearOfStudy = sanitizeString(education.currentYearOfStudy, 80);
    const graduationYear = sanitizeString(education.graduationYear, 20);
    const currentlyStudying = education.currentlyStudying;

    if (
      !collegeName ||
      !degreeDepartment ||
      !currentYearOfStudy ||
      !graduationYear ||
      !['Yes', 'No'].includes(currentlyStudying)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required educational details.'
      });
    }

    // Step 4 validation
    const hasPreviousSalesExperience = experienceAndSkills.hasPreviousSalesExperience;
    const previousPromotionDetails = sanitizeString(
      experienceAndSkills.previousPromotionDetails,
      3000
    );
    const workedAsAmbassador = experienceAndSkills.workedAsAmbassador;
    const strongestSkills = Array.isArray(experienceAndSkills.strongestSkills)
      ? experienceAndSkills.strongestSkills.map((s) => sanitizeString(s, 60)).filter(Boolean)
      : [];
    const experienceDescription = sanitizeString(
      experienceAndSkills.experienceDescription,
      3000
    );

    if (
      !['Yes', 'No'].includes(hasPreviousSalesExperience) ||
      !previousPromotionDetails ||
      !['Yes', 'No'].includes(workedAsAmbassador) ||
      strongestSkills.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required experience and skills fields.'
      });
    }

    // Step 5 validation
    const approachFiftyStudents = sanitizeString(salesAssessment.approachFiftyStudents, 3000);
    const convinceHesitantStudent = sanitizeString(salesAssessment.convinceHesitantStudent, 3000);
    const handleFeeObjection = sanitizeString(salesAssessment.handleFeeObjection, 3000);
    const callComfortLevel = salesAssessment.callComfortLevel;
    const whyGoodFit = sanitizeString(salesAssessment.whyGoodFit, 3000);

    if (
      !approachFiftyStudents ||
      !convinceHesitantStudent ||
      !handleFeeObjection ||
      !['Very Comfortable', 'Moderately Comfortable', 'Willing to Learn'].includes(callComfortLevel) ||
      !whyGoodFit
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please answer all sales and business understanding questions.'
      });
    }

    // Step 6 validation
    const hoursPerDay = availability.hoursPerDay;
    const daysPerWeek = sanitizeString(availability.daysPerWeek, 60);
    const preferredDuration = availability.preferredDuration;
    const earliestJoiningDate = sanitizeString(availability.earliestJoiningDate, 60);
    const comfortableIndependent = availability.comfortableIndependent;
    const comfortablePerformanceBased = availability.comfortablePerformanceBased;

    if (
      !['1-2 hours', '2-4 hours', '4-6 hours', '6+ hours'].includes(hoursPerDay) ||
      !daysPerWeek ||
      !['1 month', '2 months', '3 months', '6 months'].includes(preferredDuration) ||
      !earliestJoiningDate ||
      !['Yes', 'No'].includes(comfortableIndependent) ||
      !['Yes', 'No'].includes(comfortablePerformanceBased)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all availability and commitment fields.'
      });
    }

    // Step 7 validation: Resume + Declarations
    const resumeFile = req.files?.resume?.[0];
    const certificatesFile = req.files?.certificates?.[0];

    if (!resumeFile) {
      return res.status(400).json({
        success: false,
        message: 'Please upload your resume in PDF format (max 5 MB).'
      });
    }

    const isPdf =
      resumeFile.mimetype === 'application/pdf' ||
      (resumeFile.originalname || '').toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      return res.status(400).json({
        success: false,
        message: 'Resume must be a PDF file.'
      });
    }
    if (resumeFile.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: 'Resume file size must not exceed 5 MB.'
      });
    }

    if (
      !declarations?.accurateInfo ||
      !declarations?.understandPerformanceBased ||
      !declarations?.agreeToContact
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please accept all three declaration checkboxes before submitting.'
      });
    }

    // Duplicate submission prevention
    const existing = await InternApplication.findOne({
      $or: [
        { 'personalInfo.email': email },
        { 'personalInfo.mobileNumber': mobileNumber }
      ]
    }).select('applicationId personalInfo.email');

    if (existing) {
      return res.status(409).json({
        success: false,
        message: `An application with this email or mobile number has already been submitted (Application ID: ${existing.applicationId}).`
      });
    }

    // Generate unique Application ID
    let applicationId = generateApplicationId();
    while (await InternApplication.exists({ applicationId })) {
      applicationId = generateApplicationId();
    }

    // Upload files
    const resumeMetadata = await uploadApplicationFile(resumeFile, 'resumes', applicationId);
    const certificatesMetadata = certificatesFile
      ? await uploadApplicationFile(certificatesFile, 'certificates', applicationId)
      : null;

    const application = new InternApplication({
      applicationId,
      position: 'Sales & Business Development Intern',
      status: 'Submitted',
      personalInfo: {
        fullName,
        email,
        mobileNumber,
        whatsappNumber,
        currentLocation,
        age
      },
      education: {
        collegeName,
        degreeDepartment,
        currentYearOfStudy,
        graduationYear,
        currentlyStudying
      },
      socialProfiles: {
        instagramUrl: sanitizeString(socialProfiles?.instagramUrl, 300),
        linkedinUrl: sanitizeString(socialProfiles?.linkedinUrl, 300),
        youtubeUrl: sanitizeString(socialProfiles?.youtubeUrl, 300),
        facebookUrl: sanitizeString(socialProfiles?.facebookUrl, 300),
        portfolioUrl: sanitizeString(socialProfiles?.portfolioUrl, 300),
        otherProfiles: sanitizeString(socialProfiles?.otherProfiles, 500)
      },
      experienceAndSkills: {
        hasPreviousSalesExperience,
        previousPromotionDetails,
        workedAsAmbassador,
        strongestSkills,
        experienceDescription
      },
      salesAssessment: {
        approachFiftyStudents,
        convinceHesitantStudent,
        handleFeeObjection,
        callComfortLevel,
        whyGoodFit
      },
      availability: {
        hoursPerDay,
        daysPerWeek,
        preferredDuration,
        earliestJoiningDate,
        comfortableIndependent,
        comfortablePerformanceBased
      },
      resume: resumeMetadata,
      certificates: certificatesMetadata,
      additionalInfo,
      declarations: {
        accurateInfo: Boolean(declarations.accurateInfo),
        understandPerformanceBased: Boolean(declarations.understandPerformanceBased),
        agreeToContact: Boolean(declarations.agreeToContact)
      }
    });

    await application.save();

    // Send emails in parallel
    const [teamEmailRes, applicantEmailRes] = await Promise.allSettled([
      sendRecruitmentTeamNotification(application, resumeFile),
      sendApplicantConfirmation(application)
    ]);

    const adminSent =
      teamEmailRes.status === 'fulfilled' && Boolean(teamEmailRes.value?.success);
    const applicantSent =
      applicantEmailRes.status === 'fulfilled' && Boolean(applicantEmailRes.value?.success);

    if (adminSent || applicantSent) {
      application.adminEmailSent = adminSent;
      application.applicantEmailSent = applicantSent;
      await application.save();
    }

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      data: {
        applicationId: application.applicationId,
        position: application.position,
        fullName: application.personalInfo.fullName,
        email: application.personalInfo.email,
        status: application.status,
        submittedAt: application.submittedAt
      }
    });
  } catch (error) {
    console.error('❌ Error submitting intern application:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit application. Please try again.'
    });
  }
};

// POST /api/intern-applications/admin/login
exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body || {};
    const expectedUser = process.env.ADMIN_USERNAME || 'admin';
    const expectedPass =
      process.env.ADMIN_PASSWORD ||
      (process.env.NODE_ENV !== 'production' ? 'atspeaks-admin' : '');

    if (!expectedPass) {
      return res.status(500).json({
        success: false,
        message: 'Admin authentication is not configured on the server.'
      });
    }

    if (username !== expectedUser || password !== expectedPass) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password.'
      });
    }

    const token = signAdminToken(username);
    return res.json({
      success: true,
      token,
      user: { username }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Login failed.' });
  }
};

// GET /api/intern-applications (Admin)
exports.listApplications = async (req, res) => {
  try {
    const { search = '', status = '' } = req.query;
    const filter = {};

    if (status && ALLOWED_STATUSES.includes(status)) {
      filter.status = status;
    }

    if (search && String(search).trim()) {
      const escaped = String(search)
        .trim()
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, 'i');
      filter.$or = [
        { applicationId: regex },
        { 'personalInfo.fullName': regex },
        { 'personalInfo.email': regex },
        { 'personalInfo.mobileNumber': regex }
      ];
    }

    const [applications, countsAgg] = await Promise.all([
      InternApplication.find(filter).sort({ createdAt: -1 }).lean(),
      InternApplication.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ])
    ]);

    const statusCounts = ALLOWED_STATUSES.reduce((acc, s) => {
      acc[s] = 0;
      return acc;
    }, {});
    let total = 0;
    for (const item of countsAgg) {
      if (statusCounts[item._id] !== undefined) {
        statusCounts[item._id] = item.count;
      }
      total += item.count;
    }

    return res.json({
      success: true,
      data: applications,
      summary: { total, statusCounts }
    });
  } catch (error) {
    console.error('❌ Error listing intern applications:', error);
    return res.status(500).json({ success: false, message: 'Failed to load applications.' });
  }
};

// GET /api/intern-applications/:id (Admin)
exports.getApplicationById = async (req, res) => {
  try {
    const application = await InternApplication.findOne({
      $or: [
        { applicationId: req.params.id },
        ...(mongoose.isValidObjectId(req.params.id) ? [{ _id: req.params.id }] : [])
      ]
    }).lean();

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    return res.json({ success: true, data: application });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to load application.' });
  }
};

// PATCH /api/intern-applications/:id/status (Admin)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body || {};
    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value.'
      });
    }

    const application = await InternApplication.findOneAndUpdate(
      {
        $or: [
          { applicationId: req.params.id },
          ...(mongoose.isValidObjectId(req.params.id) ? [{ _id: req.params.id }] : [])
        ]
      },
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    return res.json({
      success: true,
      message: 'Status updated successfully.',
      data: application
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update status.' });
  }
};

// GET /api/intern-applications/:id/file?type=resume|certificates (Admin)
exports.downloadApplicationFile = async (req, res) => {
  try {
    const fileType = req.query.type === 'certificates' ? 'certificates' : 'resume';
    const application = await InternApplication.findOne({
      $or: [
        { applicationId: req.params.id },
        ...(mongoose.isValidObjectId(req.params.id) ? [{ _id: req.params.id }] : [])
      ]
    }).lean();

    if (!application || !application[fileType]) {
      return res.status(404).json({ success: false, message: 'File not found.' });
    }

    const fileMeta = application[fileType];

    if (fileMeta.storageType === 'cloudinary') {
      const signedUrl = getSignedCloudinaryUrl(fileMeta.publicId);
      if (signedUrl) {
        return res.redirect(signedUrl);
      }
      return res.redirect(fileMeta.url);
    }

    const localPath = getLocalFilePath(fileMeta.publicId);
    if (!fs.existsSync(localPath)) {
      return res.status(404).json({ success: false, message: 'Stored file not found on server.' });
    }

    res.setHeader('Content-Type', fileMeta.mimeType || 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${encodeURIComponent(fileMeta.originalName || `${application.applicationId}-${fileType}.pdf`)}"`
    );
    return fs.createReadStream(localPath).pipe(res);
  } catch (error) {
    console.error('❌ Error downloading file:', error);
    return res.status(500).json({ success: false, message: 'Failed to download file.' });
  }
};

// GET /api/intern-applications/export/csv (Admin)
exports.exportApplicationsCsv = async (req, res) => {
  try {
    const { status = '' } = req.query;
    const filter = status && ALLOWED_STATUSES.includes(status) ? { status } : {};
    const applications = await InternApplication.find(filter).sort({ createdAt: -1 }).lean();

    const csvEscape = (val) => {
      const str = String(val ?? '').replace(/\r?\n/g, ' ');
      if (/[",]/.test(str)) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const headers = [
      'Application ID',
      'Status',
      'Submitted At',
      'Full Name',
      'Email',
      'Mobile Number',
      'WhatsApp Number',
      'Location',
      'Age',
      'College / University',
      'Degree / Department',
      'Year of Study',
      'Graduation Year',
      'Currently Studying',
      'Instagram',
      'LinkedIn',
      'YouTube',
      'Facebook',
      'Portfolio',
      'Other Profiles',
      'Previous Sales Exp',
      'Campus Ambassador',
      'Strongest Skills',
      'Promoted Products/Courses',
      'Experience Description',
      'Approach 50 Students',
      'Convince Hesitant Student',
      'Handle Fee Objection',
      'Call Comfort Level',
      'Why Good Fit',
      'Hours / Day',
      'Days / Week',
      'Preferred Duration',
      'Earliest Joining Date',
      'Comfortable Independent',
      'Comfortable Performance-Based',
      'Resume File',
      'Additional Info'
    ];

    const rows = applications.map((app) =>
      [
        app.applicationId,
        app.status,
        app.submittedAt ? new Date(app.submittedAt).toISOString() : '',
        app.personalInfo?.fullName,
        app.personalInfo?.email,
        app.personalInfo?.mobileNumber,
        app.personalInfo?.whatsappNumber,
        app.personalInfo?.currentLocation,
        app.personalInfo?.age,
        app.education?.collegeName,
        app.education?.degreeDepartment,
        app.education?.currentYearOfStudy,
        app.education?.graduationYear,
        app.education?.currentlyStudying,
        app.socialProfiles?.instagramUrl,
        app.socialProfiles?.linkedinUrl,
        app.socialProfiles?.youtubeUrl,
        app.socialProfiles?.facebookUrl,
        app.socialProfiles?.portfolioUrl,
        app.socialProfiles?.otherProfiles,
        app.experienceAndSkills?.hasPreviousSalesExperience,
        app.experienceAndSkills?.workedAsAmbassador,
        (app.experienceAndSkills?.strongestSkills || []).join('; '),
        app.experienceAndSkills?.previousPromotionDetails,
        app.experienceAndSkills?.experienceDescription,
        app.salesAssessment?.approachFiftyStudents,
        app.salesAssessment?.convinceHesitantStudent,
        app.salesAssessment?.handleFeeObjection,
        app.salesAssessment?.callComfortLevel,
        app.salesAssessment?.whyGoodFit,
        app.availability?.hoursPerDay,
        app.availability?.daysPerWeek,
        app.availability?.preferredDuration,
        app.availability?.earliestJoiningDate,
        app.availability?.comfortableIndependent,
        app.availability?.comfortablePerformanceBased,
        app.resume?.originalName,
        app.additionalInfo
      ]
        .map(csvEscape)
        .join(',')
    );

    const csvContent = '\uFEFF' + [headers.map(csvEscape).join(','), ...rows].join('\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="atspeaks-sales-intern-applications-${new Date().toISOString().slice(0, 10)}.csv"`
    );
    return res.send(csvContent);
  } catch (error) {
    console.error('❌ Error exporting CSV:', error);
    return res.status(500).json({ success: false, message: 'Failed to export applications.' });
  }
};
