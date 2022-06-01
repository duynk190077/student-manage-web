import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserUrl from './component/routes/puclic-routes';
import { createTheme, ThemeProvider } from '@mui/material';
import { memo } from 'react';

import Login from './component/login';
import { StoreProvider } from './store';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider>
        <Router>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <UserUrl />
          </Switch>
        </Router>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default memo(App);
