import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { createTheme, ThemeProvider } from '@mui/material';
import { memo } from 'react';

import Login from './component/login';
import { StoreProvider } from './store';
import { PRIVATE_PAGES, PUCLIC_PAGES } from "./constant";
import { GetRoleFromStorage, GetTokenFromStorage } from "./component/shared/helper";

const theme = createTheme();

function App() {
  const auth = GetTokenFromStorage();
  const role = GetRoleFromStorage();
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            {PRIVATE_PAGES.map((p) => {
              const Component = p.component;
              return (
                <Route
                  key={p.path}
                  path={p.path}
                  element={(!auth && role === 'Admin') ? <Navigate to={'/login'} /> : <Component />}
                />
              )
            })}
            {PUCLIC_PAGES.map((p) => {
              const Component = p.component;
              return (
                <Route
                  key={p.path}
                  path={p.path}
                  element={(!auth) ? <Navigate to={'/login'} /> : <Component />}
                />
              )
            })}
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default memo(App);
