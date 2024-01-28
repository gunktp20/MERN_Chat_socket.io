import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
    minlength: [3, "firstname must contain more than 3 letter "],
    unique: true,
    maxlength: 30,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
    validate: [validator.isEmail],
    maxlength: 30,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: [6, "password must contain more than 6 letter "],
    select: false,
  },
});

UserSchema.pre("save", async function () {
  console.log(this.modifiedPaths());
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createToken = function () {
  return jwt.sign(
    { userId: this._id, username: this.username, email: this.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "60m",
    }
  );
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("users", UserSchema);
