const nodemailer = require('nodemailer');

const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('⚠️ Email credentials not configured (EMAIL_USER / EMAIL_PASS)');
    return null;
  }

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

const getWhatsAppInviteUrl = () => {
  return (
    process.env.SALES_INTERN_WHATSAPP_URL ||
    'https://chat.whatsapp.com/EtsdMfwoC8oJWnQdHi0uO0'
  );
};

/**
 * Send detailed application notification to the AT Speaks recruitment team.
 */
exports.sendRecruitmentTeamNotification = async (application, resumeFile) => {
  const transporter = createTransporter();
  if (!transporter) {
    return { success: false, error: 'Email not configured' };
  }

  const recipient = process.env.RECRUITMENT_EMAIL || 'connect.atspeaks@gmail.com';
  const {
    applicationId,
    personalInfo,
    education,
    socialProfiles,
    experienceAndSkills,
    salesAssessment,
    availability,
    additionalInfo,
    resume,
    submittedAt
  } = application;

  const submittedFormatted = new Date(submittedAt || Date.now()).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  const socialRows = [
    ['Instagram', socialProfiles?.instagramUrl],
    ['LinkedIn', socialProfiles?.linkedinUrl],
    ['YouTube', socialProfiles?.youtubeUrl],
    ['Facebook', socialProfiles?.facebookUrl],
    ['Portfolio / Website', socialProfiles?.portfolioUrl],
    ['Other Profiles', socialProfiles?.otherProfiles]
  ]
    .filter(([, val]) => Boolean(val))
    .map(
      ([label, val]) =>
        `<tr><td style="padding:6px 8px;font-weight:600;color:#334155;width:190px;">${escapeHtml(label)}</td><td style="padding:6px 8px;color:#0f172a;">${escapeHtml(val)}</td></tr>`
    )
    .join('');

  const attachments = [];
  if (resumeFile && resumeFile.buffer) {
    attachments.push({
      filename: resumeFile.originalname || `${applicationId}-resume.pdf`,
      content: resumeFile.buffer,
      contentType: resumeFile.mimetype || 'application/pdf'
    });
  }

  const mailOptions = {
    from: `"AT Speaks Recruitment" <${process.env.EMAIL_USER}>`,
    to: recipient,
    subject: `New Sales Intern Application - ${personalInfo.fullName} - ${applicationId}`,
    attachments,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 720px; margin: 0 auto; color: #0f172a;">
        <div style="background: linear-gradient(135deg, #1f3492, #c8348f); padding: 24px; border-radius: 12px 12px 0 0; color: #ffffff;">
          <p style="margin: 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; opacity: 0.9;">AT SPEAKS | RECRUITMENT</p>
          <h2 style="margin: 6px 0 0; font-size: 22px;">New Sales &amp; Business Development Intern Application</h2>
          <p style="margin: 8px 0 0; font-size: 14px;">Application ID: <strong>${escapeHtml(applicationId)}</strong> &bull; Submitted: ${escapeHtml(submittedFormatted)} IST</p>
        </div>

        <div style="border: 1px solid #e2e8f0; border-top: none; padding: 24px; border-radius: 0 0 12px 12px; background: #ffffff;">
          <h3 style="color: #1f3492; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; margin-top: 0;">1. Personal Information</h3>
          <table style="width:100%; border-collapse:collapse; font-size:14px;">
            <tr><td style="padding:6px 8px;font-weight:600;color:#334155;width:190px;">Full Name</td><td style="padding:6px 8px;">${escapeHtml(personalInfo.fullName)}</td></tr>
            <tr><td style="padding:6px 8px;font-weight:600;color:#334155;">Email Address</td><td style="padding:6px 8px;">${escapeHtml(personalInfo.email)}</td></tr>
            <tr><td style="padding:6px 8px;font-weight:600;color:#334155;">Mobile Number</td><td style="padding:6px 8px;">${escapeHtml(personalInfo.mobileNumber)}</td></tr>
            <tr><td style="padding:6px 8px;font-weight:600;color:#334155;">WhatsApp Number</td><td style="padding:6px 8px;">${escapeHtml(personalInfo.whatsappNumber)}</td></tr>
            <tr><td style="padding:6px 8px;font-weight:600;color:#334155;">Current Location</td><td style="padding:6px 8px;">${escapeHtml(personalInfo.currentLocation)}</td></tr>
            <tr><td style="padding:6px 8px;font-weight:600;color:#334155;">Age</td><td style="padding:6px 8px;">${escapeHtml(personalInfo.age)}</td></tr>
          </table>

          <h3 style="color: #1f3492; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; margin-top: 22px;">2. Educational Details</h3>
          <table style="width:100%; border-collapse:collapse; font-size:14px;">
            <tr><td style="padding:6px 8px;font-weight:600;color:#334155;width:190px;">College / University</td><td style="padding:6px 8px;">${escapeHtml(education.collegeName)}</td></tr>
            <tr><td style="padding:6px 8px;font-weight:600;color:#334155;">Degree / Department</td><td style="padding:6px 8px;">${escapeHtml(education.degreeDepartment)}</td></tr>
            <tr><td style="padding:6px 8px;font-weight:600;color:#334155;">Current Year of Study</td><td style="padding:6px 8px;">${escapeHtml(education.currentYearOfStudy)}</td></tr>
            <tr><td style="padding:6px 8px;font-weight:600;color:#334155;">Graduation Year</td><td style="padding:6px 8px;">${escapeHtml(education.graduationYear)}</td></tr>
            <tr><td style="padding:6px 8px;font-weight:600;color:#334155;">Currently Studying?</td><td style="padding:6px 8px;">${escapeHtml(education.currentlyStudying)}</td></tr>
          </table>

          <h3 style="color: #1f3492; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; margin-top: 22px;">3. Social &amp; Digital Presence</h3>
          ${
            socialRows
              ? `<table style="width:100%; border-collapse:collapse; font-size:14px;">${socialRows}</table>`
              : `<p style="font-size:14px;color:#64748b;">No social profiles provided.</p>`
          }

          <h3 style="color: #1f3492; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; margin-top: 22px;">4. Experience &amp; Skills</h3>
          <table style="width:100%; border-collapse:collapse; font-size:14px;">
            <tr><td style="padding:6px 8px;font-weight:600;color:#334155;width:240px;">Previous Sales/Marketing Exp?</td><td style="padding:6px 8px;">${escapeHtml(experienceAndSkills.hasPreviousSalesExperience)}</td></tr>
            <tr><td style="padding:6px 8px;font-weight:600;color:#334155;">Campus Ambassador / Lead?</td><td style="padding:6px 8px;">${escapeHtml(experienceAndSkills.workedAsAmbassador)}</td></tr>
            <tr><td style="padding:6px 8px;font-weight:600;color:#334155;">Strongest Skills</td><td style="padding:6px 8px;">${escapeHtml((experienceAndSkills.strongestSkills || []).join(', '))}</td></tr>
          </table>
          <p style="font-size:13px;font-weight:600;color:#334155;margin:10px 0 4px;">Promoted/Sold Products or Courses:</p>
          <p style="font-size:14px;background:#f8fafc;padding:10px;border-radius:6px;margin:0;">${escapeHtml(experienceAndSkills.previousPromotionDetails)}</p>
          ${
            experienceAndSkills.experienceDescription
              ? `<p style="font-size:13px;font-weight:600;color:#334155;margin:10px 0 4px;">Previous Experience Description:</p><p style="font-size:14px;background:#f8fafc;padding:10px;border-radius:6px;margin:0;">${escapeHtml(experienceAndSkills.experienceDescription)}</p>`
              : ''
          }

          <h3 style="color: #1f3492; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; margin-top: 22px;">5. Sales &amp; Business Assessment</h3>
          <p style="font-size:13px;font-weight:600;color:#334155;margin:8px 0 4px;">Q1: How would you find and approach 50 potential students?</p>
          <p style="font-size:14px;background:#f8fafc;padding:10px;border-radius:6px;margin:0 0 10px;">${escapeHtml(salesAssessment.approachFiftyStudents)}</p>

          <p style="font-size:13px;font-weight:600;color:#334155;margin:8px 0 4px;">Q2: How would you convince a hesitant student?</p>
          <p style="font-size:14px;background:#f8fafc;padding:10px;border-radius:6px;margin:0 0 10px;">${escapeHtml(salesAssessment.convinceHesitantStudent)}</p>

          <p style="font-size:13px;font-weight:600;color:#334155;margin:8px 0 4px;">Q3: How would you respond if a student says the fee is too expensive?</p>
          <p style="font-size:14px;background:#f8fafc;padding:10px;border-radius:6px;margin:0 0 10px;">${escapeHtml(salesAssessment.handleFeeObjection)}</p>

          <p style="font-size:13px;font-weight:600;color:#334155;margin:8px 0 4px;">Q4: Comfort level making calls and following up:</p>
          <p style="font-size:14px;background:#f8fafc;padding:10px;border-radius:6px;margin:0 0 10px;">${escapeHtml(salesAssessment.callComfortLevel)}</p>

          <p style="font-size:13px;font-weight:600;color:#334155;margin:8px 0 4px;">Q5: Why do you think you would be a good fit for AT Speaks?</p>
          <p style="font-size:14px;background:#f8fafc;padding:10px;border-radius:6px;margin:0;">${escapeHtml(salesAssessment.whyGoodFit)}</p>

          <h3 style="color: #1f3492; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; margin-top: 22px;">6. Availability &amp; Commitment</h3>
          <table style="width:100%; border-collapse:collapse; font-size:14px;">
            <tr><td style="padding:6px 8px;font-weight:600;color:#334155;width:240px;">Hours Available / Day</td><td style="padding:6px 8px;">${escapeHtml(availability.hoursPerDay)}</td></tr>
            <tr><td style="padding:6px 8px;font-weight:600;color:#334155;">Days Available / Week</td><td style="padding:6px 8px;">${escapeHtml(availability.daysPerWeek)}</td></tr>
            <tr><td style="padding:6px 8px;font-weight:600;color:#334155;">Preferred Duration</td><td style="padding:6px 8px;">${escapeHtml(availability.preferredDuration)}</td></tr>
            <tr><td style="padding:6px 8px;font-weight:600;color:#334155;">Earliest Joining Date</td><td style="padding:6px 8px;">${escapeHtml(availability.earliestJoiningDate)}</td></tr>
            <tr><td style="padding:6px 8px;font-weight:600;color:#334155;">Comfortable Working Independently?</td><td style="padding:6px 8px;">${escapeHtml(availability.comfortableIndependent)}</td></tr>
            <tr><td style="padding:6px 8px;font-weight:600;color:#334155;">Comfortable Performance-Based?</td><td style="padding:6px 8px;">${escapeHtml(availability.comfortablePerformanceBased)}</td></tr>
          </table>

          ${
            additionalInfo
              ? `<h3 style="color: #1f3492; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; margin-top: 22px;">7. Additional Information</h3><p style="font-size:14px;background:#f8fafc;padding:10px;border-radius:6px;">${escapeHtml(additionalInfo)}</p>`
              : ''
          }

          <div style="margin-top: 22px; padding: 14px; background: #f1f5f9; border-radius: 8px; font-size: 13px;">
            <strong>Resume:</strong> ${escapeHtml(resume?.originalName || 'Attached')}
            ${
              resume?.storageType === 'cloudinary' && resume?.url
                ? ` &mdash; Stored securely in Cloudinary (accessible via Admin Dashboard).`
                : ` &mdash; Attached to this email &amp; accessible in the Admin Dashboard.`
            }
          </div>
        </div>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Recruitment team notification sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending recruitment notification:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Send automatic confirmation email to the applicant.
 */
exports.sendApplicantConfirmation = async (application) => {
  const transporter = createTransporter();
  if (!transporter) {
    return { success: false, error: 'Email not configured' };
  }

  const whatsappUrl = getWhatsAppInviteUrl();
  const { applicationId, personalInfo } = application;

  const mailOptions = {
    from: `"AT Speaks Recruitment" <${process.env.EMAIL_USER}>`,
    to: personalInfo.email,
    subject: 'Application Received - Sales & Business Development Intern | AT Speaks',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0f172a;">
        <div style="background: linear-gradient(135deg, #1f3492, #c8348f); padding: 28px 24px; border-radius: 12px 12px 0 0; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 22px;">AT Speaks</h1>
          <p style="margin: 6px 0 0; font-size: 13px; opacity: 0.9;">Educate. Evolve. Empower.</p>
        </div>

        <div style="border: 1px solid #e2e8f0; border-top: none; padding: 28px 24px; border-radius: 0 0 12px 12px; background: #ffffff;">
          <p style="font-size: 15px; margin-top: 0;">Hi <strong>${escapeHtml(personalInfo.fullName)}</strong>,</p>
          <p style="font-size: 14px; line-height: 1.6; color: #334155;">
            Thank you for applying to the Sales &amp; Business Development Intern position at AT Speaks!
            We are excited about your interest in joining our growing team.
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #334155;">
            Your application has been successfully received.
          </p>

          <div style="background: #f8fafc; border-left: 4px solid #1f3492; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px; color: #1f3492; font-size: 15px;">Application Details:</h3>
            <ul style="margin: 0; padding-left: 18px; font-size: 14px; line-height: 1.8; color: #1e293b;">
              <li><strong>Position:</strong> Sales &amp; Business Development Intern</li>
              <li><strong>Application ID:</strong> ${escapeHtml(applicationId)}</li>
              <li><strong>Work Mode:</strong> Remote</li>
              <li><strong>Application Status:</strong> Submitted</li>
            </ul>
          </div>

          <p style="font-size: 14px; line-height: 1.6; color: #334155;">
            Our recruitment team will review your application. Shortlisted candidates will be contacted through their registered email address or phone number regarding the next steps.
          </p>

          <div style="background: linear-gradient(135deg, #eff6ff, #fdf2f8); border: 1px solid #e2e8f0; padding: 20px; border-radius: 10px; margin: 24px 0; text-align: center;">
            <h3 style="margin: 0 0 8px; color: #1f3492; font-size: 16px;">One More Step!</h3>
            <p style="margin: 0 0 16px; font-size: 13px; color: #475569; line-height: 1.5;">
              Join our official AT Speaks WhatsApp recruitment group to stay informed about recruitment announcements, updates and further instructions.
            </p>
            <a href="${escapeHtml(whatsappUrl)}" target="_blank" rel="noopener noreferrer"
               style="display: inline-block; background: #16a34a; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 12px 24px; border-radius: 9999px;">
              JOIN AT SPEAKS WHATSAPP GROUP
            </a>
          </div>

          <p style="font-size: 14px; line-height: 1.6; color: #334155;">
            Thank you for considering AT Speaks as part of your growth journey.
          </p>

          <p style="font-size: 14px; color: #334155; margin-bottom: 0;">
            Best Regards,<br />
            <strong>Team AT Speaks</strong><br />
            <span style="color: #64748b; font-size: 12px;">Educate. Evolve. Empower.</span><br />
            <a href="https://www.theatspeaks.com" style="color: #1f3492; font-size: 12px;">www.theatspeaks.com</a>
          </p>
        </div>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Applicant confirmation email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending applicant confirmation email:', error.message);
    return { success: false, error: error.message };
  }
};
