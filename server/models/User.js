import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 6,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 6,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
      max: 50,
    },
    pictyrePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impression: Number,
  },
  //   autimated date
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
