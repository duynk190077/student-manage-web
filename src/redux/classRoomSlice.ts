import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as classRoomService from '../service/ClassRoom';

export const getAllClassRooms = createAsyncThunk(
  'classRoom/getAllClassRooms',
  async () => {
    try {
      const response = await classRoomService.apiGetAllClassRoom();
      if (response.data) {
        return response.data;
      }
    } catch (err) {
      return console.log(err);
    }
  },
);

const initialState = {
  classRooms: [],
};

const classRoomSlice = createSlice({
  name: 'classRoom',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllClassRooms.fulfilled, (state, action) => {
      state.classRooms = action.payload;
    });
  },
});

export default classRoomSlice.reducer;
