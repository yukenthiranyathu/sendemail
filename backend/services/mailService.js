require('dotenv').config();
const nodemailer = require('nodemailer');

const sendWelcomeEmail = async (email) => {
  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER, // your Gmail email
      pass: process.env.SMTP_PASS, // your Gmail app-specific password
    },
  });

  // Setup email data
  let mailOptions = {
    from: process.env.SMTP_USER, // your Gmail email
    to: email,
    subject: 'Hello World',
    html: '<p>Wel Come To Our Website <strong>projectK.com</strong>!</p>',
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.log('Error sending email:', error);
  }
};

module.exports = { sendWelcomeEmail };
