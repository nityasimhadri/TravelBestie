import { createSlice } from "@reduxjs/toolkit";
import {
  findUserThunk,
  createUserThunk,
  deleteUsersThunk,
  updateUserThunk,
} from "./thunks";

const initialState = {
  users: [],
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [findUserThunk.pending]: (state) => {
      state.loading = true;
      state.users = [];
    },
    [findUserThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.users = payload;
    },
    [findUserThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [deleteUsersThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.users = state.users.filter(u => u._id !== payload);
    },
    [createUserThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.users.push(payload);
    },
    [updateUserThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      const userNdx = state.users.findIndex((u) => u._id === payload._id);
      state.users[userNdx] = {
        ...state.users[userNdx],
        ...payload
      };
    },
  },
});

export default userSlice.reducer;
