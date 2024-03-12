import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as semesterService from '../service/Semester';

export const getSemesterInfo = createAsyncThunk(
  'semester/getSemesterInfo',
  async () => {
    try {
      const response = await semesterService.apiGetSemesterInfo();
      if (response.data) {
        return response.data;
      }
    } catch (err) {
      return console.log(err);
    }
  },
);

const initialState = {
  semester: null,
};

const semesterSlice = createSlice({
  name: 'semester',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSemesterInfo.fulfilled, (state, action) => {
      state.semester = action.payload;
    });
  },
});

export default semesterSlice.reducer;
