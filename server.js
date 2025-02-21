const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// Contact form POST route
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  console.log("Form Data Received:", { name, email, message });

  // Nodemailer setup
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hemendraalawa143@gmail.com", // Replace with your Gmail address
      pass: "aoue wczt ogyz ruuf", // Replace with your Gmail app password
    },
  });

  const mailOptions = {
    from: "hemendraalawa143@gmail.com", // Your Gmail address
    to: "hemendraalawa2017@gmail.com", // Your email
    subject: `New Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    replyTo: email, // User's email
  };

  try {
    await transporter.sendMail(mailOptions); // ✅ Await ka use kiya
    console.log("Email sent successfully!");
    return res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Failed to send email." });
  }
});

// Keep server alive (Render cold start fix)
setInterval(() => {
  fetch("https://my-portfolio-backend-rfbf.onrender.com/")
    .then(() => console.log("Keep-alive request sent!"))
    .catch((err) => console.error("Keep-alive error:", err));
}, 300000); // Every 5 minutes (300000 ms)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
