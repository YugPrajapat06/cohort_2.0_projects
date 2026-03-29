import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify()
    .then(()=>{console.log("Email Transporter is ready to send Emails")})
    .catch((err)=> { console.error("Email transporter verification failed:", err); })


export async function sendEmail({to, subject ,html, text}) {
    const mailOptions = {
        from : process.env.EMAIL_USER,
        to,
        subject,
        html,
        text
    }
    const details = await transporter.sendMail(mailOptions);
    console.log("Email send : ", details);
    
}