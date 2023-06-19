import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginRequest, signupRequest } from "../Services/authenticateServices";
import { CustomizeToast } from "../Utils/CustomizeToast";

const initialState = {
  authToken: localStorage.getItem("authToken") ?? null,
  authUser: JSON.parse(localStorage.getItem("authUser")) ?? {},
  authStatus: "idle",
  authError: null,
};

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

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
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
  },
});

export const authenticationReducer = authenticationSlice.reducer;
