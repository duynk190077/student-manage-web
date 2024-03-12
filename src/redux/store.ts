import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import userSlice from './userSlice';
import subjectSlice from './subjectSlice';
import semesterSlice from './semesterSlice';
import classRoomSlice from './classRoomSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    subjects: subjectSlice,
    semester: semesterSlice,
    classrooms: classRoomSlice,
  },
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
