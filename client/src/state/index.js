import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //this essentially will be the state thatwill be stored in our Global state so this type of information this basicallythis data
  //will be accessible throughout our entire application and we can grab it any where we want
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducer: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existen :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post.id === action.payload.post_id) {
          return action.payload.post;
        }
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});
export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;

export default authSlice.reducer;
