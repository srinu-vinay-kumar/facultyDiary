import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth user/set token
// route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { empId, password } = req.body;

  const user = await User.findOne({ empId });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      empId: user.empId,
      clgMail: user.clgMail,
      clgName: user.clgName,
      designation: user.designation,
      dept: user.dept,
      qualification: user.qualification,
      experience: user.experience,
    });
  } else {
    res.status(401);
    throw new Error("Invalid empId or password");
  }
});

// @desc Register a new user
// route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    empId,
    clgMail,
    clgName,
    designation,
    dept,
    qualification,
    experience,
    password,
  } = req.body;

  const userExists = await User.findOne({ empId });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    firstName,
    middleName,
    lastName,
    empId,
    clgMail,
    clgName,
    designation,
    dept,
    qualification,
    experience,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      empId: user.empId,
      clgMail: user.clgMail,
      clgName: user.clgName,
      designation: user.designation,
      dept: user.dept,
      qualification: user.qualification,
      experience: user.experience,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Logout user
// route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User Logged Out" });
});

// @desc Get user profile
// route POST /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    empId: req.user.empId,
    firstName: req.user.firstName,
    middleName: req.user.middleName,
    lastName: req.user.lastName,
    clgMail: req.user.clgMail,
    clgName: req.user.clgName,
    designation: req.user.designation,
    dept: req.user.dept,
    qualification: req.user.qualification,
    experience: req.user.experience,
  };
  res.status(200).json({ user });
});

// @desc Update user profile
// route Put /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.middleName = req.body.middleName || user.middleName;
    user.lastName = req.body.lastName || user.lastName;
    user.empId = req.body.empId || user.empId;
    user.clgMail = req.body.clgMail || user.clgMail;
    user.clgName = req.body.clgName || user.clgName;
    user.designation = req.body.designation || user.designation;
    user.dept = req.body.dept || user.dept;
    user.qualification = req.body.qualification || user.qualification;
    user.experience = req.body.experience || user.experience;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      middleName: updatedUser.middleName,
      lastName: updatedUser.lastName,
      empId: updatedUser.empId,
      clgMail: updatedUser.clgMail,
      clgName: updatedUser.clgName,
      designation: updatedUser.designation,
      dept: updatedUser.dept,
      qualification: updatedUser.qualification,
      experience: updatedUser.experience,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// send email link for reset password

const sendpasswordlink = asyncHandler((req, res) => {
  console.log(req.body);
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  sendpasswordlink,
};
