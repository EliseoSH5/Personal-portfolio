const nodemailer = require("nodemailer");

// En Vercel, la función debe exportarse así para ser una Serverless Function
module.exports = async (req, res) => {
  // 1. IMPORTANTE: Solo permitir peticiones POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed. Use POST." });
  }

  const { firstName, email, message } = req.body;

  // 2. Configuración de Nodemailer (Ethereal para pruebas o Gmail para real)
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email", 
    port: 587,
    auth: {
      user: 'tu_usuario_aqui', // Reemplaza con tus credenciales
      pass: 'tu_password_aqui',
    },
  });

  try {
    // 3. Enviar el correo
    await transporter.sendMail({
      from: `"${firstName}" <${email}>`,
      to: "tu-correo-destino@gmail.com",
      subject: "New Contact Form Submission",
      text: `Name: ${firstName}\nEmail: ${email}\nMessage: ${message}`,
    });

    // 4. RESPUESTA ÉXITO: Esto evita el error de "Unexpected end of JSON"
    return res.status(200).json({ code: 200, status: "Message Sent" });

  } catch (error) {
    console.error("Error en Nodemailer:", error);
    return res.status(500).json({ code: 500, status: "Error", message: error.message });
  }
};