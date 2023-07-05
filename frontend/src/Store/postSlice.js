import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CustomizeToast } from "../Utils/CustomizeToast";
import {
  addPostRequest,
  bookmarkPostRequest,
  deletePostRequest,
  dislikePostRequest,
  editPostRequest,
  getAllPostRequest,
  likePostRequest,
  unBookmarkPostRequest,
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
      if (!postData.picture) {
        delete postData.picture;
      }
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
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const bookmarkPost = createAsyncThunk(
  "post/bookmarkPost",
  async ({ postId, token }, { rejectWithValue }) => {
    try {
      const response = await bookmarkPostRequest(postId, token);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const unBookmarkPost = createAsyncThunk(
  "post/unBookmarkPost",
  async ({ postId, token }, { rejectWithValue }) => {
    try {
      const response = await unBookmarkPostRequest(postId, token);
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
      state.getAllPostData = action.payload.result.posts.map((post) => {
        return { ...post, likePostStatus: "idle", BookMarkPostStatus: "idle" };
      });
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
      state.getAllPostData = action.payload.result.posts.map((post) => {
        return { ...post, likePostStatus: "idle", BookMarkPostStatus: "idle" };
      });
      CustomizeToast("info", "Post Created Successfully");
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
      state.getAllPostData = action.payload.result.posts.map((post) => {
        return { ...post, likePostStatus: "idle", BookMarkPostStatus: "idle" };
      });
      CustomizeToast("info", "Post Deleted Successfully");
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
      state.getAllPostData = action.payload.result.posts.map((post) => {
        return { ...post, likePostStatus: "idle", BookMarkPostStatus: "idle" };
      });
      CustomizeToast("info", "Post Edited Successfully");
    },
    [editPost.rejected]: (state, action) => {
      state.postStatus = "error";
      state.postError = action.payload.errors[0].message;
      CustomizeToast("error", action.payload.errors[0].message);
    },
    [likePost.pending]: (state, action) => {
      const { postId } = action.meta.arg;
      state.getAllPostData = state.getAllPostData.map((post) => {
        if (post.id === postId) {
          return { ...post, likePostStatus: "pending" };
        } else {
          return post;
        }
      });
    },
    [likePost.fulfilled]: (state, action) => {
      state.postStatus = "fulfilled";
      const { postId } = action.meta.arg;
      const authUser = JSON.parse(localStorage.getItem("authUser"));

      state.getAllPostData = state.getAllPostData.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likePostStatus: "idle",
            liked_by: [...post.liked_by, authUser],
            like_count: post.like_count + 1,
          };
        } else {
          return post;
        }
      });
      CustomizeToast("info", "Post Liked Successfully");
    },
    [likePost.rejected]: (state, action) => {
      const { postId } = action.meta.arg;
      state.getAllPostData = state.getAllPostData.map((post) => {
        if (post.id === postId) {
          return { ...post, likePostStatus: "idle" };
        } else {
          return post;
        }
      });
      CustomizeToast("error", action.payload.errors[0].message);
    },
    [dislikePost.pending]: (state, action) => {
      const { postId } = action.meta.arg;
      state.getAllPostData = state.getAllPostData.map((post) => {
        if (post.id === postId) {
          return { ...post, likePostStatus: "pending" };
        } else {
          return post;
        }
      });
    },
    [dislikePost.fulfilled]: (state, action) => {
      const { postId } = action.meta.arg;
      const authUser = JSON.parse(localStorage.getItem("authUser"));

      state.getAllPostData = state.getAllPostData.map((post) => {
        if (post.id === postId) {
          const updatedLikedBy = post.liked_by.filter(
            (user) => user.id !== authUser.id
          );
          return {
            ...post,
            likePostStatus: "idle",
            liked_by: updatedLikedBy,
            like_count: post.like_count - 1,
          };
        } else {
          return post;
        }
      });
      CustomizeToast("info", "Post Disliked Successfully");
    },
    [dislikePost.rejected]: (state, action) => {
      const { postId } = action.meta.arg;
      state.getAllPostData = state.getAllPostData.map((post) => {
        if (post.id === postId) {
          return { ...post, likePostStatus: "idle" };
        } else {
          return post;
        }
      });
      CustomizeToast("error", action.payload.errors[0].message);
    },
    [bookmarkPost.pending]: (state, action) => {
      const { postId } = action.meta.arg;
      state.getAllPostData = state.getAllPostData.map((post) => {
        if (post.id === postId) {
          return { ...post, BookMarkPostStatus: "pending" };
        } else {
          return post;
        }
      });
    },
    [bookmarkPost.fulfilled]: (state, action) => {
      const { postId } = action.meta.arg;
      const authUser = JSON.parse(localStorage.getItem("authUser"));

      state.getAllPostData = state.getAllPostData.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            BookMarkPostStatus: "idle",
            bookmark_by: [...post.bookmark_by, authUser],
          };
        } else {
          return post;
        }
      });
      CustomizeToast("info", "Post Bookmarked Successfully");
    },
    [bookmarkPost.rejected]: (state, action) => {
      const { postId } = action.meta.arg;
      state.getAllPostData = state.getAllPostData.map((post) => {
        if (post.id === postId) {
          return { ...post, BookMarkPostStatus: "idle" };
        } else {
          return post;
        }
      });
      CustomizeToast("error", action.payload.errors[0].message);
    },
    [unBookmarkPost.pending]: (state, action) => {
      const { postId } = action.meta.arg;
      state.getAllPostData = state.getAllPostData.map((post) => {
        if (post.id === postId) {
          return { ...post, BookMarkPostStatus: "pending" };
        } else {
          return post;
        }
      });
    },
    [unBookmarkPost.fulfilled]: (state, action) => {
      const { postId } = action.meta.arg;
      const authUser = JSON.parse(localStorage.getItem("authUser"));

      state.getAllPostData = state.getAllPostData.map((post) => {
        if (post.id === postId) {
          const updateBookMarkedBy = post.bookmark_by.filter(
            (user) => user.id !== authUser.id
          );
          return {
            ...post,
            BookMarkPostStatus: "idle",
            bookmark_by: updateBookMarkedBy,
          };
        } else {
          return post;
        }
      });
      CustomizeToast("info", "Post Unbookmarked Successfully");
    },
    [unBookmarkPost.rejected]: (state, action) => {
      const { postId } = action.meta.arg;
      state.getAllPostData = state.getAllPostData.map((post) => {
        if (post.id === postId) {
          return { ...post, BookMarkPostStatus: "idle" };
        } else {
          return post;
        }
      });
      CustomizeToast("error", action.payload.errors[0].message);
    },
  },
});

export const postReducer = postSlice.reducer;
export const { changeSorting, setPostData } = postSlice.actions;
