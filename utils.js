const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "info@gcidt.com",
    pass: "zbmdqhlifvqenawm",
  },
});

async function sendEMail({
  firstName,
  lastName,
  email,
  phoneNumber,
  threat,
  details,
}) {
  const recipients = ["info@gcidt.com"];
  const fullName = `${firstName} ${lastName}`;
  const mailOptions = {
    from: "info@gcidt.com",
    to: recipients.join(", "),
    subject: "📧 Mail from GCIDT Website 📧",
    html: `
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phoneNumber}</p>
      <p><strong>Threat:</strong> ${threat}</p>
      <p><strong>Details:</strong> ${details}</p>
    `,
  };

  const info = await transporter.sendMail(mailOptions);

  const thankYouMailOptions = {
    from: "info@gcidt.com",
    to: email,
    subject: "🎉Thank You for Contacting GCIDT 🎉",
    html: `
      <p>Dear ${fullName},</p>
      <p>Thank you for reaching out to GCIDT. We have received your message and our team will get back to you shortly.</p>
      <li><a href="https://gcidt.com/" target="_blank">Visit Our Website</a></li>
        <li><a href="https://www.facebook.com/gcidt/" target="_blank">Like us on Facebook</a></li>
        <li><a href="https://www.linkedin.com/company/group-cyber-id/" target="_blank">Follow us on Linkedin</a></li>
      </ul>
      <p>Best regards,<br/>TheGeekStudio Team</p>
    `,
  };

  const thankYouInfo = await transporter.sendMail(thankYouMailOptions);

  return { info, thankYouInfo };
}

module.exports = sendEMail;
