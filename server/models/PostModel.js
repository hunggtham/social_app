import mongoose, { Mongoose } from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    descripton: String,
    picturePath: String,
    userPicturePath: String,
    like: {
      type: Map,
      of: Boolean,
    },
    comment: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;
