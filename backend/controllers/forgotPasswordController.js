import jwt from "jsonwebtoken";
import bycrypt from "bcryptjs";
import nodemailer from "nodemailer";

import db from "../models/userModel";

const User = db.user;

export const forgotPassword = async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ mail: req.body.email });

    // If user not found, send error message
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Generate a unique JWT token for the user that contains the user's id
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10m",
    });

    // Send the token to the user's email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_APP_EMAIL,
      },
    });

    // Email configuration
    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "Reset Password",
      html: `<h1>Reset Your Password</h1>
    <p>Click on the following link to reset your password:</p>
    <a href="http://localhost:5173/reset-password/${token}">http://localhost:5173/reset-password/${token}</a>
    <p>The link will expire in 10 minutes.</p>
    <p>If you didn't request a password reset, please ignore this email.</p>`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(200).send({ message: "Email sent" });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    // Verify the token sent by the user
    const decodedToken = jwt.verify(
      req.params.token,
      process.env.JWT_SECRET_KEY
    );

    // If the token is invalid, return an error
    if (!decodedToken) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // find the user with the id from the token
    const user = await User.findOne({ _id: decodedToken.userId });
    if (!user) {
      return res.status(401).send({ message: "no user found" });
    }

    // Hash the new password
    const salt = await bycrypt.genSalt(10);
    req.body.newPassword = await bycrypt.hash(req.body.newPassword, salt);

    // Update user's password, clear reset token and expiration time
    user.password = req.body.newPassword;
    await user.save();

    // Send success response
    res.status(200).send({ message: "Password updated" });
  } catch (err) {
    // Send error response if any error occurs
    res.status(500).send({ message: err.message });
  }
};
