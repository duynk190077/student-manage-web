import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { memo, useEffect } from 'react';
import Login from './component/login';
import { PRIVATE_PAGES, PUCLIC_PAGES } from './constant';
import { useAppDispatch } from './redux/store';
import LocalStorage from './service/LocalStorage';
import { getAllSubjects } from './redux/subjectSlice';
import { getSemesterInfo } from './redux/semesterSlice';
import { getAllClassRooms } from './redux/classRoomSlice';

const theme = createTheme();

function App() {
  const auth = LocalStorage.getLocalAccessToken();
  const role = LocalStorage.getRole();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!auth) {
      return;
    }
    dispatch(getAllSubjects());
    dispatch(getSemesterInfo());
    dispatch(getAllClassRooms());
  }, [auth]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          {PRIVATE_PAGES.map((p) => {
            const Component = p.component;
            return (
              <Route
                key={p.path}
                path={p.path}
                element={
                  !auth && role === 'Admin' ? (
                    <Navigate to={'/login'} />
                  ) : (
                    <Component />
                  )
                }
              />
            );
          })}
          {PUCLIC_PAGES.map((p) => {
            const Component = p.component;
            return (
              <Route
                key={p.path}
                path={p.path}
                element={!auth ? <Navigate to={'/login'} /> : <Component />}
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default memo(App);
