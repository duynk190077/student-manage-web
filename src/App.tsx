import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RouteUrls from './component/routes/routes';
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
            <RouteUrls />
          </Switch>
        </Router>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default memo(App);
