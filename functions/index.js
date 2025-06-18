const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// Email transport configuration using Firebase Functions environment config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.pass,
  },
});

exports.sendPhotoEmail = functions.https.onRequest(async (req, res) => {
  const {url} = req.body;

  if (!url) {
    return res.status(400).send("Missing photo URL");
  }

  try {
    await transporter.sendMail({
      from: `"Photo Upload Bot" <${functions.config().email.user}>`,
      to: "info@m1-b.com", // Replace with your team's email address
      subject: "New Photo Uploaded",
      html:
        `<p>A new photo was uploaded:</p>` +
        `<p><a href="${url}">${url}</a></p>`,
    });

    res.status(200).send("Email sent!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email.");
  }
});
