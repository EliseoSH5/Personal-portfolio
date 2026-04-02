// api/contact.js
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const { firstName, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email", // Cambia esto por tu SMTP real (Gmail, etc.)
      port: 587,
      auth: {
        user: 'amparo53@ethereal.email',
        pass: 'SX3BscTNWf4yAuVRQq'
      },
    });

    try {
      await transporter.sendMail({
        from: `"${firstName}" <${email}>`,
        to: "eliseosh5@gmail.com",
        subject: "New Portfolio Message",
        text: message,
      });
      res.status(200).json({ code: 200, status: "Message Sent" });
    } catch (error) {
      res.status(500).json({ code: 500, status: "Error", message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};