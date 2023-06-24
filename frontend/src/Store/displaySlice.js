const { createSlice } = require("@reduxjs/toolkit");

const displaySlice = createSlice({
  name: "display",
  initialState: {
    toggleModel: false,
    editBoxVisibility: {
      postId: null,
      visibility: false,
    },
  },
  reducers: {
    setToggleModel(state, action) {
      return { ...state, toggleModel: action.payload };
    },
    setEditBoxVisibility(state, action) {
      return { ...state, editBoxVisibility: action.payload };
    },
  },
});

export const { setToggleModel, setEditBoxVisibility } = displaySlice.actions;
export const displayReducer = displaySlice.reducer;
