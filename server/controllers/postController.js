import PostModel from "../models/PostModel.js";
import UserModel from "../models/UserModel.js";

// create

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await UserModel.findById(userId);
    const newPost = new PostModel({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      locaiton: user.location,
      description,
      //   profile picture
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comment: [],
    });

    await newPost.save();

    const post = await PostModel.find();

    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// read
export const getFeedPosts = async (req, res) => {
  try {
    const post = await PostModel.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await PostModel.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// update

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    //grab the post
    const post = await PostModel.findById(id);
    // check the like user has liked it or not if userId is exist
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    // update the post  by FE on click like button
    const updatePost = await PostModel.findByIdAndUpdate(
      id,
      { like: post.like },
      { new: true }
    );
    res.status(200).json(updatePost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
