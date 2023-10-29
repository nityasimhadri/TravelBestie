import { createSlice } from "@reduxjs/toolkit";
import {
  findUserByIdThunk,
  createUserThunk,
  deleteUsersThunk,
  updateUserThunk,
} from "./thunks";

const initialState = {
  user: null,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [findUserByIdThunk.pending]: (state) => {
      state.loading = true;
      state.user = null;
    },
    [findUserByIdThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    },
    [findUserByIdThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [deleteUsersThunk.fulfilled]: (state) => {
      state.loading = false;
      state.user = null;
    },
    [createUserThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    },
    [updateUserThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (state.user && state.user._id === payload._id) {
        state.user = {
          ...state.user,
          ...payload
        };
      }
    },
  },
});

export default userSlice.reducer;
