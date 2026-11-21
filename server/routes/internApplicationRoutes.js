const express = require('express');
const multer = require('multer');
const rateLimit = require('express-rate-limit');
const router = express.Router();

const internApplicationController = require('../controllers/internApplicationController');
const { requireAdminAuth } = require('../middleware/adminAuth');

// Rate limiter for public application submission (max 10 requests per 15 min per IP)
const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many application attempts from this IP. Please try again after 15 minutes.'
  }
});

// Rate limiter for admin login (max 15 attempts per 15 min per IP)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts. Please try again later.'
  }
});

// Multer memory storage with 5 MB file size limit
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'resume') {
      const isPdf =
        file.mimetype === 'application/pdf' ||
        (file.originalname || '').toLowerCase().endsWith('.pdf');
      if (!isPdf) {
        return cb(new Error('Resume must be a PDF file (.pdf).'));
      }
      return cb(null, true);
    }

    if (file.fieldname === 'certificates') {
      const allowed = [
        'application/pdf',
        'image/png',
        'image/jpeg',
        'image/jpg'
      ];
      if (!allowed.includes(file.mimetype)) {
        return cb(new Error('Certificates must be a PDF, PNG, or JPG file.'));
      }
      return cb(null, true);
    }

    return cb(new Error('Unexpected file field.'));
  }
});

const handleUpload = (req, res, next) => {
  const uploadFields = upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'certificates', maxCount: 1 }
  ]);

  uploadFields(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File size exceeds the 5 MB limit.'
        });
      }
      return res.status(400).json({ success: false, message: err.message });
    }
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    return next();
  });
};

// Public route: Submit Sales Intern application
router.post('/', submitLimiter, handleUpload, internApplicationController.submitApplication);

// Admin authentication
router.post('/admin/login', loginLimiter, internApplicationController.adminLogin);

// Protected Admin routes
router.get('/export/csv', requireAdminAuth, internApplicationController.exportApplicationsCsv);
router.get('/', requireAdminAuth, internApplicationController.listApplications);
router.get('/:id/file', requireAdminAuth, internApplicationController.downloadApplicationFile);
router.get('/:id', requireAdminAuth, internApplicationController.getApplicationById);
router.patch('/:id/status', requireAdminAuth, internApplicationController.updateApplicationStatus);

module.exports = router;
