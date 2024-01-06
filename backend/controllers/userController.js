import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth user/set token
// route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { employeeId, password } = req.body;

  const user = await User.findOne({ employeeId });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      employeeId: user.employeeId,
      collegeMail: user.collegeMail,
      department: user.department,
      qualification: user.qualification,
      experience: user.experience,
      csiMembership: user.csiMembership,
      passportNumber: user.passportNumber,
      panNumber: user.panNumber,
    });
  } else {
    res.status(401);
    throw new Error("Invalid employeeID or password");
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
    employeeId,
    collegeMail,
    department,
    qualification,
    experience,
    csiMembership,
    passportNumber,
    panNumber,
    password,
  } = req.body;

  const userExists = await User.findOne({ employeeId });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // console.log({
  //   firstName,
  //   middleName,
  //   lastName,
  //   employeeId,
  //   collegeMail,
  //   department,
  //   qualification,
  //   experience,
  //   csiMembership,
  //   passportNumber,
  //   panNumber,
  //   password,
  // });

  const user = await User.create({
    firstName,
    middleName,
    lastName,
    employeeId,
    collegeMail,
    department,
    qualification,
    experience,
    csiMembership,
    passportNumber,
    panNumber,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      employeeId: user.employeeId,
      collegeMail: user.collegeMail,
      department: user.department,
      qualification: user.qualification,
      experience: user.experience,
      csiMembership: user.csiMembership,
      passportNumber: user.passportNumber,
      panNumber: user.panNumber,
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
    employeeId: req.user.employeeId,
    firstName: req.user.firstName,
    middleName: req.user.middleName,
    lastName: req.user.lastName,
    collegeMail: req.user.collegeMail,
    department: req.user.department,
    qualification: req.user.qualification,
    experience: req.user.experience,
    csiMembership: req.user.csiMembership,
    passportNumber: req.user.passportNumber,
    panNumber: req.user.panNumber,
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
    user.employeeId = req.body.employeeId || user.employeeId;
    user.collegeMail = req.body.collegeMail || user.collegeMail;
    user.department = req.body.department || user.department;
    user.qualification = req.body.qualification || user.qualification;
    user.experience = req.body.experience || user.experience;
    user.csiMembership = req.body.csiMembership || user.csiMembership;
    user.passportNumber = req.body.passportNumber || user.passportNumber;
    user.panNumber = req.body.panNumber || user.panNumber;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      middleName: updatedUser.middleName,
      lastName: updatedUser.lastName,
      employeeId: updatedUser.employeeId,
      collegeMail: updatedUser.collegeMail,
      department: updatedUser.department,
      qualification: updatedUser.qualification,
      experience: updatedUser.experience,
      csiMembership: updatedUser.csiMembership,
      passportNumber: updatedUser.passportNumber,
      panNumber: updatedUser.panNumber,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
