const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // CREATE a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // DEFINE the email options
  const mailOptions = {
    from: 'Jorge Sanchez <jorge.i.sanchez.2018@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  // SEND the email
  await transporter.send(mailOptions);
};

module.exports = sendEmail;
