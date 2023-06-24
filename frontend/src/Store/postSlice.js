import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CustomizeToast } from "../Utils/CustomizeToast";
import {
  addPostRequest,
  deletePostRequest,
  dislikePostRequest,
  editPostRequest,
  getAllPostRequest,
  likePostRequest,
} from "../Services/postService";

const initialState = {
  getAllPostData: [],
  getAllPostStatus: "idle",
  getAllPostError: null,
  postSorting: "latest",
  postError: null,
  postStatus: null,
  postData: {
    id: null,
    content: "",
    picture: null,
    displayPicture: null,
  },
};

export const getAllPost = createAsyncThunk(
  "post/getAllPost",
  async ({ token }, { rejectWithValue }) => {
    try {
      const getAllPostResponse = await getAllPostRequest(token);
      return getAllPostResponse.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const addPost = createAsyncThunk(
  "posts/addPost",
  async ({ postData, token }, { rejectWithValue }) => {
    try {
      delete postData.displayPicture;
      delete postData.id;
      const response = await addPostRequest(postData, token);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ postData, token }, { rejectWithValue }) => {
    try {
      delete postData.displayPicture;
      const response = await editPostRequest(postData, token);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ postId, token }, { rejectWithValue }) => {
    try {
      const response = await deletePostRequest(postId, token);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const likePost = createAsyncThunk(
  "post/likePost",
  async ({ postId, token }, { rejectWithValue }) => {
    try {
      const response = await likePostRequest(postId, token);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const dislikePost = createAsyncThunk(
  "post/dislikePost",
  async ({ postId, token }, { rejectWithValue }) => {
    try {
      const response = await dislikePostRequest(postId, token);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    changeSorting: (state, action) => {
      state.postSorting = action.payload;
    },
    setPostData: (state, action) => {
      state.postData = action.payload;
    },
  },
  extraReducers: {
    [getAllPost.pending]: (state) => {
      state.getAllPostStatus = "pending";
    },
    [getAllPost.fulfilled]: (state, action) => {
      state.getAllPostStatus = "fulfilled";
      state.getAllPostData = action.payload.result.posts;
    },
    [getAllPost.rejected]: (state, action) => {
      state.getAllPostStatus = "error";
      state.getAllPostError = action.payload.errors[0].message;
      CustomizeToast("error", action.payload.errors[0].message);
    },
    [addPost.pending]: (state) => {
      state.postStatus = "pending";
    },
    [addPost.fulfilled]: (state, action) => {
      state.postStatus = "fulfilled";
      state.getAllPostData = action.payload.result.posts;
      CustomizeToast("success", "Post Created Successfully");
    },
    [addPost.rejected]: (state, action) => {
      state.postStatus = "error";
      state.postError = action.payload.errors[0].message;
      CustomizeToast("error", action.payload.errors[0].message);
    },
    [deletePost.pending]: (state) => {
      state.postStatus = "pending";
    },
    [deletePost.fulfilled]: (state, action) => {
      state.postStatus = "fulfilled";
      state.getAllPostData = action.payload.result.posts;
      CustomizeToast("success", "Post Deleted Successfully");
    },
    [deletePost.rejected]: (state, action) => {
      state.postStatus = "error";
      state.postError = action.payload.errors[0].message;
      CustomizeToast("error", action.payload.errors[0].message);
    },
    [editPost.pending]: (state) => {
      state.postStatus = "pending";
    },
    [editPost.fulfilled]: (state, action) => {
      state.postStatus = "fulfilled";
      state.getAllPostData = action.payload.result.posts;
      CustomizeToast("success", "Post Edited Successfully");
    },
    [editPost.rejected]: (state, action) => {
      state.postStatus = "error";
      state.postError = action.payload.errors[0].message;
      CustomizeToast("error", action.payload.errors[0].message);
    },
    [likePost.pending]: (state) => {
      state.postStatus = "pending";
    },
    [likePost.fulfilled]: (state, action) => {
      state.postStatus = "fulfilled";
      state.getAllPostData = action.payload.result.posts;
    },
    [likePost.rejected]: (state, action) => {
      state.postStatus = "error";
      CustomizeToast("error", action.payload.errors[0].message);
    },
    [dislikePost.pending]: (state) => {
      state.postStatus = "pending";
    },
    [dislikePost.fulfilled]: (state, action) => {
      state.postStatus = "fulfilled";
      state.getAllPostData = action.payload.result.posts;
    },
    [dislikePost.rejected]: (state, action) => {
      state.postStatus = "error";
      CustomizeToast("error", action.payload.errors[0].message);
    },
  },
});

export const postReducer = postSlice.reducer;
export const { changeSorting, setPostData } = postSlice.actions;
