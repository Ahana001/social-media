import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  followUserRequest,
  loginRequest,
  signupRequest,
} from "../Services/authenticateServices";
import { CustomizeToast } from "../Utils/CustomizeToast";
import { getSuggestionListRequest } from "../Services/userService";

const initialState = {
  authToken: localStorage.getItem("authToken") ?? null,
  authUser: JSON.parse(localStorage.getItem("authUser")) ?? {},
  authStatus: "idle",
  authError: null,
  followStatus: "idle",
  followError: null,
  getSuggestionListData: [],
  getSuggestionListStatus: "idle",
  getSuggestionListError: null,
};
export const getSuggestionList = createAsyncThunk(
  "get/getSuggestionList",
  async ({ token }, { rejectWithValue }) => {
    try {
      const getSuggestionListResponse = await getSuggestionListRequest(token);
      return getSuggestionListResponse.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const loginUser = createAsyncThunk(
  "authenticate/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const loginResponse = await loginRequest(username, password);
      return loginResponse.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const signupUser = createAsyncThunk(
  "authenticate/signupUser",
  async ({ username, password, city }, { rejectWithValue }) => {
    try {
      const loginResponse = await signupRequest(username, password, city);
      return loginResponse.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const followUser = createAsyncThunk(
  "authenticate/followUser",
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const followUserResponse = await followUserRequest(userId, token);
      return followUserResponse.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logoutHandler: (state) => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      state.authToken = null;
      state.authUser = {};
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.authStatus = "pending";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.authStatus = "fulfilled";
      state.authToken = action.payload.result.token;
      state.authUser = action.payload.result.user;
      localStorage.setItem("authToken", state.authToken);
      localStorage.setItem("authUser", JSON.stringify(state.authUser));
      CustomizeToast("success", "Login Successfully");
    },
    [loginUser.rejected]: (state, action) => {
      state.authStatus = "error";
      state.authError = action.payload.errors[0].message;
      CustomizeToast("error", action.payload.errors[0].message);
    },
    [signupUser.pending]: (state) => {
      state.authStatus = "pending";
    },
    [signupUser.fulfilled]: (state, action) => {
      state.authStatus = "fulfilled";
      state.authToken = action.payload.result.token;
      state.authUser = action.payload.result.user;
      localStorage.setItem("authToken", state.authToken);
      localStorage.setItem("authUser", JSON.stringify(state.authUser));
      CustomizeToast("success", "Sign Up Successfully");
    },
    [signupUser.rejected]: (state, action) => {
      state.authStatus = "error";
      state.authError = action.payload.errors[0].message;
      CustomizeToast("error", action.payload.errors[0].message);
    },
    [getSuggestionList.pending]: (state) => {
      state.getSuggestionListStatus = "pending";
    },
    [getSuggestionList.fulfilled]: (state, action) => {
      state.getSuggestionListStatus = "fulfilled";
      state.getSuggestionListData = action.payload.result.suggetionList;
    },
    [getSuggestionList.rejected]: (state, action) => {
      state.getSuggestionListStatus = "error";
      state.getSuggestionListError = action.payload.errors[0].message;
    },
    [followUser.pending]: (state) => {
      state.followStatus = "pending";
    },
    [followUser.fulfilled]: (state, action) => {
      state.followStatus = "fulfilled";
      state.authUser = action.payload.result.user;
      state.getSuggestionListData = action.payload.result.suggetionList;
      CustomizeToast("success", "Followed Successfully");
    },
    [followUser.rejected]: (state, action) => {
      state.followStatus = "error";
      state.followErrors = action.payload.errors[0].message;
      CustomizeToast("error", action.payload.errors[0].message);
    },
  },
});

export const { logoutHandler } = authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;
