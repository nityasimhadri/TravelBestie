import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./users-dao";

export const sendFriendRequestThunk = createAsyncThunk(
  'user/sendFriendRequest',
  async ({ uid, fid }) => await service.sendFriendRequest(uid, fid)
);

export const acceptFriendRequestThunk = createAsyncThunk(
  'user/acceptFriendRequest',
  async ({ uid, fid }) => await service.acceptFriendRequest(uid, fid)
);

export const declineFriendRequestThunk = createAsyncThunk(
  'user/declineFriendRequest',
  async ({ uid, fid }) => await service.declineFriendRequest(uid, fid)
);

export const removeFriendThunk = createAsyncThunk(
  'user/removeFriend',
  async ({ uid, fid }) => await service.removeFriend(uid, fid)
);

export const findUserThunk = createAsyncThunk(
  'user/findUser',
  async () => await service.findUser()
);

export const findUserByIdThunk = createAsyncThunk(
  'user/findUserById',
  async (uid) => await service.findUserById(uid)
);

export const findUserByUsernameThunk = createAsyncThunk(
  'user/findUserByUsername',
  async (username) => await service.findUserByUsername(username)
);

export const createUserThunk = createAsyncThunk(
  'user/createUser',
  async (user) => await service.createUser(user)
);

export const deleteUsersThunk = createAsyncThunk(
  'user/deleteUsers',
  async (uid) => await service.deleteUsers(uid)
);

export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async ({ uid, userUpdates }) => await service.updateUser(uid, userUpdates)
);

export const getQuizAnswersThunk = createAsyncThunk(
  'user/getQuizAnswers',
  async (uid) => await service.getQuizAnswers(uid)
);

export const setQuizAnswersThunk = createAsyncThunk(
  'user/setQuizAnswers',
  async ({ uid, quizAnswers }) => await service.setQuizAnswers(uid, quizAnswers)
);
