import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
 
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  otp: { type: String },
  otpExpires: { type: Date },
  isVerified: { type: Boolean, default: false }

}, { timestamps: true }); 

const User = mongoose.model("User", UserSchema);

export default User;
