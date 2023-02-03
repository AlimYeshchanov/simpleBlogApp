import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state)=>{
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action)=>{
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state)=>{
      state.user = null;
      state.token = null;
    },
    setBlogs: (state, action)=>{
      state.blogs = action.payload.blogs;
    },
    setBlog: (state, action)=>{
      const updatedBlogs = state.blogs.map((blog)=>{
        if(blog._id === action.payload.blog._id) return action.payload.blog;
        return blog;
      });
      state.blogs = updatedBlogs;
    },
  },
});

export const { setMode, setLogin, setLogout, setBlogs, setBlog } = authSlice.actions;
export default authSlice.reducer;