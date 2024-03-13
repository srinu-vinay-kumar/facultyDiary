import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    middleName: {
      type: String,
    },

    lastName: {
      type: String,
      required: true,
    },

    empId: {
      type: Number,
      required: true,
      unique: true,
    },

    clgMail: {
      type: String,
      required: true,
      unique: true,
    },
    clgName: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      required: true,
    },

    dept: {
      type: String,
      required: true,
    },

    qualification: {
      type: String,
      required: true,
    },

    experience: {
      type: Number,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
