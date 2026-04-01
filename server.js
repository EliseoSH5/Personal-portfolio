const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(5000, () => console.log("Server Running on port 5000"));

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'amy44@ethereal.email',
      pass: 'jj4j7PvZwG632ArfK1p'
  }
});

// Fixed: Use a callback instead of top-level await
transporter.verify((error, success) => {
  if (error) {
    console.error("Verification failed:", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

router.post("/contact", (req, res) => {
  const name = req.body.firstName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;

  const mail = {
    from: name,
    to: "amy44@ethereal.email",
    subject: "Contact Form Submission - Portfolio",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
  };

  transporter.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ code: 200, status: "Message Sent" });
    }
  });
});