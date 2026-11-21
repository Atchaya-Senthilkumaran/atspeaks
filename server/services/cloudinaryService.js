const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const isCloudinaryConfigured = () => {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
};

const getCloudinaryClient = () => {
  const cloudinary = require('cloudinary').v2;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });
  return cloudinary;
};

const uploadBufferToCloudinary = (buffer, options) => {
  const cloudinary = getCloudinaryClient();
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    });
    stream.end(buffer);
  });
};

const saveLocally = (file, folderName, applicationId) => {
  const uploadDir = path.join(__dirname, '..', 'uploads', 'intern-applications', folderName);
  fs.mkdirSync(uploadDir, { recursive: true });
  const ext = path.extname(file.originalname || '') || '.pdf';
  const safeBase = `${applicationId}-${crypto.randomBytes(4).toString('hex')}${ext}`;
  const fullPath = path.join(uploadDir, safeBase);
  fs.writeFileSync(fullPath, file.buffer);
  return {
    url: `local://${folderName}/${safeBase}`,
    publicId: `${folderName}/${safeBase}`,
    storageType: 'local',
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size
  };
};

/**
 * Upload an application file (resume or certificate) to Cloudinary if configured,
 * otherwise store in a private local uploads folder.
 */
exports.uploadApplicationFile = async (file, folderName, applicationId) => {
  if (!file) return null;

  if (isCloudinaryConfigured()) {
    const result = await uploadBufferToCloudinary(file.buffer, {
      folder: `atspeaks/intern-applications/${folderName}`,
      public_id: `${applicationId}-${Date.now()}`,
      resource_type: 'raw',
      access_mode: 'authenticated'
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      storageType: 'cloudinary',
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size
    };
  }

  return saveLocally(file, folderName, applicationId);
};

/**
 * Resolve a local file path for authenticated admin download.
 */
exports.getLocalFilePath = (publicId) => {
  const safeRelative = path.normalize(publicId).replace(/^(\.\.(\/|\\|$))+/, '');
  return path.join(__dirname, '..', 'uploads', 'intern-applications', safeRelative);
};

/**
 * Generate a short-lived signed download URL for Cloudinary raw files.
 */
exports.getSignedCloudinaryUrl = (publicId) => {
  if (!isCloudinaryConfigured()) return null;
  const cloudinary = getCloudinaryClient();
  const expiresAt = Math.floor(Date.now() / 1000) + 300; // 5 minutes
  return cloudinary.utils.private_download_url(publicId, 'pdf', {
    resource_type: 'raw',
    type: 'authenticated',
    expires_at: expiresAt
  });
};
