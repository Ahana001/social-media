import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CustomizeToast } from "../Utils/CustomizeToast";
import { getAllUserPostRequest } from "../Services/postService";

const initialState = {
  getAllUserPostData: [],
  getAllUserPostStatus: "idle",
  getAllUserPostError: null,
};

export const getAllUserPost = createAsyncThunk(
  "post/getAllUserPost",
  async ({ token }, { rejectWithValue }) => {
    try {
      const getAllUserPostResponse = await getAllUserPostRequest(token);
      return getAllUserPostResponse.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: {
    [getAllUserPost.pending]: (state) => {
      state.getAllUserPostStatus = "pending";
    },
    [getAllUserPost.fulfilled]: (state, action) => {
      state.getAllUserPostStatus = "fulfilled";
      state.getAllUserPostData = action.payload.result.posts;
    },
    [getAllUserPost.rejected]: (state, action) => {
      state.getAllUserPostStatus = "error";
      state.getAllUserPostError = action.payload.errors[0].message;
      CustomizeToast("error", action.payload.errors[0].message);
    },
  },
});

export const postReducer = postSlice.reducer;
