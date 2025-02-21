app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  console.log("Form Data Received:", { name, email, message });

  // Nodemailer setup
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hemendraalawa143@gmail.com", 
      pass: "aoue wczt ogyz ruuf", 
    },
  });

  const mailOptions = {
    from: "hemendraalawa143@gmail.com",
    to: "hemendraalawa2017@gmail.com",
    subject: `New Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);  // ✅ Await ka use kiya
    console.log("Email sent successfully!");
    return res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Failed to send email." });
  }
});
