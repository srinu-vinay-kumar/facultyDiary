import express from "express";
const router = express.Router();
import User from "../models/userModel.js";
import crypto from "crypto";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";
import Token from "../models/token.js";
import {
  passwordReset,
  resetPasswordLink,
  setNewPassword,
} from "../controllers/forgotPasswordController.js";

router.post("/", passwordReset);

// verify password reset link
router.get("/:id/:token", resetPasswordLink);

//  set new password
router.post("/:id/:token", setNewPassword);

export default router;
