import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as userService from '../service/Authentication';
import * as studentService from '../service/Student';

export const login = createAsyncThunk<any, any, any>(
  'user/login',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await userService.apiLogin(data);
      if (response.data) {
        return response.data;
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getUserInfo = createAsyncThunk('user/getUserInfo', async () => {
  try {
    const response = await userService.apiGetUserInfo();
    return response.data;
  } catch (err) {
    return err;
  }
});

export const updateUserInfo = createAsyncThunk<any, any, any>(
  'user/updateUserInfo',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await studentService.apiUpdateStudent(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {});
  },
});

export default userSlice.reducer;
