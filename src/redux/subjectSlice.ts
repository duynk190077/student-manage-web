import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as subjectService from '../service/Subject';

export const getAllSubjects = createAsyncThunk(
  'subject/getAllSubjects',
  async () => {
    try {
      const response = await subjectService.apiGetAllSubject();
      if (response.data) {
        return response.data;
      }
    } catch (err) {
      return console.log(err);
    }
  },
);

const initialState = {
  subjects: [],
};

const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllSubjects.fulfilled, (state, action) => {
      state.subjects = action.payload;
    });
  },
});

export default subjectSlice.reducer;
