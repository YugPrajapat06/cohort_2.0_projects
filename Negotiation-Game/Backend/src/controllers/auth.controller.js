import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service";

const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f8;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 500px;
      margin: 40px auto;
      background: #ffffff;
      padding: 30px;
      border-radius: 10px;
      text-align: center;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
    h1 {
      color: #28a745;
    }
    p {
      color: #555;
      font-size: 16px;
      margin: 15px 0;
    }
    .btn {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 25px;
      background-color: #007bff;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #aaa;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>✔ Email Verified</h1>
    <p>Your email address has been successfully verified.</p>
    <p>You can now securely log in to your account and start using our services.</p>
    
    <a href="http://localhost:5173/login" class="btn">Go to Login</a>

    <div class="footer">
      <p>If you did not perform this action, please contact support immediately.</p>
    </div>
  </div>
</body>
</html>
`;

async function registerController(req, res) {
    const { username, email, password } = req.body;

    const isUserExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isUserExist) {
        return res.status(400).json({
            success: false,
            message: "User already exist"
        })
    }

    const user = await userModel.create({
        username,
        email,
        password
    })

    const emailVerificationToken = jwt.sign({
        email: user.email,
    }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

    await sendEmail({
        to: email,
        subject: "Welcome to Negotiation Game",
        html: `
            <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
                <p>Please verify your email address by clicking the link below:</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br>The Perplexity Team</p>`
    })

    return res.status(201).json({
        success: true,
        message: "User created successfully",
        user
    })
}

async function loginController(req, res) {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
            err: "User not found"
        })
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
        return res.status(400).json({
            success: false,
            message: "Invalid password",
            err: "Invalid password"
        })
    }
    if (!user.verified) {
        return res.status(400).json({
            success: false,
            message: "Verify your email before login",
            err: "Email not verified"
        })
    }
    const token = jwt.sign({
        id: user._id,
        username: user.username,
    }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });

    res.cookie("token", token)

    return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user
    })
}

async function verifyEmailController(req, res) {
    try {
        const { token } = req.query;

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await userModel.findOne({
            email: decoded.email
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                err: "User not found"
            })
        }

        user.verified = true;
        await user.save();

        return res.send(html);
    } catch (err) {
        return res.status(400).json({
            message: "Invalid or expired token",
            success: false,
            err: err.message
        })
    }
}

async function getMeController(req, res) {
    const userId = req.user.id;

    const user = await userModel.findById(userId).select("-password");

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
            err: "User not found"
        })
    }
    return res.status(200).json({
        success: true,
        message: "User Fetched Successfully",
        user
    })
}

export default {
    registerController,
    loginController,
    verifyEmailController,
    getMeController
}