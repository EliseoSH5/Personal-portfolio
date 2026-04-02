const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  const { firstName, lastName, email, message } = req.body;
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'amparo53@ethereal.email',
        pass: 'SX3BscTNWf4yAuVRQq'
    }
  });

  try {
    await transporter.sendMail({
      from: `"${firstName}" <${email}>`,
      to: "eliseosh5@gmail.com",
      subject: "Contact Form Submission - Portfolio",
      text: message,
    });
    res.status(200).json({ code: 200, status: "Message Sent" });
  } catch (error) {
    res.status(500).json({ code: 500, status: "Error", message: error.message });
  }
}